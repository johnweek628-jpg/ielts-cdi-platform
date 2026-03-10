'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AuthPage(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const login = async () => {

setLoading(true)

const { error } = await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert(error.message)
}else{
window.location.href="/dashboard"
}

setLoading(false)

}

const signup = async () => {

setLoading(true)

const { error } = await supabase.auth.signUp({
email,
password
})

if(error){
alert(error.message)
}else{
alert("Account created. Now login.")
}

setLoading(false)

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-8 rounded-xl shadow-md w-96">

<h2 className="text-2xl font-semibold mb-6 text-center">
Login or Sign Up
</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-2 rounded mb-3"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-2 rounded mb-4"
/>

<button
onClick={login}
className="w-full bg-blue-600 text-white py-2 rounded mb-3"
>
Login
</button>

<button
onClick={signup}
className="w-full border py-2 rounded"
>
Create account
</button>

</div>

</div>

)

}