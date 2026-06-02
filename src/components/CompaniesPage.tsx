/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Company, Job } from "../types";
import { Building, Search, MapPin, CheckCircle2, Link, Globe, Users, Briefcase } from "lucide-react";

interface CompaniesPageProps {
  companies: Company[];
  jobs: Job[];
  onSetGlobalSearch: (term: string, loc: string) => void;
  onNavigate: (tab: string) => void;
}

export default function CompaniesPage({
  companies,
  jobs,
  onSetGlobalSearch,
  onNavigate,
}: CompaniesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8 animate-in fade-in duration-200" id="companies-view">
      
      {/* Search Header Banner */}
      <section className="bg-gradient-to-r from-[#EFF6FF] via-white to-[#EFF6FF] border border-[#E5E7EB] p-8 rounded-2xl text-center space-y-4">
        <h2 className="text-3xl font-black text-[#1F293A]">Explore Registered Indian Corporates</h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Partner directly with tech leaders, e-commerce networks, and business solution groups in India. Inspect company sizes, websites, and active positions directories.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company size, sector, or headquarters city..."
            className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-xs focus:ring-1 focus:ring-blue-500 bg-white"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
        </div>
      </section>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] p-12 text-center col-span-full rounded-xl text-gray-400 text-xs">
            No companion registry matches this search search term. Try another enterprise label.
          </div>
        ) : (
          filteredCompanies.map((c) => {
            const activeCompanyJobs = jobs.filter(
              (j) => j.companyId === c.id && j.active
            );

            return (
              <div
                key={c.id}
                className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 bg-white p-2 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                      {c.logoUrl ? (
                        <img
                          src={c.logoUrl}
                          alt={`${c.name} logo`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent && !parent.querySelector(".fallback-emoji")) {
                              const fallback = document.createElement("span");
                              fallback.className = "text-3xl fallback-emoji";
                              fallback.innerText = c.logoEmoji || "🏢";
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      ) : (
                        <span className="text-3xl">{c.logoEmoji || "🏢"}</span>
                      )}
                    </div>

                    {c.verified && (
                      <span className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-bold uppercase py-0.5 px-2 rounded-full inline-flex items-center gap-0.5">
                        <CheckCircle2 size={10} className="fill-current" /> Verified Partner
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-[#1F293A] text-lg mt-4">{c.name}</h3>
                  <p className="text-xs text-[#3B82F6] font-bold font-mono tracking-wide">
                    {c.industry}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium py-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {c.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {c.companySize}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 pt-1">
                    {c.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 mt-5 pt-4 flex items-center justify-between">
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-gray-400 hover:text-[#3B82F6] flex items-center gap-1.5 font-semibold"
                  >
                    <Globe size={12} />
                    <span>Website</span>
                  </a>

                  <button
                    onClick={() => {
                      onSetGlobalSearch("", c.location);
                      // Clear keyword filter and set location filter to trigger jobs page
                      onNavigate("jobs");
                    }}
                    className="bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white border border-blue-100 transition-all font-bold py-1.5 px-4 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Briefcase size={12} />
                    <span>View {activeCompanyJobs.length} Jobs</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
