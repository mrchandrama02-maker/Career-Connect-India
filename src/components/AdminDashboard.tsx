/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { User, Company, Job, Application } from "../types";
import { 
  Shield, Users, Landmark, Briefcase, Send, CheckCircle, AlertTriangle, Trash2, 
  ShieldCheck, Search, Eye, Settings, FileText, BadgeAlert, HelpCircle, BarChart3, 
  Database, Key, IndianRupee, Bell, History, FileHeart, EyeOff, CheckCircle2, 
  RefreshCw, PlusCircle, Globe, MailCheck, Edit3, Smartphone, Laptop, Sparkles, X, FileSpreadsheet
} from "lucide-react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface AdminDashboardProps {
  currentUser: User;
  adminRole?: "super_admin" | "admin" | "viewer" | string;
  users: User[];
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  onToggleBlockUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onToggleVerifyCompany: (companyId: string) => void;
  onDeleteCompany: (companyId: string) => void;
  onToggleJobStatus: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
  onTriggerNotification?: (msg: string, type: "success" | "error" | "warning" | "info") => void;
  onReloadDatabase?: () => void;
}

// Enterprise Mock interfaces for specialized dashboard features
interface ReportItem {
  id: string;
  reportedBy: string;
  reportedTarget: string;
  reason: string;
  date: string;
  status: "Pending" | "Resolved";
  type: "Job Post" | "User profile" | "Dispute";
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface BlogItem {
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
}

interface AuditLog {
  id: string;
  adminEmail: string;
  adminRole: string;
  action: string;
  timestamp: string;
  details: string;
}

export default function AdminDashboard({
  currentUser,
  adminRole = "admin",
  users,
  companies,
  jobs,
  applications,
  onToggleBlockUser,
  onDeleteUser,
  onToggleVerifyCompany,
  onDeleteCompany,
  onToggleJobStatus,
  onDeleteJob,
  onTriggerNotification,
  onReloadDatabase,
}: AdminDashboardProps) {

  // Current Operational Admin permissions
  const opRole = adminRole; // "super_admin" | "admin" | "viewer"

  // 12 tabs management state
  const [activeTab, setActiveTab] = useState<
    "stats" | "seekers" | "companies" | "jobs" | "reports" | "analytics" | "settings" | "broadcasts" | "security" | "monetization" | "mobile" | "cms"
  >("stats");
  const [adminMenuCollapsed, setAdminMenuCollapsed] = useState(true);

  // Search filter and pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [seekersPage, setSeekersPage] = useState(1);
  const [companiesPage, setCompaniesPage] = useState(1);
  const [jobsPage, setJobsPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Modals for editing/viewing detail items
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUserSkills, setEditUserSkills] = useState("");
  const [editUserExp, setEditUserExp] = useState(1);
  const [editUserEdu, setEditUserEdu] = useState("");
  
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyRating, setCompanyRating] = useState<number>(4);

  // Persistent States for local tables
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  
  // Custom Date range for Section 6 Reports
  const [analyticsStartDate, setAnalyticsStartDate] = useState("2026-05-01");
  const [analyticsEndDate, setAnalyticsEndDate] = useState("2026-06-30");

  // Broadcast campaign state
  const [broadcastTarget, setBroadcastTarget] = useState<"all" | "seeker" | "company">("all");
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");

  // CMS editable fields state
  const [cmsHeroTitle, setCmsHeroTitle] = useState("Find the Perfect Tech Role Across India");
  const [cmsHeroSubtext, setCmsHeroSubtext] = useState("Unified professional gateway supporting next-gen engineers and elite enterprises.");
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogSummary, setNewBlogSummary] = useState("");

  // System general settings state
  const [sysMaintenanceMode, setSysMaintenanceMode] = useState(false);
  const [sysGatedRegistrations, setSysGatedRegistrations] = useState(false);
  const [sysRequireJobApproval, setSysRequireJobApproval] = useState(false);
  const [sysAllowSocialLogin, setSysAllowSocialLogin] = useState(true);
  const [sysEmailTemplateWelcome, setSysEmailTemplateWelcome] = useState("Dear Applicant,\n\nWelcome to Career Connect India! Your professional credentials portal is active.\n\nWarm regards,\nCCI Operations Suite");

  // Chart References
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstanceRef = useRef<any>(null);
  const barChartInstanceRef = useRef<any>(null);

  // Helper toaster trigger wrapper
  const notify = (msg: string, type: "success" | "error" | "warning" | "info" = "success") => {
    if (onTriggerNotification) {
      onTriggerNotification(msg, type);
    } else {
      alert(`[${type.toUpperCase()}] ${msg}`);
    }
  };

  // Helper enforcing read-only constraint
  const verifyWritable = (): boolean => {
    if (opRole === "viewer") {
      notify("Access Denied: Read-only Viewer credentials cannot modify settings.", "error");
      return false;
    }
    return true;
  };

  // Populate localized lists on mount
  useEffect(() => {
    // 1. Audit logs
    let savedLogs = localStorage.getItem("cci_audit_logs");
    if (!savedLogs) {
      const defaultLogs: AuditLog[] = [
        {
          id: "log_seed_1",
          adminEmail: "superadmin@careerconnectindia.com",
          adminRole: "super_admin",
          action: "Initialized Administration Console Settings",
          timestamp: "2026-06-01T12:00:00Z",
          details: "Automated configuration setup applied to system database."
        },
        {
          id: "log_seed_2",
          adminEmail: "admin@careerconnectindia.com",
          adminRole: "admin",
          action: "Seeded sample candidate indices",
          timestamp: "2026-06-02T02:30:00Z",
          details: "Created portfolios for Rajesh, Priya, and Amit Kumar."
        }
      ];
      localStorage.setItem("cci_audit_logs", JSON.stringify(defaultLogs));
      savedLogs = JSON.stringify(defaultLogs);
    }
    setAuditLogs(JSON.parse(savedLogs));

    // 2. Dispute/Report Lists
    let savedReports = localStorage.getItem("cci_reports");
    if (!savedReports) {
      const defaultReports: ReportItem[] = [
        {
          id: "rep_1",
          reportedBy: "rajesh@gmail.com",
          reportedTarget: "Senior React Developer (Tech Mahindra)",
          reason: "Suspected invalid recruitment contact details.",
          date: "2026-05-28",
          status: "Pending",
          type: "Job Post"
        },
        {
          id: "rep_2",
          reportedBy: "priya@gmail.com",
          reportedTarget: "Amit Kumar Seeker Account",
          reason: "Inconsistent skills profile validation flag.",
          date: "2026-05-30",
          status: "Resolved",
          type: "User profile"
        }
      ];
      localStorage.setItem("cci_reports", JSON.stringify(defaultReports));
      savedReports = JSON.stringify(defaultReports);
    }
    setReports(JSON.parse(savedReports));

    // 3. System general settings
    const sysConf = localStorage.getItem("cci_sys_settings");
    if (sysConf) {
      try {
        const parsed = JSON.parse(sysConf);
        setSysMaintenanceMode(!!parsed.maintenance);
        setSysGatedRegistrations(!!parsed.gated);
        setSysRequireJobApproval(!!parsed.requireApproval);
        setSysAllowSocialLogin(parsed.social !== false);
        if (parsed.welcomeTemplate) setSysEmailTemplateWelcome(parsed.welcomeTemplate);
      } catch (_) {}
    }

    // 4. FAQs
    let savedFaqs = localStorage.getItem("cci_faqs");
    if (!savedFaqs) {
      const defaultFaqs: FaqItem[] = [
        { id: "faq_1", question: "How can seekers apply with 1-click?", answer: "Upload a standard dynamic CV file to your dashboard and push Apply on open listings." },
        { id: "faq_2", question: "Is verification mandatory for recruiters?", answer: "Admin verification elevates exposure and flags the verified badge badge on job postings." }
      ];
      localStorage.setItem("cci_faqs", JSON.stringify(defaultFaqs));
      savedFaqs = JSON.stringify(defaultFaqs);
    }
    setFaqs(JSON.parse(savedFaqs));

    // 5. CMS Hero subtext
    const heroTitle = localStorage.getItem("cci_cms_hero_title");
    const heroSubText = localStorage.getItem("cci_cms_hero_subtext");
    if (heroTitle) setCmsHeroTitle(heroTitle);
    if (heroSubText) setCmsHeroSubtext(heroSubText);

    // 6. Blogs CMS
    let savedBlogs = localStorage.getItem("cci_blogs");
    if (!savedBlogs) {
      const defaultBlogs: BlogItem[] = [
        { id: "blog_1", title: "Modern Hiring Trends in Bangalore", author: "Administration Suite", date: "2026-06-01", summary: "Exploring remote and high-yield engineering roles." }
      ];
      localStorage.setItem("cci_blogs", JSON.stringify(defaultBlogs));
      savedBlogs = JSON.stringify(defaultBlogs);
    }
    setBlogs(JSON.parse(savedBlogs));

  }, []);

  // Save general settings helper
  const handleSaveSystemSettings = () => {
    if (!verifyWritable()) return;
    const settingsObj = {
      maintenance: sysMaintenanceMode,
      gated: sysGatedRegistrations,
      requireApproval: sysRequireJobApproval,
      social: sysAllowSocialLogin,
      welcomeTemplate: sysEmailTemplateWelcome
    };
    localStorage.setItem("cci_sys_settings", JSON.stringify(settingsObj));
    
    // Add audit log
    appendAuditLog("Updated Platform System Settings", `Gated: ${sysGatedRegistrations} • Maintenance: ${sysMaintenanceMode}`);
    notify("Enterprise settings saved and updated across standard node proxies.", "success");
  };

  // Append new entry to live security logs
  const appendAuditLog = (action: string, details: string) => {
    const logs = JSON.parse(localStorage.getItem("cci_audit_logs") || "[]");
    const newLog: AuditLog = {
      id: "log_" + Date.now() + "_" + Math.floor(Math.random() * 100),
      adminEmail: currentUser.email,
      adminRole: opRole,
      action,
      timestamp: new Date().toISOString(),
      details
    };
    const updated = [newLog, ...logs];
    localStorage.setItem("cci_audit_logs", JSON.stringify(updated));
    setAuditLogs(updated);
  };

  // Filter listings based on Search Input
  const seekers = users.filter(u => u.role === "seeker");
  const recruiters = users.filter(u => u.role === "company");

  const filteredSeekers = seekers.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.skills && s.skills.join(" ").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination bounds
  const paginatedSeekers = filteredSeekers.slice((seekersPage - 1) * ITEMS_PER_PAGE, seekersPage * ITEMS_PER_PAGE);
  const paginatedCompanies = filteredCompanies.slice((companiesPage - 1) * ITEMS_PER_PAGE, companiesPage * ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice((jobsPage - 1) * ITEMS_PER_PAGE, jobsPage * ITEMS_PER_PAGE);

  const totalSeekersPages = Math.ceil(filteredSeekers.length / ITEMS_PER_PAGE) || 1;
  const totalCompaniesPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE) || 1;
  const totalJobsPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;

  // Chart Rendering Effect
  useEffect(() => {
    if (activeTab !== "stats") return;
    
    // Line Chart
    if (lineChartRef.current) {
      if (lineChartInstanceRef.current) {
        lineChartInstanceRef.current.destroy();
      }
      
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        lineChartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Platform Registrations (Cumulative)",
                data: [15, 28, 45, 62, 85, users.length],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                tension: 0.3,
                fill: true,
                borderWidth: 2,
                pointRadius: 4,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, ticks: { font: { family: "monospace", size: 9 } } },
              x: { ticks: { font: { family: "monospace", size: 9 } } }
            }
          }
        });
      }
    }

    // Bar Chart
    if (barChartRef.current) {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }

      const jobCountsByCompany: { [name: string]: number } = {};
      jobs.forEach(j => {
        jobCountsByCompany[j.companyName] = (jobCountsByCompany[j.companyName] || 0) + 1;
      });
      const topCompanies = Object.entries(jobCountsByCompany)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const topCompanyNames = topCompanies.map(c => c[0]);
      const topCompanyCounts = topCompanies.map(c => c[1]);

      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        barChartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: topCompanyNames.length > 0 ? topCompanyNames : ["No Jobs Listed"],
            datasets: [
              {
                label: "Staff Openings Published",
                data: topCompanyCounts.length > 0 ? topCompanyCounts : [0],
                backgroundColor: "#10B981",
                borderRadius: 4,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { beginAtZero: true, ticks: { font: { family: "monospace", size: 9 } } },
              x: { ticks: { font: { family: "Inter", size: 9 } } }
            }
          }
        });
      }
    }

    return () => {
      if (lineChartInstanceRef.current) {
        lineChartInstanceRef.current.destroy();
        lineChartInstanceRef.current = null;
      }
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
        barChartInstanceRef.current = null;
      }
    };
  }, [activeTab, users, jobs]);

  // Section 5 Dispute Resolver Action
  const handleResolveReport = (reportId: string) => {
    if (!verifyWritable()) return;
    const updated = reports.map(r => r.id === reportId ? { ...r, status: "Resolved" as const } : r);
    setReports(updated);
    localStorage.setItem("cci_reports", JSON.stringify(updated));

    const matched = updated.find(r => r.id === reportId);
    appendAuditLog("Resolved Flagged Dispute Content", `Item reported: "${matched?.reportedTarget}" resolved.`);
    notify("Marked dispute ticket as Resolved. Actions completed.", "success");
  };

  // Section 8 Broadcast dispatch simulation
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyWritable()) return;

    if (!broadcastSubject || !broadcastMessage) {
      notify("Please fill out both broadcast title and message.", "warning");
      return;
    }

    // Simulate direct mailing
    notify(`Simulated ${broadcastTarget.toUpperCase()} broadcast sent to subscribers!`, "success");
    appendAuditLog("Dispatched Broadcast campaign", `Subject: ${broadcastSubject} • Audience: ${broadcastTarget}`);
    
    // Clear form
    setBroadcastSubject("");
    setBroadcastMessage("");
  };

  // Section 11 FAQ Add/Delete controller
  const handleAddFaq = () => {
    if (!verifyWritable()) return;
    if (!newFaqQ || !newFaqA) {
      notify("FAQ question and answer must be specified.", "warning");
      return;
    }

    const newItem: FaqItem = {
      id: "faq_" + Date.now(),
      question: newFaqQ,
      answer: newFaqA
    };
    const updated = [...faqs, newItem];
    setFaqs(updated);
    localStorage.setItem("cci_faqs", JSON.stringify(updated));
    setNewFaqQ("");
    setNewFaqA("");
    appendAuditLog("Added FAQ editorial item", `Q: "${newItem.question}"`);
    notify("New FAQ added successfuly.", "success");
  };

  const handleDeleteFaq = (faqId: string) => {
    if (!verifyWritable()) return;
    const updated = faqs.filter(f => f.id !== faqId);
    setFaqs(updated);
    localStorage.setItem("cci_faqs", JSON.stringify(updated));
    appendAuditLog("Deleted FAQ item", `ID: ${faqId}`);
    notify("FAQ page updated successfully.", "info");
  };

  // Section 11 Blog management
  const handleAddBlog = () => {
    if (!verifyWritable()) return;
    if (!newBlogTitle || !newBlogSummary) {
      notify("Blog title and summary details are mandatory.", "warning");
      return;
    }
    const item: BlogItem = {
      id: "blog_" + Date.now(),
      title: newBlogTitle,
      summary: newBlogSummary,
      author: currentUser.name,
      date: new Date().toISOString().split("T")[0]
    };
    const updated = [item, ...blogs];
    setBlogs(updated);
    localStorage.setItem("cci_blogs", JSON.stringify(updated));
    setNewBlogTitle("");
    setNewBlogSummary("");
    appendAuditLog("Added brand new professional newsletter article", `Title: "${item.title}"`);
    notify("Article posted onto the Seekers layout feed.", "success");
  };

  const handleDeleteBlog = (blogId: string) => {
    if (!verifyWritable()) return;
    const updated = blogs.filter(b => b.id !== blogId);
    setBlogs(updated);
    localStorage.setItem("cci_blogs", JSON.stringify(updated));
    appendAuditLog("Removed newsletter article", `ID: ${blogId}`);
    notify("Blog post deleted from main page.", "info");
  };

  // Save CMS Hero banner edits
  const handleSaveCmsBanner = () => {
    if (!verifyWritable()) return;
    localStorage.setItem("cci_cms_hero_title", cmsHeroTitle);
    localStorage.setItem("cci_cms_hero_subtext", cmsHeroSubtext);
    appendAuditLog("Updated Portal Front-heading text values", `Title: "${cmsHeroTitle}"`);
    notify("Welcome hero banner strings saved. Take effect on main page refresh.", "success");
  };

  // User details editor callback
  const handleSaveUserDetails = () => {
    if (!verifyWritable()) return;
    if (!selectedUser) return;

    const parsedSkills = editUserSkills.split(",").map(sk => sk.trim()).filter(Boolean);
    const updatedUsers = users.map(u => {
      if (u.id === selectedUser.id) {
        return {
          ...u,
          skills: parsedSkills,
          experience: editUserExp,
          education: editUserEdu
        };
      }
      return u;
    });

    localStorage.setItem("cci_users", JSON.stringify(updatedUsers));
    appendAuditLog("Modified candidate portfolio override", `Candidate: ${selectedUser.name}`);
    notify("Operational candidate portfolio changes updated successfully.", "success");
    setSelectedUser(null);
    if (onReloadDatabase) onReloadDatabase();
  };

  // Custom Report Generators (CSV)
  const downloadCSV = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerCustomAnalyticsExport = () => {
    let csv = `Career Connect India - Custom Analytical Report Range: ${analyticsStartDate} to ${analyticsEndDate}\n`;
    csv += "Total Seekers,Total Partner Companies,Approved Positions,Total Submitted Applications\n";
    csv += `${seekers.length},${companies.length},${jobs.length},${applications.length}\n\n`;
    csv += "ID,Type,Target,Reporter,Reason,Date,Status\n";
    reports.forEach(r => {
      csv += `${r.id},${r.type},"${r.reportedTarget}","${r.reportedBy}","${r.reason}",${r.date},${r.status}\n`;
    });
    downloadCSV(`cci_custom_report_${analyticsStartDate}_to_${analyticsEndDate}.csv`, csv);
    notify("Generated custom range database diagnostics successfully.", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* 12 Enterprise Sections Navigation Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Sidebar Tab Switcher */}
        <div className="lg:col-span-3 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
          <div className="px-3 py-2 border-b border-gray-100 mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 block">CCI System Nav</span>
            <button
              type="button"
              onClick={() => setAdminMenuCollapsed(!adminMenuCollapsed)}
              className="lg:hidden bg-blue-50 text-blue-700 text-[10px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <span>{adminMenuCollapsed ? "SHOW MENU ▾" : "HIDE MENU ▴"}</span>
            </button>
            <span className="hidden lg:inline bg-[#EFF6FF] text-[#3B82F6] text-[9px] px-2 py-0.5 rounded-full font-bold">12 Tabs</span>
          </div>

          <div className={`${adminMenuCollapsed ? "hidden lg:block space-y-1.5" : "block space-y-1.5 animate-in slide-in-from-top duration-200"}`}>

          <button
            onClick={() => { setActiveTab("stats"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "stats" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <BarChart3 size={15} className={activeTab === "stats" ? "text-blue-700" : "text-gray-400"} />
            1. Overview Analytics
          </button>

          <button
            onClick={() => { setActiveTab("seekers"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "seekers" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Users size={15} className={activeTab === "seekers" ? "text-blue-700" : "text-gray-400"} />
            2. Candidates ({seekers.length})
          </button>

          <button
            onClick={() => { setActiveTab("companies"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "companies" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Landmark size={15} className={activeTab === "companies" ? "text-blue-700" : "text-gray-400"} />
            3. Companies ({companies.length})
          </button>

          <button
            onClick={() => { setActiveTab("jobs"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "jobs" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Briefcase size={15} className={activeTab === "jobs" ? "text-blue-700" : "text-gray-400"} />
            4. Job Listings ({jobs.length})
          </button>

          <button
            onClick={() => { setActiveTab("reports"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "reports" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <BadgeAlert size={15} className={activeTab === "reports" ? "text-blue-700" : "text-gray-400"} />
            5. Flagged Disputes ({reports.filter(r => r.status === "Pending").length})
          </button>

          <button
            onClick={() => { setActiveTab("analytics"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "analytics" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <FileText size={15} className={activeTab === "analytics" ? "text-blue-700" : "text-gray-400"} />
            6. Customized Reports
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "settings" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Settings size={15} className={activeTab === "settings" ? "text-blue-700" : "text-gray-400"} />
            7. System & Permissions
          </button>

          <button
            onClick={() => { setActiveTab("broadcasts"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "broadcasts" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Bell size={15} className={activeTab === "broadcasts" ? "text-blue-700" : "text-gray-400"} />
            8. Broadcast Centre
          </button>

          <button
            onClick={() => { setActiveTab("security"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "security" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <History size={15} className={activeTab === "security" ? "text-blue-700" : "text-gray-400"} />
            9. Audit Security Logs
          </button>

          <button
            onClick={() => { setActiveTab("monetization"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "monetization" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <IndianRupee size={15} className={activeTab === "monetization" ? "text-blue-700" : "text-gray-400"} />
            10. Monetization Packages
          </button>

          <button
            onClick={() => { setActiveTab("mobile"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "mobile" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Smartphone size={15} className={activeTab === "mobile" ? "text-blue-700" : "text-gray-400"} />
            11. Mobile App Settings
          </button>

          <button
            onClick={() => { setActiveTab("cms"); setSearchQuery(""); }}
            className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2.5 transition-all text-gray-500 hover:bg-[#F8FAFC] cursor-pointer ${
              activeTab === "cms" ? "bg-blue-50 text-blue-700 font-extrabold border-l-3 border-blue-600 pl-2.5 bg-gradient-to-r from-blue-50 to-white" : ""
            }`}
          >
            <Edit3 size={15} className={activeTab === "cms" ? "text-blue-700" : "text-gray-400"} />
            12. Editorial CMS FAQs
          </button>

          </div>
        </div>

        {/* Right Side Main Active Screen Panel */}
        <div className="lg:col-span-9 space-y-6">

          {/* Tab 1: Stats & Overview Panel */}
          {activeTab === "stats" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Top Banner Alert mode */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 translate-y-8 translate-x-4">
                  <Shield size={240} />
                </div>
                <div className="relative z-10 space-y-1">
                  <span className="bg-white/25 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">CCI Superintendent Dashboard</span>
                  <h2 className="text-xl font-extrabold tracking-tight">Active Platform Superintendent Panel</h2>
                  <p className="text-xs text-blue-100 max-w-xl">
                    Deploy administrative directives, block rogue candidate indices, verify corporate partners with trust badge signals, and access the diagnostic matrix logs.
                  </p>
                </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Seekers Engaged</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">{seekers.length}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">↑ Active Accounts</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl text-[#3B82F6]">
                    <Users size={18} />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registered Brands</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">{companies.length}</span>
                    <span className="text-[10px] text-blue-600 font-semibold mt-1 block">{companies.filter(c => c.verified).length} verified logs</span>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                    <Landmark size={18} />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Open Positions</span>
                    <span className="text-2xl font-black text-[#1F293A] mt-1 block">{jobs.length}</span>
                    <span className="text-[10px] text-purple-600 font-semibold mt-1 block">{jobs.filter(j => j.active).length} approved</span>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl text-purple-500">
                    <Briefcase size={18} />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Proposals</span>
                    <span className="text-2xl font-black text-gray-900 mt-1 block">{applications.length}</span>
                    <span className="text-[10px] text-gray-400 mt-1 block">Live records</span>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                    <Send size={18} />
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-mono">
                    📈 Users growth timeline (last 6 months)
                  </h4>
                  <div className="h-[200px] relative">
                    <canvas ref={lineChartRef}></canvas>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-mono">
                    📊 Jobs per Top Corporate Client
                  </h4>
                  <div className="h-[200px] relative">
                    <canvas ref={barChartRef}></canvas>
                  </div>
                </div>
              </div>

              {/* Activity Feed and Quick Operations Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Simulated Log Activity */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1.5">
                      <History size={14} className="text-gray-400" /> Recent Live Activities
                    </h4>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded font-mono">● LIVE</span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs flex items-start gap-2.5">
                      <span className="bg-blue-50 text-[#3B82F6] p-1.5 rounded-lg text-[10px] font-bold shrink-0">APPLY</span>
                      <div>
                        <p className="text-gray-700 font-medium">Rajesh Sharma applied for <span className="font-bold text-gray-900">Senior React Developer</span> at Tech Mahindra</p>
                        <span className="text-[10px] text-gray-400 font-mono">2026-06-02 • Mumbai</span>
                      </div>
                    </div>

                    <div className="text-xs flex items-start gap-2.5">
                      <span className="bg-purple-50 text-purple-600 p-1.5 rounded-lg text-[10px] font-bold shrink-0">JOB</span>
                      <div>
                        <p className="text-gray-700 font-medium">Infosys India added dynamic position <span className="font-bold text-gray-900">Data Scientist</span></p>
                        <span className="text-[10px] text-gray-400 font-mono">2026-06-01 • Bangalore</span>
                      </div>
                    </div>

                    <div className="text-xs flex items-start gap-2.5">
                      <span className="bg-amber-50 text-amber-600 p-1.5 rounded-lg text-[10px] font-bold shrink-0">VERIFY</span>
                      <div>
                        <p className="text-gray-700 font-medium">Approved and verified identity structures for <span className="font-bold text-gray-900">Reliance Digital Retail</span></p>
                        <span className="text-[10px] text-gray-400 font-mono">2026-05-31 • Delhi</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3.5">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Quick Database CSV Export</h4>
                  <p className="text-[10px] text-gray-400">Download complete structured entities in clean comma-separated variables instantly.</p>
                  
                  <div className="space-y-2 pt-1 font-semibold text-xs">
                    <button
                      onClick={() => {
                        let csv = "ID,Name,Email,Role,Blocked\n";
                        users.forEach(u => csv += `${u.id},"${u.name}","${u.email}",${u.role},${u.blocked ? "TRUE" : "FALSE"}\n`);
                        downloadCSV("cci_all_users.csv", csv);
                        notify("Users data spreadsheet exported.", "success");
                      }}
                      className="w-full bg-slate-50 border border-gray-200 hover:bg-blue-50 py-2 px-3 rounded-xl flex items-center justify-between text-gray-700 cursor-pointer text-[11px]"
                    >
                      <span>👥 Export Seekers & Recs</span>
                      <FileSpreadsheet size={14} className="text-gray-400" />
                    </button>

                    <button
                      onClick={() => {
                        let csv = "Job_ID,Title,Company,Salary,Active\n";
                        jobs.forEach(j => csv += `${j.id},"${j.title}","${j.companyName}","${j.salaryRange}",${j.active}\n`);
                        downloadCSV("cci_all_jobs.csv", csv);
                        notify("Staff job open spreadsheet generated.", "success");
                      }}
                      className="w-full bg-slate-50 border border-gray-252 hover:bg-blue-50 py-2 px-3 rounded-xl flex items-center justify-between text-gray-700 cursor-pointer text-[11px]"
                    >
                      <span>💼 Export Open Positions</span>
                      <FileSpreadsheet size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Tab 2: Manage Seekers */}
          {activeTab === "seekers" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <div className="relative w-full sm:max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search candidate by name, skills, email..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-[#3B82F6]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  Rows: {filteredSeekers.length} matching found
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#EFF6FF] border-b text-gray-600 font-bold font-mono">
                        <th className="p-4">Candidate Identity</th>
                        <th className="p-4">Email Address</th>
                        <th className="p-4">Core Experience</th>
                        <th className="p-4">Skills Registry</th>
                        <th className="p-4">Lockout Status</th>
                        <th className="p-4 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {paginatedSeekers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-gray-400 font-mono">No seekers found matching the search matrix.</td>
                        </tr>
                      ) : (
                        paginatedSeekers.map(sk => (
                          <tr key={sk.id} className="hover:bg-slate-50/50">
                            <td className="p-4 flex items-center gap-2">
                              <span className="text-xl bg-gray-100 p-1.5 rounded-lg">{sk.profilePhotoEmoji || "👨‍💻"}</span>
                              <div>
                                <span className="font-bold text-gray-800 text-sm block">{sk.name}</span>
                                <span className="text-[9px] text-[#3B82F6] font-mono font-bold bg-[#EFF6FF] px-1 py-0.2 rounded uppercase border border-blue-100">Seeker</span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-500 font-mono">{sk.email}</td>
                            <td className="p-4 text-gray-700">{sk.experience || 0} years exp</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1 max-w-[180px]">
                                {(sk.skills || []).map(skill => (
                                  <span key={skill} className="bg-blue-50 text-blue-600 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                sk.blocked ? "bg-red-150 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              }`}>
                                {sk.blocked ? "⛔ Blocked" : "✅ Active"}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedUser(sk);
                                  setEditUserSkills(sk.skills ? sk.skills.join(", ") : "");
                                  setEditUserExp(sk.experience || 1);
                                  setEditUserEdu(sk.education || "Undergraduate Degree");
                                }}
                                className="text-[10px] font-bold bg-slate-50 hover:bg-slate-100 py-1.5 px-2.5 rounded-lg border border-gray-200 text-gray-700 cursor-pointer"
                              >
                                Edit Profile
                              </button>
                              <button
                                onClick={() => onToggleBlockUser(sk.id)}
                                className={`text-[10px] font-bold py-1.5 px-2.5 rounded-lg border cursor-pointer ${
                                  sk.blocked ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
                                }`}
                              >
                                {sk.blocked ? "Unblock" : "Block"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer */}
                <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Showing {(seekersPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(filteredSeekers.length, seekersPage * ITEMS_PER_PAGE)} of {filteredSeekers.length} seekers
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={seekersPage === 1}
                      onClick={() => setSeekersPage(p => Math.max(1, p - 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[10px] font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      disabled={seekersPage === totalSeekersPages}
                      onClick={() => setSeekersPage(p => Math.min(totalSeekersPages, p + 1))}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-[10px] font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Company Settings */}
          {activeTab === "companies" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <div className="relative w-full sm:max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search brand name, industry, headquarters..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-[#3B82F6]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#EFF6FF] border-b text-gray-600 font-bold font-mono">
                        <th className="p-4">Brand / Identity</th>
                        <th className="p-4">Industry Category</th>
                        <th className="p-4">HQ Location</th>
                        <th className="p-4">Verification Score</th>
                        <th className="p-4 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {paginatedCompanies.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400">No enterprise accounts match search criteria.</td>
                        </tr>
                      ) : (
                        paginatedCompanies.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/50">
                            <td className="p-4 flex items-center gap-2">
                              <div className="w-10 h-10 shrink-0 bg-white p-1 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
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
                                        fallback.className = "text-xl fallback-emoji";
                                        fallback.innerText = c.logoEmoji || "🏢";
                                        parent.appendChild(fallback);
                                      }
                                    }}
                                  />
                                ) : (
                                  <span className="text-xl">{c.logoEmoji || "🏢"}</span>
                                )}
                              </div>
                              <div>
                                <span className="font-extrabold text-gray-800 text-sm block">{c.name}</span>
                                <span className="text-[10px] text-gray-400 font-mono block">Size: {c.companySize}</span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-600">{c.industry}</td>
                            <td className="p-4 text-gray-500 font-semibold">{c.location}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase inline-flex items-center gap-0.5 border ${
                                c.verified ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-250"
                              }`}>
                                {c.verified ? "⭐ Verified Partner" : "⚙️ Verification Pending"}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => {
                                  setSelectedCompany(c);
                                  setCompanyRating(Math.floor(Math.random() * 2) + 4);
                                }}
                                className="text-[10px] font-bold bg-slate-50 hover:bg-slate-100 py-1.5 px-2 rounded-lg border border-gray-200 text-gray-700 cursor-pointer"
                              >
                                View Details & Jobs
                              </button>
                              <button
                                onClick={() => onToggleVerifyCompany(c.id)}
                                className={`text-[10px] font-bold py-1.5 px-2 rounded-lg border cursor-pointer ${
                                  c.verified ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                }`}
                              >
                                {c.verified ? "Revoke" : "Approve Badge"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Showing {(companiesPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(filteredCompanies.length, companiesPage * ITEMS_PER_PAGE)} of {filteredCompanies.length} companies
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Manage Jobs */}
          {activeTab === "jobs" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
                <div className="relative w-full sm:max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search job title, publishing brand, contract type..."
                    className="w-full pl-9 pr-4 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-[#3B82F6]"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#EFF6FF] border-b text-gray-600 font-bold font-mono">
                        <th className="p-4">Staff Opening Title</th>
                        <th className="p-4">Corporate Brand</th>
                        <th className="p-4">Package Salary / Region</th>
                        <th className="p-4">Approved Index</th>
                        <th className="p-4 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {paginatedJobs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-400">No active job indices found.</td>
                        </tr>
                      ) : (
                        paginatedJobs.map(j => (
                          <tr key={j.id} className="hover:bg-slate-50/50">
                            <td className="p-4">
                              <span className="font-bold text-gray-800 text-sm block">{j.title}</span>
                              <span className="text-[10px] text-gray-400 font-mono">Date posted: {j.datePosted}</span>
                            </td>
                            <td className="p-4 text-gray-600">{j.companyName}</td>
                            <td className="p-4 font-normal text-gray-500">
                              <span className="text-emerald-700 font-bold block">{j.salaryRange}</span>
                              <span>{j.location} • {j.jobType}</span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                j.active ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-gray-100 text-gray-500"
                              }`}>
                                {j.active ? "✅ Verified Open" : "⏸️ Paused"}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-1 whitespace-nowrap">
                              <button
                                onClick={() => onToggleJobStatus(j.id)}
                                className={`text-[10px] font-bold py-1.5 px-2 rounded-lg border cursor-pointer ${
                                  j.active ? "bg-slate-50 text-gray-600 border-gray-200" : "bg-blue-50 text-blue-600 border-blue-100"
                                }`}
                              >
                                {j.active ? "Pause" : "Approve / Open"}
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Do you wish to delete this staff listing of ${j.title}?`)) {
                                    onDeleteJob(j.id);
                                  }
                                }}
                                className="text-[10px] font-bold bg-red-50 hover:bg-red-100 py-1.5 px-2 rounded-lg border border-red-200 text-red-600 cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Showing {(jobsPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(filteredJobs.length, jobsPage * ITEMS_PER_PAGE)} of {filteredJobs.length} listings
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Flagged Disputes Content */}
          {activeTab === "reports" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#1F293A] text-base">Section 5: Flagged Disputes Content Queue</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-sans">Moderation workspace tracking seeker reported postings.</p>
                </div>
                <span className="bg-amber-100 text-amber-800 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">MODERATION</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-amber-50/50 border-b text-gray-600 font-bold font-mono">
                      <th className="p-4">Report Topic</th>
                      <th className="p-4">Reporter Address</th>
                      <th className="p-4">Reason / Grievance File</th>
                      <th className="p-4">Submitted Date</th>
                      <th className="p-4">Resolution Status</th>
                      <th className="p-4 text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-xs">
                    {reports.map((rep) => (
                      <tr key={rep.id} className="hover:bg-[#FDFBF7]/30">
                        <td className="p-4 font-bold text-gray-800">
                          <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[8px] uppercase inline-block mr-1">{rep.type}</span>
                          {rep.reportedTarget}
                        </td>
                        <td className="p-4 font-mono text-gray-500">{rep.reportedBy}</td>
                        <td className="p-4 text-gray-600 max-w-xs truncate">{rep.reason}</td>
                        <td className="p-4 font-mono text-gray-400">{rep.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                            rep.status === "Pending" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {rep.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {rep.status === "Pending" ? (
                            <button
                              onClick={() => handleResolveReport(rep.id)}
                              className="text-[10px] font-bold bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white transition-all py-1 px-2.5 rounded-lg border border-blue-200 cursor-pointer"
                            >
                              Resolve Issue
                            </button>
                          ) : (
                            <span className="text-gray-400 font-mono text-[10px]">Resolved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 6: Customized Reports & Analytics */}
          {activeTab === "analytics" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-[#1F293A] text-base">Section 6: Advanced Analytics & Reports Constructor</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Choose custom date range ranges to isolate historical registry updates.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Audit Start Date</label>
                  <input
                    type="date"
                    value={analyticsStartDate}
                    onChange={(e) => setAnalyticsStartDate(e.target.value)}
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">End Threshold Date</label>
                  <input
                    type="date"
                    value={analyticsEndDate}
                    onChange={(e) => setAnalyticsEndDate(e.target.value)}
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-blue-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-3">
                <span className="text-[11px] font-bold text-blue-800 tracking-wider block uppercase font-mono">Available Diagnostics:</span>
                <p className="text-xs text-gray-600">
                  Isolates data points created between <span className="font-bold underline">{analyticsStartDate}</span> and <span className="font-bold underline">{analyticsEndDate}</span>. Includes user block rates, company verified statistics, average skills per profile, and reported dispute ticket logs.
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1.5">
                  <button
                    onClick={triggerCustomAnalyticsExport}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <FileSpreadsheet size={14} /> Download Range CSV Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: System Settings & Permissions Matrix */}
          {activeTab === "settings" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#1F293A] text-base">Section 7: System Settings & Governance Controls</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-sans">Global toggle parameters affecting registrations, maintenance, and administrative rights.</p>
                </div>
                <span className="bg-blue-50 text-[#3B82F6] font-bold text-[10px] px-3 py-1 rounded-full uppercase border border-blue-100">SETTINGS</span>
              </div>

              {/* Toggle controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                
                <label className="flex items-start gap-3 p-3.5 border border-gray-100 hover:bg-slate-50/30 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sysMaintenanceMode}
                    onChange={(e) => setSysMaintenanceMode(e.target.checked)}
                    className="mt-1 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Deploy Platform Maintenance Mode</span>
                    <span className="text-[10px] text-gray-400">Lock general seeker views for planned server updates.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-gray-100 hover:bg-slate-50/30 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sysGatedRegistrations}
                    onChange={(e) => setSysGatedRegistrations(e.target.checked)}
                    className="mt-1 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Strict Gate Recruiter Registrations</span>
                    <span className="text-[10px] text-gray-400">Force manual administrative vetting before recruiters post.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-gray-100 hover:bg-slate-50/30 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sysRequireJobApproval}
                    onChange={(e) => setSysRequireJobApproval(e.target.checked)}
                    className="mt-1 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Hold Job Posts in Moderation Queue</span>
                    <span className="text-[10px] text-gray-400">Jobs hold in review until approved manually by superintendent.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3.5 border border-gray-100 hover:bg-slate-50/30 rounded-xl cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sysAllowSocialLogin}
                    onChange={(e) => setSysAllowSocialLogin(e.target.checked)}
                    className="mt-1 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">Simulate Social Google Login Gating</span>
                    <span className="text-[10px] text-gray-400">Display simulated OAuth icons in seekers login cards.</span>
                  </div>
                </label>
              </div>

              {/* Email templates editor */}
              <div className="space-y-2 pt-2 border-t border-gray-105">
                <label className="block text-xs font-bold text-gray-700">Editable Automatic Welcome Mail Template</label>
                <textarea
                  value={sysEmailTemplateWelcome}
                  onChange={(e) => setSysEmailTemplateWelcome(e.target.value)}
                  rows={4}
                  className="w-full text-xs font-mono p-3 border border-gray-200 rounded-xl focus:outline-blue-600 bg-slate-50"
                ></textarea>
              </div>

              {/* Save changes button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveSystemSettings}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl cursor-pointer shadow-sm"
                >
                  Save Enterprise Suite Configuration
                </button>
              </div>

              {/* Permission Matrix Area */}
              <div className="pt-4 border-t border-gray-105 space-y-3.5">
                <div>
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider font-mono">🔑 Active Superintendent Permission Matrix</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Enforces operations based on authorization levels (Your Current Actor Role: <span className="font-extrabold text-[#3B82F6] uppercase">{opRole}</span>)</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] border border-gray-200 rounded-xl overflow-hidden font-mono">
                    <thead>
                      <tr className="bg-slate-50 border-b text-gray-500 font-extrabold uppercase">
                        <th className="p-3">Operations Allowed</th>
                        <th className="p-3">Super Admin</th>
                        <th className="p-3">Platform Admin</th>
                        <th className="p-3">Viewer Analyst</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-semibold text-gray-600">
                      <tr>
                        <td className="p-3 font-semibold text-gray-800">Edit System Parameters / CMS Content</td>
                        <td className="p-3 text-emerald-600 font-bold">✅ YES</td>
                        <td className="p-3 text-emerald-600 font-bold">✅ YES</td>
                        <td className="p-3 text-red-500">❌ NO (Read-only)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-gray-800">Verify & Approve New Corporate Catalogs</td>
                        <td className="p-3 text-emerald-600 font-bold">✅ YES</td>
                        <td className="p-3 text-emerald-600 font-bold">✅ YES</td>
                        <td className="p-3 text-red-500">❌ NO (Read-only)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-gray-800">Prune Indices / Expel Candidate Log</td>
                        <td className="p-3 text-emerald-600 font-bold">✅ YES</td>
                        <td className="p-3 text-red-500">❌ NO (Restricted)</td>
                        <td className="p-3 text-red-500">❌ NO (Read-only)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Security Status & Simulation Coordinates Panel */}
              <div className="pt-4 border-t border-gray-150 space-y-3">
                <div className="bg-slate-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-md font-mono">CC_SYS_NODE_OK</span>
                    <span className="text-[10px] text-gray-400 font-mono">v2.6.1-enterprise</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="bg-white p-2.5 rounded-lg border border-gray-150">
                      <span className="text-[10px] text-gray-400 block uppercase">Users Key</span>
                      <span className="text-xs font-mono font-bold text-gray-700">cci_users</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-150">
                      <span className="text-[10px] text-gray-400 block uppercase">Jobs Key</span>
                      <span className="text-xs font-mono font-bold text-gray-700">cci_jobs</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-150">
                      <span className="text-[10px] text-gray-400 block uppercase">Comps Key</span>
                      <span className="text-xs font-mono font-bold text-gray-700">cci_companies</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-gray-150">
                      <span className="text-[10px] text-gray-400 block uppercase">Registry</span>
                      <span className="text-xs font-mono font-bold text-emerald-600">Local Storage</span>
                    </div>
                  </div>

                  {/* Collapsible Secure Guidelines & Credentials */}
                  <details className="group border border-gray-200 rounded-lg bg-white overflow-hidden text-xs">
                    <summary className="p-2.5 font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-between cursor-pointer select-none">
                      <span>🔒 View Simulation Access Tokens & Credentials</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full group-open:hidden">Expand</span>
                      <span className="text-[10px] bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full hidden group-open:inline">Hide</span>
                    </summary>
                    <div className="p-3 border-t border-gray-100 bg-[#FBFDFE] space-y-2.5">
                      <p className="text-[10px] text-gray-400">These mock accounts are seeded in local storage for testing purposes. Simply type them manually on the respective login forms:</p>
                      
                      <div className="grid grid-cols-1 gap-2 border border-gray-150 rounded-lg p-2.5 font-mono text-[10px] text-gray-600 bg-white">
                        <div className="border-b border-gray-50 pb-1 flex justify-between">
                          <span className="font-sans font-bold text-[#3B82F6]">🛡️ Super Admin</span>
                          <span>superadmin@careerconnectindia.com / Super@123</span>
                        </div>
                        <div className="border-b border-gray-50 pb-1 flex justify-between">
                          <span className="font-sans font-bold text-[#3B82F6]">🛡️ Admin</span>
                          <span>admin@careerconnectindia.com / Admin@123</span>
                        </div>
                        <div className="border-b border-gray-50 pb-1 flex justify-between">
                          <span className="font-sans font-bold text-emerald-600">👤 Job Seeker</span>
                          <span>rajesh@gmail.com / password123</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-sans font-bold text-purple-600">💼 Recruiter</span>
                          <span>recruiter1@techmahindra.com / password123</span>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              </div>

            </div>
          )}

          {/* Tab 8: Broadcast Alerts */}
          {activeTab === "broadcasts" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-[#1F293A] text-base">Section 8: Global Broadcast Dispatch Center</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Draft system notification warnings or product newsletters aimed at seekers or recruiters.</p>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4 font-medium text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Audience Target</label>
                  <select
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value as any)}
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-blue-600"
                  >
                    <option value="all">Every Registered Seeker & Recruiter</option>
                    <option value="seeker">Verified Job Seekers Only</option>
                    <option value="company">Corporate Recruiting Partners Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Broadcast Subject Title</label>
                  <input
                    type="text"
                    placeholder="Enter broadcast campaign campaign headers..."
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-blue-600 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Compose Message Content</label>
                  <textarea
                    placeholder="Enter message text. Supports markdown formatting and token tags."
                    rows={5}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-blue-600 bg-slate-50"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send size={13} /> Deploy System-Wide Broadcast
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 9: Security Audit trail */}
          {activeTab === "security" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#1F293A] text-base">Section 9: Security Login & Operation Audit Logs</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-sans">Official timeline logging administrative entries, index modifications, and status revokes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("cci_audit_logs");
                    setAuditLogs([]);
                    notify("Security logs cleared successfully.", "info");
                  }}
                  className="text-[10px] font-semibold text-red-600 hover:underline bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-100"
                >
                  Clear Logs
                </button>
              </div>

              <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                {auditLogs.length === 0 ? (
                  <p className="text-gray-400 text-xs text-center p-8 font-mono">No administrative actions logged in current runtime context.</p>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="p-3.5 bg-slate-50 border border-gray-100 rounded-xl text-xs space-y-1.5 font-sans">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-gray-800 block text-[13px]">{log.action}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono">
                        Actor: <span className="text-blue-700 font-bold">{log.adminEmail}</span> • Role: <span className="text-purple-600 font-bold">{log.adminRole}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 border-l-2 border-slate-300 pl-2 bg-slate-100/50 py-1 rounded-r">
                        Details: <span className="font-medium text-gray-700">{log.details}</span>
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 10: Monetization Packages */}
          {activeTab === "monetization" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-[#1F293A] text-base">Section 10: Monetization Subscriptions & Packages Management</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Review invoice mock listings, setup price parameters, and manage recruiter plans.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="border border-gray-100 rounded-2xl p-4 text-center bg-slate-50/50 space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">CCI Free Startup</span>
                  <span className="text-lg font-extrabold text-gray-800 block">₹0 / month</span>
                  <p className="text-[10px] text-gray-500">Supports basic 5 published job indexing fields completely free of cost.</p>
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold py-0.5 px-2 rounded-full uppercase">Basic Default</span>
                </div>

                <div className="border border-blue-100 rounded-2xl p-4 text-center bg-blue-50/20 space-y-2 relative">
                  <div className="absolute top-0 right-0 p-1 bg-blue-600 text-[8px] font-extrabold text-white rounded-bl rounded-tr-xl uppercase">Popular</div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">CCI Professional</span>
                  <span className="text-lg font-extrabold text-gray-800 block">₹2,999 / month</span>
                  <p className="text-[10px] text-gray-500">Includes 20 active posts + verified trust scores priority support channels.</p>
                  <span className="text-[9px] text-[#3B82F6] font-bold py-0.5 px-2">Highly Recommended</span>
                </div>

                <div className="border border-purple-100 rounded-2xl p-4 text-center bg-purple-50/10 space-y-2">
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">CCI Enterprise Suite</span>
                  <span className="text-lg font-extrabold text-gray-800 block">₹9,999 / month</span>
                  <p className="text-[10px] text-gray-500">Unlimited publications, automated API sync, and homepage banner promotions.</p>
                  <span className="text-[9px] text-purple-700 font-semibold">Premium Partner</span>
                </div>

              </div>

              {/* Mock Invoice list widget */}
              <div className="pt-4 border-t border-gray-105 space-y-3">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1.5 font-mono">
                  <IndianRupee size={13} className="text-gray-400" /> Recent Mock Invoices Logs
                </h4>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border border-gray-105 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-800 block">INV-2026-0010</span>
                      <span className="text-[10px] text-gray-400">Tech Mahindra Solutions • Plan: Enterprise Suite</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-gray-800 block">₹9,999.00</span>
                      <span className="text-[9px] text-emerald-600 font-bold uppercase">PAID VIA RAZORPAY</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-gray-105 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-gray-800 block">INV-2026-0008</span>
                      <span className="text-[10px] text-gray-400">Infosys India • Plan: Professional Bundle</span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-gray-800 block">₹2,999.00</span>
                      <span className="text-[9px] text-emerald-600 font-bold uppercase">PAID VIA UPI SUCCESS</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 11: Mobile app settings */}
          {activeTab === "mobile" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-[#1F293A] text-base">Section 11: Unified CCI Mobile Application Configurations</h3>
                <p className="text-xs text-gray-400 mt-0.5 font-sans">Set API tokens, Android APK version limits, and simulated FCM push alert settings.</p>
              </div>

              <div className="p-5 border border-indigo-50 bg-indigo-50/20 rounded-2xl font-sans text-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-indigo-600 shrink-0" size={32} />
                  <div>
                    <span className="font-extrabold text-gray-800 text-sm block">V1.5.0 Android System APK Production</span>
                    <span className="text-gray-400 block text-[10px]">Connected via secure superintendent proxy endpoints.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Push Alert GCM Engine Token</label>
                    <input type="text" readOnly value="gcm:key-9871cca-connected-india" className="w-full font-mono text-[10px] p-2 bg-slate-50 rounded border border-gray-200 text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Current App Store Version Code</label>
                    <input type="text" readOnly value="CCI_APK_105_PROD" className="w-full font-mono text-[10px] p-2 bg-slate-50 rounded border border-gray-200 text-gray-500" />
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-[10px] text-indigo-805">
                  ⚠️ Note: Mobile configuration is integrated into the native WebView bindings. Modifying core parameters requires recompilation.
                </div>
              </div>
            </div>
          )}

          {/* Tab 12 CMS FAQ */}
          {activeTab === "cms" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-[#1F293A] text-base">Section 12: Content Management (CMS) & Live FAQs Editorial</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-sans">Directly manipulate the homepage strings, custom FAQ lists, and seeker announcement posts.</p>
                </div>
                <span className="bg-purple-100 text-purple-800 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">CMS CONTROL</span>
              </div>

              {/* Headline parameters */}
              <div className="space-y-3 p-4 bg-slate-50 border border-gray-100 rounded-xl font-medium text-xs">
                <span className="text-[10px] font-bold text-[#1F293A] uppercase tracking-wider block">Homepage Hero Layout Strings</span>
                
                <div className="space-y-2">
                  <label className="block text-[10px] text-gray-400 uppercase">Interactive Banner Title:</label>
                  <input
                    type="text"
                    value={cmsHeroTitle}
                    onChange={(e) => setCmsHeroTitle(e.target.value)}
                    className="w-full p-2.5 text-xs text-gray-800 border border-gray-200 rounded-lg focus:outline-blue-600 bg-white"
                  />

                  <label className="block text-[10px] text-gray-400 uppercase">Supporting Brand Subtitle:</label>
                  <input
                    type="text"
                    value={cmsHeroSubtext}
                    onChange={(e) => setCmsHeroSubtext(e.target.value)}
                    className="w-full p-2.5 text-xs text-gray-800 border border-gray-200 rounded-lg focus:outline-blue-600 bg-white"
                  />

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleSaveCmsBanner}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                    >
                      Publish Banner Headline
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQs CMS editor */}
              <div className="space-y-4 pt-2 border-t border-gray-105">
                <div className="text-xs">
                  <span className="font-bold text-gray-800 block">Manage Live Help FAQ Questions</span>
                  <span className="text-[10px] text-gray-400 block mb-3">Add or remove items immediately synced onto job seeker portal views.</span>
                </div>

                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {faqs.map((f) => (
                    <div key={f.id} className="p-3 bg-purple-50/20 border border-purple-100 rounded-xl text-xs flex items-start justify-between gap-3 font-sans">
                      <div>
                        <span className="font-bold text-gray-800 block">Q: {f.question}</span>
                        <p className="text-gray-500 text-[11px] mt-0.5">A: {f.answer}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteFaq(f.id)}
                        className="text-[10px] font-bold text-red-600 hover:underline shrink-0 p-1 bg-red-50 hover:bg-red-100 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 border border-gray-200 rounded-2xl bg-white space-y-3 font-medium text-xs">
                  <span className="text-[10px] text-gray-400 uppercase font-mono font-semibold block">Create New Help FAQ Entry</span>
                  <input
                    type="text"
                    placeholder="E.g., How long is the contract duration?"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xl"
                  />
                  <textarea
                    placeholder="Enter the corresponding resolution helper answer context..."
                    value={newFaqA}
                    onChange={(e) => setNewFaqA(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xl"
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded-lg flex items-center gap-1 cursor-pointer text-[10px]"
                  >
                    <PlusCircle size={12} /> Append FAQ Item
                  </button>
                </div>
              </div>

              {/* Blogs CMS editor */}
              <div className="space-y-4 pt-4 border-t border-gray-105">
                <div className="text-xs">
                  <span className="font-bold text-gray-800 block">CCI System Blog announcements feed</span>
                  <span className="text-[10px] text-gray-400 block mb-3">Post industry hiring news or placement updates.</span>
                </div>

                <div className="space-y-2">
                  {blogs.map((b) => (
                    <div key={b.id} className="p-3 bg-slate-50 border border-gray-105 rounded-xl text-xs flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-gray-852 block">{b.title}</span>
                        <p className="text-gray-500 text-[11px] mt-0.5">{b.summary}</p>
                        <span className="text-[9px] text-gray-400 font-mono italic mt-1 block">By {b.author} on {b.date}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="text-[10px] text-red-650 font-bold bg-white hover:bg-red-55 border p-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 border border-gray-200 rounded-2xl bg-white space-y-2.5 text-xs">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block font-mono">Create live system announcement article</span>
                  <input
                    type="text"
                    placeholder="Enter article title headers..."
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                  <textarea
                    placeholder="Compose summary details..."
                    value={newBlogSummary}
                    onChange={(e) => setNewBlogSummary(e.target.value)}
                    rows={2}
                    className="w-full p-2 border border-gray-200 rounded"
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleAddBlog}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded text-[10px] cursor-pointer"
                  >
                    Publish Article Feed
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* MODAL 1: Seekers Profile overrides */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] px-4 font-sans text-xs">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200 border-2 border-blue-50">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
              <span className="text-3xl">{selectedUser.profilePhotoEmoji || "👨‍💻"}</span>
              <div>
                <h4 className="text-sm font-bold text-gray-900">{selectedUser.name}</h4>
                <p className="text-[11px] text-gray-400 font-mono">{selectedUser.email}</p>
              </div>
            </div>

            <div className="space-y-3 py-1 font-medium text-xs">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Override Education Details</label>
                <input
                  type="text"
                  value={editUserEdu}
                  onChange={(e) => setEditUserEdu(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Experience Years</label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={editUserExp}
                    onChange={(e) => setEditUserExp(parseInt(e.target.value) || 0)}
                    className="w-full text-xs p-2.5 border border-gray-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Status Registry</label>
                  <input
                    type="text"
                    disabled
                    value={selectedUser.blocked ? "Locked / Suspended" : "Active / Cleared"}
                    className="w-full text-[11px] p-2.5 border border-gray-150 bg-gray-50 text-gray-500 rounded-xl font-bold uppercase font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Comma-separated Skills registry tags</label>
                <input
                  type="text"
                  value={editUserSkills}
                  onChange={(e) => setEditUserSkills(e.target.value)}
                  placeholder="React, CSS, Django, Python..."
                  className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-[#F8FAFC]/50"
                />
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-2.5 text-[10px] text-amber-800">
              ⚡ Overriding candidate properties reflects instantly in the main Seekers dashboard portal. Choose carefully.
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="bg-gray-150 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl cursor-pointer"
              >
                Close Without Saving
              </button>
              <button
                type="button"
                onClick={handleSaveUserDetails}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2.5 px-5 rounded-xl cursor-pointer"
              >
                Apply Portfolio Overrides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Companies Identity Detail View */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] px-4 font-sans text-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl relative border-2 border-blue-50">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:bg-gray-100"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2 border-b border-gray-100 pb-4 flex flex-col items-center">
              <div className="w-20 h-20 bg-white p-2 rounded-3xl inline-flex items-center justify-center border border-gray-300 overflow-hidden shrink-0">
                {selectedCompany.logoUrl ? (
                  <img
                    src={selectedCompany.logoUrl}
                    alt={`${selectedCompany.name} logo`}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector(".fallback-emoji")) {
                        const fallback = document.createElement("span");
                        fallback.className = "text-5xl fallback-emoji";
                        fallback.innerText = selectedCompany.logoEmoji || "🏢";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <span className="text-5xl">{selectedCompany.logoEmoji || "🏢"}</span>
                )}
              </div>
              <h4 className="text-base font-black text-gray-900 tracking-tight mt-2">{selectedCompany.name}</h4>
              <span className="text-[10px] text-blue-600 font-mono font-bold bg-[#EFF6FF] border border-blue-100 rounded-full px-3 py-0.5 inline-block uppercase">
                Industry: {selectedCompany.industry}
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-gray-750 font-normal">
              <p><span className="font-bold text-[#1F293A]">Headquarters:</span> {selectedCompany.location}</p>
              <p><span className="font-bold text-[#1F293A]">Corporate Website:</span> <a href={selectedCompany.website} className="text-blue-500 font-mono underline" target="_blank" rel="noreferrer">{selectedCompany.website}</a></p>
              <p><span className="font-bold text-[#1F293A]">Staff Dimension:</span> {selectedCompany.companySize} employees</p>
              <p className="border-t border-gray-100 pt-2 text-[11px] text-gray-500 italic">" {selectedCompany.description} "</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="bg-[#3B82F6] text-white font-bold py-2 px-5 rounded-xl transition-all hover:bg-blue-700 cursor-pointer text-xs"
              >
                Done / Back
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
