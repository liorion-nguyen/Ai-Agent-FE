'use client';

import { adminLoginSchema } from '@/shared/validations';
import { useZodForm } from '@/shared/hooks';
import { useSignIn } from '@/app/[lang]/(user)/(auth)/hooks';
import { ROUTES } from '@/shared/constants';

const SignInForm = () => {
  const { signIn, loading, error: errorSignIn } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(adminLoginSchema);

  return (
    <form onSubmit={handleSubmit((data) => signIn(data))} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        {...register('email')}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register('password')}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password.message}</p>
      )}

      {errorSignIn && (
        <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded dark:bg-red-800/50 dark:text-red-300">
          {Array.isArray(errorSignIn.message?.message)
            ? errorSignIn.message.message.join(', ')
            : errorSignIn.message?.message || 'Đăng nhập thất bại'}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <a href={ROUTES.SIGNUP}>You do not have an account? Sign Up</a>
      <a href={ROUTES.FORGOT_PASSWORD}>Forgot your password?</a>
    </form>
  );
};

export default SignInForm;
