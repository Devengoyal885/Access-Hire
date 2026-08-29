'use client';

import { motion } from 'framer-motion';
import { getUserCapabilities, getUserProfile } from '@/data/mockData';
import { CheckCircle2, MapPin, GraduationCap, Clock, TrendingUp, Shield, Award, Briefcase, FileCode } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = getUserProfile(user?.email);
  const capabilities = getUserCapabilities(user?.email);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your AccessHire profile and verified capability twin</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.25rem' }}>
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #10b981, #4f8ef7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, color: 'white',
            boxShadow: '0 4px 16px rgba(16,185,129,0.35)',
          }}>
            {profile.name[0]}
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{profile.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 600, marginBottom: '1rem' }}>
            {profile.targetRole}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
            {[
              { icon: <MapPin size={13} />, value: profile.location },
              { icon: <GraduationCap size={13} />, value: profile.education },
              { icon: <TrendingUp size={13} />, value: `Target: ${profile.targetRole}` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{item.icon}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '0.875rem', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue-primary)' }}>{profile.capabilityTwinScore}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified Capability Twin Score</div>
          </div>

          {/* Patents summary if available */}
          {profile.patents && profile.patents.length > 0 && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(245,158,11,0.08)', borderRadius: 8, border: '1px solid rgba(245,158,11,0.2)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--amber)', marginBottom: '0.375rem' }}>
                <Shield size={13} /> {profile.patents.length} Patents Filed
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Grounded in high-confidence independently verifiable patent disclosures.
              </div>
            </div>
          )}
        </motion.div>

        {/* Right side: Capabilities + Master Profile Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Deven's Master Profile Projects & Hackathons */}
          {profile.id === 'user-deven' && (
            <div className="card" style={{ padding: '1.25rem' }}>
              <div className="section-title" style={{ marginBottom: '0.875rem' }}>Master Profile &amp; Real Evidence</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <FileCode size={13} /> PROJECTS (VERIFIED EVIDENCE)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '0.625rem', background: 'var(--bg-elevated)', borderRadius: 7, border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>MailIQ — AI Email Platform</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Dec 2024 – Jan 2025 · Python, REST APIs, AI Classification</div>
                    </div>
                    <div style={{ padding: '0.625rem', background: 'var(--bg-elevated)', borderRadius: 7, border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Cogniflow AI — Analytics Dashboard</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Jun 2026 – Jul 2026 · Full Stack, SQL, Real-time Analytics</div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Award size={13} /> HACKATHON AWARDS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <div>🏆 Winner — AI for Social Good Hackathon, IIT Ropar</div>
                    <div>🏆 Winner — Stack Sprint 1.0 Hackathon, Chandigarh University</div>
                    <div>🥈 2nd Place — Peace of Code Hackathon, IIT Ropar</div>
                    <div>🥈 2nd Place — HackIndia Vibe Coding Hackathon</div>
                    <div>⭐ Academic Achievers Award — Chandigarh University</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Capabilities Overview */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <div className="section-title" style={{ marginBottom: '1rem' }}>Derived Capabilities Twin</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: 160, flexShrink: 0 }}>
                    {cap.evidence.some(e => e.verified) && <CheckCircle2 size={12} style={{ color: 'var(--green)', flexShrink: 0 }} />}
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{cap.name}</span>
                  </div>
                  <div style={{ flex: 1, height: 6, background: 'var(--bg-elevated)', borderRadius: 999, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cap.proficiency}%` }}
                      transition={{ delay: i * 0.05 + 0.3, duration: 0.7, ease: 'easeOut' }}
                      style={{
                        height: '100%', borderRadius: 999,
                        background: cap.proficiency >= 85 ? 'var(--green)' : cap.proficiency >= 70 ? 'var(--blue-primary)' : 'var(--amber)',
                      }}
                    />
                  </div>
                  <span style={{
                    width: 36, textAlign: 'right', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0,
                    color: cap.proficiency >= 85 ? 'var(--green)' : cap.proficiency >= 70 ? 'var(--blue-primary)' : 'var(--amber)',
                  }}>
                    {cap.proficiency}%
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', width: 60, textAlign: 'right', flexShrink: 0, textTransform: 'capitalize' }}>
                    {cap.recency}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
