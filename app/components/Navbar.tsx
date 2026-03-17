'use client'

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Navbar() {

const pathname = usePathname()
const router = useRouter()

const [user,setUser] = useState<any>(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const getUser = async () => {

const { data } = await supabase.auth.getUser()
setUser(data.user)
setLoading(false)

}

getUser()

/* REAL TIME AUTH LISTENER */

const { data: listener } = supabase.auth.onAuthStateChange(
(event,session)=>{

setUser(session?.user ?? null)

}
)

return () => {
listener.subscription.unsubscribe()
}

},[])

/* LOGOUT */

const logout = async () => {

await supabase.auth.signOut()
setUser(null)
router.push("/")

}

if (pathname.startsWith("/practice/reading/test")) {
return null
}

return (

<>
{/* 🔥 TRIGGER ZONE */}
<div className="fixed top-0 left-0 w-full h-6 z-40 group"></div>

{/* 🚀 FLOATING NAVBAR */}
<div className="fixed top-0 left-0 w-full z-50 
opacity-0 -translate-y-full 
transition-all duration-300 ease-in-out 
group-hover:opacity-100 group-hover:translate-y-0">

<div className="bg-white/90 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center">

{/* LEFT */}
<Link
href="/"
className="flex items-center gap-3 !text-black font-bold hover:text-blue-600 transition"
>
<img src="/home.png" alt="Home" className="w-6 h-6 object-contain" />
<span className="font-bold text-black">Home</span>
</Link>

{/* CENTER */}
<h1 className="text-sm font-medium text-gray-600">
IELTS CDI Learning Platform
</h1>

{/* RIGHT */}
<div>

{loading ? null : user ? (

<div className="flex items-center gap-3">

<div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
✓ Signed In
</div>

<button
onClick={logout}
className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg font-bold hover:scale-105 transition"
>
Logout
</button>

</div>

) : (

<button
onClick={()=>router.push("/auth/login")}
className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-bold hover:scale-105 transition"
>
Sign In
</button>

)}

</div>

</div>

</div>
</>

)

}