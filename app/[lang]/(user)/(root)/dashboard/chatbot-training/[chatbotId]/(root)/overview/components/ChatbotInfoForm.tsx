'use client';

import { useGetChatbot } from '@/app/[lang]/(user)/(root)/dashboard/chatbot-training/hooks/useChatbot';
import { useZodForm } from '@/shared/hooks';
import { updateChatbotSchema } from '@/shared/validations/chatbot/chatbot.schema';
import useChatbotStore from '@/store/chatbot';
import { ChevronDown, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

const ChatbotInfoForm = forwardRef((_, ref) => {
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const { chatbot, hydrated } = useChatbotStore();

  const { getChatbot } = useGetChatbot();
  const inpRef = useRef<HTMLInputElement>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useZodForm(updateChatbotSchema, {
    defaultValues: {
      chatbot_name: chatbot?.chatbot_name,
      description: chatbot?.description,
      businessName: '',
      language: 'Tiếng Việt',
      theme: '#4C01C4',
      thumbnail: '',
      model: '',
    },
  });

  const themeValue = watch('theme');

  useEffect(() => {
    // if (!hydrated) return;
    if (!chatbot) {
      getChatbot(chatbotId);
    }
    if (chatbot) {
      setValue('chatbot_name', chatbot.chatbot_name || '');
      setValue('description', chatbot.description || '');
      setValue('thumbnail', chatbot.thumbnail || '');
      setThumbnailPreview(chatbot.thumbnail || null);
    }
  }, [chatbotId, chatbot, hydrated, getChatbot, setValue]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (base64String && typeof base64String === 'string') {
          setThumbnailPreview(base64String);
          setValue('thumbnail', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    console.log(`Xóa chatbot: ${chatbotId}`);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return new Promise((resolve, reject) => {
        handleSubmit(
          (data) => resolve(data),
          (err) => reject(err),
        )();
      });
    },
  }));

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('chatbot_name')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.chatbot_name && (
          <p className="text-sm text-red-500">{errors.chatbot_name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mô tả
        </label>
        <textarea
          placeholder="Mô tả chatbot"
          {...register('description')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên doanh nghiệp
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

      <div className="flex items-center gap-6">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Model
        </label>
        <div className="relative">
          <select
            {...register('model')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value={chatbot?.model.id}>
              {chatbot?.model.model_name}
            </option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
        {errors.model && (
          <p className="text-sm text-red-500">{errors.model.message}</p>
        )}
      </div>

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
});

ChatbotInfoForm.displayName = 'ChatbotInfoForm';

export default ChatbotInfoForm;
