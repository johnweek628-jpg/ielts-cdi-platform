import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

  const subscription =
    request.cookies.get("subscription")?.value || "free"

  const url = request.nextUrl.pathname

  // test raqamini olish
  const match = url.match(/test(\d+)/)
  const testNumber = match ? parseInt(match[1]) : 1

  let maxTests = 2 // free

  if(subscription === "basic") maxTests = 10
  if(subscription === "premium") maxTests = 25
  if(subscription === "ultimate") maxTests = 9999

  if(testNumber > maxTests){
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/practice/reading/test:slug*"]
}