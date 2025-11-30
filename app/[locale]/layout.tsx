import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Providers from '../providers';
import LocaleHtmlUpdater from './components/LocaleHtmlUpdater';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <Providers>
      <NextIntlClientProvider messages={messages}>
        <LocaleHtmlUpdater locale={locale} />
        {children}
      </NextIntlClientProvider>
    </Providers>
  );
}

