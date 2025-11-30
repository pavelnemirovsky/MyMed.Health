import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';
import authConfig from './config.js';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  // Always show the locale prefix
  localePrefix: 'always' as const,
});

export const routing = {
  locales,
  defaultLocale,
  // Always show the locale prefix
  localePrefix: 'always' as const,
};

function checkBasicAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  return username === authConfig.basicAuth.username && 
         password === authConfig.basicAuth.password;
}

export default function middleware(request: NextRequest) {
  // Check if basic auth is enabled
  if (authConfig.basicAuth.enabled) {
    // Check basic authentication first
    if (!checkBasicAuth(request)) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }

  // If authenticated (or auth disabled), proceed with internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all routes for basic auth
  // Excludes static files and Next.js internal routes
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (root files)
     * - Files with extensions (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};

