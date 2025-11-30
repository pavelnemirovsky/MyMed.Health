import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  // Check which providers have their environment variables configured
  const providers = {
    google: {
      enabled: !!(
        process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET &&
        process.env.GOOGLE_CLIENT_ID !== '' &&
        process.env.GOOGLE_CLIENT_SECRET !== ''
      ),
    },
    apple: {
      enabled: false, // Apple authentication is currently disabled
    },
  };

  return NextResponse.json(providers);
}

