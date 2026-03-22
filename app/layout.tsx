'use client'

import "./styles/ios.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useState } from "react"

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
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-800`}
      >
        <div className={`app-layout ${sidebarOpen ? "open" : "closed"}`}>

          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN */}
          <div className="main-area">

            {/* NAVBAR */}
            <Navbar toggle={() => setSidebarOpen(prev => !prev)} />

            {/* CONTENT */}
            <main className="content">
              {children}
            </main>

          </div>

        </div>
      </body>
      
    </html>
  )
}