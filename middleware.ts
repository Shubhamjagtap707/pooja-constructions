import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Check if we have a session
  const adminAuth = request.cookies.get("admin_auth")?.value

  // If the user is not authenticated and trying to access protected routes
  if (
    !adminAuth &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.includes("/admin/login")
  ) {
    const redirectUrl = new URL("/admin/login", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is authenticated and trying to access login page
  if (adminAuth && request.nextUrl.pathname.includes("/admin/login")) {
    const redirectUrl = new URL("/admin/dashboard", request.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
}

