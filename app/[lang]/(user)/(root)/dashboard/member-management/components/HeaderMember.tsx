import ModalAddMember from '@/app/[lang]/(user)/(root)/dashboard/member-management/components/ModalAddMember';
import { Progress } from '@/components/ui/Progress';
import useSubscriptionStore from '@/store/subscription';
import { Plus } from 'lucide-react';
import { useState } from 'react';
export default function HeaderMember() {
  const [isOpen, setIsOpen] = useState(false);
  const { subscription } = useSubscriptionStore();
  return (
    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-[65px] max-h-[65px]">
      <h3 className="text-xl font-bold">Thành viên & Quyền truy cập</h3>
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <p>Thành viên</p>
            <p>0/{subscription?.subscription.member_limit}</p>
          </div>
          <Progress
            value={
              subscription?.subscription.member_limit
                ? subscription?.subscription.member_limit
                : 0
            }
            className="h-2 mt-1"
          />
        </div>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Plus />
          Thêm thành viên
        </button>
      </div>
      <ModalAddMember isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
