'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockUser } from '@/data/mockData';

export type UserRole = 'candidate' | 'employer';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  org?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginAsCandidate: () => void;
  loginAsEmployer: () => void;
  loginCustom: (email: string, password?: string, role?: UserRole) => boolean;
  signup: (name: string, email: string, password?: string, role?: UserRole) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (initialTab?: 'demo' | 'login' | 'signup') => void;
  closeAuthModal: () => void;
  authModalTab: 'demo' | 'login' | 'signup';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const candidateUser: AuthUser = {
  id: mockUser.id,
  name: mockUser.name,
  email: 'priya.sharma@accesshire.ai',
  role: 'candidate',
  title: 'AI Ops Candidate',
  org: 'Hubli Technology Circle',
};

const employerUser: AuthUser = {
  id: 'user-recruiter-sap',
  name: 'Marcus Vance',
  email: 'marcus.vance@sap.com',
  role: 'employer',
  title: 'Lead Talent Partner',
  org: 'SAP Workforce Intelligence',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(candidateUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'demo' | 'login' | 'signup'>('demo');
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('ah_session_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const saveUserSession = (u: AuthUser | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('ah_session_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('ah_session_user');
    }
  };

  const loginAsCandidate = () => {
    saveUserSession(candidateUser);
    setIsAuthModalOpen(false);
    router.push('/dashboard');
  };

  const loginAsEmployer = () => {
    saveUserSession(employerUser);
    setIsAuthModalOpen(false);
    router.push('/workforce');
  };

  const loginCustom = (email: string, password?: string, role: UserRole = 'candidate') => {
    const isEmployer = role === 'employer' || email.includes('sap.com') || email.includes('enterprise');
    const newUser: AuthUser = isEmployer
      ? {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          email,
          role: 'employer',
          title: 'Workforce Director',
          org: 'Enterprise Talent Org',
        }
      : {
          id: `user-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
          email,
          role: 'candidate',
          title: 'Career OS User',
          org: 'Individual Practitioner',
        };
    saveUserSession(newUser);
    setIsAuthModalOpen(false);
    router.push(newUser.role === 'employer' ? '/workforce' : '/dashboard');
    return true;
  };

  const signup = (name: string, email: string, password?: string, role: UserRole = 'candidate') => {
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      title: role === 'candidate' ? 'AI Candidate' : 'Talent Acquisition Manager',
      org: role === 'candidate' ? 'Individual' : 'Partner Enterprise',
    };
    saveUserSession(newUser);
    setIsAuthModalOpen(false);
    router.push(role === 'employer' ? '/workforce' : '/dashboard');
  };

  const logout = () => {
    saveUserSession(null);
    router.push('/');
  };

  const openAuthModal = (tab: 'demo' | 'login' | 'signup' = 'demo') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsCandidate,
        loginAsEmployer,
        loginCustom,
        signup,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
