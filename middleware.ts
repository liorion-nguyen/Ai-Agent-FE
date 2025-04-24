import { NextResponse } from 'next/server';
import i18nextConfig from '@/i18next.config';
import type { NextRequest } from 'next/server';
import { ADMIN_ROUTES } from '@/shared/constants';

const ADMIN_SUBDOMAIN = process.env.NEXT_PUBLIC_ADMIN_SUBDOMAIN;
const DEFAULT_LOCALE = i18nextConfig.defaultLocale;
const SUPPORTED_LOCALES = i18nextConfig.locales;

function getLocaleFromPath(pathname: string): string | null {
  const parts = pathname.split('/');
  return SUPPORTED_LOCALES.includes(parts[1]) ? parts[1] : null;
}

function isMissingLocale(pathname: string): boolean {
  return SUPPORTED_LOCALES.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
}

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  const localeFromPath = getLocaleFromPath(pathname);
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const activeLocale = localeFromPath || localeCookie || DEFAULT_LOCALE;

  if (isMissingLocale(pathname)) {
    const redirectUrl = new URL(`/${activeLocale}${pathname}`, origin);
    return NextResponse.redirect(redirectUrl);
  }

  const isAdminSubdomain = hostname.startsWith(`${ADMIN_SUBDOMAIN}.`);
  const isAdminPath = pathname.includes(`/${ADMIN_SUBDOMAIN}`);

  if (isAdminSubdomain || isAdminPath) {
    const expectedAdminPrefix = `/${activeLocale}/${ADMIN_SUBDOMAIN}`;
    const isAtLocaleRoot = pathname === `/${activeLocale}`;

    const buildAdminPath = () =>
      `${expectedAdminPrefix}${pathname
        .slice(activeLocale.length + 1)
        .replace(/^\/?admin/, '')}`;

    const url = request.nextUrl.clone();

    if (!pathname.startsWith(expectedAdminPrefix)) {
      if (isAtLocaleRoot) {
        url.pathname = `${expectedAdminPrefix}/${ADMIN_ROUTES.DASHBOARD}`;
        return NextResponse.redirect(url);
      }

      url.pathname = buildAdminPath();
      return NextResponse.rewrite(url);
    }

    url.pathname = buildAdminPath().replace(/\/admin/, '');
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
