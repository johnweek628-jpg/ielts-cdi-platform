'use client'

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ResetPage(){

const [email,setEmail] = useState("")
const [sent,setSent] = useState(false)
const [error,setError] = useState("")

const sendReset = async () => {

if(!email){
  setError("Please enter your email")
  return
}

const { error } = await supabase.auth.resetPasswordForEmail(email,{
redirectTo:"https://ielts-cdi-platform-production.up.railway.app/update-password"
})

if(error){
  setError(error.message)
  return
}

setError("")
setSent(true)

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="bg-white p-10 rounded-xl shadow w-[420px]">

<h1 className="text-xl mb-6 text-center">
Reset Password
</h1>

{sent ? (

<p className="text-green-600 text-center">
We have sent you a link to prove that your email is yours.  
Please check your inbox or spam folder.
</p>

):( 

<>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border p-3 rounded mb-4"
/>

{error && (
<p className="text-red-500 text-sm mb-3 text-center">
{error}
</p>
)}

<button
onClick={sendReset}
className="w-full bg-blue-600 text-white py-3 rounded"
>
Send reset link
</button>

</>

)}

</div>

</div>

)

}