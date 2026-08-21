'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, User, Building2, Accessibility, HelpCircle, Layers, Wand2 } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: Layers },
    { name: 'Translator', href: '/translator', icon: Wand2 },
    { name: 'Capability Twin', href: '/employee', icon: User },
    { name: 'Workforce Console', href: '/employer', icon: Building2 },
    { name: 'Accessibility', href: '/accessibility', icon: Accessibility },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B2E4F] text-white border-b border-[#1C7293]/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Hackfest Branding */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1C7293] to-[#F2A93B] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-xl font-bold tracking-tight text-white">Access-Hire</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-[#1C7293]/50 text-emerald-300 border border-emerald-400/30">
                  SAP Hackfest 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans tracking-wide">Adaptive Capability Twin</p>
            </div>
          </Link>

          {/* Nav Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1C7293] text-white shadow-sm border border-teal-400/30 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F2A93B]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Persona Switcher CTA */}
          <div className="flex items-center space-x-2">
            <Link
              href="/employee"
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                pathname === '/employee'
                  ? 'border-[#F2A93B] bg-[#F2A93B]/20 text-[#F2A93B] font-semibold'
                  : 'border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white'
              }`}
            >
              Employee View
            </Link>
            <Link
              href="/employer"
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                pathname === '/employer'
                  ? 'bg-[#F2A93B] text-slate-950 font-bold shadow-md'
                  : 'bg-[#1C7293] hover:bg-[#155a75] text-white font-medium'
              }`}
            >
              Company Console
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile nav sub-bar */}
      <div className="md:hidden flex items-center justify-around bg-[#08223c] py-2 border-t border-slate-700/50 px-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 text-[11px] rounded ${
                isActive ? 'text-[#F2A93B] font-semibold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
