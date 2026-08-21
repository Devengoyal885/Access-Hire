'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accessibility,
  CheckCircle2,
  ShieldCheck,
  Download,
  Eye,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Printer,
  Sliders,
  Check
} from 'lucide-react';
import { ACCESSIBILITY_PROFILE } from '@/lib/mockData';
import { useAccessHireStore } from '@/lib/store';

export default function AccessibilityPage() {
  const { blueprintItems, toggleBlueprintItem } = useAccessHireStore();
  const [downloadNotification, setDownloadNotification] = useState(false);

  const handleExportBlueprint = () => {
    setDownloadNotification(true);
    setTimeout(() => setDownloadNotification(false), 3000);
  };

  return (
    <div className="space-y-8 py-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1C7293] to-emerald-600 flex items-center justify-center text-white shadow-md">
            <Accessibility className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B2E4F]">
              Accessibility & Accommodation Blueprint
            </h1>
            <p className="text-xs text-[#5B6B79]">
              Inclusive Workplaces Engine: Aligning candidate capabilities, role requirements, and accessibility preferences.
            </p>
          </div>
        </div>

        <button
          onClick={handleExportBlueprint}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0B2E4F] hover:bg-[#08223c] text-white text-xs font-bold shadow-md transition-all self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-[#F2A93B]" />
          <span>Export Blueprint PDF</span>
        </button>
      </div>

      {downloadNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-sm"
        >
          <span className="flex items-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
            Accommodation Blueprint exported for Alex Rivera (SAP Enterprise HR System).
          </span>
          <span className="text-[10px] font-mono text-emerald-700">PDF Ready</span>
        </motion.div>
      )}

      {/* CANDIDATE PROFILE HEADER */}
      <div className="card-saas p-6 bg-gradient-to-r from-[#0B2E4F] via-[#0D365C] to-[#1C7293] text-white space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border-2 border-emerald-400 flex items-center justify-center font-serif text-2xl font-bold text-white">
              AR
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-xl font-bold text-white">
                  {ACCESSIBILITY_PROFILE.candidateName}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  {ACCESSIBILITY_PROFILE.age} yrs • {ACCESSIBILITY_PROFILE.currentTitle}
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-1">
                Disability Accommodation Profile: <span className="text-amber-300 font-semibold">{ACCESSIBILITY_PROFILE.disabilityType}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Accommodation Blueprint Verified</span>
          </div>
        </div>
      </div>

      {/* MATRIX VISUALIZER: CAPABILITY × REQUIREMENTS × ACCESSIBILITY */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#0B2E4F]">
            The Capability × Work × Accessibility Matrix
          </h2>
          <span className="text-xs text-[#5B6B79]">3-Way Alignment Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Candidate Capability */}
          <div className="card-saas p-5 bg-white space-y-3 border-t-4 border-t-[#0B2E4F]">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Cpu className="w-4 h-4 text-[#0B2E4F]" />
              <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                1. Capability Profile
              </h3>
            </div>
            <ul className="space-y-2 text-xs">
              {ACCESSIBILITY_PROFILE.capabilities.map((c) => (
                <li key={c.name} className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold text-[#0B2E4F]">{c.name}</span>
                  <span className="font-mono text-xs font-bold text-[#1C7293]">{c.proficiency}%</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Work Requirements */}
          <div className="card-saas p-5 bg-white space-y-3 border-t-4 border-t-[#1C7293]">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Layers className="w-4 h-4 text-[#1C7293]" />
              <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                2. Work Requirements
              </h3>
            </div>
            <ul className="space-y-2 text-xs">
              {ACCESSIBILITY_PROFILE.workRequirements.map((req) => (
                <li key={req} className="p-2 rounded bg-sky-50/60 border border-sky-200 text-slate-800 font-medium">
                  • {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Accessibility Preferences */}
          <div className="card-saas p-5 bg-white space-y-3 border-t-4 border-t-emerald-600">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <Accessibility className="w-4 h-4 text-emerald-600" />
              <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                3. Accommodation Needed
              </h3>
            </div>
            <ul className="space-y-2 text-xs">
              {ACCESSIBILITY_PROFILE.accessibilityPreferences.map((pref) => (
                <li key={pref} className="p-2 rounded bg-emerald-50/60 border border-emerald-200 text-emerald-950 font-medium">
                  ✓ {pref}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ACCOMMODATION BLUEPRINT CHECKLIST */}
      <div className="card-saas p-6 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C7293]">
              Personalized Workplace Blueprint
            </span>
            <h2 className="font-serif text-xl font-bold text-[#0B2E4F] flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-[#F2A93B]" />
              Interactive Accommodation Blueprint Checklist
            </h2>
          </div>
          <span className="text-xs text-[#5B6B79]">
            Click any status pill to toggle verification
          </span>
        </div>

        <div className="space-y-4">
          {blueprintItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 hover:border-[#1C7293] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B2E4F] text-amber-300 uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#0B2E4F]">
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleBlueprintItem(item.id)}
                  className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                    item.status === 'Configured & Verified'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                      : 'bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>{item.status}</span>
                </button>
              </div>

              <p className="text-xs text-[#5B6B79] leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
                <span>Verified Provider: <strong>{item.verifiedBy}</strong></span>
                <span className="font-mono text-[10px]">ARIA 1.2 Compliant</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
