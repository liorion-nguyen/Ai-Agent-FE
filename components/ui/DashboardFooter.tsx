import SectionDashboardLayout from '../layout/section-landing-page-layout';

const DashboardFooter = () => {
  return (
    <SectionDashboardLayout className="bg-purple-600 flex flex-row items-center py-4">
      <div className="flex items-center justify-center gap-2 mr-20">
        <a href="#" className="text-white text-sm">
          Privacy Policy{' '}
        </a>
        <span className="text-white text-sm">|</span>
        <a href="#" className="text-white text-sm">
          Terms of Service
        </a>
      </div>
      <p className="text-white text-sm">© Preny AI 2024</p>
    </SectionDashboardLayout>
  );
};

export default DashboardFooter;
