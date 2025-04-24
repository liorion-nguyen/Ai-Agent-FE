import { ReactNode } from 'react';

const CustomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default CustomLayout;
