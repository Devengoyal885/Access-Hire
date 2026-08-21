'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  RotateCw,
  Search,
  Languages,
  Brain,
  TrendingUp,
  GitBranch,
  GraduationCap,
  Terminal,
  UserCheck,
  Briefcase
} from 'lucide-react';
import { HOW_IT_WORKS_DATA } from '@/lib/mockData';

export default function HowItWorksPage() {
  const [activeStepId, setActiveStepId] = useState<number>(2); // Default to Step 2: Translate

  const activeStep = HOW_IT_WORKS_DATA.closedLoopSteps.find((s) => s.id === activeStepId) || HOW_IT_WORKS_DATA.closedLoopSteps[0];

  return (
    <div className="space-y-12 py-2">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-[#1C7293]" />
          <span>System Architecture & Operational Mechanics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2E4F]">
          How Access-Hire Operates
        </h1>
        <p className="text-sm text-[#5B6B79] leading-relaxed">
          From uncredited lived experience to verified enterprise capability twins: explore the closed-loop cycle and the 9-agent multi-agent architecture.
        </p>
      </div>

      {/* SECTION 1: THE CLOSED LOOP CAPABILITY CYCLE */}
      <div className="card-saas p-8 bg-white space-y-8 border border-slate-200">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
            Continuous Evidence Loop
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#0B2E4F] flex items-center justify-center">
            <RotateCw className="w-5 h-5 mr-2 text-[#F2A93B] animate-spin" />
            10-Stage Closed-Loop Capability Engine
          </h2>
          <p className="text-xs text-[#5B6B79]">
            Click any node on the cycle to inspect that operational phase.
          </p>
        </div>

        {/* Circular Loop Graphic & Step Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circular Wheel Graphic (7 cols) */}
          <div className="lg:col-span-7 flex justify-center py-4">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-dashed border-[#1C7293]/30 flex items-center justify-center p-6">
              {/* Outer Pulsing Glow */}
              <div className="absolute inset-0 rounded-full border border-[#F2A93B]/40 animate-pulse pointer-events-none" />

              {/* Center Active Summary */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#0B2E4F] text-white p-4 flex flex-col items-center justify-center text-center space-y-1 shadow-2xl z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Step {activeStep.id} of 10
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                  {activeStep.title}
                </h3>
                <p className="text-[10px] text-slate-300 line-clamp-3 px-1">
                  {activeStep.desc}
                </p>
              </div>

              {/* 10 Nodes Positioned Trigonometrically around circle */}
              {HOW_IT_WORKS_DATA.closedLoopSteps.map((step, idx) => {
                const total = HOW_IT_WORKS_DATA.closedLoopSteps.length;
                const angle = (idx * (360 / total) - 90) * (Math.PI / 180);
                const radius = 150; // px
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const isSelected = activeStepId === step.id;

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className={`absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                      isSelected
                        ? 'bg-[#F2A93B] text-slate-950 scale-125 ring-4 ring-[#0B2E4F] z-20 font-black'
                        : 'bg-white text-[#0B2E4F] hover:bg-teal-50 border-2 border-[#1C7293]/60'
                    }`}
                    title={step.title}
                  >
                    {step.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Step Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card-saas p-6 bg-slate-50 border-l-4 border-l-[#F2A93B] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C7293]">
                    Phase {activeStep.id} Breakdown
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                    Active Step
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#0B2E4F]">
                  {activeStep.id}. {activeStep.title}
                </h3>

                <p className="text-sm text-[#16232E] leading-relaxed">
                  {activeStep.desc}
                </p>

                <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    System Mechanism:
                  </span>
                  <p className="text-slate-700">
                    Feeds evidence logs into the central engine and continuously refreshes the employee&apos;s living capability metrics without resetting history.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveStepId((prev) => (prev > 1 ? prev - 1 : 10))}
                    className="text-xs text-[#1C7293] hover:underline"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    onClick={() => setActiveStepId((prev) => (prev < 10 ? prev + 1 : 1))}
                    className="text-xs font-bold text-[#0B2E4F] flex items-center hover:underline"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#F2A93B]" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION 2: 9-AGENT MULTI-AGENT ARCHITECTURE DIAGRAM */}
      <div className="card-saas p-8 bg-slate-900 text-white space-y-8 border border-[#1C7293]/40 shadow-2xl">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Agentic Orchestration</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            9-Agent Multi-Agent Architecture
          </h2>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Specialized autonomous agents feed the central core engine, gated by a mandatory Human-in-the-Loop safety node.
          </p>
        </div>

        {/* System Diagram Grid */}
        <div className="space-y-8">
          {/* Top Layer: 9 Specialized Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {HOW_IT_WORKS_DATA.systemAgents.map((agent) => (
              <div
                key={agent.name}
                className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-[#1C7293] space-y-1.5 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#F2A93B]" />
                  <h4 className="font-serif font-bold text-xs text-white">
                    {agent.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">
                  {agent.role}
                </p>
              </div>
            ))}
          </div>

          {/* Downward Arrows */}
          <div className="flex justify-center items-center text-teal-400">
            <div className="w-px h-8 bg-gradient-to-b from-[#1C7293] to-[#F2A93B]" />
          </div>

          {/* Central Engine Box */}
          <div className="max-w-xl mx-auto card-saas p-6 bg-gradient-to-r from-[#0B2E4F] via-[#0D365C] to-[#1C7293] text-white text-center space-y-2 border-2 border-[#F2A93B] shadow-2xl">
            <div className="w-10 h-10 mx-auto rounded-xl bg-[#F2A93B] text-slate-950 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              Central Capability Twin Core Engine
            </h3>
            <p className="text-xs text-slate-200">
              Aggregates evidence confidence, proficiency calculation, adjacency scoring, and real-time gap modeling into a unified graph schema.
            </p>
          </div>

          {/* Downward Arrow to Safety Gate */}
          <div className="flex justify-center items-center text-amber-400">
            <div className="w-px h-8 bg-gradient-to-b from-[#F2A93B] to-emerald-400" />
          </div>

          {/* Human-in-the-Loop Node */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-emerald-950 border-2 border-emerald-400 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-emerald-300 font-serif font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Human-in-the-Loop Safety Gate</span>
            </div>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Final hiring, transition, and evaluation decisions remain strictly governed by human managers, candidates, and mentors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
