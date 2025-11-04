import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stop Scams Now - Protect Your Family in 5 Minutes',
  description: 'Simple tools anyone can use in less than 5 minutes to protect your family and friends from phone and SMS scams. Join us in fighting the $1 trillion global scam problem.',
  keywords: ['scam prevention', 'phone scams', 'SMS scams', 'protect family', 'scam protection', 'fraud prevention', 'telephone scams', 'text scams'],
  openGraph: {
    title: 'Stop Scams Now - Protect Your Family in 5 Minutes',
    description: 'Simple tools to protect your family from scams. Fight back against the $1 trillion global scam epidemic.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Scams Now - Protect Your Family in 5 Minutes',
    description: 'Simple tools to protect your family from phone and SMS scams.',
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
        {children}
      </body>
    </html>
  );
}

