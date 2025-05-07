'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import CaseStudiesSection from './components/sections/CaseStudiesSection';
import ConsultationFormSection from './components/sections/ConsultationFormSection';
import HeroSection from './components/sections/HeroSection';
import PlatformsSection from './components/sections/PlatformsSection';
import PricingSection from './components/sections/PricingSection';
import ReasonsSection from './components/sections/ReasonsSection';
const HomePage = () => {
  return (
    <DashboardLayout>
      <HeroSection />
      <CaseStudiesSection />
      <ReasonsSection />
      <PlatformsSection />
      <PricingSection />
      <ConsultationFormSection />
    </DashboardLayout>
  );
};

export default HomePage;
