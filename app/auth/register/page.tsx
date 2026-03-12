'use client'

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [name,setName] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")
const [loading,setLoading] = useState(false)

const signup = async () => {

setLoading(true)
setError("")

const { data, error } = await supabase.auth.signUp({
email,
password,
options:{
data:{
full_name:name
}
}
})

setLoading(false)

if(error){
setError(error.message)
return
}

/* agar session darhol yaratilgan bo'lsa */

if(data.session){
router.replace("/dashboard")
return
}

/* agar session hali yaratilmagan bo'lsa */

router.replace("/auth/login")

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow w-[420px]">

<h1 className="text-2xl font-semibold mb-6 text-center">
Create your account
</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>

<input
type="text"
placeholder="Full name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded mb-2"
/>

{error && (
<p className="text-red-500 text-sm mb-3">
{error}
</p>
)}

<button
onClick={signup}
disabled={loading}
className="w-full bg-indigo-500 text-white py-3 rounded-lg mb-6"
>
{loading ? "Creating..." : "Create account"}
</button>

<div className="text-center text-sm text-gray-600">

Already have an account?

<Link
href="/auth/login"
className="text-blue-600 ml-1"
>
Sign in
</Link>

</div>

</div>

</div>

)

}