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

export const INITIAL_COMPANIES: Company[] = [];

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
  },
  {
    id: "user_comp_4",
    email: "recruiter4@tcs.com",
    password: "password123",
    role: "company",
    name: "Anjali Sen",
    companyId: "comp_4",
    profilePhotoEmoji: "👩‍💼",
    blocked: false
  },
  {
    id: "user_comp_5",
    email: "recruiter5@wipro.com",
    password: "password123",
    role: "company",
    name: "Rohan Das",
    companyId: "comp_5",
    profilePhotoEmoji: "👨‍💼",
    blocked: false
  },
  {
    id: "user_comp_6",
    email: "recruiter6@hdfc.com",
    password: "password123",
    role: "company",
    name: "Karan Saxena",
    companyId: "comp_6",
    profilePhotoEmoji: "💼",
    blocked: false
  },
  {
    id: "user_comp_7",
    email: "recruiter7@flipkart.com",
    password: "password123",
    role: "company",
    name: "Kirti Malhotra",
    companyId: "comp_7",
    profilePhotoEmoji: "👩‍💻",
    blocked: false
  },
  {
    id: "user_comp_8",
    email: "recruiter8@swiggy.com",
    password: "password123",
    role: "company",
    name: "Rohit Verma",
    companyId: "comp_8",
    profilePhotoEmoji: "🙋‍♂️",
    blocked: false
  }
];

export const INITIAL_JOBS: Job[] = [];

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
          if (updatedCompanies[existingIdx].logoUrl !== c.logoUrl) {
            updatedCompanies[existingIdx].logoUrl = c.logoUrl;
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
