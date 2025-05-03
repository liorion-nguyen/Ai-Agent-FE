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
  useEffect(() => {
    setPhoneNumber(phone);
  }, [phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New phone number:', phoneNumber);
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
              disabled={phoneNumber === phone || phoneNumber.length === 0}
            >
              Tiếp theo
            </ModalButton>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
