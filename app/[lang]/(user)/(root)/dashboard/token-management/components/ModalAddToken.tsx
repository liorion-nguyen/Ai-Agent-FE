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
import { tokenSchema } from '@/shared/validations/chatbot';
import useChatbotStore from '@/store/chatbot';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useCreateToken } from '../hooks/useToken';
interface ModalAddTokenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAddToken({ isOpen, onClose }: ModalAddTokenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useZodForm(tokenSchema, {
    defaultValues: {
      tokenName: '',
      expiration: '1day',
      customDays: undefined,
    },
  });

  const expiration = watch('expiration');
  const { createChatbotToken, loading } = useCreateToken();
  const { chatbots } = useChatbotStore();

  const onSubmit = async (data: z.infer<typeof tokenSchema>) => {
    try {
      const payload = {
        tokenName: data.tokenName,
        expiration: data.expiration === 'custom' ? data.customDays : data.expiration,
      };
      console.log('Token data:', payload);
      if (chatbots.length > 0) {
        createChatbotToken(chatbots[0].id);
      } else {
        toast({
          title: 'Không tìm thấy chatbot',
          description: 'Vui lòng tạo chatbot trước khi tạo token',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating token:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Thêm Token</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên Token <span className="text-red-500">*</span>
            </label>
            <ModalInput
              placeholder="Nhập tên token"
              {...register('tokenName')}
            />
            {errors.tokenName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.tokenName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hạn Sử Dụng <span className="text-red-500">*</span>
            </label>
            <ModalSelect {...register('expiration')}>
              <option value="1day">1 Ngày</option>
              <option value="30days">30 Ngày</option>
              <option value="custom">Tùy chỉnh</option>
            </ModalSelect>
            {errors.expiration && (
              <p className="text-sm text-red-500 mt-1">
                {errors.expiration.message}
              </p>
            )}
          </div>
          {expiration === 'custom' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số Ngày Tùy Chỉnh <span className="text-red-500">*</span>
              </label>
              <ModalInput
                type="number"
                placeholder="Nhập số ngày"
                {...register('customDays', {
                  valueAsNumber: true,
                })}
              />
              {errors.customDays && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.customDays.message}
                </p>
              )}
            </div>
          )}
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Hủy
        </ModalButton>
        <ModalButton type="submit" disabled={loading} onClick={handleSubmit(onSubmit)}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Thêm'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}