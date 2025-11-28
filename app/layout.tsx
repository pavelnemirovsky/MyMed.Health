import type { Metadata } from 'next';
import './globals.css';
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mymed.health';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Help Your Parents Stay Safe - Stop Scams Now',
    template: '%s | Stop Scams Now',
  },
  description: 'Help your parents stay safe from scammers. Simple tools and guides to protect your parents from phone scams, SMS scams, and fraud. We take on the responsibility of keeping them safe.',
  keywords: ['help parents stay safe', 'protect parents from scams', 'parent scam protection', 'elderly scam prevention', 'protect mom from scams', 'protect dad from scams', 'phone scams parents', 'SMS scams elderly', 'scam protection for parents', 'fraud prevention parents'],
  authors: [{ name: 'Stop Scams Now' }],
  creator: 'Stop Scams Now',
  publisher: 'Stop Scams Now',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Stop Scams Now',
    title: 'Help Your Parents Stay Safe - Stop Scams Now',
    description: 'Help your parents stay safe from scammers. Simple tools and guides to protect your parents from phone scams, SMS scams, and fraud.',
    images: [
      {
        url: '/logo-vertical.png',
        width: 1200,
        height: 630,
        alt: 'Help Your Parents Stay Safe - Stop Scams Now',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Your Parents Stay Safe - Stop Scams Now',
    description: 'Help your parents stay safe from scammers. Simple tools to protect your parents from phone and SMS scams.',
    images: ['/logo-vertical.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo-vertical.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo-vertical.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/logo-vertical.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo-vertical.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Stop Scams Now',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'theme-color': '#dc2626',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ margin: 0, padding: 0, minHeight: '100%', height: 'auto' }}>
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}

