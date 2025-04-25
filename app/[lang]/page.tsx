import { DashboardLayout } from '@/components/layout/dashboard-layout';
import HeroSection from './components/sections/HeroSection';
import CaseStudiesSection from './components/sections/CaseStudiesSection';
import ReasonsSection from './components/sections/ReasonsSection';
import PlatformsSection from './components/sections/PlatformsSection';
import PricingSection from './components/sections/PricingSection';
import ConsultationFormSection from './components/sections/ConsultationFormSection';
import CompanyInfoSection from './components/sections/CompanyInfoSection';
const HomePage = () => {
  return (
    <DashboardLayout>
      <HeroSection />
      <CaseStudiesSection />
      <ReasonsSection />
      <PlatformsSection />
      <PricingSection />
      <ConsultationFormSection />
      <CompanyInfoSection />
    </DashboardLayout>
  );
};

export default HomePage;
