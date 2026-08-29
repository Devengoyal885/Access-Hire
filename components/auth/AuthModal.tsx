'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, Sparkles, LogIn, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth, UserRole } from '@/lib/auth-context';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    loginAsCandidate,
    loginAsEmployer,
    loginCustom,
    signup,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'demo' | 'login' | 'signup'>(authModalTab || 'demo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('candidate');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    loginCustom(email, password, role);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in your name and email address');
      return;
    }
    setError('');
    signup(name, email, password, role);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          padding: '1rem',
        }}
        onClick={closeAuthModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            maxWidth: 480,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(79,142,247,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #4f8ef7 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(79,142,247,0.35)',
              }}>
                <Sparkles size={16} color="white" />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  AccessHire Authentication
                </div>
                <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                  Adaptive Capability Twin OS
                </div>
              </div>
            </div>
            <button
              onClick={closeAuthModal}
              className="btn-ghost"
              style={{ padding: '0.35rem', borderRadius: '50%' }}
              aria-label="Close authentication modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}>
            {[
              { id: 'demo', label: 'Quick Demo Login', icon: <Sparkles size={13} /> },
              { id: 'login', label: 'Sign In', icon: <LogIn size={13} /> },
              { id: 'signup', label: 'Sign Up', icon: <UserPlus size={13} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setError(''); }}
                style={{
                  flex: 1,
                  padding: '0.75rem 0.5rem',
                  fontSize: '0.775rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  color: activeTab === tab.id ? 'var(--blue-primary)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--blue-primary)' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.375rem',
                  transition: 'all 0.15s',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div style={{ padding: '1.5rem' }}>
            {error && (
              <div style={{
                padding: '0.625rem 0.875rem',
                marginBottom: '1rem',
                borderRadius: 8,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: 'var(--red)',
                fontSize: '0.775rem',
              }}>
                {error}
              </div>
            )}

            {/* Quick Demo Persona Login */}
            {activeTab === 'demo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Select a pre-configured enterprise persona for instant one-click testing:
                </div>

                <div
                  className="card-flat"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(79,142,247,0.3)',
                    background: 'rgba(79,142,247,0.06)',
                    borderRadius: 10,
                    transition: 'all 0.15s',
                  }}
                  onClick={loginAsCandidate}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1rem',
                    }}>
                      P
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Priya Sharma
                        </span>
                        <span className="badge badge-blue">Candidate OS</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        AI Ops Candidate · Twin Score: 82% · Hubli, India
                      </div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'var(--blue-primary)' }} />
                  </div>
                </div>

                <div
                  className="card-flat"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(139,92,246,0.3)',
                    background: 'rgba(139,92,246,0.06)',
                    borderRadius: 10,
                    transition: 'all 0.15s',
                  }}
                  onClick={loginAsEmployer}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '1rem',
                    }}>
                      M
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Marcus Vance
                        </span>
                        <span className="badge badge-violet">Workforce Console</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Lead Talent Partner · SAP Workforce Intelligence
                      </div>
                    </div>
                    <ArrowRight size={16} style={{ color: 'var(--violet)' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Custom Sign In */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.375rem', display: 'block' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priya@example.com or recruiter@sap.com"
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.375rem', display: 'block' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.375rem', display: 'block' }}>
                    Select Access Role
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setRole('candidate')}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 8,
                        border: `1px solid ${role === 'candidate' ? 'var(--blue-primary)' : 'var(--border)'}`,
                        background: role === 'candidate' ? 'rgba(79,142,247,0.1)' : 'var(--bg-surface)',
                        color: role === 'candidate' ? 'var(--blue-primary)' : 'var(--text-secondary)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      <User size={13} /> Candidate OS
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('employer')}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 8,
                        border: `1px solid ${role === 'employer' ? 'var(--violet)' : 'var(--border)'}`,
                        background: role === 'employer' ? 'rgba(139,92,246,0.1)' : 'var(--bg-surface)',
                        color: role === 'employer' ? 'var(--violet)' : 'var(--text-secondary)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      <Building2 size={13} /> Workforce Console
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <LogIn size={15} /> Sign In
                </button>
              </form>
            )}

            {/* Custom Sign Up */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', display: 'block' }}>
                    Account Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setRole('candidate')}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 8,
                        border: `1px solid ${role === 'candidate' ? 'var(--blue-primary)' : 'var(--border)'}`,
                        background: role === 'candidate' ? 'rgba(79,142,247,0.1)' : 'var(--bg-surface)',
                        color: role === 'candidate' ? 'var(--blue-primary)' : 'var(--text-secondary)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Individual Candidate
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('employer')}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 8,
                        border: `1px solid ${role === 'employer' ? 'var(--violet)' : 'var(--border)'}`,
                        background: role === 'employer' ? 'rgba(139,92,246,0.1)' : 'var(--bg-surface)',
                        color: role === 'employer' ? 'var(--violet)' : 'var(--text-secondary)',
                        fontSize: '0.775rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Enterprise Employer
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <UserPlus size={15} /> Create Free Account
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
