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

/* 🍏 NEW */
const [darkMode,setDarkMode] = useState(true)

const menuRef = useRef<any>(null)

/* 🔥 DARK MODE APPLY */
useEffect(()=>{
if(darkMode){
document.documentElement.classList.add("dark")
}else{
document.documentElement.classList.remove("dark")
}
},[darkMode])

/* 🔥 USER FETCH */
useEffect(()=>{

const getUser = async () => {
const { data } = await supabase.auth.getUser()
setUser(data.user)
setLoading(false)
}

getUser()

const { data: listener } = supabase.auth.onAuthStateChange(
(event,session)=>{
setUser(session?.user ?? null)
}
)

return () => {
listener.subscription.unsubscribe()
}

},[])

/* 🔥 SCROLL EFFECT */
useEffect(()=>{

const handleScroll = () => {
setScrolled(window.scrollY > 10)
}

window.addEventListener("scroll", handleScroll)

return () => window.removeEventListener("scroll", handleScroll)

},[])

/* 🔥 CLICK OUTSIDE */
useEffect(()=>{

const handleClickOutside = (e:any) => {
if(menuRef.current && !menuRef.current.contains(e.target)){
setMenuOpen(false)
}
}

document.addEventListener("mousedown", handleClickOutside)

return () => {
document.removeEventListener("mousedown", handleClickOutside)
}

},[])

/* 🔥 LOGOUT */
const logout = async () => {
await supabase.auth.signOut()
setUser(null)
router.push("/")
}

/* 🔥 HIDE NAVBAR ONLY ON REAL TEST PAGE */
if (/^\/practice\/reading\/test\/\d+$/.test(pathname)) {
  return null
}

return (

<div className={`
fixed top-0 left-0 w-full h-16 z-50 px-6 flex justify-between items-center 
transition-all duration-300

${scrolled 
? "bg-white/90 backdrop-blur-2xl border-b border-gray-300 shadow-md" 
: "bg-white/70 backdrop-blur-xl border-b border-gray-200"}
`}>

{/* LEFT */}
<div className="flex items-center gap-3">

<button
onClick={()=>setMenuOpen(!menuOpen)}
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

<Link
href="/"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-2 font-extrabold text-black hover:text-blue-600 transition"
>
<img src="/home.png" alt="Home" className="w-6 h-6 object-contain" />
<span className="flex items-center gap-2 font-extrabold text-gray-900 hover:text-blue-600">Home</span>
</Link>

{/* 🍏 IOS SWITCH */}
<div className="flex items-center gap-2 ml-2">

<span className="text-xs text-gray-500">🌙</span>

<button
onClick={()=>setDarkMode(!darkMode)}
className={`
w-12 h-7 flex items-center rounded-full p-1
transition-all duration-300

${darkMode ? "bg-green-500" : "bg-gray-300"}
`}
>
<div className={`
w-5 h-5 bg-white rounded-full shadow-md
transform transition-all duration-300
${darkMode ? "translate-x-5" : "translate-x-0"}
`} />
</button>

<span className="text-xs text-gray-500">☀️</span>

</div>

</div>

{/* CENTER */}
<h1 className="text-sm font-semibold text-gray-900 tracking-wide">
IELTS CDI Platform
</h1>

{/* RIGHT */}
<div>

{loading ? null : user ? (

<div className="flex items-center gap-3">

<button
onClick={() => router.push("/pricing")}
className="
px-4 py-2 text-sm font-semibold text-white
bg-gradient-to-r from-purple-600 to-blue-600
rounded-xl
shadow-sm
border border-white/20
backdrop-blur-md
transition-all duration-150
hover:scale-105 hover:shadow-lg
active:scale-95 active:shadow-inner
"
>
💎 Upgrade
</button>

<div className="
flex items-center gap-2
bg-gradient-to-r from-green-500 to-emerald-600
text-white px-4 py-2 rounded-xl text-sm font-semibold
shadow-sm border border-white/20 backdrop-blur-md
">
✓ Signed In
</div>

<button
onClick={logout}
className="
px-4 py-2 text-sm text-white
bg-red-500
rounded-xl
shadow-sm border border-white/20 backdrop-blur-md
transition-all duration-150
hover:bg-red-600 hover:scale-105 hover:shadow-lg
active:scale-95 active:shadow-inner
"
>
Logout
</button>

</div>

) : (

<button
onClick={()=>router.push("/auth/login")}
className="
px-5 py-2 text-sm font-bold text-white
bg-gradient-to-r from-blue-600 to-purple-600
rounded-xl
shadow-sm border border-white/20 backdrop-blur-md
transition-all duration-150
hover:scale-105 hover:shadow-lg
active:scale-95 active:shadow-inner
"
>
Sign In
</button>

)}

</div>

{/* 🍏 DROPDOWN MENU */}
{menuOpen && (
<div ref={menuRef} className="
absolute top-16 left-4 w-72
bg-white/80 backdrop-blur-xl
shadow-2xl rounded-2xl p-6 z-50
border border-white/30
">

<div className="flex flex-col items-center">

<div className="relative">
<img
src="/default-avatar.png"
className="w-20 h-20 rounded-full object-cover border"
/>

<div className="
absolute bottom-0 right-0
bg-blue-600 text-white
w-6 h-6 flex items-center justify-center
rounded-full text-sm cursor-pointer
">
+
</div>
</div>

<p className="font-bold text-black text-lg mt-2">Your Profile</p>

</div>

<div className="mt-6 flex flex-col gap-3">

<button
onClick={() => {
  router.push("/auth/reset")
  setMenuOpen(false)
}}
className="
px-4 py-2 rounded-xl text-black font-semibold
bg-white/80 backdrop-blur-md
border border-gray-200 shadow-sm
transition-all duration-150
hover:bg-white hover:scale-[1.02] hover:shadow-md
active:scale-95 active:shadow-inner
"
>
Reset Password
</button>

<button
onClick={() => {
  router.push("/dashboard")
  setMenuOpen(false)
}}
className="
px-4 py-2 rounded-xl text-black font-semibold
bg-white/80 backdrop-blur-md
border border-gray-200 shadow-sm
transition-all duration-150
hover:bg-white hover:scale-[1.02] hover:shadow-md
active:scale-95 active:shadow-inner
"
>
Dashboard
</button>

<button
onClick={() => {
  router.push("/dashboard")
  setMenuOpen(false)
}}
className="
px-4 py-2 rounded-xl text-black font-semibold
bg-white/80 backdrop-blur-md
border border-gray-200 shadow-sm
transition-all duration-150
hover:bg-white hover:scale-[1.02] hover:shadow-md
active:scale-95 active:shadow-inner
"
>
My Progress
</button>

<button
onClick={()=>setConfirm(true)}
className="
text-red-600
border border-red-400
px-4 py-2 rounded-xl font-semibold
bg-red-50 backdrop-blur-md
shadow-sm
transition-all duration-150
hover:bg-red-100 hover:scale-[1.02]
active:scale-95 active:shadow-inner
"
>
Delete Account
</button>

</div>

</div>
)}

{/* 🔴 DELETE MODAL */}
{confirm && (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-2xl w-[400px] text-center shadow-xl">

<h2 className="text-lg font-bold text-black mb-3">
Delete your account permanently?
</h2>

<p className="text-sm text-gray-900 mb-5">
Your subscription will be cancelled. No refunds.
</p>

<div className="flex justify-center gap-4">

<button
onClick={async () => {
  if (!user) return

  try {
    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user.id })
    })

    const data = await res.json()

    if (!data.success) {
      alert("Failed to delete account")
      return
    }

    setConfirm(false)
    setMenuOpen(false)

    await supabase.auth.signOut()
    setUser(null)

    router.push("/")
  } catch (err) {
    console.error(err)
    alert("Something went wrong")
  }
}}
className="
bg-red-600 text-white px-4 py-2 rounded-xl
shadow-sm border border-white/20 backdrop-blur-md
transition-all duration-150
hover:bg-red-700 hover:scale-105 hover:shadow-lg
active:scale-95 active:shadow-inner
"
>
Yes
</button>

<button
onClick={()=>setConfirm(false)}
className="
bg-green-500 text-white px-4 py-2 rounded-xl
shadow-sm border border-white/20 backdrop-blur-md
transition-all duration-150
hover:bg-green-600 hover:scale-105 hover:shadow-lg
active:scale-95 active:shadow-inner
"
>
Cancel
</button>

</div>

</div>

</div>
)}

</div>

)
}