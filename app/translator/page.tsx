'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  RotateCcw,
  PlusCircle,
  Briefcase,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { SEEDED_TRANSLATION_EXAMPLE } from '@/lib/mockData';
import { useAccessHireStore } from '@/lib/store';

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationStep, setTranslationStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addCapabilityFromTranslation } = useAccessHireStore();

  const handleUseSeedExample = () => {
    setInputText(SEEDED_TRANSLATION_EXAMPLE.inputText);
    setIsCompleted(false);
    setAddedSuccess(false);
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    setIsCompleted(false);
    setTranslationStep(1);

    // Step 1: Semantic Parsing
    setTimeout(() => setTranslationStep(2), 700);
    // Step 2: Mapping to SAP Capability Ontology
    setTimeout(() => setTranslationStep(3), 1400);
    // Step 3: Scoring & Evidence Tagging
    setTimeout(() => {
      setIsTranslating(false);
      setIsCompleted(true);
    }, 2100);
  };

  const handleAddAllToTwin = () => {
    SEEDED_TRANSLATION_EXAMPLE.extractedCapabilities.forEach((cap) => {
      addCapabilityFromTranslation(cap);
    });
    setAddedSuccess(true);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-[#1C7293]/10 text-[#1C7293]">
              <Wand2 className="w-5 h-5" />
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E4F]">
              Capability Translator
            </h1>
          </div>
          <p className="text-sm text-[#5B6B79] mt-1">
            Transform free-text descriptions of real-world activities into tagged enterprise capabilities.
          </p>
        </div>

        <Link
          href="/employee"
          className="inline-flex items-center text-xs font-semibold px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-[#0B2E4F] hover:bg-slate-50 transition-colors shadow-sm self-start md:self-auto"
        >
          <span>View My Capability Twin</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form & Seed Trigger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-saas p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <label htmlFor="experience-input" className="font-serif font-bold text-base text-[#0B2E4F] flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-[#1C7293]" />
                Describe Real-World Experience
              </label>
              <button
                onClick={handleUseSeedExample}
                className="text-xs font-semibold text-[#1C7293] hover:text-[#0B2E4F] flex items-center px-2 py-1 rounded bg-teal-50 border border-teal-200 transition-colors"
              >
                <Sparkles className="w-3 h-3 mr-1 text-[#F2A93B]" />
                Load Seeded Example
              </button>
            </div>

            <p className="text-xs text-[#5B6B79]">
              Describe non-traditional work, community projects, family operations, or informal leadership.
            </p>

            <textarea
              id="experience-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., 'I managed a local community festival, handled $50k budget, led 40 volunteers, negotiated vendor contracts, and coordinated emergency weather plans...'"
              rows={6}
              className="w-full p-3 rounded-lg border border-slate-300 text-sm font-sans text-[#16232E] focus:outline-none focus:ring-2 focus:ring-[#1C7293] focus:border-transparent bg-slate-50/50 resize-none"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setInputText('');
                  setIsCompleted(false);
                  setAddedSuccess(false);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 flex items-center"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear
              </button>

              <button
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                  !inputText.trim() || isTranslating
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-[#F2A93B] hover:bg-[#d99430] text-slate-950 hover:scale-[1.02]'
                }`}
              >
                {isTranslating ? (
                  <>
                    <Brain className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Translating Experience...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-slate-950" />
                    <span>Translate into Capabilities</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Educational Callout */}
          <div className="card-saas p-4 bg-sky-50/70 border-sky-200 text-xs text-[#16232E] space-y-2">
            <div className="flex items-center text-[#0B2E4F] font-bold">
              <Info className="w-4 h-4 mr-1.5 text-[#1C7293]" />
              How the Translator Works
            </div>
            <p className="text-slate-600 leading-relaxed">
              The Capability Translator Agent uses semantic NLP to extract implicit behaviors, leadership metrics, and operational scale—mapping them directly to standardized SAP capability nodes.
            </p>
          </div>
        </div>

        {/* Right Column: Processing Animation & Output Display (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Animated Processing State */}
          <AnimatePresence mode="wait">
            {isTranslating && (
              <motion.div
                key="translating-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="card-saas p-8 bg-[#0B2E4F] text-white border border-[#1C7293]/40 space-y-6 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#1C7293] to-[#F2A93B] flex items-center justify-center shadow-lg animate-pulse">
                  <Brain className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-white">
                    Agentic Extraction in Progress
                  </h3>
                  <p className="text-xs text-slate-300">
                    Parsing free-text semantics into structured SAP capability taxonomy...
                  </p>
                </div>

                {/* Step Indicators */}
                <div className="space-y-3 max-w-sm mx-auto text-left text-xs pt-2">
                  <div className={`flex items-center space-x-3 p-2 rounded ${translationStep >= 1 ? 'bg-[#1C7293]/40 text-emerald-300' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${translationStep >= 1 ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>1. Extracting operational actions & scale indicators</span>
                  </div>

                  <div className={`flex items-center space-x-3 p-2 rounded ${translationStep >= 2 ? 'bg-[#1C7293]/40 text-emerald-300' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${translationStep >= 2 ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>2. Mapping to Enterprise Capability Taxonomy</span>
                  </div>

                  <div className={`flex items-center space-x-3 p-2 rounded ${translationStep >= 3 ? 'bg-[#1C7293]/40 text-emerald-300' : 'text-slate-400'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${translationStep >= 3 ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>3. Calculating proficiency & evidence confidence</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Empty Initial State */}
            {!isTranslating && !isCompleted && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-saas p-12 text-center border-dashed border-2 border-slate-300 space-y-4 bg-slate-50/50"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-200/70 flex items-center justify-center text-slate-500">
                  <Wand2 className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                    No Capability Translation Active
                  </h3>
                  <p className="text-xs text-[#5B6B79]">
                    Type a description or click <strong>&quot;Load Seeded Example&quot;</strong> on the left, then hit <strong>&quot;Translate into Capabilities&quot;</strong>.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Results Display */}
            {!isTranslating && isCompleted && (
              <motion.div
                key="results-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="card-saas p-6 bg-white space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C7293]">
                      Extracted Capability Twin Nodes
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#0B2E4F] flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-[#F2A93B]" />
                      6 Enterprise Capabilities Identified
                    </h3>
                  </div>

                  {!addedSuccess ? (
                    <button
                      onClick={handleAddAllToTwin}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                    >
                      <PlusCircle className="w-4 h-4 text-[#F2A93B]" />
                      <span>Add All to My Capability Twin</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                        Added to Twin!
                      </span>
                      <Link
                        href="/employee"
                        className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#F2A93B] text-slate-950 text-xs font-bold hover:bg-[#d99430]"
                      >
                        View Dashboard
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Capability Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SEEDED_TRANSLATION_EXAMPLE.extractedCapabilities.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-[#1C7293]/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1C7293]">
                            {item.category}
                          </span>
                          <h4 className="font-serif font-bold text-sm text-[#0B2E4F]">
                            {item.name}
                          </h4>
                        </div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0B2E4F] text-amber-300">
                          {item.proficiency}%
                        </span>
                      </div>

                      <p className="text-xs text-[#5B6B79] leading-tight">
                        {item.evidenceNote}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                        <span className="flex items-center">
                          <Zap className="w-3 h-3 mr-1 text-amber-500" />
                          Confidence: {item.confidence}%
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          Evidence: Lived Experience
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-[#0B2E4F] flex items-center justify-between">
                  <div className="flex items-center">
                    <Layers className="w-4 h-4 mr-2 text-[#1C7293]" />
                    <span>These capabilities will now visibly integrate into Priya Sharma&apos;s Capability Twin.</span>
                  </div>
                  <Link
                    href="/employee"
                    className="font-bold text-[#1C7293] underline hover:text-[#0B2E4F] whitespace-nowrap ml-2"
                  >
                    Go to Twin →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
