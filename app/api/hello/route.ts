// Next.js API Route - Hello endpoint
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  return Response.json({
    message: 'Hello from Next.js API route!',
    timestamp: new Date().toISOString(),
    status: 'success',
    data: {
      greeting: 'Hello World',
      version: '1.0.0',
    },
  });
}

