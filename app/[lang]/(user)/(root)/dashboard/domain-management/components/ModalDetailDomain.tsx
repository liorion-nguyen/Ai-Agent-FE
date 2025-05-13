import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalSelect,
  ModalTitle,
} from '@/components/ui/Modal';
import { DomainStatus } from '@/shared/constants';
import { Domain } from '@/shared/types';
import useDomainStore from '@/store/domain';
import { useEffect, useState } from 'react';
export default function ModalDetailForm({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) {
  const { domains } = useDomainStore();
  const [domainData, setDomainData] = useState<Domain>({
    id: '',
    name: '',
    isVerified: false,
    verificationToken: '',
    status: '',
    created_at: '',
    updated_at: '',
  });

  useEffect(() => {
    const domain = domains.find((d) => d.id === id);
    if (domain) {
      setDomainData(domain);
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDomainData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Lưu domain:', { ...domainData });
    onClose();
  };

  if (!domainData) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Chi tiết domain</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="flex flex-col gap-4 mb-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <ModalInput
              name="domain"
              value={domainData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên domain"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại
            </label>
            <ModalSelect
              name="status"
              value={domainData.status}
              onChange={handleInputChange}
            >
              <option value={DomainStatus.ACTIVE}>Hoạt động</option>
              <option value={DomainStatus.INACTIVE}>Vô hiệu hóa</option>
            </ModalSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <ModalSelect
              name="status"
              value={domainData.status}
              onChange={handleInputChange}
            >
              <option value={DomainStatus.ACTIVE}>Hoạt động</option>
              <option value={DomainStatus.INACTIVE}>Vô hiệu hóa</option>
            </ModalSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày tạo
            </label>
            <ModalInput
              name="created_at"
              value={domainData.created_at}
              disabled
              onChange={handleInputChange}
              placeholder="Nhập ngày tạo"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Hủy
        </ModalButton>
        <ModalButton variant="primary" onClick={handleSave}>
          Lưu
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
