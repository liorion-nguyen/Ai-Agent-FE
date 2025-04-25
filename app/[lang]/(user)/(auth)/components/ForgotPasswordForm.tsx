'use client';

import { forgotPasswordSchema } from '@/shared/validations';
import { useZodForm } from '@/shared/hooks';
import { useForgotPassword } from '@/app/[lang]/(user)/(auth)/hooks';
import { ROUTES } from '@/shared/constants';

const ForgotPasswordForm = () => {
  const { forgotPassword, loading } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(forgotPasswordSchema);

  return (
    <form
      onSubmit={handleSubmit((data) => forgotPassword(data))}
      className="space-y-4"
    >
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-10">
        Nhập email liên kết với tài khoản của bạn để nhận email hướng dẫn đặt
        lại mật khẩu của bạn.
      </p>
      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          {...register('email')}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'Đang gửi...' : 'Gửi'}
      </button>

      <a
        href={ROUTES.SIGNIN}
        className="text-sm text-gray-900 dark:text-gray-300 hover:underline text-center mt-20 w-full"
      >
        Quay lại
      </a>
    </form>
  );
};

export default ForgotPasswordForm;
