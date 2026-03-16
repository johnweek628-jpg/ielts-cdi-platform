import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

  const subscription =
    request.cookies.get("subscription")?.value || "free"

  const url = request.nextUrl.pathname

  if(
    url.startsWith("/practice/reading/test3") ||
    url.startsWith("/practice/reading/test4")
  ){

    if(subscription !== "premium" && subscription !== "ultimate"){
      return NextResponse.redirect(new URL("/pricing", request.url))
    }

  }

  return NextResponse.next()

}

export const config = {
  matcher: [
    "/practice/reading/test3/:path*",
    "/practice/reading/test4/:path*"
  ]
}