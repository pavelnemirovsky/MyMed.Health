# Stop Scams Now

A modern web application built with Next.js, optimized for Cloudflare Pages with static site generation and backend API support.

## Features

- ⚡ **Static Site Generation** - Fast, SEO-friendly pages
- 🚀 **Cloudflare Pages** - Global CDN and edge deployment
- 🔧 **Backend API** - Cloudflare Functions for serverless backend
- 📱 **SEO Optimized** - Built-in metadata and Open Graph support
- 🎨 **TypeScript** - Type-safe development
- ⚛️ **Next.js App Router** - Modern React framework

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# Preview Cloudflare Pages build locally
npm run preview
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── functions/
│   └── api/
│       ├── hello.ts      # Hello API (Cloudflare Function)
│       └── data.ts       # Data API (Cloudflare Function)
├── next.config.js       # Next.js configuration (static export)
├── wrangler.toml        # Cloudflare Pages configuration
└── package.json
```

## Deployment to Cloudflare Pages

### Option 1: Using Cloudflare Dashboard (Recommended)

1. Push your code to GitHub/GitLab
2. Go to Cloudflare Dashboard → Pages
3. Connect your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node version**: `18` or higher

### Option 2: Using Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build
wrangler pages deploy out
```

## Backend API

This project uses **Cloudflare Pages Functions** located in `functions/api/`. These are serverless functions that run on Cloudflare's edge network.

**Example**: `functions/api/data.ts`

```typescript
export async function onRequest({ request }: { request: Request }) {
  const data = {
    message: 'Data from Cloudflare Pages Function',
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
```

Functions are automatically deployed with your static site when you deploy to Cloudflare Pages.

Access your APIs at: `https://yourdomain.com/api/[route-name]`

## SEO Optimization

Each page includes metadata for SEO:

- Title and description
- Open Graph tags
- Robots directives
- Structured data ready

Example in `app/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Home - Stop Scams Now',
  description: 'Welcome to Stop Scams Now...',
  openGraph: {
    title: 'Stop Scams Now',
    description: 'Protect yourself from online scams',
  },
};
```

## Configuration

### Next.js Config (`next.config.js`)

- Static export enabled for Cloudflare Pages
- Trailing slashes for better routing
- Images unoptimized (required for static export)

### Cloudflare Config (`wrangler.toml`)

Configure your domain and routes here.

## Development Tips

1. **Local Development**: Use `npm run dev` for Next.js dev server
2. **Cloudflare Preview**: Use `npm run preview` to test Cloudflare Pages build locally
3. **API Testing**: Test Cloudflare Functions locally with `wrangler pages dev`

## Why Next.js for Cloudflare Pages?

- ✅ **Static Site Generation** - Perfect for SEO and performance
- ✅ **Cloudflare Functions** - Serverless backend API endpoints
- ✅ **Built-in SEO** - Metadata API for easy optimization
- ✅ **Full Page Reloads** - Traditional navigation for maximum SEO
- ✅ **Type Safety** - TypeScript support out of the box
- ✅ **Developer Experience** - Hot reload, great tooling

## Important Notes

⚠️ **Static Export Trade-offs:**
- Uses `output: 'export'` for pure static HTML files
- Navigation uses full page reloads (not SPA routing)
- Maximum SEO compatibility - all content in initial HTML
- Backend handled via Cloudflare Pages Functions (not Next.js API routes)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)

## License

MIT


## Notes
 - Let us help you to care about your parents;
