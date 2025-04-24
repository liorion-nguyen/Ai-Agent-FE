import { ReactNode } from 'react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default RootLayout;
