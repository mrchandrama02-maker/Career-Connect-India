/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Company, Job, Application } from "../types";

export const INITIAL_SEEKERS: User[] = [
  {
    id: "seeker_1",
    email: "rajesh@gmail.com",
    password: "password123",
    role: "seeker",
    name: "Rajesh Sharma",
    mobile: "9876543210",
    skills: ["React", "Python"],
    experience: 3,
    education: "B.Tech in Computer Science",
    profilePhotoEmoji: "👨‍💻",
    resumeName: "Rajesh_Sharma_CV.pdf",
    resumeBase64: "JVBERi0xLjQKJVRlbXBsYXRlIFJlc3VtZSBGaWxl...",
    blocked: false
  },
  {
    id: "seeker_2",
    email: "priya@gmail.com",
    password: "password123",
    role: "seeker",
    name: "Priya Patel",
    mobile: "9876543211",
    skills: ["SQL", "Excel", "Tableau"],
    experience: 2,
    education: "B.Sc in Statistics",
    profilePhotoEmoji: "👩‍💼",
    resumeName: "Priya_Patel_Data_Analyst.pdf",
    resumeBase64: "JVBERi0xLjQKJVRlbXBsYXRlIFJlc3VtZSBGaWxl...",
    blocked: false
  },
  {
    id: "seeker_3",
    email: "amit@gmail.com",
    password: "password123",
    role: "seeker",
    name: "Amit Kumar",
    mobile: "9876543212",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    experience: 4,
    education: "MCA",
    profilePhotoEmoji: "👨‍💻",
    resumeName: "Amit_Kumar_Frontend.pdf",
    resumeBase64: "JVBERi0xLjQKJVRlbXBsYXRlIFJlc3VtZSBGaWxl...",
    blocked: false
  },
  {
    id: "seeker_4",
    email: "neha@gmail.com",
    password: "password123",
    role: "seeker",
    name: "Neha Singh",
    mobile: "9876543213",
    skills: ["Recruitment", "Onboarding"],
    experience: 5,
    education: "MBA in HR",
    profilePhotoEmoji: "👩‍💼",
    resumeName: "Neha_Singh_HR.pdf",
    resumeBase64: "JVBERi0xLjQKJVRlbXBsYXRlIFJlc3VtZSBGaWxl...",
    blocked: false
  },
  {
    id: "seeker_5",
    email: "vikram@gmail.com",
    password: "password123",
    role: "seeker",
    name: "Vikram Mehta",
    mobile: "9876543214",
    skills: ["SEO", "Google Ads"],
    experience: 3,
    education: "BBA in Marketing",
    profilePhotoEmoji: "👨‍💼",
    resumeName: "Vikram_Mehta_CV.pdf",
    resumeBase64: "JVBERi0xLjQKJVRlbXBsYXRlIFJlc3VtZSBGaWxl...",
    blocked: false
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "comp_1",
    name: "Tech Mahindra Solutions",
    description: "Leading IT services and business consulting Solutions provider globally.",
    website: "https://www.techmahindra.com",
    logoEmoji: "🏢",
    industry: "IT Services",
    location: "Mumbai",
    companySize: "10,000+ employees",
    verified: true
  },
  {
    id: "comp_2",
    name: "Infosys India",
    description: "A global leader in next-generation digital services and consulting.",
    website: "https://www.infosys.com",
    logoEmoji: "🚀",
    industry: "Technology",
    location: "Bangalore",
    companySize: "10,000+ employees",
    verified: true
  },
  {
    id: "comp_3",
    name: "Reliance Digital",
    description: "India's largest electronics retailer connecting customers with cutting-edge tech.",
    website: "https://www.reliancedigital.in",
    logoEmoji: "🛒",
    industry: "E-commerce",
    location: "Delhi",
    companySize: "5000-10,000 employees",
    verified: true
  }
];

export const INITIAL_COMPANY_USERS: User[] = [
  {
    id: "user_comp_1",
    email: "recruiter1@techmahindra.com",
    password: "password123",
    role: "company",
    name: "Anil Goel",
    companyId: "comp_1",
    profilePhotoEmoji: "👔",
    blocked: false
  },
  {
    id: "user_comp_2",
    email: "recruiter2@infosys.com",
    password: "password123",
    role: "company",
    name: "Sudha Murthy",
    companyId: "comp_2",
    profilePhotoEmoji: "👩‍💼",
    blocked: false
  },
  {
    id: "user_comp_3",
    email: "recruiter3@reliance.com",
    password: "password123",
    role: "company",
    name: "Mukesh recruiter",
    companyId: "comp_3",
    profilePhotoEmoji: "👨‍💼",
    blocked: false
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: "job_1",
    title: "Senior React Developer",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Mumbai",
    salaryRange: "8-12 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "We are seeking an experienced Frontend Developer with absolute proficiency in React, TypeScript, and modern state architectures. You will lead the client-facing modules of our corporate portal.",
    requirements: [
      "3+ years of experience with React, Redux, and associated frontend technologies",
      "Hands-on expertise with Tailwind CSS and responsive design rules",
      "Familiarity with standard Git workflows and full-stack integrations"
    ],
    datePosted: "2026-05-15",
    active: true
  },
  {
    id: "job_2",
    title: "Data Scientist",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Bangalore",
    salaryRange: "10-15 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "We are hiring a dedicated Data Scientist who possesses a rich knowledge of statistics, machine learning algorithms, and predictive modeling vectors. You will turn enterprise database logs into strategic pathways.",
    requirements: [
      "4+ years of data modeling with Python, SQL, and data pipeline tools",
      "Robust mastery of classification, forecasting, and regression suites",
      "Proficient visualizer using Tableau, PowerBI, or D3.js"
    ],
    datePosted: "2026-05-18",
    active: true
  },
  {
    id: "job_3",
    title: "Frontend Developer",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Delhi",
    salaryRange: "6-9 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "We are looking for a creative Frontend Engineer to shape user journeys on India's premier consumer electronics storefront, building seamless cart, review, and discovery panels.",
    requirements: [
      "2+ years of professional web design with HTML, CSS, JavaScript, and React",
      "Detail-oriented eye for responsive performance optimization",
      "E-commerce deployment experience is a highly valued plus"
    ],
    datePosted: "2026-05-20",
    active: true
  },
  {
    id: "job_4",
    title: "UI/UX Designer",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Remote",
    salaryRange: "5-8 LPA",
    jobType: "Contract",
    experienceLevel: 1,
    description: "We require an aesthetic UX visionary to formulate user flows, wireframes, and high-fidelity mockups for global scale client clienteles. This is a secure remote contract project.",
    requirements: [
      "1+ years of design experience with Figma, Sketch, or Adobe Suite",
      "Strong portfolio illustrating typography, journey logic, and spacing craft",
      "Quick understanding of responsive layout grids and material web themes"
    ],
    datePosted: "2026-05-22",
    active: true
  },
  {
    id: "job_5",
    title: "Python Developer",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Bangalore",
    salaryRange: "7-10 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Join us as a Python software engineer centered around complex microservice APIs, database scaling and secure cloud server routing. You'll work closely with web frontend and cloud teams.",
    requirements: [
      "3+ years writing robust Python with Django, Flask, or FastAPI",
      "Great structural database control with PostgreSQL or MongoDB",
      "Unit testing workflows and containerization using Docker"
    ],
    datePosted: "2026-05-24",
    active: true
  },
  {
    id: "job_6",
    title: "Digital Marketing Manager",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Delhi",
    salaryRange: "8-11 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "We seek an expert digital campaign lead to curate full-funnel search engine optimization, content strategies, and smart budget distributions across channels like Google Ads and Meta campaigns.",
    requirements: [
      "4+ years deploying performance-driven SEO frameworks and digital ads",
      "Strong ROI analytics mindset with complete GA4 and search console mastery",
      "Exceptional copywriting skills and agile team coordination"
    ],
    datePosted: "2026-05-26",
    active: true
  },
  {
    id: "job_7",
    title: "HR Recruiter",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Mumbai",
    salaryRange: "4-6 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Manage end-to-end recruitment lifecycle: identifying elite candidates, taking phone screening, organizing interviews, and processing offers.",
    requirements: [
      "2+ years of standard IT/Non-IT talent acquisition in India",
      "Effective professional styling in correspondence and call communications",
      "Familiarity with ATS software and job boards like Naukri or LinkedIn"
    ],
    datePosted: "2026-05-28",
    active: true
  },
  {
    id: "job_8",
    title: "Cloud Engineer",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Bangalore",
    salaryRange: "12-18 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "We need an advanced Cloud Architect/Infrastructure specialist to manage auto-scaling pipelines, multi-zone security, and CI/CD operations.",
    requirements: [
      "5+ years building GCP or AWS microservice orchestration infrastructures",
      "Expert knowledge of Terraform (IaC) and Kubernetes clusters",
      "Proven track record securing critical API endpoints and disaster recoveries"
    ],
    datePosted: "2026-05-29",
    active: true
  }
];

export const ADMIN_ACCOUNT: User = {
  id: "admin_user",
  email: "admin@careerconnectindia.com",
  password: "admin123",
  role: "admin",
  name: "CCI Admin Controller",
  profilePhotoEmoji: "👑",
  blocked: false
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app_1",
    jobId: "job_1",
    jobTitle: "Senior React Developer",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    seekerId: "seeker_1",
    seekerName: "Rajesh Sharma",
    seekerEmail: "rajesh@gmail.com",
    seekerExperience: 3,
    seekerSkills: ["React", "Python"],
    resumeName: "Rajesh_Sharma_CV.pdf",
    status: "Shortlisted",
    dateApplied: "2026-05-16"
  },
  {
    id: "app_2",
    jobId: "job_3",
    jobTitle: "Frontend Developer",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    seekerId: "seeker_3",
    seekerName: "Amit Kumar",
    seekerEmail: "amit@gmail.com",
    seekerExperience: 4,
    seekerSkills: ["HTML", "CSS", "JavaScript", "React"],
    resumeName: "Amit_Kumar_Frontend.pdf",
    status: "Applied",
    dateApplied: "2026-05-21"
  },
  {
    id: "app_3",
    jobId: "job_7",
    jobTitle: "HR Recruiter",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    seekerId: "seeker_4",
    seekerName: "Neha Singh",
    seekerEmail: "neha@gmail.com",
    seekerExperience: 5,
    seekerSkills: ["Recruitment", "Onboarding"],
    resumeName: "Neha_Singh_HR.pdf",
    status: "Applied",
    dateApplied: "2026-05-29"
  }
];

export function initLocalStorage() {
  if (typeof window === "undefined") return;

  // Check and seed Users
  if (!localStorage.getItem("cci_users")) {
    const defaultUsers = [
      ADMIN_ACCOUNT,
      ...INITIAL_SEEKERS,
      ...INITIAL_COMPANY_USERS
    ];
    localStorage.setItem("cci_users", JSON.stringify(defaultUsers));
  }

  // Check and seed Companies
  if (!localStorage.getItem("cci_companies")) {
    localStorage.setItem("cci_companies", JSON.stringify(INITIAL_COMPANIES));
  }

  // Check and seed Jobs
  if (!localStorage.getItem("cci_jobs")) {
    localStorage.setItem("cci_jobs", JSON.stringify(INITIAL_JOBS));
  }

  // Check and seed Applications
  if (!localStorage.getItem("cci_applications")) {
    localStorage.setItem("cci_applications", JSON.stringify(INITIAL_APPLICATIONS));
  }

  // Check and seed Saved Jobs
  if (!localStorage.getItem("cci_saved_jobs")) {
    localStorage.setItem("cci_saved_jobs", JSON.stringify([]));
  }
}
