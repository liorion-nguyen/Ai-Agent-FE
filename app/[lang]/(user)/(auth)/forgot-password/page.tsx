import { checkUserAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';
import ForgotPassword from './components';
const ForgotPasswordPage = async () => {
  await checkUserAuth(AUTH_ACTIONS.SIGN_IN);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter your email below
          </p>
        </div>
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
