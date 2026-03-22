'use client'

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideNavbar = pathname.includes("/practice")

  return (
    <div className="h-screen w-full overflow-hidden">
      {!hideNavbar && <Navbar />}

      <main
        className={
          "overflow-auto w-full " +
          (!hideNavbar ? "pt-16 h-[calc(100vh-64px)]" : "h-full")
        }
      >
        {children}
      </main>
    </div>
  )
}