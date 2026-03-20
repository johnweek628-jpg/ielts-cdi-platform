'use client'

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"
import { Menu } from "lucide-react"

export default function Navbar() {

const pathname = usePathname()
const router = useRouter()

const [user,setUser] = useState<any>(null)
const [loading,setLoading] = useState(true)

const [menuOpen,setMenuOpen] = useState(false)
const [confirm,setConfirm] = useState(false)
const [scrolled,setScrolled] = useState(false)

/* 🔥 SIDEBAR STATE */
const [sidebarOpen,setSidebarOpen] = useState(true)

/* 🍏 DARK MODE */
const [darkMode,setDarkMode] = useState(true)

const menuRef = useRef<any>(null)

/* DARK MODE */
useEffect(()=>{
if(darkMode){
document.documentElement.classList.add("dark")
}else{
document.documentElement.classList.remove("dark")
}
},[darkMode])

/* USER */
useEffect(()=>{
const getUser = async () => {
const { data } = await supabase.auth.getUser()
setUser(data.user)
setLoading(false)
}
getUser()

const { data: listener } = supabase.auth.onAuthStateChange(
(event,session)=>setUser(session?.user ?? null)
)

return () => {
listener.subscription.unsubscribe()
}
},[])

/* SCROLL */
useEffect(()=>{
const handleScroll = () => setScrolled(window.scrollY > 10)
window.addEventListener("scroll", handleScroll)
return () => window.removeEventListener("scroll", handleScroll)
},[])

/* CLICK OUTSIDE */
useEffect(()=>{
const handleClickOutside = (e:any) => {
if(menuRef.current && !menuRef.current.contains(e.target)){
setMenuOpen(false)
}
}
document.addEventListener("mousedown", handleClickOutside)
return () => document.removeEventListener("mousedown", handleClickOutside)
},[])

/* LOGOUT */
const logout = async () => {
await supabase.auth.signOut()
setUser(null)
router.push("/")
}

/* ❌ HIDE NAVBAR IN TEST */
if (/^\/practice\/reading\/test\/\d+$/.test(pathname)) {
return null
}

/* ❌ HIDE SIDEBAR BUTTON ON HOME */
const isHome = pathname === "/"

return (
<>

{/* 🍏 SIDEBAR */}
<div className={`
fixed top-16 left-0 h-full w-64 z-40
bg-black/90 backdrop-blur-xl
border-r border-white/10
p-4
transition-all duration-300 ease-in-out

${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
`}>

<div className="flex flex-col gap-3">

{[
["Listening Tests","/listening"],
["Reading Tests","/reading"],
["Writing Tests","/writing"],
["Speaking Tests","/speaking"],
["AI Writing Correction","/ai"],
["Results","/results"],
["Telegram Channel","https://t.me/jasurbeks_ielts"],
["Support","/support"]
].map(([label,link])=>{

const active = pathname === link

return (
<button
key={label}
onClick={()=> link.startsWith("http") ? window.open(link) : router.push(link)}
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

{/* 🔥 FLOATING MINI BUTTON (WHEN CLOSED) */}
{!sidebarOpen && !isHome && (
<button
onClick={()=>setSidebarOpen(true)}
className="
fixed top-24 left-3 z-50
p-2 rounded-xl
bg-white/80 backdrop-blur-md
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
<div className={`
fixed top-0 left-0 w-full h-16 z-50 px-6 flex justify-between items-center 
transition-all duration-300

${scrolled 
? "bg-white/90 backdrop-blur-2xl border-b border-gray-300 shadow-md" 
: "bg-white/70 backdrop-blur-xl border-b border-gray-200"}
`}>

{/* LEFT */}
<div className="flex items-center gap-3">

{/* 🔥 SIDEBAR TOGGLE (HIDDEN ON HOME) */}
{!isHome && (
<button
onClick={()=>setSidebarOpen(!sidebarOpen)}
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

{/* 🍏 SWITCH */}
<div className="flex items-center gap-2 ml-2">
<span className="text-xs text-gray-500">🌙</span>
<button
onClick={()=>setDarkMode(!darkMode)}
className={`w-12 h-7 flex items-center rounded-full p-1 transition-all
${darkMode ? "bg-green-500" : "bg-gray-300"}`}
>
<div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all
${darkMode ? "translate-x-5" : ""}`} />
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
onClick={()=>router.push("/auth/login")}
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