'use client'

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"
import { Menu } from "lucide-react"

export default function Navbar() {

  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [scrolled, setScrolled] = useState(false)

  /* 🔥 SIDEBAR */
  const [sidebarOpen, setSidebarOpen] = useState(true)

  /* 🍏 DARK MODE */
  const [darkMode, setDarkMode] = useState(true)

  /* ❗ LOGICGA TEGMADIM */
  const isTestPage = pathname.startsWith("/practice/reading/test/")
  const testNumber = pathname.match(/\d+/)?.[0]

  /* AUTO CLOSE (same logic) */
  useEffect(() => {
    if (isTestPage) {
      setSidebarOpen(false)
    }
  }, [isTestPage])

  /* THEME */
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "light") {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  /* USER */
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => setUser(session?.user ?? null)
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  /* SCROLL */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isHome = pathname === "/"
  const shouldShowSidebar = !isHome

  /* BODY SHIFT (same logic) */
  useEffect(() => {
    if (!shouldShowSidebar) return

    document.body.style.paddingLeft =
      sidebarOpen && !isTestPage ? "256px" : "0px"

    return () => {
      document.body.style.paddingLeft = "0px"
    }
  }, [sidebarOpen, shouldShowSidebar, isTestPage])

  return (
    <>
      {/* SIDEBAR */}
      {shouldShowSidebar && !isTestPage && (
        <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 bg-black/90 backdrop-blur-xl border-r border-white/10 p-4 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
          <div className="flex flex-col gap-3">

            {[
              ["Listening Tests", "/listening"],
              ["Reading Tests", "/practice/reading"],
              ["Writing Tests", "/writing"],
              ["Speaking Tests", "/speaking"],
              ["AI Writing Correction", "/ai-writing"],
              ["Results", "/results"],
              ["Telegram Channel", "https://t.me/jasurbeks_ielts"],
              ["Support", "/support"]
            ].map(([label, link]) => (

              <button
                key={label}
                onClick={() =>
                  link.startsWith("http")
                    ? window.open(link, "_blank")
                    : router.push(link)
                }
                className="w-full text-left px-4 py-3 rounded-xl text-white bg-white/5 hover:bg-white/10 transition"
              >
                {label}
              </button>

            ))}

          </div>
        </div>
      )}

      {/* NAVBAR */}
      <div className={`fixed top-0 h-16 z-50 px-6 flex justify-between items-center ${sidebarOpen && !isTestPage ? "left-64 w-[calc(100%-16rem)]" : "left-0 w-full"} bg-white dark:bg-black border-b`}>

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* SINGLE HAMBURGER */}
          {shouldShowSidebar && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 font-bold">
            <span>Home</span>
          </Link>

          {/* TEST NUMBER (TOP BAR) */}
          {isTestPage && (
            <span className="ml-2 text-sm font-semibold text-blue-500">
              Test {testNumber}
            </span>
          )}

          {/* DARK MODE */}
          <button
            onClick={() => {
              const newMode = !darkMode
              setDarkMode(newMode)

              if (newMode) {
                document.documentElement.classList.add("dark")
                localStorage.setItem("theme", "dark")
              } else {
                document.documentElement.classList.remove("dark")
                localStorage.setItem("theme", "light")
              }
            }}
            className={`w-12 h-6 rounded-full ${darkMode ? "bg-green-500" : "bg-gray-300"}`}
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* iOS STYLE BACK */}
          {isTestPage && (
            <button
              onClick={() => router.push("/practice/reading")}
              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm"
            >
              ← Back
            </button>
          )}

          {loading ? null : user ? (
            <>
              <button
                onClick={() => router.push("/pricing")}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl"
              >
                Upgrade
              </button>

              <div className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm">
                ✓ Signed In
              </div>

              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push("/")
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  )
}