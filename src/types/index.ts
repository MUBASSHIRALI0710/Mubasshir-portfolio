export interface Project {
  id: string;
  title: string;
  tagline: string;
  clientProblem: string;
  whatYouBuilt: string;
  problem: string;
  approach: string;
  architecture: string[];
  stack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'ai' | 'mern' | 'ml' | 'extension';
  badge?: string;
  whatThisProves: string;
  insideTheBuild: {
    title: string;
    description: string;
    highlights: string[];
  };
}

export interface Service {
  id: string;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  timeframe: string;
  pricingSignal: string;
  startingAt: string;
  idealFor: string;
}

export interface PinnedRepo {
  name: string;
  repoUrl: string;
  demoUrl?: string;
  description: string;
  whatThisProves: string;
  stack: string[];
  stars?: number;
  forks?: number;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export interface ReverseBriefData {
  projectType: string;
  timeline: string;
  budget: string;
  description?: string;
}

export interface GeneratedRoadmap {
  title: string;
  summary: string;
  timelineWeeks: string;
  estimatedInvestment: string;
  phases: {
    name: string;
    duration: string;
    deliverables: string[];
  }[];
  recommendedStack: string[];
  relevantProjects: {
    title: string;
    relevanceReason: string;
    linkId: string;
    githubUrl?: string;
    techBadge?: string;
  }[];
}

export interface CitationSource {
  label: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: string[];
  citationSources?: CitationSource[];
  actionPrompt?: string;
  actionUrl?: string;
  actionType?: 'ask_direct' | 'book_call' | 'open_project' | 'none';
  timestamp: string;
}
