'use client';

import { useSignOut } from '@/app/[lang]/admin/hooks/useAuth';
import { useSubscription } from '@/app/[lang]/hooks/useSubscription';
import { Progress } from '@/components/ui/Progress';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import useSubscriptionStore from '@/store/subscription';
import {
  BarChart,
  BotMessageSquare,
  FileText,
  HelpCircle,
  Key,
  Link,
  LogOut,
  MessageSquare,
  Settings,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

const items = [
  {
    title: 'Thông tin cá nhân',
    url: '/dashboard/profile',
    icon: User,
    tooltip: 'Thông tin cá nhân',
  },
  {
    title: 'Đào tạo chatbot',
    url: '/dashboard/chatbot-training',
    icon: BotMessageSquare,
    tooltip: 'Đào tạo chatbot',
  },
  {
    title: 'Quản lý resource',
    url: '/dashboard/resource',
    icon: FileText,
    tooltip: 'Quản lý resource',
  },
  {
    title: 'Quản lý tín nhắn',
    url: '/dashboard/messages',
    icon: MessageSquare,
    tooltip: 'Quản lý tín nhắn',
  },
  {
    title: 'Quản lý token',
    url: '/dashboard/token-management',
    icon: Key,
    tooltip: 'Quản lý token',
  },
  {
    title: 'Affiliate',
    url: '/dashboard/affiliate',
    icon: Link,
    tooltip: 'Affiliate',
  },
  {
    title: 'Hỗ trợ yêu cầu ticket',
    url: '/dashboard/support-tickets',
    icon: HelpCircle,
    tooltip: 'Hỗ trợ ticket',
  },
  {
    title: 'Hạn mức sử dụng',
    url: '/dashboard/usage-limits',
    icon: BarChart,
    tooltip: 'Hạn mức sử dụng',
  },
  {
    title: 'Nâng cấp',
    url: '/dashboard/upgrade',
    icon: BarChart,
    tooltip: 'Nâng cấp',
  },
  {
    title: 'Cài đặt',
    url: '/dashboard/settings',
    icon: Settings,
    tooltip: 'Cài đặt',
  },
];

const SidebarNav = () => {
  const { signOut, loading } = useSignOut();
  const pathname = usePathname();
  const isActive = (url: string) => {
    return pathname.includes(url);
  };
  const { subscription } = useSubscriptionStore();
  const { getSubscription } = useSubscription();
  useLayoutEffect(() => {
    getSubscription();
  }, []);
  return (
    <Sidebar
      collapsible="icon"
      className="flex flex-col justify-between bg-gray-900 text-white"
    >
      {/* Header with User Profile and Progress Bar */}
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Image
            width={40}
            height={40}
            src="/icons/admin_icon.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
          />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold">Nguyen Quoc Chung</span>
            <span className="text-sm text-gray-400">
              {subscription?.subscription.name}
            </span>
          </div>
        </div>
        <div className="mt-3 group-data-[collapsible=icon]:hidden">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Document</span>
            <span>2 / {subscription?.subscription.knowledge_limit}</span>
          </div>
          <Progress value={20} className="h-2 mt-1" />
        </div>
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.tooltip}
                    isActive={isActive(item.url)}
                    className={isActive(item.url) ? 'bg-purple-600' : ''}
                  >
                    <a href={item.url} className="!h-10">
                      <item.icon className="text-white" />
                      <span className="text-xs group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout Button */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut()}
              disabled={loading}
              className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 !h-10 justify-center"
            >
              <LogOut className="text-white" />
              <span className="group-data-[collapsible=icon]:hidden">
                Đăng xuất
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarNav;
