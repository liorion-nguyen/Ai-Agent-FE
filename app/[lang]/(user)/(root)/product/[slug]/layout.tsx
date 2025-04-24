import { ReactNode } from 'react';
// import Header from '@/components/ui/Header/Header';

export const generateMetadata = ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  return {
    title: `Product Detail Page - ${lang}`,
    description: 'Product Detail Page',
  };
};

const ProductDetailLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {/* <Header /> */}
      {children}
      {/* Waiting footer */}
    </div>
  );
};

export default ProductDetailLayout;
