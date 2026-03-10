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

},[])

if (pathname.startsWith("/practice/reading/test")) {
return null
}

return (

<div className="w-full bg-white border-b px-6 py-4 flex justify-between items-center">

<Link href="/" className="flex items-center gap-2 text-gray-700 font-semibold">  
🏠 Home  
</Link>

<h1 className="text-sm font-medium text-gray-600">  
IELTS CDI Learning Platform  
</h1>

<div>

{loading ? null : user ? (

<div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm">

✓ Signed Up

</div>

) : (

<button
onClick={()=>router.push("/login")}
className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg"

>

Sign Up

</button>

)}

</div>

</div>

)

}
