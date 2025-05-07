import PricingSection from '@/app/[lang]/components/sections/PricingSection';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const PricePage = () => {
  return (
    <DashboardLayout>
      <PricingSection />
    </DashboardLayout>
  );
};

export default PricePage;
