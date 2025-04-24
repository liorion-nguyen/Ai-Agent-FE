import { ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: `Admin - Coupons`,
    description: 'Ai-Agent Application',
  };
};

const CouponLayout = async ({ children }: { children: ReactNode }) => {
  return children;
};

export default CouponLayout;
