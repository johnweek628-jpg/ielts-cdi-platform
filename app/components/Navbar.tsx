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
  const [scrolled, setScrolled] = useState(false)

  /* 🔥 SIDEBAR STATE */
  const [sidebarOpen, setSidebarOpen] = useState(true)

  /* 🍏 DARK MODE */
  const [darkMode, setDarkMode] = useState(true)

  const menuRef = useRef<any>(null)

  /* ✅ LOAD SAVED THEME */
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

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /* LOGOUT */
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
  }

  /* ✅ FIXED NAVBAR HIDE */
  if (pathname.startsWith("/practice/reading/test/")) {
    return null
  }

  /* 🔥 MAIN DASHBOARDDA SIDEBAR YO‘Q */
  const isHome = pathname === "/"
  const shouldShowSidebar = !isHome

  /* 🔥 ACTIVE CHECK */
  const isActive = (link: string) => {
    if (link.startsWith("http")) return false
    if (link === "/practice/reading") {
      return pathname === "/practice/reading" || pathname.startsWith("/practice/reading/")
    }
    return pathname === link || pathname.startsWith(link + "/")
  }

  /* 🔥 BODY SYNC */
  useEffect(() => {
    if (!shouldShowSidebar) {
      document.body.style.paddingLeft = "0px"
      document.body.style.transition = "padding-left 300ms ease-in-out"
      return
    }

    document.body.style.paddingLeft = sidebarOpen ? "256px" : "0px"
    document.body.style.transition = "padding-left 300ms ease-in-out"

    return () => {
      document.body.style.paddingLeft = "0px"
    }
  }, [sidebarOpen, shouldShowSidebar])

  return (
    <>
      {/* 🍏 SIDEBAR */}
      {shouldShowSidebar && (
        <div
          className={`
            fixed top-16 left-0 h-[calc(100vh-4rem)] z-40
            bg-black/90 backdrop-blur-xl
            border-r border-white/10
            p-4
            transition-all duration-300 ease-in-out
            overflow-hidden
            ${sidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0 p-0 border-r-0"}
          `}
        >
          <div
            className={`
              flex flex-col gap-3 transition-opacity duration-200
              ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
          >
            {[
              ["Listening Tests", "/listening"],
              ["Reading Tests", "/practice/reading"],
              ["Writing Tests", "/writing"],
              ["Speaking Tests", "/speaking"],
              ["AI Writing Correction", "/ai-writing"], // ✅ FIXED
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
                    w-full text-left px-4 py-3 rounded-xl
                    text-white font-medium
                    bg-white/5 backdrop-blur-md
                    border border-white/10
                    transition-all duration-150
                    hover:bg-white/10 hover:scale-[1.02]
                    active:scale-95
                    ${active ? "bg-white/20 border-white/30 shadow-md" : ""}
                  `}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 🔥 FLOATING BUTTON */}
      {shouldShowSidebar && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            fixed top-24 left-2 z-50
            p-2 rounded-xl
            bg-white/90 backdrop-blur-md
            border border-gray-200
            shadow-lg
            hover:scale-110 active:scale-95
            transition-all
          "
        >
          <Menu size={20} className="text-gray-800" />
        </button>
      )}

      {/* 🔥 NAVBAR */}
      <div
        className={`
          fixed top-0 h-16 z-50 px-6 flex justify-between items-center
          transition-all duration-300
          ${shouldShowSidebar && sidebarOpen ? "left-64 w-[calc(100%-16rem)]" : "left-0 w-full"}
          ${scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-gray-300 shadow-md"
            : "bg-white/70 backdrop-blur-xl border-b border-gray-200"}
        `}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {shouldShowSidebar && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
                p-2 rounded-xl
                bg-white/70 backdrop-blur-md
                border border-gray-200
                shadow-sm
                transition-all duration-150
                active:scale-90 active:shadow-inner
                hover:scale-105
              "
            >
              <Menu size={22} className="text-gray-800" strokeWidth={2.2} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 font-extrabold text-black">
            <img src="/home.png" className="w-6 h-6" />
            <span>Home</span>
          </Link>

          {/* 🌗 TOGGLE FIXED */}
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs text-gray-500">🌙</span>
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
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-all ${
                darkMode ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                  darkMode ? "translate-x-5" : ""
                }`}
              />
            </button>
            <span className="text-xs text-gray-500">☀️</span>
          </div>
        </div>

        {/* CENTER */}
        <h1 className="text-sm font-semibold text-gray-900">
          IELTS CDI Platform
        </h1>

        {/* RIGHT */}
        <div>
          {loading ? null : user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/pricing")}
                className="px-4 py-2 text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-sm border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95"
              >
                💎 Upgrade
              </button>

              <div className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm">
                ✓ Signed In
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 active:scale-95"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="px-5 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </>
  )
}