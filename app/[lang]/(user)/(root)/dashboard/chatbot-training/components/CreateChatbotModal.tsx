'use client';

import { useCreateChatbot } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import Img from '@/components/ui/Image';
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
import { useZodForm } from '@/shared/hooks';
import { createChatbotSchema } from '@/shared/validations/chatbot/chatbot.schema';
import { ImagePlus } from 'lucide-react';
import { z } from 'zod';

const CreateChatbotModal = ({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) => {
  const { createChatbot, loading } = useCreateChatbot();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm(createChatbotSchema, {
    defaultValues: {
      chatbot_name: '',
      industry: '',
      description: '',
      thumbnail: '',
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: z.infer<typeof createChatbotSchema>) => {
    try {
      const newData: z.infer<typeof createChatbotSchema> = {
        chatbot_name: data.chatbot_name || '',
        industry: data.industry || '',
        description: data.description || '',
        thumbnail: data.thumbnail || '',
      };

      await createChatbot(newData);
      onSuccess();
      closeModal();
    } catch (error) {
      console.error('Error creating chatbot:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="4xl"
      className="max-h-[700px] overflow-y-auto"
    >
      <ModalHeader>
        <ModalTitle>Tạo chatbot</ModalTitle>
        <ModalCloseButton onClick={closeModal} />
      </ModalHeader>
      <ModalBody className="flex gap-4 md:flex-row flex-col mb-3 md:mb-0">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2">
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Chi tiết bot
          </h4>
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên bot <span className="text-red-500">*</span>
              </label>
              <ModalInput
                placeholder="Chọn tên bot"
                {...register('chatbot_name')}
              />
              {errors.chatbot_name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.chatbot_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Hình ảnh bot
            </h4>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full cursor-pointer bg-gray-200 p-2 flex items-center justify-center">
                <ImagePlus />
              </div>
              <div className="text-sm text-gray-500">
                <Img
                  src="/icons/admin_icon.png"
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
            </div>
            {errors.thumbnail && (
              <p className="text-sm text-red-500 mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Danh sách ngành nghề
            </h4>
            <ModalSelect {...register('industry')}>
              <option value="">Lựa chọn ngành nghề</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="education">Education</option>
            </ModalSelect>
            {errors.industry && (
              <p className="text-sm text-red-500 mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Mô tả</h4>
            <textarea
              placeholder="Mô tả thêm về chatbot"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </form>

        <div className="mb-4 md:border-l border-gray-200 pl-4 w-full md:w-1/2">
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Kịch bản mẫu
          </h4>
          <div className="text-sm text-purple-700 p-4 bg-purple-200 rounded-lg">
            Preny cung cấp kịch bản mẫu tối ưu cho từng ngành nghề, giúp bạn dễ
            dàng chốt sales với các câu hỏi phổ biến nhất. Bạn có thể sử dụng
            ngay bằng việc tích chọn kịch bản sẵn, tùy chỉnh hoặc tự tạo kịch
            bản riêng tại mục kịch bản chốt sales. Cảm ơn bạn!
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={closeModal}>
          Thoát
        </ModalButton>
        <ModalButton
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {loading ? 'Đang tạo...' : 'Tạo chatbot'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default CreateChatbotModal;
