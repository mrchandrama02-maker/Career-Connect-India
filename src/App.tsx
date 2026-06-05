/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User, Company, Job, Application, SavedJob } from "./types";
import { initLocalStorage } from "./data/mockData";
import { syncAllEntities } from "./data/sync";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";
import JobListingPage from "./components/JobListingPage";
import CompaniesPage from "./components/CompaniesPage";
import SeekerDashboard from "./components/SeekerDashboard";
import RecruiterDashboard from "./components/RecruiterDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AuthModal from "./components/AuthModal";
import { Sparkles, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export default function App() {
  // Global search transfers (Homepage input leads to Pre-filtered Job Browser)
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>("");
  const [globalSearchLoc, setGlobalSearchLoc] = useState<string>("");

  // Core Database States
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      initLocalStorage();
    }
    const raw = typeof window !== "undefined" ? localStorage.getItem("users") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return parsed.map((u: any) => ({
          ...u,
          role: u.role === "recruiter" ? "company" : u.role
        }));
      } catch (_) {}
    }
    return [];
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("companies") : null;
    return raw ? JSON.parse(raw) : [];
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("jobs") : null;
    return raw ? JSON.parse(raw) : [];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("applications") : null;
    return raw ? JSON.parse(raw) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("cci_current_user") : null;
    return raw ? JSON.parse(raw) : null;
  });

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    const rawSaved = typeof window !== "undefined" ? localStorage.getItem("cci_saved_jobs") : null;
    const rawSessionUser = typeof window !== "undefined" ? localStorage.getItem("cci_current_user") : null;
    const sessionUser = rawSessionUser ? JSON.parse(rawSessionUser) : null;
    if (sessionUser && sessionUser.role === "seeker") {
      const loadedSaved = rawSaved ? JSON.parse(rawSaved) : [];
      return loadedSaved
        .filter((item: SavedJob) => item.seekerId === sessionUser.id)
        .map((item: SavedJob) => item.jobId);
    }
    return [];
  });

  const [maintenance, setMaintenance] = useState<boolean>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("cci_sys_settings") : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return !!parsed.maintenance;
      } catch (_) {}
    }
    return false;
  });

  // Navigation & Modal States
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");
  const [authModalRole, setAuthModalRole] = useState<"seeker" | "company">("seeker");

  const handleOpenAuth = (mode: "login" | "register" = "login", role: "seeker" | "company" = "seeker") => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  // Inspect selection
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Advanced Multi-Toast notifications state
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
    }, 4000);
  };

  // Backward compatible triggerToast helper linking to showToast
  const triggerToast = (msg: string, type: "success" | "warning" | "info" = "success") => {
    showToast(msg, type === "warning" ? "error" : type);
  };

  // Simulated Email logger with console design styling and a toast notification
  const simulateEmail = (to: string, subject: string, body: string) => {
    console.log(
      `%c[SIMULATED EMAIL SENT]\nTo: ${to}\nSubject: ${subject}\nBody:\n${body}`,
      "background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; padding: 12px; border-radius: 8px; font-weight: bold; font-family: monospace; font-size: 11px;"
    );
    showToast(`Simulated Email sent to ${to}`, "info");
  };

  // Dark Mode disabled - Keeping app cleanly in light mode
  useEffect(() => {
    localStorage.setItem("cci_dark_mode", "false");
    document.documentElement.classList.remove("dark");
  }, []);

  // Dynamic Sync and Realtime Database Updates Listener Across Tabs and Devices
  useEffect(() => {
    const handleStorageReload = () => {
      // Reload db states
      const rawUsers = localStorage.getItem("users");
      if (rawUsers) {
        try {
          const parsed = JSON.parse(rawUsers);
          setUsers(parsed.map((u: any) => ({
            ...u,
            role: u.role === "recruiter" ? "company" : u.role
          })));
        } catch (_) {}
      }

      const rawCompanies = localStorage.getItem("companies");
      if (rawCompanies) {
        try { setCompanies(JSON.parse(rawCompanies)); } catch (_) {}
      }

      const rawJobs = localStorage.getItem("jobs");
      if (rawJobs) {
        try { setJobs(JSON.parse(rawJobs)); } catch (_) {}
      }

      const rawApps = localStorage.getItem("applications");
      if (rawApps) {
        try { setApplications(JSON.parse(rawApps)); } catch (_) {}
      }

      const rawCurrentUser = localStorage.getItem("cci_current_user");
      const parsedCurrentUser = rawCurrentUser ? JSON.parse(rawCurrentUser) : null;
      setCurrentUser(parsedCurrentUser);

      const rawSaved = localStorage.getItem("cci_saved_jobs");
      const loadedSaved = rawSaved ? JSON.parse(rawSaved) : [];
      if (parsedCurrentUser && parsedCurrentUser.role === "seeker") {
        setSavedJobs(
          loadedSaved
            .filter((item: SavedJob) => item.seekerId === parsedCurrentUser.id)
            .map((item: SavedJob) => item.jobId)
        );
      } else {
        setSavedJobs([]);
      }

      // Sync maintenance mode
      const rawSettings = localStorage.getItem("cci_sys_settings");
      if (rawSettings) {
        try {
          const parsed = JSON.parse(rawSettings);
          setMaintenance(!!parsed.maintenance);
        } catch (_) {}
      } else {
        setMaintenance(false);
      }
    };

    // Run synchronous reload first for fast visual responsiveness
    handleStorageReload();

    // Dynamically pull all latest records from central server in background
    syncAllEntities(() => {
      handleStorageReload();
    }).catch((err) => console.warn("[CCI Sync] Background pull failed:", err));

    window.addEventListener("storage", handleStorageReload);
    return () => window.removeEventListener("storage", handleStorageReload);
  }, []);

  // Synchronize state with URL Hash
  const syncStateWithHash = () => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    if (hash === "#home" || hash === "#" || hash === "") {
      setCurrentTab("home");
      setSelectedJob(null);
    } else if (hash === "#jobs") {
      setCurrentTab("jobs");
      setSelectedJob(null);
    } else if (hash === "#companies") {
      setCurrentTab("companies");
      setSelectedJob(null);
    } else if (hash === "#dashboard") {
      const rawSessionUser = localStorage.getItem("cci_current_user");
      const sessionUser = rawSessionUser ? JSON.parse(rawSessionUser) : null;
      if (!sessionUser) {
        // Safe fallback and trigger modal
        window.history.replaceState(null, "", "#home");
        setCurrentTab("home");
        setSelectedJob(null);
        setAuthModalOpen(true);
        triggerToast("Authorized credentials are required to load Dashboard files.", "warning");
      } else {
        setCurrentTab("dashboard");
        setSelectedJob(null);
      }
    } else if (hash.startsWith("#job=")) {
      const jobId = hash.replace("#job=", "");
      const rawJobs = localStorage.getItem("cci_jobs");
      const loadedJobs = rawJobs ? JSON.parse(rawJobs) : [];
      const foundJob = loadedJobs.find((j: Job) => j.id === jobId);
      if (foundJob) {
        setSelectedJob(foundJob);
        setCurrentTab("jobs");
      } else {
        // Fallback to jobs if not found
        setCurrentTab("jobs");
        setSelectedJob(null);
      }
    } else {
      setCurrentTab("home");
      setSelectedJob(null);
    }
  };

  // Helper navigate helper updating history
  const navigateToHash = (newHash: string) => {
    window.history.pushState(null, "", newHash);
    syncStateWithHash();
  };

  // Setup History listener
  useEffect(() => {
    // Initial load sync
    syncStateWithHash();

    const handlePopState = () => {
      syncStateWithHash();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  // Sync saved wishlists on user change
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "seeker") {
        const rawSaved = localStorage.getItem("cci_saved_jobs");
        const loadedSaved = rawSaved ? JSON.parse(rawSaved) : [];
        const userSavedIds = loadedSaved
          .filter((item: SavedJob) => item.seekerId === currentUser.id)
          .map((item: SavedJob) => item.jobId);
        setSavedJobs(userSavedIds);
      }
    } else {
      setSavedJobs([]);
    }
  }, [currentUser]);

  // 2. Authentication handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("cci_current_user", JSON.stringify(user));

    // Reload candidate savings structure if Seeker logs in
    if (user.role === "seeker") {
      const rawSaved = localStorage.getItem("cci_saved_jobs");
      const loadedSaved = rawSaved ? JSON.parse(rawSaved) : [];
      const userSavedIds = loadedSaved
        .filter((item: SavedJob) => item.seekerId === user.id)
        .map((item: SavedJob) => item.jobId);
      setSavedJobs(userSavedIds);
    }

    triggerToast(`Welcome back, ${user.name}! Accessing panel assets...`, "success");
    navigateToHash("#dashboard");
  };

  const handleSignupSuccess = (user: User, company?: Company) => {
    setCurrentUser(user);
    localStorage.setItem("cci_current_user", JSON.stringify(user));

    // Refresh database users in memory
    const rawUsers = localStorage.getItem("cci_users");
    if (rawUsers) setUsers(JSON.parse(rawUsers));

    if (company) {
      const rawCompanies = localStorage.getItem("cci_companies");
      if (rawCompanies) setCompanies(JSON.parse(rawCompanies));
    }

    // Load welcome email template from superintendent settings
    let welcomeMessage = `Dear ${user.name},\n\nWelcome to Career Connect India! Your professional credentials portal is active.\n\nWarm regards,\nCCI Operations Suite`;
    const sysConfVal = localStorage.getItem("cci_sys_settings");
    if (sysConfVal) {
      try {
        const parsed = JSON.parse(sysConfVal);
        if (parsed.welcomeTemplate) {
          welcomeMessage = parsed.welcomeTemplate.replace("Dear Applicant", `Dear ${user.name}`);
        }
      } catch (_) {}
    }

    simulateEmail(user.email, "Welcome to Career Connect India!", welcomeMessage);

    triggerToast(`Congratulations ${user.name}, your account is active! Setup completed!`, "success");
    navigateToHash("#dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedJobs([]);
    localStorage.removeItem("cci_current_user");
    triggerToast("Logged out successfully. All local sandbox tokens cleared.", "info");
    navigateToHash("#home");
  };

  // Navigations with security checks (prompting modal if dashboard requested on guest)
  const handleNavigate = (tab: string) => {
    if (tab === "dashboard" && !currentUser) {
      setAuthModalOpen(true);
      triggerToast("Authorized credentials are required to load Dashboard files.", "warning");
      return;
    }
    navigateToHash("#" + tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectJob = (job: Job | null) => {
    if (job) {
      navigateToHash(`#job=${job.id}`);
    } else {
      navigateToHash("#jobs");
    }
  };

  // Global search transfers
  const handleSetGlobalSearch = (term: string, loc: string) => {
    setGlobalSearchTerm(term);
    setGlobalSearchLoc(loc);
  };

  const handleClearGlobalSearch = () => {
    setGlobalSearchTerm("");
    setGlobalSearchLoc("");
  };

  // 3. User operations: SEEKER PROFILE UPDATES
  const handleUpdateProfile = (updatedProfile: User) => {
    const updatedUsers = users.map((u) => (u.id === updatedProfile.id ? updatedProfile : u));
    setUsers(updatedUsers);
    localStorage.setItem("cci_users", JSON.stringify(updatedUsers));
    const customUsersList = updatedUsers.map(u => ({
      ...u,
      role: u.role === "company" ? "recruiter" : u.role
    }));
    localStorage.setItem("users", JSON.stringify(customUsersList));

    // Sync session
    setCurrentUser(updatedProfile);
    localStorage.setItem("cci_current_user", JSON.stringify(updatedProfile));

    triggerToast("Your professional portfolio has been saved successfully in LocalStorage.", "success");
  };

  // 4. Seeker wishlist/bookmarks toggler
  const handleToggleSaveJob = (jobId: string) => {
    if (!currentUser || currentUser.role !== "seeker") {
      triggerToast("Please authenticate with a candidate profile to book jobs.", "warning");
      return;
    }

    const rawSaved = localStorage.getItem("cci_saved_jobs");
    const loadedSaved: SavedJob[] = rawSaved ? JSON.parse(rawSaved) : [];

    const existingIndex = loadedSaved.findIndex(
      (item) => item.seekerId === currentUser.id && item.jobId === jobId
    );

    let updatedSaved: SavedJob[];
    let isAdded = false;

    if (existingIndex > -1) {
      updatedSaved = loadedSaved.filter((_, idx) => idx !== existingIndex);
    } else {
      updatedSaved = [
        ...loadedSaved,
        {
          id: "save_" + Date.now(),
          seekerId: currentUser.id,
          jobId: jobId,
        },
      ];
      isAdded = true;
    }

    localStorage.setItem("cci_saved_jobs", JSON.stringify(updatedSaved));

    // Update state
    setSavedJobs(
      updatedSaved.filter((item) => item.seekerId === currentUser.id).map((item) => item.jobId)
    );

    triggerToast(
      isAdded
        ? "Job card bookmarked! Review inside Saved Jobs panel."
        : "Removed bookmark parameters.",
      "success"
    );
  };

  // 5. Seeker direct job applications
  const handleApplyJob = (jobId: string) => {
    if (!currentUser || currentUser.role !== "seeker") {
      setAuthModalOpen(true);
      triggerToast("Authenticate as a job seeker to submit filings.", "warning");
      return;
    }

    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return;

    // Check if already applied
    const alreadyApplied = applications.some(
      (app) => app.jobId === jobId && app.seekerId === currentUser.id
    );

    if (alreadyApplied) {
      triggerToast("We received your submission previously for this opening.", "info");
      return;
    }

    const newApp: Application = {
      id: "app_" + Date.now(),
      jobId: jobId,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      seekerEmail: currentUser.email,
      seekerExperience: currentUser.experience || 0,
      seekerSkills: currentUser.skills || [],
      resumeName: currentUser.resumeName || "Mock Profile Details",
      resumeBase64: currentUser.resumeBase64,
      status: "Applied",
      dateApplied: new Date().toISOString().split("T")[0],
    };

    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    localStorage.setItem("cci_applications", JSON.stringify(updatedApps));

    triggerToast(`Application filed successfully for: ${targetJob.title}! Track statuses in Dashboard.`, "success");
  };

  // 6. Recruiter Company coordinates synchronization
  const handleUpdateCompany = (updatedCompany: Company) => {
    const updatedCompanies = companies.map((c) => (c.id === updatedCompany.id ? updatedCompany : c));
    setCompanies(updatedCompanies);
    localStorage.setItem("cci_companies", JSON.stringify(updatedCompanies));

    // update corresponding jobs brand names if name modified
    const updatedJobs = jobs.map((job) =>
      job.companyId === updatedCompany.id ? { ...job, companyName: updatedCompany.name, location: updatedCompany.location } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));

    triggerToast("Recruiter corporate metadata has been saved successfully in database.", "success");
  };

  // 7. Recruiter: POST A NEW JOB opening
  const handlePostJob = (jobData: Omit<Job, "id" | "companyId" | "companyName" | "datePosted">) => {
    if (!currentUser || currentUser.role !== "company" || !currentUser.companyId) return;

    const companyInfo = companies.find((c) => c.id === currentUser.companyId);
    if (!companyInfo) return;

    const newJob: Job = {
      ...jobData,
      id: "job_" + Date.now(),
      companyId: companyInfo.id,
      companyName: companyInfo.name,
      datePosted: new Date().toISOString().split("T")[0],
    };

    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));

    triggerToast(`Published spotlight listing: ${newJob.title}!`, "success");
  };

  // 8. Recruiter: UPDATE AN EXISTING JOB coordinates
  const handleUpdateJob = (updatedJob: Job) => {
    const updatedJobs = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));

    triggerToast("Job posting modified successfully.", "success");
  };

  // 9. Recruiter Delete a job
  const handleDeleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter((j) => j.id !== jobId);
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));

    // Remove corresponding applications too to clear index
    const updatedApps = applications.filter((app) => app.jobId !== jobId);
    setApplications(updatedApps);
    localStorage.setItem("cci_applications", JSON.stringify(updatedApps));

    triggerToast("Job position removed cleanly of indices.", "warning");
  };

  // 10. Recruiter: SHORTLIST/REJECT candidate status
  const handleUpdateApplicationStatus = (appId: string, status: "Shortlisted" | "Rejected") => {
    const updatedApps = applications.map((app) => (app.id === appId ? { ...app, status } : app));
    setApplications(updatedApps);
    localStorage.setItem("cci_applications", JSON.stringify(updatedApps));

    triggerToast(`Candidate application status marked: ${status.toUpperCase()}!`, "success");
  };

  // 11. Admin controls: Block/Unblock user account
  const handleToggleBlockUser = (userId: string) => {
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, blocked: !u.blocked } : u));
    setUsers(updatedUsers);
    localStorage.setItem("cci_users", JSON.stringify(updatedUsers));
    const customUsersList = updatedUsers.map(u => ({
      ...u,
      role: u.role === "company" ? "recruiter" : u.role
    }));
    localStorage.setItem("users", JSON.stringify(customUsersList));

    const targeted = users.find((u) => u.id === userId);
    const wasBlocked = targeted ? !targeted.blocked : false;

    triggerToast(
      wasBlocked
        ? `Account blocked. Credentials will fail authentication check.`
        : `Unblocked account! Permission restored.`,
      wasBlocked ? "warning" : "success"
    );
  };

  // Admin: Delete user accounts
  const handleDeleteUser = (userId: string) => {
    if (currentUser && userId === currentUser.id) {
      triggerToast("CRITICAL AUTOPROTECTION: You are forbidden from deleting your own admin session workspace.", "warning");
      return;
    }
    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("cci_users", JSON.stringify(updatedUsers));
    const customUsersList = updatedUsers.map(u => ({
      ...u,
      role: u.role === "company" ? "recruiter" : u.role
    }));
    localStorage.setItem("users", JSON.stringify(customUsersList));

    // Cleanup corresponding applications
    const seekerAppsClean = applications.filter((app) => app.seekerId !== userId);
    setApplications(seekerAppsClean);
    localStorage.setItem("cci_applications", JSON.stringify(seekerAppsClean));

    triggerToast("User account has been cleared permanently from local mock tables.", "warning");
  };

  // Admin: Toggle Verify Company
  const handleToggleVerifyCompany = (companyId: string) => {
    const updatedCompanies = companies.map((c) => (c.id === companyId ? { ...c, verified: !c.verified } : c));
    setCompanies(updatedCompanies);
    localStorage.setItem("cci_companies", JSON.stringify(updatedCompanies));
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    const targeted = companies.find((c) => c.id === companyId);
    const isVerified = targeted ? !targeted.verified : false;

    triggerToast(
      isVerified
        ? "Enabled verified badge! Credential flag elevated."
        : "Revoked company verification flag.",
      "info"
    );
  };

  // Admin: Delete Company profile
  const handleDeleteCompany = (companyId: string) => {
    const updatedCompanies = companies.filter((c) => c.id !== companyId);
    setCompanies(updatedCompanies);
    localStorage.setItem("cci_companies", JSON.stringify(updatedCompanies));
    localStorage.setItem("companies", JSON.stringify(updatedCompanies));

    // Also close and delete active job listings connected to that company parameters
    const updatedJobs = jobs.filter((j) => j.companyId !== companyId);
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    triggerToast("Company corporate dossier removed completely.", "warning");
  };

  if (maintenance && !(currentUser && currentUser.role === "admin")) {
    return (
      <div className="min-h-screen bg-slate-50 text-[#1F293A] flex flex-col justify-between selection:bg-blue-100 selection:text-blue-850 animate-in fade-in duration-300" id="cci-maintenance-root">
        {/* Toast Notification Container for Maintenance Mode */}
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
              id={`system-toast-panel-${toast.id}`}
            >
              <CheckCircle2 className="text-white shrink-0" size={16} />
              <span className="font-semibold">{toast.msg}</span>
            </div>
          ))}
        </div>

        {/* Header with admin login option */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-18 flex items-center justify-between border-b border-gray-100 bg-white/50 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-gray-805 tracking-tight flex items-center gap-1.5 font-mono">
              💼 <span className="text-blue-600 font-extrabold text-sm uppercase">CCI</span>
            </span>
          </div>
          <button
            onClick={() => handleOpenAuth("login", "seeker")}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-xl transition-all"
          >
            System Login
          </button>
        </header>

        {/* Maintenance Message Card */}
        <main className="flex-grow flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-lg w-full p-8 rounded-3xl shadow-xl border border-gray-200/80 text-center space-y-6"
          >
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-inner animate-pulse">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 uppercase tracking-wider font-mono">
                Maintenance Mode Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Scheduled Upgrade Underway
              </h2>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
              CCI operations are temporarily offline while our superintendent executes vital directory updates and performance optimizations. Candidate records and live postings will resume immediately once tasks complete.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-gray-150 inline-block text-left text-xs font-mono text-gray-500 space-y-1">
              <div className="flex justify-between gap-8">
                <span>SYSTEM STATUS:</span>
                <span className="text-amber-600 font-bold">OPTIMIZATION IN PROGRESS</span>
              </div>
              <div className="flex justify-between gap-8">
                <span>ESTIMATED TIME:</span>
                <span className="text-gray-700 font-semibold">15 MINS</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-gray-400">
                Are you a platform supervisor? Click "System Login" above to authenticate your sessions.
              </p>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-xs text-gray-400 border-t border-gray-100">
          © 2026 Career Connect India • Unified Superintendent Control
        </footer>

        {/* Auth modal so admins can login *even* in maintenance mode page! */}
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSignupSuccess={handleSignupSuccess}
          initialMode={authModalMode}
          initialRole={authModalRole}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1F293A] flex flex-col justify-between selection:bg-blue-100 selection:text-blue-800" id="cci-master-root">
      
      {/* Self closing dynamic Toast notifications stacking */}
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
            id={`system-toast-panel-${toast.id}`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="text-white shrink-0" size={16} />
            ) : toast.type === "error" ? (
              <ShieldAlert className="text-white shrink-0" size={16} />
            ) : toast.type === "warning" ? (
              <Sparkles className="text-white shrink-0" size={16} />
            ) : (
              <Sparkles className="text-white shrink-0" size={16} />
            )}
            <span className="font-semibold">{toast.msg}</span>
          </div>
        ))}
      </div>

      {/* Navigation Layer */}
      <Navbar
        currentUser={currentUser}
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onOpenAuth={(mode, role) => handleOpenAuth(mode || "login", role || "seeker")}
      />

      {/* Primary Section Canvas */}
      <main className="flex-grow">
        {currentTab === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <HomeHero
              jobs={jobs}
              companies={companies}
              currentUser={currentUser}
              savedJobIds={savedJobs}
              appliedJobIds={applications
                .filter((app) => app.seekerId === currentUser?.id)
                .map((app) => app.jobId)}
              onNavigate={handleNavigate}
              onSetGlobalSearch={handleSetGlobalSearch}
              onOpenAuth={() => handleOpenAuth("login")}
              onApplyJob={handleApplyJob}
              onToggleSaveJob={handleToggleSaveJob}
              onSelectJob={(job) => {
                handleSelectJob(job);
              }}
            />
          </motion.div>
        )}

        {currentTab === "jobs" && (
          <motion.div
            key="jobs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <JobListingPage
              jobs={jobs}
              companies={companies}
              currentUser={currentUser}
              savedJobIds={savedJobs}
              appliedJobIds={applications
                .filter((app) => app.seekerId === currentUser?.id)
                .map((app) => app.jobId)}
              globalSearchTerm={globalSearchTerm}
              globalSearchLoc={globalSearchLoc}
              onClearGlobalSearch={handleClearGlobalSearch}
              onApplyJob={handleApplyJob}
              onToggleSaveJob={handleToggleSaveJob}
              onOpenAuth={() => handleOpenAuth("login")}
              selectedJob={selectedJob}
              onSelectJob={handleSelectJob}
            />
          </motion.div>
        )}

        {currentTab === "companies" && (
          <motion.div
            key="companies"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CompaniesPage
              companies={companies}
              jobs={jobs}
              onSetGlobalSearch={handleSetGlobalSearch}
              onNavigate={handleNavigate}
            />
          </motion.div>
        )}

        {currentTab === "dashboard" && currentUser && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {currentUser.role === "seeker" && (
              <SeekerDashboard
                currentUser={currentUser}
                onUpdateProfile={handleUpdateProfile}
                jobs={jobs}
                applications={applications}
                savedJobs={savedJobs}
                onToggleSaveJob={handleToggleSaveJob}
                onApplyJob={handleApplyJob}
                onSelectJob={(job) => {
                  handleSelectJob(job);
                }}
              />
            )}

            {currentUser.role === "company" && (
              <RecruiterDashboard
                currentUser={currentUser}
                companies={companies}
                jobs={jobs}
                applications={applications}
                onUpdateCompany={handleUpdateCompany}
                onPostJob={handlePostJob}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
              />
            )}

            {currentUser.role === "admin" && (
              <AdminDashboard
                currentUser={currentUser}
                users={users}
                companies={companies}
                jobs={jobs}
                applications={applications}
                onToggleBlockUser={handleToggleBlockUser}
                onDeleteUser={handleDeleteUser}
                onToggleVerifyCompany={handleToggleVerifyCompany}
                onDeleteCompany={handleDeleteCompany}
                onToggleJobStatus={jId => {
                  const job = jobs.find(jb => jb.id === jId);
                  if (job) handleUpdateJob({ ...job, active: !job.active });
                }}
                onDeleteJob={handleDeleteJob}
              />
            )}
          </motion.div>
        )}
      </main>

      {/* Footer Layer */}
      <Footer />

      {/* Authentication Gateway dialog modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
        initialMode={authModalMode}
        initialRole={authModalRole}
      />

    </div>
  );
}
