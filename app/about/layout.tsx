import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Help Your Parents Stay Safe',
  description: 'Learn about Stop Scams Now and our mission to help your parents stay safe. We provide free protection guides, safety checklists, and tools to protect your parents from scammers before they reach them.',
  keywords: ['about stop scams now', 'help parents stay safe', 'protect parents from scams', 'parent scam protection mission', 'elderly fraud prevention', 'protect mom dad from scams'],
  openGraph: {
    title: 'About Us - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Learn about Stop Scams Now and our mission to help your parents stay safe from scammers.',
    type: 'website',
    images: [
      {
        url: '/logo-vertical.png',
        width: 1200,
        height: 630,
        alt: 'Help Your Parents Stay Safe - About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Help Your Parents Stay Safe | Stop Scams Now',
    description: 'Learn about Stop Scams Now and our mission to help your parents stay safe from scammers.',
    images: ['/logo-vertical.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

