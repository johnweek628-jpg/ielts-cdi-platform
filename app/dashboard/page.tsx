'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

    const router = useRouter()

    const [email,setEmail] = useState("")
    const [plan,setPlan] = useState("free")
    const [loading,setLoading] = useState(true)
    const [stats,setStats] = useState({

    tests:0,
    band:0,
    time:0,
    accuracy:0
    })

useEffect(()=>{

const checkAccess = async () => {

const { data } = await supabase.auth.getSession()

if(!data.session){
router.replace("/auth/login")
return
}

const user = data.session.user
setEmail(user.email || "")

/* GET USER PLAN */

const { data: profile } = await supabase
.from("profiles")
.select("plan")
.eq("email", user.email)
.single()

if(profile?.plan){
  setPlan(profile.plan.toLowerCase().trim())
}


/* GET USER TEST RESULTS */

const { data: results } = await supabase
.from("test_results")
.select("*")
.eq("user_id", user.id)

/* CALCULATE STATS */

const completedTests = results?.length || 0

const avgBand =
results?.reduce((a,b)=>a+b.score,0) / completedTests || 0

const totalTime =
results?.reduce((a,b)=>a+b.time_spent,0) || 0

const totalCorrect =
results?.reduce((a,b)=>a+b.correct_answers,0) || 0

const totalQuestions =
results?.reduce((a,b)=>a+b.total_questions,0) || 0

const accuracy =
(totalCorrect / totalQuestions) * 100 || 0

/* SET STATS */

setStats({
tests: completedTests,
band: Number(avgBand.toFixed(1)),
time: Math.floor(totalTime/3600),
accuracy: Number(accuracy.toFixed(0))
})

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

<div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">


{/* SIDEBAR */}

<div className="w-64 bg-black border-r border-gray-800 p-6 flex flex-col">

<button className="text-left mb-4 text-gray-300 hover:text-white">
Listening Tests
</button>

<button
onClick={()=>router.push("/practice/reading")}
className="text-left mb-4 text-gray-300 hover:text-white"
>
Reading Tests
</button>

<button className="text-left mb-4 text-gray-300 hover:text-white">
Writing Tests
</button>

<button className="text-left mb-4 text-gray-300 hover:text-white">
Speaking Tests
</button>

<button
onClick={()=>router.push("/ai-writing")}
className="text-left mb-4 text-gray-300 hover:text-white"
>
AI Writing Correction
</button>

<button
className="text-left mb-4 text-gray-300 hover:text-white"
>
Results
</button>

{/* NEW BUTTONS */}

<a
href="https://t.me/jasurbeks_ielts"
target="_blank"
className="text-left mb-4 text-gray-300 hover:text-white"
>
Join us on Telegram channel
</a>

<button
onClick={()=>router.push("/support")}
className="text-left mb-4 text-gray-300 hover:text-white"
>
Support
</button>

</div>



{/* MAIN SECTION */}

<div className="flex-1">


{/* HEADER */}

<div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

<h1 className="text-3xl font-bold tracking-wide">
IELTS Mock Test Platform
</h1>

<div className="flex items-center gap-6">

<span className="text-gray-400 text-sm">
{email}
</span>

<span
className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg
${plan === "ultimate"
? "bg-purple-600"
: plan === "premium"
? "bg-blue-600"
: "bg-green-600"}
`}
>
{plan.toUpperCase()}
</span>

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


</div>

</div>

)

}