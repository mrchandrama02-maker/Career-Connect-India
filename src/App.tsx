/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { User, Company, Job, Application, SavedJob } from "./types";
import { initLocalStorage } from "./data/mockData";
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
  // Navigation & Modal States
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Global search transfers (Homepage input leads to Pre-filtered Job Browser)
  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>("");
  const [globalSearchLoc, setGlobalSearchLoc] = useState<string>("");

  // Inspect selection
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Core Database States
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]); // Array of job IDs saved by current seeker

  // Logged-in session State
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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

  // Dark Mode state initialization & handlers
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("cci_dark_mode") === "true";
  });

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newVal = !prev;
      localStorage.setItem("cci_dark_mode", String(newVal));
      return newVal;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 1. Initial hydration and setup
  useEffect(() => {
    // Seed database if not existing
    initLocalStorage();

    // Fetch collections
    const rawUsers = localStorage.getItem("cci_users");
    const rawCompanies = localStorage.getItem("cci_companies");
    const rawJobs = localStorage.getItem("cci_jobs");
    const rawApps = localStorage.getItem("cci_applications");
    const rawSaved = localStorage.getItem("cci_saved_jobs");
    const rawSessionUser = localStorage.getItem("cci_current_user");

    const loadedUsers = rawUsers ? JSON.parse(rawUsers) : [];
    const loadedCompanies = rawCompanies ? JSON.parse(rawCompanies) : [];
    const loadedJobs = rawJobs ? JSON.parse(rawJobs) : [];
    const loadedApplications = rawApps ? JSON.parse(rawApps) : [];
    const sessionUser = rawSessionUser ? JSON.parse(rawSessionUser) : null;

    setUsers(loadedUsers);
    setCompanies(loadedCompanies);
    setJobs(loadedJobs);
    setApplications(loadedApplications);
    setCurrentUser(sessionUser);

    // If seeker active, get their saved wishlists
    if (sessionUser && sessionUser.role === "seeker") {
      const loadedSaved = rawSaved ? JSON.parse(rawSaved) : [];
      const userSavedIds = loadedSaved
        .filter((item: SavedJob) => item.seekerId === sessionUser.id)
        .map((item: SavedJob) => item.jobId);
      setSavedJobs(userSavedIds);
    }
  }, []);

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
    setCurrentTab("dashboard");
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

    triggerToast(`Congratulations ${user.name}, your account is active! Setup completed!`, "success");
    setCurrentTab("dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSavedJobs([]);
    localStorage.removeItem("cci_current_user");
    triggerToast("Logged out successfully. All local sandbox tokens cleared.", "info");
    setCurrentTab("home");
  };

  // Navigations with security checks (prompting modal if dashboard requested on guest)
  const handleNavigate = (tab: string) => {
    if (tab === "dashboard" && !currentUser) {
      setAuthModalOpen(true);
      triggerToast("Authorized credentials are required to load Dashboard files.", "warning");
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

    // Also close and delete active job listings connected to that company parameters
    const updatedJobs = jobs.filter((j) => j.companyId !== companyId);
    setJobs(updatedJobs);
    localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));

    triggerToast("Company corporate dossier removed completely.", "warning");
  };

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
        onOpenAuth={() => setAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Primary Section Canvas */}
      <main className="flex-grow">
        {currentTab === "home" && (
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
            onOpenAuth={() => setAuthModalOpen(true)}
            onApplyJob={handleApplyJob}
            onToggleSaveJob={handleToggleSaveJob}
            onSelectJob={(job) => {
              setSelectedJob(job);
              handleNavigate("jobs");
            }}
          />
        )}

        {currentTab === "jobs" && (
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
            onOpenAuth={() => setAuthModalOpen(true)}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJob}
          />
        )}

        {currentTab === "companies" && (
          <CompaniesPage
            companies={companies}
            jobs={jobs}
            onSetGlobalSearch={handleSetGlobalSearch}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === "dashboard" && currentUser && (
          <>
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
                  setSelectedJob(job);
                  handleNavigate("jobs");
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
          </>
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
      />

    </div>
  );
}
