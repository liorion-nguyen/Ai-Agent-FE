import { ReactNode } from 'react';

const PriceLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default PriceLayout;
