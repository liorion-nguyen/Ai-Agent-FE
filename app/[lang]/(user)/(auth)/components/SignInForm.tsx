'use client';

import { useSignIn } from '@/app/[lang]/(user)/(auth)/hooks';
import { ROUTES } from '@/shared/constants';
import { useZodForm } from '@/shared/hooks';
import { adminLoginSchema } from '@/shared/validations';

const SignInForm = () => {
  const { signIn, loading, error: errorSignIn } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(adminLoginSchema);

  return (
    <form onSubmit={handleSubmit((data) => signIn(data))} className="space-y-4">
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

      {/* Password Input */}
      <div>
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <a
            href={ROUTES.FORGOT_PASSWORD}
            className="text-sm text-purple-600 hover:underline dark:text-purple-400"
          >
            Quên mật khẩu?
          </a>
        </div>
        <input
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          {...register('password')}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Error Message */}
      {errorSignIn && (
        <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded dark:bg-red-800/50 dark:text-red-300">
          {Array.isArray(errorSignIn.message?.message)
            ? errorSignIn.message.message.join(', ')
            : errorSignIn.message?.message || 'Đăng nhập thất bại'}
        </div>
      )}

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>

      {/* Sign Up Link */}
      <div className="text-center flex justify-center items-center gap-2">
        <p>Bạn chưa có tài khoản?</p>
        <a
          href={ROUTES.SIGNUP}
          className="text-sm text-purple-600 hover:underline dark:text-purple-400"
        >
          Đăng ký
        </a>
      </div>
    </form>
  );
};

export default SignInForm;
