import MarkdownViewer from '@/components/ui/Markdown';
import { toast, useZodForm } from '@/shared/hooks';
import { MessageType } from '@/shared/types';
import { formatDateTimeMessage } from '@/shared/utils/date';
import { purchaseSchema } from '@/shared/validations/chatbot/chatbot.schema';
import { useState } from 'react';
import { z } from 'zod';

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

interface ItemMessageProps {
  message: MessageType;
}

export const ItemMessage = ({ message }: ItemMessageProps) => {
  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useZodForm(purchaseSchema, {
    defaultValues: {
      name: '',
      phone: '',
      note: '',
    },
  });

  const onSubmit = async (values: PurchaseFormValues) => {
    try {
      console.log(values);
      // Gọi API lưu thông tin khách hàng (đã comment trong code gốc)
      // await fetch("/api/purchase", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...values, product: message.content }),
      // });
      toast({
        title: 'Success',
        description: 'Thông tin đã được gửi!',
        variant: 'default',
      });
      setShowForm(false);
      reset();
    } catch {
      toast({
        title: 'Error',
        description: 'Gửi thất bại. Vui lòng thử lại.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`flex ${
          message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
        } mb-4 items-start max-w-full`}
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm m-2">
          {message.sender === 'user' ? 'U' : 'B'}
        </div>

        {/* Nội dung tin nhắn */}
        <div className="max-w-[70%] flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-800">
            {message.sender === 'user' ? 'You' : 'Bot'}
          </span>

          <MarkdownViewer content={message.content} />

          <span
            className={`text-sm text-gray-500 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            {formatDateTimeMessage(message.createdAt)}
          </span>
          {message.sender === 'bot' &&
            message.content.includes('mua sản phẩm') &&
            !showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition w-fit text-sm"
              >
                Bạn muốn mua sản phẩm này?
              </button>
            )}
        </div>
      </div>

      {/* Form nhập thông tin */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 bg-gray-50 p-3 rounded-lg space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Nhập họ và tên"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              {...register('note')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              placeholder="Nhập ghi chú (tuỳ chọn)"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                reset();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-sm"
            >
              Gửi
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ItemMessage;
