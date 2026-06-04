/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, MapPin, Briefcase, IndianRupee, Star, StarOff, CheckCircle2, Building, Flame, ArrowRight, Compass, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { Job, Company, User } from "../types";
import CompanyLogo from "./CompanyLogo";

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

  const [heroTitle, setHeroTitle] = useState<string>(() => {
    return localStorage.getItem("cci_cms_hero_title") || "Connect with India's Premier Tech & Business Opportunities";
  });
  const [heroSubtext, setHeroSubtext] = useState<string>(() => {
    return localStorage.getItem("cci_cms_hero_subtext") || "Explore 100% verified jobs across Mumbai, Bangalore, Delhi and remote. Use our light, lightning-fast platform designed for direct developer/recruiter communication.";
  });

  const [faqList, setFaqList] = useState<any[]>(() => {
    const raw = localStorage.getItem("cci_faqs");
    return raw ? JSON.parse(raw) : [
      { id: "faq_1", question: "How can seekers apply with 1-click?", answer: "Upload a standard dynamic CV file to your dashboard and push Apply on open listings." },
      { id: "faq_2", question: "Is verification mandatory for recruiters?", answer: "Admin verification elevates exposure and flags the verified badge badge on job postings." }
    ];
  });

  const [blogList, setBlogList] = useState<any[]>(() => {
    const raw = localStorage.getItem("cci_blogs");
    return raw ? JSON.parse(raw) : [
      { id: "blog_1", title: "Modern Hiring Trends in Bangalore", author: "Administration Suite", date: "2026-06-01", summary: "Exploring remote and high-yield engineering roles." }
    ];
  });

  React.useEffect(() => {
    const reloadCmsData = () => {
      setHeroTitle(localStorage.getItem("cci_cms_hero_title") || "Connect with India's Premier Tech & Business Opportunities");
      setHeroSubtext(localStorage.getItem("cci_cms_hero_subtext") || "Explore 100% verified jobs across Mumbai, Bangalore, Delhi and remote. Use our light, lightning-fast platform designed for direct developer/recruiter communication.");
      
      const rawFaqs = localStorage.getItem("cci_faqs");
      if (rawFaqs) setFaqList(JSON.parse(rawFaqs));
      
      const rawBlogs = localStorage.getItem("cci_blogs");
      if (rawBlogs) setBlogList(JSON.parse(rawBlogs));
    };

    window.addEventListener("storage", reloadCmsData);
    reloadCmsData();
    return () => window.removeEventListener("storage", reloadCmsData);
  }, []);

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
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          
          <div className="inline-flex items-center space-x-2 bg-blue-100/75 border border-blue-200 text-[#3B82F6] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Flame size={14} className="fill-current animate-bounce" />
            <span>Discover Elite Tech & Corporate Roles in India</span>
          </div>

          <motion.h1 
            className="text-4xl sm:text-5xl font-extrabold text-[#1F293A] tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {heroTitle}
          </motion.h1>
          
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            {heroSubtext}
          </p>

          {/* Real-time responsive search bar */}
          <motion.form
            onSubmit={handleQuickSearch}
            className="bg-white p-2.5 rounded-2xl shadow-lg border border-[#E5E7EB] max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
            id="home-search-form"
            whileHover={{ y: -2, boxY: 10, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.08)" }}
            transition={{ duration: 0.2 }}
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
          </motion.form>

          {/* Quick links to prefilled searches */}
          <div className="pt-2 text-xs text-gray-500">
            <span className="font-semibold text-[#1F293A] mr-2">Popular tags:</span>
            {["React", "Python", "Bangalore", "Remote", "HR Recruiting"].map((tag, idx) => (
              <motion.button
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
                className="mr-2 mb-2 bg-[#EFF6FF] text-[#3B82F6] border border-blue-100 hover:border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-2.5 py-1 rounded-md transition-colors font-medium text-xs cursor-pointer inline-block"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>

        </motion.div>
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
          {topCompanies.map((c, idx) => (
            <motion.div
              key={c.id}
              className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs transition-all group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.012, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.03)" }}
            >
              <div className="flex items-start justify-between">
                <CompanyLogo
                  logoUrl={c.logoUrl}
                  logoEmoji={c.logoEmoji}
                  name={c.name}
                  className="w-14 h-14 bg-white p-2 rounded-xl border border-gray-150 flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform"
                  sizeClassName="text-2xl"
                />
                {c.verified && (
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold uppercase py-0.5 px-2 rounded-full inline-flex items-center gap-0.5 animate-pulse-once">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onSetGlobalSearch("", c.location);
                    onNavigate("jobs");
                  }}
                  className="text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
                >
                  Jobs in {c.location}
                </button>
              </div>
            </motion.div>
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
          {featuredJobs.map((job, idx) => {
            const isApplied = appliedJobIds.includes(job.id);
            const isSaved = savedJobIds.includes(job.id);
            
            return (
              <motion.div
                key={job.id}
                className="bg-white border border-[#E5E7EB] p-6 rounded-xl transition-all flex flex-col justify-between cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.04)" }}
                onClick={() => onSelectJob(job)}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectJob(job);
                        }}
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
                        onClick={(e) => {
                          e.stopPropagation();
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectJob(job);
                    }}
                    className="text-xs text-[#3B82F6] font-bold hover:underline cursor-pointer"
                  >
                    View Details
                  </button>
 
                  {(!currentUser || currentUser.role === "seeker") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
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
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works Section (3 steps) */}
      <section className="bg-slate-50 border-t border-b border-[#E5E7EB] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-[#1F293A]">
              How Career Connect India Works
            </h2>
            <p className="text-sm text-gray-505 max-w-2xl mx-auto">
              Get matched and hired with India's premier organizations in a secure, efficient 3-step recruitment workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#3B82F6] font-bold text-lg font-mono">
                1
              </div>
              <h3 className="font-bold text-[#1F293A] text-lg">Create Professional Profile</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Build your professional presence, add your core tech stack, and share your experience to attract active recruiters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold text-lg font-mono">
                2
              </div>
              <h3 className="font-bold text-[#1F293A] text-lg">Search Verified Positions</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Filter through verified jobs matched directly with top Indian employers across multiple technology domains.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg font-mono">
                3
              </div>
              <h3 className="font-bold text-[#1F293A] text-lg">Apply Instantly with One Click</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Apply directly to employers, track application status markers in real-time, and easily schedule direct interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Professional Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#1F293A]">
            Hired Through Career Connect India
          </h2>
          <p className="text-xs text-gray-400 uppercase font-mono tracking-widest">
            Success Stories From Top Technologists Across the Nation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all space-y-4">
            <p className="text-gray-500 text-xs italic leading-relaxed">
              "After completing my project portfolios, Career Connect India matched my profile with Tech Mahindra. The process was completely seamless and I signed my offer letter in two weeks!"
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
              <span className="text-xl bg-blue-50 p-1.5 rounded-lg">👨‍💻</span>
              <div>
                <span className="font-bold text-gray-805 text-xs block">Rajesh Sharma</span>
                <span className="text-[10px] text-gray-400 font-mono">Frontend Developer, Mumbai</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all space-y-4">
            <p className="text-gray-500 text-xs italic leading-relaxed">
              "Direct recruitment clarity is amazing here. Standard portal tracking status updates let me follow the recruiter's exact actions. Highly recommended platform!"
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
              <span className="text-xl bg-purple-50 p-1.5 rounded-lg">👩‍💻</span>
              <div>
                <span className="font-bold text-gray-805 text-xs block">Priya Gopalan</span>
                <span className="text-[10px] text-gray-400 font-mono">Senior Data Analyst, Bangalore</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-xs hover:shadow-md transition-all space-y-4">
            <p className="text-gray-500 text-xs italic leading-relaxed">
              "An extremely fast portal. It has zero clutter and matches you directly with certified positions. Recruiting staff reached out to me on my profile credentials instantly."
            </p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100">
              <span className="text-xl bg-emerald-50 p-1.5 rounded-lg">👨‍💻</span>
              <div>
                <span className="font-bold text-gray-805 text-xs block">Amit Kumar</span>
                <span className="text-[10px] text-gray-400 font-mono">Full Stack Engineer, New Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Dynamic Superintendent Industry Blogs Section */}
      {blogList.length > 0 && (
        <section className="bg-slate-50 border-t border-b border-[#E5E7EB] py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[#1F293A]">
                Dynamic Portal Announcements & Insights
              </h2>
              <p className="text-xs text-gray-400 uppercase font-mono tracking-widest">
                Publisher: platform superintendent suite • Realtime broadcasts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogList.map((blog) => (
                <div key={blog.id} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between" id={`live-blog-item-${blog.id}`}>
                  <div className="space-y-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider font-mono">
                      {blog.author || "Editorial Branch"}
                    </span>
                    <h3 className="text-base font-extrabold text-[#1F293A] leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>DATE: {blog.date}</span>
                    <span className="text-[#3B82F6] font-semibold cursor-pointer hover:underline">Read Article →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Dynamic FAQ Section */}
      {faqList.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-[#1F293A]">
              Frequently Asked Questions (Superintendent Control)
            </h2>
            <p className="text-xs text-gray-400 uppercase font-mono tracking-widest">
              Got matching questions? Dynamic guidelines updated live
            </p>
          </div>

          <div className="space-y-4">
            {faqList.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-2xl border border-[#E5E7EB] space-y-2" id={`live-faq-item-${faq.id}`}>
                <h4 className="font-extrabold text-[#1F293A] text-sm flex items-start gap-2.5">
                  <HelpCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
