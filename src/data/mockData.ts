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
    name: "Flipkart",
    description: "India's largest e-commerce marketplace serving 200M+ customers with 150M+ product listings.",
    website: "https://www.flipkart.com/careers",
    logoEmoji: "🛍️",
    logoUrl: "https://th.bing.com/th/id/OIP.OQrbMsmN86RrB-hXq7AfSQHaHY?w=161&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    industry: "E-commerce / Retail Technology",
    location: "Bangalore, Karnataka, India",
    companySize: "10,000+ employees",
    verified: true
  },
  {
    id: "comp_2",
    name: "Amazon India",
    description: "Global leader in e-commerce, AWS cloud computing, and digital innovation serving millions in India.",
    website: "https://www.amazon.jobs",
    logoEmoji: "📦",
    logoUrl: "https://th.bing.com/th/id/OIP.UTfJ9EAfDyV5014-ySQm9wHaHo?w=130&h=150&c=6&o=7&pid=1.7&rm=3",
    industry: "E-commerce / Cloud Computing",
    location: "Hyderabad, Telangana, India",
    companySize: "100,000+ employees",
    verified: true
  },
  {
    id: "comp_3",
    name: "Google India",
    description: "Organizing world's information through search, AI, cloud, and digital services for billions of users.",
    website: "https://careers.google.com",
    logoEmoji: "🔍",
    logoUrl: "data:image/webp;base64,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",
    industry: "IT Services / Technology / Internet",
    location: "Bangalore, Karnataka, India",
    companySize: "10,000+ employees",
    verified: true
  },
  {
    id: "comp_4",
    name: "Microsoft India",
    description: "Empowering every person and organization on the planet to achieve more through technology.",
    website: "https://microsoft.com/careers",
    logoEmoji: "💻",
    logoUrl: "https://th.bing.com/th/id/OIP.JqVVkYzMrEgMXcSEXswE4QHaHa?w=179&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
    industry: "IT Services / Software",
    location: "Hyderabad, Telangana, India",
    companySize: "10,000+ employees",
    verified: true
  },
  {
    id: "comp_5",
    name: "Tata Consultancy Services (TCS)",
    description: "Global leader in IT services, consulting, and business solutions with presence in 55+ countries.",
    website: "https://www.tcs.com/careers",
    logoEmoji: "🏆",
    logoUrl: "data:image/webp;base64,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",
    industry: "IT Services / Consulting",
    location: "Mumbai, Maharashtra, India",
    companySize: "600,000+ employees",
    verified: true
  },
  {
    id: "comp_6",
    name: "Infosys India",
    description: "Global leader in next-generation digital services and consulting, enabling digital transformation.",
    website: "https://www.infosys.com/careers",
    logoEmoji: "🚀",
    logoUrl: "data:image/webp;base64,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",
    industry: "IT Services / Consulting",
    location: "Bangalore, Karnataka, India",
    companySize: "300,000+ employees",
    verified: true
  },
  {
    id: "comp_7",
    name: "Razorpay",
    description: "India's leading full-stack financial solutions company processing billions in transactions.",
    website: "https://razorpay.com/careers",
    logoEmoji: "💳",
    logoUrl: "data:image/webp;base64,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",
    industry: "Fintech / Payments Technology",
    location: "Bangalore, Karnataka, India",
    companySize: "1000-5000 employees",
    verified: true
  },
  {
    id: "comp_8",
    name: "Swiggy",
    description: "India's largest food ordering and delivery platform connecting 200K+ restaurant partners.",
    website: "https://careers.swiggy.com",
    logoEmoji: "🍔",
    logoUrl: "data:image/webp;base64,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",
    industry: "Food Tech / E-commerce / Logistics",
    location: "Bangalore, Karnataka, India",
    companySize: "5000-10,000 employees",
    verified: true
  },
  {
    id: "comp_9",
    name: "Ola",
    description: "India's largest mobility platform offering ride-hailing, EVs, and financial services.",
    website: "https://www.olacabs.com/careers",
    logoEmoji: "🚖",
    logoUrl: "data:image/webp;base64,UklGRg4FAABXRUJQVlA4IAIFAADwIACdASrdALQAPp1MokylpCMiIxcJYLATiWlu4XHhGjczxn1AN4A3lzATv7N2sf4ayMffuIicXuI1TaQDz9M6n0V7BHRZ/Zn2Of2SGFfH0RFwpM6Lh1a+X9nFQdMpMWR50HVr5e6Ho+hERRaDXq7hASbu0mH+JMO0C8RoYIE75Ae0qWznXqENqXwaeTK9QkzjOznmcFVi5JMPuRyBItxWKB6ZVVEivqwwlyhrbAxiJ1XeFw3fet9JLf9BgKNGM5s7PKNmskvjPr+B6ZnhZMMZ8lyl2LU5XnRZA/yuuxH2QwpYPc4i5FomWQz1anK8kU2vn+FB1a+X9nFQdWvl/ZxUHVr5f2cVB1a+X9nFQdV8AAD+/tfgADtan2U39ZcjDIj6jFz5yW8Qb401hpHiamKnfo1sgvBGTe9TF6c5/EepDD1IAqi9BNYAeJ09Bia3bP5Z2LBqG2EwYCt67AzcKWpIRFKyOZ3dLgIHtAvA0IZxM/nz8p0d8KswlUiS/QoUHAAp41GkLiKesEcyP485RUpOVzkgtpXDgs6b//AQKzaOqj1Tv0sUw0dezuCdXTn9MajCVA1e5oBvudckOsnpV4F9pRxco/WRFJhvEXjQ+lw0ldjluQ9thAm2Qhss+NKSfuCJsurnt9v7/6fwEN/vqQFm2mT1CTh/sxj9AzlT6IYeMaw0Co1fzrb2Ki4a93JlvoylWk7DeLLt7J+d1QjBHIWwA+g4cn7bGo8O3UkvbeUpb7L0bf6A12i6zSbq8kr5G/iK0UzC9NaFf+6ehukTMMFiDyU/gXlzKAYS0PVDOhSOEpu1oqR9SjNLYl4oT+LoGHK/yTxLWNFBqDbrnmG4W09gO9GYMV+ON+W8aaENSXb0n4QJXP0tOuqgBVX1IoVCbLfDP//3/Lf6YvS0D8CADzcJkd8usY9bw+BuSChhXI6vIcPEJ66YcSn6XZfhPrT9cnALMsbFlZOFnEVoeWeXycCUB7+U0c3AX8XNlxOE5nt4vdJdGfPn5ojV4zFTmjKrj30kYZ2FzRSbZAU/uM7hjvmv6mSFh87OyOgDYXOiXTi0WyowyTcFKSdNGsgGuoPF914zvHT2bn8nu2047+7AeaYlmoTwVhIqvKAO5NUNRc1ydwttATgXBh9sQuA19kVuo53Au44gX71626wU05e5f2Vr//9521UvNzzX0n5bi7+fgWatGIzN5uzQNl+9D6ZPA9tOHXZbFb9w04S4sDbskviJrNmyYoAO72L7d9u8RUvuhuiaACTygGE5n1Vgk817nI+aVUiD9kyiXpjiFuRDFcTLL6m57IwshbmmRcf9adhUgG4HF9+d/zFJjjlyd8j4/ArUtK0vMK3OaRMZXuVRjY4lx9zgqzHTrV0FBJhyGmwuTcb+voLAUV/P8NDmK41uoUOW09CSfNbgLYsDckheg/Wbcuoedu2UXdDWl1NhSMLu1Sq4sPoPFrlNAGUELJiZOOUmR9P5Nk2cI7guQIGFEpKIuOiH/HsIQtzzgq4MJCHoguoPIb/yyUuK/lVkoPdOXizk2c7/2f3pRCNv7ezJrSiF0jv8/VnQmQFfo8ilSg378ydd5hKHEBg0kIAXNtCFGLsst7xdHlSqKQskRhiSxFA1pyZOmDlMaktH1AP5r0ebJuNGU05peUvml29K1wQ4qgZy8F3DnnYL/GBhAJUVnMD0MNdQgAYKrr1Sqv8TeAlNo5h+tdcsC4DXVbY3dYq7jR+hC7OzlnIRxyoU6xs9AAiKzoHt+NdfCLXxdPHgiOI5Bb3iFXIEAsIqFuM2Vc5RWvKURhmH83MH6bW/q3rAvVvOQCqoUyTnA2zIZfUPG+IhIOr2oP2NArmZdC9VwPhj8lNLcP3XVWavWMahnnUKP3AygLnGqDfQJc9V1wBTi90UI5FWwQfbWSbLXaH2CXmWn2G80xnoqKzPM51HeqRGqpB7MRc6rNIHM0Hbz/B9GZOzL2KFXDVWEfEwlzLcH6lPQqaVo8nTKm/BPjpVk/tvQPD3IwC7NdOmyCi8htOAiQXxiysKGHnc03AOemfHgIqcqYknpufPUd+SeaMhav/BBi6UnkqkicU+CM9eZv5SWYazr72XfjiwuShOQ8yngbDIlw+UZjCwKCYngpupoZ7R0JxFnEOs5UBNDmpS4nkO16NV2wX4L1DaIRGdXbE3AWOoOQojbzUa9rxOpyJ5KfadLb0Wy7lFqMyQM6UxHqs+jFGtPnwBSF3NpKP1j+LybozD1gKtaM9i3jL0tsRAnW2nwCZF6HWKIdQWVAaJEv+CutyU3oLUCO6gWNJ0+T9Piwmy1VjCxJWn1fBAalWNc7eBC2YF4E9pXpFFbbjxQHAClFZe3MKkDn8Tq/5yfgsZ/hUyzSwrzeEJ9obmVGzYCfuznUGETm+hRxAdUQZXn5Coh5zfKeTqL/MHXArc8cEJOnQ5oXJNVzVf+Csg78DnRKbvxbYqSDMK46ZMvhzuAZMce9jC5sQqdgt2nrEks6ephzTzAc0aopxtWBUgV8Q6mmlfggj3RfzzgJyfBXDxVQ4DEvddh/E699/mevBD6F+Sgjluf9QzfTkVmgo5kuwJMtc8jJH3ucJii40Ng9jknYJqf4ayICI41ftNg8KIkk+li2LxK+kl9P9/6/I/imZKsSSwTIA9sDHPiRbOrcpO/3/46flJH3lBi1RMXzoMIo9wh87cN25ka1fop/NEKF6M+buatDmAzdjpVAWIrexMSB4K3M3lRWBSQiyx7ki4mIdah7Xf8+js4B0JflVxI5qJJQhDLXQkZEOxg6yjdaX0xvOfRxOXwy0Ni9DW9pocTF8z+eKKA8pr6zGCVYS9h44FlOFVBJNsFAvfL0eaTvK9YaAyx/nHPvR36YeW/gPs+6BbJIvhC3gx7khGyjBPNDDUFkcSodWl95SAHVQtr1YMja/AGT1uj4a0JpDJY1ZRAhxmJ//Ik1i6UWVZd0+i2nYpa8W/Mmlx9k8R9CnNxEPpStlinybsVaEc7yw82ySh9EoG0bLe1dhgjiPrEwbokE+H+AtUj1KVx4anfJC8Vvtz41aXWiLKZ2r/I0tJMr/HzERcmMij8s5uFpjpdSV91Gp4KUb87ch/XHSXVtXCHkNUvWMmLlol+/h+pBhnz9kQF/XZRSCs0i1lOw7k4D87/LZA5HwLplFxaF4wNSNLZdRacP8awiWqjp7R70JloXmw7o4pm2zl8J/q4BJSmVz2//aHdKJ8zJb+cjcemSuTuoCfl1f1MFn1HG7Q4fHBRlGJDS4S3DPC/gu5KmSR8O1pgeHFFW+RC4v9klp0ueQY0vKOnfbi0RsjDAaLlxXl2f6Vaf5HB0Jw1/X4tehI+sOrmyv9naAIOgmIHmAOExH3uJ6ZAB7HYZlWtW6sVXpF8CT+Cv+2GNBGbEO03/2APUmXIXjsdlJsfv/EawO7m/UUre+fn090A=",
    industry: "Mobility Tech / Transportation",
    location: "Bangalore, Karnataka, India",
    companySize: "5000-10,000 employees",
    verified: true
  },
  {
    id: "comp_10",
    name: "PhonePe",
    description: "India's leading digital payments platform with 500M+ registered users and 200M+ monthly actives.",
    website: "https://www.phonepe.com/careers",
    logoEmoji: "📱",
    logoUrl: "https://th.bing.com/th/id/OIP.tuYalZe2SOHuvjtZkDDJ5gHaFf?w=270&h=200&c=7&r=0&o=7&pid=1.7&rm=3",
    industry: "Fintech / Digital Payments",
    location: "Bangalore, Karnataka, India",
    companySize: "1000-5000 employees",
    verified: true
  },
  {
    id: "comp_11",
    name: "CRED",
    description: "Premium fintech platform for credit card bill payments and exclusive community rewards.",
    website: "https://cred.club/careers",
    logoEmoji: "💎",
    logoUrl: "https://logo.clearbit.com/cred.club",
    industry: "Fintech",
    location: "Bangalore, Karnataka, India",
    companySize: "500-1000 employees",
    verified: true
  },
  {
    id: "comp_12",
    name: "Zomato",
    description: "Global food ordering and restaurant discovery platform serving millions of customers worldwide.",
    website: "https://www.zomato.com/careers",
    logoEmoji: "🍕",
    logoUrl: "https://logo.clearbit.com/zomato.com",
    industry: "Food Tech",
    location: "Gurgaon, Haryana, India",
    companySize: "5000-10,000 employees",
    verified: true
  },
  {
    id: "comp_13",
    name: "Uber India",
    description: "Global ride-hailing and mobility platform transforming urban transportation worldwide.",
    website: "https://www.uber.com/careers",
    logoEmoji: "🚗",
    logoUrl: "https://logo.clearbit.com/uber.com",
    industry: "Mobility Tech",
    location: "Bangalore, Karnataka, India",
    companySize: "5000-10,000 employees",
    verified: true
  },
  {
    id: "comp_14",
    name: "Netflix India",
    description: "World's leading streaming entertainment service with 260M+ paid memberships globally.",
    website: "https://jobs.netflix.com",
    logoEmoji: "🎬",
    logoUrl: "https://logo.clearbit.com/netflix.com",
    industry: "Entertainment / OTT",
    location: "Mumbai, Maharashtra, India",
    companySize: "1000-5000 employees (Global)",
    verified: true
  },
  {
    id: "comp_15",
    name: "LinkedIn India",
    description: "World's largest professional network with 1B+ members across 200+ countries.",
    website: "https://careers.linkedin.com",
    logoEmoji: "🤝",
    logoUrl: "https://logo.clearbit.com/linkedin.com",
    industry: "Social Media / Professional Network",
    location: "Bangalore, Karnataka, India",
    companySize: "5000-10,000 employees (Global)",
    verified: true
  },
  {
    id: "comp_16",
    name: "Goldman Sachs India",
    description: "Leading global investment banking, securities, and investment management firm.",
    website: "https://www.goldmansachs.com/careers",
    logoEmoji: "📈",
    logoUrl: "https://logo.clearbit.com/goldmansachs.com",
    industry: "Investment Banking",
    location: "Bangalore, Karnataka, India",
    companySize: "10,000+ employees (India)",
    verified: true
  },
  {
    id: "comp_17",
    name: "Adobe India",
    description: "Global leader in digital media and marketing software, powering creativity and document work.",
    website: "https://www.adobe.com/careers",
    logoEmoji: "🎨",
    logoUrl: "https://logo.clearbit.com/adobe.com",
    industry: "Software Products",
    location: "Noida, Uttar Pradesh, India",
    companySize: "5000-10,000 employees (India)",
    verified: true
  },
  {
    id: "comp_18",
    name: "Atlassian India",
    description: "Maker of Jira, Confluence, Trello, and other collaboration and productivity tools.",
    website: "https://www.atlassian.com/company/careers",
    logoEmoji: "⚓",
    logoUrl: "https://logo.clearbit.com/atlassian.com",
    industry: "Software Products / SaaS",
    location: "Bangalore, Karnataka, India",
    companySize: "5000-10,000 employees (Global)",
    verified: true
  },
  {
    id: "comp_19",
    name: "Dream11",
    description: "India's largest fantasy sports platform with 200M+ users playing cricket, football, and more.",
    website: "https://dream11.com/careers",
    logoEmoji: "🏏",
    logoUrl: "https://logo.clearbit.com/dream11.com",
    industry: "Gaming / Fantasy Sports",
    location: "Mumbai, Maharashtra, India",
    companySize: "1000-5000 employees",
    verified: true
  },
  {
    id: "comp_20",
    name: "Unacademy",
    description: "India's largest learning platform for competitive exams, with 100M+ learners and top educators.",
    website: "https://unacademy.com/careers",
    logoEmoji: "🎓",
    logoUrl: "https://logo.clearbit.com/unacademy.com",
    industry: "EdTech",
    location: "Bangalore, Karnataka, India",
    companySize: "1000-5000 employees",
    verified: true
  }
];

export const INITIAL_COMPANY_USERS: User[] = [
  {
    id: "user_comp_1",
    email: "recruiter1@flipkart.com",
    password: "password123",
    role: "company",
    name: "Anil Goel",
    companyId: "comp_1",
    profilePhotoEmoji: "👔",
    blocked: false
  },
  {
    id: "user_comp_2",
    email: "recruiter2@amazon.com",
    password: "password123",
    role: "company",
    name: "Rohan Verma",
    companyId: "comp_2",
    profilePhotoEmoji: "👩‍💼",
    blocked: false
  },
  {
    id: "user_comp_3",
    email: "recruiter3@google.com",
    password: "password123",
    role: "company",
    name: "Kirti Sen",
    companyId: "comp_3",
    profilePhotoEmoji: "👨‍💼",
    blocked: false
  },
  {
    id: "user_comp_4",
    email: "recruiter4@microsoft.com",
    password: "password123",
    role: "company",
    name: "Anjali Gupta",
    companyId: "comp_4",
    profilePhotoEmoji: "👩‍💼",
    blocked: false
  },
  {
    id: "user_comp_5",
    email: "recruiter5@tcs.com",
    password: "password123",
    role: "company",
    name: "Sudha Murthy",
    companyId: "comp_5",
    profilePhotoEmoji: "👨‍💼",
    blocked: false
  },
  {
    id: "user_comp_6",
    email: "recruiter6@infosys.com",
    password: "password123",
    role: "company",
    name: "Nandan Nilekani",
    companyId: "comp_6",
    profilePhotoEmoji: "💼",
    blocked: false
  },
  {
    id: "user_comp_7",
    email: "recruiter7@razorpay.com",
    password: "password123",
    role: "company",
    name: "Harshil Mathur",
    companyId: "comp_7",
    profilePhotoEmoji: "👩‍💻",
    blocked: false
  },
  {
    id: "user_comp_8",
    email: "recruiter8@swiggy.com",
    password: "password123",
    role: "company",
    name: "Sriharsha Majety",
    companyId: "comp_8",
    profilePhotoEmoji: "🙋‍♂️",
    blocked: false
  },
  {
    id: "user_comp_9",
    email: "recruiter9@ola.com",
    password: "password123",
    role: "company",
    name: "Bhavish Aggarwal",
    companyId: "comp_9",
    profilePhotoEmoji: "🚖",
    blocked: false
  },
  {
    id: "user_comp_10",
    email: "recruiter10@phonepe.com",
    password: "password123",
    role: "company",
    name: "Sameer Nigam",
    companyId: "comp_10",
    profilePhotoEmoji: "📱",
    blocked: false
  },
  {
    id: "user_comp_11",
    email: "recruiter11@cred.club",
    password: "password123",
    role: "company",
    name: "Kunal Shah",
    companyId: "comp_11",
    profilePhotoEmoji: "💎",
    blocked: false
  },
  {
    id: "user_comp_12",
    email: "recruiter12@zomato.com",
    password: "password123",
    role: "company",
    name: "Deepinder Goyal",
    companyId: "comp_12",
    profilePhotoEmoji: "🍕",
    blocked: false
  },
  {
    id: "user_comp_13",
    email: "recruiter13@uber.com",
    password: "password123",
    role: "company",
    name: "Dara Khosrowshahi",
    companyId: "comp_13",
    profilePhotoEmoji: "🚗",
    blocked: false
  },
  {
    id: "user_comp_14",
    email: "recruiter14@netflix.com",
    password: "password123",
    role: "company",
    name: "Reed Hastings",
    companyId: "comp_14",
    profilePhotoEmoji: "🍿",
    blocked: false
  },
  {
    id: "user_comp_15",
    email: "recruiter15@linkedin.com",
    password: "password123",
    role: "company",
    name: "Ryan Roslansky",
    companyId: "comp_15",
    profilePhotoEmoji: "🤝",
    blocked: false
  },
  {
    id: "user_comp_16",
    email: "recruiter16@goldman.com",
    password: "password123",
    role: "company",
    name: "David Solomon",
    companyId: "comp_16",
    profilePhotoEmoji: "📈",
    blocked: false
  },
  {
    id: "user_comp_17",
    email: "recruiter17@adobe.com",
    password: "password123",
    role: "company",
    name: "Shantanu Narayen",
    companyId: "comp_17",
    profilePhotoEmoji: "🎨",
    blocked: false
  },
  {
    id: "user_comp_18",
    email: "recruiter18@atlassian.com",
    password: "password123",
    role: "company",
    name: "Mike Cannon-Brookes",
    companyId: "comp_18",
    profilePhotoEmoji: "⛵",
    blocked: false
  },
  {
    id: "user_comp_19",
    email: "recruiter19@dream11.com",
    password: "password123",
    role: "company",
    name: "Harsh Jain",
    companyId: "comp_19",
    profilePhotoEmoji: "🏏",
    blocked: false
  },
  {
    id: "user_comp_20",
    email: "recruiter20@unacademy.com",
    password: "password123",
    role: "company",
    name: "Gaurav Munjal",
    companyId: "comp_20",
    profilePhotoEmoji: "🎓",
    blocked: false
  }
];

export const INITIAL_JOBS: Job[] = [
  // 1. Flipkart
  {
    id: "job_flipkart_1",
    title: "Senior Frontend Engineer - Flipkart Marketplace",
    companyId: "comp_1",
    companyName: "Flipkart",
    location: "Bangalore",
    salaryRange: "18-26 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Lead development of Flipkart's seller dashboard. Build scalable React apps serving 50M+ users. Mentor junior developers and drive architecture.",
    requirements: [
      "React 18+ with Hooks and Context API mastery",
      "Next.js for server-side rendering and performance optimization",
      "Redux Toolkit or Zustand for state management",
      "Tailwind CSS and responsive design implementation",
      "TypeScript for type-safe code development"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_flipkart_2",
    title: "Product Manager - Flipkart Mobile App",
    companyId: "comp_1",
    companyName: "Flipkart",
    location: "Bangalore",
    salaryRange: "22-32 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Drive product strategy for Flipkart's mobile app used by 100M+ customers. Define roadmap, lead A/B testing, and make data-driven decisions.",
    requirements: [
      "Product lifecycle management (ideation to launch)",
      "SQL, Excel, Tableau for data analysis",
      "Agile methodology and JIRA/Confluence",
      "User story writing and backlog prioritization"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 2. Amazon
  {
    id: "job_amazon_1",
    title: "Software Development Engineer - Fulfillment Tech",
    companyId: "comp_2",
    companyName: "Amazon India",
    location: "Hyderabad",
    salaryRange: "22-35 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Design scalable distributed systems for Amazon's fulfillment network. Process millions of orders daily. Work with global engineering teams.",
    requirements: [
      "Java 11+ or Kotlin with Spring Boot framework",
      "Microservices architecture and RESTful APIs",
      "AWS services (EC2, S3, Lambda, DynamoDB)",
      "Distributed systems and message queues (Kafka)"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_amazon_2",
    title: "Operations Manager - Last Mile Delivery",
    companyId: "comp_2",
    companyName: "Amazon India",
    location: "Mumbai",
    salaryRange: "15-22 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Lead last-mile delivery operations across Mumbai. Manage 50+ delivery partners and 500+ associates. Optimize routes and improve customer satisfaction.",
    requirements: [
      "Last-mile logistics and supply chain management",
      "Data-driven decision making using Excel and analytics",
      "Team leadership and vendor management",
      "Process improvement and Six Sigma methodologies"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 3. Google India
  {
    id: "job_google_1",
    title: "Software Engineer III - Search Infrastructure",
    companyId: "comp_3",
    companyName: "Google India",
    location: "Bangalore",
    salaryRange: "30-45 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build scalable distributed systems powering Google Search. Work on indexing, query processing, and ranking algorithms serving billions of searches.",
    requirements: [
      "C++ or Java with multithreading and memory optimization",
      "Advanced data structures and algorithms",
      "Distributed systems and consensus protocols",
      "Linux systems programming and performance tuning"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_google_2",
    title: "Product Manager - Google Pay (India)",
    companyId: "comp_3",
    companyName: "Google India",
    location: "Hyderabad",
    salaryRange: "35-50 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Lead product strategy for Google Pay's India operations serving 500M+ UPI transactions monthly. Work with NPCI, RBI, and banking partners.",
    requirements: [
      "Product strategy and roadmap planning experience",
      "UPI/Payments ecosystem deep understanding (NPCI, RBI)",
      "Data-driven decision making with SQL and analytics",
      "Stakeholder management and cross-functional leadership"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 4. Microsoft India
  {
    id: "job_microsoft_1",
    title: "Software Engineer - Azure Cloud Platform",
    companyId: "comp_4",
    companyName: "Microsoft India",
    location: "Hyderabad",
    salaryRange: "28-42 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Design and develop scalable cloud services for Microsoft Azure platform. Work on compute, storage, or networking infrastructure for millions of users.",
    requirements: [
      "C# or Go programming language with strong OOP fundamentals",
      "Cloud computing concepts (IaaS, PaaS, multi-tenancy)",
      "Kubernetes and Docker container orchestration",
      "RESTful API design and OpenAPI specification"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_microsoft_2",
    title: "Technical Program Manager - Office 365 Suite",
    companyId: "comp_4",
    companyName: "Microsoft India",
    location: "Bangalore",
    salaryRange: "32-48 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "Lead cross-functional programs for Microsoft Office 365 product suite. Coordinate engineering, product, and design teams for major releases.",
    requirements: [
      "Technical program management in enterprise software",
      "Agile and Scrum methodologies with SAFe certification",
      "Risk assessment and mitigation strategies",
      "Executive-level stakeholder communication"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 5. TCS
  {
    id: "job_tcs_1",
    title: "Java Full Stack Developer - Banking Domain",
    companyId: "comp_5",
    companyName: "Tata Consultancy Services (TCS)",
    location: "Mumbai",
    salaryRange: "8-14 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Develop enterprise-grade web applications for leading banking clients. Work on frontend and backend components using Java and React.",
    requirements: [
      "Java 8+ with Spring Boot and Hibernate framework",
      "React.js with Hooks and Redux state management",
      "RESTful API development and integration",
      "MySQL/PostgreSQL database design and queries"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_tcs_2",
    title: "Database Administrator - Oracle/DB2",
    companyId: "comp_5",
    companyName: "Tata Consultancy Services (TCS)",
    location: "Chennai",
    salaryRange: "9-15 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Manage and optimize large-scale enterprise databases for Fortune 500 clients. Ensure high availability, backup recovery, and performance.",
    requirements: [
      "Oracle DB or IBM DB2 database administration",
      "SQL performance tuning and query optimization",
      "Backup and recovery strategies (RMAN, TSM)",
      "Database security management and auditing"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 6. Infosys
  {
    id: "job_infosys_1",
    title: "Cloud Engineer - AWS/Azure",
    companyId: "comp_6",
    companyName: "Infosys India",
    location: "Pune",
    salaryRange: "12-18 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Design and implement cloud infrastructure for enterprise clients. Automate deployment using Infrastructure as Code (IaC).",
    requirements: [
      "AWS (EC2, S3, VPC, IAM) or Azure (VM, Storage, Networking)",
      "Terraform or CloudFormation for IaC",
      "CI/CD pipelines (Jenkins/GitHub Actions)",
      "Docker and Kubernetes containerization"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_infosys_2",
    title: "Business Analyst - Banking Domain",
    companyId: "comp_6",
    companyName: "Infosys India",
    location: "Bangalore",
    salaryRange: "10-16 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Bridge business requirements and technical solutions for banking clients. Gather requirements, create BRDs, and coordinate with development teams.",
    requirements: [
      "Banking domain knowledge (Retail/Corporate/Investment)",
      "Requirements gathering and BRD/FRD creation",
      "Agile methodology and Scrum ceremonies",
      "SQL for data analysis and validation"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 7. Razorpay
  {
    id: "job_razorpay_1",
    title: "Backend Engineer - Payments Platform",
    companyId: "comp_7",
    companyName: "Razorpay",
    location: "Bangalore",
    salaryRange: "18-28 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build scalable payment processing systems handling millions of transactions. Work on routing, reconciliation, fraud detection, and settlement.",
    requirements: [
      "Java or Go with microservices architecture",
      "Spring Boot or Gin framework",
      "PostgreSQL and Redis for data persistence",
      "Kafka or RabbitMQ for event streaming"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_razorpay_2",
    title: "Technical Support Engineer",
    companyId: "comp_7",
    companyName: "Razorpay",
    location: "Bangalore",
    salaryRange: "8-12 LPA",
    jobType: "Full-time",
    experienceLevel: 1,
    description: "Provide technical support to merchants integrating Razorpay payment APIs. Troubleshoot issues, debug API calls, and resolve integration problems.",
    requirements: [
      "API troubleshooting and debugging skills",
      "REST API understanding (requests, responses, headers)",
      "SQL query writing for data investigation",
      "Excellent problem-solving and analytical thinking"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 8. Swiggy
  {
    id: "job_swiggy_1",
    title: "Software Development Engineer - Delivery",
    companyId: "comp_8",
    companyName: "Swiggy",
    location: "Bangalore",
    salaryRange: "16-25 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build scalable delivery assignment and real-time tracking systems. Optimize delivery partner allocation algorithms and reduce delivery time.",
    requirements: [
      "Java/Kotlin with Spring Boot framework",
      "Microservices architecture and event-driven design",
      "Redis for caching and real-time data",
      "Kafka for event streaming and message processing"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_swiggy_2",
    title: "Data Analyst - Growth",
    companyId: "comp_8",
    companyName: "Swiggy",
    location: "Gurgaon",
    salaryRange: "12-18 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Analyze user behavior and growth metrics. Drive data-informed decisions for user acquisition, retention, and engagement strategies.",
    requirements: [
      "SQL for complex queries and data extraction",
      "Python (Pandas, NumPy) for data manipulation",
      "Data visualization (Tableau/Power BI/Metabase)",
      "A/B testing methodology and statistical analysis"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 9. Ola
  {
    id: "job_ola_1",
    title: "Mobile Developer (Android & iOS)",
    companyId: "comp_9",
    companyName: "Ola",
    location: "Bangalore",
    salaryRange: "14-22 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build and maintain Ola's driver and rider mobile applications serving 100M+ users. Implement new features and optimize app performance.",
    requirements: [
      "Kotlin with Android SDK and Jetpack Compose",
      "MVVM architecture and Coroutines/Flow",
      "Swift with UIKit and SwiftUI",
      "Google Maps SDK or MapKit integration"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_ola_2",
    title: "DevOps Engineer",
    companyId: "comp_9",
    companyName: "Ola",
    location: "Chennai",
    salaryRange: "12-18 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Manage cloud infrastructure and CI/CD pipelines for microservices. Ensure high availability and automated deployments for millions of users.",
    requirements: [
      "AWS/GCP cloud services (EC2, EKS, S3, RDS)",
      "Kubernetes and Docker containerization",
      "Jenkins or GitLab CI for CI/CD pipelines",
      "Terraform or Pulumi for Infrastructure as Code"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 10. PhonePe
  {
    id: "job_phonepe_1",
    title: "Software Development Engineer - Payments",
    companyId: "comp_10",
    companyName: "PhonePe",
    location: "Bangalore",
    salaryRange: "20-32 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build highly available payment processing systems handling 200M+ UPI transactions daily. Ensure 99.99% uptime and data consistency.",
    requirements: [
      "Java with Spring Boot framework",
      "Distributed systems design (consensus, replication, sharding)",
      "UPI protocol and NPCI standards understanding",
      "Redis and Kafka for high-throughput processing"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_phonepe_2",
    title: "Fraud Analyst - Risk Management",
    companyId: "comp_10",
    companyName: "PhonePe",
    location: "Bangalore",
    salaryRange: "10-16 LPA",
    jobType: "Full-time",
    experienceLevel: 1,
    description: "Monitor transaction patterns to detect fraud. Build rule-based fraud detection systems and investigate suspicious transactions.",
    requirements: [
      "Fraud detection pattern recognition and analysis",
      "SQL for data querying and investigation",
      "Basic Python scripting for data analysis",
      "Risk management frameworks understanding"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 11. CRED
  {
    id: "job_cred_1",
    title: "Frontend Developer - Web App",
    companyId: "comp_11",
    companyName: "CRED",
    location: "Bangalore",
    salaryRange: "22-35 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build premium, high-performance web experiences for CRED's exclusive community. Focus on animations, micro-interactions, and visual precision.",
    requirements: [
      "React.js with TypeScript and deep hooks insight",
      "Next.js for server-side layout rendering",
      "Framer Motion for beautiful animations",
      "Tailwind CSS for responsive luxury styling"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_cred_2",
    title: "Product Designer (UI/UX)",
    companyId: "comp_11",
    companyName: "CRED",
    location: "Bangalore",
    salaryRange: "18-28 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Design premium, delightful experiences for CRED's fintech products. Create high-fidelity mockups, prototypes, and reusable design tokens.",
    requirements: [
      "Figma expertise and advanced prototyping",
      "Design systems creation and cross-framework synchronization",
      "User research and iterative usability testing",
      "Micro-animations design using Lottie or After Effects"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 12. Zomato
  {
    id: "job_zomato_1",
    title: "Software Development SDE II - Food Delivery",
    companyId: "comp_12",
    companyName: "Zomato",
    location: "Gurgaon",
    salaryRange: "15-25 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build scalable food ordering and delivery tracking systems. Optimize restaurant discovery and real-time order tracking with high concurrency.",
    requirements: [
      "Java or Go with microservices optimization",
      "Spring Boot or Echo framework",
      "PostgreSQL and Redis for high speed caching",
      "Elasticsearch for lightning-fast search indexing"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_zomato_2",
    title: "Marketing Manager - Brand Strategy",
    companyId: "comp_12",
    companyName: "Zomato",
    location: "Delhi",
    salaryRange: "12-20 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Lead brand marketing campaigns for Zomato's consumer business. Drive user acquisition, social media buzz, and premium brand recall.",
    requirements: [
      "Digital marketing strategy and copywriting",
      "Social media campaign and community management",
      "Performance marketing metric analysis",
      "Brand positioning and creative storytelling"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 13. Uber India
  {
    id: "job_uber_1",
    title: "Software Engineer - Marketplace Dispatch",
    companyId: "comp_13",
    companyName: "Uber India",
    location: "Bangalore",
    salaryRange: "25-40 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build scalable marketplace systems for ride matching, dynamic pricing, and dispatch optimization serving millions of riders daily.",
    requirements: [
      "Go or Python programming master",
      "Microservices architecture and robust message distribution",
      "Redis for caching geospatial dispatch parameters",
      "Kafka for real-time streaming coordinate models"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_uber_2",
    title: "Data Scientist - Pricing Algorithms",
    companyId: "comp_13",
    companyName: "Uber India",
    location: "Bangalore",
    salaryRange: "20-35 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Develop dynamic pricing models to balance supply and demand. Analyze rider and driver behavior to optimize marketplace efficiency.",
    requirements: [
      "Python with scikit-learn, pandas, numpy",
      "SQL for deep data query optimization",
      "Machine learning models (XGBoost, Random Forest)",
      "A/B testing and causal inference methods"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 14. Netflix India
  {
    id: "job_netflix_1",
    title: "Software Engineer - Content Delivery Network",
    companyId: "comp_14",
    companyName: "Netflix India",
    location: "Mumbai",
    salaryRange: "35-55 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Build and optimize content delivery networks (CDN) to stream movies and shows to millions of viewers with low latency and high quality.",
    requirements: [
      "Java or Go with heavy multithreading execution",
      "CDN and video streaming protocols (HLS, DASH)",
      "Cloud platform architectures (AWS / OpenConnect CDN)",
      "Network programming with TCP, UDP, QUIC protocols"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_netflix_2",
    title: "Content Acquisition Manager - Originals",
    companyId: "comp_14",
    companyName: "Netflix India",
    location: "Mumbai",
    salaryRange: "25-40 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "Manage original content productions for India market. Identify talent, oversee production houses, and ensure timely delivery of premium shows.",
    requirements: [
      "Content strategy, scouting and executive script analysis",
      "Vendor and production house budget coordination",
      "Hindi and English bilingual communication excellence",
      "Strong commercial contracts negotiation"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 15. LinkedIn India
  {
    id: "job_linkedin_1",
    title: "Software Engineer - Feed Platform",
    companyId: "comp_15",
    companyName: "LinkedIn India",
    location: "Bangalore",
    salaryRange: "28-45 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build and scale LinkedIn's feed platform serving personalized content to millions of users daily. Work on relevance algorithms and ranking.",
    requirements: [
      "Java with Spring framework backend infrastructure",
      "Kafka for transaction event stream processing",
      "NoSQL database management (Cassandra, Voldemort)",
      "High scalability and system design for caching"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_linkedin_2",
    title: "Sales Solutions Consultant",
    companyId: "comp_15",
    companyName: "LinkedIn India",
    location: "Mumbai",
    salaryRange: "20-35 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Help enterprise clients leverage LinkedIn's talent and marketing solutions. Drive revenue growth and build long-term corporate relationships.",
    requirements: [
      "B2B software sales or technical solution consulting",
      "SaaS product architectures deep grasp",
      "CRM tool expertise (Salesforce)",
      "Highly professional client presenting and negotiation"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 16. Goldman Sachs India
  {
    id: "job_goldman_1",
    title: "Software Engineer - Low Latency Trading Systems",
    companyId: "comp_16",
    companyName: "Goldman Sachs India",
    location: "Bangalore",
    salaryRange: "25-45 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build low-latency, high-frequency trading systems for global financial markets. Work on order management, execution algorithms, and risk systems.",
    requirements: [
      "Java or C++ with execution speed optimization",
      "Low-latency garbage collection and memory tuning",
      "Advanced concurrency and lock-free programming",
      "Linux system signals and socket programming"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_goldman_2",
    title: "Investment Banking Analyst",
    companyId: "comp_16",
    companyName: "Goldman Sachs India",
    location: "Mumbai",
    salaryRange: "20-35 LPA",
    jobType: "Full-time",
    experienceLevel: 1,
    description: "Support M&A, financing, and restructuring transactions. Build complex financial models, prepare pitch books, and conduct rigorous industry research.",
    requirements: [
      "Financial modeling (DCF, LBO, merger valuation)",
      "Valuation techniques and comparative company analysis",
      "Advanced Microsoft Excel modeling mastery",
      "Strong analytical and quantitative reasoning skills"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 17. Adobe India
  {
    id: "job_adobe_1",
    title: "Computer Scientist - Creative Cloud Apps",
    companyId: "comp_17",
    companyName: "Adobe India",
    location: "Noida",
    salaryRange: "25-45 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build next-generation features for Adobe Creative Cloud products (Photoshop, Illustrator). Work on vector mechanics, image processing, and gorgeous UI.",
    requirements: [
      "C++ with modern standards (C++17 or newer)",
      "JavaScript/TypeScript and React for web integration",
      "WebAssembly compilation for processing speeds",
      "Graphics algorithms and vectors layouts"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_adobe_2",
    title: "Product Manager - Document Cloud Suite",
    companyId: "comp_17",
    companyName: "Adobe India",
    location: "Noida",
    salaryRange: "30-50 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Lead product strategy for Adobe Document Cloud (Acrobat, Sign, PDF SDK services). Drive AI/ML features definition and global growth metrics.",
    requirements: [
      "SaaS product management and roadmap ownership",
      "AI/ML utility integrations and PDF parsing workflows",
      "Exceptional user metrics analysis and feature validation",
      "Cross-functional team coordination and sprint leading"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 18. Atlassian India
  {
    id: "job_atlassian_1",
    title: "Senior Backend Engineer - Jira Cloud Security",
    companyId: "comp_18",
    companyName: "Atlassian India",
    location: "Bangalore",
    salaryRange: "30-50 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Build scalable backend services for Jira platform serving millions of users. Work on microservices security, APIs compliance, and database performance.",
    requirements: [
      "Java 17/21 or Kotlin with microservices backend",
      "AWS Cloud architecture with IAM and KMS focus",
      "NoSQL column architectures (Cassandra, DynamoDB)",
      "GraphQL API design and testing workflows"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_atlassian_2",
    title: "Technical Content Developer",
    companyId: "comp_18",
    companyName: "Atlassian India",
    location: "Bangalore",
    salaryRange: "15-25 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Create and maintain documentation for Atlassian products. Write developer tutorials, REST API docs, and user manuals for Jira, Confluence, and Trello.",
    requirements: [
      "Technical writing, markdown layouts and guides design",
      "REST API documentation (Swagger / OpenAPI)",
      "Atlassian tools family deep familiarity (Jira, Confluence)",
      "Clear technical translation of complex microservice structures"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 19. Dream11
  {
    id: "job_dream11_1",
    title: "Software Backend SDE II - High Scale Gaming",
    companyId: "comp_19",
    companyName: "Dream11",
    location: "Mumbai",
    salaryRange: "20-35 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build scalable backend systems handling millions of concurrent users during live matches. Work on real-time scoring, contest logic, and cash wallets.",
    requirements: [
      "Java or Go with deep OOP/concurrency knowledge",
      "Redis for real-time high throughput memory caching",
      "Kafka for low latency live match feed data streaming",
      "Highly available distributed event processing models"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_dream11_2",
    title: "Data Platform SDE II - Analytics Pipeline",
    companyId: "comp_19",
    companyName: "Dream11",
    location: "Mumbai",
    salaryRange: "18-30 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Build data pipelines to process billions of user actions. Enable analytics for user behavior, fantasy engagement metrics, and marketing intelligence.",
    requirements: [
      "Python or Scala for massive data engineering pipelines",
      "Apache Spark and Hadoop big data file systems",
      "Workflow scheduling with Apache Airflow or Prefect",
      "BigQuery or Snowflake cluster modeling"
    ],
    datePosted: "2026-06-01",
    active: true
  },

  // 20. Unacademy
  {
    id: "job_unacademy_1",
    title: "Software Engineer SDE II - Live Streams",
    companyId: "comp_20",
    companyName: "Unacademy",
    location: "Bangalore",
    salaryRange: "18-30 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build and scale Unacademy's live classroom platform. Work on WebRTC channels, live messaging, student polls, and interactive quiz tools.",
    requirements: [
      "Node.js or Python backend with custom microservices",
      "WebRTC socket orchestration and video streaming protocols",
      "MongoDB database modeling with Redis key clustering",
      "Dockerized AWS container clusters deployment"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_unacademy_2",
    title: "Principal Educator - Computer Science & Coding",
    companyId: "comp_20",
    companyName: "Unacademy",
    location: "Remote",
    salaryRange: "15-25 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Create and deliver high-quality video content for computer science courses (programming, DSA, system design). Engage with students and mentor.",
    requirements: [
      "Exceptional subject command in CS & algorithms",
      "Engaging screen presentation and whiteboard writing",
      "Prior student coaching or university teaching record",
      "Bilingual fluency in Hindi and English"
    ],
    datePosted: "2026-06-01",
    active: true
  }
];

/*
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
  },
  {
    id: "job_9",
    title: "Cloud Solutions Architect",
    companyId: "comp_4",
    companyName: "Tata Consultancy Services",
    location: "Mumbai",
    salaryRange: "18-25 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "Lead the cloud design division to design enterprise architecture scaling mechanisms, secure multi-region backup systems and disaster recovery architectures.",
    requirements: [
      "5+ years in Enterprise Cloud Orchestration on AWS, Azure, or Google Cloud",
      "Certifications in Cloud Architecture (Google Cloud PCA, AWS Solution Architect Pro)",
      "Vast knowledge in microservices routing patterns and API gateways"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_10",
    title: "Cybersecurity Analyst",
    companyId: "comp_5",
    companyName: "Wipro Technologies",
    location: "Bangalore",
    salaryRange: "9-14 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Proactively monitor network operations, perform vulnerability scans, and implement robust digital threat identification protocols for modern FinTech partners.",
    requirements: [
      "3+ years managing standard SOC procedures or performing red-team penetration checks",
      "Robust knowledge of Kali Linux, Wireshark, Splunk, or Metasploit",
      "Industry certifications like CEH (Certified Ethical Hacker) or CompTIA Security+"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_11",
    title: "Full-Stack Engineer (Node.js & React)",
    companyId: "comp_7",
    companyName: "Flipkart Commerce",
    location: "Bangalore",
    salaryRange: "14-22 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Design state-of-the-art e-commerce pathways, constructing rapid payment integrations, dynamic shopping cards, and high-performance server microservices.",
    requirements: [
      "4+ years deploying high-scale Node.js backends and complex React frontends",
      "Extensive experience working with Redis, Kafka, and PostgreSQL queries",
      "Prior exposure to high-load digital retail deployments"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_12",
    title: "Financial Risk Manager",
    companyId: "comp_6",
    companyName: "HDFC Bank Hub",
    location: "Mumbai",
    salaryRange: "12-16 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Formulate strategic asset evaluations, analyze portfolio risk indexes, and outline strict credit compliance configurations to protect digital banking assets.",
    requirements: [
      "4+ years modeling credit/market risk parameters in commercial banks",
      "Professional credentials like FRM certificate or CFA designation valued",
      "Expert skills in quantitative spreadsheet modeling and Python finance suites"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_13",
    title: "Product Lead - Logistics Systems",
    companyId: "comp_8",
    companyName: "Swiggy Delivery Tech",
    location: "Remote",
    salaryRange: "20-28 LPA",
    jobType: "Contract",
    experienceLevel: 6,
    description: "Take command of Swiggy's logistics dispatcher systems, implementing AI-driven routing heuristics and dynamic supply-demand models to minimize delivery intervals.",
    requirements: [
      "6+ years directing product management efforts for heavy delivery services or maps",
      "Excellent technical communications skills translating maps APIs into visual structures",
      "Outstanding analytical framework with a solid background in data-driven decision making"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_14",
    title: "Machine Learning Specialist",
    companyId: "comp_4",
    companyName: "Tata Consultancy Services",
    location: "Bangalore",
    salaryRange: "14-20 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Integrate LLMs, semantic text recognition engines, and image processing tools into smart workflow software for national utility providers.",
    requirements: [
      "3+ years programming production-ready neural networks (PyTorch/TensorFlow)",
      "Expert knowledge of vector embedding layouts, Pinecone, and langchain models",
      "Master's Degree in Computer Science, Applied Mathematics, or similar fields"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_15",
    title: "Backend Systems Engineer",
    companyId: "comp_5",
    companyName: "Wipro Technologies",
    location: "Hyderabad",
    salaryRange: "9-14 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Join our core backend systems team at Wipro to scale high-throughput REST and gRPC services. You will build resilient internal APIs that power secure telecommunication clients globally.",
    requirements: [
      "3+ years building backend systems using Java Spring Boot, Go, or Node.js",
      "Proficiency with distributed queues such as RabbitMQ or Apache Kafka",
      "Excellent database design skills with SQL databases like PostgreSQL"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_16",
    title: "iOS Application Developer",
    companyId: "comp_7",
    companyName: "Flipkart Commerce",
    location: "Bangalore",
    salaryRange: "12-18 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Fulfill core design patterns and build incredible shopping interfaces for millions of iOS consumers. Responsibilities include building elegant SwiftUI elements, maintaining persistent offline-first features, and optimizing launch latency.",
    requirements: [
      "4+ years of professional iOS lifecycle delivery in Swift and Objective-C",
      "Solid familiarity with iOS profiling tools, memory management, and CoreData",
      "Experience delivering highly interactive views using modern UI frameworks"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_17",
    title: "DevOps & Platform Architect",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Pune",
    salaryRange: "15-22 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "Direct the infrastructure deployment patterns for heavy enterprise clients. You will manage automated cloud deployments, implement reliable infrastructure-as-code scripts, and reduce server resource overhead via container operations.",
    requirements: [
      "5+ years in DevOps operations focusing on infrastructure-as-code automation",
      "Vast experience writing Terraform configurations, Ansible scripts, and Helm charts",
      "Deep experience managing active Kubernetes container orchestrations"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_18",
    title: "Corporate Treasury Analyst",
    companyId: "comp_6",
    companyName: "HDFC Bank Hub",
    location: "Mumbai",
    salaryRange: "10-14 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Analyze liquidity requirements, prepare risk assessments for various asset categories, and optimize cash management flows across domestic bank divisions. You will work closely with executive decision builders to minimize risk ratios.",
    requirements: [
      "3+ years in Treasury, Corporate Finance, or financial modeling environments",
      "Strong grip on asset liability management principles and regulatory compliance",
      "Proficient analytical modeling utilizing MS Excel and quantitative finance tools"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_19",
    title: "Android App Engineer",
    companyId: "comp_8",
    companyName: "Swiggy Delivery Tech",
    location: "Bangalore",
    salaryRange: "11-16 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Work on the Swiggy Delivery Android Application to improve location polling, secure payment flows, and implement dynamic custom views for partner apps. You will contribute to offline-friendly delivery tracking modules.",
    requirements: [
      "3+ years of professional Android creation utilizing Kotlin and Jetpack Compose",
      "Familiarity with Google Maps SDK and custom background services for GPS",
      "Solid grip on reactive architectures using RxJava or Kotlin Coroutines"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_20",
    title: "Senior UX Writer",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Remote",
    salaryRange: "6-9 LPA",
    jobType: "Remote",
    experienceLevel: 3,
    description: "Develop clear, encouraging, and human-sounding microcopy for the Reliance Digital storefront and checkout applications. Define core content guidelines and coordinate cohesive terminology with design and product divisions.",
    requirements: [
      "3+ years craft-writing UX copy, product guidelines, or microcopy",
      "A strong portfolio proving clear flow descriptions, button actions, and error helpers",
      "Basic familiarity with Figma and agile product design sprints"
    ],
    datePosted: "2026-05-30",
    active: true
  },
  {
    id: "job_21",
    title: "Quality Assurance Automation Engineer",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Chennai",
    salaryRange: "7-11 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Build, scale, and execute automated regression test suites to ensure reliable e-commerce and enterprise software delivery. You will write robust test integrations to trace active APIs and simulated client behaviors.",
    requirements: [
      "2+ years writing test suites with Selenium, Cypress, Playwright, or Appium",
      "Strong programming skills in JavaScript/TypeScript, Python, or Java",
      "Complete understanding of QA methodologies, pipeline testings, and bug-tracking suites"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_22",
    title: "Product Specialist - FinTech APIs",
    companyId: "comp_6",
    companyName: "HDFC Bank Hub",
    location: "Delhi",
    salaryRange: "14-20 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Manage the developer integration tools for corporate payment portals. You will translate banking regulations and partner developer requests into clean integration specs, SDK requirements, and visual API playgrounds.",
    requirements: [
      "4+ years serving as Product Manager, Technical Analyst, or Solutions Engineer in FinTech",
      "Deep technical curiosity about REST APIs, webhooks, and open banking protocols",
      "Excellent cross-divisional collaboration and client communication abilities"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_23",
    title: "Enterprise Software Sales Executive",
    companyId: "comp_4",
    companyName: "Tata Consultancy Services",
    location: "Gurgaon",
    salaryRange: "8-12 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Drive scalable sales conversations with large manufacturing clients across northern India. Work directly with high-level directors to showcase technical products, formulate proposals, and secure commercial software contracts.",
    requirements: [
      "3+ years selling enterprise SaaS or massive software consults in India",
      "Exceptional communication, presentation, and sales negotiation techniques",
      "Proven track record hitting quarterly targets and structuring deals"
    ],
    datePosted: "2026-05-25",
    active: true
  },
  {
    id: "job_24",
    title: "Technical Support Lead",
    companyId: "comp_5",
    companyName: "Wipro Technologies",
    location: "Kolkata",
    salaryRange: "5-8 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Direct the tier-3 technical support squad for critical medical equipment client software. You will handle incident resolutions, analyze complex system log entries, and coordinate bug reports with product engineering.",
    requirements: [
      "3+ years managing client-facing IT support or technical operations",
      "Expert knowledge of Linux commands, SQL query scripts, and networking protocols",
      "Exceptional empathy and patient customer management demeanor"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_25",
    title: "Data Analytics Engineer",
    companyId: "comp_7",
    companyName: "Flipkart Commerce",
    location: "Bangalore",
    salaryRange: "10-15 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Convert complex customer order parameters and delivery metrics into fast, reliable charts and dashboards. Implement clean DBT data pipelines to feed accurate datasets and empower executive decision builders.",
    requirements: [
      "3+ years building data structures using SQL, Python, and DBT",
      "Vast experience writing complex analytical models on Snowflake or BigQuery",
      "Ability to parse and structure unstructured web logs into reporting pipelines"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_26",
    title: "Scrum Master - Agile Release",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Noida",
    salaryRange: "12-16 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Facilitate agile ceremonies and scrum protocols across multiple platform engineering teams. Focus on tracking team velocity, eliminating systemic roadblocks, and coaching team players to deliver quality deliverables.",
    requirements: [
      "4+ years practicing Scrum Master roles inside prominent IT enterprises",
      "Professional Scrum Master certification (PSM I/II) or Certified ScrumMaster (CSM)",
      "Mastery of JIRA workflow customization, confluence configurations, and reporting panels"
    ],
    datePosted: "2026-05-28",
    active: true
  },
  {
    id: "job_27",
    title: "Senior Node.js Developer",
    companyId: "comp_8",
    companyName: "Swiggy Delivery Tech",
    location: "Remote",
    salaryRange: "14-19 LPA",
    jobType: "Remote",
    experienceLevel: 4,
    description: "Construct robust, high-performance backends to parse millions of driver operations daily. You will tune API execution speeds, design secure microservices, and ensure database queries perform under highly concentrated loads.",
    requirements: [
      "4+ years deploying microservices using Node.js, Express, Fastify, and TypeScript",
      "Intimate familiarity with caching paradigms like Redis and search utilities like Elasticsearch",
      "Outstanding background in asynchronous JavaScript programming models and server architectures"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_28",
    title: "Brand Operations Manager",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Mumbai",
    salaryRange: "9-13 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Oversee brand positioning and collaborative campaigns for high-end electronic items. Design active promotional schedules, govern physical and digital retail placements, and monitor performance outcomes across territories.",
    requirements: [
      "3+ years managing consumer brand strategies or physical retail promotions",
      "Deep analytical skills to analyze market trends and track product margins",
      "Dynamic interpersonal capability directing external suppliers and marketing groups"
    ],
    datePosted: "2026-05-24",
    active: true
  },
  {
    id: "job_29",
    title: "Database Administrator",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Hyderabad",
    salaryRange: "11-15 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Maximize enterprise database availability, secure relational systems, and direct structural tuning operations. Maintain reliable cloud servers and write automated procedures for safety backups.",
    requirements: [
      "4+ years managing high-availability Oracle or SQL Server database structures",
      "Exceptional knowledge of query optimization, indexing parameters, and query execution planning",
      "Familiarity with replication rules, cloud DB engines, and access logging regulations"
    ],
    datePosted: "2026-05-21",
    active: true
  },
  {
    id: "job_30",
    title: "Visual Graphic Artist",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Ahmedabad",
    salaryRange: "4-7 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Provide engaging commercial layouts, custom icons, and video content for software product promotion campaigns. Work with web design leads to supply polished vector elements.",
    requirements: [
      "2+ years producing vector designs, interface graphics, and commercial assets",
      "Great knowledge of Adobe Illustrator, Photoshop, Figma, and AfterEffects",
      "Highly creative design mindset emphasizing strong color, grid, and layout rules"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_31",
    title: "Golang Microservices Developer",
    companyId: "comp_7",
    companyName: "Flipkart Commerce",
    location: "Bangalore",
    salaryRange: "16-24 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Develop hyper-scalable Golang microservices that integrate into Flipkart's main checkout pipeline. Optimize memory footprints, maintain precise RPC handlers, and ensure near-zero downtime under heavy sale seasons.",
    requirements: [
      "4+ years coding robust Go applications in modern cloud architectures",
      "Expert knowledge of concurrency models, Go routines, and channel processing",
      "Deep experience utilizing Redis caching, gRPC, and PostgreSQL"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_32",
    title: "Senior Investment Analyst",
    companyId: "comp_6",
    companyName: "HDFC Bank Hub",
    location: "Mumbai",
    salaryRange: "18-24 LPA",
    jobType: "Full-time",
    experienceLevel: 5,
    description: "Perform quantitative valuations on corporate assets, monitor economic market reports, and design premium pitch materials for commercial banking groups. Support major equity acquisitions in key markets.",
    requirements: [
      "5+ years performing investment reviews, asset research, or valuation practices",
      "Solid CFA or CA qualifications highly valued for this expert role",
      "Excellent communicative skills translating financial metrics into executive actions"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_33",
    title: "Salesforce Solution Specialist",
    companyId: "comp_5",
    companyName: "Wipro Technologies",
    location: "Gurgaon",
    salaryRange: "10-15 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Tune and customize Salesforce architectures, including configuring complex flow mechanics, building robust API linkages, and developing Lightning Web Components for business partners.",
    requirements: [
      "3+ years managing Salesforce platforms using Apex, Visualforce, or LWC",
      "Salesforce Developer or Platform App Builder certificates preferred",
      "Familiarity with cloud integrations, database structures, and CRM systems"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_34",
    title: "Technical Content Editor",
    companyId: "comp_2",
    companyName: "Infosys India",
    location: "Remote",
    salaryRange: "5-7 LPA",
    jobType: "Remote",
    experienceLevel: 2,
    description: "Formulate clean documentation templates, rewrite code integration manuals, and edit whitepapers addressing our cloud services. Translate developer outputs into legible materials for external readers.",
    requirements: [
      "2+ years writing technical logs, software guides, or developer api documentation",
      "Basic experience reading code snippets in Java, Python, or JavaScript",
      "Excellent grasp of English grammar, layout styling, and structural clarity"
    ],
    datePosted: "2026-05-20",
    active: true
  },
  {
    id: "job_35",
    title: "Principal AI Research Scientist",
    companyId: "comp_4",
    companyName: "Tata Consultancy Services",
    location: "Pune",
    salaryRange: "25-35 LPA",
    jobType: "Full-time",
    experienceLevel: 7,
    description: "Pioneer AI system solutions for intelligent healthcare diagnostic tools. You will lead research initiatives constructing domain-specific deep learning networks, authoring research plans, and translating prototypes to optimized software solutions.",
    requirements: [
      "7+ years modeling advanced AI engines across vision and natural text understanding",
      "PhD or Master's in Mathematical Sciences, Deep Learning, or Computer Engineering",
      "Prior publications at premier ML conferences (NeurIPS, CVPR, ICML) highly appreciated"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_36",
    title: "Corporate Operations Coordinator",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Delhi",
    salaryRange: "6-9 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Govern supply processes, organize logistics scheduling, and lead internal team coordination for main retail locations in northern India. Ensure regional showrooms operate optimally.",
    requirements: [
      "2+ years inside logistics, corporate office operations, or supply-chain coordination",
      "High reliability managing spreadsheet tools and tracking inventory metrics",
      "Dynamic interpersonal abilities to align physical store needs with warehouses"
    ],
    datePosted: "2026-05-18",
    active: true
  },
  {
    id: "job_37",
    title: "Information Technology Auditor",
    companyId: "comp_1",
    companyName: "Tech Mahindra Solutions",
    location: "Coimbatore",
    salaryRange: "8-12 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Audit business application controls, verify platform access controls, and evaluate network safety parameters according to regional IT laws. Partner with IT security heads to isolate platform vulnerabilities.",
    requirements: [
      "3+ years in IT audit practice, systems evaluation, or information security",
      "Credentials like CISA (Certified Information Systems Auditor) or equivalent",
      "Rigorous analytical mindset with complete respect for data privacy regulations"
    ],
    datePosted: "2026-05-22",
    active: true
  },
  {
    id: "job_38",
    title: "React Native Developer",
    companyId: "comp_8",
    companyName: "Swiggy Delivery Tech",
    location: "Bangalore",
    salaryRange: "12-17 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Build responsive cross-platform mobile app interfaces utilizing React Native. Improve frame refresh metrics, configure clean deep-link systems, and unify core component APIs across Android and iOS deployments.",
    requirements: [
      "4+ years deploying functional React Native mobile applications",
      "Mastery of Redux Toolkit, reactive UI patterns, and native bridge configurations",
      "Deep familiarity with Apple App Store and Google Play console publishing frameworks"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_39",
    title: "Search Engine Optimization Analyst",
    companyId: "comp_7",
    companyName: "Flipkart Commerce",
    location: "Chennai",
    salaryRange: "5-8 LPA",
    jobType: "Full-time",
    experienceLevel: 2,
    description: "Audit organic keyword structures, optimize metadata layouts, and track key index results for the consumer brand divisions. Collaborate with editorial squads to increase search rank parameters.",
    requirements: [
      "2+ years tracking digital ranking indexes on massive consumer interfaces",
      "Expert mastery of SEO audit suites like Ahrefs, SEMrush, and Screaming Frog",
      "Good competence in data modeling using Excel spreadsheets and GA4 analytics"
    ],
    datePosted: "2026-06-01",
    active: true
  },
  {
    id: "job_40",
    title: "Solutions Sales Specialist",
    companyId: "comp_5",
    companyName: "Wipro Technologies",
    location: "Kochi",
    salaryRange: "7-11 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Present Wipro's specialized cloud consulting solutions to commercial prospects across southern India. Lead live demos, construct strategic pricing bids, and manage regional account relationships.",
    requirements: [
      "3+ years representing custom software consulting or standard platform accounts",
      "Familiarity with pricing models for cloud resources, infrastructure, or SaaS systems",
      "Great communicative skills translating IT complexities into clear business values"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_41",
    title: "Security Compliance Officer",
    companyId: "comp_6",
    companyName: "HDFC Bank Hub",
    location: "Mumbai",
    salaryRange: "14-19 LPA",
    jobType: "Full-time",
    experienceLevel: 4,
    description: "Enforce high security operations conformity on digital financial gateways. Align system safety audits with RBI laws, lead periodic mock evaluations, and formulate response plans for safety incidents.",
    requirements: [
      "4+ years enforcing security standards inside commercial banks or finance firms",
      "Intimate awareness of PCI-DSS standards, ISO 27001 models, and local rules",
      "Professional certifications such as CISSP, CISM, or similar security validation"
    ],
    datePosted: "2026-06-02",
    active: true
  },
  {
    id: "job_42",
    title: "Retail Procurement Manager",
    companyId: "comp_3",
    companyName: "Reliance Digital",
    location: "Jaipur",
    salaryRange: "8-12 LPA",
    jobType: "Full-time",
    experienceLevel: 3,
    description: "Govern inventory allocations, negotiate supply parameters with major home appliance manufacturers, and reduce resource purchase overheads for retail hubs in western India.",
    requirements: [
      "3+ years leading procurement workflows, retail supplies, or inventory purchases",
      "Highly capable analyst maximizing supplier performance and tracking invoice cycles",
      "Polished negotiation techniques and direct contracting proficiency"
    ],
    datePosted: "2026-05-20",
    active: true
  }
];
*/

export const ADMIN_ACCOUNT: User = {
  id: "admin_user",
  email: "admin@careerconnectindia.com",
  password: "admin123",
  role: "admin",
  name: "CCI Admin Controller",
  profilePhotoEmoji: "👑",
  blocked: false
};

export const INITIAL_APPLICATIONS: Application[] = [];

export function initLocalStorage() {
  if (typeof window === "undefined") return;

  // Run-once migration to delete all existing companies, jobs, applications and saved jobs as requested
  if (!localStorage.getItem("cci_deleted_all_jobs_and_companies_v1")) {
    localStorage.setItem("cci_companies", JSON.stringify([]));
    localStorage.setItem("cci_jobs", JSON.stringify([]));
    localStorage.setItem("cci_applications", JSON.stringify([]));
    localStorage.setItem("cci_saved_jobs", JSON.stringify([]));
    localStorage.setItem("cci_deleted_all_jobs_and_companies_v1", "true");
  }

  const defaultUsers = [
    ADMIN_ACCOUNT,
    ...INITIAL_SEEKERS,
    ...INITIAL_COMPANY_USERS
  ];

  // Seeding the newly requested 20 premier companies and 40 active jobs dataset in Version 2.0
  if (!localStorage.getItem("cci_seeded_premier_data_v2")) {
    localStorage.setItem("cci_companies", JSON.stringify(INITIAL_COMPANIES));
    localStorage.setItem("cci_jobs", JSON.stringify(INITIAL_JOBS));
    localStorage.setItem("cci_users", JSON.stringify(defaultUsers));
    localStorage.setItem("cci_applications", JSON.stringify([]));
    localStorage.setItem("cci_saved_jobs", JSON.stringify([]));
    localStorage.setItem("cci_seeded_premier_data_v2", "true");
  }

  // 1. Seed & Merge Users
  const existingUsersStr = localStorage.getItem("cci_users");
  if (!existingUsersStr) {
    localStorage.setItem("cci_users", JSON.stringify(defaultUsers));
  } else {
    try {
      const currentUsers: User[] = JSON.parse(existingUsersStr);
      const updatedUsers = [...currentUsers];
      let changed = false;
      for (const u of defaultUsers) {
        if (!currentUsers.some((existing) => existing.id === u.id)) {
          updatedUsers.push(u);
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem("cci_users", JSON.stringify(updatedUsers));
      }
    } catch (e) {
      localStorage.setItem("cci_users", JSON.stringify(defaultUsers));
    }
  }

  // 2. Seed & Merge Companies
  const existingCompaniesStr = localStorage.getItem("cci_companies");
  if (!existingCompaniesStr) {
    localStorage.setItem("cci_companies", JSON.stringify(INITIAL_COMPANIES));
  } else {
    try {
      const currentCompanies: Company[] = JSON.parse(existingCompaniesStr);
      const updatedCompanies = [...currentCompanies];
      let changed = false;
      for (const c of INITIAL_COMPANIES) {
        const existingIdx = updatedCompanies.findIndex((existing) => existing.id === c.id);
        if (existingIdx === -1) {
          updatedCompanies.push(c);
          changed = true;
        } else {
          const existing = updatedCompanies[existingIdx];
          let itemChanged = false;
          if (existing.logoUrl !== c.logoUrl) { existing.logoUrl = c.logoUrl; itemChanged = true; }
          if (existing.logoEmoji !== c.logoEmoji) { existing.logoEmoji = c.logoEmoji; itemChanged = true; }
          if (existing.name !== c.name) { existing.name = c.name; itemChanged = true; }
          if (existing.description !== c.description) { existing.description = c.description; itemChanged = true; }
          if (existing.website !== c.website) { existing.website = c.website; itemChanged = true; }
          if (existing.industry !== c.industry) { existing.industry = c.industry; itemChanged = true; }
          if (existing.location !== c.location) { existing.location = c.location; itemChanged = true; }
          if (existing.companySize !== c.companySize) { existing.companySize = c.companySize; itemChanged = true; }
          if (itemChanged) {
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem("cci_companies", JSON.stringify(updatedCompanies));
      }
    } catch (e) {
      localStorage.setItem("cci_companies", JSON.stringify(INITIAL_COMPANIES));
    }
  }

  // 3. Seed & Merge Jobs
  const existingJobsStr = localStorage.getItem("cci_jobs");
  if (!existingJobsStr) {
    localStorage.setItem("cci_jobs", JSON.stringify(INITIAL_JOBS));
  } else {
    try {
      const currentJobs: Job[] = JSON.parse(existingJobsStr);
      const updatedJobs = [...currentJobs];
      let changed = false;
      for (const j of INITIAL_JOBS) {
        if (!currentJobs.some((existing) => existing.id === j.id)) {
          updatedJobs.push(j);
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem("cci_jobs", JSON.stringify(updatedJobs));
      }
    } catch (e) {
      localStorage.setItem("cci_jobs", JSON.stringify(INITIAL_JOBS));
    }
  }

  // 4. Seed Applications
  if (!localStorage.getItem("cci_applications")) {
    localStorage.setItem("cci_applications", JSON.stringify(INITIAL_APPLICATIONS));
  }

  // 5. Seed Saved Jobs
  if (!localStorage.getItem("cci_saved_jobs")) {
    localStorage.setItem("cci_saved_jobs", JSON.stringify([]));
  }

  // 6. Synchronize cci_users to the custom users key with requested schema
  const updatedCciUsers = localStorage.getItem("cci_users");
  if (updatedCciUsers) {
    try {
      const parsedUsers = JSON.parse(updatedCciUsers);
      const mappedForUsersKey = parsedUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        password: u.password,
        role: u.role === "company" ? "recruiter" : u.role,
        companyName: u.companyName || (u.companyId ? "Verified Recruiter" : undefined),
        createdAt: u.createdAt || "2026-06-02",
        profile: u.profile || { skills: "", experience: "", resume: "" }
      }));
      localStorage.setItem("users", JSON.stringify(mappedForUsersKey));
    } catch (e) {
      // ignore
    }
  }
}
