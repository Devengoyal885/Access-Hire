'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from 'recharts';
import {
  User,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  ArrowRight,
  ShieldCheck,
  Brain,
  Terminal,
  Activity,
  Award,
  X,
  PlayCircle,
  BarChart3
} from 'lucide-react';
import { useAccessHireStore } from '@/lib/store';
import { RoleOpportunity } from '@/lib/mockData';

export default function EmployeeDashboard() {
  const {
    employee,
    isTrialOpen,
    trialStep,
    trialCompleted,
    trialScores,
    openTrial,
    closeTrial,
    setTrialStep,
    completeTrial
  } = useAccessHireStore();

  const [expandedCapId, setExpandedCapId] = useState<string | null>('cap-3'); // AI Operations expanded by default
  const [selectedRoleModal, setSelectedRoleModal] = useState<RoleOpportunity | null>(null);

  // Practical Trial Step 3 Diagnosis state
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string | null>(null);
  const [evalAnswer, setEvalAnswer] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCapId(expandedCapId === id ? null : id);
  };

  // Radial chart data from top capabilities
  const chartData = employee.capabilities.slice(0, 4).map((c, i) => ({
    name: c.name.split(' ')[0],
    value: c.proficiency,
    fill: ['#0B2E4F', '#1C7293', '#F2A93B', '#10B981'][i % 4]
  }));

  return (
    <div className="space-y-8 py-2">
      {/* Persona Banner */}
      <div className="card-saas p-6 bg-gradient-to-r from-[#0B2E4F] via-[#0D365C] to-[#1C7293] text-white border border-[#1C7293]/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#1C7293] border-2 border-[#F2A93B] flex items-center justify-center font-serif text-2xl font-bold text-white shadow-md">
              PS
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0B2E4F] flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl font-bold text-white">{employee.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono">
                {employee.age} yrs • {employee.location}
              </span>
            </div>
            <p className="text-xs text-slate-200 font-sans">
              {employee.role} | <span className="text-teal-300 font-semibold">{employee.department}</span>
            </p>
            <div className="flex items-center space-x-3 text-[11px] text-slate-300 pt-0.5">
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                Living Capability Twin Active
              </span>
              <span>•</span>
              <span className="text-amber-300 font-semibold">
                {employee.capabilities.length} Verified Capability Nodes
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <Link
            href="/translator"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
          >
            + Translate New Experience
          </Link>
          <button
            onClick={openTrial}
            className="px-5 py-2.5 rounded-xl bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center space-x-1.5"
          >
            <Zap className="w-4 h-4 text-slate-950" />
            <span>Start Transition Trial</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD 3-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT PANEL: CAPABILITY TWIN PROFILE (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-saas p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#1C7293]" />
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Capability Bars & Evidence
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-[#1C7293] border border-sky-200">
                Live Twin
              </span>
            </div>

            {/* Micro Radial Summary */}
            <div className="h-40 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="30%"
                  outerRadius="90%"
                  barSize={10}
                  data={chartData}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background dataKey="value" cornerRadius={5} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-serif text-[#0B2E4F]">83%</span>
                <span className="text-[10px] text-[#5B6B79]">Avg Capability</span>
              </div>
            </div>

            {/* Capability Bars List */}
            <div className="space-y-3">
              {employee.capabilities.map((cap) => {
                const isExpanded = expandedCapId === cap.id;
                const isAiOps = cap.name.toLowerCase().includes('ai ops') || cap.name.toLowerCase().includes('ai operations');

                return (
                  <div
                    key={cap.id}
                    className={`rounded-xl border transition-all ${
                      isExpanded
                        ? 'border-[#1C7293] bg-teal-50/30 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    {/* Header Bar */}
                    <button
                      onClick={() => toggleExpand(cap.id)}
                      className="w-full p-3 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="space-y-1 flex-1 mr-3">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-xs text-[#0B2E4F] flex items-center">
                            {cap.name}
                            {isAiOps && trialCompleted && (
                              <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold rounded bg-emerald-100 text-emerald-800 border border-emerald-300 animate-bounce">
                                Updated!
                              </span>
                            )}
                          </span>
                          <span className={`text-xs font-bold font-mono ${isAiOps && trialCompleted ? 'text-emerald-700' : 'text-[#0B2E4F]'}`}>
                            {cap.proficiency}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isAiOps && trialCompleted
                                ? 'bg-emerald-500'
                                : cap.proficiency >= 85
                                ? 'bg-[#0B2E4F]'
                                : cap.proficiency >= 75
                                ? 'bg-[#1C7293]'
                                : 'bg-[#F2A93B]'
                            }`}
                            style={{ width: `${cap.proficiency}%` }}
                          />
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#1C7293] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {/* Expanded Evidence & Metrics Detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-3 pb-3 pt-1 border-t border-slate-200/80 space-y-3 text-xs"
                        >
                          {/* Metrics grid */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-slate-200">
                            <div>
                              <span className="text-[#5B6B79] block">Evidence Confidence</span>
                              <strong className="text-[#0B2E4F]">{cap.confidence}% Score</strong>
                            </div>
                            <div>
                              <span className="text-[#5B6B79] block">Recency</span>
                              <strong className="text-[#0B2E4F]">{cap.recency}</strong>
                            </div>
                            <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[#5B6B79]">Independence:</span>
                              <span className="font-semibold text-[#0B2E4F]">
                                {cap.independentCapability}% Sole / {cap.aiAssistedCapability}% AI-Assisted
                              </span>
                            </div>
                          </div>

                          {/* Evidence Sources List */}
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293] block mb-1">
                              Evidence Sources
                            </span>
                            <div className="space-y-1.5">
                              {cap.evidence.map((ev) => (
                                <div
                                  key={ev.id}
                                  className="p-1.5 rounded bg-white border border-slate-200 text-[11px] flex items-center justify-between"
                                >
                                  <div className="truncate pr-2">
                                    <span className="font-semibold text-[#0B2E4F] block truncate">
                                      {ev.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{ev.date}</span>
                                  </div>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-[#1C7293] border border-teal-200 shrink-0">
                                    {ev.type}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL: FUTURE OPPORTUNITIES & TRANSITION PATHS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-saas p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#F2A93B]" />
                <h2 className="font-serif font-bold text-lg text-[#0B2E4F]">
                  Future Opportunities
                </h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Match & Path
              </span>
            </div>

            <p className="text-xs text-[#5B6B79]">
              Internal roles matched by skill adjacency rather than degree keyword requirements.
            </p>

            <div className="space-y-4">
              {employee.futureOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="card-saas-hover p-4 rounded-xl border border-slate-200 bg-white space-y-3 hover:border-[#1C7293]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1C7293]">
                        {opp.department}
                      </span>
                      <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                        {opp.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                        {opp.matchPercent}% Match
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-[#5B6B79] space-y-1">
                    <div className="flex items-center text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5 shrink-0" />
                      <span>Have {opp.alreadyHave.length} core capabilities verified</span>
                    </div>
                    <div className="flex items-center text-amber-700">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-1.5 shrink-0" />
                      <span>{opp.missingCapabilities.length} gap capabilities to close (~{opp.transitionRequirement.estimatedDays} days)</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      onClick={() => setSelectedRoleModal(opp)}
                      className="text-xs font-bold text-[#1C7293] hover:text-[#0B2E4F] flex items-center"
                    >
                      <span>View Minimum Transition Path</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>

                    <button
                      onClick={openTrial}
                      className="px-3 py-1.5 rounded-lg bg-[#0B2E4F] hover:bg-[#08223c] text-white text-xs font-semibold transition-colors"
                    >
                      Start Trial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: RECOMMENDED GROWTH CHIPS & TRIAL STATUS (3 COLS) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recommended Growth */}
          <div className="card-saas p-5 bg-white space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Zap className="w-4 h-4 text-[#F2A93B]" />
              <h2 className="font-serif font-bold text-base text-[#0B2E4F]">
                Recommended Growth
              </h2>
            </div>

            <p className="text-xs text-[#5B6B79]">
              Micro-capabilities that yield highest adjacency for target engineering roles:
            </p>

            <div className="flex flex-wrap gap-2">
              {employee.recommendedGrowth.map((chip) => (
                <span
                  key={chip}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#1C7293] border border-teal-200 text-xs font-semibold hover:bg-teal-100 cursor-pointer transition-colors"
                >
                  + {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Practical Trial Status Widget */}
          <div className="card-saas p-5 bg-gradient-to-br from-[#0B2E4F] to-[#1C7293] text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Practical Sandbox
              </span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-white">
                Practical Trial Engine
              </h3>
              <p className="text-xs text-slate-200">
                Prove capability by executing micro-tasks (deployment, diagnosis, report) in a simulated environment.
              </p>
            </div>

            {trialCompleted && trialScores ? (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-300">
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-1 text-amber-400" /> Trial Completed!
                  </span>
                  <span className="font-mono text-sm">{trialScores.overallVerified}%</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  AI Operations capability boosted to 83% and verified with evidence record.
                </p>
              </div>
            ) : (
              <button
                onClick={openTrial}
                className="w-full py-2.5 rounded-xl bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center justify-center space-x-1"
              >
                <PlayCircle className="w-4 h-4 text-slate-950" />
                <span>Launch Transition Trial</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MINIMUM TRANSITION PATH MODAL */}
      <AnimatePresence>
        {selectedRoleModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-saas max-w-xl w-full bg-white overflow-hidden shadow-2xl space-y-0"
            >
              {/* Modal Header */}
              <div className="p-5 bg-[#0B2E4F] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-300">
                    Minimum Transition Path Analysis
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {selectedRoleModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRoleModal(null)}
                  className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Comparison Checklists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Already Have */}
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <h4 className="font-serif font-bold text-xs text-emerald-900 flex items-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
                      Already Have ({selectedRoleModal.alreadyHave.length})
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedRoleModal.alreadyHave.map((item) => (
                        <li key={item} className="flex items-center text-emerald-800 font-medium">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Gap */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <h4 className="font-serif font-bold text-xs text-amber-900 flex items-center">
                      <AlertCircle className="w-4 h-4 text-amber-600 mr-1.5" />
                      Target Skill Gap ({selectedRoleModal.missingCapabilities.length})
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedRoleModal.missingCapabilities.map((item) => (
                        <li key={item} className="flex items-center text-amber-900 font-medium">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Minimum Transition Prescription */}
                <div className="p-4 rounded-xl bg-[#0B2E4F]/5 border border-[#0B2E4F]/20 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
                    Prescription Summary
                  </span>
                  <div className="font-serif font-bold text-sm text-[#0B2E4F]">
                    Minimum Transition: {selectedRoleModal.transitionRequirement.capabilitiesCount} micro-capabilities + {selectedRoleModal.transitionRequirement.projectCount} project sandbox + {selectedRoleModal.transitionRequirement.assessmentCount} practical trial (~{selectedRoleModal.transitionRequirement.estimatedDays} days)
                  </div>
                  <p className="text-xs text-[#5B6B79]">
                    No generic 6-month master degree required. Focus exclusively on closing the targeted {selectedRoleModal.missingCapabilities.length} missing skills.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setSelectedRoleModal(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRoleModal(null);
                      openTrial();
                    }}
                    className="px-5 py-2 rounded-lg bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 font-bold text-xs shadow-md"
                  >
                    Start Transition Trial Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRACTICAL TRANSITION TRIAL WORKFLOW MODAL */}
      <AnimatePresence>
        {isTrialOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="card-saas max-w-3xl w-full bg-white overflow-hidden shadow-2xl border border-slate-300 space-y-0"
            >
              {/* Modal Header Bar */}
              <div className="p-4 bg-[#0B2E4F] text-white flex items-center justify-between border-b border-[#1C7293]/40">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1C7293] to-[#F2A93B] flex items-center justify-center">
                    <Terminal className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      Practical Capability Trial — AI Operations & Monitoring
                    </h3>
                    <p className="text-[11px] text-teal-300 font-sans">
                      Target Role: AI Operations Engineer • Candidate: Priya Sharma
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeTrial}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Step Bar */}
              {trialStep <= 5 && (
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
                  {[
                    { step: 1, label: '1. Deploy' },
                    { step: 2, label: '2. Monitor' },
                    { step: 3, label: '3. Diagnose' },
                    { step: 4, label: '4. Evaluate' },
                    { step: 5, label: '5. Submit Report' }
                  ].map((s) => (
                    <div
                      key={s.step}
                      className={`flex items-center space-x-1 ${
                        trialStep === s.step
                          ? 'text-[#0B2E4F] font-bold underline decoration-[#F2A93B] decoration-2'
                          : trialStep > s.step
                          ? 'text-emerald-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {trialStep > s.step ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <span className="w-4 h-4 rounded-full text-[10px] bg-slate-300 flex items-center justify-center text-slate-700">
                          {s.step}
                        </span>
                      )}
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Modal Body Steps */}
              <div className="p-6 min-h-[380px] flex flex-col justify-between">
                {/* STEP 1: DEPLOY */}
                {trialStep === 1 && (
                  <div className="space-y-6 my-auto">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                        Step 1 of 5: Container Initialization
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#0B2E4F]">
                        Deploy Model Instance to Staging Environment
                      </h4>
                      <p className="text-xs text-[#5B6B79] leading-relaxed">
                        To verify cloud deployment capability, spin up a containerized LLM inference pipeline in the isolated SAP sandbox cluster.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 font-mono text-xs text-emerald-400 space-y-2 shadow-inner">
                      <div>$ kubectl apply -f ./ai-ops/staging-inference-deployment.yaml</div>
                      <div className="text-slate-400">deployment.apps/llm-inference-v2 created</div>
                      <div className="text-slate-400">service/llm-inference-svc created</div>
                      <div className="text-amber-400 animate-pulse">Waiting for pod ready check...</div>
                    </div>

                    <button
                      onClick={() => setTrialStep(2)}
                      className="w-full py-3 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                    >
                      <PlayCircle className="w-4 h-4 text-[#F2A93B]" />
                      <span>Execute Deployment & Start Telemetry Stream</span>
                    </button>
                  </div>
                )}

                {/* STEP 2: MONITOR */}
                {trialStep === 2 && (
                  <div className="space-y-6 my-auto">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                        Step 2 of 5: Real-time Telemetry & Anomaly Detection
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#0B2E4F]">
                        Monitor Inference Latency & Error Spikes
                      </h4>
                      <p className="text-xs text-[#5B6B79]">
                        Review live telemetry streams. Notice the unexpected p99 latency spike at timestamp 14:02.
                      </p>
                    </div>

                    {/* Simulated Graph/Log Bar */}
                    <div className="p-4 rounded-xl bg-white border border-slate-300 space-y-3">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#0B2E4F]">
                        <span>Inference Latency (p99)</span>
                        <span className="text-rose-600 font-mono font-bold animate-pulse">
                          ⚠️ Anomaly Spike: 4,820 ms
                        </span>
                      </div>

                      <div className="h-24 bg-slate-900 rounded-lg p-3 flex items-end justify-between space-x-1 font-mono text-[10px]">
                        {[20, 22, 25, 24, 28, 95, 100, 92, 40, 30].map((h, i) => (
                          <div key={i} className="w-full flex flex-col items-center gap-1">
                            <div
                              className={`w-full rounded-t transition-all ${
                                h > 50 ? 'bg-rose-500 animate-pulse' : 'bg-teal-500'
                              }`}
                              style={{ height: `${h}%` }}
                            />
                            <span className="text-slate-500">t{i}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-600 bg-rose-50 p-2 rounded border border-rose-200 flex items-center">
                        <AlertCircle className="w-4 h-4 text-rose-600 mr-2 shrink-0" />
                        <span>High latency detected during batch payload processing. Proceed to diagnosis.</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setTrialStep(3)}
                      className="w-full py-3 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Incident Diagnosis</span>
                      <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
                    </button>
                  </div>
                )}

                {/* STEP 3: DIAGNOSE */}
                {trialStep === 3 && (
                  <div className="space-y-6 my-auto">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                        Step 3 of 5: Problem Solving & Root Cause Analysis
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#0B2E4F]">
                        Identify the Cause of the Latency Anomaly
                      </h4>
                      <p className="text-xs text-[#5B6B79]">
                        Select the correct root cause based on telemetry logs:
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          id: 'opt-1',
                          text: 'Unbounded memory leak in batch tokenization queue buffer',
                          isCorrect: true
                        },
                        {
                          id: 'opt-2',
                          text: 'Database index degradation in user session store',
                          isCorrect: false
                        },
                        {
                          id: 'opt-3',
                          text: 'TLS certificate renegotiation timeout',
                          isCorrect: false
                        }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedDiagnosis(opt.id)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                            selectedDiagnosis === opt.id
                              ? 'border-[#1C7293] bg-teal-50 text-[#0B2E4F] ring-2 ring-[#1C7293]/20 font-bold'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setTrialStep(4)}
                      disabled={!selectedDiagnosis}
                      className={`w-full py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 ${
                        selectedDiagnosis
                          ? 'bg-[#0B2E4F] hover:bg-[#08223c] text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Confirm Diagnosis & Move to Output Evaluation</span>
                      <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
                    </button>
                  </div>
                )}

                {/* STEP 4: EVALUATE OUTPUT */}
                {trialStep === 4 && (
                  <div className="space-y-6 my-auto">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                        Step 4 of 5: AI Safety & Quality Audit
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#0B2E4F]">
                        Evaluate Model Response for Drift & Hallucination
                      </h4>
                      <p className="text-xs text-[#5B6B79]">
                        Review model output generated under high load: <em>&quot;The system uptime SLA is guaranteed at 104.5%.&quot;</em>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0B2E4F]">
                        Is this output mathematically valid & complaint-free?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setEvalAnswer('invalid')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            evalAnswer === 'invalid'
                              ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-300'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          ❌ Invalid (Hallucination &gt; 100%)
                        </button>

                        <button
                          onClick={() => setEvalAnswer('valid')}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                            evalAnswer === 'valid'
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          ✓ Valid SLA Output
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setTrialStep(5)}
                      disabled={!evalAnswer}
                      className={`w-full py-3 rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 ${
                        evalAnswer
                          ? 'bg-[#0B2E4F] hover:bg-[#08223c] text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Proceed to Final Verification Report</span>
                      <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
                    </button>
                  </div>
                )}

                {/* STEP 5: SUBMIT REPORT */}
                {trialStep === 5 && (
                  <div className="space-y-6 my-auto text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                        Step 5 of 5: Final Submission
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#0B2E4F]">
                        Finalize Practical Capability Proof
                      </h4>
                      <p className="text-xs text-[#5B6B79] max-w-md mx-auto">
                        Submitting will compile your container logs, diagnosis accuracy, and evaluation score into an immutable evidence block on your Capability Twin.
                      </p>
                    </div>

                    <button
                      onClick={completeTrial}
                      className="w-full py-3.5 rounded-xl bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 font-bold text-sm shadow-lg transition-all hover:scale-105"
                    >
                      Submit Capability Proof & Update Dashboard
                    </button>
                  </div>
                )}

                {/* STEP 6: RESULTS SCREEN */}
                {trialStep === 6 && trialScores && (
                  <div className="space-y-6 my-auto text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex flex-col items-center space-y-2"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1C7293] to-[#F2A93B] flex items-center justify-center shadow-xl">
                        <Award className="w-10 h-10 text-white" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                        Capability Verified: {trialScores.overallVerified}%
                      </span>
                    </motion.div>

                    <div className="space-y-1">
                      <h4 className="font-serif text-2xl font-bold text-[#0B2E4F]">
                        Trial Successfully Completed!
                      </h4>
                      <p className="text-xs text-[#5B6B79]">
                        Target Capability <strong className="text-[#0B2E4F]">AI Operations & Monitoring</strong> updated from <span className="line-through">74%</span> → <strong className="text-emerald-700 text-sm">83%</strong>.
                      </p>
                    </div>

                    {/* Scored Metrics Grid */}
                    <div className="grid grid-cols-5 gap-2 text-center text-xs pt-2">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Execution</span>
                        <strong className="text-[#0B2E4F]">{trialScores.technicalExecution}%</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Solving</span>
                        <strong className="text-[#0B2E4F]">{trialScores.problemSolving}%</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">AI Eval</span>
                        <strong className="text-[#0B2E4F]">{trialScores.aiEvaluation}%</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Cloud</span>
                        <strong className="text-[#0B2E4F]">{trialScores.cloudDeployment}%</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Independence</span>
                        <strong className="text-[#0B2E4F]">{trialScores.independence}%</strong>
                      </div>
                    </div>

                    <button
                      onClick={closeTrial}
                      className="w-full py-3 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white font-bold text-xs shadow-md"
                    >
                      Return to Dashboard & Inspect Updated Twin
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
