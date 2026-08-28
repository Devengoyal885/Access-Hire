'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, User, Menu, Command,
  Brain, CheckSquare, Zap,
} from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import CommandPalette from './CommandPalette';
import { mockNotifications } from '@/data/mockData';

interface TopbarProps {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = mockNotifications.filter(n => !n.read).length;

  const openCmd = useCallback(() => setCmdOpen(true), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCmd();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openCmd]);

  const notifIcon: Record<string, React.ReactNode> = {
    capability: <Brain size={13} style={{ color: 'var(--blue-primary)' }} />,
    opportunity: <Zap size={13} style={{ color: 'var(--amber)' }} />,
    email: <CheckSquare size={13} style={{ color: 'var(--green)' }} />,
    verification: <CheckSquare size={13} style={{ color: 'var(--green)' }} />,
    resume: <Search size={13} style={{ color: 'var(--violet)' }} />,
  };

  return (
    <>
      <header className="topbar" role="banner">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="btn-ghost"
          style={{ display: 'none', padding: '0.4rem' }}
          aria-label="Open menu"
          id="mobile-menu-btn"
        >
          <Menu size={18} />
        </button>

        {/* Search / Command */}
        <button
          onClick={openCmd}
          style={{
            flex: 1, maxWidth: 360,
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 7,
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.12s',
          }}
          aria-label="Open command palette"
          id="search-trigger"
        >
          <Search size={13} />
          <span style={{ flex: 1, textAlign: 'left' }}>Search or run command...</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            <kbd style={{
              fontSize: '0.65rem', padding: '0.1rem 0.35rem',
              background: 'var(--bg-hover)', border: '1px solid var(--border)',
              borderRadius: 4, color: 'var(--text-muted)',
            }}>
              <Command size={9} style={{ display: 'inline' }} />K
            </kbd>
          </div>
        </button>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginLeft: 'auto' }}>
          <ThemeSwitcher />

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotifOpen(o => !o)}
              className="btn-ghost"
              style={{ padding: '0.4rem', borderRadius: 7, border: '1px solid var(--border)', position: 'relative' }}
              aria-label="Notifications"
              id="notifications-btn"
            >
              <Bell size={15} />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: 2, right: 2,
                  width: 7, height: 7, borderRadius: '50%',
                  background: 'var(--red)', border: '1.5px solid var(--bg-surface)',
                }} />
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem',
                    width: 320, background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    zIndex: 50, overflow: 'hidden',
                  }}
                >
                  <div style={{
                    padding: '0.625rem 0.875rem', borderBottom: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Notifications</span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700,
                      background: 'rgba(239,68,68,0.15)', color: 'var(--red)',
                      padding: '0.1rem 0.4rem', borderRadius: 999,
                    }}>{unread} new</span>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {mockNotifications.map(n => (
                      <div key={n.id} style={{
                        display: 'flex', gap: '0.625rem', padding: '0.625rem 0.875rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        background: n.read ? 'transparent' : 'rgba(79,142,247,0.04)',
                        cursor: 'pointer',
                      }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                          background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {notifIcon[n.type] || <Bell size={13} />}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem', lineHeight: 1.4 }}>{n.message}</div>
                        </div>
                        {!n.read && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue-primary)', flexShrink: 0, marginTop: 6 }} />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 0.625rem', borderRadius: 7,
              border: '1px solid var(--border)', textDecoration: 'none',
              transition: 'all 0.12s',
            }}
            aria-label="Profile"
            id="profile-btn"
          >
            <div style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #4f8ef7, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontWeight: 800, color: 'white',
            }}>
              P
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                Priya Sharma
              </span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                AI Ops Candidate
              </span>
            </div>
          </Link>
        </div>
      </header>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
