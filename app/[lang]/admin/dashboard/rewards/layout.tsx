import { ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: `Admin - Rewards`,
    description: 'Ai-Agent Application',
  };
};

const RewardLayout = async ({ children }: { children: ReactNode }) => {
  return children;
};

export default RewardLayout;
