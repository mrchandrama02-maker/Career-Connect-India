/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Job, Company, User } from "../types";
import { motion } from "motion/react";
import { 
  Search, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Calendar, 
  Star, 
  StarOff, 
  CheckCircle2, 
  Building, 
  X, 
  AlertCircle, 
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Award
} from "lucide-react";

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
  // Filter States Matching the UI Mockup
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
  const [selectedExp, setSelectedExp] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // user requested 10 to 15 jobs pagination

  // State to inspect a job's details when clicking "View Details"
  const [inspectingJob, setInspectingJob] = useState<Job | null>(null);

  // Simple loading effect when filters update
  const [isFiltering, setIsFiltering] = useState(false);

  // Sync global search inputs
  useEffect(() => {
    if (globalSearchTerm) {
      setSearchKeyword(globalSearchTerm);
    }
  }, [globalSearchTerm]);

  // Keep search keyword in sync if global search changes
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchKeyword, selectedJobTypes, selectedSalaries, selectedExp, sortOrder]);

  // Reset pagination on filter update
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedJobTypes, selectedSalaries, selectedExp, sortOrder]);

  // Clear or reset all filters
  const resetFilters = () => {
    setSearchKeyword("");
    setSelectedJobTypes([]);
    setSelectedSalaries([]);
    setSelectedExp("all");
    setSortOrder("recent");
    onClearGlobalSearch();
    onSelectJob(null);
    setInspectingJob(null);
  };

  // Job Format mappings
  const jobFormatOptions = ["Full-time", "Contract", "Remote", "Part-time"];

  // Salary range options from user mockup
  const salaryRangeOptions = ["Under 8 LPA", "8 - 15 LPA", "15 - 22 LPA", "22+ LPA"];

  // Toggle handlers
  const handleJobTypeToggle = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(prev => prev.filter(t => t !== type));
    } else {
      setSelectedJobTypes(prev => [...prev, type]);
    }
  };

  const handleSalaryToggle = (range: string) => {
    if (selectedSalaries.includes(range)) {
      setSelectedSalaries(prev => prev.filter(s => s !== range));
    } else {
      setSelectedSalaries(prev => [...prev, range]);
    }
  };

  // Filter implementation
  const filteredJobs = jobs.filter((job) => {
    if (!job.active) return false;

    // Search bar matching: role, company name, description, location
    const keywordMat = searchKeyword.trim().toLowerCase();
    const matchesKeyword =
      !keywordMat ||
      job.title.toLowerCase().includes(keywordMat) ||
      job.companyName.toLowerCase().includes(keywordMat) ||
      job.description.toLowerCase().includes(keywordMat) ||
      job.location.toLowerCase().includes(keywordMat) ||
      job.jobType.toLowerCase().includes(keywordMat) ||
      job.requirements.some((r) => r.toLowerCase().includes(keywordMat));

    // Job format/type matching
    let matchesJobType = true;
    if (selectedJobTypes.length > 0) {
      matchesJobType = selectedJobTypes.some((type) => {
        if (type === "Remote") {
          return (
            job.jobType.toLowerCase().includes("remote") ||
            job.location.toLowerCase().includes("remote")
          );
        }
        return type.toLowerCase() === job.jobType.toLowerCase();
      });
    }

    // Salary range matching heuristics for LPA values
    let matchesSalary = true;
    if (selectedSalaries.length > 0) {
      const nums = job.salaryRange.match(/\d+/g);
      if (nums && nums.length > 0) {
        const topVal = parseInt(nums[nums.length - 1]);
        matchesSalary = selectedSalaries.some((filter) => {
          if (filter === "Under 8 LPA") {
            return topVal <= 8;
          }
          if (filter === "8 - 15 LPA") {
            return topVal > 8 && topVal <= 15;
          }
          if (filter === "15 - 22 LPA") {
            return topVal > 15 && topVal <= 22;
          }
          if (filter === "22+ LPA") {
            return topVal > 22;
          }
          return true;
        });
      }
    }

    // Experience matching
    let matchesExp = true;
    if (selectedExp !== "all") {
      const expLevel = job.experienceLevel;
      if (selectedExp === "0-1" && expLevel > 1) matchesExp = false;
      else if (selectedExp === "1-3" && (expLevel < 1 || expLevel > 3)) matchesExp = false;
      else if (selectedExp === "3-5" && (expLevel < 3 || expLevel > 5)) matchesExp = false;
      else if (selectedExp === "5+" && expLevel < 5) matchesExp = false;
    }

    return matchesKeyword && matchesJobType && matchesSalary && matchesExp;
  });

  // Sort implementation
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === "recent") {
      return b.datePosted.localeCompare(a.datePosted) || b.id.localeCompare(a.id);
    }
    if (sortOrder === "salary_desc") {
      const valA = parseInt(a.salaryRange.match(/\d+/g)?.[0] || "0");
      const valB = parseInt(b.salaryRange.match(/\d+/g)?.[0] || "0");
      return valB - valA;
    }
    if (sortOrder === "experience_asc") {
      return a.experienceLevel - b.experienceLevel;
    }
    return 0;
  });

  // Pagination calculations
  const totalItems = sortedJobs.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedJobs = sortedJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Automatically open the inspecting modal for the active prop-selected job if any
  useEffect(() => {
    if (selectedJob) {
      setInspectingJob(selectedJob);
    }
  }, [selectedJob]);

  // Clean inspect modal closure
  const closeDetailsModal = () => {
    setInspectingJob(null);
    onSelectJob(null);
  };

  if (inspectingJob) {
    const companyObj = companies.find(c => c.id === inspectingJob.companyId) || {
      logoUrl: undefined,
      logoEmoji: "🏢",
      verified: false
    };
    const isApplied = appliedJobIds.includes(inspectingJob.id);

    // Get published description
    const getPublishedTime = (dateStr: string) => {
      const current = new Date("2026-06-02");
      const posted = new Date(dateStr);
      const diffTime = Math.abs(current.getTime() - posted.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0 || isNaN(diffDays)) return "Today";
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
    };

    // Candidate count seeded predictably
    const textForSeed = inspectingJob.id + inspectingJob.title;
    let hash = 0;
    for (let i = 0; i < textForSeed.length; i++) {
      hash = textForSeed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const candidateSeed = Math.abs(hash % 38) + 12;

    // Build responsibilities based on title
    const getResponsibilities = (title: string): string[] => {
      const low = title.toLowerCase();
      if (
        low.includes("developer") ||
        low.includes("engineer") ||
        low.includes("architect") ||
        low.includes("programmer") ||
        low.includes("coder")
      ) {
        return [
          "Design, construct, and maintain clean, performant, and scalable software solutions using industry best practices.",
          "Collaborate with cross-functional partners (design, product management, and QA) to define project milestones.",
          "Conduct detailed code reviews, optimize internal latency, and author unit tests to protect product quality.",
          "Deploy microservices and frontend user interfaces securely to production cloud containers."
        ];
      }
      if (
        low.includes("analyst") ||
        low.includes("data") ||
        low.includes("research") ||
        low.includes("treasury") ||
        low.includes("valuation")
      ) {
        return [
          "Structure and model raw dataset pipelines to reveal actionable commercial insights.",
          "Create high-fidelity analytical dashboards, interactive reports, and summary visualizations for management.",
          "Identify data performance bottlenecks, optimize SQL structures, and build automated regression testing procedures.",
          "Formulate clear business requirement matrices to align software capabilities with operational goals."
        ];
      }
      if (
        low.includes("manager") ||
        low.includes("lead") ||
        low.includes("scrum") ||
        low.includes("coordinator") ||
        low.includes("ops") ||
        low.includes("officer") ||
        low.includes("operations")
      ) {
        return [
          "Lead agile ceremonies, govern sprint progress, and coach squad members on delivery optimization.",
          "Formulate comprehensive project schedules, coordinate multi-functional workflows, and mitigate delivery risks.",
          "Monitor active operations KPIs, manage key vendor relationships, and negotiate favorable commercial terms.",
          "Draft clear progress summaries, slide decks, and integration instructions for executive stakeholders."
        ];
      }
      if (
        low.includes("writer") ||
        low.includes("editor") ||
        low.includes("artist") ||
        low.includes("designer") ||
        low.includes("graphic") ||
        low.includes("creative")
      ) {
        return [
          "Generate high-impact microcopy, brand guidelines, and visual assets across digital interfaces.",
          "Validate content with product and engineering teams to ensure uniform brand voice and presentation.",
          "Create, curate, and maintain a centralized library of vector logos, typography profiles, and layout designs.",
          "Perform usability reviews and user experience testing to iteratively improve content readability."
        ];
      }
      return [
        "Execute day-to-day work tasks with exceptional precision, quality, and commitment.",
        "Collaborate with team peers and external stakeholders to streamline service delivery operations.",
        "Document technical workflows, setup manuals, and operations logs for future reference.",
        "Identify performance bottlenecks and advocate for continuous practice automation."
      ];
    };

    const responsibilitiesList = getResponsibilities(inspectingJob.title);

    return (
      <div className="bg-[#FAFBFD] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
          
          {/* Back Action button trigger */}
          <button
            onClick={closeDetailsModal}
            className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 mb-6 transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to all jobs
          </button>

          {/* Main 2-column detailed workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT CONTAINER: Extensive position description sheet */}
            <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  
                  {/* Rounded Icon */}
                  <div className="w-16 h-16 bg-blue-50/50 p-3 rounded-2xl border border-gray-150 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                    {companyObj.logoUrl ? (
                      <img
                        src={companyObj.logoUrl}
                        alt={`${inspectingJob.companyName} logo`}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent && !parent.querySelector(".fallback-emoji")) {
                            const fallback = document.createElement("span");
                            fallback.className = "text-2xl fallback-emoji";
                            fallback.innerText = companyObj.logoEmoji || "🏢";
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{companyObj.logoEmoji || "🏢"}</span>
                    )}
                  </div>

                  <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-tight tracking-tight mt-0.5">
                      {inspectingJob.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-[#2563EB]">
                        {inspectingJob.companyName}
                      </span>
                      {companyObj.verified && (
                        <span className="bg-emerald-50 border border-emerald-100 text-[9px] text-[#059669] px-1.5 rounded-sm uppercase font-bold tracking-wider">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Star Bookmark */}
                {(!currentUser || currentUser.role === "seeker") && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        onToggleSaveJob(inspectingJob.id);
                      }
                    }}
                    className={`p-2.5 rounded-xl border transition-all self-start sm:self-center cursor-pointer ${
                      savedJobIds.includes(inspectingJob.id)
                        ? "bg-amber-50 border-amber-200 text-amber-550 shadow-2xs"
                        : "bg-white border-slate-200 text-gray-400 hover:text-amber-500 hover:border-amber-200"
                    }`}
                    title="Bookmark this position"
                  >
                    {savedJobIds.includes(inspectingJob.id) ? (
                      <Star size={18} className="fill-current text-amber-500" />
                    ) : (
                      <StarOff size={18} />
                    )}
                  </button>
                )}
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Key metadata badges metric panel matching mockup */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase block mb-1">
                    LOCATION
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#334155] flex items-center gap-1">
                    <MapPin size={14} className="text-[#3B82F6] shrink-0" /> {inspectingJob.location}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase block mb-1">
                    TYPE
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#334155] flex items-center gap-1.5">
                    <Briefcase size={14} className="text-[#3B82F6] shrink-0" /> {inspectingJob.jobType}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase block mb-1">
                    SALARY
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-600 flex items-center gap-0.5">
                    <IndianRupee size={13} className="text-[#3B82F6] shrink-0" /> {inspectingJob.salaryRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold tracking-widest text-[#94A3B8] uppercase block mb-1">
                    EXPERIENCE
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#334155] flex items-center gap-1.5 font-sans">
                    <Calendar size={14} className="text-[#3B82F6] shrink-0" /> {inspectingJob.experienceLevel}+ Years
                  </span>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Detailed Description block */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  Job Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {inspectingJob.description}
                </p>
              </div>

              {/* Responsibilities with blue checkboxes checkmarks */}
              <div className="mt-8 space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                  Responsibilities
                </h2>
                <div className="space-y-3.5">
                  {responsibilitiesList.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#3B82F6] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements block */}
              {inspectingJob.requirements && inspectingJob.requirements.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
                    Requirements
                  </h2>
                  <div className="space-y-3.5">
                    {inspectingJob.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shrink-0 mt-2"></span>
                        <span className="text-sm text-gray-600 leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Sidebar widgets */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Ready to take leap card */}
              <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs">
                <h4 className="text-[10px] font-bold text-gray-400 text-center tracking-widest uppercase mb-4">
                  Ready to take the leap?
                </h4>

                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) {
                      onOpenAuth();
                    } else {
                      onApplyJob(inspectingJob.id);
                    }
                  }}
                  disabled={isApplied}
                  className={`w-full py-3.5 font-bold rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all duration-200 shadow-xs cursor-pointer ${
                    isApplied
                      ? "bg-emerald-50 border border-emerald-150 text-emerald-700 cursor-not-allowed"
                      : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white hover:shadow-md"
                  }`}
                >
                  {isApplied ? (
                    <span className="flex items-center gap-1.5 justify-center">
                      <CheckCircle2 size={14} /> Applied Successfully
                    </span>
                  ) : (
                    "Apply for this position"
                  )}
                </button>

                <hr className="border-gray-100 my-5" />

                {/* Stats grid */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="flex items-center justify-between text-gray-500 font-medium">
                    <span>Job ID</span>
                    <span className="font-extrabold text-[#0D1525] font-mono">
                      #{inspectingJob.id.toUpperCase().replace("_", "-")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-500 font-medium">
                    <span>Published</span>
                    <span className="font-bold text-[#0D1525]">
                      {getPublishedTime(inspectingJob.datePosted)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-500 font-medium font-sans">
                    <span>Applications</span>
                    <span className="font-bold text-[#2563EB]">
                      {candidateSeed} candidates
                    </span>
                  </div>
                </div>

              </div>

              {/* Safety sidebar widget card */}
              <div className="bg-[#0F172A] rounded-2xl p-6 text-white relative overflow-hidden shadow-sm">
                
                {/* Background graphic flare watermark/shield logo */}
                <div className="absolute right-3 bottom-0 opacity-10 pointer-events-none text-slate-400">
                  <Award size={130} />
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-tight tracking-tight relative z-10 flex items-center gap-1.5">
                  Application Safety
                </h3>
                
                <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4 relative z-10">
                  All corporate profiles on Career Connect India are verified by our dedicated trust and safety division. We never request credentials, payments, or processing funds.
                </p>

                <a 
                  href="#safety-guidelines" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Trust & Safety: Do not share sensitive payment requests or OTPs with anyone calling under company names. Career Connect India will never ask for payment to apply or interview.");
                  }}
                  className="text-xs text-white underline hover:text-slate-200 transition-colors block font-semibold hover:no-underline relative z-10"
                >
                  Learn more about recruitment safety
                </a>

              </div>

            </div>

          </div>

          {/* Sticky Mobile CTA Bar */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/80 p-4 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.04)] flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-250">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{inspectingJob.companyName}</p>
              <p className="text-[#0D1525] text-xs sm:text-sm font-extrabold truncate">{inspectingJob.title}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!currentUser) {
                  onOpenAuth();
                } else {
                  onApplyJob(inspectingJob.id);
                }
              }}
              disabled={isApplied}
              className={`px-5 py-3 font-extrabold rounded-xl text-xs text-center flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0 ${
                isApplied
                  ? "bg-emerald-50 border border-emerald-150 text-emerald-700 cursor-not-allowed"
                  : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
              }`}
            >
              {isApplied ? (
                <>
                  <CheckCircle2 size={13} /> Applied
                </>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Clean inspect modal closure
  const isSelectedOrInspecting = false; // dummy placeholder to keep compile happy since we updated below


  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Hero segment from user mockup specs */}
        <div className="mb-8" id="jobs-header-title">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight font-sans">
            Find Your Next Role
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2 font-medium">
            Explore {jobs.filter(j => j.active).length} available positions at leading enterprise companies.
          </p>
        </div>

        {/* Outer split column frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Clean Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-3 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <SlidersHorizontal size={14} className="text-gray-400" /> Filters
              </span>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors uppercase tracking-wide cursor-pointer"
              >
                RESET
              </button>
            </div>

            {/* Filter Group: JOB TYPE */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3.5">
                JOB TYPE
              </h4>
              <div className="space-y-3">
                {jobFormatOptions.map((type) => {
                  const isChecked = selectedJobTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleJobTypeToggle(type)}
                        className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 cursor-pointer transition-all"
                      />
                      <span>{type}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: SALARY RANGE */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3.5">
                SALARY RANGE
              </h4>
              <div className="space-y-3">
                {salaryRangeOptions.map((range) => {
                  const isChecked = selectedSalaries.includes(range);
                  return (
                    <label
                      key={range}
                      className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSalaryToggle(range)}
                        className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 cursor-pointer transition-all"
                      />
                      <span>{range}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Extra filter: EXPERIENCE LEVEL */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3.5">
                EXPERIENCE LEVEL
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { key: "all", label: "Any Exp" },
                  { key: "0-1", label: "0-1 Yr" },
                  { key: "1-3", label: "1-3 Yrs" },
                  { key: "3-5", label: "3-5 Yrs" },
                  { key: "5+", label: "5+ Yrs" },
                ].map((btn) => (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => setSelectedExp(btn.key)}
                    className={`text-[11px] py-1.5 px-2.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                      selectedExp === btn.key
                        ? "bg-[#2563EB] text-white border-[#2563EB]"
                        : "bg-white text-gray-600 border-[#E2E8F0] hover:border-gray-350"
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Search form Input box + Results Panel */}
          <div className="lg:col-span-9 space-y-5">
            
            {/* Search Input Bar with vector icon */}
            <div className="flex flex-row gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search by role or company..."
                  className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl shadow-xs focus:ring-2 focus:ring-blue-500 bg-white font-medium text-xs sm:text-sm text-gray-800 focus:outline-none transition-shadow"
                />
                {searchKeyword && (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors text-xs font-semibold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Mobile Filter Toggle Trigger Button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-bold text-gray-600 hover:text-gray-900 active:bg-slate-50 active:scale-95 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <SlidersHorizontal size={15} />
                <span className="hidden xs:inline">Filters</span>
                {(selectedJobTypes.length + selectedSalaries.length + (selectedExp !== "all" ? 1 : 0)) > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1 bg-[#2563EB] text-white rounded-full text-[9px] font-extrabold">
                    {selectedJobTypes.length + selectedSalaries.length + (selectedExp !== "all" ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Summary statistics line & sorting bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 px-1 py-1">
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {totalItems > 0 ? (
                  <>
                    Showing <strong className="text-gray-900 font-extrabold">{startIndex + 1}–{endIndex}</strong> of <strong className="text-gray-900 font-extrabold">{totalItems}</strong> results
                  </>
                ) : (
                  <>
                    Showing <strong className="text-gray-900 font-extrabold">0</strong> results
                  </>
                )}
              </span>

              {/* Controls and Sorting triggers */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Per page selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">Show:</span>
                  <div className="relative inline-block">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="appearance-none bg-white border border-[#E2E8F0] text-xs font-semibold text-gray-700 py-1.5 pl-3 pr-8 rounded-lg cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value={10}>10 jobs</option>
                      <option value={15}>15 jobs</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                {/* Sorting trigger */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">Sort by:</span>
                  <div className="relative inline-block">
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="appearance-none bg-white border border-[#E2E8F0] text-xs font-semibold text-gray-700 py-1.5 pl-3 pr-8 rounded-lg cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                    <option value="recent">Recent first</option>
                    <option value="salary_desc">Highest salary</option>
                    <option value="experience_asc">Entry level first</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

            {/* Listing feed of Jobs */}
            <div className="space-y-4">
              {isFiltering ? (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-20 text-center flex flex-col items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-3 border-[#2563EB] border-t-transparent"></div>
                  <p className="text-xs text-gray-400 font-medium">Refreshing list matcher...</p>
                </div>
              ) : sortedJobs.length === 0 ? (
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-16 text-center space-y-2">
                  <p className="text-sm font-bold text-gray-700">No postings matches your conditions</p>
                  <p className="text-xs text-gray-450">Try broadening your search term or updating the filter sidebar checks.</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 px-4 py-2 border border-blue-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                paginatedJobs.map((job) => {
                  const companyObj = companies.find(c => c.id === job.companyId) || {
                    logoUrl: job.id === "job_1" ? "https://companieslogo.com/img/orig/TCS.NS_r-a7fc190a.png" : undefined,
                    logoEmoji: "🏢",
                    verified: false
                  };
                  const isApplied = appliedJobIds.includes(job.id);

                  return (
                    <motion.div
                      key={job.id}
                      className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-xs transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group cursor-pointer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      whileHover={{ scale: 1.01, y: -2, boxShadow: "0 15px 25px -5px rgba(0,0,0,0.03)" }}
                      onClick={() => {
                        onSelectJob(job);
                        setInspectingJob(job);
                      }}
                    >
                      {/* Left: Logo/Icon + Job core detail block */}
                      <div className="flex items-start gap-4">
                        
                        {/* Company Logo Square Container */}
                        <div className="w-14 h-14 bg-white p-2.5 rounded-xl border border-gray-150 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                          {companyObj.logoUrl ? (
                            <img
                              src={companyObj.logoUrl}
                              alt={`${job.companyName} logo`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (parent && !parent.querySelector(".fallback-emoji")) {
                                  const fallback = document.createElement("span");
                                  fallback.className = "text-xl fallback-emoji";
                                  fallback.innerText = companyObj.logoEmoji || "🏢";
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <span className="text-xl">{companyObj.logoEmoji || "🏢"}</span>
                          )}
                        </div>

                        {/* Text descriptions */}
                        <div className="space-y-1">
                          <h3 
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectJob(job);
                              setInspectingJob(job);
                            }}
                            className="font-bold text-[#0F172A] text-base leading-tight hover:text-[#2563EB] cursor-pointer transition-colors"
                          >
                            {job.title}
                          </h3>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-semibold text-gray-500">
                              {job.companyName}
                            </span>
                            {companyObj.verified && (
                              <span className="bg-emerald-50 border border-emerald-100 text-[9px] text-[#059669] px-1 rounded-sm uppercase font-bold tracking-wider">
                                Verified
                              </span>
                            )}
                          </div>

                          {/* Meta items horizontally */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2.5 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1">
                              <MapPin size={13} className="text-gray-400" /> {job.location}
                            </span>
                            <span className="flex items-center gap-0.5 text-emerald-600 font-semibold">
                              <IndianRupee size={13} className="text-emerald-500" /> {job.salaryRange}
                            </span>
                            <span className="flex items-center gap-1 bg-[#F1F5F9] text-gray-600 rounded px-1.5 py-0.5 text-[11px]">
                              <Briefcase size={11} className="text-gray-400" /> {job.jobType}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* Right: view details and Apply button triggers layout */}
                      <div className="flex items-center gap-2.5 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0">
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectJob(job);
                            setInspectingJob(job);
                          }}
                          className="border border-[#CBD5E1] text-[#334155] bg-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs hover:border-slate-350 cursor-pointer"
                        >
                          View Details
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!currentUser) {
                              onOpenAuth();
                            } else {
                              onApplyJob(job.id);
                            }
                          }}
                          disabled={isApplied}
                          className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer ${
                            isApplied
                              ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] cursor-not-allowed"
                              : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                          }`}
                        >
                          {isApplied ? "Applied" : "Apply Now"}
                        </button>

                      </div>

                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E2E8F0] mt-6 bg-[#FAFBFD]/50 p-4 rounded-2xl border border-[#E2E8F0]/80">
                <span className="text-xs text-gray-500 font-medium">
                  Showing page <span className="font-bold text-[#2563EB]">{currentPage}</span> of <span className="font-semibold text-gray-700">{totalPages}</span> ({totalItems} total jobs matching)
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Prev button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage((prev) => prev - 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center p-2 rounded-lg border text-xs font-semibold select-none transition-all ${
                      currentPage === 1
                        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer shadow-2xs"
                    }`}
                    title="Previous Page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Individual page buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                    const isSelected = p === currentPage;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setCurrentPage(p);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 cursor-pointer shadow-2xs"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  {/* Next button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage((prev) => prev + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center p-2 rounded-lg border text-xs font-semibold select-none transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer shadow-2xs"
                    }`}
                    title="Next Page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Polish job details Inspector Modal popup (Fulfill: View Details -> Show Job Description) */}
      {inspectingJob && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={closeDetailsModal}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header/title area */}
            <div className="bg-[#FAFBFD] px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-white p-2 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {companies.find(c => c.id === inspectingJob.companyId)?.logoUrl ? (
                    <img
                      src={companies.find(c => c.id === inspectingJob.companyId)?.logoUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-xl">🏢</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{inspectingJob.title}</h3>
                  <p className="text-xs text-gray-500 font-semibold">{inspectingJob.companyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Save star */}
                {(!currentUser || currentUser.role === "seeker") && (
                  <button
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                      } else {
                        onToggleSaveJob(inspectingJob.id);
                      }
                    }}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      savedJobIds.includes(inspectingJob.id)
                        ? "bg-amber-50 border-amber-250 text-amber-550"
                        : "bg-white border-slate-200 text-gray-400 hover:text-amber-500"
                    }`}
                    title="Bookmark this opening"
                  >
                    {savedJobIds.includes(inspectingJob.id) ? (
                      <Star size={16} className="fill-current" />
                    ) : (
                      <StarOff size={16} />
                    )}
                  </button>
                )}

                <button 
                  onClick={closeDetailsModal}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-900 border border-[#E2E8F0]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Scrollable details body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Metric tags panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#EFF6FF]/40 border border-[#DBEAFE] p-4 rounded-xl">
                <div>
                  <span className="text-[10px] text-blue-600 block uppercase font-bold tracking-wider mb-0.5">Location</span>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    <MapPin size={12} className="text-gray-400 shrink-0" /> {inspectingJob.location}
                  </span>
                </div>
                
                <div>
                  <span className="text-[10px] text-blue-600 block uppercase font-bold tracking-wider mb-0.5">Salary Offer</span>
                  <span className="text-xs font-bold text-gray-800 flex items-center shrink-0">
                    <IndianRupee size={11} className="text-emerald-500 shrink-0" /> {inspectingJob.salaryRange}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-blue-600 block uppercase font-bold tracking-wider mb-0.5">Job Format</span>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1 select-none">
                    <Briefcase size={11} className="text-gray-400 shrink-0" /> {inspectingJob.jobType}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-blue-600 block uppercase font-bold tracking-wider mb-0.5">Min Experience</span>
                  <span className="text-xs font-bold text-gray-800">
                    {inspectingJob.experienceLevel}+ Years
                  </span>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase block">
                  Job Description
                </span>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                  {inspectingJob.description}
                </p>
              </div>

              {/* Requirements & bullets */}
              {inspectingJob.requirements && inspectingJob.requirements.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-xs font-bold tracking-widest text-[#2563EB] uppercase block">
                    Ideal Candidate Qualifications
                  </span>
                  <ul className="space-y-2 list-none pl-1">
                    {inspectingJob.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical indicators badge list */}
              <div className="pt-2">
                <span className="text-[10px] text-gray-400 font-mono font-bold block mb-1">
                  Posted: {inspectingJob.datePosted} • Opening ID: {inspectingJob.id}
                </span>
              </div>

            </div>

            {/* Sticky Footing with final CTA */}
            <div className="px-6 py-4 border-t border-gray-150 flex items-center justify-between bg-gray-50">
              
              <div className="text-xs text-gray-400">
                {currentUser && currentUser.role === "seeker" && !currentUser.resumeName && (
                  <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                    <AlertCircle size={12} /> Upload resume in Seeker Dashboard first.
                  </span>
                )}
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={closeDetailsModal}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 bgcolor-white cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!currentUser) {
                      onOpenAuth();
                    } else {
                      onApplyJob(inspectingJob.id);
                    }
                  }}
                  disabled={appliedJobIds.includes(inspectingJob.id)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                    appliedJobIds.includes(inspectingJob.id)
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-not-allowed"
                      : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                  }`}
                >
                  {appliedJobIds.includes(inspectingJob.id) ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} /> Applied Successfully
                    </span>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Mobile Filters Drawer Modal (Dynamic sliding bottom sheet / side over) */}
      {mobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileFiltersOpen(false)}
          />

          {/* Sliding Content panel */}
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#FAFBFD]">
              <span className="text-sm font-extrabold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <SlidersHorizontal size={15} className="text-gray-500" /> Filters
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    setMobileFiltersOpen(false);
                  }}
                  className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8]"
                >
                  RESET
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Inner Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Filter Group: JOB TYPE */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  JOB TYPE
                </h4>
                <div className="space-y-3">
                  {jobFormatOptions.map((type) => {
                    const isChecked = selectedJobTypes.includes(type);
                    return (
                      <label
                        key={type}
                        className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none font-medium"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleJobTypeToggle(type)}
                          className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 cursor-pointer transition-all"
                        />
                        <span>{type}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Filter Group: SALARY RANGE */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  SALARY RANGE
                </h4>
                <div className="space-y-3">
                  {salaryRangeOptions.map((range) => {
                    const isChecked = selectedSalaries.includes(range);
                    return (
                      <label
                        key={range}
                        className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer select-none font-medium"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSalaryToggle(range)}
                          className="rounded border-[#CBD5E1] text-[#2563EB] focus:ring-blue-500 w-4 h-4 cursor-pointer transition-all"
                        />
                        <span>{range}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Extra filter: EXPERIENCE LEVEL */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  EXPERIENCE LEVEL
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { key: "all", label: "Any Exp" },
                    { key: "0-1", label: "0-1 Yr" },
                    { key: "1-3", label: "1-3 Yrs" },
                    { key: "3-5", label: "3-5 Yrs" },
                    { key: "5+", label: "5+ Yrs" },
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      type="button"
                      onClick={() => setSelectedExp(btn.key)}
                      className={`text-[11px] py-1.5 px-2.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                        selectedExp === btn.key
                          ? "bg-[#2563EB] text-white border-[#2563EB]"
                          : "bg-white text-gray-600 border-[#E2E8F0] hover:border-gray-350"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky bottom Apply button inside the drawer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-[#2563EB] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-colors hover:bg-blue-700 cursor-pointer text-center block shadow-xs"
              >
                View {totalItems} Matching Jobs
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
