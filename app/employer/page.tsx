'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Bot,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  UserCheck,
  ArrowRight,
  ShieldAlert,
  Brain,
  MessageSquare
} from 'lucide-react';
import { WORKFORCE_CONSOLE_DATA, Candidate } from '@/lib/mockData';
import { useAccessHireStore } from '@/lib/store';

export default function EmployerDashboard() {
  const {
    jobPostTitle,
    jobPostRequirements,
    jobPostFlagged,
    jobPostRewrite,
    setJobPostTitle,
    setJobPostRequirements,
    acceptJobPostRewrite,
    dismissJobPostFlag,
    selectedCandidateId,
    nudgeQuestions,
    isGeneratingQuestions,
    setSelectedCandidateId,
    generateNudgeQuestions
  } = useAccessHireStore();

  const [activeGapId, setActiveGapId] = useState<string | null>('gap-1');

  const selectedGap = WORKFORCE_CONSOLE_DATA.workforceGaps.find((g) => g.id === activeGapId);

  // Find candidate selected for equity nudge evaluation
  const activeCandidate = WORKFORCE_CONSOLE_DATA.workforceGaps
    .flatMap((g) => g.candidates)
    .find((c) => c.id === selectedCandidateId) || WORKFORCE_CONSOLE_DATA.workforceGaps[0].candidates[2]; // Sarah Jenkins default

  return (
    <div className="space-y-8 py-2">
      {/* Persona Header & Stat Bar */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0B2E4F] flex items-center justify-center text-white font-serif text-xl font-bold border-2 border-[#1C7293]">
              D
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E4F]">
                  Workforce Capability Console
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                  Operations Director View
                </span>
              </div>
              <p className="text-xs text-[#5B6B79]">
                Persona: David, 42 | Strategic Workforce Allocation & Internal Talent Discovery
              </p>
            </div>
          </div>
        </div>

        {/* TOP STAT BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card-saas p-4 bg-white border-l-4 border-l-[#0B2E4F]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B79]">
              Total Internal Workforce
            </span>
            <div className="text-2xl font-serif font-bold text-[#0B2E4F] mt-1">
              {WORKFORCE_CONSOLE_DATA.totalEmployees.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center mt-1">
              <Users className="w-3 h-3 mr-1" /> 100% Capability-Mapped
            </span>
          </div>

          <div className="card-saas p-4 bg-white border-l-4 border-l-[#1C7293]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B79]">
              Internal Mobility Rate
            </span>
            <div className="text-2xl font-serif font-bold text-[#1C7293] mt-1">
              {WORKFORCE_CONSOLE_DATA.internalMobilityRate}%
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> ↑ 8% vs external hiring
            </span>
          </div>

          <div className="card-saas p-4 bg-white border-l-4 border-l-[#F2A93B]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B79]">
              Verified Skills Index
            </span>
            <div className="text-2xl font-serif font-bold text-amber-700 mt-1">
              {WORKFORCE_CONSOLE_DATA.verifiedSkillsIndex}%
            </div>
            <span className="text-[11px] text-slate-500 font-medium flex items-center mt-1">
              Practical trial verified
            </span>
          </div>

          <div className="card-saas p-4 bg-white border-l-4 border-l-emerald-600">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B79]">
              30-Day Transition Ready
            </span>
            <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
              {WORKFORCE_CONSOLE_DATA.transitionReadyCount.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center mt-1">
              Minimum path &lt; 2 weeks
            </span>
          </div>
        </div>
      </div>

      {/* ROW 1: CAPABILITY DISTRIBUTION & FUTURE DEMAND TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Current Capability Bar Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="card-saas p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Current Capability Distribution
                </h2>
                <p className="text-xs text-[#5B6B79]">
                  Real-time verified employee skill coverage across key enterprise domains.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-teal-50 text-[#1C7293] border border-teal-200">
                SAP Telemetry
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={WORKFORCE_CONSOLE_DATA.currentCapabilities}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="skill" width={110} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(val: unknown) => [`${val}% Capability Coverage`, 'Coverage']}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="percent" radius={[0, 6, 6, 0]} barSize={16}>
                    {WORKFORCE_CONSOLE_DATA.currentCapabilities.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#1C7293', '#0B2E4F', '#10B981', '#F2A93B', '#6366F1'][index % 5]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Future Skill Demand List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="card-saas p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Future Skill Demand
                </h2>
                <p className="text-xs text-[#5B6B79]">
                  Market & project capability trend forecasts.
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-[#1C7293]" />
            </div>

            <div className="space-y-3">
              {WORKFORCE_CONSOLE_DATA.futureSkillDemand.map((item) => (
                <div
                  key={item.skill}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-serif font-bold text-xs text-[#0B2E4F] block">
                      {item.skill}
                    </span>
                    <span className="text-[10px] text-[#5B6B79]">Priority: {item.priority}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-right">
                    <span className="font-mono text-xs font-bold text-[#0B2E4F]">
                      {item.change}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.trend.includes('↑')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {item.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: WORKFORCE GAPS & INTERNAL CANDIDATE MATCHING */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#0B2E4F]">
              Workforce Skill Gap & Candidate Matching
            </h2>
            <p className="text-xs text-[#5B6B79]">
              Click a workforce gap card to inspect matched internal candidates ready for transition.
            </p>
          </div>
        </div>

        {/* Gap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKFORCE_CONSOLE_DATA.workforceGaps.map((gap) => {
            const isSelected = activeGapId === gap.id;
            return (
              <div
                key={gap.id}
                onClick={() => setActiveGapId(gap.id)}
                className={`card-saas p-5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-2 border-[#1C7293] bg-teal-50/20 shadow-md'
                    : 'bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
                    Gap Role
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      gap.urgency === 'Critical'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {gap.urgency} Urgency
                  </span>
                </div>

                <div className="space-y-1 my-2">
                  <h3 className="font-serif font-bold text-lg text-[#0B2E4F]">
                    {gap.roleTitle}
                  </h3>
                  <div className="text-2xl font-serif font-bold text-rose-600">
                    {gap.openCount.toLocaleString()} <span className="text-xs text-slate-500 font-sans">Open Gaps</span>
                  </div>
                </div>

                <button
                  className={`w-full mt-2 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1 ${
                    isSelected
                      ? 'bg-[#1C7293] text-white'
                      : 'bg-slate-100 text-[#0B2E4F] hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 mr-1" />
                  <span>See Internal Candidates ({gap.candidates.length})</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Gap Candidate Review Panel */}
        {selectedGap && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-saas p-6 bg-white space-y-4 border border-[#1C7293]/30"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
                  Internal Talent Pool Matching
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0B2E4F]">
                  Top Candidates for {selectedGap.roleTitle}
                </h3>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Inclusive Match Engine Active
              </span>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedGap.candidates.map((cand) => {
                const isSelectedForNudge = activeCandidate.id === cand.id;

                return (
                  <div
                    key={cand.id}
                    className={`p-4 rounded-xl border space-y-3 transition-all ${
                      cand.hasCareerGap
                        ? 'border-amber-300 bg-amber-50/40'
                        : isSelectedForNudge
                        ? 'border-[#1C7293] bg-teal-50/30'
                        : 'border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#0B2E4F]">
                          {cand.name}
                        </h4>
                        <span className="text-xs text-slate-600">{cand.currentRole}</span>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0B2E4F] text-amber-300 font-mono">
                        {cand.matchPercent}% Match
                      </span>
                    </div>

                    {cand.hasCareerGap && (
                      <div className="p-2 rounded bg-amber-100/80 border border-amber-300 text-[11px] text-amber-900 flex items-start space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{cand.gapReason}</span>
                      </div>
                    )}

                    <div className="space-y-1 pt-1 text-xs text-slate-700">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Verified Capabilities:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cand.capabilities.map((c) => (
                          <span
                            key={c.name}
                            className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-[#0B2E4F]"
                          >
                            {c.name}: {c.score}%
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/80">
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Transition: {cand.gapDays} days
                      </span>
                      <button
                        onClick={() => setSelectedCandidateId(cand.id)}
                        className={`text-xs font-bold px-2.5 py-1 rounded transition-colors ${
                          cand.hasCareerGap
                            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                            : 'bg-[#1C7293] hover:bg-[#155a75] text-white'
                        }`}
                      >
                        Select for Nudge Review
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* ROW 3: EQUITY NUDGE AGENT & JOB FAIRNESS AGENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Equity Nudge Agent Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-saas p-6 bg-white space-y-4 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-amber-600" />
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Equity Nudge Agent
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                Bias Reduction Active
              </span>
            </div>

            {/* Candidate Context */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
                Selected Candidate Review
              </span>
              <div className="font-serif font-bold text-sm text-[#0B2E4F]">
                {activeCandidate.name} ({activeCandidate.currentRole})
              </div>
              {activeCandidate.hasCareerGap ? (
                <span className="text-amber-800 font-semibold block text-[11px]">
                  ⚠️ Flagged Attribute: {activeCandidate.gapReason}
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold block text-[11px]">
                  ✓ Career Continuity Clear • 83%+ Skill Adjacency
                </span>
              )}
            </div>

            {/* Live Equity Nudge Banner */}
            <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 space-y-2 text-xs text-amber-950 shadow-sm">
              <div className="flex items-center space-x-2 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Equity Nudge Agent Insight</span>
              </div>
              <p className="leading-relaxed text-slate-800">
                &quot;Career continuity may not accurately represent current capability—evaluate demonstrated skills separately.&quot;
              </p>
            </div>

            {/* Generate Capability-Based Interview Questions */}
            <div className="space-y-3 pt-1">
              <button
                onClick={() => generateNudgeQuestions(activeCandidate.name)}
                disabled={isGeneratingQuestions}
                className="w-full py-2.5 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                {isGeneratingQuestions ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin text-[#F2A93B]" />
                    <span>Synthesizing Competency Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F2A93B]" />
                    <span>Generate Capability-Based Interview Questions</span>
                  </>
                )}
              </button>

              {/* Display Generated Questions */}
              {nudgeQuestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-2 pt-2 border-t border-slate-200 text-xs"
                >
                  <span className="font-serif font-bold text-[#0B2E4F] flex items-center">
                    <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#1C7293]" />
                    4 Structured Capability Interview Questions:
                  </span>
                  <div className="space-y-2">
                    {nudgeQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[#16232E] italic leading-relaxed"
                      >
                        {q}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Job Fairness Agent Mini-Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="card-saas p-6 bg-white space-y-4 border-l-4 border-l-[#1C7293]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-[#1C7293]" />
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Job Fairness Agent (&quot;Post a Job&quot;)
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#1C7293] border border-sky-200">
                Credential Proxy Guard
              </span>
            </div>

            {/* Mini-Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0B2E4F] block mb-1">
                  Job Role Title
                </label>
                <input
                  type="text"
                  value={jobPostTitle}
                  onChange={(e) => setJobPostTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs text-[#16232E] focus:ring-2 focus:ring-[#1C7293] focus:outline-none bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0B2E4F] block mb-1">
                  Job Requirements Field
                </label>
                <textarea
                  value={jobPostRequirements}
                  onChange={(e) => setJobPostRequirements(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-sans text-[#16232E] focus:ring-2 focus:ring-[#1C7293] focus:outline-none bg-slate-50/50 resize-none"
                />
              </div>

              {/* Flagged Warning Banner */}
              <AnimatePresence>
                {jobPostFlagged && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-xl bg-rose-50 border-2 border-rose-300 space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between text-rose-900 font-bold">
                      <span className="flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1.5 text-rose-600" />
                        Potential Credential Proxy Flagged
                      </span>
                      <span className="text-[10px] bg-rose-200 px-2 py-0.5 rounded text-rose-900">
                        Excludes ~72% internal candidates
                      </span>
                    </div>

                    <p className="text-rose-950 leading-relaxed">
                      Requiring a formal <em>&quot;Master&apos;s degree in Computer Science&quot;</em> acts as a proxy barrier that overlooks employees with verified practical capability.
                    </p>

                    <div className="p-3 rounded-lg bg-white border border-rose-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
                        Suggested Capability-Based Rewrite:
                      </span>
                      <p className="text-xs font-medium text-[#0B2E4F] italic">
                        &quot;{jobPostRewrite}&quot;
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={acceptJobPostRewrite}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Accept Rewrite
                      </button>
                      <button
                        onClick={dismissJobPostFlag}
                        className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 text-xs"
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!jobPostFlagged && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                  <span>Job requirement complies with capability-based hiring guidelines.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
