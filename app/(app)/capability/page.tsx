'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Brain, Zap, ChevronRight, X, CheckCircle2,
  GitBranch, Shield, TrendingUp, ArrowRight,
  AlertCircle, Clock, Star, Activity,
} from 'lucide-react';
import { mockCapabilities, mockTranslatedCapabilities, mockTransferRoles, mockUser } from '@/data/mockData';
import type { Capability } from '@/types';
import { sleep } from '@/lib/utils';

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

// ─── Capability Graph ─────────────────────────────────────────
const nodePositions = [
  { id: 'cap-python',        x: 50, y: 28 },
  { id: 'cap-ai',            x: 75, y: 42 },
  { id: 'cap-sql',           x: 25, y: 48 },
  { id: 'cap-cloud',         x: 65, y: 62 },
  { id: 'cap-apis',          x: 82, y: 22 },
  { id: 'cap-linux',         x: 72, y: 75 },
  { id: 'cap-automation',    x: 38, y: 70 },
  { id: 'cap-data-analysis', x: 18, y: 65 },
  { id: 'cap-leadership',    x: 22, y: 28 },
  { id: 'cap-communication', x: 8,  y: 45 },
  { id: 'cap-troubleshooting',x: 50, y: 52 },
  { id: 'cap-backend',       x: 55, y: 82 },
];

const connections = [
  ['cap-python','cap-ai'],['cap-python','cap-automation'],['cap-python','cap-apis'],['cap-python','cap-sql'],
  ['cap-sql','cap-data-analysis'],['cap-ai','cap-cloud'],['cap-apis','cap-linux'],['cap-automation','cap-linux'],
  ['cap-troubleshooting','cap-linux'],['cap-leadership','cap-communication'],['cap-backend','cap-apis'],
  ['cap-troubleshooting','cap-python'],['cap-automation','cap-backend'],
];

function scoreColor(s: number) {
  if (s >= 85) return '#10b981';
  if (s >= 70) return '#4f8ef7';
  if (s >= 55) return '#f59e0b';
  return '#ef4444';
}

function CapabilityGraph({ selected, onSelect }: { selected: Capability | null; onSelect: (c: Capability) => void }) {
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

        {/* Connections */}
        {connections.map(([a, b]) => {
          const na = nodePositions.find(n => n.id === a)!;
          const nb = nodePositions.find(n => n.id === b)!;
          if (!na || !nb) return null;
          const ca = mockCapabilities.find(c => c.id === a)!;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={scoreColor(ca?.proficiency || 70)}
              strokeWidth="0.35"
              strokeOpacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: Math.random() * 0.5 }}
            />
          );
        })}

        {/* Nodes */}
        {mockCapabilities.map((cap, i) => {
          const pos = nodePositions.find(n => n.id === cap.id);
          if (!pos) return null;
          const color = scoreColor(cap.proficiency);
          const isSelected = selected?.id === cap.id;

          return (
            <motion.g
              key={cap.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect(cap)}
            >
              {/* Outer ring */}
              <circle cx={pos.x} cy={pos.y} r={isSelected ? 5.5 : 4.5}
                fill="none" stroke={color}
                strokeWidth={isSelected ? 0.8 : 0.5}
                strokeOpacity={isSelected ? 0.9 : 0.35}
              />
              {/* Score arc */}
              <circle
                cx={pos.x} cy={pos.y} r="4.2"
                fill="none" stroke={color}
                strokeWidth="0.7"
                strokeDasharray={`${(cap.proficiency / 100) * 26.4} 26.4`}
                strokeLinecap="round"
                transform={`rotate(-90 ${pos.x} ${pos.y})`}
                strokeOpacity="0.7"
              />
              {/* Main fill */}
              <circle cx={pos.x} cy={pos.y} r="3.2"
                fill={isSelected ? color : `${color}25`}
                stroke={color}
                strokeWidth={isSelected ? 0.4 : 0.3}
              />
              {/* Pulse for selected */}
              {isSelected && (
                <circle cx={pos.x} cy={pos.y} r="6">
                  <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="fill" values={color} dur="2s" repeatCount="indefinite"/>
                </circle>
              )}
              {/* Label */}
              <text x={pos.x} y={pos.y + 6.5} textAnchor="middle"
                fontSize="2.1" fill={isSelected ? 'white' : 'rgba(255,255,255,0.65)'}
                fontWeight={isSelected ? '700' : '400'}
              >
                {cap.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12,
        display: 'flex', gap: '0.75rem', fontSize: '0.65rem', color: 'var(--text-muted)',
      }}>
        {[{ c: '#10b981', l: '85+ High' }, { c: '#4f8ef7', l: '70+ Mid' }, { c: '#f59e0b', l: '55+ Developing' }].map(x => (
          <span key={x.l} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: x.c, display: 'inline-block' }} />
            {x.l}
          </span>
        ))}
      </div>

      {!selected && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: '0.7rem', color: 'var(--text-muted)',
          background: 'var(--bg-overlay)', padding: '0.3rem 0.6rem', borderRadius: 6,
        }}>
          Click a node to explore
        </div>
      )}
    </div>
  );
}

// ─── Capability Detail Panel ──────────────────────────────────
function CapabilityDetail({ cap, onClose }: { cap: Capability; onClose: () => void }) {
  const evidenceIcon: Record<string, React.ReactNode> = {
    github: <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#8b5cf6' }}>GH</span>,
    project: <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#4f8ef7' }}>PR</span>,
    assessment: <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981' }}>AS</span>,
    work: <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b' }}>WK</span>,
    certification: <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#06b6d4' }}>CE</span>,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="card"
      style={{ padding: '1.25rem', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cap.name}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{cap.category}</div>
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
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>EVIDENCE</div>
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 500 }}>{ev.label}</div>
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

  const example = "I organize my village's annual festival. Around 5,000 people attend. I manage the budget, vendors, volunteers and logistics. I also negotiate with suppliers and resolve disputes.";

  const translate = async () => {
    if (!input.trim()) return;
    setStage('loading');
    const msgs = ['Analyzing experience...', 'Mapping capabilities...', 'Finding transferable skills...', 'Calculating confidence scores...'];
    for (const m of msgs) {
      setLoadingMsg(m);
      await sleep(600);
    }
    setStage('done');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        padding: '1rem', background: 'rgba(79,142,247,0.05)',
        border: '1px solid rgba(79,142,247,0.15)', borderRadius: 8,
      }}>
        <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Tell us what you have done.</strong>{' '}
          You don&apos;t need corporate vocabulary. Describe your real experience in any language.
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Example: I organized my village's festival for 5,000 people, managed vendors, budgets, and 50 volunteers..."
          className="input"
          style={{ minHeight: 100, resize: 'vertical', lineHeight: 1.6 }}
          id="translator-input"
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.625rem' }}>
          <button
            onClick={() => setInput(example)}
            className="btn-ghost"
            style={{ fontSize: '0.75rem', border: '1px solid var(--border)' }}
          >
            Use example
          </button>
          <button
            onClick={translate}
            disabled={!input.trim() || stage === 'loading'}
            className="btn-primary"
            style={{ fontSize: '0.8rem' }}
            id="translate-btn"
          >
            <Zap size={14} /> Translate Experience
          </button>
        </div>
      </div>

      {/* Loading */}
      <AnimatePresence>
        {stage === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.875rem',
              padding: '1rem', background: 'rgba(79,142,247,0.06)',
              border: '1px solid rgba(79,142,247,0.15)', borderRadius: 8,
            }}
          >
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[0, 1, 2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i * 0.2}s` }} />)}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 500 }}>{loadingMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {stage === 'done' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{
              padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8,
              marginBottom: '0.875rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.25rem' }}>
                <CheckCircle2 size={15} /> 6 Capabilities Discovered
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Your experience translated into enterprise capabilities below.
              </div>
            </div>

            {/* Original → Enterprise */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'start', marginBottom: '0.875rem' }}>
              <div className="card-flat" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>YOUR EXPERIENCE</div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{input.slice(0, 120)}...</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                <ArrowRight size={16} style={{ color: 'var(--blue-primary)' }} />
              </div>
              <div className="card-flat" style={{ padding: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>ENTERPRISE CAPABILITIES</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {mockTranslatedCapabilities.map((tc) => (
                    <div key={tc.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', flex: 1, color: 'var(--text-primary)' }}>{tc.name}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: tc.color }}>{tc.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!added ? (
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setAdded(true)}
                id="add-to-twin-btn"
              >
                <Brain size={15} /> Add to Capability Twin
              </button>
            ) : (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="animate-verified"
                style={{
                  padding: '0.875rem', textAlign: 'center',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)', borderRadius: 8,
                }}
              >
                <CheckCircle2 size={20} style={{ color: 'var(--green)', marginBottom: '0.375rem' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--green)' }}>Capability Twin Updated!</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>6 capabilities added to your profile.</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Transition Roadmap ────────────────────────────────────────
function TransitionEngine() {
  const [selected, setSelected] = useState(mockTransferRoles[0]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1rem' }}>
      {/* Role List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>TARGET ROLES</div>
        {mockTransferRoles.map(role => {
          const trendColor = role.marketTrend === 'rising' ? 'var(--green)' : role.marketTrend === 'declining' ? 'var(--red)' : 'var(--text-muted)';
          return (
            <button
              key={role.id}
              onClick={() => setSelected(role)}
              style={{
                padding: '0.625rem 0.75rem', borderRadius: 8, textAlign: 'left',
                background: selected.id === role.id ? 'rgba(79,142,247,0.1)' : 'var(--bg-elevated)',
                border: `1px solid ${selected.id === role.id ? 'rgba(79,142,247,0.3)' : 'var(--border)'}`,
                cursor: 'pointer', transition: 'all 0.12s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.775rem', fontWeight: 600, color: selected.id === role.id ? 'var(--blue-primary)' : 'var(--text-primary)' }}>
                  {role.title}
                </span>
                <span style={{ fontSize: '0.7rem', color: trendColor }}>
                  {role.marketTrend === 'rising' ? '↑↑' : role.marketTrend === 'declining' ? '↓' : '→'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <div style={{ flex: 1, height: 3, background: 'var(--bg-hover)', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${role.readiness}%`, background: 'var(--blue-primary)', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue-primary)' }}>{role.readiness}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Role Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="card"
          style={{ padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800 }}>{selected.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Transition effort: <span style={{
                  color: selected.transitionEffort === 'low' ? 'var(--green)' : selected.transitionEffort === 'medium' ? 'var(--amber)' : 'var(--red)',
                  fontWeight: 700,
                }}>{selected.transitionEffort}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue-primary)' }}>{selected.readiness}%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Current Readiness</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.375rem', letterSpacing: '0.05em' }}>✓ TRANSFERABLE</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {selected.transferable.map(t => (
                  <span key={t} className="badge badge-green">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.375rem', letterSpacing: '0.05em' }}>⚡ MISSING</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {selected.missing.map(m => (
                  <span key={m} className="badge badge-amber">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Transition Path */}
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.625rem', letterSpacing: '0.05em' }}>TRANSITION PATHWAY</div>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {selected.transitionSteps.map((step, i) => (
              <div key={step.phase} style={{ display: 'flex', alignItems: 'flex-start', minWidth: 0 }}>
                <div style={{
                  flexShrink: 0, minWidth: 110, padding: '0.625rem',
                  background: i === 0 ? 'rgba(79,142,247,0.1)' : i === selected.transitionSteps.length - 1 ? 'rgba(16,185,129,0.1)' : 'var(--bg-elevated)',
                  border: `1px solid ${i === 0 ? 'rgba(79,142,247,0.25)' : i === selected.transitionSteps.length - 1 ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`,
                  borderRadius: 8,
                }}>
                  <div style={{
                    fontSize: '0.6rem', fontWeight: 800,
                    color: i === 0 ? 'var(--blue-primary)' : i === selected.transitionSteps.length - 1 ? 'var(--green)' : 'var(--text-muted)',
                    marginBottom: '0.375rem', letterSpacing: '0.05em',
                  }}>{step.phase}</div>
                  {step.items.map(item => (
                    <div key={item} style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>• {item}</div>
                  ))}
                </div>
                {i < selected.transitionSteps.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.25rem', paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
                    <ArrowRight size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Practical Trial ───────────────────────────────────────────
function PracticalTrial() {
  const [stage, setStage] = useState<'intro' | 'running' | 'done'>('intro');
  const [progress, setProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [termOutput, setTermOutput] = useState<string[]>([]);

  const trialResults = [
    { label: 'Technical Execution', score: 84, color: '#4f8ef7' },
    { label: 'Problem Solving', score: 89, color: '#10b981' },
    { label: 'AI Evaluation', score: 78, color: '#8b5cf6' },
    { label: 'Cloud Deployment', score: 81, color: '#06b6d4' },
    { label: 'Independence', score: 86, color: '#f59e0b' },
  ];

  const termLines = [
    '$ deploying ai-service:v2.1 to cloud...',
    '✓ Container built successfully',
    '✓ Health check passed (200ms)',
    '$ monitoring model endpoint...',
    '⚠ Latency spike detected (p99: 2.8s)',
    '$ running evaluation suite...',
    '✓ Accuracy: 87.3% | Hallucination rate: 2.1%',
    '✓ Bias score: PASS',
    '$ generating performance report...',
    '✓ Trial complete — uploading results',
  ];

  const runTrial = async () => {
    setStage('running');
    const msgs = ['Initializing environment...', 'Deploying AI service...', 'Running monitoring checks...', 'Evaluating AI outputs...', 'Generating report...'];
    for (let i = 0; i < termLines.length; i++) {
      await sleep(500);
      setTermOutput(prev => [...prev, termLines[i]]);
      setProgress(Math.round(((i + 1) / termLines.length) * 100));
      if (msgs[Math.floor(i / 2)]) setLoadingMsg(msgs[Math.floor(i / 2)]);
    }
    await sleep(600);
    setStage('done');
  };

  return (
    <div>
      {stage === 'intro' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-flat" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              🧪 AI Operations Practical Trial
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              <strong>Task:</strong> Deploy and monitor an AI service, identify a failure, evaluate AI output quality, and produce a performance report.
            </div>
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {['Cloud Deployment', 'AI Evaluation', 'Problem Solving', 'Technical Execution'].map(t => (
                <span key={t} className="badge badge-blue">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              <span>⏱ ~45 minutes</span>
              <span>📊 5 capabilities verified</span>
              <span>🎯 +8% readiness</span>
            </div>
            <button className="btn-primary" onClick={runTrial} id="start-trial-btn">
              <Zap size={14} /> Start Practical Trial
            </button>
          </div>
        </div>
      )}

      {stage === 'running' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              {[0,1,2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 600 }}>{loadingMsg}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>{progress}%</span>
          </div>
          <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 999 }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'var(--blue-primary)', borderRadius: 999 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mono" style={{
            background: '#0a0c0f', borderRadius: 8, padding: '1rem',
            border: '1px solid var(--border)', maxHeight: 200, overflowY: 'auto',
            fontSize: '0.75rem',
          }}>
            {termOutput.map((line, i) => (
              <div key={i} style={{
                color: line.startsWith('✓') ? '#10b981' :
                  line.startsWith('⚠') ? '#f59e0b' :
                  line.startsWith('$') ? '#60a5fa' : '#9ca3af',
                marginBottom: '0.25rem',
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'done' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="animate-verified">
          <div style={{ textAlign: 'center', marginBottom: '1.25rem', padding: '1rem' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
              style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                padding: '1.25rem 2rem',
                background: 'rgba(16,185,129,0.1)', border: '2px solid rgba(16,185,129,0.4)',
                borderRadius: 16,
              }}
            >
              <Shield size={28} style={{ color: 'var(--green)', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', letterSpacing: '0.08em', marginBottom: '0.375rem' }}>
                CAPABILITY VERIFIED
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--green)', lineHeight: 1 }}>83%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>AI Operations Trial Score</div>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
            {trialResults.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: '0.625rem', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}
              >
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: r.color }}>{r.score}%</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.3, marginTop: '0.2rem' }}>{r.label}</div>
              </motion.div>
            ))}
          </div>

          <button
            className="btn-success"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.75rem' }}
          >
            <Brain size={16} /> Update Capability Twin with Verified Score
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
function CapabilityPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const tabs = [
    { id: 'twin', label: 'Capability Twin' },
    { id: 'translator', label: 'Translator' },
    { id: 'transfer', label: 'Career Paths' },
    { id: 'trial', label: 'Practical Trial' },
  ];

  const [activeTab, setActiveTab] = useState(tabParam || 'twin');
  const [selectedCap, setSelectedCap] = useState<Capability | null>(null);

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">My Capability Twin</h1>
        <p className="page-subtitle">A living, evidence-backed picture of what you can actually do.</p>
      </div>

      {/* Twin score banner */}
      <div style={{
        display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap',
      }}>
        {[
          { label: 'Twin Score', value: '82%', sub: 'Verified', color: 'var(--blue-primary)' },
          { label: 'Total Capabilities', value: mockCapabilities.length, sub: 'tracked', color: 'var(--text-primary)' },
          { label: 'Evidence Sources', value: '4', sub: 'active', color: 'var(--violet)' },
          { label: 'Momentum', value: '+18%', sub: 'this month', color: 'var(--green)' },
        ].map(m => (
          <div key={m.label} className="metric-card" style={{ flexGrow: 1, minWidth: 120 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.label}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color }}>{m.value}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-nav" style={{ marginBottom: '1.25rem', width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.id} className={`tab-item ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'twin' && (
          <motion.div key="twin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: selectedCap ? '1fr 340px' : '1fr', gap: '1.25rem' }}>
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <div className="section-title">Capability Graph</div>
                    <div className="section-subtitle">{mockCapabilities.length} capabilities · Click to explore</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="badge badge-blue">IT Support Background</span>
                    <span className="badge badge-violet">Self-Taught AI</span>
                  </div>
                </div>
                <CapabilityGraph selected={selectedCap} onSelect={setSelectedCap} />
              </div>
              <AnimatePresence>
                {selectedCap && (
                  <CapabilityDetail
                    cap={selectedCap}
                    onClose={() => setSelectedCap(null)}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {activeTab === 'translator' && (
          <motion.div key="translator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="section-title">Capability Translator</div>
                <div className="section-subtitle">Describe lived experience in plain language → enterprise capabilities</div>
              </div>
              <CapabilityTranslator />
            </div>
          </motion.div>
        )}

        {activeTab === 'transfer' && (
          <motion.div key="transfer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="section-title">Career Path Intelligence</div>
                <div className="section-subtitle">Roles reachable from your current capabilities and minimum transition required</div>
              </div>
              <TransitionEngine />
            </div>
          </motion.div>
        )}

        {activeTab === 'trial' && (
          <motion.div key="trial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <div className="section-title">Practical Transition Trial</div>
                <div className="section-subtitle">Simulate real work to verify capabilities and update your Twin</div>
              </div>
              <PracticalTrial />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CapabilityPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>}>
      <CapabilityPageContent />
    </Suspense>
  );
}
