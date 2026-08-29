'use client';

import { AuthProvider } from '@/lib/auth-context';
import AuthModal from '@/components/auth/AuthModal';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AuthModal />
    </AuthProvider>
  );
}
