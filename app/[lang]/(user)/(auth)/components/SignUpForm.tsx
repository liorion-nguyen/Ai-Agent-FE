'use client';

import { adminRegisterSchema } from '@/shared/validations';
import { useZodForm } from '@/shared/hooks';
import { useSignUp } from '@/app/[lang]/(user)/(auth)/hooks';
import { ROUTES } from '@/shared/constants';
import { useState } from 'react';

const SignUpForm = () => {
  const { signUp, loading, error: errorSignUp } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [fullnameLength, setFullnameLength] = useState(0);
  const [emailLength, setEmailLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(adminRegisterSchema);

  return (
    <form onSubmit={handleSubmit((data) => signUp(data))} className="space-y-4">
      {/* Fullname Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Họ tên <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập tên của bạn"
            {...register('fullname')}
            onChange={(e) => setFullnameLength(e.target.value.length)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-2 text-sm text-gray-500">
            {fullnameLength}/30
          </span>
        </div>
        {errors.fullname && (
          <p className="text-sm text-red-500">{errors.fullname.message}</p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            {...register('email')}
            onChange={(e) => setEmailLength(e.target.value.length)}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="absolute right-3 top-2 text-sm text-gray-500">
            {emailLength}/50
          </span>
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
          Mật khẩu <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu của bạn"
            {...register('password')}
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Error Message */}
      {errorSignUp && (
        <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded dark:bg-red-800/50 dark:text-red-300">
          {errorSignUp.message || 'Đăng ký thất bại'}
        </div>
      )}

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
      </button>

      {/* Additional Links */}
      <div className="text-center text-sm">
        <p className="text-gray-700 dark:text-gray-300">
          Bằng việc đăng ký, bạn đã đồng ý với{' '}
          <a
            href="#"
            className="text-purple-600 hover:underline dark:text-purple-400"
          >
            Điều khoản dịch vụ
          </a>{' '}
          &{' '}
          <a
            href="#"
            className="text-purple-600 hover:underline dark:text-purple-400"
          >
            Chính sách bảo mật
          </a>
        </p>
        <p className="mt-2">
          Bạn đã có tài khoản?{' '}
          <a
            href={ROUTES.SIGNIN}
            className="text-purple-600 hover:underline dark:text-purple-400"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
