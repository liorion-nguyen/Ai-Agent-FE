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
      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      <a href={ROUTES.SIGNIN} className="text-sm text-gray-500">
        Back to Sign In
      </a>
    </form>
  );
};

export default ForgotPasswordForm;
