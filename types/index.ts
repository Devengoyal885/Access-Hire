// ============================================================
// AccessHire — Adaptive Capability Twin
// TypeScript Type System
// ============================================================

// ─── Core Entities ───────────────────────────────────────────

export type EvidenceSource =
  | 'github'
  | 'project'
  | 'assessment'
  | 'work'
  | 'certification'
  | 'patent'
  | 'self-reported';

export interface EvidenceItem {
  source: EvidenceSource;
  label: string;
  date: string;
  confidence: number; // 0–100
  verified: boolean;
  applicationNo?: string;
}

export interface CapabilityGrowthPoint {
  year: number;
  score: number;
}

export interface Capability {
  id: string;
  name: string;
  category: 'technical' | 'operational' | 'leadership' | 'domain';
  proficiency: number;          // 0–100
  evidenceConfidence: number;   // 0–100
  independent: number;          // 0–100
  aiAssisted: number;           // 0–100
  recency: 'high' | 'medium' | 'low';
  evidence: EvidenceItem[];
  growth: CapabilityGrowthPoint[];
  tags: string[];
}

export interface PatentItem {
  id: string;
  title: string;
  applicationNo: string;
  status: string;
  year: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  age?: number;
  location: string;
  education: string;
  careerGap?: string;
  targetRole: string;
  capabilityMomentum: number;
  capabilityTwinScore: number;
  futureReadiness: number;
  opportunityMatch: number;
  activeTransitions: number;
  capabilities: Capability[];
  patents?: PatentItem[];
  avatar?: string;
}

// ─── Opportunity ─────────────────────────────────────────────

export type OpportunityType =
  | 'job'
  | 'internship'
  | 'paid-internship'
  | 'hackathon'
  | 'competition'
  | 'fellowship'
  | 'scholarship'
  | 'research';

export interface OpportunityCapabilityGap {
  name: string;
  current: number;
  required: number;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  location: string;
  remote: boolean;
  matchScore: number;
  capabilityFit: number;
  futureFit: number;
  evidenceFit: number;
  resumeFit: number;
  deadline: string;
  compensation?: string;
  applicationEffort: 'low' | 'medium' | 'high';
  requiredCapabilities: string[];
  missingCapabilities: OpportunityCapabilityGap[];
  transferableCapabilities: string[];
  description: string;
  tags: string[];
}

// ─── Action Center ───────────────────────────────────────────

export type ActionPriority = 'urgent' | 'high' | 'medium' | 'low';
export type ActionCategory =
  | 'application'
  | 'learning'
  | 'interview'
  | 'deadline'
  | 'email'
  | 'assessment'
  | 'hackathon'
  | 'follow-up';

export interface Action {
  id: string;
  title: string;
  description: string;
  priority: ActionPriority;
  category: ActionCategory;
  deadline?: string;
  dueDate?: string;
  relatedOpportunity?: string;
  relatedCapability?: string;
  estimatedTime?: string;
  completed: boolean;
  createdAt: string;
}

// ─── Email Intelligence ───────────────────────────────────────

export type EmailCategory =
  | 'opportunity'
  | 'interview'
  | 'assessment'
  | 'deadline'
  | 'follow-up'
  | 'general';

export interface Email {
  id: string;
  from: string;
  fromOrg: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  category: EmailCategory;
  extractedEvent?: {
    type: string;
    date?: string;
    role?: string;
  };
  recommendedAction?: string;
  read: boolean;
}

// ─── Future Role / Transfer ───────────────────────────────────

export interface TransferRole {
  id: string;
  title: string;
  readiness: number;
  transferable: string[];
  missing: string[];
  transitionEffort: 'low' | 'medium' | 'high';
  marketTrend: 'rising' | 'stable' | 'declining';
  transitionSteps: {
    phase: string;
    items: string[];
  }[];
}

// ─── Workforce / Enterprise ────────────────────────────────────

export interface WorkforceDepartment {
  id: string;
  name: string;
  headcount: number;
  capabilities: Record<string, number>; // capability → score (0–100)
  transitions: WorkforceTransition[];
}

export interface WorkforceTransition {
  from: string;
  to: string;
  readiness: number;
  employees: number;
}

export interface EquityCandidate {
  id: string;
  name: string;
  capabilityFit: number;
  evidenceConfidence: number;
  careerGap: string;
  location: string;
  credentials: string;
}

// ─── AI Workspace ─────────────────────────────────────────────

export type AIProvider = 'auto' | 'chatgpt' | 'gemini' | 'claude';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  provider?: AIProvider;
  timestamp: string;
}

export interface AIContext {
  project: string;
  targetRole: string;
  capabilityFit: number;
  capabilityGaps: string[];
  resumeFile?: string;
  opportunity?: string;
  contextHealth: number;
}

export interface ContextCapsule {
  id: string;
  project: string;
  goal: string;
  constraints: string[];
  decisions: string[];
  importantFacts: string[];
  files: string[];
  openQuestions: string[];
  conversationSummary: string;
  tokensBefore: number;
  tokensAfter: number;
  createdAt: string;
}

// ─── Resume Studio ─────────────────────────────────────────────

export interface ResumeSection {
  type:
    | 'education'
    | 'experience'
    | 'projects'
    | 'skills'
    | 'certifications'
    | 'achievements'
    | 'hackathons'
    | 'publications'
    | 'languages';
  items: ResumeItem[];
}

export interface ResumeItem {
  id: string;
  title: string;
  org?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface ResumeAnalysis {
  atsFit: number;
  keywordCoverage: number;
  capabilityAlignment: number;
  evidenceCoverage: number;
  missingKeywords: string[];
  missingRequirements: string[];
}

// ─── Charts ────────────────────────────────────────────────────

export interface MomentumDataPoint {
  month: string;
  capabilities: number;
  opportunities: number;
  readiness: number;
}

// ─── Navigation ────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
}

// ─── Theme ────────────────────────────────────────────────────

export type Theme = 'dark' | 'light';

// ─── Notification ─────────────────────────────────────────────

export interface Notification {
  id: string;
  type: 'capability' | 'opportunity' | 'email' | 'resume' | 'verification';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
