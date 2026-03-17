import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

  const url = request.nextUrl.clone()

  // faqat reading testlar uchun ishlaydi
  if (url.pathname.startsWith('/practice/reading/test')) {

    // TEST NUMBER olish
    const match = url.pathname.match(/test(\d+)/)
    const testNumber = match ? Number(match[1]) : 1

    // COOKIE dan plan olish (keyin backenddan ham qilamiz)
    const plan = request.cookies.get('plan')?.value || 'free'

    const limits: any = {
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