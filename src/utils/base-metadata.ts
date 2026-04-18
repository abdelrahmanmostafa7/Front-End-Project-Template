import type { Metadata } from 'next';

// import { logoMain } from "./images";

export const baseMetadata = (locale: string, overrideAttr?: Metadata) => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Template',
  description: 'Template',
  keywords: ['Template'],
  authors: [{ name: 'Template Team' }],
  openGraph: {
    type: 'website',
    locale: locale,
    alternateLocale: locale === 'en' ? 'ar' : 'en',
    siteName: 'Template',
    // images: [
    //   {
    //     url: logoMain.src,
    //     width: 1200
    //     height: 630,
    //   },
    // ],
  },
  twitter: {
    card: 'summary',
    title: 'Template',
    description: 'Template',
    // images: [logoMain.src],
  },
  alternates: {
    canonical: `/${locale}`,
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
  robots: {
    index: false,
    follow: false,
  },
  ...overrideAttr,
});
