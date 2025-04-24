import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ReactNode } from 'react';

const CollectionsLayout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default CollectionsLayout;
