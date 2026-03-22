'use client'

import { useState } from "react"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />

      <div
        className={`pt-16 h-[calc(100vh-64px)] grid transition-all duration-300 
       
      >
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className="overflow-auto">
          {children}
        </main>
      </div>
    </>
  )
}