export const runtime = 'edge';
export const dynamic = 'force-static';

import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>404 - Page Not Found</h1>
          <p style={{ fontSize: '1rem', color: '#666', marginBottom: '2rem' }}>
            The page you are looking for does not exist.
          </p>
          <Link
            href="/"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#059669',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 600
            }}
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}

