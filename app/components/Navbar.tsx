'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Navbar() {

  const pathname = usePathname()

  // Test sahifalarda navbar ko‘rinmaydi
  if (pathname.startsWith("/practice/reading/test")) {
    return null
  }

  return (

    <div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">

      <Link href="/" className="flex items-center gap-2 text-gray-700 font-semibold">
        🏠 Home
      </Link>

      <h1 className="text-sm font-medium text-gray-600">
        IELTS CDI Learning Platform
      </h1>

      <div className="flex gap-3">

        <Link
          href="/login"
          className="px-4 py-2 text-sm border rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/login"
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg"
        >
          Sign Up
        </Link>

      </div>

    </div>

  )
}