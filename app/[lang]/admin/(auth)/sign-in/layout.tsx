import { ReactNode } from 'react';

export const generateMetadata = () => {
  return {
    title: `Admin - Sign In`,
    description: 'Ai-Agent Application',
  };
};

const SignInLayout = ({ children }: { children: ReactNode }) => {
  return <section>{children}</section>;
};

export default SignInLayout;
