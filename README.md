# AccessHire — Adaptive Capability Twin

> **See Capability. Prove Potential. Enable Transition.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-FF0055?logo=framer)](https://www.framer.com/motion)
[![SAP Hackfest 2026](https://img.shields.io/badge/SAP_Hackfest-2026-0070F3)](https://github.com/Devengoyal885/Access-Hire)

---

## What is AccessHire?

AccessHire is an **AI Career & Workforce Operating System** built around one central intelligence layer — the **Adaptive Capability Twin**.

It understands what a person can actually do, converts hidden and non-traditional experience into enterprise capabilities, identifies transferable capabilities, forecasts high-potential future career paths, creates targeted transition plans, verifies capabilities through practical work, discovers relevant opportunities, and helps employers make more inclusive workforce decisions.

**AccessHire does NOT ask:**
- Where did you study?
- What was your previous job title?
- How long is your career gap?

**AccessHire asks:**
- What can you actually do?
- What evidence proves it?
- What could you become?
- What is the shortest path to get there?

---

## The Problem

```
CANDIDATES                          EMPLOYERS
─────────                           ─────────
Resume black holes                  Blind internal talent  
Degree proxy barriers               Slow reskilling loops
Career gap penalties                Unconscious screening bias
Course completion traps             Inaccessible hiring workflows
```

Capable people get overlooked. Organizations struggle with critical skill shortages — even though the talent already exists inside their workforce.

---

## The Solution

**One intelligent system. Everything connected.**

```
CAPABILITY → EVIDENCE → OPPORTUNITY → ACTION → PRACTICAL WORK → VERIFICATION → GROWTH → NEW CAPABILITY
```

---

## Core Philosophy

| Traditional | AccessHire |
|-------------|-----------|
| Pedigree | **Capability** |
| Claims | **Evidence** |
| Static Resume | **Living Capability Twin** |
| Job Search | **Opportunity Intelligence** |
| Course List | **Targeted Transition** |
| Prediction | **Practical Verification** |
| Hiring Filter | **Inclusive Enablement** |

---

## The Adaptive Capability Twin

The Capability Twin is the signature feature of AccessHire. It is a **living, evidence-backed profile** of what you can actually do.

### Twin Properties

| Property | Description |
|----------|-------------|
| **Proficiency** | Current skill level (0–100%) |
| **Evidence Confidence** | How strongly evidence supports the claim |
| **Independent Capability** | What you can do without AI assistance |
| **AI-Assisted Capability** | What you can do with AI tools |
| **Recency** | How fresh the evidence is |
| **Growth Timeline** | Historical capability development |

### Evidence Sources

- 🐙 **GitHub** — repositories, commits, contributions
- 🔨 **Projects** — portfolio work, side projects
- 📋 **Practical Assessment** — verified work trials
- 💼 **Work Evidence** — employment, freelance, community work
- 🎓 **Certifications** — validated learning outcomes

---

## Platform Features

### Individual Career OS

#### 1. Command Center
Personal dashboard with Career Momentum chart, AI-prioritized Next Best Actions, top capabilities overview, and opportunity radar preview.

#### 2. Capability Twin
Interactive capability graph with 12+ connected nodes. Click any node to open detailed evidence panel with proficiency scores, evidence timeline, and growth history.

#### 3. Capability Translator ⭐ Key Demo Feature
Describe lived experience in plain language → AI transforms it into verified enterprise capabilities.

**Example:**
> "I organize my village's annual festival. Around 5,000 people attend. I manage the budget, vendors, volunteers and logistics."

**Translates to:**
- Large-Scale Event Operations — 87%
- Budget Management — 82%
- Vendor Negotiation — 79%
- Stakeholder Coordination — 91%
- Team Leadership — 84%
- Risk Management — 76%

#### 4. Career Path Intelligence
Shows connected future roles with readiness percentages, transferable capabilities, missing capabilities, and step-by-step transition roadmaps.

#### 5. Practical Transition Trial
Interactive simulated work environment where candidates complete real tasks (deploy AI service, identify failures, evaluate outputs, produce reports). Results verify capabilities and update the Twin.

**After completion:**
```
Technical Execution    84%
Problem Solving        89%
AI Evaluation          78%
Cloud Deployment       81%
Independence           86%
───────────────────────────
CAPABILITY VERIFIED:   83%
```

#### 6. Opportunity Radar
10+ opportunities matched to capabilities, with animated match rings, capability gap analysis, and intelligent filtering by type, location, compensation, and deadline.

#### 7. Resume Studio
Paste any job description → AI analyzes requirements → generates tailored, capability-grounded resume. ATS fit animates from 81% → 94%.

**Integrity commitment:** Never fabricates experience, skills, or credentials.

#### 8. Action Center
Intelligent action queue combining opportunities, emails, assessments, interviews, and deadlines into one prioritized view.

#### 9. Opportunity & Communication Intelligence (Mail Intelligence)
AI-analyzed career emails with extracted events, recommended actions, and one-click action creation.

#### 10. AI Workspace
Multi-model AI environment with shared career context. Supports ChatGPT, Gemini, Claude, and Auto routing. Context Panel shows full capability context automatically.

#### 11. Context Capsule ⭐ WOW Feature
Compresses 42,800 tokens → 2,100 tokens (95% reduction). Creates a portable structured context package so another AI can continue the work without re-explanation.

---

### Enterprise Workforce OS

#### 12. Workforce Capability Console
Heatmap of department × capability scores across 6+ departments and 8+ capabilities. Color-coded by proficiency level.

#### 13. Internal Mobility Engine
Identifies employees ready to transition to high-demand roles internally. Calculates readiness percentages and transition counts. One-click reskilling plan generation.

#### 14. Equity Nudge
During candidate review, surfaces capability-based insights when career gaps are detected. Generates capability-based interview questions grounded in actual skills, not credentials.

**Key principle:** "AI recommends. Humans decide."

#### 15. Job Fairness Agent
Analyzes job descriptions for credential proxies, geographic bias, and exclusionary language. Suggests capability-based rewrites. Human approval required.

#### 16. Accessibility & Accommodation
Generates tailored accommodation blueprints based on candidate capability, work requirements, and accessibility preferences. "Enable the person, not just filter for fit."

#### 17. Bias Audit
Tracks credential bias, career gap bias, geographic bias, and job title proxy across hiring decisions. Full audit trail with evidence, reasoning, and decision history.

---

## Architecture

```
app/
├── page.tsx                    # Landing / Login page
├── layout.tsx                  # Root layout (fonts, theme)
├── globals.css                 # Design system (CSS variables)
│
├── (app)/                      # App shell group (sidebar + topbar)
│   ├── layout.tsx              # Sidebar + Topbar shell
│   ├── dashboard/              # Command Center
│   ├── capability/             # Capability Twin (4 tabs)
│   ├── opportunities/          # Opportunity Radar
│   ├── resume/                 # Resume Studio
│   ├── actions/                # Action Center + Mail Intelligence
│   ├── workspace/              # AI Workspace + Context Capsule
│   ├── workforce/              # Workforce Console (6 tabs)
│   ├── profile/                # User Profile
│   ├── settings/               # Privacy & Settings
│   └── help/                   # Documentation
│
├── employee/                   # → redirects to /dashboard
├── employer/                   # → redirects to /workforce
├── translator/                 # → redirects to /capability?tab=translator
├── accessibility/              # → redirects to /workforce
└── how-it-works/              # → redirects to /help

components/
├── layout/
│   ├── Sidebar.tsx             # Premium sidebar with logo + momentum
│   ├── Topbar.tsx              # Search, notifications, theme, profile
│   ├── CommandPalette.tsx      # Ctrl+K command palette
│   └── ThemeSwitcher.tsx       # Dark/light mode toggle

data/
├── mockData.ts                 # All rich demo data (Priya's profile, 20+ caps, 10+ opps)

lib/
└── utils.ts                    # Utility functions (cn, formatDate, sleep, etc.)

types/
└── index.ts                    # Complete TypeScript type system
```

---

## AI Architecture

```
AIProvider (abstraction)
├── ChatGPTProvider
├── GeminiProvider
├── ClaudeProvider
└── MockProvider (demo mode)

Multi-AI Router
├── Task analysis
├── Provider recommendation
├── Transparent routing
└── Configurable overrides
```

AI providers are abstracted behind an interface. All demo content uses realistic mock responses. Real API keys can be added via environment variables without code changes.

---

## Data Flow

```
User Experience (Natural Language)
         ↓
Capability Translator
         ↓
Capability Twin (Graph)
         ↓
Transfer Analysis → Future Roles
         ↓
Opportunity Radar → Matched Opportunities
         ↓
JD Analysis → Resume Studio
         ↓
Practical Trial → Capability Verification
         ↓
Twin Update → New Capability Score
         ↓
Action Center → Employer Review
         ↓
Equity Nudge → Inclusive Decision
```

---

## Demo Flow (SAP Judges)

### Primary Candidate: Priya Sharma
- 29 years old, Hubli, India
- B.Sc. Computer Applications
- 3-year career gap
- Self-learning AI and data analysis
- Target: AI Operations Engineer

### The 13-Step Demo

| # | Feature | WOW Moment |
|---|---------|-----------|
| 1 | Capability Translator | Natural experience → Enterprise capabilities |
| 2 | Capability Twin | Living graph updates in real-time |
| 3 | Career Path Intelligence | IT Support → AI Ops at 74% readiness |
| 4 | Opportunity Radar | 94% match appears with animated ring |
| 5 | Resume Studio | JD analysis → Tailored resume |
| 6 | ATS Score | 81% → 94% animated |
| 7 | Transition Plan | 3 caps, 1 project, 1 trial |
| 8 | Practical Trial | Capability verified at 83% |
| 9 | Email Intelligence | Interview email → Action created |
| 10 | Action Center | Unified intelligent queue |
| 11 | AI Workspace | Context already loaded |
| 12 | Context Capsule | 42,800 → 2,100 tokens |
| 13 | Equity Nudge | Employer sees capability, not gap |

### Final Journey

```
INVISIBLE → TRANSLATED → UNDERSTOOD → DEVELOPED → VERIFIED → MATCHED → INCLUDED → EMPOWERED
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.1 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 13 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| State | Zustand + React State |
| Fonts | Inter (Google Fonts) |
| Database | PostgreSQL + Prisma (architected) |
| AI | Provider abstraction (mock + real) |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Devengoyal885/Access-Hire.git
cd Access-Hire

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (optional — mocks work without)

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Demo Credentials

No authentication required. The application runs in demo mode with pre-populated data for:

- **Individual:** Priya Sharma (IT Support → AI Operations transition)
- **Enterprise:** Multi-department workforce with 10,000 employees

---

## Environment Variables

All environment variables are optional. The application uses realistic mock responses when API keys are not provided.

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Real ChatGPT responses |
| `GOOGLE_GEMINI_API_KEY` | Real Gemini responses |
| `ANTHROPIC_API_KEY` | Real Claude responses |
| `DATABASE_URL` | PostgreSQL connection |
| `NEXT_PUBLIC_DEMO_MODE` | Enable demo mode (default: true) |

---

## Responsible AI

AccessHire is designed with responsible AI principles:

- **Transparency:** AI recommendations are always labeled and explainable
- **Human Control:** "AI recommends. Humans decide." — all critical decisions require human approval
- **No Fabrication:** Resume Studio never invents experience, credentials, or skills
- **Privacy:** Users control what context is shared with AI providers
- **Bias Detection:** Active bias auditing with full audit trails
- **Capability Focus:** Reduces credential and career gap bias by design

---

## Limitations

- Demo mode uses mock AI responses (not real API calls)
- Database integration is architected but not fully implemented
- Email integration is simulated with mock data
- Career predictions use probabilistic signals, not deterministic forecasts

---

## Future Roadmap

- [ ] Real AI provider integration (OpenAI, Gemini, Claude)
- [ ] PostgreSQL database with Prisma ORM
- [ ] OAuth authentication (Google, LinkedIn)
- [ ] Real email integration (Gmail API, Outlook)
- [ ] Mobile app (React Native)
- [ ] Browser extension for opportunity capture
- [ ] Employer API for ATS integration
- [ ] Multi-language support (Hindi, Kannada, Tamil)
- [ ] Voice input for Capability Translator

---

## Team

**Star Coders** — SAP Hackfest 2026, Theme 2: Inclusive Workforce

---

## License

MIT License — See [LICENSE](LICENSE) for details.

---

*AccessHire — Adaptive Capability Twin*  
*"See Capability. Prove Potential. Enable Transition."*
