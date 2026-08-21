'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  UserCheck,
  Building2,
  ArrowRight,
  ShieldCheck,
  Target,
  FileX,
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Bot,
  Accessibility
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-4">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden card-saas bg-gradient-to-b from-[#0B2E4F] via-[#0D365C] to-[#0B2E4F] text-white p-8 md:p-14 border border-[#1C7293]/30 shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#1C7293]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#F2A93B]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1C7293]/40 border border-[#1C7293] text-amber-300 text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>SAP Hackfest 2026 • Theme 2: Inclusive Workforce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white"
          >
            See Capability. Prove Potential.{' '}
            <span className="text-[#F2A93B] block mt-1">Enable Transition.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Traditional hiring filters candidates by job titles, resume keywords, degrees, and career gaps.
            <strong className="text-white font-semibold"> Access-Hire</strong> equips every individual with an evidence-backed living
            <span className="text-teal-300 font-semibold"> Capability Twin</span> that translates lived experience into enterprise value and maps the minimum path to transition.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/employee"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>View as Employee (Capability Twin)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/employer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl bg-[#1C7293] hover:bg-[#155973] text-white font-bold text-sm border border-teal-400/30 shadow-md transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4 text-teal-300" />
              <span>View as Company (Workforce Console)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="pt-4 flex items-center justify-center space-x-6 text-xs text-slate-300">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> No resume keyword proxies
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Practical trial verification
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Equity & fairness nudges
            </span>
          </div>
        </div>
      </section>

      {/* THE TALENT PARADOX SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E4F]">
            The Talent Paradox
          </h2>
          <p className="text-sm text-[#5B6B79]">
            Capable people get overlooked while organizations struggle with critical internal skill shortages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Candidate Dilemma */}
          <div className="card-saas p-6 border-l-4 border-l-rose-500 bg-white space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                  <FileX className="w-4 h-4 text-rose-600" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  The Candidate Problem
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Uncredited Talent
              </span>
            </div>

            <ul className="space-y-3 text-sm text-[#16232E]">
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-rose-500 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Resume Black Hole:</strong> Real-world experience (community leadership, self-taught systems, caregiving gaps) gets filtered out by ATS parsers.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-rose-500 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Degree Proxy Barriers:</strong> Job descriptions demand CS degrees for roles where practical scripting capability is all that is required.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-rose-500 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Career Gap Penalty:</strong> Continuity interruptions (family care, illness, resettlement) unfairly reset perceived capability scores to zero.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-rose-500 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Course Completion Trap:</strong> Certificates prove you watched videos, not that you can diagnose a live production incident.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/translator"
                className="inline-flex items-center text-xs font-semibold text-[#1C7293] hover:text-[#0B2E4F]"
              >
                <span>Translate lived experience into capabilities</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Employer Dilemma */}
          <div className="card-saas p-6 border-l-4 border-l-amber-500 bg-white space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Search className="w-4 h-4 text-amber-700" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  The Employer Problem
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Hidden Skills Gap
              </span>
            </div>

            <ul className="space-y-3 text-sm text-[#16232E]">
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Blind Internal Talent:</strong> Organizations spend millions hiring externally while existing employees already possess 80%+ of adjacent skills.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Slow Reskilling Loops:</strong> Generic 6-month training programs fail because they don&apos;t target the <em>minimum transition path</em>.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Unconscious Screening Bias:</strong> Hiring managers over-index on historical job titles instead of verified practical execution.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-amber-600 mr-2 mt-0.5 shrink-0" />
                <span>
                  <strong>Inaccessible Workflows:</strong> Qualified neurodivergent or disabled employees are excluded by rigid, non-accommodating hiring steps.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/employer"
                className="inline-flex items-center text-xs font-semibold text-[#1C7293] hover:text-[#0B2E4F]"
              >
                <span>Inspect internal workforce capability console</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE INNOVATION PILLARS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
            How Access-Hire Solves It
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E4F]">
            The Four Core Engines
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="card-saas p-5 space-y-3 border-t-2 border-t-[#0B2E4F]">
            <div className="w-9 h-9 rounded-lg bg-[#0B2E4F]/10 flex items-center justify-center text-[#0B2E4F]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
              1. Capability Translator
            </h3>
            <p className="text-xs text-[#5B6B79] leading-relaxed">
              Transforms unstructured text description of real-world activities (e.g. festival management, family business ops) into tagged enterprise capabilities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card-saas p-5 space-y-3 border-t-2 border-t-[#1C7293]">
            <div className="w-9 h-9 rounded-lg bg-[#1C7293]/10 flex items-center justify-center text-[#1C7293]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
              2. Living Capability Twin
            </h3>
            <p className="text-xs text-[#5B6B79] leading-relaxed">
              An evidence-backed profile showing proficiency, recency, independence vs AI-assistance, and multi-source evidence confidence.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card-saas p-5 space-y-3 border-t-2 border-t-[#F2A93B]">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
              3. Minimum Transition Trial
            </h3>
            <p className="text-xs text-[#5B6B79] leading-relaxed">
              Interactive practical task sandbox (deploy, diagnose, evaluate, report) that directly verifies skills and updates capability scores.
            </p>
          </div>

          {/* Card 4 */}
          <div className="card-saas p-5 space-y-3 border-t-2 border-t-emerald-600">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-700">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
              4. Equity & Fairness Agents
            </h3>
            <p className="text-xs text-[#5B6B79] leading-relaxed">
              Active agents that flag career gap bias, generate structured capability interview questions, and rewrite degree proxy job descriptions.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK QUICK-NAV BANNER */}
      <section className="card-saas bg-[#0B2E4F] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#1C7293]/30">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-serif text-xl font-bold text-white">Ready to explore the prototype?</h3>
          <p className="text-xs text-slate-300">
            Try translating lived experience, running a practical trial, or reviewing fairness agent nudges.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/translator"
            className="px-4 py-2.5 rounded-lg bg-[#1C7293] hover:bg-[#155a75] text-white text-xs font-semibold transition-colors"
          >
            Translate Experience
          </Link>
          <Link
            href="/accessibility"
            className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center"
          >
            <Accessibility className="w-3.5 h-3.5 mr-1 text-[#F2A93B]" />
            Accommodation Blueprint
          </Link>
          <Link
            href="/how-it-works"
            className="px-4 py-2.5 rounded-lg bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 text-xs font-bold transition-colors"
          >
            System Architecture
          </Link>
        </div>
      </section>
    </div>
  );
}
