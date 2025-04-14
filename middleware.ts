// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the path the user is trying to access
  const path = request.nextUrl.pathname
  
  // Get the authentication token from cookies
  const authToken = request.cookies.get('better-auth.session_token')?.value
  
  // Define public paths that don't require authentication
  const publicPaths = ['/signin', '/signup', '/forgot-password', '/reset-password', '/email-verified', '/api/auth']
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(`${publicPath}/`)
  )
  
  // If user is accessing a protected route without a token, redirect to login
  if (!isPublicPath && !authToken) {
    // Store the original URL they were trying to access for redirecting after login
    const url = new URL('/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    
    return NextResponse.redirect(url)
  }
  
  // If user is accessing login page but already has a token, redirect to home
  if (path === '/signin' && authToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Allow the request to proceed
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  // Apply to all paths except for public assets
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}