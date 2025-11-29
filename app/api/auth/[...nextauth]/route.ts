import { handlers } from "@/app/auth-config"
import { NextRequest } from "next/server"

// Wrap handlers to add cache control headers
const wrappedHandlers = {
    GET: async (request: NextRequest) => {
        const response = await handlers.GET(request)

        // Create a new response with cache control headers
        // Edge runtime doesn't allow modifying headers on existing responses
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        newHeaders.set('Pragma', 'no-cache')
        newHeaders.set('Expires', '0')
        newHeaders.set('Surrogate-Control', 'no-store')

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        })
    },
    POST: async (request: NextRequest) => {
        const response = await handlers.POST(request)

        // Create a new response with cache control headers
        // Edge runtime doesn't allow modifying headers on existing responses
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        newHeaders.set('Pragma', 'no-cache')
        newHeaders.set('Expires', '0')
        newHeaders.set('Surrogate-Control', 'no-store')

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        })
    }
}

export const { GET, POST } = wrappedHandlers
export const runtime = 'edge';
