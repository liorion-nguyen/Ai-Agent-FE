import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { checkAdminAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';
import { ReactNode } from 'react';
import SidebarNav from '../components/SidebarNav';

export const generateMetadata = () => {
  return {
    title: `User - Dashboard`,
    description: 'Ai-Agent Application',
  };
};

const UserDashBoardLayout = async ({ children }: { children: ReactNode }) => {
  await checkAdminAuth(AUTH_ACTIONS.DASH_BOARD);

  return (
    <SidebarProvider>
      <SidebarNav />
      <main className="flex-1 min-h-screen flex flex-col bg-muted p-4 md:p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserDashBoardLayout;
