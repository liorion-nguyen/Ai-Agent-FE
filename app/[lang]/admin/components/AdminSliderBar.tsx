'use client';

import {
  LayoutDashboard,
  Image as ImageIcon,
  Tags,
  Users,
  Percent,
  Gift,
  ShieldCheck,
  LogOut,
  Sun,
  Moon,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { useState } from 'react';
import { useSignOut } from '@/app/[lang]/admin/hooks/useAuth';
const items = [
  { title: 'Bảng điều khiển', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Banner', url: '/dashboard/banners', icon: ImageIcon },
  { title: 'Thương Hiệu', url: '/dashboard/brands', icon: Tags },
  { title: 'Người Dùng', url: '/dashboard/users', icon: Users },
  {
    title: 'Khuyến mãi & mã giảm giá',
    url: '/dashboard/coupons',
    icon: Percent,
  },
  { title: 'Hệ thống điểm thưởng', url: '/dashboard/rewards', icon: Gift },
];

const AdminSliderBar = () => {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { signOut, loading } = useSignOut();

  return (
    <Sidebar className="flex flex-col justify-between">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-primary uppercase tracking-wider flex items-center gap-2 mb-4 border-b border-border pb-2">
            <ShieldCheck className="w-4 h-4" />
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-1">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* === USER SECTION === */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 pt-5 pb-5">
                  <Image
                    width={32}
                    height={32}
                    src="/icons/admin_icon.png"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">Admin</span>
                    <span className="text-sm text-gray-500">Quản trị viên</span>
                  </div>
                  {open ? (
                    <ChevronUp className="ml-auto" />
                  ) : (
                    <ChevronDown className="ml-auto" />
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Tài khoản</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Thông tin cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Đổi mật khẩu</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Thanh toán</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span
                    className="flex items-center gap-2"
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                    Chế độ {theme === 'dark' ? 'Sáng' : 'Tối'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut();
                  }}
                  disabled={loading}
                >
                  <span className="flex items-center gap-2 text-red-500">
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSliderBar;
