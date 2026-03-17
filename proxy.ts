import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ MUHIM: named export "proxy"
export function proxy(request: NextRequest) {

  console.log("🔥 PROXY WORKING:", request.nextUrl.pathname)

  const url = request.nextUrl.clone()

  if (url.pathname.startsWith('/practice/reading/test')) {

    const match = url.pathname.match(/test(\d+)/)
    const testNumber = match ? Number(match[1]) : 1

    const plan = request.cookies.get('plan')?.value || 'free'

    const limits: Record<string, number> = {
      free: 2,
      basic: 10,
      premium: 25,
      ultimate: Infinity
    }

    if (testNumber > limits[plan]) {
      return NextResponse.redirect(new URL('/pricing', request.url))
    }
  }

  return NextResponse.next()
}