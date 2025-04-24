import { ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: `Admin - Banners`,
    description: 'Ai-Agent Application',
  };
};

const BannerLayout = async ({ children }: { children: ReactNode }) => {
  return children;
};

export default BannerLayout;
