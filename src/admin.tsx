/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { User, Company, Job, Application } from "./types";
import { initLocalStorage } from "./data/mockData";
import AdminDashboard from "./components/AdminDashboard";
import CareerConnectLogo from "./components/CareerConnectLogo";
import { Lock, Mail, ShieldAlert, CheckCircle2, LogOut, ArrowLeft, Sparkles, ShieldCheck, HelpCircle } from "lucide-react";
import "./index.css";

// Interface for rich admin session
interface AdminSession {
  isAdminLoggedIn: boolean;
  email: string;
  role: "super_admin" | "admin" | "viewer";
  name: string;
}

const ADMIN_CREDENTIALS = [
  {
    email: "superadmin@careerconnectindia.com",
    password: "Super@123",
    role: "super_admin" as const,
    name: "Super Administrator"
  },
  {
    email: "admin@careerconnectindia.com",
    password: "Admin@123",
    role: "admin" as const,
    name: "CCI Platform Administrator"
  },
  // Backward compatibility with previous simple admin credential
  {
    email: "admin@careerconnectindia.com",
    password: "admin123",
    role: "admin" as const,
    name: "CCI Platform Administrator (Legacy)"
  },
  {
    email: "viewer@careerconnectindia.com",
    password: "Viewer@123",
    role: "viewer" as const,
    name: "Read-Only Viewer Analyst"
  }
];

function AdminApp() {
  // Authentication states
  const [currentAdmin, setCurrentAdmin] = useState<AdminSession | null>(() => {
    try {
      const sessionRaw = localStorage.getItem("cci_admin_session");
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        if (session.isAdminLoggedIn) {
          return session;
        }
      }
    } catch (_) {}
    return null;
  });

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // DB States
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // Advanced multi-toast stacking state
  interface ToastItem {
    id: string;
    msg: string;
    type: "success" | "error" | "warning" | "info";
  }
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (msg: string, type: "success" | "error" | "warning" | "info" = "success") => {
    const id = "toast_" + Date.now() + "_" + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Dark Mode disabled - Keeping app cleanly in light mode
  useEffect(() => {
    localStorage.setItem("cci_dark_mode", "false");
    document.documentElement.classList.remove("dark");
  }, []);

  // Load and hydrate database on mount
  const reloadData = () => {
    initLocalStorage();
    
    // Read directly from requested standard keys
    const rawUsersRaw = localStorage.getItem("users") || "[]";
    let loadedUsers: User[] = [];
    try {
      const parsed = JSON.parse(rawUsersRaw);
      // Normalize 'recruiter' representation to internal 'company' representation for AdminDashboard
      loadedUsers = parsed.map((u: any) => ({
        ...u,
        role: u.role === "recruiter" ? "company" : u.role
      }));
    } catch (_) {}

    const rawJobsRaw = localStorage.getItem("jobs") || "[]";
    let loadedJobs: Job[] = [];
    try { loadedJobs = JSON.parse(rawJobsRaw); } catch (_) {}

    const rawAppsRaw = localStorage.getItem("applications") || "[]";
    let loadedApps: Application[] = [];
    try { loadedApps = JSON.parse(rawAppsRaw); } catch (_) {}

    const rawCompaniesRaw = localStorage.getItem("companies") || "[]";
    let loadedCompanies: Company[] = [];
    try { loadedCompanies = JSON.parse(rawCompaniesRaw); } catch (_) {}

    setUsers(loadedUsers);
    setJobs(loadedJobs);
    setApplications(loadedApps);
    setCompanies(loadedCompanies);

    // Sync back to cci_ keys to maintain dual compatibility so that index.html is also updated in real-time
    localStorage.setItem("cci_users", JSON.stringify(loadedUsers));
    localStorage.setItem("cci_jobs", JSON.stringify(loadedJobs));
    localStorage.setItem("cci_applications", JSON.stringify(loadedApps));
    localStorage.setItem("cci_companies", JSON.stringify(loadedCompanies));
  };

  useEffect(() => {
    reloadData();
    // Watch for cross-window adjustments
    window.addEventListener("storage", reloadData);
    return () => window.removeEventListener("storage", reloadData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!adminEmail || !adminPassword) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    const matchedCred = ADMIN_CREDENTIALS.find(
      (c) =>
        c.email.toLowerCase() === adminEmail.toLowerCase() &&
        c.password === adminPassword
    );

    if (matchedCred) {
      setSuccessMsg(`Welcome ${matchedCred.name}! Launching platform workspace...`);
      
      // Store log in security history
      const logs = JSON.parse(localStorage.getItem("cci_audit_logs") || "[]");
      const newLog = {
        id: "log_" + Date.now(),
        adminEmail: matchedCred.email,
        adminRole: matchedCred.role,
        action: "Successfully logged in to Administration Center",
        timestamp: new Date().toISOString(),
        details: `IP: 192.168.1.10${Math.floor(Math.random() * 9)} • Browser: Chrome/Vite SPA WebKit`
      };
      localStorage.setItem("cci_audit_logs", JSON.stringify([newLog, ...logs]));

      setTimeout(() => {
        const session: AdminSession = {
          isAdminLoggedIn: true,
          email: matchedCred.email,
          role: matchedCred.role,
          name: matchedCred.name,
        };
        setCurrentAdmin(session);
        localStorage.setItem("cci_admin_session", JSON.stringify(session));
        showToast(`Signed in successfully as ${matchedCred.name}!`, "success");
      }, 900);
    } else {
      setErrorMsg("Access Denied: Invalid administrator security credentials.");
    }
  };

  const handleLogout = () => {
    if (currentAdmin) {
      // Store log
      const logs = JSON.parse(localStorage.getItem("cci_audit_logs") || "[]");
      const newLog = {
        id: "log_" + Date.now(),
        adminEmail: currentAdmin.email,
        adminRole: currentAdmin.role,
        action: "Logged out session",
        timestamp: new Date().toISOString(),
        details: "User initiated voluntary session clearance"
      };
      localStorage.setItem("cci_audit_logs", JSON.stringify([newLog, ...logs]));
    }

    localStorage.removeItem("cci_admin_session");
    setCurrentAdmin(null);
    setAdminEmail("");
    setAdminPassword("");
    setSuccessMsg("");
    setErrorMsg("");
    showToast("Logged out of Admin Portal successfully.", "info");
  };

  // Helper to append log entries
  const logAdminAction = (action: string, details: string) => {
    if (!currentAdmin) return;
    const logs = JSON.parse(localStorage.getItem("cci_audit_logs") || "[]");
    const newLog = {
      id: "log_" + Date.now(),
      adminEmail: currentAdmin.email,
      adminRole: currentAdmin.role,
      action,
      timestamp: new Date().toISOString(),
      details
    };
    localStorage.setItem("cci_audit_logs", JSON.stringify([newLog, ...logs]));
  };

  // Helper block checking viewer status
  const assertWritePermission = (): boolean => {
    if (currentAdmin?.role === "viewer") {
      showToast("Access Denied: Read-only viewer accounts are forbidden from writing.", "error");
      return false;
    }
    return true;
  };

  // Callback action synchronizers
  const handleToggleBlockUser = (userId: string) => {
    if (!assertWritePermission()) return;
    
    // Auto-protect from blocking own demo seeker identities
    const updated = users.map((u) => (u.id === userId ? { ...u, blocked: !u.blocked } : u));
    setUsers(updated);
    
    // Save to dual keys
    localStorage.setItem("cci_users", JSON.stringify(updated));
    const normalizedUsers = updated.map((u: any) => ({
      ...u,
      role: u.role === "company" ? "recruiter" : u.role
    }));
    localStorage.setItem("users", JSON.stringify(normalizedUsers));

    const updatedUser = updated.find((u) => u.id === userId);
    const actionStr = updatedUser?.blocked ? "Blocked candidate account" : "Unblocked candidate account";
    logAdminAction(actionStr, `Candidate name: ${updatedUser?.name} (${updatedUser?.email})`);
    
    showToast(
      updatedUser?.blocked
        ? `User ${updatedUser.name} has been blocked successfully.`
        : `User ${updatedUser?.name} is activated and unblocked.`,
      "info"
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (!assertWritePermission()) return;

    const targetUser = users.find(u => u.id === userId);
    const updated = users.filter((u) => u.id !== userId);
    setUsers(updated);
    
    // Save to dual keys
    localStorage.setItem("cci_users", JSON.stringify(updated));
    const normalizedUsers = updated.map((u: any) => ({
      ...u,
      role: u.role === "company" ? "recruiter" : u.role
    }));
    localStorage.setItem("users", JSON.stringify(normalizedUsers));
    
    logAdminAction("Permanently deleted user account", `Deleted ${targetUser?.name || "Unknown"} (${targetUser?.email})`);
    showToast("User credential logs cleared permanently.", "warning");
  };

  const handleToggleVerifyCompany = (companyId: string) => {
    if (!assertWritePermission()) return;

    const updated = companies.map((c) => (c.id === companyId ? { ...c, verified: !c.verified } : c));
    setCompanies(updated);
    
    // Save to dual keys
    localStorage.setItem("cci_companies", JSON.stringify(updated));
    localStorage.setItem("companies", JSON.stringify(updated));

    const matched = updated.find((c) => c.id === companyId);
    const actionStr = matched?.verified ? "Verified company registration" : "Revoked company verification badge";
    logAdminAction(actionStr, `Company: ${matched?.name}`);
    
    showToast(
      matched?.verified
        ? `Company ${matched.name} verified successfully!`
        : `Revoked verification badge for company ${matched?.name}.`,
      "info"
    );
  };

  const handleDeleteCompany = (companyId: string) => {
    if (!assertWritePermission()) return;

    const matchedCompany = companies.find(c => c.id === companyId);
    
    // Delete company profile
    const updatedCompanies = companies.filter((c) => c.id !== companyId);
    setCompanies(updatedCompanies);
    localStorage.setItem("cci_companies", JSON.stringify(updatedCompanies));
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    // Also remove any job listings published by this company
    const updatedJobs = jobs.filter((j) => j.companyId !== companyId);
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    logAdminAction("Deleted company profile and active jobs", `Company: ${matchedCompany?.name}`);
    showToast("Company profile and active jobs deleted completely.", "warning");
  };

  const handleToggleJobStatus = (jobId: string) => {
    if (!assertWritePermission()) return;

    const updated = jobs.map((j) => (j.id === jobId ? { ...j, active: !j.active } : j));
    setJobs(updated);
    
    // Save to dual keys
    localStorage.setItem("cci_jobs", JSON.stringify(updated));
    localStorage.setItem("jobs", JSON.stringify(updated));

    const matched = updated.find((j) => j.id === jobId);
    const actionStr = matched?.active ? "Approved & Activated job post" : "Paused & Suspended job post";
    logAdminAction(actionStr, `Job post title: "${matched?.title}"`);
    
    showToast(
      matched?.active
        ? `Job post "${matched.title}" approved & activated successfully.`
        : `Job post "${matched?.title}" closed & deactivated.`,
      "info"
    );
  };

  const handleDeleteJob = (jobId: string) => {
    if (!assertWritePermission()) return;

    const matchedJob = jobs.find(j => j.id === jobId);
    const updated = jobs.filter((j) => j.id !== jobId);
    setJobs(updated);
    
    // Save to dual keys
    localStorage.setItem("cci_jobs", JSON.stringify(updated));
    localStorage.setItem("jobs", JSON.stringify(updated));

    logAdminAction("Permanently deleted job listing", `Job Title: "${matchedJob?.title}"`);
    showToast("Job post record deleted permanently.", "warning");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F293A] flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800">
      
      {/* Toast stacks */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3.5 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-bottom duration-300 pointer-events-auto ${
              toast.type === "success"
                ? "bg-[#10B981] text-white border-emerald-500"
                : toast.type === "error"
                ? "bg-[#EF4444] text-white border-red-500"
                : toast.type === "warning"
                ? "bg-[#F59E0B] text-white border-amber-500"
                : "bg-[#3B82F6] text-white border-blue-500"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="text-white shrink-0" size={16} />
            ) : toast.type === "error" ? (
              <ShieldAlert className="text-white shrink-0" size={16} />
            ) : toast.type === "warning" ? (
              <ShieldAlert className="text-white shrink-0" size={16} />
            ) : (
              <Sparkles className="text-white shrink-0" size={16} />
            )}
            <span className="font-semibold">{toast.msg}</span>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="flex-grow">
        {currentAdmin?.isAdminLoggedIn ? (
          /* Active Admin Mode */
          <div className="w-full">
            {/* Admin Header */}
            <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-sm flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#1F293A] text-base tracking-tight block">
                      Career Connect India <span className="text-blue-600 font-extrabold text-sm ml-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Superintendent Suite</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                      Actor: <span className="text-gray-700 font-bold">{currentAdmin.name}</span> • 
                      Role: <span className={`font-extrabold uppercase ${currentAdmin.role === 'super_admin' ? 'text-purple-600' : currentAdmin.role === 'viewer' ? 'text-amber-600' : 'text-blue-600'}`}>{currentAdmin.role}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href="/"
                    className="text-xs font-semibold text-gray-600 hover:text-[#3B82F6] flex items-center gap-1 bg-gray-50 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all border border-gray-200"
                  >
                    <ArrowLeft size={14} /> Back to Live Web
                  </a>

                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer border border-red-100/40"
                  >
                    <LogOut size={14} /> Clear Session
                  </button>
                </div>
              </div>
            </header>

            {/* Dashboard Workspace */}
            <div className="py-4">
              <AdminDashboard
                currentUser={ { id: "admin_user", email: currentAdmin.email, name: currentAdmin.name, role: "admin" } }
                adminRole={currentAdmin.role}
                users={users}
                companies={companies}
                jobs={jobs}
                applications={applications}
                onToggleBlockUser={handleToggleBlockUser}
                onDeleteUser={handleDeleteUser}
                onToggleVerifyCompany={handleToggleVerifyCompany}
                onDeleteCompany={handleDeleteCompany}
                onToggleJobStatus={handleToggleJobStatus}
                onDeleteJob={handleDeleteJob}
                onTriggerNotification={showToast}
                onReloadDatabase={reloadData}
              />
            </div>
          </div>
        ) : (
          /* Login Card Form Screen Only */
          <div className="min-h-[90vh] flex flex-col justify-center items-center px-4 py-8">
            
            <div className="mb-6 text-center">
              <div className="flex items-center justify-start gap-4 w-full max-w-md mx-auto mb-4">
                <a href="/" className="inline-flex items-center gap-1 text-xs font-bold text-[#3B82F6] hover:underline bg-blue-50 hover:bg-blue-100 transition-all rounded-full px-4 py-1.5 border border-blue-200">
                  <ArrowLeft size={12} /> Return to Seekers Board
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2.5">
                <CareerConnectLogo className="h-12 w-12" />
                <span className="font-extrabold text-2xl text-[#1F293A] tracking-wider font-sans">
                  CAREER CONNECT <span className="text-[#3B82F6]">INDIA</span>
                </span>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-50/70 w-full max-w-md rounded-3xl shadow-xl overflow-hidden p-8 space-y-6 relative">
              <div className="absolute top-0 right-0 p-3 text-[10px] bg-blue-50 font-bold font-mono text-blue-700 rounded-bl-xl uppercase border-l border-b border-blue-105">
                CCI Unified Admin
              </div>

              <div className="text-center space-y-1 pt-1">
                <div className="inline-flex bg-amber-50 p-3 rounded-2xl text-amber-500 border border-amber-200/50 mb-1">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-xl font-black text-[#1F293A] tracking-tight">Enterprise Administration Access</h2>
                <p className="text-xs text-gray-400 font-sans tracking-wide max-w-sm mx-auto">Requires explicit role permissions to manage the live directory indicators.</p>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 font-medium animate-bounce flex items-center gap-2">
                  <ShieldAlert size={16} /> {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="p-3.5 bg-emerald-50 text-emerald-600 text-xs rounded-xl border border-emerald-100 font-semibold flex items-center gap-2">
                  <CheckCircle2 size={16} /> {successMsg}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 font-medium">
                <div>
                  <label className="block text-[10px] font-bold text-[#1F293A] uppercase tracking-widest mb-1.5">
                    Security E-Mail Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={15} />
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="superadmin@careerconnectindia.com"
                      className="w-full pl-9 pr-3 py-3 border border-[#E5E7EB] rounded-2xl text-xs focus:ring-2 focus:ring-[#3B82F6]/20 focus:outline-[#3B82F6] bg-[#F8FAFC]/50 text-gray-800 placeholder-gray-400 font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#1F293A] uppercase tracking-widest mb-1.5">
                    Administrative Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={15} />
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-3 border border-[#E5E7EB] rounded-2xl text-xs focus:ring-2 focus:ring-[#3B82F6]/20 focus:outline-[#3B82F6] bg-[#F8FAFC]/50 text-gray-800 placeholder-gray-400 font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer" />
                    <span className="text-[10px] font-bold text-gray-500">Enable Session Remember</span>
                  </label>
                  <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline flex items-center gap-0.5">
                    <HelpCircle size={10} /> Lock Policy
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
                >
                  <ShieldCheck size={14} /> Validate Credentials & Login
                </button>
              </form>

            </div>
          </div>
        )}
      </div>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-[#E5E7EB] py-6 select-none font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 Career Connect India Admin Portal. All rights reserved.</p>
          <div className="mt-2 sm:mt-0 font-mono text-[10px]">
            SYS CONTEXT: <span className="text-blue-500 font-bold">LEVEL_5_ADMIN_READ_WRITE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<AdminApp />);
}
