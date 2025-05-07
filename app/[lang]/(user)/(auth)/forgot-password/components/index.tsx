'use client';

import ForgotPasswordForm from '@/app/[lang]/(user)/(auth)/components/ForgotPasswordForm';
import NewPasswordForm from '@/app/[lang]/(user)/(auth)/components/NewPasswordForm';
import OtpVerificationForm from '@/app/[lang]/(user)/(auth)/components/OtpVerificationForm';
import useForgotPasswordStore from '@/store/forgot-password';

const ForgotPassword = () => {
  const { step } = useForgotPasswordStore();
  return (
    <div>
      {step === 1 && <ForgotPasswordForm />}
      {step === 2 && <OtpVerificationForm />}
      {step === 3 && <NewPasswordForm />}
    </div>
  );
};

export default ForgotPassword;
