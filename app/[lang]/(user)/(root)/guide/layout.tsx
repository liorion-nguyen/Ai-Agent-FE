import { DashboardLayout } from '@/components/layout/dashboard-layout';
import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      <SectionDashboardLayout className="pb-20">
        {children}
      </SectionDashboardLayout>
    </DashboardLayout>
  );
}
