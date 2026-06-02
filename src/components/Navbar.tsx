/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Briefcase, User as UserIcon, LogOut, Shield, Building, Menu, X } from "lucide-react";
import { User } from "../types";
import CareerConnectLogo from "./CareerConnectLogo";

interface NavbarProps {
  currentUser: User | null;
  currentTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export default function Navbar({
  currentUser,
  currentTab,
  onNavigate,
  onLogout,
  onOpenAuth,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#EFF6FF] border-b border-[#E5E7EB] backdrop-blur-md bg-opacity-95 shadow-sm" id="cci-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center space-x-2 text-left focus:outline-none group cursor-pointer"
              id="nav-logo-btn"
            >
              <CareerConnectLogo className="h-10 w-10 group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-bold text-lg text-[#1F293A] tracking-tight block">
                  Career Connect India
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick("home")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === "home"
                  ? "text-[#3B82F6] bg-white font-semibold shadow-xs"
                  : "text-gray-600 hover:text-[#3B82F6] hover:bg-white/50"
              }`}
              id="nav-tab-home"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("jobs")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === "jobs"
                  ? "text-[#3B82F6] bg-white font-semibold shadow-xs"
                  : "text-gray-600 hover:text-[#3B82F6] hover:bg-white/50"
              }`}
              id="nav-tab-jobs"
            >
              Jobs
            </button>
            <button
              onClick={() => handleNavClick("companies")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentTab === "companies"
                  ? "text-[#3B82F6] bg-white font-semibold shadow-xs"
                  : "text-gray-600 hover:text-[#3B82F6] hover:bg-white/50"
              }`}
              id="nav-tab-companies"
            >
              Companies
            </button>

            {/* Role-Specific Dashboard Redirect */}
            {currentUser && (
              <button
                onClick={() => handleNavClick("dashboard")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 cursor-pointer ${
                  currentTab === "dashboard"
                    ? "text-[#3B82F6] bg-white font-semibold shadow-xs"
                    : "text-gray-600 hover:text-[#3B82F6] hover:bg-white/50"
                }`}
                id="nav-tab-dashboard"
              >
                {currentUser.role === "admin" ? (
                  <>
                    <Shield size={16} className="text-amber-500" />
                    <span>Admin Panel</span>
                  </>
                ) : currentUser.role === "company" ? (
                  <>
                    <Building size={16} className="text-sky-500" />
                    <span>Recruiter Dashboard</span>
                  </>
                ) : (
                  <>
                    <Briefcase size={16} className="text-emerald-500" />
                    <span>My Dashboard</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* User Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-xl border border-[#E5E7EB]">
                <div className="text-xl">
                  {currentUser.profilePhotoEmoji || "👤"}
                </div>
                <div className="text-left text-xs">
                  <p className="font-semibold text-gray-800 line-clamp-1 max-w-[120px]">
                    {currentUser.name}
                  </p>
                  <p className="text-gray-400 capitalize font-mono font-medium">
                    {currentUser.role}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1 px-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Logout Session"
                  id="nav-logout-btn"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#3B82F6] text-white hover:bg-[#2563EB] px-5 py-2 rounded-xl text-sm font-semibold transition-all inline-flex items-center space-x-1 shadow-sm cursor-pointer hover:shadow-md"
                id="nav-login-btn"
              >
                <UserIcon size={16} />
                <span>Login / Signup</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center md:hidden space-x-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-[#3B82F6] hover:bg-white"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#EFF6FF] border-b border-[#E5E7EB] px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick("home")}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium block cursor-pointer ${
              currentTab === "home" ? "bg-white text-[#3B82F6] font-semibold" : "text-gray-700 hover:bg-white/50"
            }`}
            id="mobile-nav-home"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("jobs")}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium block cursor-pointer ${
              currentTab === "jobs" ? "bg-white text-[#3B82F6] font-semibold" : "text-gray-700 hover:bg-white/50"
            }`}
            id="mobile-nav-jobs"
          >
            Jobs
          </button>
          <button
            onClick={() => handleNavClick("companies")}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium block cursor-pointer ${
              currentTab === "companies" ? "bg-white text-[#3B82F6] font-semibold" : "text-gray-700 hover:bg-white/50"
            }`}
            id="mobile-nav-companies"
          >
            Companies
          </button>

          {currentUser ? (
            <>
              <button
                onClick={() => handleNavClick("dashboard")}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium block cursor-pointer ${
                  currentTab === "dashboard" ? "bg-white text-[#3B82F6] font-semibold" : "text-gray-700 hover:bg-white/50"
                }`}
                id="mobile-nav-dashboard"
              >
                Dashboard ({currentUser.role})
              </button>
              <div className="border-t border-[#E5E7EB] my-2 pt-2">
                <div className="flex items-center space-x-3 px-3 py-2">
                  <div className="text-2xl">{currentUser.profilePhotoEmoji || "👥"}</div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 flex items-center space-x-2 cursor-pointer"
                  id="mobile-nav-logout"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-[#E5E7EB] pt-2 mt-2">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] px-4 py-2.5 rounded-lg text-base font-semibold transition-all text-center block cursor-pointer"
                id="mobile-nav-login"
              >
                Login / Signup
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
