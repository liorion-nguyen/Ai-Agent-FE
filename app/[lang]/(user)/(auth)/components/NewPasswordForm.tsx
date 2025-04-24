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
    <form
      onSubmit={handleSubmit((data) => resetPassword(data))}
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
      <input
        type="new_password"
        placeholder="New Password"
        {...register('new_password')}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.new_password && (
        <p className="text-sm text-red-500">{errors.new_password.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Resetting...' : 'Reset'}
      </button>

      <button onClick={() => useForgotPasswordStore.setState({ step: 2 })}>
        Back
      </button>
    </form>
  );
};

export default NewPasswordForm;
