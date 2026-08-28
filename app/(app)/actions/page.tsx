'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare, Mail, Brain, Zap, Award,
  Clock, Filter, ChevronRight, CheckCircle2,
  AlertCircle, Target, ArrowRight, X,
} from 'lucide-react';
import { mockActions, mockEmails } from '@/data/mockData';
import type { Action, Email } from '@/types';
import { formatDeadline } from '@/lib/utils';

const priorityColor: Record<string, string> = {
  urgent: 'var(--red)',
  high: 'var(--amber)',
  medium: 'var(--blue-primary)',
  low: 'var(--text-muted)',
};

const catIcon: Record<string, React.ReactNode> = {
  application: <Target size={14} />,
  assessment: <Brain size={14} />,
  interview: <Award size={14} />,
  hackathon: <Zap size={14} />,
  learning: <CheckSquare size={14} />,
  email: <Mail size={14} />,
  'follow-up': <ChevronRight size={14} />,
  deadline: <Clock size={14} />,
};

const emailCatColor: Record<string, string> = {
  interview: 'var(--green)',
  assessment: 'var(--blue-primary)',
  opportunity: 'var(--amber)',
  deadline: 'var(--red)',
  'follow-up': 'var(--violet)',
  general: 'var(--text-muted)',
};

function ActionCard({ action, onComplete }: { action: Action; onComplete: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8, height: 0 }}
      layout
      style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
        padding: '0.875rem 1rem',
        background: action.completed ? 'rgba(16,185,129,0.04)' : `${priorityColor[action.priority]}08`,
        border: `1px solid ${action.completed ? 'rgba(16,185,129,0.2)' : `${priorityColor[action.priority]}22`}`,
        borderRadius: 9, cursor: 'pointer', opacity: action.completed ? 0.6 : 1,
        transition: 'all 0.15s',
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 8, flexShrink: 0,
        background: `${priorityColor[action.priority]}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: priorityColor[action.priority],
      }}>
        {action.completed ? <CheckCircle2 size={15} style={{ color: 'var(--green)' }} /> : (catIcon[action.category] || <CheckSquare size={14} />)}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.825rem', fontWeight: 700,
            color: action.completed ? 'var(--text-muted)' : 'var(--text-primary)',
            textDecoration: action.completed ? 'line-through' : 'none',
          }}>{action.title}</span>
          <span style={{
            fontSize: '0.6rem', fontWeight: 800,
            padding: '0.1rem 0.375rem', borderRadius: 999,
            background: `${priorityColor[action.priority]}18`,
            color: priorityColor[action.priority],
            textTransform: 'uppercase',
          }}>{action.priority}</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{action.description}</div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.375rem', flexWrap: 'wrap' }}>
          {action.deadline && (
            <span style={{ fontSize: '0.7rem', color: action.priority === 'urgent' ? 'var(--red)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Clock size={11} />Deadline: {formatDeadline(action.deadline)}
            </span>
          )}
          {action.estimatedTime && (
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>⏱ {action.estimatedTime}</span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'flex-end', flexShrink: 0 }}>
        {!action.completed && (
          <>
            <button className="btn-primary" style={{ fontSize: '0.7rem', padding: '0.25rem 0.625rem' }}>
              Act <ArrowRight size={11} />
            </button>
            <button
              className="btn-ghost"
              style={{ fontSize: '0.7rem', border: '1px solid var(--border)' }}
              onClick={() => onComplete(action.id)}
            >
              Done ✓
            </button>
          </>
        )}
        {action.completed && (
          <span style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600 }}>Completed</span>
        )}
      </div>
    </motion.div>
  );
}

function EmailCard({ email, onCreateAction }: { email: Email; onCreateAction: (e: Email) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      style={{
        background: email.read ? 'var(--bg-surface)' : 'rgba(79,142,247,0.04)',
        border: `1px solid ${email.read ? 'var(--border)' : 'rgba(79,142,247,0.2)'}`,
        borderRadius: 9, overflow: 'hidden',
      }}
    >
      <div
        style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem 1rem', cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        {!email.read && (
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue-primary)', marginTop: 6, flexShrink: 0 }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: email.read ? 500 : 700, color: 'var(--text-primary)' }}>{email.subject}</span>
            {email.category && (
              <span style={{
                fontSize: '0.65rem', fontWeight: 700, padding: '0.1rem 0.375rem', borderRadius: 999,
                background: `${emailCatColor[email.category]}15`,
                color: emailCatColor[email.category],
                textTransform: 'capitalize', flexShrink: 0, marginLeft: '0.5rem',
              }}>
                {email.category}
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {email.from} · {email.fromOrg}
          </div>
          {!expanded && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email.preview}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1rem 1rem' }}>
              {/* Email body */}
              <div style={{
                background: 'var(--bg-elevated)', borderRadius: 8, padding: '0.875rem',
                fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.6,
                border: '1px solid var(--border)', marginBottom: '0.875rem',
                whiteSpace: 'pre-line',
              }}>
                {email.body}
              </div>

              {/* AI Extraction */}
              {email.extractedEvent && (
                <div style={{
                  padding: '0.75rem', background: 'rgba(16,185,129,0.07)',
                  border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, marginBottom: '0.875rem',
                }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
                    🤖 AI EXTRACTED
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.775rem' }}>
                    <div><span style={{ color: 'var(--text-muted)' }}>Type: </span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{email.extractedEvent.type}</span></div>
                    {email.extractedEvent.date && <div><span style={{ color: 'var(--text-muted)' }}>Date: </span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{email.extractedEvent.date}</span></div>}
                    {email.extractedEvent.role && <div><span style={{ color: 'var(--text-muted)' }}>Role: </span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{email.extractedEvent.role}</span></div>}
                  </div>
                  {email.recommendedAction && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                      <strong>Recommended:</strong> {email.recommendedAction}
                    </div>
                  )}
                </div>
              )}

              {email.extractedEvent && (
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => onCreateAction(email)}
                >
                  <CheckSquare size={14} /> Create Action
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ActionsPage() {
  const [actions, setActions] = useState(mockActions);
  const [activeTab, setActiveTab] = useState<'actions' | 'emails'>('actions');
  const [filter, setFilter] = useState<string>('all');
  const [emailCreated, setEmailCreated] = useState<string | null>(null);

  const completeAction = (id: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, completed: true } : a));
  };

  const createActionFromEmail = (email: Email) => {
    const newAction: Action = {
      id: `act-email-${email.id}`,
      title: `${email.extractedEvent?.type} — ${email.extractedEvent?.role || email.fromOrg}`,
      description: `From: ${email.fromOrg}. ${email.recommendedAction}`,
      priority: email.category === 'interview' || email.category === 'deadline' ? 'urgent' : 'high',
      category: email.category === 'interview' ? 'interview' : 'email',
      relatedOpportunity: undefined,
      deadline: email.extractedEvent?.date,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setActions(prev => [newAction, ...prev]);
    setEmailCreated(email.id);
    setActiveTab('actions');
    setTimeout(() => setEmailCreated(null), 3000);
  };

  const filters = ['all', 'urgent', 'application', 'assessment', 'interview', 'learning'];

  const filteredActions = actions.filter(a => {
    if (filter === 'all') return !a.completed;
    if (filter === 'urgent') return a.priority === 'urgent' && !a.completed;
    return a.category === filter && !a.completed;
  });

  const completedActions = actions.filter(a => a.completed);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Action Center</h1>
        <p className="page-subtitle">Turn opportunities, emails, learning and career events into one intelligent queue.</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        {[
          { label: 'Active Actions', value: actions.filter(a => !a.completed).length, color: 'var(--blue-primary)' },
          { label: 'Urgent Today', value: actions.filter(a => a.priority === 'urgent' && !a.completed).length, color: 'var(--red)' },
          { label: 'Unread Emails', value: mockEmails.filter(e => !e.read).length, color: 'var(--amber)' },
          { label: 'Completed', value: completedActions.length, color: 'var(--green)' },
        ].map(s => (
          <div key={s.label} className="metric-card" style={{ flex: 1 }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.label}</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-nav" style={{ marginBottom: '1.25rem', width: 'fit-content' }}>
        <button className={`tab-item ${activeTab === 'actions' ? 'active' : ''}`} onClick={() => setActiveTab('actions')}>
          Actions {actions.filter(a => !a.completed).length > 0 && `(${actions.filter(a => !a.completed).length})`}
        </button>
        <button className={`tab-item ${activeTab === 'emails' ? 'active' : ''}`} onClick={() => setActiveTab('emails')}>
          Opportunity Intelligence {mockEmails.filter(e => !e.read).length > 0 && `(${mockEmails.filter(e => !e.read).length})`}
        </button>
      </div>

      {/* Email→Action toast */}
      <AnimatePresence>
        {emailCreated && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: '0.75rem 1rem', marginBottom: '1rem',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 8, display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.825rem', fontWeight: 600, color: 'var(--green)',
            }}
          >
            <CheckCircle2 size={16} />
            Action created from email and added to your queue!
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'actions' && (
        <div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.75rem',
                  fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: filter === f ? 'var(--blue-primary)' : 'var(--bg-elevated)',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  textTransform: 'capitalize', transition: 'all 0.12s',
                }}
              >
                {f === 'all' ? 'Active' : f}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <AnimatePresence>
              {filteredActions.length === 0 ? (
                <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active actions in this category. Great work! 🎉
                </div>
              ) : (
                filteredActions.map(action => (
                  <ActionCard key={action.id} action={action} onComplete={completeAction} />
                ))
              )}
            </AnimatePresence>
          </div>

          {completedActions.length > 0 && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.625rem' }}>
                COMPLETED ({completedActions.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {completedActions.map(action => (
                  <ActionCard key={action.id} action={action} onComplete={() => {}} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'emails' && (
        <div>
          <div style={{
            padding: '0.625rem 0.875rem', marginBottom: '1rem',
            background: 'rgba(79,142,247,0.06)', border: '1px solid rgba(79,142,247,0.15)',
            borderRadius: 8, fontSize: '0.775rem', color: 'var(--text-secondary)',
          }}>
            🤖 <strong style={{ color: 'var(--blue-primary)' }}>Opportunity & Communication Intelligence</strong> — AI-analyzed career emails with extracted events and recommended actions.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {mockEmails.map(email => (
              <EmailCard key={email.id} email={email} onCreateAction={createActionFromEmail} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
