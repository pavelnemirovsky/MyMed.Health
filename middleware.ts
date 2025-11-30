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
  const pathname = request.nextUrl.pathname;
  
  // Skip locale routing for API routes - they should always be at /api/...
  if (pathname.startsWith('/api/')) {
    // Check if basic auth is enabled for API routes
    if (authConfig.basicAuth.enabled) {
      if (!checkBasicAuth(request)) {
        return new NextResponse('Authentication required', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
          },
        });
      }
    }
    // Return early for API routes - don't apply locale routing
    return NextResponse.next();
  }

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
  // Match all routes for basic auth and locale routing
  // Excludes static files, Next.js internal routes, and API routes from locale routing
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (root files)
     * - Files with extensions (images, fonts, etc.)
     * Note: API routes are matched but handled separately in middleware
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};

