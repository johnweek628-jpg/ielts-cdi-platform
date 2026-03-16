'use client'

import { useRouter } from "next/navigation"

export default function AIWritingPage() {

const router = useRouter()

return (

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center justify-center">

<h1 className="text-4xl font-extrabold mb-12">
AI Writing Correction
</h1>

<div className="grid md:grid-cols-2 gap-10">

<button
onClick={()=>router.push("/ai-writing/task1")}
className="bg-white text-black font-bold px-10 py-6 rounded-xl text-xl hover:scale-105 transition"
>
IELTS Writing Task 1
</button>

<button
onClick={()=>router.push("/ai-writing/task2")}
className="bg-white text-black font-bold px-10 py-6 rounded-xl text-xl hover:scale-105 transition"
>
IELTS Writing Task 2
</button>

</div>

</div>

)

}