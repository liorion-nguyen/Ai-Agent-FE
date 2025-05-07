'use client';

import { newPasswordSchema } from '@/shared/validations';
import { useZodForm } from '@/shared/hooks';
import { useResetPassword } from '@/app/[lang]/(user)/(auth)/hooks';
import useForgotPasswordStore from '@/store/forgot-password';

const NewPasswordForm = () => {
  const { resetPassword, loading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(newPasswordSchema);

  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <p className="!text-gray-900 dark:!text-white">Nhập mật khẩu mới</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Nhập mật khẩu mới để đăng nhập vào tài khoản của bạn
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) =>
          resetPassword({
            ...data,
            otp: useForgotPasswordStore.getState().otp,
          }),
        )}
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            disabled
            value={useForgotPasswordStore.getState().email}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            {...register('new_password')}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.new_password && (
            <p className="text-sm text-red-500">
              {errors.new_password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Đang đặt lại...' : 'Đặt lại'}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => useForgotPasswordStore.setState({ step: 2 })}
          className="text-sm text-gray-900 dark:text-gray-300 hover:underline"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default NewPasswordForm;
