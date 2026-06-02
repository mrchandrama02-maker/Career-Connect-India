/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "seeker" | "company" | "admin";

export interface User {
  id: string;
  email: string;
  password?: string; // Stored in mock database
  role: UserRole;
  name: string;
  mobile?: string;
  resumeName?: string;
  resumeBase64?: string;
  skills?: string[]; // comma parsed to array
  experience?: number; // years
  education?: string;
  profilePhotoEmoji?: string;
  blocked?: boolean;
  companyId?: string; // Connected only for company role users
  companyName?: string; // Only for recruiters/companies
  createdAt?: string;
  profile?: { skills: string; experience: string; resume: string }; // Initial empty profile values
}

export interface Company {
  id: string;
  name: string;
  description: string;
  website: string;
  logoEmoji: string;
  industry: string;
  location: string;
  companySize: string;
  verified?: boolean;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  salaryRange: string; // e.g. "8-12 LPA"
  jobType: "Full-time" | "Contract" | "Part-time" | "Remote" | string;
  experienceLevel: number; // e.g., 3 (years required)
  description: string;
  requirements: string[]; // string array of bullet points
  datePosted: string;
  active: boolean; // open/closed status
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  seekerId: string;
  seekerName: string;
  seekerEmail: string;
  seekerExperience: number;
  seekerSkills: string[];
  resumeName?: string;
  resumeBase64?: string;
  status: "Applied" | "Shortlisted" | "Rejected";
  dateApplied: string;
}

export interface SavedJob {
  id: string;
  seekerId: string;
  jobId: string;
}
