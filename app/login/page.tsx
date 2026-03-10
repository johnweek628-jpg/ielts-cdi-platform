'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const [resetLoading,setResetLoading] = useState(false)

const handleLogin = async () => {

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

setLoading(false)

if(error){
alert(error.message)
}else{
router.push("/dashboard")
}

}

const resetPassword = async () => {

if(!email){
alert("Please enter your email first.")
return
}

setResetLoading(true)

const { error } = await supabase.auth.resetPasswordForEmail(email,{
redirectTo: window.location.origin + "/update-password"
})

setResetLoading(false)

if(error){
alert(error.message)
}else{
alert("Password reset email sent.")
}

}

return(

<div className="flex items-center justify-center h-screen bg-black text-white">

<div className="bg-gray-900 p-10 rounded-2xl w-96 text-center">

<h1 className="text-2xl font-semibold mb-6">
Login
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
className="w-full p-3 rounded bg-black border border-gray-600 mb-4"
/>

<button
onClick={handleLogin}
disabled={loading}
className="w-full bg-red-600 py-3 rounded-lg mb-4"
>

{loading ? "Logging in..." : "Login"}

</button>

<p className="text-sm text-gray-400 mb-4">
Forgot your password?{" "}
<span
onClick={resetPassword}
className="text-blue-400 cursor-pointer hover:underline"
>
{resetLoading ? "Sending..." : "Send a reset link"}
</span>
</p>

<p className="text-sm text-gray-400">
Don't have an account?{" "}
<span
onClick={()=>router.push("/signup")}
className="text-blue-400 cursor-pointer hover:underline"
>
Sign up
</span>
</p>

</div>

</div>

)

}