import ForgotPassword from './components';
import { checkUserAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';

const ForgotPasswordPage = async () => {
  await checkUserAuth(AUTH_ACTIONS.SIGN_IN);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Quên mật khẩu
          </h1>
        </div>
        <ForgotPassword />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
