import { ReactNode } from 'react';

const ProductLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default ProductLayout;
