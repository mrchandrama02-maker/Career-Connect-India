/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Company, Job, Application } from "../types";
import { Building, Plus, FileText, CheckCircle2, XCircle, Trash2, Edit2, Calendar, Link, Users, Award, MapPin, IndianRupee, Briefcase, ChevronRight, Settings, Camera, Upload, Image } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

interface RecruiterDashboardProps {
  currentUser: User;
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  onUpdateCompany: (company: Company) => void;
  onPostJob: (jobData: Omit<Job, "id" | "companyId" | "companyName" | "datePosted">) => void;
  onUpdateJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateApplicationStatus: (appId: string, status: "Shortlisted" | "Rejected") => void;
}

export default function RecruiterDashboard({
  currentUser,
  companies,
  jobs,
  applications,
  onUpdateCompany,
  onPostJob,
  onUpdateJob,
  onDeleteJob,
  onUpdateApplicationStatus,
}: RecruiterDashboardProps) {
  // Find associated company
  const company = companies.find(c => c.id === currentUser.companyId);

  const [activeTab, setActiveTab] = useState<"overview" | "post" | "jobs" | "applicants" | "settings">("overview");

  // Pagination State
  const [jobsPage, setJobsPage] = useState(1);
  const [candidatesPage, setCandidatesPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  React.useEffect(() => {
    setJobsPage(1);
    setCandidatesPage(1);
  }, [activeTab]);

  // Selected Applicant for view modal/drawer
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Edit Job State
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form Fields for POSTING a new job
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("Bangalore");
  const [jobSalary, setJobSalary] = useState("8-12 LPA");
  const [jobType, setJobType] = useState("Full-time");
  const [jobExpLevel, setJobExpLevel] = useState("2");
  const [jobDesc, setJobDesc] = useState("");
  const [jobReqs, setJobReqs] = useState(""); // newline separated

  // Form Fields for COMPANY EDIT
  const [compName, setCompName] = useState(company?.name || "");
  const [compDesc, setCompDesc] = useState(company?.description || "");
  const [compWebsite, setCompWebsite] = useState(company?.website || "");
  const [compIndustry, setCompIndustry] = useState(company?.industry || "");
  const [compLocation, setCompLocation] = useState(company?.location || "");
  const [compSize, setCompSize] = useState(company?.companySize || "");
  const [compEmoji, setCompEmoji] = useState(company?.logoEmoji || "🏢");
  const [compLogoUrl, setCompLogoUrl] = useState(company?.logoUrl || "");

  // Company logo updating modalities
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [logoError, setLogoError] = useState("");
  const fileInputRefForHeaderLogo = React.useRef<HTMLInputElement>(null);
  const fileInputRefForSettingsLogo = React.useRef<HTMLInputElement>(null);

  const processLogoFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setLogoError("Please upload an image file (PNG, JPG, WebP, SVG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setLogoError("Image size should be less than 2MB.");
      return;
    }
    setLogoError("");
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        setCompLogoUrl(event.target.result);
      }
    };
    reader.onerror = () => {
      setLogoError("Could not read file. Please try a different image.");
    };
    reader.readAsDataURL(file);
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processLogoFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processLogoFile(file);
    }
  };

  const handleLogoUpdateCompleted = (newLogoUrl: string) => {
    setCompLogoUrl(newLogoUrl);
    const updatedCompany: Company = {
      ...company,
      logoUrl: newLogoUrl,
    };
    onUpdateCompany(updatedCompany);
  };

  // Sync state variables with original company prop if updated externally
  React.useEffect(() => {
    if (company) {
      setCompName(company.name || "");
      setCompDesc(company.description || "");
      setCompWebsite(company.website || "");
      setCompIndustry(company.industry || "");
      setCompLocation(company.location || "");
      setCompSize(company.companySize || "");
      setCompEmoji(company.logoEmoji || "🏢");
      setCompLogoUrl(company.logoUrl || "");
    }
  }, [company]);

  if (!company) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white border border-[#E5E7EB] rounded-2xl space-y-4">
        <Building size={48} className="mx-auto text-red-500" />
        <h2 className="text-xl font-bold">Unmapped Recruiter Account</h2>
        <p className="text-sm text-gray-500">Your recruiter session does not map to an existing company registry. Please try registering a new company.</p>
      </div>
    );
  }

  // Filter Jobs and Applications for this company
  const companyJobs = jobs.filter(j => j.companyId === company.id);
  const companyJobIds = companyJobs.map(j => j.id);
  const companyApplications = applications.filter(app => companyJobIds.includes(app.jobId));

  // Pagination slicing
  const totalJobs = companyJobs.length;
  const totalJobsPages = Math.ceil(totalJobs / ITEMS_PER_PAGE) || 1;
  const jobsStartIdx = (jobsPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = companyJobs.slice(jobsStartIdx, jobsStartIdx + ITEMS_PER_PAGE);

  const totalCandidates = companyApplications.length;
  const totalCandidatesPages = Math.ceil(totalCandidates / ITEMS_PER_PAGE) || 1;
  const candidatesStartIdx = (candidatesPage - 1) * ITEMS_PER_PAGE;
  const paginatedCandidates = companyApplications.slice(candidatesStartIdx, candidatesStartIdx + ITEMS_PER_PAGE);

  // Count Stats
  const activeJobsCount = companyJobs.filter(j => j.active).length;
  const totalApplicantsCount = companyApplications.length;
  const shortlistedApplicantsCount = companyApplications.filter(app => app.status === "Shortlisted").length;

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobDesc) {
      alert("Please provide the core Job Title and Description.");
      return;
    }

    const bulletReqs = jobReqs
      ? jobReqs.split("\n").map(r => r.trim()).filter(r => r.length > 0)
      : [];

    onPostJob({
      title: jobTitle,
      location: jobLocation,
      salaryRange: jobSalary,
      jobType: jobType,
      experienceLevel: parseInt(jobExpLevel) || 0,
      description: jobDesc,
      requirements: bulletReqs,
      active: true,
    });

    // Reset Form
    setJobTitle("");
    setJobLocation("Bangalore");
    setJobSalary("8-12 LPA");
    setJobType("Full-time");
    setJobExpLevel("2");
    setJobDesc("");
    setJobReqs("");

    alert("Job posted successfully!");
    setActiveTab("jobs");
  };

  const handleEditJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    onUpdateJob(editingJob);
    setEditingJob(null);
    alert("Job updated successfully!");
  };

  const handleCompanyUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCompany: Company = {
      ...company,
      name: compName,
      description: compDesc,
      website: compWebsite,
      industry: compIndustry,
      location: compLocation,
      companySize: compSize,
      logoEmoji: compEmoji,
      logoUrl: compLogoUrl,
    };
    onUpdateCompany(updatedCompany);
    setActiveTab("overview");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-4 animate-in fade-in duration-200" id="recruiter-dashboard">
      
      {/* Recruiter Header Banner */}
      <div className="bg-gradient-to-r from-blue-50/50 via-white to-blue-50 border border-[#E5E7EB] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => {
              setLogoError("");
              setLogoModalOpen(true);
            }}
            title="Click to update corporate logo"
            className="group relative w-20 h-20 bg-white p-2 rounded-2xl border border-[#E5E7EB] hover:border-blue-400 shadow-xs flex items-center justify-center overflow-hidden cursor-pointer transition-all shrink-0"
          >
            <CompanyLogo
              logoUrl={company.logoUrl}
              logoEmoji={company.logoEmoji || "🏢"}
              name={company.name}
              className="w-full h-full flex items-center justify-center"
              imgClassName="w-full h-full object-contain group-hover:scale-95 transition-transform"
              sizeClassName="text-4xl group-hover:scale-95 transition-transform"
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity duration-150">
              <Camera size={18} className="animate-bounce" />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 scale-90">Edit Logo</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-2xl font-extrabold text-[#1F293A]">{company.name}</h1>
              {company.verified && (
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold uppercase py-0.5 px-2 rounded-full inline-flex items-center gap-0.5">
                  <CheckCircle2 size={10} className="fill-current" /> Verified Recruiter
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 capitalize font-mono mt-1">
              Recruiter Control: {currentUser.name} ({currentUser.email})
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab("post")}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} /> Post an Indian Job Opening
        </button>
      </div>

      {/* Workspace Tabs */}
      <div className="flex border-b border-[#E5E7EB] overflow-x-auto scrollbar-none whitespace-nowrap" id="recruiter-tabs">
        {[
          { key: "overview", label: "Dashboard Hub" },
          { key: "post", label: "Post New Position" },
          { key: "jobs", label: "Manage Jobs (" + companyJobs.length + ")" },
          { key: "applicants", label: "Applicants Inbox (" + totalApplicantsCount + ")" },
          { key: "settings", label: "Company Registry Info" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key as any);
              setEditingJob(null);
            }}
            className={`py-3 px-5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.key
                ? "border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF]/40 font-bold"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview Dashboard */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Posted Jobs</span>
              <p className="text-4xl font-extrabold text-blue-500 mt-1">{companyJobs.length}</p>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">{activeJobsCount} currently accepting applicants</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Total Applicants</span>
              <p className="text-4xl font-extrabold text-purple-600 mt-1">{totalApplicantsCount}</p>
              <button
                onClick={() => setActiveTab("applicants")}
                className="text-[10px] text-[#3B82F6] hover:underline font-semibold block mt-1"
              >
                Access candidate resumes
              </button>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Shortlisted Candidates</span>
              <p className="text-4xl font-extrabold text-emerald-500 mt-1">{shortlistedApplicantsCount}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">Shortlisted status notified to candidates</p>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs space-y-3">
              <h3 className="font-bold text-[#1F293A] text-sm border-b pb-2">Registered Company Card</h3>
              <div className="text-xs space-y-3">
                <p><span className="text-gray-400 font-medium">Headquarters:</span> <span className="font-semibold text-gray-700">{company.location}</span></p>
                <p><span className="text-gray-400 font-medium">Industry sectors:</span> <span className="font-semibold text-gray-700">{company.industry}</span></p>
                <p><span className="text-gray-400 font-medium">Employee Count:</span> <span className="font-semibold text-gray-700">{company.companySize}</span></p>
                <p><span className="text-gray-400 font-medium">Website domain:</span> <a href={company.website} target="_blank" rel="noreferrer" className="font-mono text-blue-500 hover:underline">{company.website}</a></p>
                <p className="text-gray-500 leading-relaxed italic">{company.description}</p>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs lg:col-span-2 space-y-4">
              <h3 className="font-bold text-[#1F293A] text-sm border-b pb-2">Latest Candidate Submissions</h3>
              {companyApplications.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-xs">
                  No applicants filed yet. Share outstanding jobs to trigger submissions!
                </div>
              ) : (
                <div className="space-y-3 max-h-[250px] overflow-y-auto">
                  {companyApplications.slice(0, 3).map(app => (
                    <div key={app.id} className="p-3 border border-gray-100 rounded-lg flex items-center justify-between text-xs hover:bg-slate-50">
                      <div>
                        <p className="font-bold text-gray-800">{app.seekerName}</p>
                        <p className="text-gray-500 italic">For {app.jobTitle} • {app.seekerExperience} Yrs Exp</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          app.status === "Shortlisted"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : app.status === "Rejected"
                            ? "bg-red-50 text-red-600 border border-red-100"
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                        }`}>
                          {app.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setActiveTab("applicants");
                          }}
                          className="bg-gray-100 font-bold px-2 py-1 rounded text-gray-600 hover:bg-[#3B82F6] hover:text-white transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Tab: Post a job */}
      {activeTab === "post" && (
        <form onSubmit={handlePostSubmit} className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-[#1F293A]">Register New Job Opening Form</h2>
            <p className="text-xs text-gray-400">Position coordinates will instantly project onto our search listing cards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Official Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Hiring Location
              </label>
              <select
                value={jobLocation}
                onChange={e => setJobLocation(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white"
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Remote">Remote</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Salary Package Range
              </label>
              <input
                type="text"
                value={jobSalary}
                onChange={e => setJobSalary(e.target.value)}
                placeholder="e.g. 8-12 LPA"
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Job Appointment Type
              </label>
              <select
                value={jobType}
                onChange={e => setJobType(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Required Experience (Years Minimum)
              </label>
              <input
                type="number"
                value={jobExpLevel}
                onChange={e => setJobExpLevel(e.target.value)}
                min="0"
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Job Description
            </label>
            <textarea
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              placeholder="State roles, responsibilities and stack expectations..."
              rows={4}
              className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Skills Requirements (One bullet criteria per line)
            </label>
            <textarea
              value={jobReqs}
              onChange={e => setJobReqs(e.target.value)}
              placeholder="React + Redux design pattern experience
Webpack bundles configuration
Figma responsive layouts transition"
              rows={3}
              className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-xs font-mono"
            />
          </div>

          <button
            type="submit"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Publish To Job Seeker Index
          </button>
        </form>
      )}

      {/* Tab: Manage Jobs list */}
      {activeTab === "jobs" && (
        <div className="space-y-4 animate-in fade-in">
          
          {editingJob && (
            <div className="p-6 border-2 border-[#3B82F6] bg-blue-50/10 rounded-xl space-y-4">
              <h3 className="font-bold text-[#1F293A] text-sm">Edit Position: {editingJob.title}</h3>
              <form onSubmit={handleEditJobSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Title</label>
                    <input
                      type="text"
                      value={editingJob.title}
                      onChange={e => setEditingJob({...editingJob, title: e.target.value})}
                      className="w-full p-2 border bg-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Location</label>
                    <input
                      type="text"
                      value={editingJob.location}
                      onChange={e => setEditingJob({...editingJob, location: e.target.value})}
                      className="w-full p-2 border bg-white rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Salary</label>
                    <input
                      type="text"
                      value={editingJob.salaryRange}
                      onChange={e => setEditingJob({...editingJob, salaryRange: e.target.value})}
                      className="w-full p-2 border bg-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Appt Type</label>
                    <input
                      type="text"
                      value={editingJob.jobType}
                      onChange={e => setEditingJob({...editingJob, jobType: e.target.value})}
                      className="w-full p-2 border bg-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Min Exp Yrs</label>
                    <input
                      type="number"
                      value={editingJob.experienceLevel}
                      onChange={e => setEditingJob({...editingJob, experienceLevel: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border bg-white rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase text-gray-500 mb-0.5">Task Description</label>
                  <textarea
                    value={editingJob.description}
                    onChange={e => setEditingJob({...editingJob, description: e.target.value})}
                    rows={2}
                    className="w-full p-2 border bg-white rounded"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingJob(null)}
                    className="p-1.5 px-3 bg-gray-100 text-gray-700 rounded cursor-pointer"
                  >
                    Discard Edit
                  </button>
                  <button
                    type="submit"
                    className="p-1.5 px-4 bg-[#3B82F6] text-white rounded font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white p-4 rounded-xl border border-[#E5E7EB]">
            <h2 className="font-bold text-[#1F293A] text-sm">Currently Active Vacancies</h2>
          </div>

          {companyJobs.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] p-12 text-center rounded-xl text-gray-400 text-sm">
              Your company hasn't posted any jobs yet.
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white border border-[#E5E7EB] p-5 rounded-xl shadow-xs flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-800 text-base">{job.title}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        job.active ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-500"
                      }`}>
                        {job.active ? "Accepting Applicants" : "Closed"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 font-medium font-mono">
                      {job.location} • {job.salaryRange} • {job.jobType} • Min {job.experienceLevel} Yrs Exp
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{job.description}</p>
                  </div>

                  <div className="flex md:flex-col items-end gap-2 shrink-0 md:h-full self-stretch justify-between mt-2 md:mt-0">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit2 size={12} /> Edit
                      </button>

                      <button
                        onClick={() => {
                          const updated = { ...job, active: !job.active };
                          onUpdateJob(updated);
                        }}
                        className="p-1 px-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        {job.active ? "Close Index" : "Activate Index"}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this job listing?")) {
                            onDeleteJob(job.id);
                          }
                        }}
                        className="p-1 px-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-100 cursor-pointer"
                        title="Permanently Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      Posted: {job.datePosted}
                    </span>
                  </div>
                </div>
              ))}

              {/* Pagination controls for Recruiter Jobs */}
              <div className="bg-white px-4 py-3 border border-[#E5E7EB] rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-mono">
                    Showing <span className="font-semibold">{totalJobs === 0 ? 0 : jobsStartIdx + 1}</span> to{" "}
                    <span className="font-semibold">
                      {Math.min(jobsStartIdx + ITEMS_PER_PAGE, totalJobs)}
                    </span>{" "}
                    of <span className="font-semibold">{totalJobs}</span> positions
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={jobsPage === 1}
                    onClick={() => {
                      setJobsPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-mono font-bold leading-7">
                    Page {jobsPage} of {totalJobsPages}
                  </span>
                  <button
                    disabled={jobsPage === totalJobsPages}
                    onClick={() => {
                      setJobsPage(p => Math.min(totalJobsPages, p + 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Tab: Applicants Inbox */}
      {activeTab === "applicants" && (
        <div className="space-y-4 animate-in fade-in" id="recruiter-applicants">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Applicants Selection */}
            <div className={`lg:col-span-1 space-y-3 ${selectedApp ? "hidden lg:block" : "block"}`}>
              <div className="bg-white p-3 border border-[#E5E7EB] rounded-xl text-xs">
                <h3 className="font-bold text-[#1F293A]">Candidate Inbox Profiles</h3>
                <p className="text-gray-400 mt-0.5">Click any record below to load dossier</p>
              </div>

              {companyApplications.length === 0 ? (
                <div className="bg-white border border-[#E5E7EB] p-8 text-center text-xs rounded-xl text-gray-400">
                  Inbox folder is empty
                </div>
              ) : (
                <div className="space-y-2">
                  {paginatedCandidates.map(app => (
                    <button
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer block ${
                        selectedApp?.id === app.id
                          ? "border-[#3B82F6] bg-[#EFF6FF]/60"
                          : "border-[#E5E7EB] bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1F293A] text-xs leading-none line-clamp-1">
                          {app.seekerName}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                          app.status === "Shortlisted" ? "bg-emerald-100 text-emerald-800" : app.status === "Rejected" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold mt-1 line-clamp-1">
                        For: {app.jobTitle}
                      </p>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">
                        Exp: {app.seekerExperience} Yrs • Filed: {app.dateApplied}
                      </p>
                    </button>
                  ))}

                  {/* Candidates Pagination Controls */}
                  <div className="bg-white p-3 border border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-between gap-2 mt-4">
                    <span className="text-[10px] text-gray-500 font-mono">
                      Showing {candidatesStartIdx + 1}-{Math.min(candidatesStartIdx + ITEMS_PER_PAGE, totalCandidates)} of {totalCandidates} applicants
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={candidatesPage === 1}
                        onClick={() => setCandidatesPage(p => Math.max(1, p - 1))}
                        className="px-2.5 py-1 border border-gray-300 rounded-lg text-[10px] font-semibold bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Prev
                      </button>
                      <span className="text-[10px] font-mono leading-6 font-bold">
                        Page {candidatesPage} of {totalCandidatesPages}
                      </span>
                      <button
                        type="button"
                        disabled={candidatesPage === totalCandidatesPages}
                        onClick={() => setCandidatesPage(p => Math.min(totalCandidatesPages, p + 1))}
                        className="px-2.5 py-1 border border-gray-300 rounded-lg text-[10px] font-semibold bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Right Column: Active Profile Dossier Detail */}
            <div className={`lg:col-span-2 ${selectedApp ? "block" : "hidden lg:block"}`}>
              {selectedApp ? (
                <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-xs space-y-6 animate-in fade-in duration-150">
                  
                  {/* Mobile Back Navigation */}
                  <div className="lg:hidden pb-2 border-b border-gray-100 mb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedApp(null)}
                      className="text-xs font-bold text-[#3B82F6] hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-3 py-2 rounded-lg cursor-pointer"
                    >
                      ← Back to Candidate List
                    </button>
                  </div>

                  {/* Dossier Header */}
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-[#1F293A]">{selectedApp.seekerName}</h4>
                      <p className="text-xs text-gray-400 italic">Submitted for: <span className="font-bold text-gray-600">{selectedApp.jobTitle}</span></p>
                      
                      <div className="text-[11px] text-gray-500 mt-2 space-y-1">
                        <p><span className="font-semibold">Candidate Email:</span> {selectedApp.seekerEmail}</p>
                        <p><span className="font-semibold">Submission ID:</span> {selectedApp.id}</p>
                        <p><span className="font-semibold">Applied on:</span> {selectedApp.dateApplied}</p>
                      </div>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-end gap-1.5">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide tracking-wider block ${
                        selectedApp.status === "Shortlisted"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : selectedApp.status === "Rejected"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        Decision: {selectedApp.status}
                      </span>
                    </div>
                  </div>

                  {/* Dossier Body */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block tracking-widest mb-1.5">Experience & Background</span>
                      <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                        <Award size={14} className="text-amber-500" />
                        {selectedApp.seekerExperience} Years of active trade experience
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block tracking-widest mb-1.5">Applicant Skill Matrix</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApp.seekerSkills && selectedApp.seekerSkills.length > 0 ? (
                          selectedApp.seekerSkills.map(sk => (
                            <span key={sk} className="bg-slate-100 text-gray-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded">
                              {sk}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs italic">No matching tags parsed</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block tracking-widest mb-1">Attached Curriculum Vitae (CV)</span>
                      {selectedApp.resumeName ? (
                        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                          <span className="font-mono text-gray-700 font-semibold truncate max-w-xs block flex items-center gap-1.5">
                            <FileText size={16} className="text-blue-500" />
                            {selectedApp.resumeName}
                          </span>
                          <a
                            href={selectedApp.resumeBase64 || "#"}
                            download={selectedApp.resumeName}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-mono bg-white border border-[#E5E7EB] hover:border-blue-500 text-blue-500 font-bold px-2.5 py-1 rounded inline-block"
                          >
                            Download PDF CV
                          </a>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">No formal resume file attached. Refer to profile skills above.</p>
                      )}
                    </div>
                  </div>

                  {/* Hiring Decision Controls */}
                  <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                    <button
                      onClick={() => {
                        onUpdateApplicationStatus(selectedApp.id, "Rejected");
                        setSelectedApp({ ...selectedApp, status: "Rejected" });
                      }}
                      disabled={selectedApp.status === "Rejected"}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <XCircle size={14} /> Mark Rejected
                    </button>
                    <button
                      onClick={() => {
                        onUpdateApplicationStatus(selectedApp.id, "Shortlisted");
                        setSelectedApp({ ...selectedApp, status: "Shortlisted" });
                      }}
                      disabled={selectedApp.status === "Shortlisted"}
                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 size={14} /> Shortlist Candidate
                    </button>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed rounded-2xl text-center py-24 text-gray-400 text-xs">
                  Select an applicant from the candidates list to review details.
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === "settings" && (
        <form onSubmit={handleCompanyUpdateSubmit} className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-bold text-[#1F293A]">Edit Company registry dossier</h2>
            <p className="text-xs text-gray-400">Updating these fields syncs your job banners automatically.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={compName}
                onChange={e => setCompName(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Industry Category
              </label>
              <input
                type="text"
                value={compIndustry}
                onChange={e => setCompIndustry(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Headquarters location
              </label>
              <input
                type="text"
                value={compLocation}
                onChange={e => setCompLocation(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Website
              </label>
              <input
                type="url"
                value={compWebsite}
                onChange={e => setCompWebsite(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                Employee Size
              </label>
              <input
                type="text"
                value={compSize}
                onChange={e => setCompSize(e.target.value)}
                className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4.5 space-y-4">
            <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-200">
              <Image size={14} className="text-blue-500" /> Corporate Brand Identity & Logo
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Left Side: Current Workspace Preview */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Brand Preview</span>
                <div className="w-24 h-24 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-center overflow-hidden relative group">
                  <CompanyLogo
                    logoUrl={compLogoUrl}
                    logoEmoji={compEmoji || "🏢"}
                    name="Brand preview"
                    className="w-full h-full flex items-center justify-center"
                    imgClassName="w-full h-full object-contain"
                    sizeClassName="text-4xl"
                  />
                </div>
              </div>

              {/* Right Side: Upload and input details */}
              <div className="flex-1 w-full space-y-3">
                <span className="text-xs font-semibold text-gray-500 block">Update your corporate logo</span>
                
                {/* Method A: Upload & Drag/Drop */}
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRefForSettingsLogo.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    isDraggingLogo 
                      ? "border-blue-500 bg-blue-50/50" 
                      : "border-gray-200 hover:border-blue-400 bg-white"
                  }`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRefForSettingsLogo}
                    onChange={handleLogoFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Upload size={20} className="mx-auto text-gray-400 mb-1.5" />
                  <p className="text-xs font-bold text-gray-700">Click to select image file or drag here</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Supports PNG, JPG, WebP (Max 2MB)</p>
                </div>

                {logoError && (
                  <p className="text-xs text-red-500 font-mono font-medium">{logoError}</p>
                )}

                {/* Method B: Direct URL Input */}
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                    Or specify direct Image asset URL
                  </label>
                  <input
                    type="url"
                    value={compLogoUrl}
                    onChange={e => {
                      setLogoError("");
                      setCompLogoUrl(e.target.value);
                    }}
                    placeholder="e.g. https://logo.clearbit.com/techmahindra.com"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                Select fallback backup symbol
              </label>
              <div className="flex gap-2">
                {["🏢", "🚀", "🔬", "🛒", "🩺", "🏦", "⚡", "🤖"].map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => setCompEmoji(em)}
                    className={`p-2 bg-white text-md rounded-xl border cursor-pointer hover:bg-gray-50 transition-all ${
                      compEmoji === em ? "border-[#3B82F6] scale-110 shadow-xs" : "border-gray-200"
                    }`}
                  >
                    {em}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
              Corporate Description
            </label>
            <textarea
              value={compDesc}
              onChange={e => setCompDesc(e.target.value)}
              rows={3}
              className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none"
              required
            />
          </div>

          <div className="pt-2 border-t flex justify-end">
            <button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2 px-5 rounded-xl text-xs cursor-pointer"
            >
              Update Corporate Profile
            </button>
          </div>
        </form>
      )}

      {/* Interactive Quick Logo Overlay Modal */}
      {logoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto" id="logo-change-modal">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-150 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-blue-500" />
                <h3 className="font-extrabold text-sm text-[#1F293A]">Change Corporate Logo</h3>
              </div>
              <button 
                type="button"
                onClick={() => setLogoModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 cursor-pointer"
              >
                <XCircle size={18} />
              </button>
            </div>

            {/* Drag & Drop Visual Box */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingLogo(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  processLogoFile(file);
                }
              }}
              onClick={() => fileInputRefForHeaderLogo.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                isDraggingLogo 
                  ? "border-blue-500 bg-blue-50/50" 
                  : "border-gray-200 hover:border-blue-400 bg-slate-50/55"
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRefForHeaderLogo}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    processLogoFile(file);
                  }
                }}
                accept="image/*"
                className="hidden"
              />
              {compLogoUrl ? (
                <div className="w-16 h-16 mx-auto bg-white p-1 rounded-xl border border-gray-200 shadow-xs flex items-center justify-center overflow-hidden mb-2">
                  <img src={compLogoUrl} alt="Quick preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <Upload size={24} className="mx-auto text-gray-400 mb-2 animate-pulse" />
              )}
              <span className="text-xs font-bold text-gray-700 block">Drag & drop your new logo here</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Or tap to choose storage file (PNG, JPG, WebP)</span>
            </div>

            {logoError && (
              <p className="text-xs text-red-500 font-mono font-medium text-center">{logoError}</p>
            )}

            {/* Quick prefilled link option */}
            <div className="space-y-3">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-100 space-y-1">
                <span className="text-[9px] font-extrabold text-blue-600 font-mono block uppercase tracking-wide">Quick Presets</span>
                <button
                  type="button"
                  onClick={() => {
                    setCompLogoUrl("https://cdn.corenexis.com/files/c/2156823720.webp");
                    setLogoError("");
                  }}
                  className="w-full text-left text-xs text-gray-600 hover:text-blue-600 font-medium flex items-center justify-between cursor-pointer"
                >
                  <span className="font-bold">Use Tech Mahindra WebP Vector logo</span>
                  <span className="text-[9px] bg-blue-50 text-blue-600 py-0.5 px-1.5 rounded font-mono font-extrabold">Select</span>
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                  Or input custom logo website URL
                </label>
                <input
                  type="url"
                  value={compLogoUrl}
                  onChange={e => {
                    setLogoError("");
                    setCompLogoUrl(e.target.value);
                  }}
                  placeholder="e.g. https://logo.clearbit.com/techmahindra.com"
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-blue-400 font-mono"
                />
              </div>
            </div>

            {/* Control buttons */}
            <div className="pt-3 border-t flex justify-end gap-2 font-mono">
              <button
                type="button"
                onClick={() => {
                  setLogoModalOpen(false);
                }}
                className="text-[10px] font-bold text-gray-500 hover:bg-gray-100 py-1.5 px-3 rounded-lg border border-gray-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  handleLogoUpdateCompleted(compLogoUrl);
                  setLogoModalOpen(false);
                  alert("Corporate Brand logo updated successfully!");
                }}
                className="text-[10px] font-bold bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg cursor-pointer"
              >
                Apply Logo
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
