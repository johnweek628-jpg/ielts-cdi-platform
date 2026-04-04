'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function UpdatePasswordPage(){

const router = useRouter()

const [password,setPassword] = useState("")
const [confirm,setConfirm] = useState("")
const [loading,setLoading] = useState(false)
const [error,setError] = useState("")
const [success,setSuccess] = useState(false)

const handleUpdate = async () => {

if(!password || !confirm){
  setError("Please fill in all fields")
  return
}

if(password.length < 6){
  setError("Password must be at least 6 characters")
  return
}

if(password !== confirm){
  setError("Passwords do not match")
  return
}

setLoading(true)
setError("")

const { error } = await supabase.auth.updateUser({
  password: password
})

if(error){
  setError(error.message)
  setLoading(false)
  return
}

setSuccess(true)
setLoading(false)

setTimeout(()=>{
  router.push("/auth/login")
},2000)

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">

<div className="bg-white p-10 rounded-2xl shadow-2xl w-[420px]">

<h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
Create New Password
</h1>

{success ? (

<div className="text-center">

<p className="text-green-600 font-semibold mb-4">
✅ Your password has been successfully updated!
</p>

<p className="text-gray-600 text-sm">
Redirecting to login...
</p>

</div>

):( 

<>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="password"
placeholder="Confirm Password"
value={confirm}
onChange={(e)=>setConfirm(e.target.value)}
className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
/>

{error && (
<p className="text-red-500 text-sm mb-4 text-center">
{error}
</p>
)}

<button
onClick={handleUpdate}
disabled={loading}
className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
>
{loading ? "Updating..." : "Update Password"}
</button>

</>

)}

</div>

</div>

)

}