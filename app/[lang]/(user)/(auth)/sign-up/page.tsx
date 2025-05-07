import SignUpForm from '@/app/[lang]/(user)/(auth)/components/SignUpForm';
import { checkUserAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';

const SignUpPage = async () => {
  await checkUserAuth(AUTH_ACTIONS.SIGN_IN);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 rounded-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Đăng ký
          </h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
