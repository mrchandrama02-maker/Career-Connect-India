/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { User, Job, Application } from "../types";
import { User as UserIcon, Code, Mail, Phone, Calendar, Star, Send, Award, GraduationCap, Upload, FileText, CheckCircle2, Bookmark, CheckSquare, Settings } from "lucide-react";

interface SeekerDashboardProps {
  currentUser: User;
  onUpdateProfile: (updatedProfile: User) => void;
  jobs: Job[];
  applications: Application[];
  savedJobs: string[];
  onToggleSaveJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  showToast?: (msg: string, type: "success" | "error" | "warning" | "info") => void;
}

export default function SeekerDashboard({
  currentUser,
  onUpdateProfile,
  jobs,
  applications,
  savedJobs,
  onToggleSaveJob,
  onApplyJob,
  onSelectJob,
  showToast,
}: SeekerDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "profile" | "applications" | "saved">("overview");

  // Profile Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editMobile, setEditMobile] = useState(currentUser.mobile || "");
  const [editSkills, setEditSkills] = useState(currentUser.skills ? currentUser.skills.join(", ") : "");
  const [editExperience, setEditExperience] = useState(currentUser.experience?.toString() || "0");
  const [editEducation, setEditEducation] = useState(currentUser.education || "");
  const [editEmoji, setEditEmoji] = useState(currentUser.profilePhotoEmoji || "👨‍💻");

  // Drag and Drop File States
  const [dragActive, setDragActive] = useState(false);
  const [resumeFileLabel, setResumeFileLabel] = useState(currentUser.resumeName || "");
  const [resumeBase64Data, setResumeBase64Data] = useState(currentUser.resumeBase64 || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedSkills = editSkills
      ? editSkills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];

    const updatedUser: User = {
      ...currentUser,
      name: editName,
      mobile: editMobile,
      skills: parsedSkills,
      experience: parseInt(editExperience) || 0,
      education: editEducation,
      profilePhotoEmoji: editEmoji,
      resumeName: resumeFileLabel,
      resumeBase64: resumeBase64Data
    };

    onUpdateProfile(updatedUser);
    setIsEditing(false);
  };

  // Convert uploaded files to base64
  const processFile = (file: File) => {
    if (!file) return;

    // Format validation: Must be PDF format
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      if (showToast) {
        showToast("Error: Only PDF files (.pdf) are allowed for CV / Resume uploads!", "error");
      } else {
        alert("Error: Only PDF files (.pdf) are allowed for CV / Resume uploads!");
      }
      return;
    }

    // File size validation (Max less than 5MB = 5 * 1024 * 1024 bytes)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size >= MAX_SIZE) {
      if (showToast) {
        showToast("Error: Uploaded resume must be less than 5MB in size!", "error");
      } else {
        alert("Error: Uploaded resume must be less than 5MB in size!");
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFileLabel(file.name);
      setResumeBase64Data(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Calculate User Stats
  const userApplications = applications.filter(app => app.seekerId === currentUser.id);
  const shortlistedCount = userApplications.filter(app => app.status === "Shortlisted").length;
  const appliedCount = userApplications.length;
  const savedCount = savedJobs.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-4 animate-in fade-in duration-200" id="seeker-dashboard">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-[#EFF6FF] via-[#FFFFFF] to-[#EFF6FF] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="text-5xl bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-xs">
            {currentUser.profilePhotoEmoji || "👨‍💻"}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1F293A]">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs text-gray-500 font-mono tracking-wide uppercase mt-1">
              Job Seeker Candidate Account
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveSubTab("profile");
              setIsEditing(true);
            }}
            className="bg-white border border-[#E5E7EB] hover:border-[#3B82F6] hover:text-[#3B82F6] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Settings size={14} /> Update Candidate Profile
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#E5E7EB]" id="seeker-tabs-row">
        {[
          { key: "overview", label: "Overview", icon: CheckSquare },
          { key: "profile", label: "My Profile Details", icon: UserIcon },
          { key: "applications", label: "Applications Track (" + appliedCount + ")", icon: Send },
          { key: "saved", label: "Bookmarks/Wishlist (" + savedCount + ")", icon: Bookmark },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveSubTab(tab.key as any);
                if (tab.key !== "profile") setIsEditing(false);
              }}
              className={`py-3 px-6 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeSubTab === tab.key
                  ? "border-[#3B82F6] text-[#3B82F6] bg-[#EFF6FF]/40 font-bold"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Subsection */}
      {activeSubTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Stat 1 */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Applications Filed
              </span>
              <p className="text-4xl font-extrabold text-[#3B82F6] mt-2">{appliedCount}</p>
              <span className="text-[11px] text-gray-500 mt-1 block">Active application statuses waiting reviews</span>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Shortlisted Stages
              </span>
              <p className="text-4xl font-extrabold text-emerald-500 mt-2">{shortlistedCount}</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Recruiter invitation or interview scheduled</span>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Saved Positions
              </span>
              <p className="text-4xl font-extrabold text-amber-500 mt-2">{savedCount}</p>
              <span className="text-[11px] text-gray-400 mt-1 block">Bookmark list for future application tracks</span>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Quick Profile Summary */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs md:col-span-1 space-y-4">
              <h3 className="font-bold text-[#1F293A] text-sm border-b pb-2">
                Candidate Summary Card
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Email Account</p>
                  <p className="text-gray-700 font-medium">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Mobile Number</p>
                  <p className="text-gray-700 font-medium">{currentUser.mobile || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Experience Metric</p>
                  <p className="text-[#3B82F6] font-extrabold text-sm">{currentUser.experience || 0} Years Active</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Education Background</p>
                  <p className="text-gray-700 font-medium">{currentUser.education || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Skills Registered</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentUser.skills && currentUser.skills.length > 0 ? (
                      currentUser.skills.map(s => (
                        <span key={s} className="bg-[#EFF6FF] text-[#3B82F6] font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-50 font-bold">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 font-sans italic">None registered</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase">Attached CV / Resume</p>
                  <p className="text-gray-700 flex items-center gap-1 font-mono mt-1 text-[11px]">
                    <FileText size={12} className="text-blue-500" />
                    {currentUser.resumeName || "No CV uploaded"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions and Latest Progress */}
            <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs md:col-span-2 space-y-4">
              <h3 className="font-bold text-[#1F293A] text-sm border-b pb-2">
                Recent Hiring Activity status
              </h3>

              {userApplications.length === 0 ? (
                <div className="text-center py-12 text-gray-500 space-y-3">
                  <p className="text-xs">You haven't submitted any applications yet.</p>
                  <p className="text-sm font-semibold text-gray-400">Discover hundreds of job profiles and take off today!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userApplications.slice(0, 3).map(app => {
                    return (
                      <div key={app.id} className="p-3 border border-gray-100 rounded-lg flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{app.jobTitle}</p>
                          <p className="text-gray-500 font-medium">{app.companyName} • Applied on {app.dateApplied}</p>
                        </div>
                        <div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            app.status === "Shortlisted"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : app.status === "Rejected"
                              ? "bg-red-50 text-red-600 border border-red-100"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {userApplications.length > 3 && (
                    <button
                      onClick={() => setActiveSubTab("applications")}
                      className="text-[#3B82F6] hover:underline font-bold text-xs"
                    >
                      View all application statuses
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Profile Subsection */}
      {activeSubTab === "profile" && (
        <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h2 className="text-lg font-bold text-[#1F293A]">Candidate Profile Detail form</h2>
              <span className="text-xs text-gray-400 font-mono">Verify and update search filters here</span>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer"
              >
                Edit Profile Information
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Direct Contact Number
                  </label>
                  <input
                    type="text"
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Years of Work Experience
                  </label>
                  <input
                    type="number"
                    value={editExperience}
                    onChange={(e) => setEditExperience(e.target.value)}
                    min="0"
                    className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Highest Education Completed
                  </label>
                  <input
                    type="text"
                    value={editEducation}
                    onChange={(e) => setEditEducation(e.target.value)}
                    placeholder="B.Tech Computer Science, BCA..."
                    className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Skills (Separate entries with COMMA)
                </label>
                <input
                  type="text"
                  value={editSkills}
                  onChange={(e) => setEditSkills(e.target.value)}
                  placeholder="React, CSS, Django, Node, UI/UX"
                  className="w-full p-2.5 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#3B82F6]"
                />
                <span className="text-[10px] text-gray-400">Used for auto-matching search tags.</span>
              </div>

              {/* Profile emoji preference */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Choose Profile Emoji Photo
                </label>
                <div className="flex gap-2">
                  {["👨‍💻", "👩‍💻", "👨‍💼", "👩‍💼", "🛡️", "🚀", "🎓", "☕", "🧠"].map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setEditEmoji(em)}
                      className={`p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-lg transition-transform cursor-pointer ${
                        editEmoji === em ? "border-2 border-[#3B82F6] scale-110" : ""
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drag & Drop File Upload Pattern */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Professional Curriculum Vitae / Resume (DND Zone)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                    dragActive
                      ? "border-[#3B82F6] bg-blue-50/50"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />

                  <div className="space-y-2">
                    <div className="inline-flex bg-white border border-[#E5E7EB] p-3 rounded-full text-[#3B82F6]">
                      <Upload size={24} />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      Drag-and-drop your resume file here or{" "}
                      <span
                        onClick={triggerFileSelect}
                        className="text-[#3B82F6] underline cursor-pointer"
                      >
                        choose file to browse
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      Supports PDF format under 5MB size
                    </p>
                  </div>
                </div>

                {resumeFileLabel && (
                  <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center justify-between border border-emerald-100">
                    <div className="flex items-center gap-1.5 font-mono">
                      <FileText size={14} />
                      <span className="font-semibold">{resumeFileLabel}</span>
                    </div>
                    {resumeBase64Data && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded uppercase">
                        BASE64 ENCODED
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Apply Profile Updates
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Full Name
                  </label>
                  <p className="text-[#1F293A] font-semibold text-base">
                    {currentUser.name}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Email Contact
                  </label>
                  <p className="text-[#1F293A] font-semibold">
                    {currentUser.email}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Mobile Number
                  </label>
                  <p className="text-[#1F293A] font-semibold">
                    {currentUser.mobile || "None linked"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Experience Level
                  </label>
                  <p className="text-[#1F293A] font-bold">
                    {currentUser.experience || 0} Years Active
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Highest Education
                  </label>
                  <p className="text-[#1F293A] font-semibold">
                    {currentUser.education || "None linked"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase">
                    Mock CV Attachment name
                  </label>
                  <p className="text-gray-500 font-mono text-xs flex items-center gap-1.5 mt-1">
                    <FileText size={14} className="text-blue-500" />
                    {currentUser.resumeName || "No file uploaded. Edit profile to drag and drop!"}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">
                  Registered Professional Skills Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills && currentUser.skills.length > 0 ? (
                    currentUser.skills.map((sk) => (
                      <span
                        key={sk}
                        className="bg-[#EFF6FF] text-[#3B82F6] font-mono text-xs px-2.5 py-1 rounded border border-blue-100 font-bold"
                      >
                        {sk}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No skills configured. Edit profile to match filters.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Applications Track Tab */}
      {activeSubTab === "applications" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs">
            <h2 className="font-bold text-[#1F293A] text-sm">Applied Positions tracker</h2>
            <p className="text-xs text-gray-400">Track and view decision updates for submitted applications</p>
          </div>

          {userApplications.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] p-12 text-center rounded-xl text-gray-500">
              <p className="text-sm font-medium">You have not submitted applications yet.</p>
              <button
                onClick={() => {}}
                className="mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-1.5 px-4 rounded-xl text-xs cursor-pointer"
              >
                Go Search Jobs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {userApplications.map(app => (
                <div
                  key={app.id}
                  className="bg-white border border-[#E5E7EB] p-5 rounded-xl shadow-xs flex flex-col md:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#1F293A]">
                        {app.jobTitle}
                      </span>
                      <span className="text-xs bg-slate-100 text-gray-500 font-bold px-2 py-0.5 rounded">
                        ID: {app.id}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 font-bold">
                      {app.companyName} • Applied on {app.dateApplied}
                    </p>

                    <div className="text-xs text-gray-500 space-y-1">
                      <p>
                        <span className="font-semibold">Submitted Resume:</span> {app.resumeName || "Default Profile data"}
                      </p>
                      <p>
                        <span className="font-semibold">Linked Experience:</span> {app.seekerExperience} yrs
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0 self-stretch justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      app.status === "Shortlisted"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : app.status === "Rejected"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      ● {app.status}
                    </span>

                    <button
                      onClick={() => {
                        const targetJob = jobs.find(j => j.id === app.jobId);
                        if (targetJob) onSelectJob(targetJob);
                      }}
                      className="text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
                    >
                      View Original Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Saved Jobs (Bookmarked positions) */}
      {activeSubTab === "saved" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs">
            <h2 className="font-bold text-[#1F293A] text-sm">Bookmarked Positions</h2>
            <p className="text-xs text-gray-400">Quick-access wishlist of openings you saved.</p>
          </div>

          {savedJobs.length === 0 ? (
            <div className="bg-white border border-[#E5E7EB] p-12 text-center rounded-xl text-gray-500">
              <p className="text-sm font-medium">Your bookmark folder is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs
                .filter(job => savedJobs.includes(job.id))
                .map(job => {
                  const isApplied = applications.some(app => app.jobId === job.id && app.seekerId === currentUser.id);
                  return (
                    <div
                      key={job.id}
                      className="bg-white border border-[#E5E7EB] p-5 rounded-xl shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4
                              onClick={() => onSelectJob(job)}
                              className="font-bold text-[#1F293A] text-sm hover:text-[#3B82F6] cursor-pointer"
                            >
                              {job.title}
                            </h4>
                            <p className="text-xs text-gray-500 font-semibold">{job.companyName}</p>
                          </div>
                          <button
                            onClick={() => onToggleSaveJob(job.id)}
                            className="text-amber-500 hover:text-gray-400 cursor-pointer"
                            title="Remove from saved"
                          >
                            <Star size={18} className="fill-current" />
                          </button>
                        </div>

                        <div className="text-xs text-gray-400 font-mono mt-2">
                          {job.location} • {job.salaryRange} • {job.jobType}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <button
                          onClick={() => onSelectJob(job)}
                          className="text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => {
                            if (!isApplied) onApplyJob(job.id);
                          }}
                          disabled={isApplied}
                          className={`text-xs font-bold py-1 px-3 rounded-lg cursor-pointer ${
                            isApplied
                              ? "bg-gray-100 text-gray-400"
                              : "bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                          }`}
                        >
                          {isApplied ? "Applied status" : "File Application"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
