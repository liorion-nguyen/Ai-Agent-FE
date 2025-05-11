import { useUpdateProfile } from '@/app/[lang]/(user)/(root)/dashboard/profile/hooks/useProfile';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { useEffect, useState } from 'react';
interface ModalUpdatePhoneNumberProps {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
}

export default function ModalUpdatePhoneNumber({
  isOpen,
  onClose,
  phone,
}: ModalUpdatePhoneNumberProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>(phone);
  const { updateProfile, loading } = useUpdateProfile();
  useEffect(() => {
    setPhoneNumber(phone);
  }, [phone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      phone: phoneNumber,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Chỉnh sửa số điện thoại</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại mới
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập số điện thoại của bạn"
            />
          </div>
          <div className="flex justify-end">
            <ModalButton
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              disabled={
                loading || phoneNumber === phone || phoneNumber.length === 0
              }
            >
              {loading ? 'Đang cập nhật...' : 'Tiếp theo'}
            </ModalButton>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
