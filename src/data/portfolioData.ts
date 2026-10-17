import { Project, Service, Article, PinnedRepo } from '@/types';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mubasshirali0710.github.io/Mubasshir-portfolio';

export const PERSONAL_INFO = {
  name: 'Mubasshir Ali',
  title: 'Software Engineer | Full-Stack & AI-Integrated Systems',
  tagline: 'I build AI-powered SaaS tools that ship to production.',
  subline: 'MERN + LLM agents, from idea to deployment. Engineering production-ready web apps with Razorpay billing, webhook idempotency, and zero hallucination risk.',
  location: 'Bengaluru, India (Available Worldwide Remote)',
  email: 'mubasshirali0710@gmail.com',
  phone: '+91 70031 51313',
  whatsappUrl: 'https://wa.me/917003151313?text=Hi%20Mubasshir%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.',
  github: 'https://github.com/MUBASSHIRALI0710',
  linkedin: 'https://linkedin.com/in/mubasshir-ali0710',
  twitter: 'https://twitter.com/mubasshirali',
  siteUrl: SITE_URL,
  calendly: 'https://calendly.com',
  status: '🟢 Available for freelance — 2 slots open for Q1 2027',
  availabilityDate: '2 slots open for Q1 2027',
  responseTime: 'Usually replies within 24 hours (often under 2 hours)',
  education: {
    institution: 'Maulana Abul Kalam Azad University of Technology, West Bengal',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    gpa: '8.57 / 10',
  },
  experience: {
    company: 'AiKing Solutions',
    role: 'Next.js Developer Intern',
    period: 'Aug 2026 – Present',
    highlights: [
      'Own full-stack development of NanoBrowser SaaS, a subscription-based AI browser-automation Chrome extension built on an open-source base; architected backend with Node.js, TypeScript, Express.js, and MongoDB.',
      'Integrated Razorpay payment gateway across a 3-tier subscription model, including webhook-based billing events and a fully verified end-to-end checkout flow.',
      'Led migration of core LLM infrastructure from OpenAI to AWS Bedrock, integrating Amazon Nova Lite for tool-calling-based browser automation agents.',
      'Implemented JWT authentication and Zod schema validation across backend APIs; conducted phased security audits and resolved critical and high-severity findings.',
      'Owned deployment pipeline — MongoDB Atlas production setup and backend deployment on Render — alongside Chrome extension builds and end-to-end testing.'
    ]
  },
  certifications: [
    'Legacy Responsive Web Design — freeCodeCamp (2026)',
    'C++ Data Structures & Algorithms — Coder Army (2025)'
  ],
  achievements: [
    'Solved 200+ DSA problems on LeetCode',
    'Participated in the 2023 NASA International Space Apps Challenge (57,900+ participants, 152 countries) as part of a competing team'
  ],
  trustSignals: [
    'Next.js Developer Intern at AiKing Solutions',
    'Shipped NanoBrowser SaaS (AWS Bedrock + Razorpay)',
    'Razorpay-integrated webhook payment billing',
    '8.57/10 GPA in Computer Science & Engineering',
  ],
  stats: [
    { label: 'Degree GPA', value: '8.57/10' },
    { label: 'LeetCode DSA', value: '200+' },
    { label: 'Throughput Lift', value: '4x' },
    { label: 'Refund Test Pass', value: '7/7' },
  ],
  currently: {
    building: 'NanoBrowser SaaS & Multi-Agent Browser Automation with Amazon Nova Lite',
    reading: 'Designing Data-Intensive Applications by Martin Kleppmann',
    exploring: 'AWS Bedrock Tool-Calling, Groq LLM Function Calling, Chrome Manifest V3',
    focus: 'Shipping production subscription-based SaaS products with verifiable guardrails',
  },
};

export const GITHUB_PINNED_REPOS: PinnedRepo[] = [
  {
    name: 'NanoBrowser SaaS – AI Browser Automation Extension',
    repoUrl: 'https://github.com/MUBASSHIRALI0710',
    demoUrl: '#work',
    description: 'Commercial subscription-based SaaS built on top of an open-source AI browser-automation tool. Planner/Navigator agent architecture (Amazon Nova Lite via AWS Bedrock) automating LinkedIn Easy Apply with Razorpay billing.',
    whatThisProves: 'Shipped a commercial subscription-based SaaS product with AWS Bedrock tool-calling, 3-tier Razorpay checkout, and webhook idempotency — production-ready.',
    stack: ['Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'AWS Bedrock', 'Razorpay', 'Chrome Extension'],
  },
  {
    name: 'AI Refund Support Agent (Groq LLM Tool-Calling)',
    repoUrl: 'https://github.com/MUBASSHIRALI0710',
    demoUrl: '#work',
    description: 'Autonomous AI agent handling e-commerce refund requests end-to-end. Validates orders against 6 policy rules, auto-approving or flagging high-value ($500+) orders with real-time reasoning chain dashboard.',
    whatThisProves: 'Operated strictly through 7 tool-calling functions with backend verification preventing ineligible refunds even under adversarial input (7/7 test scenarios passed).',
    stack: ['Next.js 15', 'React 19', 'Node.js', 'Express.js', 'Groq LLM', 'Function Calling'],
  },
  {
    name: 'AttendPro – Smart Attendance Management System',
    repoUrl: 'https://github.com/MUBASSHIRALI0710',
    demoUrl: '#work',
    description: 'Full-stack attendance management system with CRUD operations, date-wise tracking, search/filtering, duplicate roll-number validation, and analytics charts.',
    whatThisProves: 'Architected responsive full-stack dashboards with JWT authentication and MongoDB Atlas data models, deployed on Vercel and Render.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'nanobrowser-saas',
    title: 'NanoBrowser SaaS – AI Browser Automation Extension',
    tagline: 'Commercial subscription-based AI browser automation extension powered by AWS Bedrock & Razorpay',
    clientProblem: 'Users needed to automate repetitive web tasks like LinkedIn Easy Apply workflows without supplying their own expensive LLM API keys or getting rate-limited.',
    whatYouBuilt: 'Engineered a commercial subscription-based SaaS on top of an open-source AI browser automation tool. Designed a Planner/Navigator agent architecture using Amazon Nova Lite via AWS Bedrock. Integrated Razorpay across a 3-tier subscription model with webhook-driven billing, JWT authentication, and Zod schema validation.',
    problem: 'Automating multi-step browser interactions with LLM tool-calling while keeping subscription billing idempotent and secure.',
    approach: 'Led migration from OpenAI to AWS Bedrock (Amazon Nova Lite) for lower latency and cost efficiency. Implemented strict backend verification and deployed on Render with MongoDB Atlas.',
    architecture: [
      'Chrome Extension Manifest V3 background service workers with offscreen processing',
      'Planner/Navigator multi-agent architecture with Amazon Nova Lite via AWS Bedrock',
      'Razorpay payment gateway integration across 3-tier subscription with idempotent webhooks',
      'JWT authentication, Zod schema validation, and Render cloud deployment'
    ],
    stack: ['Node.js', 'TypeScript', 'Express.js', 'MongoDB', 'AWS Bedrock', 'Razorpay', 'Render'],
    metrics: [
      { label: 'Architecture', value: 'Planner/Nav' },
      { label: 'LLM Engine', value: 'Nova Lite' },
      { label: 'Subscription Flow', value: '3-Tier' },
    ],
    demoUrl: 'https://github.com/MUBASSHIRALI0710',
    githubUrl: 'https://github.com/MUBASSHIRALI0710',
    featured: true,
    category: 'ai',
    badge: 'Production SaaS',
    whatThisProves: 'Shipped a commercial subscription-based SaaS product with AWS Bedrock tool-calling, 3-tier Razorpay checkout, and webhook idempotency — production-ready.',
    insideTheBuild: {
      title: 'AWS Bedrock Migration & Razorpay Webhooks',
      description: 'Migrated LLM infrastructure from OpenAI to AWS Bedrock integrating Amazon Nova Lite for cost-effective tool-calling browser automation. Engineered end-to-end checkout with webhook idempotency.',
      highlights: [
        'Automated LinkedIn Easy Apply workflows without user-supplied API keys',
        'Zod schema validation across all backend endpoints resolving security audit findings',
        'MongoDB Atlas production setup and CI/CD deployment on Render'
      ]
    }
  },
  {
    id: 'ai-refund-agent',
    title: 'AI Refund Support Agent (Groq LLM Function Calling)',
    tagline: 'Autonomous refund resolution agent validating against 6 policy rules with 7 tool-calling functions',
    clientProblem: 'E-commerce merchants lose hours manually auditing return requests, frequently suffering from fraud or accidental refund approvals.',
    whatYouBuilt: 'Built an autonomous AI agent that handles e-commerce refund requests end-to-end. Validates orders against 6 strict policy rules, auto-approving valid requests, denying fraudulent ones, and flagging high-value orders ($500+) for human review. Built an admin dashboard showing the agent\'s real-time reasoning chain.',
    problem: 'Preventing ineligible or fraudulent refunds even under adversarial customer input.',
    approach: 'Operated strictly through 7 deterministic tool-calling functions with a backend verification layer. 100% test pass rate (7/7 adversarial scenarios prevented).',
    architecture: [
      'Next.js 15 App Router + React 19 frontend with real-time reasoning visualization',
      'Groq LLM ultra-fast inference with deterministic function calling',
      '7 tool-calling functions verifying order status, delivery date, item condition, and fraud flags',
      'Adversarial input guardrails ensuring zero unauthorized database mutations'
    ],
    stack: ['Next.js 15', 'React 19', 'Node.js', 'Express.js', 'Groq LLM', 'Tailwind CSS'],
    metrics: [
      { label: 'Adversarial Test Pass', value: '7 / 7' },
      { label: 'Policy Rules Checked', value: '6 Rules' },
      { label: 'High-Value Flagging', value: '$500+' },
    ],
    demoUrl: 'https://github.com/MUBASSHIRALI0710',
    githubUrl: 'https://github.com/MUBASSHIRALI0710',
    featured: true,
    category: 'ai',
    badge: 'LLM Agent',
    whatThisProves: 'Operated strictly through 7 tool-calling functions with a backend verification layer preventing ineligible refunds even under adversarial input.',
    insideTheBuild: {
      title: 'Deterministic Policy Enforcement via 7 Tool Functions',
      description: 'The agent never interacts with the database directly. Instead, every action is mediated through 7 audited tool functions that enforce 6 business rules (30-day window, item condition, fraud score).',
      highlights: [
        'Real-time reasoning chain dashboard letting admins inspect LLM thought steps',
        'Adversarial jailbreak protection tested across 7 rigorous edge-case attacks',
        'Sub-second inference powered by Groq LLM function calling'
      ]
    }
  },
  {
    id: 'attendpro-system',
    title: 'AttendPro – Smart Attendance Management System',
    tagline: 'Full-stack attendance management platform with analytics, date-wise tracking & JWT auth',
    clientProblem: 'Academic departments struggled with duplicate roll-number entries, lost paper attendance logs, and zero visualization into student attendance trends.',
    whatYouBuilt: 'Engineered AttendPro, a full-stack MERN attendance system featuring complete CRUD operations, date-wise tracking, multi-attribute search/filtering, duplicate roll-number validation, and interactive analytics charts.',
    problem: 'Fragmented attendance logging and lack of real-time student participation analytics.',
    approach: 'Designed normalized MongoDB schemas with compound indexing, JWT-authenticated protected routes, and responsive analytics dashboards.',
    architecture: [
      'React.js + Tailwind CSS responsive dashboard with interactive attendance charts',
      'Node.js & Express.js REST API with MVC pattern and JWT auth middleware',
      'MongoDB Atlas database with duplicate roll-number constraint validation',
      'Deployed on Vercel (frontend) and Render (backend)'
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Vercel'],
    metrics: [
      { label: 'Roll Validation', value: 'Zero Dupes' },
      { label: 'Dashboard Tracking', value: 'Date-wise' },
      { label: 'Auth Security', value: 'JWT RBAC' },
    ],
    demoUrl: 'https://github.com/MUBASSHIRALI0710',
    githubUrl: 'https://github.com/MUBASSHIRALI0710',
    featured: true,
    category: 'mern',
    badge: 'Full-Stack MERN',
    whatThisProves: 'Architected responsive full-stack dashboards with JWT authentication and MongoDB Atlas data models, deployed on Vercel and Render.',
    insideTheBuild: {
      title: 'Data Integrity & Date-wise Analytics',
      description: 'Built with compound unique constraints preventing duplicate student roll entries per batch, paired with dynamic Chart.js visualizations.',
      highlights: [
        'Date-wise filtering and multi-parameter student search',
        'Responsive mobile layout allowing teachers to mark attendance in under 30 seconds',
        'Clean MVC backend architecture with protected routes'
      ]
    }
  },
  {
    id: 'diabetes-prediction-ml',
    title: 'AI-Based Clinical Diabetes Prediction System',
    tagline: 'End-to-end machine learning pipeline with SVM classifier deployed on Flask & Render',
    clientProblem: 'Primary diagnostic centers needed an instant risk assessment tool based on clinical telemetry without running cloud-heavy infrastructure.',
    whatYouBuilt: 'Engineered an end-to-end ML pipeline with data preprocessing, median imputation for physiological zeroes, feature engineering, and an RBF Support Vector Machine (SVM) classifier. Integrated into a Flask REST API on Render.',
    problem: 'Delayed diabetic triage in clinics lacking on-site laboratory compute.',
    approach: 'Handled physiological zeroes with median imputation, standardized features with StandardScaler, and tuned an SVM classifier for real-time inference.',
    architecture: [
      'Python data preprocessing with Pandas and NumPy',
      'Support Vector Machine (SVM) binary classifier trained via Scikit-learn',
      'Lightweight Flask REST backend serialized via Joblib',
      'Deployed on Render for public low-latency inference'
    ],
    stack: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'NumPy', 'Render', 'Docker'],
    metrics: [
      { label: 'Clinical Accuracy', value: '77.4%' },
      { label: 'Inference Latency', value: '<95ms' },
      { label: 'Biometrics Analyzed', value: '8 Factors' },
    ],
    demoUrl: 'https://github.com/MUBASSHIRALI0710',
    githubUrl: 'https://github.com/MUBASSHIRALI0710',
    featured: false,
    category: 'ml',
    badge: 'Machine Learning',
    whatThisProves: 'Built an end-to-end ML pipeline from data cleaning and model training to deployment on a live web API.',
    insideTheBuild: {
      title: 'Scikit-learn Pipeline Serialization & Edge API',
      description: 'Serialized the complete StandardScaler + RBF SVM pipeline with Joblib into a lightweight container with <100ms response time.',
      highlights: [
        'Median imputation for physiological zero anomalies in clinical telemetry',
        'Hyperparameter-tuned decision boundary for high recall',
        'REST endpoint accepting 8 clinical parameters with input validation'
      ]
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: 'ai-saas-development',
    title: 'AI-Powered SaaS & LLM Agents',
    badge: 'Most Popular',
    description: 'Transform your concept into an autonomous AI SaaS. From multi-agent browser automation and RAG pipelines to LLM function calling with strict hallucination guardrails.',
    deliverables: [
      'Multi-agent systems (Planner + Navigator) with tool-calling capabilities',
      'AWS Bedrock (Amazon Nova Lite) & Groq LLM function calling integration',
      'Custom RAG pipelines with vector databases (Pinecone / Supabase)',
      'Real-time streaming conversational interfaces with citations',
      'Production deployment on Google Cloud Run, Render, or Vercel'
    ],
    timeframe: '2 – 4 Weeks',
    pricingSignal: 'Typical projects: ₹45,000 – ₹1,20,000 ($1,500 – $3,500)',
    startingAt: 'Starting at ₹45,000 ($1,500)',
    idealFor: 'Founders & startups building AI-first MVPs or adding autonomous agents to existing software.'
  },
  {
    id: 'mern-fullstack-products',
    title: 'MERN Stack Products & Web Apps',
    badge: 'Turnkey Delivery',
    description: 'Complete full-stack web applications engineered from database schema design to high-converting user interfaces. Type-safe, scalable, and payment-integrated.',
    deliverables: [
      'Next.js 15 App Router or React + Node.js/Express architecture',
      'MongoDB Atlas / PostgreSQL database design with indexing and isolation',
      'Razorpay payment gateway integration with webhook idempotency & 3-tier models',
      'Secure JWT authentication, Zod schema validation, and role permissions',
      'High-performance UI with Tailwind CSS and mobile-first responsive design'
    ],
    timeframe: '3 – 5 Weeks',
    pricingSignal: 'Typical projects: ₹35,000 – ₹90,000 ($1,200 – $2,800)',
    startingAt: 'Starting at ₹35,000 ($1,200)',
    idealFor: 'Businesses needing a dependable SaaS, customer portal, or subscription platform.'
  },
  {
    id: 'ai-integration-automation',
    title: 'AI Integration & Workflow Automation',
    badge: 'High ROI',
    description: 'Eliminate repetitive manual operations by connecting your existing CRM, databases, and third-party APIs with modern AI models and background workers.',
    deliverables: [
      'LLM function-calling workflows with deterministic policy guardrails',
      'Custom webhook listeners & background processing workers',
      'Third-party API integrations (Slack, WhatsApp, Resend, Razorpay)',
      'Machine learning model deployments (Scikit-learn, Flask, Docker, Render)',
      'Automated email lead scoring and customer ticket triage'
    ],
    timeframe: '1 – 3 Weeks',
    pricingSignal: 'Typical projects: ₹25,000 – ₹60,000 ($800 – $2,000)',
    startingAt: 'Starting at ₹25,000 ($800)',
    idealFor: 'Agencies and growing teams looking to save 10–20 staff hours every single week.'
  },
  {
    id: 'chrome-extension-development',
    title: 'Chrome Extension Development (Manifest V3)',
    badge: 'Specialized',
    description: 'Production-ready browser extensions with DOM automation, background service workers, and secure API sync. Built to run without triggering bot detection.',
    deliverables: [
      'Manifest V3 compliant background workers and offscreen canvases',
      'DOM interaction with human-like micro-delays to bypass bot filters',
      'Secure authentication and token storage with Chrome Storage API',
      'Backend synchronization with Node.js / MongoDB / REST APIs',
      'Chrome Web Store publishing assistance'
    ],
    timeframe: '1 – 3 Weeks',
    pricingSignal: 'Typical projects: ₹30,000 – ₹75,000 ($1,000 – $2,400)',
    startingAt: 'Starting at ₹30,000 ($1,000)',
    idealFor: 'Startups building workflow automation, scrapers, or browser-based productivity tools.'
  }
];

export const WORK_PROCESS = [
  {
    step: '01',
    title: '15-Min Discovery Call',
    description: 'We discuss your core problem, technical constraints, target launch date, and desired business outcome. Zero pitch, pure technical clarity.',
    timeframe: 'Day 1'
  },
  {
    step: '02',
    title: 'Proposal & Fixed Scope',
    description: 'Within 48 hours, you receive a detailed phased roadmap, recommended tech stack, milestone deliverables, and transparent fixed investment.',
    timeframe: 'Within 48 Hours'
  },
  {
    step: '03',
    title: 'Weekly Sprints with Live Demos',
    description: 'I build in fast 7-day sprints with working demo links at every milestone. You see actual software working instead of waiting for a big reveal.',
    timeframe: 'Weeks 1 – 4'
  },
  {
    step: '04',
    title: 'Launch & 2-Week Warranty',
    description: 'Production deployment to your cloud (AWS/Render/Vercel), complete repository and credential handover, plus 14 days of complimentary bug-fix support.',
    timeframe: 'Launch Day + 14 Days'
  }
];

export const PAYMENT_TERMS = {
  model: 'Fixed-Price Milestone or Dedicated Weekly Retainer',
  split: '50% Upfront on Kick-off • 50% on Verified Production Handover',
  timezone: 'IST (India Standard Time) with overlapping US (EST/PST) and EU hours',
  guarantee: '14-Day Post-Launch Code Warranty + Full Repository IP Handover',
};

export const ARTICLES: Article[] = [
  {
    id: 'production-rag-chunking',
    title: 'Why Naive Chunking Fails in Production RAG (And What Actually Works)',
    summary: 'Splitting documents by arbitrary 500-token blocks creates context fragmentation. Here is how semantic window chunking and hybrid BM25 + dense retrieval solved real customer queries.',
    date: 'Oct 2026',
    readTime: '6 min read',
    category: 'AI Architecture',
    content: `When engineers first build a RAG pipeline...`
  },
  {
    id: 'mern-multitenant-architecture',
    title: 'Architecting Multi-Tenant SaaS with MERN: Schema Isolation & Performance',
    summary: 'A deep dive into building tenant-safe architectures in MongoDB without ballooning cloud infrastructure bills. Indexing strategies, JWT context injection, and avoiding data leaks.',
    date: 'Sep 2026',
    readTime: '8 min read',
    category: 'Full Stack Engineering',
    content: `When building my Coaching Institute SaaS...`
  },
  {
    id: 'svm-diabetes-classifier',
    title: 'Clinical ML in the Browser & Edge: Lessons from Training an SVM on PIMA Biometrics',
    summary: 'How hyperparameter tuning on Radial Basis Functions (RBF) and clinical feature standardization enabled 77.4% test accuracy with 95ms inference times on low-tier hardware.',
    date: 'Aug 2026',
    readTime: '5 min read',
    category: 'Machine Learning',
    content: `Diagnostic machine learning requires a fundamentally different mindset...`
  }
];

export const PRINCIPLES = [
  {
    title: 'Working Software in Days, Not Months',
    description: 'Prototypes clarify product vision faster than 50-page PRDs. I build high-fidelity, functional MVPs within 1-2 weeks so you can test real market validation before sinking capital.',
    tag: 'Velocity'
  },
  {
    title: 'Zero Hallucinations, Verifiable Guardrails',
    description: 'AI that makes up answers destroys user trust. I design deterministic retrieval systems, strict fallback protocols, and inline citation metadata for every generated output.',
    tag: 'Reliability'
  },
  {
    title: 'Obsessive Type Safety & Performance',
    description: 'Strict TypeScript end-to-end, sub-150KB initial JS loads, 60fps animations, and 95+ Core Web Vitals. Fast software converts better and costs less to host.',
    tag: 'Craft'
  },
  {
    title: 'Commercial Empathy Over Pure Code',
    description: 'Great engineering is about driving business outcomes — whether that is automating refund dispute audits, increasing job throughput 4x, or securing subscription checkout.',
    tag: 'Impact'
  }
];

export const TECH_STACK_LOGOS = [
  { name: 'AWS Bedrock', category: 'LLM Orchestration' },
  { name: 'Amazon Nova Lite', category: 'Agent Foundation Model' },
  { name: 'Groq LLM', category: 'Sub-Second Tool Calling' },
  { name: 'Razorpay', category: 'Subscription Billing' },
  { name: 'Next.js 15', category: 'Full-Stack Framework' },
  { name: 'React 19', category: 'Modern Frontend' },
  { name: 'TypeScript', category: 'Type Safety' },
  { name: 'Node.js', category: 'Backend Runtime' },
  { name: 'MongoDB Atlas', category: 'Cloud Database' },
  { name: 'Render', category: 'Backend Hosting' },
  { name: 'Chrome Manifest V3', category: 'Browser Automation' },
  { name: 'Scikit-learn', category: 'Machine Learning' },
];
