'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Signup(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const handleSignup = async () => {

setLoading(true)

const { error } = await supabase.auth.signUp({
email,
password
})

if(error){
setLoading(false)
alert(error.message)
return
}

/* account yaratildi — endi avtomatik login qilamiz */

const { error: loginError } = await supabase.auth.signInWithPassword({
email,
password
})

setLoading(false)

if(loginError){
alert(loginError.message)
return
}

router.replace("/dashboard")

}

return(

<div className="flex items-center justify-center h-screen bg-black text-white">

<div className="bg-gray-900 p-10 rounded-2xl w-96 text-center">

<h1 className="text-2xl font-semibold mb-6">
Create Account
</h1>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 rounded bg-black border border-gray-600 mb-4"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded bg-black border border-gray-600 mb-6"
/>

<button
onClick={handleSignup}
disabled={loading}
className="w-full bg-blue-600 py-3 rounded-lg mb-4"
>

{loading ? "Creating..." : "Sign Up"}

</button>

<p className="text-sm text-gray-400">
Already have an account?{" "}
<span
onClick={()=>router.push("/login")}
className="text-blue-400 cursor-pointer hover:underline"
>
Login
</span>
</p>

</div>

</div>

)

}