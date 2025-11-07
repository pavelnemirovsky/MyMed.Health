import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report a Scam - Help Your Parents Stay Safe',
  description: 'Report scams to help protect your parents and others. Report phone scams, SMS scams, email scams targeting parents and elderly. Your information will be kept confidential.',
  keywords: ['report scam', 'report scam targeting parents', 'report phone scam', 'report text scam elderly', 'report fraud parents', 'scam victim help', 'report parent scam'],
  openGraph: {
    title: 'Report a Scam - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Report scams to help protect your parents and others. Your information will be kept confidential.',
    type: 'website',
    images: [
      {
        url: '/logo-vertical.png',
        width: 1200,
        height: 630,
        alt: 'Report a Scam - Help Your Parents Stay Safe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Report a Scam - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Report scams to help protect your parents and others. Your information will be kept confidential.',
    images: ['/logo-vertical.png'],
  },
};

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

