import Link from 'next/link';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2E4F] text-slate-300 border-t border-[#1C7293]/40 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Branding & Pitch */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1C7293] to-[#F2A93B] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-white">Access-Hire</span>
            </div>
            <p className="font-serif text-amber-400 italic text-sm">
              &quot;See Capability. Prove Potential. Enable Transition.&quot;
            </p>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Replacing proxy credentials with living, evidence-backed Capability Twins.
              Built for SAP Hackfest 2026 under Theme 2: Inclusive Workforce.
            </p>
            <div className="flex items-center space-x-2 pt-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
                Human-in-the-Loop Safeguards Active
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-700/50">
                <Cpu className="w-3 h-3 mr-1 text-sky-400" />
                9-Agent Multi-Agent Engine
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif font-semibold text-white text-sm mb-3 text-slate-100">Prototype Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Overview & Paradox
                </Link>
              </li>
              <li>
                <Link href="/translator" className="hover:text-amber-400 transition-colors">
                  Capability Translator
                </Link>
              </li>
              <li>
                <Link href="/employee" className="hover:text-amber-400 transition-colors">
                  My Capability Twin
                </Link>
              </li>
              <li>
                <Link href="/employer" className="hover:text-amber-400 transition-colors">
                  Workforce Console
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-amber-400 transition-colors">
                  Accommodation Blueprint
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-amber-400 transition-colors">
                  Closed-Loop & Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack & Hackfest details */}
          <div>
            <h4 className="font-serif font-semibold text-white text-sm mb-3 text-slate-100">Enterprise Stack</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Next.js App Router + TypeScript</li>
              <li>• Tailwind CSS & Custom SaaS Palette</li>
              <li>• Recharts Data Visualization</li>
              <li>• Framer Motion Interactive Transitions</li>
              <li>• Zustand Reactive Session Store</li>
              <li>• SAP Capability Taxonomy Ontology</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© 2026 Access-Hire Team — SAP Hackfest 2026 (Theme 2: Inclusive Workforce MVP)</p>
          <p className="mt-2 sm:mt-0 font-mono text-[11px] text-slate-400">
            Version 1.0.0 (Interactive Prototype)
          </p>
        </div>
      </div>
    </footer>
  );
}
