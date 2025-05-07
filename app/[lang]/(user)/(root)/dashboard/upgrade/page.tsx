import PricingSection from '@/app/[lang]/components/sections/PricingSection';
import { Button } from '@/components/ui/Button';
import { MessageCirclePlus, StickyNote } from 'lucide-react';

export default function UpgradePage() {
  return (
    <div className="bg-white p-2">
      <div className="flex flex-row gap-4 border-b border-gray-200 pb-4">
        <h3 className="text-2xl font-bold">Nâng cấp gói và mua thêm dữ liệu</h3>
      </div>
      <div className="p-6 overflow-y-auto max-h-[calc(100vh-65px)]">
        <PricingSection />
        <div className="flex flex-col gap-4 pb-4">
          <h3 className="text-3xl font-bold text-center mb-3">
            Mua thêm gói dịch vụ
          </h3>
          <div className="flex flex-row gap-4 w-1/3 mx-auto">
            <div className="w-1/2 flex flex-col gap-4 p-4 border border-gray-200 rounded-lg items-center">
              <h4 className="text-lg font-bold">Page</h4>
              <StickyNote size={48} color="purple" />
              <p className="text-center">Mua thêm Page</p>
              <Button className="bg-purple-500 text-white">Mua ngay</Button>
            </div>
            <div className="w-1/2 flex flex-col gap-4 p-4 border border-gray-200 rounded-lg items-center">
              <h4 className="text-lg font-bold">Conversation</h4>
              <MessageCirclePlus size={48} color="purple" />
              <p className="text-center">Mua thêm conversation</p>
              <Button className="bg-purple-500 text-white">Mua ngay</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
