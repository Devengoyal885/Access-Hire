'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Brain, Zap, ChevronRight, X, CheckCircle2,
  GitBranch, Shield, TrendingUp, ArrowRight,
  AlertCircle, Clock, Star, Activity, Award,
} from 'lucide-react';
import { mockTranslatedCapabilities, mockTransferRoles, getUserCapabilities, getUserProfile } from '@/data/mockData';
import type { Capability } from '@/types';
import { sleep } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';

// ─── Animated number ──────────────────────────────────────────
function AnimNum({ v, suffix = '%' }: { v: number; suffix?: string }) {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const fn = () => {
      const t = Math.min((Date.now() - start) / 900, 1);
      const e = 1 - Math.pow(1 - t, 3);
      setCur(Math.round(e * v));
      if (t < 1) requestAnimationFrame(fn);
    };
    requestAnimationFrame(fn);
  }, [v]);
  return <>{cur}{suffix}</>;
}

const evidenceIcon: Record<string, React.ReactNode> = {
  github: <GitBranch size={11} />,
  project: <Brain size={11} />,
  assessment: <CheckCircle2 size={11} />,
  work: <Activity size={11} />,
  certification: <Star size={11} />,
  patent: <Shield size={11} style={{ color: 'var(--amber)' }} />,
};

function scoreColor(s: number) {
  if (s >= 85) return '#10b981';
  if (s >= 70) return '#4f8ef7';
  if (s >= 55) return '#f59e0b';
  return '#ef4444';
}

function CapabilityGraph({ capabilities, selected, onSelect }: { capabilities: Capability[]; selected: Capability | null; onSelect: (c: Capability) => void }) {
  const nodePositions = [
    { x: 50, y: 28 }, { x: 75, y: 42 }, { x: 25, y: 48 }, { x: 65, y: 62 },
    { x: 82, y: 22 }, { x: 72, y: 75 }, { x: 38, y: 70 }, { x: 18, y: 65 },
  ];

  return (
    <div style={{ position: 'relative', height: 340, background: 'var(--bg-elevated)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100">
        {/* Grid */}
        {[20,40,60,80].map(v => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="rgba(255,255,255,0.025)" strokeWidth="0.3"/>
            <line x1="0" y1={v} x2="100" y2={v} stroke="rgba(255,255,255,0.025)" strokeWidth="0.3"/>
          </g>
        ))}

        {/* Dynamic Nodes */}
        {capabilities.slice(0, 8).map((cap, i) => {
          const pos = nodePositions[i] || { x: 20 + i * 10, y: 30 + i * 5 };
          const isSelected = selected?.id === cap.id;
          const color = scoreColor(cap.proficiency);

          return (
            <g
              key={cap.id}
              onClick={() => onSelect(cap)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={pos.x} cy={pos.y} r={isSelected ? 6 : 4} fill={color} opacity={isSelected ? 0.3 : 0.12}/>
              <circle cx={pos.x} cy={pos.y} r={isSelected ? 3.5 : 2.6} fill={color} opacity={0.9} stroke="var(--bg-elevated)" strokeWidth="0.5"/>
              <text x={pos.x} y={pos.y + 5.5} textAnchor="middle" fontSize="2.3" fill="white" fontWeight={isSelected ? 700 : 400} opacity={0.85}>
                {cap.name}
              </text>
              <text x={pos.x} y={pos.y - 4} textAnchor="middle" fontSize="2" fill={color} fontWeight={700}>
                {cap.proficiency}%
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '0.65rem', color: 'var(--text-muted)' }}>
        Click any capability node to view evidence &amp; patents
      </div>
    </div>
  );
}

function CapabilityDetail({ cap, onClose }: { cap: Capability; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="card"
      style={{ padding: '1.25rem', position: 'sticky', top: '1.25rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 800 }}>{cap.name}</div>
          <span className="badge badge-blue" style={{ marginTop: '0.25rem', textTransform: 'capitalize' }}>
            {cap.category} capability
          </span>
        </div>
        <button onClick={onClose} className="btn-ghost" style={{ padding: '0.3rem' }}>
          <X size={15} />
        </button>
      </div>

      {/* Score Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem', marginBottom: '1rem' }}>
        {[
          { label: 'Proficiency', value: cap.proficiency, color: scoreColor(cap.proficiency) },
          { label: 'Evidence Confidence', value: cap.evidenceConfidence, color: scoreColor(cap.evidenceConfidence) },
          { label: 'Independent', value: cap.independent, color: scoreColor(cap.independent) },
          { label: 'AI-Assisted', value: cap.aiAssisted, color: scoreColor(cap.aiAssisted) },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-elevated)', borderRadius: 8, padding: '0.625rem',
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{s.label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>
              <AnimNum v={s.value} />
            </div>
            <div style={{ marginTop: '0.375rem', height: 3, background: 'var(--bg-hover)', borderRadius: 999, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ height: '100%', background: s.color, borderRadius: 999 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recency */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
        <Clock size={13} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Recency:</span>
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 999,
          background: cap.recency === 'high' ? 'rgba(16,185,129,0.15)' : cap.recency === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
          color: cap.recency === 'high' ? 'var(--green)' : cap.recency === 'medium' ? 'var(--amber)' : 'var(--red)',
        }}>
          {cap.recency.toUpperCase()}
        </span>
      </div>

      {/* Evidence */}
      <div style={{ marginBottom: '0.875rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>VERIFIED EVIDENCE &amp; PATENTS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {cap.evidence.map((ev, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 0.625rem', background: 'var(--bg-elevated)',
              borderRadius: 6, border: '1px solid var(--border-subtle)',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 5, background: 'var(--bg-hover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {evidenceIcon[ev.source] || <Activity size={11} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {ev.label}
                  {ev.applicationNo && (
                    <span style={{ fontSize: '0.65rem', color: 'var(--amber)', marginLeft: '0.375rem', fontWeight: 700 }}>
                      App No: {ev.applicationNo}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{ev.date} · {ev.confidence}% confidence</div>
              </div>
              {ev.verified ? (
                <CheckCircle2 size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
              ) : (
                <AlertCircle size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Growth Timeline */}
      <div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>GROWTH TIMELINE</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {cap.growth.map((g, i) => (
            <div key={g.year} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 40, background: 'var(--bg-elevated)', borderRadius: 6,
                display: 'flex', alignItems: 'flex-end', overflow: 'hidden', border: '1px solid var(--border-subtle)',
              }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${g.score}%` }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }}
                  style={{ width: '100%', background: scoreColor(g.score), borderRadius: '4px 4px 0 0' }}
                />
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{g.year}</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: scoreColor(g.score) }}>{g.score}%</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Capability Translator ────────────────────────────────────
function CapabilityTranslator() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<'idle' | 'loading' | 'done'>('idle');
  const [loadingMsg, setLoadingMsg] = useState('');
  const [added, setAdded] = useState(false);

  const example = "Computer Science Engineering student with 3 filed patents in wearable AI systems and smart hardware. Won 1st place at IIT Ropar AI for Social Good Hackathon and built Cogniflow AI dashboard and MailIQ email automation platform using Python, Next.js and REST APIs.";

  const translate = async () => {
    if (!input.trim()) return;
    setStage('loading');
    const msgs = ['Analyzing experience & patents...', 'Mapping capabilities to twin...', 'Calculating evidence confidence...', 'Updating living profile...'];
    for (const m of msgs) {
      setLoadingMsg(m);
      await sleep(500);
    }
    setStage('done');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
          <div>
            <div className="section-title">Capability Translator</div>
            <div className="section-subtitle">Describe your projects, patents, or lived experience in plain language. Watch it convert into verified enterprise capabilities.</div>
          </div>
          <button
            onClick={() => setInput(example)}
            className="btn-ghost"
            style={{ fontSize: '0.75rem', border: '1px solid var(--border)' }}
          >
            Use Example
          </button>
        </div>

        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. I developed a wearable AI system for musical performance and filed patent application No. 202611068506. I built MailIQ email platform using Python & REST APIs..."
          className="input"
          style={{ minHeight: 110, resize: 'vertical', marginBottom: '0.875rem', lineHeight: 1.6 }}
        />

        <button
          onClick={translate}
          disabled={!input.trim() || stage === 'loading'}
          className="btn-primary"
          style={{ width: 'fit-content' }}
        >
          <Zap size={14} /> Translate Experience
        </button>

        {stage === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginTop: '0.875rem' }}
          >
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[0,1,2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 500 }}>{loadingMsg}</span>
          </motion.div>
        )}
      </div>

      {stage === 'done' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <div className="section-title">Derived Enterprise Capabilities</div>
              <div className="section-subtitle">Grounded in patents, projects, and hackathon evidence</div>
            </div>
            {!added ? (
              <button onClick={() => setAdded(true)} className="btn-primary" style={{ fontSize: '0.75rem' }}>
                <CheckCircle2 size={13} /> Add to Capability Twin
              </button>
            ) : (
              <span className="badge badge-green">Added to Twin ✓</span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {mockTranslatedCapabilities.map(tc => (
              <div key={tc.name} style={{ padding: '0.75rem', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>{tc.name}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: tc.color }}>{tc.score}%</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Content ─────────────────────────────────────────────
function CapabilityContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') || 'twin';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user } = useAuth();

  const capabilities = getUserCapabilities(user?.email);
  const profile = getUserProfile(user?.email);

  const [selectedCap, setSelectedCap] = useState<Capability | null>(capabilities[0] || null);

  useEffect(() => {
    if (capabilities.length > 0) setSelectedCap(capabilities[0]);
  }, [user?.email]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Adaptive Capability Twin</h1>
        <p className="page-subtitle">A living, evidence-backed profile of what {profile.name} can do — powered by patents, code, and practical work.</p>
      </div>

      {/* Tabs */}
      <div className="tab-nav" style={{ marginBottom: '1.25rem', width: 'fit-content' }}>
        {[
          { id: 'twin', label: 'Capability Graph' },
          { id: 'translator', label: 'Capability Translator' },
          { id: 'patents', label: `Patents & Innovation (${profile.patents?.length || 0})` },
          { id: 'transfer', label: 'Transition Intelligence' },
        ].map(t => (
          <button key={t.id} className={`tab-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'twin' && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedCap ? '1fr 360px' : '1fr', gap: '1.25rem' }}>
          <div>
            <CapabilityGraph capabilities={capabilities} selected={selectedCap} onSelect={setSelectedCap} />
            <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
              <div className="section-title" style={{ marginBottom: '0.75rem' }}>All Verified Capabilities</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
                {capabilities.map(cap => (
                  <div
                    key={cap.id}
                    onClick={() => setSelectedCap(cap)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.5rem 0.75rem', borderRadius: 8, cursor: 'pointer',
                      background: selectedCap?.id === cap.id ? 'rgba(79,142,247,0.1)' : 'var(--bg-elevated)',
                      border: `1px solid ${selectedCap?.id === cap.id ? 'var(--blue-primary)' : 'var(--border)'}`,
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{cap.name}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: scoreColor(cap.proficiency) }}>{cap.proficiency}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {selectedCap && (
              <CapabilityDetail cap={selectedCap} onClose={() => setSelectedCap(null)} />
            )}
          </AnimatePresence>
        </div>
      )}

      {activeTab === 'translator' && <CapabilityTranslator />}

      {activeTab === 'patents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            padding: '0.875rem 1rem', background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8,
            fontSize: '0.8rem', color: 'var(--text-secondary)',
          }}>
            <strong style={{ color: 'var(--amber)' }}>🛡️ Patent Evidence Confidence: 99%</strong>
            {' '}Filed patent applications represent independently verifiable, rare technical evidence that heavily weights your Evidence Confidence score.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {(profile.patents || []).map(pat => (
              <div key={pat.id} className="card" style={{ padding: '1.25rem' }}>
                <Shield size={24} style={{ color: 'var(--amber)', marginBottom: '0.75rem' }} />
                <div style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.375rem', lineHeight: 1.3 }}>{pat.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--amber)', fontWeight: 700, marginBottom: '0.5rem' }}>
                  App No: {pat.applicationNo}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Status: {pat.status} ({pat.year})</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'transfer' && (
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="section-title" style={{ marginBottom: '1rem' }}>High-Potential Transition Roles</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {mockTransferRoles.map(role => (
              <div key={role.id} className="card-flat" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{role.title}</div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--green)' }}>{role.readiness}% Readiness</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {role.transferable.map(t => <span key={t} className="badge badge-green">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CapabilityPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading Capability Twin...</div>}>
      <CapabilityContent />
    </Suspense>
  );
}
