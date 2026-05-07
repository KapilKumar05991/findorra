import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const PUBLIC_ROUTES = ["/", "/:city", "/:city/:slug", "/:city/:slug/:id", "/about", "/contact"]
const AUTH_ROUTES = ["/login","/verify", "/register", "/forgot-password", "/reset-password"]

export const proxy = auth((request) => {
  const path = request.nextUrl.pathname
  const auth = request.auth

  const isApiRoute = path.startsWith('/api')
  const isApiAuthRoute = path.startsWith('/api/auth')
  const isAuthRoute = AUTH_ROUTES.includes(path)
  const isPublicRoute = PUBLIC_ROUTES.includes(path)

  console.log("path", path)
  console.log("auth", auth)
  console.log("isApiRoute", isApiRoute)
  console.log("isApiAuthRoute", isApiAuthRoute)
  console.log("isAuthRoute", isAuthRoute)
  console.log("isPublicRoute", isPublicRoute)

  if (isApiAuthRoute) {
    return null
  }

  if (isApiRoute) {
    // TODO: PROTECT NEXT API ROUTES
    return null
  }

  if (isAuthRoute && auth) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  } else if (isAuthRoute && !auth) {
    return null
  }

  if (!isPublicRoute && !auth) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return null
})

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}