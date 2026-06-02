/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Phone, Briefcase, Award, GraduationCap, Building, Link, Users, Landmark } from "lucide-react";
import { User, Company } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  onSignupSuccess: (user: User, company?: Company) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onSignupSuccess,
}: AuthModalProps) {
  if (!isOpen) return null;

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"seeker" | "company">("seeker");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Common Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // User full name or Recruiter name

  // Seeker Specifics
  const [mobile, setMobile] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  // Company Specifics
  const [companyName, setCompanyName] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyWeb, setCompanyWeb] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companySize, setCompanySize] = useState("1-10 employees");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setMobile("");
    setSkills("");
    setExperience("");
    setEducation("");
    setCompanyName("");
    setCompanyDesc("");
    setCompanyWeb("");
    setCompanyLocation("");
    setCompanyIndustry("");
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

    if (!email || !password) {
      setErrorMsg("Please provide your email and password.");
      return;
    }

    const storedUsersRaw = localStorage.getItem("cci_users");
    const users: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];

    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!matchedUser) {
      setErrorMsg("Invalid credentials. Please attempt again.");
      return;
    }

    if (matchedUser.role === "admin" || matchedUser.email.toLowerCase() === "admin@careerconnectindia.com") {
      setErrorMsg("Administrative accounts are restricted to the separate Admin Portal webpage. Please use admin.html.");
      return;
    }

    if (matchedUser.blocked) {
      setErrorMsg("This account has been temporarily blocked by administration. Please contact support@careerconnectindia.com.");
      return;
    }

    setSuccessMsg("Logged in successfully! Re-directing dashboard...");
    setTimeout(() => {
      onLoginSuccess(matchedUser);
      onClose();
      resetForm();
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password || !name) {
      setErrorMsg("Full name, email and password are all required.");
      return;
    }

    // Check if email already in use
    const storedUsersRaw = localStorage.getItem("cci_users");
    const users: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
    const emailExists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      setErrorMsg("This email address is already registered.");
      return;
    }

    let createdUser: User;
    let createdCompany: Company | undefined;

    if (role === "seeker") {
      const formattedSkills = skills
        ? skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
        : [];

      createdUser = {
        id: "seeker_" + Date.now(),
        email: email,
        password: password,
        role: "seeker",
        name: name,
        mobile: mobile || undefined,
        skills: formattedSkills,
        experience: experience ? parseInt(experience) : 0,
        education: education || "Not Provided",
        profilePhotoEmoji: ["👨‍💻", "👩‍💼", "👨‍💼", "👩‍💻", "✨"][Math.floor(Math.random() * 5)],
        blocked: false,
      };
    } else {
      // Registrar Recruiter + Company
      if (!companyName || !companyLocation || !companyIndustry) {
        setErrorMsg("Company Name, industry and location are required.");
        return;
      }

      const newCompId = "comp_" + Date.now();
      createdCompany = {
        id: newCompId,
        name: companyName,
        description: companyDesc || "A growing Indian enterprise focused on technical progress.",
        website: companyWeb || "https://careerconnectindia.com",
        logoEmoji: ["🏢", "🚀", "🛒", "🩺", "📈", "⚙️"][Math.floor(Math.random() * 6)],
        industry: companyIndustry,
        location: companyLocation,
        companySize: companySize,
        verified: false, // Unverified initially. Admin must verify.
      };

      createdUser = {
        id: "recruiter_" + Date.now(),
        email: email,
        password: password,
        role: "company",
        name: name, // Recruiter name
        companyId: newCompId,
        profilePhotoEmoji: "👔",
        blocked: false,
      };
    }

    // Save outputs
    const updatedUsers = [...users, createdUser];
    localStorage.setItem("cci_users", JSON.stringify(updatedUsers));

    if (createdCompany) {
      const storedCompRaw = localStorage.getItem("cci_companies");
      const companies: Company[] = storedCompRaw ? JSON.parse(storedCompRaw) : [];
      const updatedComp = [...companies, createdCompany];
      localStorage.setItem("cci_companies", JSON.stringify(updatedComp));
    }

    setSuccessMsg("Account registered successfully! Directing you...");
    setTimeout(() => {
      onSignupSuccess(createdUser, createdCompany);
      onClose();
      resetForm();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto" id="auth-modal-overlay">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative border border-[#E5E7EB] my-8 animate-in fade-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full transition-colors cursor-pointer"
          id="auth-close-btn"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="bg-[#EFF6FF] px-6 py-8 text-center border-b border-[#E5E7EB]">
          <div className="inline-flex bg-[#3B82F6] p-2 rounded-xl text-white mb-2">
            <Landmark size={22} />
          </div>
          <h3 className="text-xl font-bold text-[#1F293A]">
            Career Connect India Hub
          </h3>
          <p className="text-xs text-gray-500 font-mono tracking-wider mt-1 uppercase">
            {isLogin ? "Session Entrance Gateway" : "Create New Professional Profile"}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-[#E5E7EB]">
          <button
            onClick={() => { setIsLogin(true); setErrorMsg(""); }}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors cursor-pointer ${
              isLogin ? "text-[#3B82F6] border-b-2 border-[#3B82F6] bg-[#EFF6FF]/30" : "text-gray-500 hover:text-gray-800"
            }`}
            id="auth-tab-login"
          >
            Sign In Account
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMsg(""); }}
            className={`flex-1 py-3 text-center text-sm font-semibold transition-colors cursor-pointer ${
              !isLogin ? "text-[#3B82F6] border-b-2 border-[#3B82F6] bg-[#EFF6FF]/30" : "text-gray-500 hover:text-gray-800"
            }`}
            id="auth-tab-signup"
          >
            Create New Account
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium">
              ⚠️ {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-600 text-sm rounded-xl border border-emerald-100 font-semibold">
              🎉 {successMsg}
            </div>
          )}

          {/* Core Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1F293A] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1F293A] uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Registrars Segment */}
          {!isLogin && (
            <>
              {/* Role Selection */}
              <div className="py-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  I wish to register as a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("seeker")}
                    className={`p-3 rounded-xl border text-center text-sm font-semibold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      role === "seeker"
                        ? "border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]"
                        : "border-[#E5E7EB] bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Briefcase size={20} />
                    <span>Job Seeker Candidate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("company")}
                    className={`p-3 rounded-xl border text-center text-sm font-semibold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      role === "company"
                        ? "border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]"
                        : "border-[#E5E7EB] bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Building size={20} />
                    <span>Company / Recruiter</span>
                  </button>
                </div>
              </div>

              {/* Common Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1F293A] uppercase tracking-wider mb-1">
                  {role === "seeker" ? "Candidate Full Name" : "Recruiter Full Name"}
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === "seeker" ? "e.g. Rajesh Sharma" : "e.g. Anil Goel"}
                    className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                    required
                  />
                </div>
              </div>

              {/* Seeker Profile Section */}
              {role === "seeker" && (
                <div className="space-y-3 p-4 bg-[#EFF6FF]/50 rounded-xl border border-[#EFF6FF]">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest border-b border-gray-200 pb-1 flex items-center gap-1.5">
                    <UserIcon size={14} /> Seeker Profile Parameters
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2 text-gray-400" size={14} />
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Work Experience (Years)
                      </label>
                      <div className="relative">
                        <Award className="absolute left-3 top-2 text-gray-400" size={14} />
                        <input
                          type="number"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          placeholder="e.g. 3"
                          min="0"
                          className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                      Completed Education
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-2.5 text-gray-400" size={14} />
                      <input
                        type="text"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        placeholder="e.g. MCA or B.Tech Computer Science"
                        className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                      Expertise Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="React, CSS, SQL, Python"
                      className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                    />
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      Separate each entry with a single comma.
                    </span>
                  </div>
                </div>
              )}

              {/* Company Profile Section */}
              {role === "company" && (
                <div className="space-y-3 p-4 bg-[#EFF6FF]/50 rounded-xl border border-[#EFF6FF]">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest border-b border-gray-200 pb-1 flex items-center gap-1.5">
                    <Building size={14} /> Company Corporate Profile Setup
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Tech Mahindra Solutions"
                        className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                        required={role === "company"}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Core Industry
                      </label>
                      <input
                        type="text"
                        value={companyIndustry}
                        onChange={(e) => setCompanyIndustry(e.target.value)}
                        placeholder="e.g. IT Services / Technology"
                        className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                        required={role === "company"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Headquarters City
                      </label>
                      <input
                        type="text"
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        placeholder="e.g. Mumbai, Bangalore"
                        className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                        required={role === "company"}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                        Company Employee Size
                      </label>
                      <select
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                      >
                        <option value="1-10 Employees">1-10 Employees</option>
                        <option value="11-50 Employees">11-50 Employees</option>
                        <option value="51-200 Employees">51-200 Employees</option>
                        <option value="201-1000 Employees">201-1000 Employees</option>
                        <option value="1,000+ Employees">1,000+ Employees</option>
                        <option value="10,000+ Employees">10,000+ Employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                      Website URL
                    </label>
                    <div className="relative">
                      <Link className="absolute left-3 top-2.5 text-gray-400" size={14} />
                      <input
                        type="url"
                        value={companyWeb}
                        onChange={(e) => setCompanyWeb(e.target.value)}
                        placeholder="https://company.com"
                        className="w-full pl-8 pr-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-0.5">
                      Corporate Mission / Description
                    </label>
                    <textarea
                      value={companyDesc}
                      onChange={(e) => setCompanyDesc(e.target.value)}
                      placeholder="Briefly state key activities and culture..."
                      rows={2}
                      className="w-full px-3 py-1.5 border border-[#E5E7EB] bg-white rounded-lg text-xs resize-none"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-xs text-[#3B82F6] hover:underline font-semibold cursor-pointer"
            >
              {isLogin
                ? "First time seeker or recruiter? Sign Up"
                : "Already have credentials? Sign In"}
            </button>
            <button
              type="submit"
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2 px-6 rounded-xl text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
              id="auth-submit-btn"
            >
              {isLogin ? "Authenticate Now" : "Register Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
