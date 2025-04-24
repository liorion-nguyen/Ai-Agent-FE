import { ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: `Admin - Users`,
    description: 'Ai-Agent Application',
  };
};

const UserLayout = async ({ children }: { children: ReactNode }) => {
  return children;
};

export default UserLayout;
