'use client';

import { useSignOut } from '@/app/[lang]/(user)/(auth)/hooks';
import SectionDashboardLayout from '@/components/layout/section-landing-page-layout';
import AccountCircleIcon from '@/public/icons/account-circle-icon.svg';
import LogoAgent from '@/public/icons/ic_logo-agent.webp';
import MenuIcon from '@/public/icons/menu-icon.svg';
import { ROUTES } from '@/shared/constants';
import { navigationItems } from '@/shared/constants/navigation';
import { useIsMobile } from '@/shared/hooks/useMobile';
import useUserStore from '@/store/user';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import Img from './Image';

const DashboardHeader = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(); // using custom hook
  const { signOut, loading } = useSignOut();

  // Derive active label from current pathname
  const activeLabel =
    navigationItems.find((item) => pathname.endsWith(item.href))?.label || '';

  // Close mobile menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const { user } = useUserStore();
  const router = useRouter();
  return (
    <SectionDashboardLayout className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="w-full pl-0 md:pl-4 relative">
        {/* App Logo */}
        <div className="absolute top-0 left-0 z-10 h-full flex items-center">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Img src={LogoAgent.src} alt="Logo Agent" className="w-24 h-12" />
            </Link>
          </div>
        </div>

        {/* Header with Navigation */}
        <header className="bg-white ml-4 relative">
          <div className="container mx-auto flex justify-between items-center h-[70px]">
            {/* Mobile Menu Button - Empty space to maintain layout */}
            <div className="lg:hidden block w-6"></div>

            {/* Main Navigation - Desktop */}
            <nav className="hidden lg:flex flex-1 justify-center h-full">
              <div className="flex h-full">
                {navigationItems.map(
                  (item, index) =>
                    (item.label !== 'Quản lý chatbot' ||
                      (item.label === 'Quản lý chatbot' && user)) && (
                      <div key={index} className="relative">
                        <Link
                          href={item.href}
                          className={`px-3 md:px-5 flex items-center h-full text-[16px] md:text-[18px] font-medium border-b-2 border-b-transparent ${
                            item.label === activeLabel ||
                            (item.label === 'Trang chủ' && activeLabel === '')
                              ? 'text-foreground !border-b-purple-600 bg-purple-100'
                              : 'text-foreground hover:border-b-purple-600 hover:bg-purple-100'
                          }`}
                        >
                          {item.label}
                          {/* {item.label === activeLabel && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-7">
                              <Img
                                src={'/images/line_text_inactive.png'}
                                alt={`${item.label} image`}
                                className="w-24 h-12"
                              />
                            </div>
                          )} */}
                        </Link>
                      </div>
                    ),
                )}
              </div>
            </nav>
            {/* Mobile Menu - Slide down when open */}
            {mobileMenuOpen && (
              <div
                ref={mobileMenuRef}
                className="lg:hidden absolute top-[70px] left-0 right-0 bg-white z-20 border-t-2 border-border shadow-md"
              >
                {navigationItems.map(
                  (item, index) =>
                    (item.label !== 'Quản lý chatbot' ||
                      (item.label === 'Quản lý chatbot' && user)) && (
                      <div key={index}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ),
                )}
              </div>
            )}

            {/* Empty div for spacing on mobile */}
            <div className="lg:hidden flex-1"></div>

            {!user ? (
              <div className="flex items-center gap-2 md:gap-5">
                <Button
                  className="w-24 p-1 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
                  variant="default"
                  onClick={() => router.push(ROUTES.SIGNUP)}
                >
                  Đăng ký
                </Button>
                <Button
                  className="w-24 p-1 text-purple-600 bg-white rounded-md hover:bg-purple-100 transition disabled:opacity-50 border border-purple-600"
                  variant="outline"
                  onClick={() => router.push(ROUTES.SIGNIN)}
                >
                  Đăng nhập
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-5">
                {isMobile && (
                  <button
                    className="p-1 lg:hidden flex items-center"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                  >
                    <Img src={MenuIcon.src} alt="menu" className="w-6 h-6" />
                  </button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button aria-label="Account" className="p-1">
                      <Img
                        src={AccountCircleIcon.src}
                        alt="Account"
                        className="w-6 h-6"
                      />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      {user.fullname || user.username || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onSelect={() => router.push(ROUTES.PROFILE)}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => alert('Settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      disabled={loading}
                      onSelect={() => {
                        signOut();
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </header>
      </div>
    </SectionDashboardLayout>
  );
};

export default DashboardHeader;
