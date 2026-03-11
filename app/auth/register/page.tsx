'use client'

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const router = useRouter()

const signup = async () => {

const { data, error } = await supabase.auth.signUp({
email,
password
})

if(error){
alert(error.message)
}else{

// userni avtomatik login qilamiz

await supabase.auth.signInWithPassword({
email,
password
})

router.push("/dashboard")

}

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
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>

<button
onClick={signup}
className="w-full bg-indigo-500 text-white py-3 rounded-lg mb-6"
>
Create account
</button>

<div className="text-center text-sm text-gray-600">

Already have an account?

<Link
href="/login"
className="text-indigo-600 ml-1"
>
Sign in
</Link>

</div>

</div>

</div>

)

}