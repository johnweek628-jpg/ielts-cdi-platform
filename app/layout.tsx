'use client'

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { usePathname } from "next/navigation"
import "./globals.css"
import Navbar from "./components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "IELTS CDI Platform",
  description: "IELTS Mock Test Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  // IELTS test sahifalarida navbar ko‘rinmaydi
  const hideNavbar =
    pathname.startsWith("/practice/reading/test")

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-800`}
      >

        {!hideNavbar && <Navbar />}

        {children}

      </body>
    </html>
  )
}