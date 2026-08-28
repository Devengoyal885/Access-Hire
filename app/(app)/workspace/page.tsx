'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Sparkles, Send, Brain, ChevronDown, Copy,
  CheckCircle2, Zap, Shield, X, Package,
  ArrowRight, Eye, Share2, Download,
} from 'lucide-react';
import { mockAIResponses } from '@/data/mockData';
import type { AIProvider, ChatMessage, ContextCapsule } from '@/types';
import { sleep } from '@/lib/utils';

const providers: { id: AIProvider; label: string; desc: string; icon: string; color: string }[] = [
  { id: 'auto', label: 'Auto Router', desc: 'Best model per task', icon: '⚡', color: '#4f8ef7' },
  { id: 'chatgpt', label: 'ChatGPT', desc: 'Complex reasoning', icon: '🟢', color: '#10b981' },
  { id: 'gemini', label: 'Gemini', desc: 'Multimodal & creative', icon: '🔵', color: '#4f8ef7' },
  { id: 'claude', label: 'Claude', desc: 'Document analysis', icon: '🟠', color: '#f59e0b' },
];

const aiContext = {
  project: 'AccessHire Career OS',
  targetRole: 'AI Operations Engineer',
  capabilityFit: 83,
  capabilityGaps: ['AI Evaluation', 'Cloud AI Deployment'],
  resumeFile: 'Priya_AI_Operations.pdf',
  opportunity: 'AI Operations Internship — Infosys AI Labs',
  contextHealth: 92,
};

const suggestedPrompts = [
  { label: 'Prepare me for this AI Operations interview', key: 'interview-prep' },
  { label: 'Help me optimize my resume for this role', key: 'resume-help' },
  { label: 'What capabilities should I focus on?', key: 'capability-question' },
];

const routingRules = [
  { task: 'Analyze this PDF', recommended: 'Claude', reason: 'Document analysis' },
  { task: 'Refine this product idea', recommended: 'Gemini', reason: 'Creative synthesis' },
  { task: 'Reason through this architecture', recommended: 'ChatGPT', reason: 'Complex reasoning' },
  { task: 'Career interview prep', recommended: 'Auto', reason: 'Context-aware routing' },
];

function ModelBadge({ provider }: { provider: AIProvider }) {
  const p = providers.find(x => x.id === provider) || providers[0];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
      fontSize: '0.65rem', fontWeight: 700,
      padding: '0.1rem 0.375rem', borderRadius: 999,
      background: `${p.color}18`, color: p.color,
      border: `1px solid ${p.color}30`,
    }}>
      {p.icon} {p.label}
    </span>
  );
}

function CapsuleGenerator({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<'idle' | 'generating' | 'done'>('idle');
  const [tokensBefore, setTokensBefore] = useState(42800);
  const [tokensAfter, setTokensAfter] = useState(42800);
  const [reviewed, setReviewed] = useState(false);

  const generate = async () => {
    setStage('generating');
    // Animate compression
    const start = 42800;
    const end = 2100;
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      await sleep(50);
      setTokensAfter(Math.round(start - (start - end) * (i / steps)));
    }
    setStage('done');
  };

  const capsule: ContextCapsule = {
    id: 'capsule-1',
    project: 'AccessHire Career OS — Priya Sharma',
    goal: 'Secure AI Operations Internship at Infosys AI Labs',
    constraints: ['3-year career gap', 'Missing AI Evaluation capability', 'Remote preferred'],
    decisions: ['Focus on AI Ops role (74% readiness)', 'Prioritize AI Evaluation practical trial', 'Resume optimized to 94% ATS fit'],
    importantFacts: ['Capability Twin: 82% verified', 'Best match: AI Ops Internship 94%', 'Interview scheduled: Sep 2'],
    files: ['Priya_AI_Operations.pdf', 'capability-twin.json'],
    openQuestions: ['Agent Orchestration capability gap?', 'Cloud AI deployment timeline?'],
    conversationSummary: 'Discussed career transition from IT Support to AI Operations. Identified 3 capability gaps. Resume optimized. Interview prep initiated.',
    tokensBefore: 42800,
    tokensAfter: 2100,
    createdAt: new Date().toISOString(),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)',
          borderRadius: 14, padding: '1.5rem', width: '100%', maxWidth: 520,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <Package size={18} style={{ color: 'var(--violet)' }} />
              <span style={{ fontSize: '1rem', fontWeight: 800 }}>Context Capsule</span>
            </div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
              A portable structured context package for any AI to continue your work
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.3rem' }}>
            <X size={15} />
          </button>
        </div>

        {/* Token animation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', background: 'var(--bg-hover)', borderRadius: 10 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>BEFORE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-muted)' }}>{tokensBefore.toLocaleString()}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>tokens</div>
          </div>
          <ArrowRight size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>AFTER</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stage === 'done' ? 'var(--green)' : 'var(--text-secondary)' }}>
              {tokensAfter.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>tokens</div>
          </div>
          {stage === 'done' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                marginLeft: 'auto', padding: '0.375rem 0.75rem', borderRadius: 8,
                background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                fontSize: '1rem', fontWeight: 900, color: 'var(--green)',
              }}
            >
              95% smaller
            </motion.div>
          )}
        </div>

        {stage === 'done' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              ACCESSHIRE CONTEXT CAPSULE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              {[
                { label: 'Project', value: capsule.project },
                { label: 'Goal', value: capsule.goal },
                { label: 'Key Facts', value: capsule.importantFacts.join(' · ') },
                { label: 'Open Questions', value: capsule.openQuestions.join(' · ') },
                { label: 'Summary', value: capsule.conversationSummary },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0.625rem', background: 'var(--bg-hover)', borderRadius: 6 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0, width: 90 }}>{item.label}</span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {!reviewed && (
              <div style={{
                padding: '0.625rem', marginBottom: '0.875rem',
                background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: 8, fontSize: '0.775rem', color: 'var(--amber)',
              }}>
                <Shield size={13} style={{ display: 'inline', marginRight: '0.375rem' }} />
                Review before sharing — remove any sensitive personal data
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ fontSize: '0.775rem' }}>
                <Copy size={13} /> Copy Capsule
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.775rem' }}>
                <Share2 size={13} /> Share Link
              </button>
              <button className="btn-secondary" style={{ fontSize: '0.775rem' }}>
                <Download size={13} /> Export
              </button>
              <button onClick={() => setReviewed(true)} className="btn-ghost" style={{ fontSize: '0.775rem', border: '1px solid var(--border)' }}>
                <Eye size={13} /> Mark Reviewed
              </button>
            </div>
          </motion.div>
        )}

        {stage !== 'done' && (
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.75rem' }}
            onClick={generate}
            disabled={stage === 'generating'}
            id="generate-capsule-btn"
          >
            {stage === 'generating' ? (
              <>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[0,1,2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
                </div>
                Compressing context...
              </>
            ) : (
              <><Package size={15} /> Generate Context Capsule</>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function WorkspaceContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'sys-1',
      role: 'system',
      content: 'Context loaded: AI Operations Internship · Capability Twin 82% · Target: AI Ops Engineer · 2 capability gaps identified',
      provider: 'auto',
      timestamp: new Date(Date.now() - 60000).toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState<AIProvider>('auto');
  const [loading, setLoading] = useState(false);
  const [showCapsule, setShowCapsule] = useState(tabParam === 'capsule');
  const [activeTab, setActiveTab] = useState<'chat' | 'router'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    const sentInput = input;
    setInput('');
    setLoading(true);

    await sleep(1200);

    // Pick response
    let response = `I understand you're asking about: "${sentInput.slice(0, 50)}..."\n\nBased on your Capability Twin and current context (AI Operations target role, 74% readiness, 2 gaps), here's my analysis:\n\nYour strongest transferable capabilities are Troubleshooting (91%), Python (87%), and Automation (80%). The critical gap is AI Evaluation (currently 45%, required 70%+).\n\nWould you like me to create a specific action plan for closing this gap?`;

    if (sentInput.toLowerCase().includes('interview')) response = mockAIResponses['interview-prep'];
    else if (sentInput.toLowerCase().includes('resume')) response = mockAIResponses['resume-help'];
    else if (sentInput.toLowerCase().includes('capabilit')) response = mockAIResponses['capability-question'];

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: response,
      provider,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">AI Workspace</h1>
        <p className="page-subtitle">One conversation. Multiple AI engines. Your full career context — already loaded.</p>
      </div>

      {/* Tab */}
      <div className="tab-nav" style={{ marginBottom: '1.25rem', width: 'fit-content' }}>
        <button className={`tab-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>AI Chat</button>
        <button className={`tab-item ${activeTab === 'router' ? 'active' : ''}`} onClick={() => setActiveTab('router')}>AI Router</button>
      </div>

      {activeTab === 'router' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="section-title" style={{ marginBottom: '0.375rem' }}>Multi-AI Router</div>
          <div className="section-subtitle" style={{ marginBottom: '1.25rem' }}>Transparent routing — each task recommended to the best AI engine</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {routingRules.map(r => (
              <div key={r.task} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '0.875rem 1rem', background: 'var(--bg-elevated)',
                border: '1px solid var(--border)', borderRadius: 9,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.2rem' }}>"{r.task}"</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Reason: {r.reason}</div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--blue-primary)' }}>{r.recommended}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Recommended</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.25rem' }}>

          {/* Chat Panel */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 560 }}>
            {/* Header */}
            <div style={{
              padding: '0.875rem 1rem', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <Sparkles size={16} style={{ color: 'var(--blue-primary)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>AccessHire AI</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--green)' }}>Context loaded · Ready</div>
              </div>

              {/* Model selector */}
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {providers.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setProvider(p.id)}
                    style={{
                      padding: '0.25rem 0.5rem', borderRadius: 6, fontSize: '0.7rem',
                      fontWeight: 600, cursor: 'pointer', border: 'none',
                      background: provider === p.id ? `${p.color}22` : 'var(--bg-elevated)',
                      color: provider === p.id ? p.color : 'var(--text-secondary)',
                      transition: 'all 0.12s',
                    }}
                    title={p.desc}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>

              <button
                className="btn-secondary"
                style={{ fontSize: '0.725rem' }}
                onClick={() => setShowCapsule(true)}
              >
                <Package size={12} /> Capsule
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: '0.5rem', alignItems: 'flex-start',
                  }}
                >
                  {msg.role !== 'user' && (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', fontWeight: 800, color: 'white',
                    }}>A</div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    padding: '0.625rem 0.875rem',
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.role === 'user' ? 'var(--blue-primary)' :
                      msg.role === 'system' ? 'rgba(16,185,129,0.08)' : 'var(--bg-elevated)',
                    border: msg.role === 'system' ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--border-subtle)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line',
                  }}>
                    {msg.role === 'system' && (
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.25rem', letterSpacing: '0.04em' }}>
                        🤖 SYSTEM CONTEXT
                      </div>
                    )}
                    {msg.content}
                    {msg.provider && msg.role === 'assistant' && (
                      <div style={{ marginTop: '0.375rem' }}>
                        <ModelBadge provider={msg.provider} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: 'white', flexShrink: 0,
                  }}>A</div>
                  <div style={{ padding: '0.625rem 0.875rem', background: 'var(--bg-elevated)', borderRadius: '12px 12px 12px 2px', border: '1px solid var(--border-subtle)', display: 'flex', gap: '0.3rem' }}>
                    {[0,1,2].map(i => <div key={i} className="ai-dot" style={{ animationDelay: `${i*0.2}s` }} />)}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 1rem 0.625rem', display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {suggestedPrompts.map(p => (
                  <button
                    key={p.key}
                    onClick={() => { setInput(p.label); }}
                    style={{
                      padding: '0.3rem 0.625rem', borderRadius: 999, fontSize: '0.725rem',
                      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                      color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.12s',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask AccessHire AI — context already loaded..."
                style={{
                  flex: 1, padding: '0.5rem 0.75rem', background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  color: 'var(--text-primary)', fontSize: '0.825rem', outline: 'none',
                  fontFamily: 'inherit',
                }}
                id="chat-input"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="btn-primary"
                style={{ padding: '0.5rem 0.75rem' }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* Context Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                <Brain size={15} style={{ color: 'var(--blue-primary)' }} />
                <span style={{ fontSize: '0.825rem', fontWeight: 700 }}>Active Context</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 700,
                  color: 'var(--green)', background: 'rgba(16,185,129,0.1)',
                  padding: '0.1rem 0.375rem', borderRadius: 999,
                }}>
                  {aiContext.contextHealth}% Health
                </span>
              </div>

              {[
                { label: 'Project', value: aiContext.project },
                { label: 'Target Role', value: aiContext.targetRole },
                { label: 'Capability Fit', value: `${aiContext.capabilityFit}%` },
                { label: 'Resume', value: aiContext.resumeFile },
                { label: 'Opportunity', value: 'AI Ops Internship' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.375rem', fontSize: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)', width: 80, flexShrink: 0 }}>{item.label}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}

              <div style={{ marginTop: '0.625rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--amber)', fontWeight: 700, marginBottom: '0.25rem' }}>⚡ GAPS</div>
                {aiContext.capabilityGaps.map(g => (
                  <span key={g} className="badge badge-amber" style={{ marginRight: '0.25rem', marginBottom: '0.25rem' }}>{g}</span>
                ))}
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ justifyContent: 'center', width: '100%', border: '1px solid var(--violet)', color: 'var(--violet)' }}
              onClick={() => setShowCapsule(true)}
              id="create-capsule-btn"
            >
              <Package size={14} /> Create Context Capsule
            </button>
          </div>
        </div>
      )}

      {/* Capsule Modal */}
      <AnimatePresence>
        {showCapsule && <CapsuleGenerator onClose={() => setShowCapsule(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: 'var(--text-muted)' }}>Loading...</div>}>
      <WorkspaceContent />
    </Suspense>
  );
}
