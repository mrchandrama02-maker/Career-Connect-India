/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, Github, Linkedin, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#EFF6FF] border-t border-[#E5E7EB] mt-16 py-12" id="cci-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Info & Pitch */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-[#3B82F6] p-1.5 rounded-lg text-white">
                <Landmark size={18} />
              </div>
              <span className="font-bold text-lg text-[#1F293A]">
                Career Connect <span className="text-[#3B82F6]">India</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              Empowering India's professional workforce with premium micro-integrations. Seamlessly linking candidates with top-tier technical and managerial recruiters.
            </p>
            <div className="flex items-center space-x-3 text-gray-400">
              <span className="text-xs bg-white text-[#3B82F6] font-semibold px-2 py-1 rounded border border-[#E5E7EB] flex items-center gap-1">
                <ShieldCheck size={12} />
                SECURE PLATFORM
              </span>
              <span className="text-xs bg-white text-emerald-600 font-semibold px-2 py-1 rounded border border-[#E5E7EB]">
                100% LOCAL STORAGE BASE
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Explore Roles
            </h4>
            <ul className="space-y-2 text-sm text-[#1F293A] font-medium">
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Frontend Engineers
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Product Managers
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Data Analytics Speeds
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  HR Specialists
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Job Hub Hubs
            </h4>
            <ul className="space-y-2 text-sm text-[#1F293A] font-medium">
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Mumbai Hub
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Bangalore Tech Zone
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Delhi Corporate Center
                </span>
              </li>
              <li>
                <span className="text-gray-500 hover:text-[#3B82F6] transition-colors cursor-pointer">
                  Remote Teams
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E5E7EB] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>
            © 2026 Career Connect India. All rights reserved.
            <span className="mx-2 text-gray-300">•</span>
            <a href="/admin.html" className="text-gray-400 hover:text-[#3B82F6] font-semibold hover:underline transition-all">Admin Portal</a>
          </p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0 font-mono">
            Crafted with <Heart size={12} className="text-red-500 fill-current" /> for professional engineering recruitment.
          </p>
        </div>
      </div>
    </footer>
  );
}
