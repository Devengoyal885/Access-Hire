'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Users, TrendingUp, Shield, AlertTriangle,
  CheckCircle2, ArrowRight, ChevronRight, Brain,
  FileText, Zap, Eye, Target, Accessibility, X, Check,
} from 'lucide-react';
import { mockWorkforceDepartments, mockEquityCandidates } from '@/data/mockData';
import { sleep } from '@/lib/utils';

const capabilityKeys = ['Python', 'AI / ML', 'Cloud', 'SQL', 'Linux', 'Automation', 'Data Analysis', 'Security'];

function ScoreCell({ value }: { value: number }) {
  const color = value >= 75 ? '#10b981' : value >= 55 ? '#4f8ef7' : value >= 35 ? '#f59e0b' : '#ef4444';
  const bg = value >= 75 ? 'rgba(16,185,129,0.12)' : value >= 55 ? 'rgba(79,142,247,0.12)' : value >= 35 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)';
  return (
    <td style={{ padding: '0.375rem 0.5rem', textAlign: 'center' }}>
      <span style={{
        fontSize: '0.75rem', fontWeight: 700, color,
        background: bg, padding: '0.15rem 0.4rem', borderRadius: 4,
        display: 'inline-block',
      }}>{value}%</span>
    </td>
  );
}

function EquityNudge() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockEquityCandidates[0] | null>(null);

  const generateQuestions = async (id: string) => {
    await sleep(600);
    setGenerated(id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      <div style={{
        padding: '0.875rem 1rem',
        background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)',
        borderRadius: 8, fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.5,
      }}>
        <strong style={{ color: 'var(--blue-primary)' }}>🤖 AI recommends. Humans decide.</strong>
        {' '}Equity Nudge surfaces capability-based insights during candidate review. All hiring decisions remain with human reviewers.
      </div>

      {mockEquityCandidates.map(candidate => (
        <div key={candidate.id} className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', fontWeight: 800, color: 'white',
            }}>
              {candidate.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{candidate.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{candidate.location} · {candidate.credentials}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', textAlign: 'center' }}>
                  {[
                    { label: 'Capability Fit', value: candidate.capabilityFit, color: '#10b981' },
                    { label: 'Evidence', value: candidate.evidenceConfidence, color: '#4f8ef7' },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.value}%</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equity Check */}
              <div style={{
                padding: '0.625rem 0.875rem',
                background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 8, marginBottom: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <AlertTriangle size={13} style={{ color: 'var(--amber)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--amber)' }}>EQUITY CHECK</span>
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                  Career gap of <strong>{candidate.careerGap}</strong> detected.
                  &quot;Career continuity may not accurately represent current capability.&quot;
                  This candidate has <strong style={{ color: 'var(--green)' }}>{candidate.capabilityFit}% capability fit</strong> with verified evidence.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {generated !== candidate.id ? (
                  <button
                    className="btn-secondary"
                    style={{ fontSize: '0.775rem' }}
                    onClick={() => generateQuestions(candidate.id)}
                  >
                    <Brain size={13} /> Generate Capability-Based Interview Questions
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card-flat"
                    style={{ padding: '0.75rem', width: '100%' }}
                  >
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue-primary)', marginBottom: '0.5rem' }}>
                      CAPABILITY-BASED INTERVIEW QUESTIONS
                    </div>
                    {[
                      'Walk me through a production system failure you diagnosed and resolved.',
                      'Describe how you automated a repetitive process. What was the outcome?',
                      'How would you evaluate the quality of an AI model\'s outputs?',
                      'Tell me about managing multiple stakeholders with conflicting priorities.',
                    ].map((q, i) => (
                      <div key={i} style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '0.375rem', lineHeight: 1.4 }}>
                        <strong style={{ color: 'var(--text-primary)' }}>{i + 1}.</strong> {q}
                      </div>
                    ))}
                    <div style={{ marginTop: '0.625rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      These questions are grounded in verified capabilities, not career gaps or credentials.
                    </div>
                  </motion.div>
                )}
                <button
                  className="btn-ghost"
                  style={{ fontSize: '0.775rem', border: '1px solid var(--border)' }}
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <Eye size={13} /> View Full Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Candidate Profile Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              padding: '1rem',
            }}
            onClick={() => setSelectedCandidate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                width: '100%', maxWidth: 440,
                background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)',
                borderRadius: 16, padding: '1.5rem', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{selectedCandidate.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedCandidate.location} · {selectedCandidate.credentials}</div>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="btn-ghost" style={{ padding: '0.3rem' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(16,185,129,0.1)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>{selectedCandidate.capabilityFit}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Capability Fit</div>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(79,142,247,0.1)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--blue-primary)' }}>{selectedCandidate.evidenceConfidence}%</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Evidence Confidence</div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Candidate verified via AccessHire Adaptive Capability Twin. Demonstrated high performance in practical problem solving and automated workflow execution.
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedCandidate(null)}>
                Close Profile
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function JobFairnessAgent() {
  const [rewritten, setRewritten] = useState(false);

  const original = `Requirements:
• Master's degree in Computer Science required
• 5+ years industry experience mandatory
• Must have worked at a Fortune 500 company
• No career gaps acceptable`;

  const rewrite = `Requirements:
• Demonstrated proficiency in Python, AI engineering and distributed systems (assessment verified)
• Practical experience deploying and monitoring production services
• Evidence of problem-solving in complex technical environments
• Capability verified through practical trial or portfolio projects`;

  const flags = [
    { issue: 'Credential proxy', text: "Master's degree in Computer Science", suggestion: 'Demonstrated proficiency in...' },
    { issue: 'Experience proxy', text: 'Fortune 500 company', suggestion: 'Production systems experience' },
    { issue: 'Continuity bias', text: 'No career gaps acceptable', suggestion: 'Remove — irrelevant to capability' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        padding: '0.75rem 1rem',
        background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)',
        borderRadius: 8, fontSize: '0.775rem', color: 'var(--text-secondary)',
      }}>
        <strong style={{ color: 'var(--violet)' }}>Job Fairness Agent</strong> analyzes job descriptions for credential proxies, geographic bias, and exclusionary language.
        Human approval required for all suggested rewrites.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card-flat" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--red)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            ORIGINAL (FLAGGED)
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {original}
          </div>
        </div>

        <div className="card-flat" style={{ padding: '1rem', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
            CAPABILITY-BASED REWRITE
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {rewrite}
          </div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
          FLAGS DETECTED
        </div>
        {flags.map(f => (
          <div key={f.issue} style={{
            display: 'flex', gap: '0.75rem', padding: '0.625rem 0.875rem', marginBottom: '0.375rem',
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 7,
          }}>
            <AlertTriangle size={13} style={{ color: 'var(--red)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--red)' }}>{f.issue}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>&quot;{f.text}&quot;</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--green)', marginTop: '0.2rem' }}>→ {f.suggestion}</div>
            </div>
          </div>
        ))}
      </div>

      {!rewritten ? (
        <button className="btn-primary" style={{ width: 'fit-content' }} onClick={() => setRewritten(true)}>
          <CheckCircle2 size={14} /> Approve Capability-Based Rewrite
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.625rem 0.875rem', background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)', borderRadius: 7,
            fontSize: '0.825rem', fontWeight: 600, color: 'var(--green)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <CheckCircle2 size={15} /> Rewrite approved and saved. Human decision recorded.
        </motion.div>
      )}
    </div>
  );
}

function AccessibilityAgent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{
        padding: '0.875rem 1rem',
        background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)',
        borderRadius: 8, fontSize: '0.825rem', fontWeight: 700, color: 'var(--cyan)',
      }}>
        "Enable the person, not just filter for fit."
      </div>

      <div className="card-flat" style={{ padding: '1.25rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--cyan)', marginBottom: '0.875rem', letterSpacing: '0.04em' }}>
          ACCOMMODATION BLUEPRINT — AI OPERATIONS ROLE
        </div>

        {[
          { title: 'Screen-Reader Compatible Tools', desc: 'All monitoring dashboards must support NVDA/JAWS. Terminal access with screen-reader mode available.', icon: '♿' },
          { title: 'Accessible Development Environment', desc: 'VS Code with accessibility extensions pre-configured. High contrast themes available.', icon: '💻' },
          { title: 'Flexible Communication', desc: 'Asynchronous communication preferred. Written documentation for all verbal meetings. No required video calls.', icon: '💬' },
          { title: 'Accessible Documentation', desc: 'All technical docs in accessible HTML. No image-only documentation. Alt text on all diagrams.', icon: '📄' },
          { title: 'Flexible Assessment Format', desc: 'Practical trial available in extended-time or take-home format. No timed whiteboard interviews.', icon: '✍️' },
        ].map(item => (
          <div key={item.title} style={{
            display: 'flex', gap: '0.75rem', padding: '0.75rem', marginBottom: '0.5rem',
            background: 'var(--bg-hover)', borderRadius: 8,
          }}>
            <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BiasAudit() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '0.5rem' }}>
        {[
          { label: 'Credential Bias', risk: 'High', scanned: 142, flagged: 23, color: 'var(--red)' },
          { label: 'Career Gap Bias', risk: 'Medium', scanned: 142, flagged: 31, color: 'var(--amber)' },
          { label: 'Geographic Bias', risk: 'Low', scanned: 142, flagged: 8, color: 'var(--green)' },
          { label: 'Job Title Proxy', risk: 'Medium', scanned: 142, flagged: 19, color: 'var(--amber)' },
        ].map(b => (
          <div key={b.label} className="card-flat" style={{ padding: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{b.label}</span>
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.375rem', borderRadius: 999,
                background: `${b.color}15`, color: b.color,
              }}>{b.risk} Risk</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {b.flagged} / {b.scanned} decisions flagged for review
            </div>
            <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 999, marginTop: '0.5rem', overflow: 'hidden' }}>
              <div style={{ width: `${(b.flagged / b.scanned) * 100}%`, height: '100%', background: b.color, borderRadius: 999 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card-flat" style={{ padding: '1rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
          AUDIT PIPELINE
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {['AI Recommendation', 'Bias Audit', 'Potential Bias?', 'Human Review', 'Decision'].map((step, i, arr) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                padding: '0.375rem 0.625rem', borderRadius: 7, fontSize: '0.75rem', fontWeight: 600,
                background: i === 2 ? 'rgba(245,158,11,0.15)' : i === 4 ? 'rgba(16,185,129,0.15)' : 'var(--bg-hover)',
                color: i === 2 ? 'var(--amber)' : i === 4 ? 'var(--green)' : 'var(--text-secondary)',
                border: `1px solid ${i === 2 ? 'rgba(245,158,11,0.25)' : i === 4 ? 'rgba(16,185,129,0.25)' : 'var(--border)'}`,
              }}>
                {step}
              </div>
              {i < arr.length - 1 && <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkforcePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransition, setSelectedTransition] = useState<{ dept: string; from: string; to: string; readiness: number; employees: number } | null>(null);
  const [planCreatedMsg, setPlanCreatedMsg] = useState('');

  const totalEmployees = mockWorkforceDepartments.reduce((s, d) => s + d.headcount, 0);
  const avgAI = Math.round(mockWorkforceDepartments.reduce((s, d) => s + (d.capabilities['AI / ML'] || 0), 0) / mockWorkforceDepartments.length);
  const avgCloud = Math.round(mockWorkforceDepartments.reduce((s, d) => s + (d.capabilities['Cloud'] || 0), 0) / mockWorkforceDepartments.length);
  const totalTransitions = mockWorkforceDepartments.reduce((s, d) => s + d.transitions.reduce((t, r) => t + r.employees, 0), 0);

  const tabs = [
    { id: 'overview', label: 'Capability Map' },
    { id: 'mobility', label: 'Internal Mobility' },
    { id: 'equity', label: 'Equity Nudge' },
    { id: 'fairness', label: 'Job Fairness' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'bias', label: 'Bias Audit' },
  ];

  const handleCreateReskillingPlan = () => {
    if (!selectedTransition) return;
    setPlanCreatedMsg(`Reskilling Plan created for ${selectedTransition.employees} employees in ${selectedTransition.from} → ${selectedTransition.to}!`);
    setSelectedTransition(null);
    setTimeout(() => setPlanCreatedMsg(''), 4000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Workforce Capability Console</h1>
        <p className="page-subtitle">See what your workforce can do today — and what it can become tomorrow.</p>
      </div>

      {planCreatedMsg && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            borderRadius: 8,
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            color: 'var(--green)',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CheckCircle2 size={16} />
          {planCreatedMsg}
        </motion.div>
      )}

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Employees', value: totalEmployees.toLocaleString(), color: 'var(--blue-primary)', icon: <Users size={15} /> },
          { label: 'Avg AI Capability', value: `${avgAI}%`, color: 'var(--violet)', icon: <Brain size={15} /> },
          { label: 'Avg Cloud Capability', value: `${avgCloud}%`, color: 'var(--cyan)', icon: <TrendingUp size={15} /> },
          { label: 'Transition Candidates', value: totalTransitions.toLocaleString(), color: 'var(--green)', icon: <Zap size={15} /> },
        ].map(m => (
          <div key={m.label} className="metric-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', color: m.color }}>{m.label.slice(0,4) !== 'Tota' ? '' : ''}{m.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.label}</div>
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

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <div className="section-title">Workforce Capability Heatmap</div>
                  <div className="section-subtitle">Department × Capability — average proficiency scores</div>
                </div>
                <div style={{ display: 'flex', gap: '0.625rem', fontSize: '0.7rem' }}>
                  {[{ color: '#10b981', l: '75+' }, { color: '#4f8ef7', l: '55-74' }, { color: '#f59e0b', l: '35-54' }, { color: '#ef4444', l: '<35' }].map(x => (
                    <span key={x.l} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)' }}>
                      <span style={{ width: 10, height: 10, background: x.color, borderRadius: 2, display: 'inline-block', opacity: 0.7 }} />
                      {x.l}%
                    </span>
                  ))}
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.375rem 0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>Department</th>
                    <th style={{ padding: '0.375rem 0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>👥</th>
                    {capabilityKeys.map(k => (
                      <th key={k} style={{ padding: '0.375rem 0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center' }}>{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockWorkforceDepartments.map((dept, i) => (
                    <tr key={dept.id} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.5rem 0.5rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {dept.name}
                      </td>
                      <td style={{ padding: '0.5rem 0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        {dept.headcount.toLocaleString()}
                      </td>
                      {capabilityKeys.map(k => (
                        <ScoreCell key={k} value={dept.capabilities[k] || 0} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'mobility' && (
          <motion.div key="mobility" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <div className="section-title">Internal Mobility Engine</div>
                  <div className="section-subtitle">Employees ready to transition to high-demand roles internally</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {mockWorkforceDepartments.flatMap(dept =>
                  dept.transitions.map(t => ({
                    dept: dept.name,
                    ...t,
                  }))
                ).sort((a, b) => b.readiness - a.readiness).map((t, i) => (
                  <motion.div
                    key={`${t.dept}-${t.from}-${t.to}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem',
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 9,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>{t.from}</span>
                        <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
                        <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--blue-primary)' }}>{t.to}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {t.dept} · {t.employees.toLocaleString()} employees eligible
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1.25rem', fontWeight: 800,
                        color: t.readiness >= 80 ? 'var(--green)' : t.readiness >= 65 ? 'var(--blue-primary)' : 'var(--amber)',
                      }}>
                        {t.readiness}%
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Readiness</div>
                    </div>
                    <button
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', flexShrink: 0 }}
                      onClick={() => setSelectedTransition(t)}
                    >
                      Build Reskilling Plan
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'equity' && (
          <motion.div key="equity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.375rem' }}>Equity Nudge</div>
              <div className="section-subtitle" style={{ marginBottom: '1.25rem' }}>Capability-based insights during candidate review. Humans always decide.</div>
              <EquityNudge />
            </div>
          </motion.div>
        )}

        {activeTab === 'fairness' && (
          <motion.div key="fairness" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.375rem' }}>Job Fairness Agent</div>
              <div className="section-subtitle" style={{ marginBottom: '1.25rem' }}>Rewrite credential proxies and exclusionary language with capability-based requirements.</div>
              <JobFairnessAgent />
            </div>
          </motion.div>
        )}

        {activeTab === 'accessibility' && (
          <motion.div key="accessibility" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.375rem' }}>Accessibility & Accommodation</div>
              <div className="section-subtitle" style={{ marginBottom: '1.25rem' }}>Tailored accommodation blueprints that enable candidates, not just filter for fit.</div>
              <AccessibilityAgent />
            </div>
          </motion.div>
        )}

        {activeTab === 'bias' && (
          <motion.div key="bias" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.375rem' }}>Fairness & Governance</div>
              <div className="section-subtitle" style={{ marginBottom: '1.25rem' }}>Bias detection, audit trails, and governance for fair hiring decisions.</div>
              <BiasAudit />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reskilling Plan Modal */}
      <AnimatePresence>
        {selectedTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              padding: '1rem',
            }}
            onClick={() => setSelectedTransition(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                width: '100%', maxWidth: 480,
                background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)',
                borderRadius: 16, padding: '1.5rem', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    Reskilling Plan: {selectedTransition.from} → {selectedTransition.to}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Department: {selectedTransition.dept} · {selectedTransition.employees} employees
                  </div>
                </div>
                <button onClick={() => setSelectedTransition(null)} className="btn-ghost" style={{ padding: '0.3rem' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{
                padding: '0.875rem', borderRadius: 8, background: 'rgba(79,142,247,0.06)',
                border: '1px solid rgba(79,142,247,0.2)', marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue-primary)' }}>Target Readiness</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--green)' }}>{selectedTransition.readiness}% → 92%</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Estimated transition timeline: <strong>6 weeks</strong> (10 hrs/week practical work)
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                  TARGET COMPETENCY MODULES
                </div>
                {[
                  'Module 1: Practical AI Evaluation & Quality Assurance (15 hrs)',
                  'Module 2: Cloud Infrastructure & Container Deployment (20 hrs)',
                  'Module 3: Hands-on MLOps Practical Trial (15 hrs)',
                  'Module 4: Enterprise Safety & Bias Mitigation (10 hrs)',
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: 'var(--text-secondary)', marginBottom: '0.375rem' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
                    {m}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-ghost" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setSelectedTransition(null)}>
                  Cancel
                </button>
                <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={handleCreateReskillingPlan}>
                  Deploy Reskilling Plan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
