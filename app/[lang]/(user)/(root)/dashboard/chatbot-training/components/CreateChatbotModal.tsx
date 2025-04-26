'use client';

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
} from '@/components/ui/Modal'; // Import custom modal components
import { useZodForm } from '@/shared/hooks';
import { createChatbotSchema } from '@/shared/validations/chatbot/chatbot.schema';
import { ImagePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

const CreateChatbotModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  //   const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue,
    reset,
  } = useZodForm(createChatbotSchema, {
    defaultValues: {
      name: '',
      prompt: '',
      industry: '',
      greeting: '',
      avatar: '',
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    reset();
    // setAvatarPreview(null);
  };

  //   const handleAvatarChange = (base64: string) => {
  //     setAvatarPreview(base64);
  //     setValue('avatar', base64);
  //   };

  const onSubmit = async (data: z.infer<typeof createChatbotSchema>) => {
    try {
      // Giả lập API call để tạo chatbot
      console.log('Creating chatbot with data:', data);
      // Sau khi tạo thành công, đóng modal và redirect
      closeModal();
      router.push('/chatbot-success'); // Điều hướng sau khi tạo thành công
    } catch (error) {
      console.error('Error creating chatbot:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="4xl">
      <ModalHeader>
        <ModalTitle>Tạo chatbot</ModalTitle>
        <ModalCloseButton onClick={closeModal} />
      </ModalHeader>
      <ModalBody className="flex  gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
          {/* Chi tiết bot */}
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Chi tiết bot
          </h4>
          <div className="flex flex-col gap-4">
            {/* Tên bot */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên bot
              </label>
              <ModalInput placeholder="Chọn tên bot" {...register('name')} />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Hình ảnh bot */}
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
            {errors.avatar && (
              <p className="text-sm text-red-500 mt-1">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {/* Danh sách ngành nghề */}
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

          {/* Câu chào hỏi */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Câu chào hỏi
            </h4>
            <textarea
              placeholder="Hello! How can I help you today?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
              {...register('greeting')}
            />
            {errors.greeting && (
              <p className="text-sm text-red-500 mt-1">
                {errors.greeting.message}
              </p>
            )}
          </div>
        </form>

        {/* Kích bản mẫu */}
        <div className="mb-4 border-l border-gray-200 pl-4 w-1/2">
          <h4 className="text-md font-medium text-gray-900 mb-2">
            Kích bản mẫu
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
        <ModalButton type="submit" onClick={handleSubmit(onSubmit)}>
          Tạo chatbot
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default CreateChatbotModal;
