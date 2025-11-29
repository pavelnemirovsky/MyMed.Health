# NextAuth.js Setup Guide

This guide will help you set up Google OAuth authentication using NextAuth.js for MedTracker by MyMed.

## Environment Variables

You need to set the following environment variables:

### Local Development (.env.local)

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here-generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=97284588200-gi7nuf3mordd1mg821pc9fvlqdftfq1k.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

### Production (Cloudflare Pages)

Set these as environment variables in your Cloudflare Pages dashboard:

1. Go to your Cloudflare Pages project
2. Navigate to Settings > Environment Variables
3. Add the following variables:

- `NEXTAUTH_URL` = `https://mymed.health`
- `NEXTAUTH_SECRET` = (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` = `97284588200-gi7nuf3mordd1mg821pc9fvlqdftfq1k.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET` = `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`

Or use Wrangler CLI:

```bash
wrangler secret put NEXTAUTH_URL
wrangler secret put NEXTAUTH_SECRET
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## Google OAuth Configuration

The Google OAuth credentials are already configured with:
- **Authorized redirect URIs:**
  - `https://mymed.health/api/auth/callback/google`
  - `http://localhost:3000/api/auth/callback/google`
- **Authorized JavaScript origins:**
  - `https://mymed.health`
  - `http://localhost:3000`

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login`
3. Accept Terms of Service and Privacy Policy
4. Click "Continue with Google"
5. You should be redirected to Google's OAuth consent screen
6. After authentication, you'll be redirected to `/dashboard`

## Troubleshooting

### Common Issues

1. **"NEXTAUTH_SECRET is missing"**
   - Make sure you've set the `NEXTAUTH_SECRET` environment variable
   - Generate a new secret using `openssl rand -base64 32`

2. **"Redirect URI mismatch"**
   - Verify that your redirect URI matches exactly what's configured in Google Cloud Console
   - For local dev: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://mymed.health/api/auth/callback/google`

3. **"Invalid client secret"**
   - Double-check that `GOOGLE_CLIENT_SECRET` matches your Google Cloud Console credentials
   - Make sure there are no extra spaces or quotes

## Next Steps

- Implement user session management
- Create dashboard page (`/app/dashboard/page.tsx`)
- Add user profile management
- Implement logout functionality


