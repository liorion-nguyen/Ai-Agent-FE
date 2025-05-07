'use client';
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
import { toast, useZodForm } from '@/shared/hooks';
import { requestSchema } from '@/shared/validations/ticket/ticket.schema';
import { z } from 'zod';

interface ModalCreateRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalCreateRequest({
  isOpen,
  onClose,
}: ModalCreateRequestProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(requestSchema, {
    defaultValues: {
      issue: '',
      department: '',
      description: '',
      file: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof requestSchema>) => {
    try {
      const payload = {
        issue: data.issue,
        department: data.department,
        description: data.description,
        file: data.file,
      };
      console.log('Request data:', payload);
      onClose();
    } catch (error) {
      console.error('Error creating request:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tạo ticket',
        variant: 'destructive',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Tạo ticket</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vấn đề của bạn
            </label>
            <ModalInput
              placeholder="Nhập vấn đề của bạn"
              {...register('issue')}
            />
            {errors.issue && (
              <p className="text-sm text-red-500 mt-1">
                {errors.issue.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yêu cầu phòng/ban hỗ trợ
            </label>
            <ModalSelect {...register('department')}>
              <option value="" disabled>
                Chọn phòng/ban muốn hỗ trợ
              </option>
              <option value="IT">Phòng IT</option>
              <option value="HR">Phòng Nhân sự</option>
              <option value="Finance">Phòng Tài chính</option>
            </ModalSelect>
            {errors.department && (
              <p className="text-sm text-red-500 mt-1">
                {errors.department.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả vấn đề
            </label>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={4}
              placeholder="Viết mô tả vấn đề của bạn"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File upload
            </label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              {...register('file')}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Đóng
        </ModalButton>
        <ModalButton type="submit" onClick={handleSubmit(onSubmit)}>
          Gửi hỗ trợ
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
