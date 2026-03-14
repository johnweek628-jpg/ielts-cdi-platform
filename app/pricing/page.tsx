'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {

const router = useRouter()

// TELEGRAM LINKS

const basicTelegram =
"https://t.me/jasurbeksielts?text=Men%20Basic%20packageni%20sotib%20olmoqchi%20edim"

const premiumTelegram =
"https://t.me/jasurbeksielts?text=Men%20Premium%20packageni%20sotib%20olmoqchi%20edim"

const ultimateTelegram =
"https://t.me/jasurbeksielts?text=Men%20Ultimate%20packageni%20sotib%20olmoqchi%20edim"



return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-extrabold text-center mb-12 text-black">
Choose your plan
</h1>

<div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">


{/* STARTER */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold mb-3 text-black">
Starter
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$0
</p>

<p className="font-bold text-black mb-4">
What you can have:
</p>

<ul className="text-black font-semibold space-y-2 mb-6">

<li>2 Listening Tests</li>
<li>2 Reading Tests</li>
<li>1 Speaking Mock Test</li>
<li>1 Writing Correction</li>

</ul>

<button
onClick={()=>router.push("/dashboard")}
className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
>
Start Free
</button>

</div>



{/* BASIC */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold mb-3 text-black">
Basic
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$9
</p>

<p className="font-bold text-black mb-4">
What you can have:
</p>

<ul className="text-black font-semibold space-y-2 mb-6">

<li>10 Listening Tests</li>
<li>10 Reading Tests</li>
<li>3 Speaking Mock Tests</li>
<li>3 Writing Corrections</li>

</ul>

<a
href={basicTelegram}
target="_blank"
className="block bg-black text-white px-6 py-2 rounded-lg font-semibold mb-3"
>
Payment of Non-Uzbek people
</a>

<a
href={basicTelegram}
target="_blank"
className="block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
>
Payment of Uzbek people
</a>

</div>



{/* PREMIUM */}

<div className="bg-white p-8 rounded-xl shadow text-center border-2 border-black">

<h2 className="text-2xl font-bold mb-3 text-black">
Premium
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$19
</p>

<p className="font-bold text-black mb-4">
What you can have:
</p>

<ul className="text-black font-semibold space-y-2 mb-6">

<li>25 Listening Tests</li>
<li>25 Reading Tests</li>
<li>6 Speaking Mock Tests</li>
<li>6 Writing Corrections</li>

</ul>

<a
href={premiumTelegram}
target="_blank"
className="block bg-black text-white px-6 py-2 rounded-lg font-semibold mb-3"
>
Payment of Non-Uzbek people
</a>

<a
href={premiumTelegram}
target="_blank"
className="block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
>
Payment of Uzbek people
</a>

</div>



{/* ULTIMATE */}

<div className="bg-black p-8 rounded-xl shadow text-center text-white">

<h2 className="text-2xl font-bold mb-3">
Ultimate
</h2>

<p className="text-4xl font-extrabold mb-6">
$29
</p>

<p className="font-bold mb-4">
What you can have:
</p>

<ul className="font-semibold space-y-2 mb-6">

<li>Unlimited Listening Tests</li>
<li>Unlimited Reading Tests</li>
<li>Unlimited Speaking Mock Tests</li>
<li>Unlimited Writing Corrections</li>

</ul>

<a
href={ultimateTelegram}
target="_blank"
className="block bg-white text-black px-6 py-2 rounded-lg font-bold mb-3"
>
Payment of Non-Uzbek people
</a>

<a
href={ultimateTelegram}
target="_blank"
className="block bg-blue-500 text-white px-6 py-2 rounded-lg font-bold"
>
Payment of Uzbek people
</a>

</div>


</div>

</div>

)

}