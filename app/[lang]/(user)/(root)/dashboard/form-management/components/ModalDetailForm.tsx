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
import { formatDate } from '@/shared/utils';
import { useEffect, useState } from 'react';

const forms = [
  {
    id: 1,
    name: 'Form 1',
    type: 'buy',
    status: 'pending',
    created_at: '2021-01-01',
  },
  {
    id: 2,
    name: 'Form 2',
    type: 'buy',
    status: 'completed',
    created_at: '2021-04-01',
  },
];

interface Form {
  id: number;
  name: string;
  type: string;
  status: string;
  created_at: string;
}

export default function ModalDetailForm({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) {
  const [formData, setFormData] = useState<Form>({
    id: 0,
    name: '',
    type: '',
    status: '',
    created_at: '',
  });
  useEffect(() => {
    const form = forms.find((f) => f.id === parseInt(id));
    if (form) {
      setFormData(form);
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Lưu form:', { ...formData });
    onClose();
  };

  const handleDelete = () => {
    console.log('Xóa form:', id);
    onClose();
  };

  if (!formData) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Chi tiết form</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tên
            </label>
            <ModalInput
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên form"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại
            </label>
            <ModalSelect
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </ModalSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <ModalSelect
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="pending">Đang chờ</option>
              <option value="completed">Hoàn thành</option>
            </ModalSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ngày tạo
            </label>
            <p className="text-sm text-gray-900">
              {formatDate(formData.created_at)}
            </p>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Hủy
        </ModalButton>
        <ModalButton
          variant="primary"
          className="bg-red-500 hover:bg-red-600"
          onClick={handleDelete}
        >
          Xóa
        </ModalButton>
        <ModalButton variant="primary" onClick={handleSave}>
          Lưu
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
