'use client'

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"
import { Menu } from "lucide-react"

type Props = {
  toggleSidebar?: () => void
}

export default function Navbar({ toggleSidebar }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [menuOpen, setMenuOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const menuRef = useRef<any>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  // 🔥 ORIGIN POSITION
  const [origin, setOrigin] = useState({ x: 40, y: 40 })

  // THEME LOAD
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // APPLY THEME
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // USER
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

  // SCROLL
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!menuRef.current) return

      const isInsideMenu = menuRef.current.contains(e.target)
      const isMenuButton = (e.target as HTMLElement).closest(".menu-btn")

      if (isInsideMenu || isMenuButton) return

      setMenuOpen(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
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

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`
          fixed inset-0 z-30
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? "opacity-100 backdrop-blur-xl bg-black/40" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* MENU */}
      <div
        ref={menuRef}
        style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}
        className={`
          fixed top-16 left-0 w-full z-40 px-6 py-6
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 -translate-y-10 pointer-events-none"}
        `}
      >
        <div className="rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            + {/* Practice Tests */}
 <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
  Practice Tests
 </p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
   {[
     ["🎧", "Listening", "/practice/listening"],
     ["📖", "Reading",   "/practice/reading"],
     ["✍️", "Writing",   "/practice/writing"],
     ["🎤", "Speaking",  "/practice/speaking"],
   ].map(([icon, label, link]) => (
     <button key={label} onClick={() => { setMenuOpen(false); router.push(link) }}
       className={`ios-btn text-left text-white w-full flex items-center gap-2
         ${isActive(link) ? "bg-white/20 border-white/30" : ""}`}>
       <span>{icon}</span>
       <span>{label}</span>
     </button>
  ))}
 </div>
 
 {/* Tools */}
 <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
   Tools & Results
 </p>
 <div className="grid grid-cols-2 gap-3 mb-4">
  {[
     ["🤖", "AI Writing Correction", "/ai-writing"],
     ["📊", "Results",              "/results"],
   ].map(([icon, label, link]) => (
     <button key={label} onClick={() => { setMenuOpen(false); router.push(link) }}
       className={`ios-btn text-left text-white w-full flex items-center gap-2
         ${isActive(link) ? "bg-white/20 border-white/30" : ""}`}>
       <span>{icon}</span>
       <span>{label}</span>
     </button>
   ))}
 </div>
 
 {/* Secondary */}
 <div className="flex gap-3 border-t border-white/10 pt-4">
   <button onClick={() => { setMenuOpen(false); window.open("https://t.me/jasurbeks_ielts","_blank") }}
     className="ios-btn text-white/60 text-sm flex items-center gap-2">
     ✈️ Telegram
   </button>
   <button onClick={() => { setMenuOpen(false); router.push("/support") }}
     className="ios-btn text-white/60 text-sm flex items-center gap-2">
     💬 Support
   </button>
+ </div>

          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div
        className={`
          fixed top-0 h-16 z-50 px-6 flex justify-between items-center
          transition-all duration-300
          left-0 w-full
          ${scrolled
            ? "bg-[#EAF3FF]/80 backdrop-blur-2xl border-b border-blue-200"
            : "bg-[#EAF3FF]/60 backdrop-blur-xl border-b border-blue-100"}
        `}
      >

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {shouldShowSidebar && (
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()

                const rect = buttonRef.current?.getBoundingClientRect()
                if (rect) {
                  setOrigin({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                  })
                }

                setMenuOpen(prev => !prev)
              }}
              className="ios-btn p-2 menu-btn"
            >
              <Menu size={22} />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2 font-semibold text-black">
            <img src="/home.png" className="w-6 h-6" />
            <span>Home</span>
          </Link>

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