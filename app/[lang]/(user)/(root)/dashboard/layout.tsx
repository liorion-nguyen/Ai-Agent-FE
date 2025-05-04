import SidebarNav from '@/app/[lang]/(user)/(root)/components/SidebarNav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';
import { checkAdminAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';
import { ReactNode } from 'react';

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
      <div className="flex relative">
        <SidebarNav />
        <SidebarTrigger />
      </div>
      <main className="flex-1 max-h-screen overflow-y-hidden flex flex-col bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserDashBoardLayout;
