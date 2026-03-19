'use client'

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

const pathname = usePathname()
const router = useRouter()

const [user,setUser] = useState<any>(null)
const [loading,setLoading] = useState(true)

const [menuOpen,setMenuOpen] = useState(false)
const [confirm,setConfirm] = useState(false)

const [scrolled,setScrolled] = useState(false)

const menuRef = useRef<any>(null)

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

if (/^\/practice\/reading\/\d+$/.test(pathname)) {
  return null
}

return (

<div className={`fixed top-0 left-0 w-full h-16 z-50 px-6 flex justify-between items-center transition-all duration-300
${scrolled 
? "bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200" 
: "bg-white/50 backdrop-blur-md border-b border-white/30"}
`}>

{/* LEFT */}
<div className="flex items-center gap-3">

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="text-2xl font-bold text-black hover:text-blue-600 transition"
>
☰
</button>

<Link
href="/"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-2 font-extrabold text-black hover:text-blue-600 transition"
>
<img src="/home.png" alt="Home" className="w-6 h-6 object-contain" />
<span className="font-extrabold tracking-tight">Home</span>
</Link>

</div>

{/* CENTER */}
<h1 className="text-sm font-medium text-gray-700 tracking-wide">
IELTS CDI Learning Platform
</h1>

{/* RIGHT */}
<div>

{loading ? null : user ? (

<div className="flex items-center gap-3">

  <button
    onClick={() => router.push("/pricing")}
    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200"
  >
    💎 Upgrade
  </button>

  <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
    ✓ Signed In
  </div>

  <button
    onClick={logout}
    className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Logout
  </button>

</div>

) : (

<button
onClick={()=>router.push("/auth/login")}
className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200"
>
Sign In
</button>

)}

</div>

{/* PROFILE MENU */}
{menuOpen && (
<div ref={menuRef} className="absolute top-16 left-4 w-72 bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl p-6 z-50 border border-gray-200">

<div className="flex flex-col items-center">

<div className="relative">
<img
src="/default-avatar.png"
className="w-20 h-20 rounded-full object-cover border"
/>

<div className="absolute bottom-0 right-0 bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm cursor-pointer">
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
className="border px-4 py-2 rounded-lg text-black font-semibold bg-white hover:bg-gray-100 transition"
>
Reset my password
</button>

<button
onClick={() => {
  router.push("/dashboard")
  setMenuOpen(false)
}}
className="border px-4 py-2 rounded-lg text-black font-semibold bg-white hover:bg-gray-100 transition"
>
Edit profile
</button>

<button
onClick={() => {
  router.push("/dashboard")
  setMenuOpen(false)
}}
className="border px-4 py-2 rounded-lg text-black font-semibold bg-white hover:bg-gray-100 transition"
>
My Progress
</button>

<button
onClick={()=>setConfirm(true)}
className="text-red-600 border border-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
>
Delete Account
</button>

</div>

</div>
)}

{/* DELETE MODAL */}
{confirm && (
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

<div className="bg-white p-6 rounded-xl w-[400px] text-center shadow-xl">

<h2 className="text-lg font-bold text-black mb-3">
Do you really want to DELETE YOUR ACCOUNT?
</h2>

<p className="text-sm text-gray-700 mb-5">
If you do so, your subscription will be cancelled and no refund will be issued.
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
className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
>
Yes
</button>

<button
onClick={()=>setConfirm(false)}
className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
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