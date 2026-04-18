import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth } from './lib/authentication/auth';

const publicPages = ['/login', '/images', '/favicon.ico', '/forgot-password', '/reset-password'];

export default async function middleware(req: NextRequest) {
  // Skip for specific paths
  if (req.nextUrl.pathname.includes('/api/auth') || req.nextUrl.pathname.includes('/_next')) {
    return NextResponse.next();
  }

  // Step 1: Handle locale determination
  const pathname = req.nextUrl.pathname;
  const pathnameHasLocale = /^\/(?:ar|en)(?:\/|$)/.test(pathname);

  // Redirect to default locale if no locale in pathname
  if (!pathnameHasLocale) {
    const defaultLocale = 'ar'; // Default locale
    const newUrl = new URL(`/${defaultLocale}${pathname}`, req.url);

    newUrl.search = req.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  // Extract locale from pathname
  const locale = pathname.split('/')[1];

  // Step 2: Check authentication
  const session = await auth();
  const isPublicPage = publicPages.some((page) => pathname.includes(page));

  if (!session?.user && !isPublicPage) {
    // Redirect to login page with the current locale
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (session?.user && isPublicPage) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  if (session?.user && pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
