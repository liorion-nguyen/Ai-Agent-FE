import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default AuthLayout;
