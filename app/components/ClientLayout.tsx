'use client'

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const hideNavbar = pathname.includes("/practice")

  return (
    <div className="min-h-screen w-full bg-gray-100">

      {!hideNavbar && <Navbar />}

      <main
        className={
          "w-full will-change-transform " +
          "transition-[padding] duration-300 ease-out " +
          "overflow-y-auto overflow-x-hidden " +
          (!hideNavbar
            ? "pt-16 min-h-[calc(100vh-64px)]"
            : "min-h-screen")
        }
      >
        {children}
      </main>

    </div>
  )
}