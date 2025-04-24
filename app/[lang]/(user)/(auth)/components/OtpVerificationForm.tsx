'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import OtpInput from 'react-otp-input';
import { verifyOtpSchema } from '@/shared/validations';
import { useVerifyOtp } from '@/app/[lang]/(user)/(auth)/hooks';
import useForgotPasswordStore from '@/store/forgot-password';
import { useZodForm } from '@/shared/hooks';
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
      <div className="text-center">
        <p className="!text-gray-900 dark:!text-white">Enter OTP</p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Check your email for the 10-digit OTP
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => verifyOtp(data))}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          disabled
          value={useForgotPasswordStore.getState().email}
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              numInputs={10}
              shouldAutoFocus
              renderInput={(props) => (
                <input
                  {...props}
                  type="tel"
                  className="w-12 h-12 text-xl text-center border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
                />
              )}
            />
          )}
        />

        {errors.otp && (
          <p className="text-sm text-red-500">{errors.otp.message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      <button onClick={() => useForgotPasswordStore.setState({ step: 1 })}>
        Back
      </button>
    </div>
  );
};

export default OtpVerificationForm;
