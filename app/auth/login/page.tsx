'use client'

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")
const [loading,setLoading] = useState(false)

const router = useRouter()

const login = async () => {

setLoading(true)
setError("")

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

setLoading(false)

if(error){
setError("Invalid email or password.")
return
}

router.replace("/dashboard")

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow w-[420px]">

<h1 className="text-2xl font-semibold mb-6 text-center">
Sign in to your account
</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
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
onClick={login}
disabled={loading}
className="w-full bg-indigo-500 text-white py-3 rounded-lg mb-6"
>
{loading ? "Signing in..." : "Sign in"}
</button>

<div className="text-center text-sm text-gray-600">

New to platform?

<Link
href="/auth/register"
className="text-blue-600 ml-1"
>
Create account
</Link>

</div>

</div>

</div>

)

}