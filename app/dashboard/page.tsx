'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

const router = useRouter()

const [email,setEmail] = useState("")
const [plan,setPlan] = useState("free")
const [loading,setLoading] = useState(true)

useEffect(()=>{

const checkAccess = async () => {

const { data } = await supabase.auth.getSession()

if(!data.session){
router.replace("/auth/login")
return
}

const user = data.session.user
setEmail(user.email || "")

const { data: profile } = await supabase
.from("profiles")
.select("plan")
.eq("id", user.id)
.single()

if(profile){
setPlan(profile.plan)
}

setLoading(false)

}

checkAccess()

},[router])


const logout = async () => {

await supabase.auth.signOut()
router.replace("/auth/login")

}

if(loading){
return (
<div className="flex items-center justify-center h-screen bg-black text-white text-xl">
Loading Dashboard...
</div>
)
}

return (

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

{/* HEADER */}

<div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

<h1 className="text-3xl font-bold tracking-wide">
IELTS Mock Test Platform
</h1>

<div className="flex items-center gap-6">

<span className="text-gray-400 text-sm">
{email}
</span>

<span className="bg-green-600 px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
{plan.toUpperCase()}
</span>

<button
onClick={logout}
className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition transform hover:scale-105"
>
Logout
</button>

</div>

</div>


{/* WELCOME */}

<div className="max-w-6xl mx-auto mt-12 px-6 text-center">

<h2 className="text-3xl font-bold mb-2">
Welcome Back 👋
</h2>

<p className="text-gray-400">
Your personal IELTS preparation dashboard
</p>

</div>


{/* STATS */}

<div className="max-w-6xl mx-auto mt-12 px-6 grid md:grid-cols-4 gap-6">

<div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p className="text-gray-400 text-sm">Completed Tests</p>
<h3 className="text-2xl font-bold mt-2">0</h3>
</div>

<div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p className="text-gray-400 text-sm">Average Band</p>
<h3 className="text-2xl font-bold mt-2">0.0</h3>
</div>

<div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p className="text-gray-400 text-sm">Study Time</p>
<h3 className="text-2xl font-bold mt-2">0h</h3>
</div>

<div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition">
<p className="text-gray-400 text-sm">Accuracy</p>
<h3 className="text-2xl font-bold mt-2">0%</h3>
</div>

</div>


{/* PRACTICE MODULES */}

<div className="max-w-6xl mx-auto mt-16 px-6">

<h2 className="text-2xl font-semibold mb-10 text-center">
Practice Modules
</h2>

<div className="grid md:grid-cols-3 gap-8">


{/* READING */}

<div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-blue-500/30 transition duration-300">

<h3 className="text-xl font-semibold mb-4">
Reading Practice
</h3>

<p className="text-gray-400 mb-6">
Practice IELTS Academic Reading tests.
</p>

<a
href="/practice/reading"
className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition block text-center transform hover:scale-105"
>
Start Reading
</a>

</div>


{/* WRITING */}

<div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-purple-500/30 transition duration-300">

<h3 className="text-xl font-semibold mb-4">
Writing Practice
</h3>

<p className="text-gray-400 mb-6">
Practice Task 1 and Task 2 essays with AI evaluation.
</p>

<button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition transform hover:scale-105">
Start Writing
</button>

</div>


{/* SPEAKING */}

<div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 hover:shadow-green-500/30 transition duration-300">

<h3 className="text-xl font-semibold mb-4">
Speaking Practice
</h3>

<p className="text-gray-400 mb-6">
Answer IELTS speaking questions and record responses.
</p>

<button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition transform hover:scale-105">
Start Speaking
</button>

</div>


</div>

</div>


{/* QUICK ACTION */}

<div className="max-w-6xl mx-auto mt-20 px-6 pb-20">

<div className="bg-gray-900 rounded-2xl p-10 text-center shadow-xl">

<h3 className="text-2xl font-bold mb-4">
Ready to continue your preparation?
</h3>

<p className="text-gray-400 mb-8">
Take a full mock test and measure your IELTS band score.
</p>

<button
onClick={()=>router.push("/practice/reading")}
className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105"
>
Start Full Reading Test
</button>

</div>

</div>

</div>

)

}