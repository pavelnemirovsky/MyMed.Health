import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export const routing = {
  locales,
  defaultLocale,
  // Always show the locale prefix
  localePrefix: 'always',
  // Don't redirect to trailing slash
  localePrefixAsNeeded: false
};

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|es|it|de|en|ru)/:path*']
};

