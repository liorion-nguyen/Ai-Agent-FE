import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex">
      <div className="w-1/2 h-screen">
        <img
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
