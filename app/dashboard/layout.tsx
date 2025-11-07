import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protection Dashboard - Help Your Parents Stay Safe',
  description: 'Set up protection for your parents. Use our free protection guides, security checklists, and device setup tools to help your parents stay safe from scammers.',
  keywords: ['protection dashboard parents', 'help parents stay safe', 'parent scam protection setup', 'protect mom dad from scams', 'elderly device security checklist', 'parent scam prevention tools', 'help parents avoid scams'],
  openGraph: {
    title: 'Protection Dashboard - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Set up protection for your parents. Use our free protection guides and security checklists to help your parents stay safe.',
    type: 'website',
    images: [
      {
        url: '/logo-vertical.png',
        width: 1200,
        height: 630,
        alt: 'Protection Dashboard - Help Your Parents Stay Safe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protection Dashboard - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Set up protection for your parents. Use our free protection guides and security checklists to help your parents stay safe.',
    images: ['/logo-vertical.png'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

