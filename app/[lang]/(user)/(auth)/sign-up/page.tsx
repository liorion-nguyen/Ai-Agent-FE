import SignUpForm from '../components/SignUpForm';
import { checkUserAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';

const SignUpPage = async () => {
  await checkUserAuth(AUTH_ACTIONS.SIGN_IN);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sign Up
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Enter your credentials below
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
