/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Github, Linkedin, Heart, ShieldCheck, Twitter, Facebook, Instagram, Send } from "lucide-react";
import CareerConnectLogo from "./CareerConnectLogo";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 border-t border-[#1E293B] mt-16 pt-16 pb-8" id="cci-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1 - Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2.5">
              <CareerConnectLogo className="h-10 w-10 filter brightness-110" />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  Career Connect <span className="text-[#3B82F6]">India</span>
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider block">NATIONAL RECRUITMENT NETWORK</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Empowering India's professional workforce with premium career connections. Seamlessly linking candidates with top-tier technical and managerial recruiters.
            </p>
            
            {/* Styled Pills for trust */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-blue-400 border border-slate-700/80">
                <ShieldCheck size={11} className="text-[#3B82F6]" />
                🔒 Secure Platform
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700/80">
                ⚡ 100% Local Storage
              </span>
            </div>

            {/* Social Media Indicators */}
            <div className="flex items-center space-x-4 pt-1">
              <span className="text-gray-500 hover:text-[#0A66C2] transition-colors cursor-pointer" title="LinkedIn">
                <Linkedin size={18} />
              </span>
              <span className="text-gray-500 hover:text-[#1DA1F2] transition-colors cursor-pointer" title="Twitter">
                <Twitter size={18} />
              </span>
              <span className="text-gray-500 hover:text-[#1877F2] transition-colors cursor-pointer" title="Facebook">
                <Facebook size={18} />
              </span>
              <span className="text-gray-500 hover:text-[#E1306C] transition-colors cursor-pointer" title="Instagram">
                <Instagram size={18} />
              </span>
              <span className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="Github">
                <Github size={18} />
              </span>
            </div>
          </div>

          {/* Column 2 - Explore Roles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-[#3B82F6]">
              Explore Roles
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {[
                "Frontend Engineers",
                "Product Managers",
                "Data Analytics Specialists",
                "HR Specialists",
                "Cloud Architects",
                "Cybersecurity Experts"
              ].map((role) => (
                <li key={role}>
                  <span className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-250 cursor-pointer block hover:translate-x-1 transform transition-transform">
                    {role}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Job Hubs */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-[#3B82F6]">
              Job Hubs
            </h4>
            <ul className="space-y-3 text-xs font-medium">
              {[
                "Mumbai Hub",
                "Bangalore Tech Zone",
                "Delhi Corporate Center",
                "Remote Teams",
                "Pune IT Park",
                "Hyderabad Tech Corridor"
              ].map((hub) => (
                <li key={hub}>
                  <span className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-250 cursor-pointer block hover:translate-x-1 transform transition-transform">
                    {hub}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Resources & Support */}
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-[#3B82F6]">
                Resources
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                {[
                  "About Us",
                  "Contact Support",
                  "Privacy Policy",
                  "Terms of Service",
                  "FAQ",
                  "Blog"
                ].map((item) => (
                  <li key={item}>
                    <span className="text-gray-400 hover:text-[#0A66C2] transition-colors duration-250 cursor-pointer block hover:translate-x-1 transform transition-transform">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter element */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Weekly Job Alert Digest</span>
              <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700/60 max-w-xs">
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="bg-transparent text-xs text-white placeholder-gray-500 px-2 py-1.5 focus:outline-none w-full border-none!" 
                />
                <button 
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white p-1.5 rounded-md transition-colors cursor-pointer"
                  title="Subscribe"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1E293B] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 space-y-4 md:space-y-0">
          <div>
            <p className="font-medium">
              © 2026 Career Connect India. All rights reserved. 
              <span className="mx-2 text-slate-700">|</span> 
              <a href="/admin" className="text-gray-400 hover:text-[#0A66C2] hover:underline font-bold transition-all transition-colors duration-200">
                Admin Portal Key
              </a>
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 font-mono text-[10px] bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800/80">
            <span>Crafted with</span>
            <Heart size={10} className="text-red-500 fill-current animate-pulse" />
            <span>for professional engineering recruitment.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
