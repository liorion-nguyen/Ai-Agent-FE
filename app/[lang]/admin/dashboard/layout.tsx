import { ReactNode } from 'react';
import { AUTH_ACTIONS } from '@/shared/constants';
import { checkAdminAuth } from '@/shared/actions/auth.actions';
import AdminSliderBar from '@/app/[lang]/admin/components/AdminSliderBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/Sidebar';

export const generateMetadata = () => {
  return {
    title: `Admin - Dashboard`,
    description: 'Ai-Agent Application',
  };
};

const AdminDashBoardLayout = async ({ children }: { children: ReactNode }) => {
  await checkAdminAuth(AUTH_ACTIONS.DASH_BOARD);

  return (
    <SidebarProvider>
      <AdminSliderBar />
      <main className="flex-1 min-h-screen flex flex-col bg-muted p-4 md:p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminDashBoardLayout;
