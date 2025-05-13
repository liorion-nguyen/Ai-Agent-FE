import { SidebarProvider } from '@/components/ui/Sidebar';
import { checkAdminAuth } from '@/shared/actions/auth.actions';
import { AUTH_ACTIONS } from '@/shared/constants';
import { ReactNode } from 'react';
import SidebarNavMessage from './components/SidebarNavMessage';

export const generateMetadata = () => {
  return {
    title: `User - Messages`,
    description: 'Ai-Agent Application',
  };
};

const UserMessagesLayout = async ({ children }: { children: ReactNode }) => {
  await checkAdminAuth(AUTH_ACTIONS.DASH_BOARD);

  return (
    <SidebarProvider>
      <SidebarNavMessage />
      <main className="flex-1 max-h-screen overflow-y-hidden flex flex-col bg-muted">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default UserMessagesLayout;
