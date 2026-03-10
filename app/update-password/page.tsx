'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function UpdatePassword(){

const router = useRouter()

const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const updatePassword = async () => {

setLoading(true)

const { error } = await supabase.auth.updateUser({
password
})

setLoading(false)

if(error){
alert(error.message)
}else{
alert("Password updated successfully")
router.push("/login")
}

}

return(

<div className="flex items-center justify-center h-screen bg-black text-white">

<div className="bg-gray-900 p-10 rounded-2xl w-96 text-center">

<h1 className="text-2xl mb-6">
Set New Password
</h1>

<input
type="password"
placeholder="New password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 rounded bg-black border border-gray-600 mb-6"
/>

<button
onClick={updatePassword}
className="w-full bg-green-600 py-3 rounded-lg"
>

{loading ? "Updating..." : "Update Password"}

</button>

</div>

</div>

)

}