'use client';

import { useZodForm } from '@/shared/hooks';
import { updateChatbotSchema } from '@/shared/validations/chatbot/chatbot.schema';
import useChatbotStore from '@/store/chatbot';
import { ChevronDown, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGetChatbot } from '../../../../hooks/useChatbot';
import { useUpdateChatbot } from '../hooks/useUpdateChatbot';

const ChatbotInfoForm = () => {
  const params = useParams();
  const chatbotId = params.chatbotId || 'bot-demo';
  const { hydrated, chatbot } = useChatbotStore();
  const { getChatbot } = useGetChatbot();
  const { error, success } = useUpdateChatbot();
  const inpRef = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useZodForm(updateChatbotSchema, {
    defaultValues: {
      name: (chatbotId as string) || 'bot-demo',
      businessName: '',
      language: 'Tiếng Việt',
      theme: '#4C01C4',
      thumbnail: '',
    },
  });

  // Theo dõi giá trị theme để hiển thị
  const themeValue = watch('theme');

  // Lấy dữ liệu chatbot và cập nhật form
  useEffect(() => {
    if (!hydrated) return;

    if (!chatbot || chatbot.id !== chatbotId) {
      getChatbot(chatbotId as string);
    }

    if (chatbot) {
      setValue('name', chatbot.chatbot_name || '');
      //   setValue('businessName', chatbot.businessName || '');
      //   setValue('language', chatbot.language || 'Tiếng Việt');
      //   setValue('theme', chatbot.theme || '#4C01C4');
      setValue('thumbnail', chatbot.thumbnail || '');
      setThumbnailPreview(chatbot.thumbnail || null);
    }
  }, [hydrated, chatbot, chatbotId, setValue, getChatbot]);

  // Xử lý upload avatar
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setThumbnailPreview(base64String);
        setValue('thumbnail', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    console.log(`Xóa chatbot: ${chatbotId}`);
    // Thêm logic để xóa chatbot
  };

  return (
    <form
      //   onSubmit={handleSubmit((data) => updateChatbot(chatbotId as string, data))}
      className="space-y-6"
    >
      {/* Tên */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Tên doanh nghiệp */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên doanh nghiệp <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Tên doanh nghiệp của bạn"
          {...register('businessName')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      {/* Avatar và Theme */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar
          </label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inpRef}
            onChange={handleThumbnailChange}
          />
          <Image
            width={48}
            height={48}
            src={
              thumbnailPreview || chatbot?.thumbnail || '/icons/admin_icon.png'
            }
            alt="Chatbot Avatar"
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={() => {
              if (inpRef.current) {
                inpRef.current.click();
              }
            }}
          />
          {errors.thumbnail && (
            <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-3">
            <input
              type="color"
              {...register('theme')}
              onChange={(e) => setValue('theme', e.target.value)}
              className="w-8 h-8 rounded-lg outline-none"
            />
            <span className="text-gray-700">{themeValue}</span>
          </div>
          {errors.theme && (
            <p className="text-sm text-red-500">{errors.theme.message}</p>
          )}
        </div>
      </div>

      {/* Ngôn ngữ trả lời */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ngôn ngữ trả lời
        </label>
        <div className="relative">
          <select
            {...register('language')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value="Tiếng Việt">Tiếng Việt</option>
            <option value="English">English</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
        {errors.language && (
          <p className="text-sm text-red-500">{errors.language.message}</p>
        )}
      </div>

      {/* Thông báo lỗi hoặc thành công */}
      {error && (
        <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded">
          {Array.isArray(error.message?.message)
            ? error.message.message.join(', ')
            : error.message?.message || 'Cập nhật thất bại'}
        </div>
      )}
      {success && (
        <div className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded">
          Cập nhật thành công
        </div>
      )}

      {/* Nút Lưu và Xóa */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-2 text-red-500 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50"
        >
          <Trash2 className="w-5 h-5" />
          Xóa
        </button>
      </div>
    </form>
  );
};

export default ChatbotInfoForm;
