/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Job, Company, User } from "../types";
import { Search, MapPin, IndianRupee, Briefcase, Calendar, Star, StarOff, CheckCircle2, Building, ChevronRight, X, AlertCircle } from "lucide-react";

interface JobListingPageProps {
  jobs: Job[];
  companies: Company[];
  currentUser: User | null;
  savedJobIds: string[];
  appliedJobIds: string[];
  globalSearchTerm: string;
  globalSearchLoc: string;
  onClearGlobalSearch: () => void;
  onApplyJob: (jobId: string) => void;
  onToggleSaveJob: (jobId: string) => void;
  onOpenAuth: () => void;
  selectedJob: Job | null;
  onSelectJob: (job: Job | null) => void;
}

export default function JobListingPage({
  jobs,
  companies,
  currentUser,
  savedJobIds,
  appliedJobIds,
  globalSearchTerm,
  globalSearchLoc,
  onClearGlobalSearch,
  onApplyJob,
  onToggleSaveJob,
  onOpenAuth,
  selectedJob,
  onSelectJob,
}: JobListingPageProps) {
  // Filter States
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchLoc, setSearchLoc] = useState("");
  const [location, setLocation] = useState("");

  const [salarySlider, setSalarySlider] = useState(30);
  const [expBtn, setExpBtn] = useState("all");
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);

  // Simple loading feedback when filters change
  const [isFiltering, setIsFiltering] = useState(false);

  // Debouncing handlers (500ms delay)
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(searchKeyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setLocation(searchLoc);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchLoc]);

  // Spinner effect during dataset filters
  useEffect(() => {
    setIsFiltering(true);
    const spinnerTimer = setTimeout(() => {
      setIsFiltering(false);
    }, 350);
    return () => clearTimeout(spinnerTimer);
  }, [keyword, location, salarySlider, expBtn, checkedTypes]);

  // Sync global search from home panel
  useEffect(() => {
    if (globalSearchTerm) {
      setSearchKeyword(globalSearchTerm);
      setKeyword(globalSearchTerm);
    }
    if (globalSearchLoc) {
      setSearchLoc(globalSearchLoc);
      setLocation(globalSearchLoc);
    }
  }, [globalSearchTerm, globalSearchLoc]);

  // Reset Filters tool
  const resetFilters = () => {
    setSearchKeyword("");
    setKeyword("");
    setSearchLoc("");
    setLocation("");
    setSalarySlider(30);
    setExpBtn("all");
    setCheckedTypes([]);
    onClearGlobalSearch();
    onSelectJob(null);
  };

  // Run real-time filters
  const filteredJobs = jobs.filter((job) => {
    // Only show active jobs in list
    if (!job.active) return false;

    // keyword filter (title or requirements text)
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.description.toLowerCase().includes(keyword.toLowerCase()) ||
      job.requirements.some((r) => r.toLowerCase().includes(keyword.toLowerCase())) ||
      job.companyName.toLowerCase().includes(keyword.toLowerCase());

    // location filter
    const matchesLoc =
      !location || job.location.toLowerCase().includes(location.toLowerCase());

    // Advanced Salary Range slider matching (0 to 30 LPA)
    let matchesSalarySlider = true;
    const numericSalaries = job.salaryRange.match(/\d+/g);
    if (numericSalaries && numericSalaries.length > 0) {
      const topSal = parseInt(numericSalaries[numericSalaries.length - 1]);
      if (topSal > salarySlider) matchesSalarySlider = false;
    }

    // Advanced Experience Level buttons matching
    let matchesExpBtn = true;
    if (expBtn !== "all") {
      const expLevel = job.experienceLevel;
      if (expBtn === "0-1" && expLevel > 1) matchesExpBtn = false;
      else if (expBtn === "1-3" && (expLevel < 1 || expLevel > 3)) matchesExpBtn = false;
      else if (expBtn === "3-5" && (expLevel < 3 || expLevel > 5)) matchesExpBtn = false;
      else if (expBtn === "5+" && expLevel < 5) matchesExpBtn = false;
    }

    // Advanced Job Type checkboxes matching
    let matchesCheckboxes = true;
    if (checkedTypes.length > 0) {
      matchesCheckboxes = checkedTypes.some(
        (t) => t.toLowerCase() === job.jobType.toLowerCase()
      );
    }

    return matchesKeyword && matchesLoc && matchesSalarySlider && matchesExpBtn && matchesCheckboxes;
  });

  // Automatically select the first filtered job if none selected and filtered jobs exist
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      onSelectJob(filteredJobs[0]);
    } else if (filteredJobs.length === 0) {
      onSelectJob(null);
    }
  }, [filteredJobs, selectedJob, onSelectJob]);

  // Find company metadata of the selected job
  const selectedJobCompany = selectedJob
    ? companies.find((c) => c.id === selectedJob.companyId)
    : null;

  // Pagination State
  const [jobsPage, setJobsPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Reset pagination on filter changes
  useEffect(() => {
    setJobsPage(1);
  }, [keyword, location, salarySlider, expBtn, checkedTypes]);

  const totalJobsCount = filteredJobs.length;
  const totalJobsPages = Math.ceil(totalJobsCount / ITEMS_PER_PAGE) || 1;
  const jobsStartIdx = (jobsPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobsList = filteredJobs.slice(jobsStartIdx, jobsStartIdx + ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6 animate-in fade-in duration-200">
      
      {/* Search and Filters Header */}
      <div className="bg-[#EFF6FF] border border-[#E5E7EB] p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between" id="jobs-browser-header">
        <div className="w-full md:w-auto flex items-center gap-2 flex-wrap">
          <span className="text-[#3B82F6] bg-white border border-blue-100 font-bold px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider shadow-xs">
            {filteredJobs.length} Positions Available
          </span>
          {(keyword || location || salarySlider !== 30 || expBtn !== "all" || checkedTypes.length > 0) && (
            <span className="text-gray-600 bg-white border border-gray-100 text-xs px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1.5 animate-pulse">
              <span>Prime Search Filters Enabled</span>
              <button onClick={resetFilters} className="text-red-500 hover:text-red-650 cursor-pointer">
                <X size={12} />
              </button>
            </span>
          )}
        </div>

        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-gray-500 hover:text-[#3B82F6] hover:underline cursor-pointer"
        >
          Reset All Filters & Queries
        </button>
      </div>

      {/* Main Grid: Desktop side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (lg:col-span-15): Search forms & Job lists */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Real-time Sidebar Filters */}
          <div className="bg-white border border-[#E5E7EB] p-5 rounded-2xl space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-xs font-bold text-[#1F293A] uppercase tracking-wider">Advanced Filters</span>
              <button
                onClick={resetFilters}
                className="text-[10px] font-bold text-[#3B82F6] hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Keyword */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Keyword matching (Title, skill)
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="e.g. 'React', 'Python', 'Tech'..."
                  className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs focus:ring-1 focus:ring-blue-500 text-[#1F293A] bg-white font-medium"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Hiring City / Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={14} />
                <input
                  type="text"
                  value={searchLoc}
                  onChange={(e) => setSearchLoc(e.target.value)}
                  placeholder="e.g. 'Bangalore', 'Mumbai'..."
                  className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] rounded-lg text-xs text-[#1F293A] bg-white font-medium"
                />
              </div>
            </div>

            {/* Advanced Salary Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Maximum Salary (LPA)
                </label>
                <span className="text-xs font-bold text-[#3B82F6] font-mono">
                  {salarySlider === 30 ? "Any Package" : `Up to ${salarySlider} LPA`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={salarySlider}
                onChange={(e) => setSalarySlider(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <div className="flex justify-between text-[8px] text-gray-400 font-bold font-mono mt-1">
                <span>0 LPA</span>
                <span>15 LPA</span>
                <span>30 LPA</span>
              </div>
            </div>

            {/* Experience Level Button Gp */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Experience Level
              </label>
              <div className="flex flex-wrap gap-1">
                {[
                  { key: "all", label: "Any" },
                  { key: "0-1", label: "0-1 Yr" },
                  { key: "1-3", label: "1-3 Yrs" },
                  { key: "3-5", label: "3-5 Yrs" },
                  { key: "5+", label: "5+ Yrs" },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => setExpBtn(btn.key)}
                    className={`text-xs py-1 px-3 rounded-xl border font-semibold transition-all cursor-pointer ${
                      expBtn === btn.key
                        ? "bg-[#3B82F6] text-white border-[#3B82F6] font-bold"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type Checkboxes */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Job Format / Arrangement
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map((type) => {
                  const isChecked = checkedTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-xs text-gray-600 font-medium cursor-pointer select-none hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setCheckedTypes((prev) => prev.filter((t) => t !== type));
                          } else {
                            setCheckedTypes((prev) => [...prev, type]);
                          }
                        }}
                        className="rounded border-gray-300 text-[#3B82F6] focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Job Card Lists */}
          <div className="space-y-3 relative overflow-hidden" id="jobs-cards-list-box">
            {isFiltering ? (
              <div className="bg-white border border-[#E5E7EB] p-12 text-center rounded-xl text-gray-500 text-xs flex flex-col items-center justify-center gap-2 h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="font-semibold text-gray-400">Loading matches...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white border border-[#E5E7EB] p-8 text-center rounded-xl text-gray-400 text-xs">
                No active jobs match these requirements. Try expanding your parameters.
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {paginatedJobsList.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    const isApplied = appliedJobIds.includes(job.id);

                    return (
                      <div
                        key={job.id}
                        onClick={() => onSelectJob(job)}
                        className={`p-4 border rounded-xl transition-all cursor-pointer block relative ${
                          isSelected
                            ? "bg-[#EFF6FF] border-[#3B82F6] shadow-xs"
                            : "bg-white border-[#E5E7EB] hover:border-gray-300 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-bold text-[#1F293A] text-sm leading-tight line-clamp-1">
                              {job.title}
                            </h3>
                            <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
                              {job.companyName}
                            </p>
                          </div>
                          
                          {isApplied && (
                            <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase">
                              Applied
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-3 text-[10px] font-mono select-none">
                          <span className="bg-white border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded">
                            {job.location}
                          </span>
                          <span className="bg-emerald-50/50 border border-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                            {job.salaryRange}
                          </span>
                          <span className="bg-purple-100/55 text-purple-700 font-semibold px-1.5 py-0.5 rounded">
                            {job.jobType}
                          </span>
                        </div>

                        <div className="mt-3 flex justify-between items-center text-[10px] text-gray-400">
                          <span>Exp: {job.experienceLevel}+ Yrs</span>
                          <span>Published: {job.datePosted}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Job Seekers Pagination controls */}
                <div className="bg-white px-4 py-3 border border-[#E5E7EB] rounded-2xl flex items-center justify-between mt-2">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono">
                      Showing {jobsStartIdx + 1}-{Math.min(jobsStartIdx + ITEMS_PER_PAGE, totalJobsCount)} of {totalJobsCount} postings
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      disabled={jobsPage === 1}
                      onClick={() => {
                        setJobsPage(p => Math.max(1, p - 1));
                        const box = document.getElementById("jobs-cards-list-box");
                        box?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded-lg text-[10px] font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-white"
                    >
                      Prev
                    </button>
                    <span className="text-[10px] font-mono font-bold leading-7 text-gray-500">
                      Page {jobsPage}/{totalJobsPages}
                    </span>
                    <button
                      type="button"
                      disabled={jobsPage === totalJobsPages}
                      onClick={() => {
                        setJobsPage(p => Math.min(totalJobsPages, p + 1));
                        const box = document.getElementById("jobs-cards-list-box");
                        box?.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-2 py-1 border border-gray-300 rounded-lg text-[10px] font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (lg:col-span-7): Detailed Inspector */}
        <div className="lg:col-span-7 sticky top-24">
          
          {selectedJob ? (
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm space-y-6 animate-in fade-in duration-200">
              
              {/* Hero Inspection Header */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b pb-5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-[#1F293A] tracking-tight">{selectedJob.title}</h2>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                      <Building size={14} className="text-gray-400" />
                      {selectedJob.companyName}
                    </span>
                    {selectedJobCompany?.verified && (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[9px] font-bold uppercase py-0.5 px-1.5 rounded-full inline-flex items-center gap-0.5">
                        <CheckCircle2 size={10} className="fill-current" /> Verified Partner
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-400 font-mono pt-1">
                    Job ID: {selectedJob.id} • Posted on {selectedJob.datePosted}
                  </div>
                </div>

                {/* Star Bookmark (Independent actions) */}
                {(!currentUser || currentUser.role === "seeker") && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        onToggleSaveJob(selectedJob.id);
                      }
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold ${
                      savedJobIds.includes(selectedJob.id)
                        ? "bg-amber-50 border-amber-200 text-amber-500 font-bold"
                        : "bg-gray-50 border-gray-100 text-gray-500 hover:text-amber-500"
                    }`}
                  >
                    {savedJobIds.includes(selectedJob.id) ? (
                      <>
                        <Star size={14} className="fill-current" />
                        <span>Bookmarked</span>
                      </>
                    ) : (
                      <>
                        <StarOff size={14} />
                        <span>Save Job</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Tag parameters block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold mb-0.5">Hiring Location</span>
                  <span className="text-xs font-bold text-[#1F293A] flex items-center gap-1">
                    <MapPin size={12} className="text-blue-500" /> {selectedJob.location}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold mb-0.5">Yearly Package</span>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-0.5">
                    <IndianRupee size={11} className="text-emerald-500" /> {selectedJob.salaryRange}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold mb-0.5">Appointment Type</span>
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    <Briefcase size={12} className="text-purple-500" /> {selectedJob.jobType}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold mb-0.5">Required Exp</span>
                  <span className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                    Min {selectedJob.experienceLevel} Years
                  </span>
                </div>
              </div>

              {/* Main Description details */}
              <div className="space-y-4 text-xs text-[#1F293A] leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Overview & Duties</h4>
                  <p className="text-gray-600 whitespace-pre-line text-sm">{selectedJob.description}</p>
                </div>

                {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Qualifications & Skills Required</h4>
                    <ul className="space-y-1.5 list-disc pl-5 text-gray-600 text-xs">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recruiter Background pitch */}
              {selectedJobCompany && (
                <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-50 space-y-2">
                  <h4 className="text-xs font-bold text-[#3B82F6] flex items-center gap-1">
                    <Building size={14} /> About {selectedJobCompany.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed max-w-2xl">{selectedJobCompany.description}</p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    Sector: {selectedJobCompany.industry} • Location: {selectedJobCompany.location} • Employee Count: {selectedJobCompany.companySize}
                  </p>
                </div>
              )}

              {/* Primary file / edit controls */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  {currentUser && currentUser.role === "seeker" && !currentUser.resumeName && (
                    <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={12} /> Consider dragging a CV inside Dashboard first.
                    </span>
                  )}
                </div>

                {(!currentUser || currentUser.role === "seeker") && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        onApplyJob(selectedJob.id);
                      }
                    }}
                    disabled={appliedJobIds.includes(selectedJob.id)}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all inline-flex items-center gap-2 cursor-pointer ${
                      appliedJobIds.includes(selectedJob.id)
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-not-allowed"
                        : "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-xs hover:shadow-md"
                    }`}
                    id="jobs-detail-apply"
                  >
                    {appliedJobIds.includes(selectedJob.id) ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Submitted Successfully</span>
                      </>
                    ) : (
                      <span>Apply For Position</span>
                    )}
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed rounded-2xl text-center py-32 text-gray-400 text-xs">
              Select an active opening from the list browser to display full job details.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
