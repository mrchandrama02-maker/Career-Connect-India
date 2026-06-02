/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Building } from "lucide-react";
import { User, Company } from "../types";
import CareerConnectLogo from "./CareerConnectLogo";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onSignupSuccess: (user: User, company?: Company) => void;
  initialMode?: "login" | "register";
  initialRole?: "seeker" | "company";
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSignupSuccess,
  initialMode = "login",
  initialRole = "seeker",
}: AuthModalProps) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [role, setRole] = useState<"seeker" | "company">(initialRole || "seeker");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === "login");
      setRole(initialRole || "seeker");
      resetForm();
    }
  }, [isOpen, initialMode, initialRole]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setCompanyName("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    // Try finding the registered account in either users list
    const storedCciOriginal = localStorage.getItem("cci_users");
    const storedUsersCustom = localStorage.getItem("users");

    let parsedUsers: User[] = [];
    if (storedCciOriginal) {
      try { parsedUsers = JSON.parse(storedCciOriginal); } catch (e) {}
    }
    if (parsedUsers.length === 0 && storedUsersCustom) {
      try { parsedUsers = JSON.parse(storedUsersCustom); } catch (e) {}
    }

    // Standard fallback synchronization if stores got disjoint
    if (storedUsersCustom && parsedUsers.length === 0) {
      try {
        const customList = JSON.parse(storedUsersCustom);
        parsedUsers = customList.map((u: any) => ({
          ...u,
          role: u.role === "recruiter" ? "company" : u.role
        }));
      } catch (e) {}
    }

    const matchedUser = parsedUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      setErrorMsg("Error: Invalid email or password credentials.");
      return;
    }

    if (matchedUser.blocked) {
      setErrorMsg("This account has been temporarily blocked by administration.");
      return;
    }

    // Ensure the role is standardized to internal dashboard expectations
    const normalizedUser = {
      ...matchedUser,
      role: (matchedUser.role as string) === "recruiter" ? ("company" as const) : matchedUser.role
    };

    setSuccessMsg("Success: Logged in successfully! Directing you to your dashboard...");
    
    // Write session tokens to both currentUser and cci_current_user variables
    localStorage.setItem("currentUser", JSON.stringify(normalizedUser));
    localStorage.setItem("cci_current_user", JSON.stringify(normalizedUser));

    setTimeout(() => {
      onLoginSuccess(normalizedUser);
      onClose();
      resetForm();
    }, 1000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // 1. Basic sanitization and validations
    const userEmail = email.trim();
    const userPassword = password;
    const userName = name.trim();
    const recruiterCompName = companyName.trim();

    if (!userName) {
      setErrorMsg("Full Name is required.");
      return;
    }

    if (!userEmail) {
      setErrorMsg("Email address is required.");
      return;
    }

    // Valid format regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Password length validation (minimum 6 characters)
    if (userPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters in length.");
      return;
    }

    // Password confirmation validation
    if (userPassword !== confirmPassword) {
      setErrorMsg("Confirm password does not match original password.");
      return;
    }

    // Role conditional company name validation
    if (role === "company" && !recruiterCompName) {
      setErrorMsg("Company Name is required for Recruiter registration.");
      return;
    }

    // Retrieve storage list and perform uniqueness check
    const storedCci = localStorage.getItem("cci_users");
    let existingCciUsers: User[] = [];
    if (storedCci) {
      try { existingCciUsers = JSON.parse(storedCci); } catch (e) {}
    }

    const emailExists = existingCciUsers.some(
      (u) => u.email.toLowerCase() === userEmail.toLowerCase()
    );

    if (emailExists) {
      setErrorMsg("This email address is already registered.");
      return;
    }

    // Construct profile database entries for both stores
    let createdUser: User;
    let createdCompany: Company | undefined;

    if (role === "seeker") {
      createdUser = {
        id: "seeker_" + Date.now(),
        email: userEmail,
        password: userPassword,
        role: "seeker",
        name: userName,
        skills: [],
        experience: 0,
        education: "Not Provided",
        profilePhotoEmoji: ["👨‍💻", "👩‍💼", "👨‍💼", "👩‍💻", "✨"][Math.floor(Math.random() * 5)],
        blocked: false,
        createdAt: "2026-06-02",
        profile: { skills: "", experience: "", resume: "" }
      };
    } else {
      // Recruiter registration
      const newCompId = "comp_" + Date.now();
      createdCompany = {
        id: newCompId,
        name: recruiterCompName,
        description: `Premium national technology firm operations headed by ${userName}.`,
        website: "https://careerconnectindia.com",
        logoEmoji: ["🏢", "🚀", "🛒", "🩺", "📈", "⚙️"][Math.floor(Math.random() * 6)],
        industry: "IT Services / Technology",
        location: "Mumbai, India",
        companySize: "11-50 employees",
        verified: false,
      };

      createdUser = {
        id: "recruiter_" + Date.now(),
        email: userEmail,
        password: userPassword,
        role: "company",
        name: userName,
        companyId: newCompId,
        companyName: recruiterCompName,
        profilePhotoEmoji: "👔",
        blocked: false,
        createdAt: "2026-06-02",
        profile: { skills: "", experience: "", resume: "" }
      };
    }

    // Update cci-original store
    const updatedCciUsers = [...existingCciUsers, createdUser];
    localStorage.setItem("cci_users", JSON.stringify(updatedCciUsers));

    if (createdCompany) {
      const storedCompRaw = localStorage.getItem("cci_companies");
      let companies: Company[] = [];
      if (storedCompRaw) {
        try { companies = JSON.parse(storedCompRaw); } catch (e) {}
      }
      localStorage.setItem("cci_companies", JSON.stringify([...companies, createdCompany]));
    }

    // Synchronize to the user-requested custom 'users' localStorage key
    const currentUsersCustomRaw = localStorage.getItem("users");
    let customUsersList: any[] = [];
    if (currentUsersCustomRaw) {
      try { customUsersList = JSON.parse(currentUsersCustomRaw); } catch (e) {}
    }

    const customUserRepresentation = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      password: createdUser.password,
      role: createdUser.role === "company" ? "recruiter" : "seeker",
      companyName: role === "company" ? recruiterCompName : undefined,
      createdAt: "2026-06-02",
      profile: { skills: "", experience: "", resume: "" }
    };

    localStorage.setItem("users", JSON.stringify([...customUsersList, customUserRepresentation]));

    setSuccessMsg("Success: Account registered successfully! Processing login...");

    // Auto-login session keys setting
    localStorage.setItem("currentUser", JSON.stringify(createdUser));
    localStorage.setItem("cci_current_user", JSON.stringify(createdUser));

    setTimeout(() => {
      onSignupSuccess(createdUser, createdCompany);
      onClose();
      resetForm();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto" id="auth-modal-overlay">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden relative border border-[#E2E8F0] my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 bg-gray-50 rounded-full transition-colors cursor-pointer border border-[#E2E8F0]"
          id="auth-close-btn"
          aria-label="Close authentication gateway"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-8 text-center border-b border-[#E2E8F0] flex flex-col items-center">
          <CareerConnectLogo className="h-12 w-12 mb-3" />
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Career Connect India Hub
          </h3>
          <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1.5 uppercase font-bold">
            {isLogin ? "SECURE ACCOUNT PORTAL" : "CREATE NEW PROFILE GATEWAY"}
          </p>
        </div>

        {/* Alert Notifications */}
        <div className="px-6 pt-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-650 text-xs rounded-xl border border-red-100 font-semibold leading-relaxed">
              ⚠️ {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-150 font-bold leading-relaxed">
              🎉 {successMsg}
            </div>
          )}
        </div>

        {/* Form Content */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="p-6 space-y-4">
          
          {isLogin ? (
            /* ================= LOGIN VIEW ================= */
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={14} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-wider mb-1.5">
                  Secure Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={14} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 cursor-pointer text-center shadow-xs hover:shadow-md"
                id="auth-submit-login-btn"
              >
                Sign In
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleToggleMode}
                  className="text-xs text-slate-500 hover:text-[#2563EB] transition-colors focus:outline-none"
                >
                  Don't have an account? <span className="font-bold underline text-[#2563EB]">Register</span>
                </button>
              </div>
            </div>
          ) : (
            /* ================= REGISTER VIEW ================= */
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-550 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 text-gray-400" size={14} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-555 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={14} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-555 uppercase tracking-wider mb-1.5">
                    Password (min. 6 chars)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={14} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-555 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={14} />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-gray-555 uppercase tracking-wider mb-1.5">
                  Registration Category
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as "seeker" | "company")}
                  className="w-full px-3 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] text-gray-900 font-medium cursor-pointer"
                  required
                >
                  <option value="seeker">Job Seeker</option>
                  <option value="company">Company/Recruiter</option>
                </select>
              </div>

              {/* Conditionally Rendered Company Name Input */}
              {role === "company" && (
                <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 animate-in slide-in-from-top-1.5 duration-150">
                  <label className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 text-gray-400" size={14} />
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Tata Consultancy Services"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] text-gray-900 placeholder-gray-400 font-semibold"
                      required={role === "company"}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 cursor-pointer text-center shadow-xs hover:shadow-md"
                id="auth-submit-register-btn"
              >
                Register
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleToggleMode}
                  className="text-xs text-slate-500 hover:text-[#2563EB] transition-colors focus:outline-none"
                >
                  Already have an account? <span className="font-bold underline text-[#2563EB]">Login</span>
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
