'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navbar() {

  const pathname = usePathname()

  if (pathname === "/test" || pathname.startsWith("/tests")) {
    return null
  }

  return (

    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-gray-700 hover:text-red-500 transition"
        >
          <span className="text-xl">🏠</span>
          <span className="hidden sm:block">Home</span>
        </Link>

        <div className="text-sm font-medium text-gray-500 hidden md:block">
          IELTS CDI Learning Platform
        </div>

        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50 transition"
          >
            Login
          </Link>

          <Link
            href="/login"
            className="text-sm px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </header>

  )
}