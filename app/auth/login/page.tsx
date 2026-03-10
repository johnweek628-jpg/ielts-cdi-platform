'use client'

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const router = useRouter()

const login = async () => {

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert(error.message)
}else{
router.push("/dashboard")
}

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
className="w-full border p-3 rounded mb-4"
/>

<button
onClick={login}
className="w-full bg-indigo-500 text-white py-3 rounded-lg mb-6"
>
Sign in
</button>

<div className="text-center text-sm text-gray-600">

New to platform?

<Link
href="/auth/register"
className="text-indigo-600 ml-1"
>
Create an account
</Link>

</div>

</div>

</div>

)

}