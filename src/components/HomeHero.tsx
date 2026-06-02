/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin, Briefcase, IndianRupee, Star, StarOff, CheckCircle2, Building, Flame, ArrowRight, Compass } from "lucide-react";
import { Job, Company, User } from "../types";

interface HomeHeroProps {
  jobs: Job[];
  companies: Company[];
  currentUser: User | null;
  savedJobIds: string[];
  appliedJobIds: string[];
  onNavigate: (tab: string) => void;
  onSetGlobalSearch: (term: string, loc: string) => void;
  onOpenAuth: () => void;
  onApplyJob: (jobId: string) => void;
  onToggleSaveJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
}

export default function HomeHero({
  jobs,
  companies,
  currentUser,
  savedJobIds,
  appliedJobIds,
  onNavigate,
  onSetGlobalSearch,
  onOpenAuth,
  onApplyJob,
  onToggleSaveJob,
  onSelectJob,
}: HomeHeroProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoc, setSearchLoc] = useState("");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSetGlobalSearch(searchTerm, searchLoc);
    onNavigate("jobs");
  };

  // Get first 4 active jobs as "featured"
  const featuredJobs = jobs.filter(j => j.active).slice(0, 4);
  // Get first 3 companies as "featured"
  const topCompanies = companies.slice(0, 3);

  return (
    <div className="space-y-16 animate-in fade-in duration-200" id="home-view">
      
      {/* 1. Hero banner section with search inputs */}
      <section className="relative bg-gradient-to-br from-[#EFF6FF] via-[#FFFFFF] to-[#EFF6FF] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-blue-100/75 border border-blue-200 text-[#3B82F6] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Flame size={14} className="fill-current animate-bounce" />
            <span>Discover Elite Tech & Corporate Roles in India</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F293A] tracking-tight leading-tight">
            Connect with India's Premier <span className="text-[#3B82F6]">Tech & Business</span> Opportunities
          </h1>
          
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Explore 100% verified jobs across Mumbai, Bangalore, Delhi and remote. Use our light, lightning-fast platform designed for direct developer/recruiter communication.
          </p>

          {/* Real-time responsive search bar */}
          <form
            onSubmit={handleQuickSearch}
            className="bg-white p-2.5 rounded-2xl shadow-lg border border-[#E5E7EB] max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
            id="home-search-form"
          >
            <div className="flex-1 flex items-center px-3 border-b md:border-b-0 md:border-r border-gray-100 py-1.5">
              <Search className="text-gray-400 mr-2.5 shrink-0" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, key skills e.g., 'React', 'Python'..."
                className="w-full text-sm text-[#1F293A] focus:outline-none"
              />
            </div>
            
            <div className="flex-1 flex items-center px-3 py-1.5">
              <MapPin className="text-gray-400 mr-2.5 shrink-0" size={18} />
              <input
                type="text"
                value={searchLoc}
                onChange={(e) => setSearchLoc(e.target.value)}
                placeholder="City e.g., 'Bangalore', 'Mumbai'..."
                className="w-full text-sm text-[#1F293A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
              id="home-search-submit"
            >
              Search Jobs
            </button>
          </form>

          {/* Quick links to prefilled searches */}
          <div className="pt-2 text-xs text-gray-500">
            <span className="font-semibold text-[#1F293A] mr-2">Popular tags:</span>
            {["React", "Python", "Bangalore", "Remote", "HR Recruiting"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (["Bangalore", "Remote"].includes(tag)) {
                    onSetGlobalSearch("", tag);
                  } else {
                    onSetGlobalSearch(tag, "");
                  }
                  onNavigate("jobs");
                }}
                className="mr-2 mb-2 bg-[#EFF6FF] text-[#3B82F6] border border-blue-100 hover:border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-2.5 py-1 rounded-md transition-colors font-medium text-xs cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Three Columns Statistics Card Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB]">
          
          <div className="text-center p-4 border-b sm:border-b-0 sm:border-r border-gray-100">
            <p className="text-3xl font-extrabold text-[#3B82F6]" id="stat-jobs-count">
              {jobs.length}+
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Active Job Positions
            </p>
          </div>

          <div className="text-center p-4 border-b sm:border-b-0 sm:border-r border-gray-100">
            <p className="text-3xl font-extrabold text-emerald-500" id="stat-comp-count">
              {companies.length}
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Top Indian Companies Registered
            </p>
          </div>

          <div className="text-center p-4">
            <p className="text-3xl font-extrabold text-[#1F293A]" id="stat-saved-count">
              100% Secure
            </p>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">
              Verified Hiring Connections
            </p>
          </div>

        </div>
      </section>

      {/* 3. Featured Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1F293A]">
              Featured Recruiters & Industry Hubs
            </h2>
            <p className="text-xs text-gray-500 uppercase font-mono tracking-widest mt-1">
              Direct connection to India's top leaders
            </p>
          </div>
          <button
            onClick={() => onNavigate("companies")}
            className="text-xs font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center space-x-1 hover:underline cursor-pointer"
          >
            <span>View All Companies</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCompanies.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="bg-[#EFF6FF] px-4 py-3 rounded-xl border border-blue-50 text-2xl group-hover:scale-105 transition-transform">
                  {c.logoEmoji || "🏢"}
                </div>
                {c.verified && (
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold uppercase py-0.5 px-2 rounded-full inline-flex items-center gap-0.5">
                    <CheckCircle2 size={10} className="fill-current" /> Verified
                  </span>
                )}
              </div>
              <h3 className="font-bold text-[#1F293A] text-lg mt-4 group-hover:text-[#3B82F6] transition-colors">{c.name}</h3>
              <p className="text-xs text-gray-400 font-medium font-mono">{c.industry} • {c.location}</p>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs bg-gray-50 text-gray-500 font-semibold px-2 py-1 rounded inline-block">
                  {c.companySize}
                </span>
                <button
                  onClick={() => {
                    onSetGlobalSearch("", c.location);
                    onNavigate("jobs");
                  }}
                  className="text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Jobs in {c.location}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-end border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1F293A]">
              Urgent & Spotlight Hiring
            </h2>
            <p className="text-xs text-gray-500 uppercase font-mono tracking-widest mt-1">
              Active openings looking for competitive talent
            </p>
          </div>
          <button
            onClick={() => {
              onSetGlobalSearch("", "");
              onNavigate("jobs");
            }}
            className="text-xs font-bold text-[#3B82F6] hover:text-[#2563EB] flex items-center space-x-1 hover:underline cursor-pointer"
          >
            <span>Explore All Jobs</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);
            const isSaved = savedJobIds.includes(job.id);
            
            return (
              <div
                key={job.id}
                className="bg-white border border-[#E5E7EB] p-6 rounded-xl hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        onClick={() => onSelectJob(job)}
                        className="font-bold text-[#1F293A] text-lg hover:text-[#3B82F6] cursor-pointer transition-colors line-clamp-1"
                      >
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-semibold flex items-center gap-1 mt-1">
                        <Building size={12} className="text-gray-400" />
                        {job.companyName}
                      </p>
                    </div>

                    {/* Bookmark Toggle */}
                    {(!currentUser || currentUser.role === "seeker") && (
                      <button
                        onClick={() => {
                          if (!currentUser) {
                            onOpenAuth();
                          } else {
                            onToggleSaveJob(job.id);
                          }
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isSaved
                            ? "bg-amber-50 border-amber-200 text-amber-500"
                            : "bg-gray-50 border-gray-100 text-gray-400 hover:text-amber-500"
                        }`}
                        title={isSaved ? "Saved Job" : "Save Job Item"}
                      >
                        {isSaved ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="text-[11px] bg-[#EFF6FF] text-[#3B82F6] font-semibold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <MapPin size={10} /> {job.location}
                    </span>
                    <span className="text-[11px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <IndianRupee size={10} /> {job.salaryRange}
                    </span>
                    <span className="text-[11px] bg-purple-50 text-purple-600 font-semibold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                      <Briefcase size={10} /> {job.jobType}
                    </span>
                    <span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-md">
                      Exp: {job.experienceLevel}+ Yr
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between whitespace-nowrap">
                  <button
                    onClick={() => onSelectJob(job)}
                    className="text-xs text-[#3B82F6] font-bold hover:underline cursor-pointer"
                  >
                    View Details
                  </button>

                  {(!currentUser || currentUser.role === "seeker") && (
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          onOpenAuth();
                        } else if (!isApplied) {
                          onApplyJob(job.id);
                        }
                      }}
                      disabled={isApplied}
                      className={`text-xs font-bold py-1.5 px-4 rounded-lg transition-all cursor-pointer ${
                        isApplied
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-xs"
                      }`}
                    >
                      {isApplied ? "Applied Status" : "Direct Apply"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Indian Professional Guidelines Section */}
      <section className="bg-slate-50 border-t border-b border-[#E5E7EB] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold bg-[#3B82F6] text-white px-2.5 py-1 rounded-sm tracking-wider uppercase">
              LOCAL STORAGE REVOLUTION
            </span>
            <h2 className="text-2xl font-bold text-[#1F293A] mt-3">
              Fast, Private, and Instant Local Testing Workspace
            </h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              CCI features zero backend overhead because all configurations, resumes, candidates, and job posts are processed locally in your web explorer. You can switch between candidate roles, add recruiter positions, update status codes instantly, and reset mock data with absolute ease.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-1 text-xs font-bold text-[#3B82F6]">
                <Compass size={14} /> 100% Functional Mockups
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={14} /> No Sign-Up Blockers
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
            <h3 className="font-bold text-[#1F293A] text-sm flex items-center gap-1 text-amber-600">
              ⚡ Sandbox Simulation Info
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-mono">
              - Default Admin Log: admin@careerconnectindia.com
              <br />
              - Password: admin123
              <br />
              - Seeker Log: rajesh@gmail.com / password123
              <br />
              - Recruiter Log: recruiter1@techmahindra.com / password123
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={onOpenAuth}
                className="text-xs bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-1.5 px-4 rounded-lg cursor-pointer"
              >
                Access Account Panel
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
