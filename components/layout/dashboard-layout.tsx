'use client';

import type React from 'react';
import DashboardHeader from '@/components/ui/DashboardHeader';
import DashboardFooter from '@/components/ui/DashboardFooter';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-grow">{children}</main>
      <DashboardFooter />
    </div>
  );
};
