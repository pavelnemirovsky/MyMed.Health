'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { useTransition } from 'react';

const languageNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  ru: 'Русский',
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    
    startTransition(() => {
      // Get the current locale from params
      const currentLocale = (params?.locale as string) || locale;
      
      // Get the pathname without the locale prefix
      let pathWithoutLocale = pathname;
      if (pathname.startsWith(`/${currentLocale}/`)) {
        pathWithoutLocale = pathname.slice(`/${currentLocale}`.length);
      } else if (pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`) {
        pathWithoutLocale = '/';
      }
      
      // Ensure path starts with /
      if (!pathWithoutLocale.startsWith('/')) {
        pathWithoutLocale = '/' + pathWithoutLocale;
      }
      
      // Handle trailing slash based on next.config.js setting
      const trailingSlash = pathWithoutLocale === '/' ? '/' : pathWithoutLocale.endsWith('/') ? pathWithoutLocale : pathWithoutLocale + '/';
      
      // Build the new URL
      const newUrl = `/${newLocale}${trailingSlash}`;
      
      // Use router.push for smooth navigation without full page reload
      router.push(newUrl);
      router.refresh();
    });
  };

  return (
    <div className={className || 'language-switcher-container'} style={{ position: 'relative', display: 'inline-block', minWidth: '100px' }}>
      <select
        value={locale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        disabled={isPending}
        className="language-select"
        style={{
          opacity: isPending ? 0.6 : 1,
          cursor: isPending ? 'wait' : 'pointer',
        }}
        aria-label="Select language"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {languageNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}

