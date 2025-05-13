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
import { Payment } from '@/shared/types';
import { formatDate } from '@/shared/utils';
import { useEffect, useState } from 'react';

const payments = [
  {
    id: '1',
    amount: 100000,
    payment_method: 'bank_transfer',
    status: 'success',
    created_at: '2021-01-01',
  },
  {
    id: '2',
    amount: 200000,
    payment_method: 'bank_transfer',
    status: 'success',
    created_at: '2021-01-01',
  },
];

export default function ModalDetailPayment({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) {
  const [paymentData, setPaymentData] = useState<Payment>({
    id: '',
    amount: 0,
    payment_method: '',
    status: '',
    created_at: '',
  });
  useEffect(() => {
    const payment = payments.find((p) => p.id === id);
    if (payment) {
      setPaymentData(payment);
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Lưu form:', { ...paymentData });
    onClose();
  };

  const handleDelete = () => {
    console.log('Xóa form:', id);
    onClose();
  };

  if (!paymentData) {
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
              value={paymentData.amount}
              onChange={handleInputChange}
              placeholder="Nhập tên form"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại
            </label>
            <ModalSelect
              name="payment_method"
              value={paymentData.payment_method}
              onChange={handleInputChange}
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="sell">Sell</option>
            </ModalSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trạng thái
            </label>
            <ModalSelect
              name="status"
              value={paymentData.status}
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
              {formatDate(paymentData.created_at)}
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
