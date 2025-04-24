'use client';

import useForgotPasswordStore from '@/store/forgot-password';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import OtpVerificationForm from '../../components/OtpVerificationForm';
import NewPasswordForm from '../../components/NewPasswordForm';

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
