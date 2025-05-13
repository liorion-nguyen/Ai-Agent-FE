'use client';
import { useAddDomain } from '@/app/[lang]/(user)/(root)/dashboard/domain-management/hooks/useDomain';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalTitle,
} from '@/components/ui/Modal';
import { useZodForm } from '@/shared/hooks';
import { domainSchema } from '@/shared/validations';
import { z } from 'zod';

interface ModalAddDomainProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAddDomain({
  isOpen,
  onClose,
}: ModalAddDomainProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(domainSchema, {
    defaultValues: {
      domain: '',
      description: '',
    },
  });
  const { addDomain, loading } = useAddDomain();

  const onSubmit = async (data: z.infer<typeof domainSchema>) => {
    await addDomain({
      domain: data.domain,
      description: data.description,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Thêm domain</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Domain <span className="text-red-500">*</span>
            </label>
            <ModalInput
              placeholder="https://example.com"
              {...register('domain')}
            />
            {errors.domain && (
              <p className="text-sm text-red-500 mt-1">
                {errors.domain.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <ModalInput placeholder="Mô tả" {...register('description')} />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Đóng
        </ModalButton>
        <ModalButton
          type="submit"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? 'Đang xử lý...' : 'Thêm domain'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
