import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import LogoAgent from '@/public/icons/ic_logo-agent.png';
import { MessageCircleQuestion } from 'lucide-react';
import Image from 'next/image';

export default function HeaderPayment() {
  return (
    <SectionDashboardLayout className="border-b border-gray-200 flex justify-between items-center w-full">
      <div className="p-2">
        <Image src={LogoAgent} alt="Logo" width={100} height={60} />
      </div>
      <div className="flex items-center text-gray-600">
        <MessageCircleQuestion className="w-5 h-5 mr-1" />
        <p>Bạn cần hỗ trợ? </p>
        <a href="" className="ml-1 text-purple-600 hover:underline">
          Liên hệ ngay!
        </a>
      </div>
    </SectionDashboardLayout>
  );
}
