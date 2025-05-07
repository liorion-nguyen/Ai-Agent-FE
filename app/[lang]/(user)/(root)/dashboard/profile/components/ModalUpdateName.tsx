import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { useEffect, useState } from 'react';

interface ModalUpdateNameProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
}

export default function ModalUpdateName({
  isOpen,
  onClose,
  fullName,
}: ModalUpdateNameProps) {
  const [name, setName] = useState<string>(fullName);
  useEffect(() => {
    setName(fullName);
  }, [fullName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New name:', name);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Tên hồ sơ</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên hồ sơ
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Nhập tên hồ sơ"
            />
          </div>
          <div className="flex justify-end">
            <ModalButton
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              disabled={name === fullName || name.length === 0}
            >
              Lưu thay đổi
            </ModalButton>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
