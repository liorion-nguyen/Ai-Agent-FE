import Img from '@/components/ui/Image';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex">
      <div className="w-1/2 h-screen">
        <Img
          src="/images/bg-login.webp"
          alt="auth-bg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2">{children}</div>
    </section>
  );
};

export default AuthLayout;
