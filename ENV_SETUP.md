# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32

# Google OAuth Credentials
GOOGLE_CLIENT_ID=97284588200-gi7nuf3mordd1mg821pc9fvlqdftfq1k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

## Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

## Important Notes

1. **NEXTAUTH_URL** must match your application URL:
   - Development: `http://localhost:3000`
   - Production: `https://mymed.health`

2. **NEXTAUTH_SECRET** is required for JWT token encryption. Without it, NextAuth will fail.

3. Make sure `.env.local` is in your `.gitignore` file (it should be by default in Next.js).

4. For production on Cloudflare Pages, set these as environment variables in the dashboard or use `wrangler secret put`.

## Troubleshooting

If you see "Unexpected end of JSON input" error:
1. Make sure `NEXTAUTH_SECRET` is set
2. Make sure `NEXTAUTH_URL` matches your current URL
3. Restart your development server after adding environment variables
4. Check browser console for more detailed error messages


