'use client';

import DashboardFooter from '@/components/ui/DashboardFooter';
import DashboardHeader from '@/components/ui/DashboardHeader';
import type React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-grow" style={{ paddingTop: '70px' }}>
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
};
