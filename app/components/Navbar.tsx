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

  const [menuOpen, setMenuOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  useEffect(() => {
  if (/^\/practice\/reading\/test\/\d+$/.test(pathname)) {
    setSidebarOpen(false)
  }
}, [pathname])
  const [darkMode, setDarkMode] = useState(true)

  const menuRef = useRef<any>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  if (/^\/practice\/reading\/test\/\d+$/.test(pathname)) {
    return null
  }

  const isHome = pathname === "/"
  const testMatch = pathname.match(/\/practice\/reading\/test\/(\d+)/)
const testNumber = testMatch ? testMatch[1] : null
  const shouldShowSidebar = !isHome

  const isActive = (link: string) => {
    if (link.startsWith("http")) return false
    if (link === "/practice/reading") {
      return pathname === "/practice/reading" || pathname.startsWith("/practice/reading/")
    }
    return pathname === link || pathname.startsWith(link + "/")
  }

 useEffect(() => {
  const isTest = /^\/practice\/reading\/test\/\d+$/.test(pathname)

  if (!shouldShowSidebar || isTest) {
    document.body.style.paddingLeft = "0px"
    return
  }

  document.body.style.paddingLeft = sidebarOpen ? "256px" : "0px"

  return () => {
    document.body.style.paddingLeft = "0px"
  }
}, [sidebarOpen, shouldShowSidebar, pathname])

  return (
    <>
      {/* 🍏 SIDEBAR */}
      {shouldShowSidebar && (
        <div
          className={`
            fixed top-16 left-0 h-[calc(100vh-4rem)] z-40
            bg-black/80 backdrop-blur-2xl
            border-r border-white/10
            p-4 transition-all duration-300
            ${sidebarOpen ? "w-64" : "w-0 p-0 border-none"}
          `}
        >
          <div className={`${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"} flex flex-col gap-3`}>

            {[
              ["Listening Tests", "/listening"],
              ["Reading Tests", "/practice/reading"],
              ["Writing Tests", "/writing"],
              ["Speaking Tests", "/speaking"],
              ["AI Writing Correction", "/ai-writing"],
              ["Results", "/results"],
              ["Telegram Channel", "https://t.me/jasurbeks_ielts"],
              ["Support", "/support"]
            ].map(([label, link]) => {

              const active = isActive(link)

              return (
                <button
                  key={label}
                  onClick={() =>
                    link.startsWith("http")
                      ? window.open(link, "_blank")
                      : router.push(link)
                  }
                  className={`
                    ios-btn w-full text-left text-white
                    ${active ? "bg-white/20 border-white/30" : ""}
                  `}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}



      {/* 🔥 NAVBAR */}
      <div
        className={`
          fixed top-0 h-16 z-50 px-6 flex justify-between items-center
          ${shouldShowSidebar && sidebarOpen ? "left-64 w-[calc(100%-16rem)]" : "w-full"}
          ${scrolled
  ? "bg-[#EAF3FF]/80 backdrop-blur-2xl border-b border-blue-200"
  : "bg-[#EAF3FF]/60 backdrop-blur-xl border-b border-blue-100"}
        `}
      >

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {shouldShowSidebar && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="ios-btn p-2"
            >
              <Menu size={22} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 font-semibold text-black">
            <img src="/home.png" className="w-6 h-6" />
            <span>Home</span>
          </Link>

          {/* 🍏 SWITCH */}
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs">🌙</span>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`
                w-12 h-7 flex items-center rounded-full p-1
                backdrop-blur-xl border border-white/20
                ${darkMode ? "bg-green-500/80" : "bg-white/20"}
              `}
            >
              <div
                className={`
                  w-5 h-5 bg-white rounded-full
                  transition-all
                  ${darkMode ? "translate-x-5" : ""}
                `}
              />
            </button>

            <span className="text-xs">☀️</span>
          </div>

        </div>

        {/* CENTER */}
        <h1 className="text-sm font-medium text-gray-900">
  {testNumber ? `Reading Test ${testNumber}` : "IELTS CDI Platform"}
</h1>

        {/* RIGHT */}
        {testNumber && (
  <button
    onClick={() => router.push("/practice/reading")}
    className="ios-btn text-gray-700 bg-white/40 border-gray-300/40"
  >
    ← Back
  </button>
)}
        <div>
  {loading ? null : user ? (
    <div className="flex items-center gap-3 flex-nowrap">

      <button
        onClick={() => router.push("/pricing")}
        className="ios-btn shrink-0 text-blue-700 bg-blue-500/20 border-blue-300/40"
      >
        💎 Upgrade
      </button>

      <div className="ios-btn shrink-0 text-green-700 bg-green-500/15 border-green-300/40">
        ✓ Signed In
      </div>

      <button
        onClick={logout}
        className="ios-btn shrink-0 text-red-600 bg-red-500/15 border-red-300/40"
      >
        Logout
      </button>

    </div>
  ) : (
    <button
      onClick={() => router.push("/auth/login")}
      className="ios-btn text-blue-700 bg-blue-500/20 border-blue-300/40"
    >
      Sign In
    </button>
  )}
</div>

      </div>
    </>
  )
}