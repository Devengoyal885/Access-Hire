import type {
  UserProfile,
  Capability,
  Opportunity,
  Action,
  Email,
  TransferRole,
  WorkforceDepartment,
  EquityCandidate,
  MomentumDataPoint,
  Notification,
} from '@/types';

// ─── Primary Candidate ────────────────────────────────────────

export const mockUser: UserProfile = {
  id: 'user-priya',
  name: 'Priya Sharma',
  age: 29,
  location: 'Hubli, India',
  education: 'B.Sc. Computer Applications',
  careerGap: '3 years',
  targetRole: 'AI Operations Engineer',
  capabilityMomentum: 18,
  capabilityTwinScore: 82,
  futureReadiness: 74,
  opportunityMatch: 91,
  activeTransitions: 2,
  capabilities: [],
};

// ─── Capabilities ─────────────────────────────────────────────

export const mockCapabilities: Capability[] = [
  {
    id: 'cap-python',
    name: 'Python',
    category: 'technical',
    proficiency: 87,
    evidenceConfidence: 94,
    independent: 81,
    aiAssisted: 94,
    recency: 'high',
    evidence: [
      { source: 'github', label: 'GitHub Repositories', date: '2025-11', confidence: 96, verified: true },
      { source: 'project', label: 'Data Pipeline Project', date: '2025-08', confidence: 91, verified: true },
      { source: 'assessment', label: 'Practical Assessment', date: '2026-01', confidence: 94, verified: true },
      { source: 'work', label: 'Freelance Automation Scripts', date: '2024-06', confidence: 82, verified: false },
    ],
    growth: [
      { year: 2023, score: 62 },
      { year: 2024, score: 72 },
      { year: 2025, score: 81 },
      { year: 2026, score: 87 },
    ],
    tags: ['scripting', 'automation', 'data'],
  },
  {
    id: 'cap-ai',
    name: 'AI / ML',
    category: 'technical',
    proficiency: 78,
    evidenceConfidence: 81,
    independent: 72,
    aiAssisted: 91,
    recency: 'high',
    evidence: [
      { source: 'project', label: 'LLM Integration Project', date: '2025-10', confidence: 84, verified: true },
      { source: 'assessment', label: 'AI Evaluation Trial', date: '2026-02', confidence: 88, verified: true },
    ],
    growth: [
      { year: 2024, score: 45 },
      { year: 2025, score: 64 },
      { year: 2026, score: 78 },
    ],
    tags: ['llm', 'evaluation', 'prompting'],
  },
  {
    id: 'cap-sql',
    name: 'SQL',
    category: 'technical',
    proficiency: 83,
    evidenceConfidence: 89,
    independent: 85,
    aiAssisted: 92,
    recency: 'high',
    evidence: [
      { source: 'work', label: 'Database Queries — Self-taught', date: '2024-03', confidence: 80, verified: false },
      { source: 'project', label: 'Analytics Dashboard', date: '2025-07', confidence: 92, verified: true },
    ],
    growth: [
      { year: 2023, score: 55 },
      { year: 2024, score: 68 },
      { year: 2025, score: 79 },
      { year: 2026, score: 83 },
    ],
    tags: ['data', 'queries', 'analytics'],
  },
  {
    id: 'cap-cloud',
    name: 'Cloud',
    category: 'technical',
    proficiency: 61,
    evidenceConfidence: 65,
    independent: 55,
    aiAssisted: 78,
    recency: 'medium',
    evidence: [
      { source: 'project', label: 'AWS S3 Data Storage', date: '2025-04', confidence: 70, verified: false },
    ],
    growth: [
      { year: 2025, score: 42 },
      { year: 2026, score: 61 },
    ],
    tags: ['aws', 'deployment', 'infrastructure'],
  },
  {
    id: 'cap-apis',
    name: 'APIs',
    category: 'technical',
    proficiency: 84,
    evidenceConfidence: 88,
    independent: 82,
    aiAssisted: 91,
    recency: 'high',
    evidence: [
      { source: 'github', label: 'REST API Projects', date: '2025-09', confidence: 91, verified: true },
      { source: 'project', label: 'Integration Services', date: '2025-11', confidence: 87, verified: true },
    ],
    growth: [
      { year: 2024, score: 61 },
      { year: 2025, score: 76 },
      { year: 2026, score: 84 },
    ],
    tags: ['rest', 'integration', 'backend'],
  },
  {
    id: 'cap-linux',
    name: 'Linux',
    category: 'technical',
    proficiency: 76,
    evidenceConfidence: 79,
    independent: 78,
    aiAssisted: 83,
    recency: 'high',
    evidence: [
      { source: 'work', label: 'IT Support — 2 years', date: '2023-06', confidence: 81, verified: false },
      { source: 'project', label: 'Server Administration', date: '2024-08', confidence: 77, verified: false },
    ],
    growth: [
      { year: 2022, score: 52 },
      { year: 2023, score: 65 },
      { year: 2024, score: 72 },
      { year: 2026, score: 76 },
    ],
    tags: ['sysadmin', 'shell', 'servers'],
  },
  {
    id: 'cap-automation',
    name: 'Automation',
    category: 'technical',
    proficiency: 80,
    evidenceConfidence: 85,
    independent: 79,
    aiAssisted: 89,
    recency: 'high',
    evidence: [
      { source: 'github', label: 'Automation Scripts — GitHub', date: '2025-12', confidence: 88, verified: true },
      { source: 'project', label: 'Workflow Automation', date: '2025-06', confidence: 83, verified: true },
    ],
    growth: [
      { year: 2024, score: 58 },
      { year: 2025, score: 71 },
      { year: 2026, score: 80 },
    ],
    tags: ['scripting', 'workflows', 'efficiency'],
  },
  {
    id: 'cap-data-analysis',
    name: 'Data Analysis',
    category: 'technical',
    proficiency: 74,
    evidenceConfidence: 77,
    independent: 72,
    aiAssisted: 86,
    recency: 'high',
    evidence: [
      { source: 'project', label: 'Community Survey Analysis', date: '2025-05', confidence: 79, verified: false },
      { source: 'github', label: 'Pandas/NumPy Notebooks', date: '2025-08', confidence: 82, verified: true },
    ],
    growth: [
      { year: 2024, score: 48 },
      { year: 2025, score: 63 },
      { year: 2026, score: 74 },
    ],
    tags: ['analytics', 'pandas', 'visualization'],
  },
  {
    id: 'cap-leadership',
    name: 'Leadership',
    category: 'leadership',
    proficiency: 84,
    evidenceConfidence: 87,
    independent: 86,
    aiAssisted: 84,
    recency: 'high',
    evidence: [
      { source: 'work', label: 'Festival Coordination — 5,000 attendees', date: '2024-11', confidence: 91, verified: false },
      { source: 'project', label: 'Volunteer Management', date: '2025-02', confidence: 84, verified: false },
    ],
    growth: [
      { year: 2022, score: 65 },
      { year: 2023, score: 72 },
      { year: 2024, score: 79 },
      { year: 2026, score: 84 },
    ],
    tags: ['management', 'coordination', 'teams'],
  },
  {
    id: 'cap-communication',
    name: 'Communication',
    category: 'leadership',
    proficiency: 88,
    evidenceConfidence: 82,
    independent: 90,
    aiAssisted: 88,
    recency: 'high',
    evidence: [
      { source: 'work', label: 'Vendor Negotiations', date: '2024-10', confidence: 85, verified: false },
      { source: 'work', label: 'Stakeholder Management', date: '2024-11', confidence: 88, verified: false },
    ],
    growth: [
      { year: 2022, score: 71 },
      { year: 2024, score: 82 },
      { year: 2026, score: 88 },
    ],
    tags: ['stakeholders', 'negotiation', 'presentations'],
  },
  {
    id: 'cap-troubleshooting',
    name: 'Troubleshooting',
    category: 'operational',
    proficiency: 91,
    evidenceConfidence: 93,
    independent: 89,
    aiAssisted: 92,
    recency: 'high',
    evidence: [
      { source: 'work', label: 'IT Support — 2 years', date: '2023-06', confidence: 94, verified: false },
      { source: 'assessment', label: 'Practical Diagnostic Trial', date: '2026-01', confidence: 96, verified: true },
    ],
    growth: [
      { year: 2022, score: 72 },
      { year: 2023, score: 84 },
      { year: 2024, score: 88 },
      { year: 2026, score: 91 },
    ],
    tags: ['debugging', 'diagnostics', 'support'],
  },
  {
    id: 'cap-backend',
    name: 'Backend',
    category: 'technical',
    proficiency: 69,
    evidenceConfidence: 72,
    independent: 65,
    aiAssisted: 80,
    recency: 'medium',
    evidence: [
      { source: 'github', label: 'Node.js Projects', date: '2025-07', confidence: 74, verified: true },
    ],
    growth: [
      { year: 2025, score: 52 },
      { year: 2026, score: 69 },
    ],
    tags: ['node', 'servers', 'apis'],
  },
];

// ─── Translated Capabilities (from festival experience) ───────

export const mockTranslatedCapabilities = [
  { name: 'Large-Scale Event Operations', score: 87, color: '#6366f1' },
  { name: 'Budget Management', score: 82, color: '#8b5cf6' },
  { name: 'Vendor Negotiation', score: 79, color: '#06b6d4' },
  { name: 'Stakeholder Coordination', score: 91, color: '#10b981' },
  { name: 'Team Leadership', score: 84, color: '#f59e0b' },
  { name: 'Risk Management', score: 76, color: '#ef4444' },
];

// ─── Transfer Roles ───────────────────────────────────────────

export const mockTransferRoles: TransferRole[] = [
  {
    id: 'role-ai-ops',
    title: 'AI Operations Engineer',
    readiness: 74,
    transferable: ['Python', 'APIs', 'Linux', 'Automation', 'Troubleshooting', 'SQL'],
    missing: ['AI Evaluation', 'Agent Orchestration', 'Cloud AI Deployment'],
    transitionEffort: 'medium',
    marketTrend: 'rising',
    transitionSteps: [
      { phase: 'CURRENT', items: ['Python 87%', 'APIs 84%', 'Linux 76%', 'Automation 80%'] },
      { phase: 'LEARN', items: ['AI Evaluation frameworks', 'Agent orchestration (LangChain)', 'Cloud AI (AWS SageMaker)'] },
      { phase: 'PRACTICE', items: ['Deploy AI service', 'Monitor model performance', 'Evaluate LLM outputs'] },
      { phase: 'VERIFY', items: ['Practical trial assessment', '1 portfolio project'] },
      { phase: 'READY', items: ['AI Operations Engineer — 89% readiness'] },
    ],
  },
  {
    id: 'role-cloud-eng',
    title: 'Cloud Engineer',
    readiness: 68,
    transferable: ['Linux', 'Automation', 'APIs', 'Python'],
    missing: ['Cloud Architecture', 'Kubernetes', 'CI/CD', 'Terraform'],
    transitionEffort: 'high',
    marketTrend: 'rising',
    transitionSteps: [
      { phase: 'CURRENT', items: ['Linux 76%', 'Automation 80%'] },
      { phase: 'LEARN', items: ['AWS/GCP architecture', 'Kubernetes', 'Infrastructure as code'] },
      { phase: 'PRACTICE', items: ['Deploy containerised apps', 'Manage infrastructure'] },
      { phase: 'VERIFY', items: ['Cloud deployment project'] },
      { phase: 'READY', items: ['Cloud Engineer — 78% readiness'] },
    ],
  },
  {
    id: 'role-data-eng',
    title: 'Data Engineer',
    readiness: 61,
    transferable: ['Python', 'SQL', 'Data Analysis', 'APIs'],
    missing: ['Apache Spark', 'Data Warehousing', 'Airflow', 'dbt'],
    transitionEffort: 'high',
    marketTrend: 'stable',
    transitionSteps: [
      { phase: 'CURRENT', items: ['SQL 83%', 'Python 87%', 'Data Analysis 74%'] },
      { phase: 'LEARN', items: ['Data pipeline tools', 'Spark fundamentals', 'dbt'] },
      { phase: 'PRACTICE', items: ['Build ETL pipeline', 'Data warehouse project'] },
      { phase: 'VERIFY', items: ['End-to-end pipeline trial'] },
      { phase: 'READY', items: ['Data Engineer — 74% readiness'] },
    ],
  },
  {
    id: 'role-ai-analyst',
    title: 'AI-Enabled Business Analyst',
    readiness: 79,
    transferable: ['Communication', 'Leadership', 'Data Analysis', 'SQL', 'Python'],
    missing: ['Business Process Modeling', 'AI Product Knowledge'],
    transitionEffort: 'low',
    marketTrend: 'rising',
    transitionSteps: [
      { phase: 'CURRENT', items: ['Communication 88%', 'Data Analysis 74%', 'Leadership 84%'] },
      { phase: 'LEARN', items: ['Business analysis frameworks', 'AI tool proficiency'] },
      { phase: 'PRACTICE', items: ['Requirements analysis', 'AI-augmented reporting'] },
      { phase: 'VERIFY', items: ['Business case project'] },
      { phase: 'READY', items: ['AI-Enabled BA — 86% readiness'] },
    ],
  },
  {
    id: 'role-ai-security',
    title: 'AI Security Analyst',
    readiness: 54,
    transferable: ['Troubleshooting', 'Linux', 'Python'],
    missing: ['Threat Modeling', 'AI Red Teaming', 'Cybersecurity Fundamentals', 'MLSecOps'],
    transitionEffort: 'high',
    marketTrend: 'rising',
    transitionSteps: [
      { phase: 'CURRENT', items: ['Troubleshooting 91%', 'Linux 76%'] },
      { phase: 'LEARN', items: ['Security fundamentals', 'AI threat modeling', 'Red teaming'] },
      { phase: 'PRACTICE', items: ['Security audit', 'AI system red team'] },
      { phase: 'VERIFY', items: ['Security challenge trial'] },
      { phase: 'READY', items: ['AI Security Analyst — 68% readiness'] },
    ],
  },
];

// ─── Opportunities ────────────────────────────────────────────

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-ai-ops-intern',
    title: 'AI Operations Internship',
    company: 'Infosys AI Labs',
    type: 'paid-internship',
    location: 'Bangalore, India',
    remote: true,
    matchScore: 94,
    capabilityFit: 89,
    futureFit: 92,
    evidenceFit: 86,
    resumeFit: 81,
    deadline: '2026-09-01',
    compensation: '₹25,000/month',
    applicationEffort: 'medium',
    requiredCapabilities: ['Python', 'APIs', 'Linux', 'AI Evaluation', 'Monitoring'],
    missingCapabilities: [
      { name: 'AI Evaluation', current: 45, required: 70 },
    ],
    transferableCapabilities: ['Python', 'APIs', 'Linux', 'Automation', 'Troubleshooting'],
    description: 'Join our AI Operations team to deploy, monitor and evaluate AI services in production environments. Work with cutting-edge LLM pipelines.',
    tags: ['ai', 'operations', 'paid', 'remote'],
  },
  {
    id: 'opp-data-fellowship',
    title: 'Data Engineering Fellowship',
    company: 'Tata Consultancy Services',
    type: 'fellowship',
    location: 'Mumbai, India',
    remote: false,
    matchScore: 81,
    capabilityFit: 78,
    futureFit: 83,
    evidenceFit: 74,
    resumeFit: 69,
    deadline: '2026-09-15',
    compensation: '₹20,000/month stipend',
    applicationEffort: 'high',
    requiredCapabilities: ['SQL', 'Python', 'Data Analysis', 'Apache Spark'],
    missingCapabilities: [
      { name: 'Apache Spark', current: 20, required: 65 },
      { name: 'Data Warehousing', current: 30, required: 60 },
    ],
    transferableCapabilities: ['SQL', 'Python', 'Data Analysis'],
    description: 'A 6-month structured fellowship to develop production-grade data engineering skills with mentorship from senior engineers.',
    tags: ['data', 'fellowship', 'mentorship'],
  },
  {
    id: 'opp-ai-hackathon',
    title: 'National AI Builders Hackathon',
    company: 'NASSCOM Foundation',
    type: 'hackathon',
    location: 'Online',
    remote: true,
    matchScore: 88,
    capabilityFit: 85,
    futureFit: 90,
    evidenceFit: 82,
    resumeFit: 75,
    deadline: '2026-09-05',
    compensation: '₹1,00,000 prize pool',
    applicationEffort: 'low',
    requiredCapabilities: ['Python', 'AI / ML', 'APIs'],
    missingCapabilities: [],
    transferableCapabilities: ['Python', 'AI / ML', 'APIs', 'Automation'],
    description: 'Build AI solutions for social impact. Prizes, mentorship, and fast-track recruitment for top performers.',
    tags: ['hackathon', 'ai', 'remote', 'prize'],
  },
  {
    id: 'opp-cloud-junior',
    title: 'Junior Cloud Engineer',
    company: 'Wipro Digital',
    type: 'job',
    location: 'Pune, India',
    remote: false,
    matchScore: 72,
    capabilityFit: 68,
    futureFit: 76,
    evidenceFit: 63,
    resumeFit: 58,
    deadline: '2026-09-30',
    compensation: '₹6.5 LPA',
    applicationEffort: 'high',
    requiredCapabilities: ['Linux', 'Cloud', 'Automation', 'Python', 'Kubernetes'],
    missingCapabilities: [
      { name: 'Kubernetes', current: 15, required: 70 },
      { name: 'Cloud Architecture', current: 35, required: 75 },
    ],
    transferableCapabilities: ['Linux', 'Automation', 'Python'],
    description: 'Manage and scale cloud infrastructure for enterprise clients. Good stepping stone into DevOps and MLOps.',
    tags: ['cloud', 'devops', 'full-time'],
  },
  {
    id: 'opp-ml-research',
    title: 'AI Research Assistant',
    company: 'IIT Dharwad',
    type: 'research',
    location: 'Dharwad, India',
    remote: true,
    matchScore: 77,
    capabilityFit: 74,
    futureFit: 85,
    evidenceFit: 70,
    resumeFit: 66,
    deadline: '2026-09-20',
    compensation: '₹15,000/month',
    applicationEffort: 'medium',
    requiredCapabilities: ['Python', 'AI / ML', 'Data Analysis', 'Research Methods'],
    missingCapabilities: [
      { name: 'Research Methods', current: 40, required: 65 },
    ],
    transferableCapabilities: ['Python', 'AI / ML', 'Data Analysis'],
    description: 'Assist in applied AI research focused on inclusive technology. Co-author research papers with faculty guidance.',
    tags: ['research', 'ai', 'academic', 'part-time'],
  },
  {
    id: 'opp-backend-intern',
    title: 'Backend Engineering Intern',
    company: 'Zoho Corporation',
    type: 'internship',
    location: 'Chennai, India',
    remote: false,
    matchScore: 79,
    capabilityFit: 76,
    futureFit: 71,
    evidenceFit: 80,
    resumeFit: 72,
    deadline: '2026-09-10',
    compensation: '₹18,000/month',
    applicationEffort: 'medium',
    requiredCapabilities: ['Python', 'APIs', 'SQL', 'Backend'],
    missingCapabilities: [],
    transferableCapabilities: ['Python', 'APIs', 'SQL', 'Backend', 'Automation'],
    description: 'Build scalable backend services for Zoho\'s productivity suite. Hands-on production experience from day one.',
    tags: ['backend', 'internship', 'paid'],
  },
  {
    id: 'opp-ai-eval',
    title: 'AI Quality Evaluation Contract',
    company: 'Scale AI (India)',
    type: 'job',
    location: 'Remote',
    remote: true,
    matchScore: 86,
    capabilityFit: 88,
    futureFit: 84,
    evidenceFit: 82,
    resumeFit: 77,
    deadline: '2026-09-08',
    compensation: '$18/hr',
    applicationEffort: 'low',
    requiredCapabilities: ['AI / ML', 'Communication', 'Data Analysis'],
    missingCapabilities: [],
    transferableCapabilities: ['AI / ML', 'Communication', 'Data Analysis', 'Python'],
    description: 'Evaluate AI model outputs for quality, accuracy, and safety. Builds direct AI evaluation expertise critical for AI Ops roles.',
    tags: ['ai', 'evaluation', 'remote', 'contract'],
  },
  {
    id: 'opp-women-scholarship',
    title: 'Women in Tech Scholarship',
    company: 'Google India',
    type: 'scholarship',
    location: 'Online',
    remote: true,
    matchScore: 91,
    capabilityFit: 87,
    futureFit: 93,
    evidenceFit: 88,
    resumeFit: 84,
    deadline: '2026-09-03',
    compensation: '$5,000 grant',
    applicationEffort: 'medium',
    requiredCapabilities: ['Python', 'AI / ML'],
    missingCapabilities: [],
    transferableCapabilities: ['Python', 'AI / ML', 'Leadership', 'Communication'],
    description: 'Scholarship supporting women pursuing careers in technology. Includes mentorship, community access, and project funding.',
    tags: ['scholarship', 'women', 'google', 'mentorship'],
  },
  {
    id: 'opp-devops',
    title: 'DevOps Engineer Trainee',
    company: 'HCL Technologies',
    type: 'job',
    location: 'Noida, India',
    remote: false,
    matchScore: 69,
    capabilityFit: 65,
    futureFit: 72,
    evidenceFit: 68,
    resumeFit: 60,
    deadline: '2026-10-05',
    compensation: '₹5 LPA',
    applicationEffort: 'high',
    requiredCapabilities: ['Linux', 'Automation', 'Cloud', 'Docker', 'CI/CD'],
    missingCapabilities: [
      { name: 'Docker', current: 25, required: 70 },
      { name: 'CI/CD', current: 30, required: 65 },
    ],
    transferableCapabilities: ['Linux', 'Automation', 'Python'],
    description: 'Structured DevOps trainee program with certification pathway. Good foundational stepping stone.',
    tags: ['devops', 'trainee', 'full-time'],
  },
  {
    id: 'opp-community-tech',
    title: 'Community Tech Lead',
    company: 'Digital Bharat Initiative',
    type: 'fellowship',
    location: 'Hubli, India',
    remote: true,
    matchScore: 95,
    capabilityFit: 93,
    futureFit: 88,
    evidenceFit: 91,
    resumeFit: 90,
    deadline: '2026-09-25',
    compensation: '₹22,000/month',
    applicationEffort: 'low',
    requiredCapabilities: ['Leadership', 'Communication', 'Python', 'Data Analysis'],
    missingCapabilities: [],
    transferableCapabilities: ['Leadership', 'Communication', 'Python', 'Data Analysis', 'Automation'],
    description: 'Lead digital literacy and AI programs in rural Karnataka. Perfect alignment with community leadership background.',
    tags: ['fellowship', 'leadership', 'social-impact', 'local'],
  },
];

// ─── Actions ──────────────────────────────────────────────────

export const mockActions: Action[] = [
  {
    id: 'act-1',
    title: 'Apply — AI Operations Internship',
    description: 'Deadline today. Resume optimized to 94% ATS fit. Strong match.',
    priority: 'urgent',
    category: 'application',
    deadline: '2026-09-01',
    dueDate: '2026-09-01',
    relatedOpportunity: 'opp-ai-ops-intern',
    estimatedTime: '20 min',
    completed: false,
    createdAt: '2026-08-27T10:00:00Z',
  },
  {
    id: 'act-2',
    title: 'Start AI Evaluation Assessment',
    description: 'Closes capability gap. +8% Future Readiness after completion.',
    priority: 'high',
    category: 'assessment',
    relatedCapability: 'cap-ai',
    estimatedTime: '35 min',
    completed: false,
    createdAt: '2026-08-26T14:00:00Z',
  },
  {
    id: 'act-3',
    title: 'Optimize Resume — Data Engineering Fellowship',
    description: 'Current ATS fit 69%. Can improve to 84% with keyword optimization.',
    priority: 'high',
    category: 'application',
    relatedOpportunity: 'opp-data-fellowship',
    estimatedTime: '15 min',
    completed: false,
    createdAt: '2026-08-27T09:00:00Z',
  },
  {
    id: 'act-4',
    title: 'Respond to Interview Invitation',
    description: 'Infosys AI Labs — response required within 24 hours.',
    priority: 'urgent',
    category: 'interview',
    deadline: '2026-08-29',
    estimatedTime: '10 min',
    completed: false,
    createdAt: '2026-08-28T08:00:00Z',
  },
  {
    id: 'act-5',
    title: 'Submit Hackathon Registration',
    description: 'NASSCOM AI Hackathon closes tomorrow. Team needs 2 more members.',
    priority: 'high',
    category: 'hackathon',
    deadline: '2026-09-05',
    relatedOpportunity: 'opp-ai-hackathon',
    estimatedTime: '15 min',
    completed: false,
    createdAt: '2026-08-26T12:00:00Z',
  },
  {
    id: 'act-6',
    title: 'Complete Cloud AI Module',
    description: 'Part of AI Ops transition plan. 2 modules remaining.',
    priority: 'medium',
    category: 'learning',
    relatedCapability: 'cap-cloud',
    estimatedTime: '90 min',
    completed: false,
    createdAt: '2026-08-25T10:00:00Z',
  },
  {
    id: 'act-7',
    title: 'Follow Up — Google Scholarship',
    description: 'Application submitted 5 days ago. Send polite follow-up.',
    priority: 'low',
    category: 'follow-up',
    relatedOpportunity: 'opp-women-scholarship',
    estimatedTime: '5 min',
    completed: false,
    createdAt: '2026-08-23T14:00:00Z',
  },
  {
    id: 'act-8',
    title: 'Run Practical Trial — AI Ops Simulation',
    description: 'Deploy and monitor an AI service. Verifies 3 missing capabilities.',
    priority: 'high',
    category: 'assessment',
    relatedOpportunity: 'opp-ai-ops-intern',
    estimatedTime: '45 min',
    completed: false,
    createdAt: '2026-08-27T16:00:00Z',
  },
  {
    id: 'act-9',
    title: 'Translate Festival Experience',
    description: 'Add to Capability Twin. Unlocks 6 new enterprise capabilities.',
    priority: 'medium',
    category: 'assessment',
    estimatedTime: '10 min',
    completed: false,
    createdAt: '2026-08-26T11:00:00Z',
  },
  {
    id: 'act-10',
    title: 'Prepare for Infosys Interview',
    description: 'AI Ops Engineer round. 5 recommended prep topics identified.',
    priority: 'urgent',
    category: 'interview',
    deadline: '2026-09-02',
    relatedOpportunity: 'opp-ai-ops-intern',
    estimatedTime: '120 min',
    completed: false,
    createdAt: '2026-08-28T09:00:00Z',
  },
];

// ─── Emails ───────────────────────────────────────────────────

export const mockEmails: Email[] = [
  {
    id: 'email-1',
    from: 'Rohan Mehta',
    fromOrg: 'Infosys AI Labs',
    subject: 'You have been shortlisted — AI Operations Internship',
    preview: 'Congratulations! You have been shortlisted for the next round of our AI Operations Internship selection...',
    body: 'Dear Priya,\n\nCongratulations! We are pleased to inform you that you have been shortlisted for the next round of our AI Operations Internship selection process.\n\nYour technical interview is scheduled for September 2, 2026 at 2:00 PM IST. Please confirm your availability by replying to this email.\n\nBest regards,\nRohan Mehta\nTalent Acquisition, Infosys AI Labs',
    date: '2026-08-28T08:30:00Z',
    category: 'interview',
    extractedEvent: { type: 'Interview', date: 'September 2, 2026', role: 'AI Operations Intern' },
    recommendedAction: 'Confirm availability and begin interview preparation',
    read: false,
  },
  {
    id: 'email-2',
    from: 'Applications Team',
    fromOrg: 'NASSCOM Foundation',
    subject: 'National AI Hackathon — Registration closes in 72 hours',
    preview: 'This is a reminder that registration for the National AI Builders Hackathon closes on September 5...',
    body: 'Dear Participant,\n\nThis is a reminder that registration for the National AI Builders Hackathon closes on September 5, 2026.\n\nTeams of 2-4 participants. ₹1,00,000 prize pool. Problem statements focus on AI for social impact.\n\nRegister now at nasscom.in/ai-hackathon',
    date: '2026-08-27T14:00:00Z',
    category: 'deadline',
    extractedEvent: { type: 'Hackathon Registration', date: 'September 5, 2026', role: 'Participant' },
    recommendedAction: 'Register before deadline',
    read: false,
  },
  {
    id: 'email-3',
    from: 'Priya Nair',
    fromOrg: 'Google India',
    subject: 'Women in Tech Scholarship — Application Received',
    preview: 'Thank you for applying to the Google Women in Tech Scholarship 2026. Your application is under review...',
    body: 'Dear Priya Sharma,\n\nThank you for your application to the Google Women in Tech Scholarship 2026.\n\nYour application is currently under review. You will hear back from us within 2 weeks.\n\nBest wishes,\nPriya Nair\nGoogle India Scholarships Team',
    date: '2026-08-26T11:15:00Z',
    category: 'opportunity',
    extractedEvent: { type: 'Scholarship Review', date: '2 weeks', role: 'Applicant' },
    recommendedAction: 'Send polite follow-up in 5 days',
    read: true,
  },
  {
    id: 'email-4',
    from: 'HR Team',
    fromOrg: 'Zoho Corporation',
    subject: 'Application Status Update — Backend Engineering Intern',
    preview: 'Your application for Backend Engineering Intern has been reviewed. We would like to invite you for an assessment...',
    body: 'Dear Priya,\n\nYour application for the Backend Engineering Intern position has been reviewed by our team.\n\nWe would like to invite you to complete our technical assessment. The assessment takes approximately 90 minutes and must be completed by September 10.\n\nLink: zoho.com/careers/assessment/12345\n\nGood luck!\nZoho HR Team',
    date: '2026-08-27T09:45:00Z',
    category: 'assessment',
    extractedEvent: { type: 'Technical Assessment', date: 'September 10, 2026', role: 'Backend Engineering Intern' },
    recommendedAction: 'Complete technical assessment before September 10',
    read: false,
  },
  {
    id: 'email-5',
    from: 'Community Manager',
    fromOrg: 'Digital Bharat Initiative',
    subject: 'Community Tech Lead — Shortlisted',
    preview: 'We are excited to inform you that your application for Community Tech Lead has progressed to the final round...',
    body: 'Dear Priya,\n\nWe are excited to inform you that your application for the Community Tech Lead position has progressed to the final round.\n\nWe will be conducting a 30-minute call to discuss your vision and experience. Please suggest 3 time slots that work for you this week.\n\nDigital Bharat Initiative Team',
    date: '2026-08-28T10:00:00Z',
    category: 'interview',
    extractedEvent: { type: 'Final Round Call', date: 'This week', role: 'Community Tech Lead' },
    recommendedAction: 'Reply with available time slots',
    read: false,
  },
  {
    id: 'email-6',
    from: 'Learning Team',
    fromOrg: 'Coursera',
    subject: 'Your AI Engineering path — 2 modules remaining',
    preview: 'You are making great progress! Complete the remaining 2 modules to earn your AI Engineering certificate...',
    body: 'Hi Priya,\n\nYou are making fantastic progress on the AI Engineering learning path!\n\nYou have 2 modules remaining:\n- Module 7: Agent Orchestration (60 min)\n- Module 8: Cloud AI Deployment (45 min)\n\nComplete them to earn your certificate and add verified evidence to your AccessHire profile.',
    date: '2026-08-25T16:30:00Z',
    category: 'general',
    extractedEvent: { type: 'Learning Milestone', role: 'AI Engineering Certificate' },
    recommendedAction: 'Complete remaining 2 modules',
    read: true,
  },
  {
    id: 'email-7',
    from: 'Scale AI Recruitment',
    fromOrg: 'Scale AI',
    subject: 'AI Quality Evaluator — We reviewed your profile',
    preview: 'We noticed your profile on AccessHire and believe you could be a great fit for our AI Quality Evaluator contract...',
    body: 'Hi Priya,\n\nOur team reviewed your capability profile and believe you would be a strong fit for our AI Quality Evaluator contract role.\n\nThis is a flexible, remote contract that pays $18/hr. You can work 10-20 hours per week.\n\nInterested? Reply to this email or apply at scale.ai/careers.',
    date: '2026-08-26T13:00:00Z',
    category: 'opportunity',
    extractedEvent: { type: 'Job Opportunity', role: 'AI Quality Evaluator' },
    recommendedAction: 'Apply directly — strong capability match',
    read: false,
  },
  {
    id: 'email-8',
    from: 'Dr. Aisha Patel',
    fromOrg: 'IIT Dharwad',
    subject: 'Research Assistant Position — Interest Check',
    preview: 'I came across your work on AI automation and would like to discuss a potential Research Assistant opportunity...',
    body: 'Dear Priya,\n\nI am a faculty member at IIT Dharwad working on AI for inclusive education. I came across your work and would like to discuss a potential Research Assistant opportunity.\n\nThe role is part-time remote and includes co-authorship on our upcoming publication.\n\nWould you be available for a 20-minute call next week?\n\nDr. Aisha Patel\nAssistant Professor, AI & Education Lab',
    date: '2026-08-24T11:00:00Z',
    category: 'opportunity',
    extractedEvent: { type: 'Research Opportunity', role: 'Research Assistant' },
    recommendedAction: 'Schedule 20-minute introductory call',
    read: true,
  },
  {
    id: 'email-9',
    from: 'AccessHire AI',
    fromOrg: 'AccessHire',
    subject: 'Capability Update — Your AI score increased by 6%',
    preview: 'Your recent AI Evaluation trial has updated your Capability Twin. AI / ML proficiency increased from 72% to 78%...',
    body: 'Hi Priya,\n\nYour recent AI Evaluation practical trial has been processed and your Capability Twin has been updated.\n\nAI / ML: 72% → 78% (+6%)\nAI Evaluation: New capability added at 74%\nFuture Readiness: 67% → 74% (+7%)\n\nYour capability momentum is now +18% this month.',
    date: '2026-08-27T18:00:00Z',
    category: 'general',
    read: false,
  },
  {
    id: 'email-10',
    from: 'TCS Recruitment',
    fromOrg: 'Tata Consultancy Services',
    subject: 'Data Engineering Fellowship — Application Open',
    preview: 'Applications are now open for our 2026 Data Engineering Fellowship. Limited seats available...',
    body: 'Dear Candidate,\n\nApplications are now open for TCS Data Engineering Fellowship 2026.\n\nEligibility: Any graduate with demonstrated data skills.\nDuration: 6 months\nStipend: ₹20,000/month\nDeadline: September 15, 2026\n\nApply at tcs.com/fellowship',
    date: '2026-08-23T09:00:00Z',
    category: 'opportunity',
    extractedEvent: { type: 'Fellowship Application', date: 'September 15, 2026', role: 'Data Engineering Fellow' },
    recommendedAction: 'Apply — 81% capability match',
    read: true,
  },
];

// ─── Momentum Chart Data ───────────────────────────────────────

export const mockMomentumData: MomentumDataPoint[] = [
  { month: 'Mar', capabilities: 54, opportunities: 35, readiness: 48 },
  { month: 'Apr', capabilities: 59, opportunities: 42, readiness: 52 },
  { month: 'May', capabilities: 63, opportunities: 48, readiness: 56 },
  { month: 'Jun', capabilities: 67, opportunities: 55, readiness: 60 },
  { month: 'Jul', capabilities: 72, opportunities: 63, readiness: 65 },
  { month: 'Aug', capabilities: 78, opportunities: 74, readiness: 71 },
  { month: 'Sep', capabilities: 82, opportunities: 83, readiness: 74 },
];

// ─── Workforce Departments ────────────────────────────────────

export const mockWorkforceDepartments: WorkforceDepartment[] = [
  {
    id: 'dept-it',
    name: 'IT Support & Infrastructure',
    headcount: 1240,
    capabilities: {
      'Python': 54, 'AI / ML': 21, 'Cloud': 43, 'SQL': 67, 'Linux': 78, 'Automation': 52, 'Data Analysis': 38, 'Security': 44,
    },
    transitions: [
      { from: 'IT Support', to: 'AI Operations Engineer', readiness: 74, employees: 312 },
      { from: 'IT Support', to: 'Cloud Engineer', readiness: 61, employees: 218 },
    ],
  },
  {
    id: 'dept-data',
    name: 'Data & Analytics',
    headcount: 890,
    capabilities: {
      'Python': 79, 'AI / ML': 58, 'Cloud': 62, 'SQL': 91, 'Linux': 44, 'Automation': 61, 'Data Analysis': 88, 'Security': 28,
    },
    transitions: [
      { from: 'Data Analyst', to: 'AI Analytics Engineer', readiness: 86, employees: 267 },
      { from: 'Data Analyst', to: 'Data Engineer', readiness: 71, employees: 195 },
    ],
  },
  {
    id: 'dept-qa',
    name: 'Quality Assurance',
    headcount: 650,
    capabilities: {
      'Python': 48, 'AI / ML': 34, 'Cloud': 29, 'SQL': 61, 'Linux': 52, 'Automation': 73, 'Data Analysis': 55, 'Security': 31,
    },
    transitions: [
      { from: 'QA Engineer', to: 'AI Evaluation Specialist', readiness: 81, employees: 234 },
      { from: 'QA Engineer', to: 'AI Security Analyst', readiness: 59, employees: 98 },
    ],
  },
  {
    id: 'dept-ops',
    name: 'Operations & Business',
    headcount: 2100,
    capabilities: {
      'Python': 22, 'AI / ML': 15, 'Cloud': 34, 'SQL': 52, 'Linux': 18, 'Automation': 41, 'Data Analysis': 63, 'Security': 22,
    },
    transitions: [
      { from: 'Business Analyst', to: 'AI-Enabled BA', readiness: 79, employees: 445 },
    ],
  },
  {
    id: 'dept-engineering',
    name: 'Software Engineering',
    headcount: 3200,
    capabilities: {
      'Python': 81, 'AI / ML': 52, 'Cloud': 71, 'SQL': 74, 'Linux': 68, 'Automation': 65, 'Data Analysis': 59, 'Security': 43,
    },
    transitions: [
      { from: 'Backend Engineer', to: 'AI Operations Engineer', readiness: 82, employees: 512 },
      { from: 'Frontend Engineer', to: 'AI Product Engineer', readiness: 68, employees: 289 },
    ],
  },
  {
    id: 'dept-security',
    name: 'Cybersecurity',
    headcount: 420,
    capabilities: {
      'Python': 65, 'AI / ML': 38, 'Cloud': 55, 'SQL': 48, 'Linux': 82, 'Automation': 57, 'Data Analysis': 44, 'Security': 89,
    },
    transitions: [
      { from: 'Security Analyst', to: 'AI Security Analyst', readiness: 77, employees: 156 },
    ],
  },
];

// ─── Equity Candidates ────────────────────────────────────────

export const mockEquityCandidates: EquityCandidate[] = [
  {
    id: 'eq-1',
    name: 'Priya Sharma',
    capabilityFit: 88,
    evidenceConfidence: 92,
    careerGap: '3 years',
    location: 'Hubli, India',
    credentials: 'B.Sc. Computer Applications',
  },
  {
    id: 'eq-2',
    name: 'Arjun Nair',
    capabilityFit: 79,
    evidenceConfidence: 81,
    careerGap: '1 year',
    location: 'Kochi, India',
    credentials: 'Diploma in CS',
  },
  {
    id: 'eq-3',
    name: 'Fatima Sheikh',
    capabilityFit: 84,
    evidenceConfidence: 87,
    careerGap: '5 years',
    location: 'Hyderabad, India',
    credentials: 'Self-taught + Certifications',
  },
];

// ─── Notifications ────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'capability',
    title: 'AI Capability +6%',
    message: 'Your AI / ML proficiency increased from 72% to 78% after the evaluation trial.',
    timestamp: '2026-08-28T18:00:00Z',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'opportunity',
    title: 'New 94% Match',
    message: 'Community Tech Lead at Digital Bharat Initiative — 95% match with your capabilities.',
    timestamp: '2026-08-28T14:00:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'email',
    title: 'Interview Email Detected',
    message: 'Infosys AI Labs shortlisted you for AI Operations Internship. Response required.',
    timestamp: '2026-08-28T08:30:00Z',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'resume',
    title: 'Resume Can Improve +13%',
    message: 'Optimizing for Data Engineering Fellowship can improve ATS fit from 69% to 84%.',
    timestamp: '2026-08-27T20:00:00Z',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'verification',
    title: 'Capability Verified: 83%',
    message: 'Your AI Ops practical trial is complete. Capability Twin updated.',
    timestamp: '2026-08-27T17:00:00Z',
    read: true,
  },
];

// ─── Future Workforce Signals ─────────────────────────────────

export const mockFutureSignals = [
  { role: 'AI Engineering', trend: 'rising', magnitude: 3, year2026: 72, year2027: 88, year2028: 95 },
  { role: 'AI Security', trend: 'rising', magnitude: 3, year2026: 58, year2027: 74, year2028: 89 },
  { role: 'Cloud AI', trend: 'rising', magnitude: 2, year2026: 64, year2027: 77, year2028: 85 },
  { role: 'AI Evaluation', trend: 'rising', magnitude: 2, year2026: 51, year2027: 68, year2028: 81 },
  { role: 'Traditional QA', trend: 'stable', magnitude: 0, year2026: 62, year2027: 61, year2028: 58 },
  { role: 'Routine IT Support', trend: 'declining', magnitude: -2, year2026: 58, year2027: 47, year2028: 35 },
  { role: 'Data Engineering', trend: 'rising', magnitude: 1, year2026: 69, year2027: 75, year2028: 78 },
  { role: 'AI Product Management', trend: 'rising', magnitude: 2, year2026: 44, year2027: 61, year2028: 73 },
];

// ─── AI Mock Responses ────────────────────────────────────────

export const mockAIResponses: Record<string, string> = {
  'interview-prep': `Great! I've loaded your full context for the Infosys AI Operations Internship interview.

**Your Capability Profile for This Role:**
- Python 87% ✓ (above threshold)
- APIs 84% ✓ 
- Linux 76% ✓
- Automation 80% ✓
- AI Evaluation: 74% (gap — but trending up)

**Likely Interview Topics Based on JD Analysis:**

1. **AI Service Monitoring** — How would you detect degradation in an LLM service?
2. **Incident Response** — Walk through a production AI outage you've handled (or would handle)
3. **Evaluation Metrics** — How do you measure LLM output quality?
4. **Python Scripting** — Write a health-check script for a deployed model endpoint

**Recommended Prep Sequence:**
1. Review your practical trial results (Technical Execution: 84%)
2. Prepare STAR stories around your troubleshooting experience
3. Study LLM evaluation frameworks: RAGAS, DeepEval
4. Practice explaining your Capability Twin scores

Want me to run a mock interview session?`,

  'resume-help': `I can see you're targeting the **AI Operations Internship at Infosys AI Labs**. Your current resume has an ATS fit of **81%**.

**Key gaps I've identified:**
- Missing: "AI evaluation", "model monitoring", "LLM" keywords
- Your Python experience isn't quantified
- Cloud section is thin (this role requires cloud context)

**Recommended optimizations:**
1. Add "Deployed AI evaluation pipeline using Python and REST APIs" to your project section
2. Quantify: "Automated workflows reducing manual effort by 40%"
3. Add AI evaluation terminology from your practical trial

Want me to generate the optimized version now?`,

  'capability-question': `Based on your Capability Twin, here's where you stand for the AI Operations Engineer transition:

**Strongest Transferable Capabilities:**
- Troubleshooting: 91% — directly maps to production incident response
- Python: 87% — core language for AI ops
- Automation: 80% — essential for MLOps pipelines

**The Critical Gap:**
- AI Evaluation: Currently 45%, required: 70%+
- This is your single most important capability to close

**Fastest path to close it:**
1. Complete the AI Evaluation practical trial (35 min) → +15-20%
2. Review RAGAS / DeepEval frameworks (2 hours)
3. Build one small evaluation script for a public LLM

After these steps, your transition readiness jumps from 74% → 89%.`,
};
