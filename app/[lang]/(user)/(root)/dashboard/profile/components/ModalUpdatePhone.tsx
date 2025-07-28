import { useUpdateProfile } from '@/app/[lang]/(user)/(root)/dashboard/profile/hooks/useProfile';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { validatePhoneNumber } from '@/shared/validations/profile/profile.schema';
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
  const [error, setError] = useState<string>('');
  const { updateProfile, loading } = useUpdateProfile();

  useEffect(() => {
    setPhoneNumber(phone);
    setError('');
  }, [phone]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.length === 0) {
      setError('Vui lòng nhập số điện thoại');
    } else if (!validatePhoneNumber(value)) {
      setError(
        'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng số điện thoại Việt Nam',
      );
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Số điện thoại không hợp lệ');
      return;
    }
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
              onChange={handlePhoneChange}
              className={`w-full px-4 py-2 border ${
                error ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Nhập số điện thoại của bạn"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end">
            <ModalButton
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              disabled={
                loading ||
                phoneNumber === phone ||
                phoneNumber.length === 0 ||
                !!error
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
