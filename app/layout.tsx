import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mymed.health';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MedTracker by MyMed - Manage Complex Medical Care Simply & Safely',
    template: '%s | MedTracker by MyMed',
  },
  description: 'Keep all medical information organized in one place. Track appointments, manage documents, and never miss a test or follow-up. Designed for caregivers managing complex patients.',
  keywords: ['medical care management', 'patient care coordination', 'medical document organization', 'caregiver tools', 'medical calendar', 'healthcare management', 'patient records', 'medical reminders', 'care management software', 'family healthcare'],
  authors: [{ name: 'MedTracker by MyMed' }],
  creator: 'MedTracker by MyMed',
  publisher: 'MedTracker by MyMed',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'MedTracker by MyMed',
    title: 'MedTracker by MyMed - Manage Complex Medical Care Simply & Safely',
    description: 'Keep all medical information organized in one place. Track appointments, manage documents, and never miss a test or follow-up.',
    images: [
      {
        url: '/logo-vertical.png',
        width: 1200,
        height: 630,
        alt: 'MedTracker by MyMed - Medical Care Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedTracker by MyMed - Manage Complex Medical Care Simply & Safely',
    description: 'Keep all medical information organized in one place. Track appointments, manage documents, and never miss a test or follow-up.',
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
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'MedTracker by MyMed',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'theme-color': '#059669',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body style={{ margin: 0, padding: 0, minHeight: '100%', height: 'auto' }} suppressHydrationWarning>
          {children}
      </body>
    </html>
  );
}

