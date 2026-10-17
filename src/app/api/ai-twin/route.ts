import { NextRequest, NextResponse } from 'next/server';
import { PERSONAL_INFO } from '@/data/portfolioData';

export interface RAGKnowledgeChunk {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
  citationLabel: string;
  citationUrl?: string;
  actionType?: 'ask_direct' | 'book_call' | 'open_project' | 'none';
  actionPrompt?: string;
  actionUrl?: string;
}

// Production RAG Knowledge Base — Chunks from Resume, GitHub Projects & Published Technical Deep Dives
const KNOWLEDGE_CHUNKS: RAGKnowledgeChunk[] = [
  {
    id: 'exp-aiking',
    topic: 'AiKing Solutions Next.js Developer Internship',
    keywords: [
      'aiking',
      'experience',
      'intern',
      'internship',
      'work',
      'job',
      'company',
      'current role',
      'work history',
      'employer',
      'nanobrowser',
      'aug 2026',
    ],
    content: `Mubasshir Ali is currently working as a **Next.js Developer Intern at AiKing Solutions** (Aug 2026 – Present).

In this role, he:
- Owns full-stack development of **NanoBrowser SaaS**, a commercial subscription-based Chrome extension for AI browser automation.
- Engineered backend with **Node.js, TypeScript, Express.js, and MongoDB**.
- Integrated **Razorpay payment webhooks** supporting a 3-tier subscription model with webhook idempotency.
- Spearheaded the migration of LLM infrastructure from OpenAI to **AWS Bedrock (Amazon Nova Lite)**, cutting operational latency and token costs.
- Implemented **JWT authentication and Zod schema validation** for bulletproof API security.
- Deployed and manages production on **Render with MongoDB Atlas**.`,
    citationLabel: 'Source: AiKing Solutions Experience (Resume)',
    citationUrl: '/about#experience',
    actionType: 'open_project',
    actionPrompt: 'View NanoBrowser Case Study',
    actionUrl: '/projects/nanobrowser-saas',
  },
  {
    id: 'edu-makaut',
    topic: 'Education & Academic Merit',
    keywords: [
      'education',
      'degree',
      'college',
      'university',
      'makaut',
      'btech',
      'b.tech',
      'computer science',
      'cse',
      'gpa',
      'cgpa',
      'marks',
      'academic',
      'graduation',
      'west bengal',
    ],
    content: `Mubasshir Ali completed his **Bachelor of Technology (B.Tech) in Computer Science & Engineering** from **Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal** (2022 – 2026).

He achieved an exceptional academic cumulative **GPA of 8.57 / 10**, with primary focus on Data Structures & Algorithms, Distributed Systems, Database Management Systems, and Machine Learning.`,
    citationLabel: 'Source: MAKAUT University Records (GPA 8.57/10)',
    citationUrl: '/about#education',
  },
  {
    id: 'proj-nanobrowser',
    topic: 'NanoBrowser SaaS — AI Browser Automation',
    keywords: [
      'nanobrowser',
      'browser automation',
      'chrome extension',
      'aws bedrock',
      'amazon nova lite',
      'razorpay',
      'planner',
      'navigator',
      'multi-agent',
      'linkedin',
      'cloud run',
    ],
    content: `**NanoBrowser SaaS — AI Browser Automation Extension**:
- **Problem**: Open-source browser automation tools forced users to supply their own API keys and run local developer scripts.
- **What Mubasshir Built**: A commercial subscription SaaS. Architected a dual-agent **Planner + Navigator system** powered by **Amazon Nova Lite via AWS Bedrock** with 20ms human-like delays to prevent bot detection. Scaled batch jobs from 10 to 40 per batch.
- **Production Metrics**: 4x throughput increase, sub-second form navigation, 100% webhook idempotency across Razorpay recurring subscriptions.
- **Tech Stack**: TypeScript, React 18, Node.js, Express, MongoDB Atlas, AWS Bedrock, Razorpay, Render.`,
    citationLabel: 'Source: NanoBrowser SaaS Case Study',
    citationUrl: '/projects/nanobrowser-saas',
    actionType: 'open_project',
    actionPrompt: 'Inspect Architectural Specs',
    actionUrl: '/projects/nanobrowser-saas',
  },
  {
    id: 'proj-ai-refund-agent',
    topic: 'AI Refund Support Agent with Function Calling',
    keywords: [
      'refund',
      'support agent',
      'customer support',
      'groq',
      'function calling',
      'tool calling',
      'guardrails',
      'adversarial',
      'policy',
      'admin dashboard',
      'reasoning chain',
    ],
    content: `**Autonomous AI Refund Support Agent**:
- **Problem**: Support teams lose ~40% of their day resolving repetitive refund requests, risking human error or policy violations.
- **What Mubasshir Built**: Autonomous agent built on **Next.js 15, React 19, and Groq LLM**, operating strictly through **7 tool-calling functions** and **6 company policy guardrails**. Includes a real-time admin reasoning chain visualizer.
- **Production Metrics**: 100% compliance across 7/7 adversarial jailbreak test scenarios; sub-1.2s roundtrip response latency; auto-approved refunds up to $500.`,
    citationLabel: 'Source: AI Refund Support Agent Case Study',
    citationUrl: '/projects/ai-refund-agent',
    actionType: 'open_project',
    actionPrompt: 'Explore Agent Case Study',
    actionUrl: '/projects/ai-refund-agent',
  },
  {
    id: 'proj-attendpro',
    topic: 'AttendPro Smart Attendance Management System',
    keywords: [
      'attendpro',
      'attendance',
      'mern',
      'react',
      'mongodb',
      'express',
      'node',
      'jwt',
      'qr code',
      'institute',
      'tuition',
    ],
    content: `**AttendPro — Smart Attendance Management System**:
- **Problem**: Coaching institutes suffered from proxy attendance, manual paper register errors, and untracked fee leakages.
- **What Mubasshir Built**: Full-stack MERN application with role-based JWT authentication, date-wise attendance tracking, multi-parameter search/filter, duplicate roll-number validation, and interactive analytics.
- **Production Metrics**: Sub-80ms queries across 50k+ records, 18% recovered uncollected tuition, zero proxy entries.`,
    citationLabel: 'Source: AttendPro Case Study',
    citationUrl: '/projects/attendpro-system',
    actionType: 'open_project',
    actionPrompt: 'View AttendPro Breakdown',
    actionUrl: '/projects/attendpro-system',
  },
  {
    id: 'proj-diabetes-ml',
    topic: 'Clinical Diabetes Prediction ML System',
    keywords: [
      'diabetes',
      'svm',
      'machine learning',
      'ml',
      'scikit-learn',
      'flask',
      'pima',
      'biometrics',
      'rbf kernel',
      'accuracy',
      '77.4',
    ],
    content: `**Clinical AI Diabetes Prediction Platform**:
- **Problem**: High computational cost of deep learning models prevented deployment in resource-constrained rural clinics.
- **What Mubasshir Built**: Scikit-learn Support Vector Machine (SVM) binary classifier with RBF kernel on 8 clinical biometrics. Handled physiological zero anomalies via custom median imputation pipelines. Packaged into a lightweight 15MB containerized Flask microservice.
- **Production Metrics**: **77.4% test accuracy**, **74.2% sensitivity/recall**, **sub-95ms inference latency**.`,
    citationLabel: 'Source: Clinical Diabetes ML Case Study',
    citationUrl: '/projects/diabetes-prediction-ml',
    actionType: 'open_project',
    actionPrompt: 'View Machine Learning Specs',
    actionUrl: '/projects/diabetes-prediction-ml',
  },
  {
    id: 'blog-rag-chunking',
    topic: 'Published Deep Dive: Production RAG Chunking Strategies',
    keywords: [
      'rag',
      'chunking',
      'naive chunking',
      'vector',
      'embeddings',
      'bm25',
      'hybrid search',
      'reciprocal rank fusion',
      'rrf',
      'semantic window',
      'retrieval',
      'langchain',
      'blog',
    ],
    content: `In his technical breakdown *"Why Naive Chunking Fails in Production RAG (And What Actually Works)"*, Mubasshir explains:
- **Failure of Fixed-Token Chunking**: Arbitrary 500-token slicing splits sentences across boundaries and causes dense vector blind spots on alphanumeric IDs.
- **The Solution**: **Semantic Window Retrieval** (index 1-2 sentence propositions, expand window during retrieval) combined with **BM25 + Dense Hybrid Search via Reciprocal Rank Fusion (RRF)**.
- Achieved **99.4% context capture rate** and **sub-180ms Time-To-First-Token (TTFT)**.`,
    citationLabel: 'Source: Published Article — Production RAG Architecture',
    citationUrl: '/blog/production-rag-chunking-strategies',
    actionType: 'open_project',
    actionPrompt: 'Read Full Technical Article',
    actionUrl: '/blog/production-rag-chunking-strategies',
  },
  {
    id: 'blog-mern-tenancy',
    topic: 'Published Deep Dive: Multi-Tenant SaaS with MERN',
    keywords: [
      'multi-tenant',
      'multitenant',
      'tenant',
      'asynclocalstorage',
      'mongoose',
      'schema isolation',
      'compound index',
      'saas architecture',
    ],
    content: `In his article *"Architecting Multi-Tenant SaaS with MERN: Schema Isolation & Security"*, Mubasshir details:
- Preventing cross-tenant data leaks using Node.js \`AsyncLocalStorage\` to carry tenant context from JWTs.
- Automatic query scoping via Mongoose pre-find middleware.
- Compound indexing strategy (\`{ tenantId: 1, ... }\`) yielding sub-80ms query responses under load.`,
    citationLabel: 'Source: Published Article — Multi-Tenant SaaS MERN',
    citationUrl: '/blog/architecting-multi-tenant-saas-mern',
    actionType: 'open_project',
    actionPrompt: 'Read Multi-Tenant Guide',
    actionUrl: '/blog/architecting-multi-tenant-saas-mern',
  },
  {
    id: 'achieve-leetcode-nasa',
    topic: 'Competitive Achievements & Problem Solving',
    keywords: [
      'leetcode',
      'dsa',
      'data structures',
      'algorithms',
      '200+',
      'nasa',
      'space apps',
      'coder army',
      'certification',
      'problem solving',
      'c++',
    ],
    content: `Mubasshir Ali's verified technical achievements:
- **200+ Data Structures & Algorithms (DSA) problems solved on LeetCode** (demonstrating strong core fundamentals in arrays, trees, dynamic programming, graphs).
- **Competitor in the 2023 NASA International Space Apps Challenge** (world's largest hackathon with 57,900+ participants across 152 countries).
- **Certified in C++ DSA** by Coder Army (2025).
- **Certified in Legacy Responsive Web Design** by freeCodeCamp (2026).`,
    citationLabel: 'Source: LeetCode & NASA Achievements (Resume)',
    citationUrl: '/about#achievements',
  },
  {
    id: 'skills-stack-overview',
    topic: 'Full Technical Stack & Core Competencies',
    keywords: [
      'stack',
      'skills',
      'technologies',
      'tools',
      'languages',
      'frontend',
      'backend',
      'database',
      'react',
      'next.js',
      'typescript',
      'python',
      'node',
      'mongodb',
      'docker',
      'aws bedrock',
    ],
    content: `Mubasshir Ali's production technology stack:
- **Languages**: TypeScript, JavaScript (ES6+), Python, C++, SQL, HTML5, CSS3
- **Frontend**: Next.js 15 (App Router), React 19, Redux Toolkit, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, RESTful APIs, JWT Auth, Microservices, MVC Architecture
- **Databases**: MongoDB, MongoDB Atlas, PostgreSQL, MySQL
- **AI & Cloud**: AWS Bedrock (Amazon Nova Lite), Groq LLM, Tool Calling / Function Calling, Scikit-learn, Docker, Render, Vercel, Razorpay Webhooks`,
    citationLabel: 'Source: Technical Skills Inventory (Resume)',
    citationUrl: '/about#skills',
  },
  {
    id: 'freelance-services-rates',
    topic: 'Freelance Services, Rates & Availability',
    keywords: [
      'freelance',
      'hire',
      'rate',
      'pricing',
      'cost',
      'price',
      'budget',
      'available',
      'availability',
      'contract',
      'services',
      'consultation',
      'timeline',
      'starting at',
    ],
    content: `Mubasshir Ali is currently **Available for freelance projects (2 client slots open for Q1 2027)**.

Transparent pricing signals:
1. **AI-Powered SaaS & LLM Agents**: Starting at **₹45,000 / $1,500** (2–4 weeks)
2. **MERN Stack Production Apps**: Starting at **₹35,000 / $1,200** (2–3 weeks)
3. **AI Integration & Workflow Automation**: Starting at **₹25,000 / $800** (1–2 weeks)
4. **Chrome Extension (Manifest V3)**: Starting at **₹30,000 / $1,000** (1–2 weeks)

**Commercial Terms**: 50% deposit upon kickoff, 50% upon verified milestone delivery. Overlapping IST with US & EU business hours.`,
    citationLabel: 'Source: Services & Transparent Pricing Schedule',
    citationUrl: '/#services',
    actionType: 'book_call',
    actionPrompt: 'Schedule 15-Min Discovery Call',
    actionUrl: '/contact',
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages?.[messages.length - 1]?.content || '';
    const cleanQuery = lastUserMessage.trim();
    const queryLower = cleanQuery.toLowerCase();

    if (!cleanQuery) {
      return NextResponse.json({
        content: `I'm Mubasshir's AI Twin! You can ask me about his work at AiKing Solutions, his GPA at MAKAUT (8.57), 200+ LeetCode DSA solutions, production projects like NanoBrowser SaaS or AI Refund Agent, or freelance pricing.`,
        citations: ['System Overview'],
        citationSources: [{ label: 'Official Resume', url: '/about' }],
      });
    }

    // 1. Guardrail Check: Completely out-of-domain queries (movies, politics, food recipes, sports, chit-chat)
    const isExplicitlyIrrelevant =
      queryLower.length > 3 &&
      (queryLower.includes('recipe') ||
        queryLower.includes('bake a cake') ||
        queryLower.includes('favorite movie') ||
        queryLower.includes('girlfriend') ||
        queryLower.includes('politics') ||
        queryLower.includes('prime minister') ||
        queryLower.includes('president') ||
        queryLower.includes('who won the match') ||
        queryLower.includes('weather in') ||
        queryLower.includes('tell me a joke about dogs') ||
        queryLower.includes('cryptocurrency prediction'));

    if (isExplicitlyIrrelevant) {
      return NextResponse.json({
        content: `I operate strictly with zero-hallucination guardrails as **Mubasshir Ali's AI Engineering Twin**. 

I am programmed to only answer questions verified by Mubasshir's resume, code repositories, and production client work (e.g., MERN architecture, AWS Bedrock agents, NanoBrowser SaaS, pricing, and availability).

If you have a project or technical question that falls outside my verified knowledge base, please ask Mubasshir directly!`,
        citations: ['Zero-Hallucination Guardrail Policy'],
        citationSources: [{ label: 'Guardrail Policy', url: '/about' }],
        actionType: 'ask_direct',
        actionPrompt: 'Ask Mubasshir Directly on WhatsApp',
        actionUrl: `https://wa.me/917003151313?text=${encodeURIComponent(`Hi Mubasshir, I have a specific question: ${cleanQuery}`)}`,
      });
    }

    // 2. Tokenize and calculate weighted BM25/Cosine-style similarity across all Knowledge Chunks
    const queryTokens = queryLower
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((t: string) => t.length >= 2);

    const scoredChunks = KNOWLEDGE_CHUNKS.map((chunk) => {
      let score = 0;

      // Exact topic match
      if (queryLower.includes(chunk.topic.toLowerCase())) {
        score += 10;
      }

      // Keyword matches
      for (const kw of chunk.keywords) {
        if (queryLower.includes(kw)) {
          score += kw.includes(' ') ? 5 : 3;
        }
      }

      // Token overlap in content
      for (const token of queryTokens) {
        if (chunk.content.toLowerCase().includes(token)) {
          score += 1;
        }
      }

      return { chunk, score };
    });

    scoredChunks.sort((a, b) => b.score - a.score);
    const topScored = scoredChunks.filter((item) => item.score >= 3);

    // 3. Low-Confidence Guardrail: Query did not match verified knowledge base
    if (topScored.length === 0) {
      return NextResponse.json({
        content: `I searched Mubasshir's verified resume, GitHub repositories, and architectural case studies, but I don't have verified data on *"**${cleanQuery}**"*.

As an AI Twin with strict negative-response guardrails, I do not hallucinate answers. Would you like to reach out to Mubasshir directly? He usually responds within 24 hours.`,
        citations: ['Strict Negative-Response Guardrail'],
        citationSources: [{ label: 'Verified Engineering Records', url: '/about' }],
        actionType: 'ask_direct',
        actionPrompt: 'Ask Mubasshir Directly',
        actionUrl: `https://wa.me/917003151313?text=${encodeURIComponent(`Hi Mubasshir, I was checking your AI Twin and wanted to ask about: ${cleanQuery}`)}`,
      });
    }

    // 4. Synthesize verified answer from top chunks (max 2 chunks to prevent context overflow)
    const selected = topScored.slice(0, 2);
    let combinedContent = selected.map((s) => s.chunk.content).join('\n\n---\n\n');

    const citations = selected.map((s) => s.chunk.citationLabel);
    const citationSources = selected.map((s) => ({
      label: s.chunk.citationLabel,
      url: s.chunk.citationUrl,
    }));

    // Check if user is asking about hiring, consultation, or pricing
    const isHireIntent =
      queryLower.includes('hire') ||
      queryLower.includes('call') ||
      queryLower.includes('cost') ||
      queryLower.includes('quote') ||
      queryLower.includes('can you build') ||
      queryLower.includes('schedule') ||
      queryLower.includes('start a project');

    let actionType = selected[0].chunk.actionType || 'none';
    let actionPrompt = selected[0].chunk.actionPrompt;
    let actionUrl = selected[0].chunk.actionUrl;

    if (isHireIntent) {
      combinedContent += `\n\n💡 **Ready to discuss your project?** Mubasshir offers a free 15-minute technical discovery call to review your architecture and roadmap.`;
      actionType = 'book_call';
      actionPrompt = 'Book 15-Min Discovery Call';
      actionUrl = '/contact';
    }

    return NextResponse.json({
      content: combinedContent,
      citations,
      citationSources,
      actionType,
      actionPrompt,
      actionUrl,
    });
  } catch (error) {
    return NextResponse.json(
      {
        content: `I ran into a temporary issue retrieving Mubasshir's records. You can explore his full experience, projects, and contact info directly on this portfolio or reach out at mubasshirali0710@gmail.com!`,
        citations: ['System Fallback'],
        citationSources: [{ label: 'Official Profile', url: '/about' }],
        actionType: 'ask_direct',
        actionPrompt: 'Contact Mubasshir Directly',
        actionUrl: 'mailto:mubasshirali0710@gmail.com',
      },
      { status: 200 }
    );
  }
}
