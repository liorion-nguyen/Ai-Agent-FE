'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useIsMobile } from '@/shared/hooks/useMobile';
import SearchIcon from '@/public/icons/search-icon.svg';
import PageCorner from '@/public/icons/folded-page-corner.svg';
import Electric from '@/public/icons/electric-bulb-icon.svg';
import MenuIcon from '@/public/icons/menu-icon.svg';
import HeartIcon from '@/public/icons/heart-icon.svg';
import AccountCircleIcon from '@/public/icons/account-circle-icon.svg';
import CartIcon from '@/public/icons/cart-icon.svg';
import { navigationItems } from '@/shared/constants/navigation';
import MarqueeAnnouncement from './MarqueeAnnouncement';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';
import { useSignOut } from '@/app/[lang]/(user)/(auth)/hooks';

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

  const announcementBar = {
    shipping: '💙 Free international shipping.',
    learnMore: 'LEARN MORE',
    newProduct: 'New! Meet The Espadrille Mary Jane. 👟',
    shopNow: 'SHOP NOW',
    freeShipping: 'Free Shipping &',
  };

  return (
    <div className="pl-0 md:pl-4 bg-yellow-300 border-b-3 border-border relative">
      {/* Announcement Bar - Scrolling text */}
      <div className="w-full text-foreground py-2 pr-4 pl-16 justify-between items-center text-sm overflow-hidden">
        <MarqueeAnnouncement
          announcements={[
            {
              text: announcementBar.shipping,
              linkText: announcementBar.learnMore,
              linkHref: '#',
            },
            {
              text: announcementBar.newProduct,
              linkText: announcementBar.shopNow,
              linkHref: '#',
            },
            { text: announcementBar.freeShipping },
          ]}
        />
      </div>

      {/* App Logo */}
      <div className="absolute top-0 left-0 md:left-4 z-10 h-full flex items-center">
        <div className="relative h-full">
          <div className="h-full">
            <Image
              alt="page logo"
              src={PageCorner}
              width={226} // always use 226 for width on mobile as well
              style={{ height: '100%' }}
              className="h-full object-cover"
              priority
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              alt="electric logo"
              src={Electric}
              width={30}
              height={30}
              className="absolute top-0 right-10"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
              <Link href="/" className="block">
                <Image
                  src="/images/hint-club-logo.png"
                  alt="HINT CLUB"
                  width={130}
                  height={70}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header with Navigation */}
      <header className="bg-white border-t-3 ml-4 border-border relative">
        <div className="container mx-auto px-4 flex justify-between items-center h-[70px]">
          {/* Mobile Menu Button - Empty space to maintain layout */}
          <div className="lg:hidden block w-6"></div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center h-full">
            <div className="flex h-full">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative">
                  <Link
                    href={item.href}
                    className={`px-3 md:px-5 flex items-center h-full font-medium text-[18px] md:text-[22px] tracking-wider font-road ${
                      item.label === activeLabel
                        ? 'text-white border-l-[3px] border-r-[3px] border-solid border-border bg-active'
                        : 'text-foreground hover:text-hover hover:bg-blue-100'
                    }`}
                  >
                    {item.label}
                    {item.label === activeLabel && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 mt-7">
                        <Image
                          src={'/images/line_text_inactive.png'}
                          alt={`${item.label} image`}
                          width={100}
                          height={50}
                        />
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </nav>

          {/* Mobile Menu - Slide down when open */}
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="lg:hidden absolute top-[70px] left-0 right-0 bg-white z-20 border-t-2 border-border shadow-md"
            >
              {navigationItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 font-medium text-[18px] tracking-wider font-road ${
                      item.label === activeLabel
                        ? 'text-white bg-active'
                        : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Empty div for spacing on mobile */}
          <div className="lg:hidden flex-1"></div>

          {/* Icons */}
          <div className="flex items-center gap-2 md:gap-5">
            {isMobile && (
              <button
                className="p-1 lg:hidden flex items-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Image src={MenuIcon} width={24} height={24} alt="menu" />
              </button>
            )}
            <button aria-label="Search" className="p-1">
              <Image src={SearchIcon} alt="Search" width={24} height={24} />
            </button>
            <button aria-label="Wishlist" className="hidden sm:block p-1">
              <Image src={HeartIcon} alt="Wishlist" width={24} height={24} />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button aria-label="Account" className="p-1">
                  <Image
                    src={AccountCircleIcon}
                    alt="Account"
                    width={24}
                    height={24}
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => alert('Profile')}>
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
            <button aria-label="Cart" className="p-1 relative">
              <Image src={CartIcon} alt="Cart" width={24} height={24} />
              <span className="absolute -top-1 -right-1 bg-secondary text-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                1
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
