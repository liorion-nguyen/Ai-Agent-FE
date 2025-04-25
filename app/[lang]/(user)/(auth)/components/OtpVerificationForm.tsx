'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { verifyOtpSchema } from '@/shared/validations';
import { useVerifyOtp } from '@/app/[lang]/(user)/(auth)/hooks';
import useForgotPasswordStore from '@/store/forgot-password';
import { useZodForm } from '@/shared/hooks';
import styles from './index.module.css';

const OtpVerificationForm = () => {
  const { verifyOtp, loading } = useVerifyOtp();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(verifyOtpSchema);

  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <p className="!text-gray-900 dark:!text-white">Nhập OTP</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Kiểm tra email của bạn để nhận mã OTP 10 chữ số
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => verifyOtp(data))}
        className="space-y-6"
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

        <div className={styles['input-otp']}>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <div className={styles['input-otp']}>
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  numInputs={10}
                  shouldAutoFocus
                  renderSeparator={null}
                  renderInput={(props) => (
                    <input
                      {...props}
                      type="tel"
                      className="flex-1 h-12 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
                    />
                  )}
                />
              </div>
            )}
          />
        </div>

        {errors.otp && (
          <p className="text-sm text-red-500 text-center">
            {errors.otp.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
        >
          {loading ? 'Đang xác minh...' : 'Xác minh'}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={() => useForgotPasswordStore.setState({ step: 1 })}
          className="text-sm text-gray-900 dark:text-gray-300 hover:underline"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationForm;
