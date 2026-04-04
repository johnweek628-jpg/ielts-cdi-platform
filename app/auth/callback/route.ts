import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code       = requestUrl.searchParams.get("code")
  const next       = requestUrl.searchParams.get("next") ?? "/dashboard"
  const origin     = requestUrl.origin

  if (!code) {
    // No code at all — just redirect to login
    return NextResponse.redirect(new URL("/auth/login", origin))
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()              { return cookieStore.getAll() },
        setAll(cookiesToSet)  {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("Auth callback error:", error.message)
    return NextResponse.redirect(new URL("/auth/login?error=oauth_failed", origin))
  }

  // ✅ Detect password recovery vs normal sign-in
  // When user clicks a reset link, the session type is "recovery"
  if (data?.session?.user?.recovery_sent_at || 
      data?.user?.aud === "authenticated" && next === "/update-password") {
    return NextResponse.redirect(new URL("/update-password", origin))
  }

  return NextResponse.redirect(new URL(next, origin))
}
