import { NextResponse } from 'next/server';

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
      enabled: !!(
        process.env.APPLE_ID &&
        process.env.APPLE_SECRET &&
        process.env.APPLE_ID !== '' &&
        process.env.APPLE_SECRET !== ''
      ),
    },
  };

  return NextResponse.json(providers);
}

