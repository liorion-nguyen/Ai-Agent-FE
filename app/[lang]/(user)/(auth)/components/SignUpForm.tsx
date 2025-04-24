'use client';

import { adminRegisterSchema } from '@/shared/validations';
import { useZodForm } from '@/shared/hooks';
import { useSignUp } from '@/app/[lang]/(user)/(auth)/hooks';
import { ROUTES } from '@/shared/constants';

const SignUpForm = () => {
  const { signUp, loading, error: errorSignUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(adminRegisterSchema);
  return (
    <form onSubmit={handleSubmit((data) => signUp(data))} className="space-y-4">
      <input
        type="text"
        placeholder="Fullname"
        {...register('fullname')}
        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.fullname && (
        <p className="text-sm text-red-500">{errors.fullname.message}</p>
      )}

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

      {errorSignUp && (
        <div className="text-sm text-red-700 bg-red-100 px-3 py-2 rounded dark:bg-red-800/50 dark:text-red-300">
          {errorSignUp.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      <a href={ROUTES.SIGNIN}>You have an account? Sign In</a>
    </form>
  );
};

export default SignUpForm;
