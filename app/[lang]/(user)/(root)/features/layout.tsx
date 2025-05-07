import { ReactNode } from 'react';

const FeaturesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <nav></nav>
      {children}
    </section>
  );
};

export default FeaturesLayout;
