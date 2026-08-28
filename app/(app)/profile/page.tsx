'use client';

import { motion } from 'framer-motion';
import { mockCapabilities, mockUser } from '@/data/mockData';
import { CheckCircle2, MapPin, GraduationCap, Clock, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your AccessHire profile and career data</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem' }}>
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', margin: '0 auto 1rem',
            background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, color: 'white',
            boxShadow: '0 4px 16px rgba(79,142,247,0.35)',
          }}>P</div>

          <div style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '0.25rem' }}>{mockUser.name}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--blue-primary)', fontWeight: 600, marginBottom: '1rem' }}>
            AI Ops Candidate
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.8rem' }}>
            {[
              { icon: <MapPin size={13} />, value: mockUser.location },
              { icon: <GraduationCap size={13} />, value: mockUser.education },
              { icon: <Clock size={13} />, value: `Career gap: ${mockUser.careerGap}` },
              { icon: <TrendingUp size={13} />, value: `Target: ${mockUser.targetRole}` },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                {item.value}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--blue-primary)' }}>{mockUser.capabilityTwinScore}%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Capability Twin Score</div>
          </div>
        </motion.div>

        {/* Capabilities Overview */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div className="section-title" style={{ marginBottom: '1rem' }}>All Capabilities</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {mockCapabilities.map((cap, i) => (
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
  );
}
