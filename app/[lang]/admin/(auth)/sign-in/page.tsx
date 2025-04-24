import SignInForm from '@/app/[lang]/admin/components/SignInForm';
import { checkAdminAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';

const SignInAdminPage = async () => {
  await checkAdminAuth(AUTH_ACTIONS.SIGN_IN);
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInAdminPage;
