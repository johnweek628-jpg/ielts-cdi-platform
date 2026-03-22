'use client'

import { useState } from "react"
import Navbar from "./Navbar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen w-full">

      {/* LAYOUT */}
      <div className="flex">

        {/* MAIN */}
        <main
          className={`
            transition-all duration-300 ease-in-out w-full pt-16
            ${sidebarOpen ? "ml-64" : "ml-0"}
          `}
        >
          {children}
        </main>

      </div>
    </div>
  )
}