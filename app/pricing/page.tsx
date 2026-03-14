'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {

const router = useRouter()

const basicEmail =
"https://mail.google.com/mail/?view=cm&fs=1&to=jasurbeksielts@gmail.com&su=Basic%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Basic%20package%20($9).%20Please%20send%20me%20payment%20instructions."

const premiumEmail =
"https://mail.google.com/mail/?view=cm&fs=1&to=jasurbeksielts@gmail.com&su=Premium%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Premium%20package%20($19).%20Please%20send%20me%20payment%20instructions."

const ultimateEmail =
"https://mail.google.com/mail/?view=cm&fs=1&to=jasurbeksielts@gmail.com&su=Ultimate%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Ultimate%20package%20($29).%20Please%20send%20me%20payment%20instructions."

const basicTelegram =
"https://t.me/jasurbeksielts?text=Men%20Basic%20packageni%20sotib%20olmoqchi%20edim"

const premiumTelegram =
"https://t.me/jasurbeksielts?text=Men%20Premium%20packageni%20sotib%20olmoqchi%20edim"

const ultimateTelegram =
"https://t.me/jasurbeksielts?text=Men%20Ultimate%20packageni%20sotib%20olmoqchi%20edim"

return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-extrabold text-center mb-16 text-black">
Choose your plan
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">

{/* STARTER */}

<div className="bg-white p-8 rounded-2xl shadow-lg text-center">

<h2 className="text-2xl font-bold mb-3 text-black">Starter</h2>

<p className="text-4xl font-extrabold mb-6 text-black">$0</p>

<p className="font-bold text-black mb-4">What you can have:</p>

<ul className="text-left font-bold space-y-3 mb-8">

<li className="flex gap-3"><span className="text-emerald-500">✓</span>2 Listening Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>2 Reading Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>1 Speaking Mock Test</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>1 Writing Correction</li>

</ul>

<button
onClick={() => router.push("/dashboard")}
className="bg-black text-white px-6 py-3 rounded-lg font-semibold w-full"
>
Start Free
</button>

</div>

{/* BASIC */}

<div className="bg-white p-8 rounded-2xl shadow-lg text-center">

<h2 className="text-2xl font-bold mb-3 text-black">Basic</h2>

<p className="text-4xl font-extrabold mb-6 text-black">$9</p>

<p className="font-bold text-black mb-4">What you can have:</p>

<ul className="text-left font-bold space-y-3 mb-8">

<li className="flex gap-3"><span className="text-emerald-500">✓</span>10 Listening Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>10 Reading Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>3 Speaking Mock Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>3 Writing Corrections</li>

</ul>

<a
href={basicEmail}
target="_blank"
className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4"
>
Payment of Non-Uzbek people
</a>

<a
href={basicTelegram}
target="_blank"
className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
>
Payment of Uzbek people
</a>

<p className="text-2xl font-extrabold text-blue-700 mt-6">
49 880 so'm
</p>

</div>

{/* PREMIUM */}

<div className="bg-white p-10 rounded-2xl border-2 border-blue-600 shadow-xl text-center scale-105 relative">

<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
Most Popular
</div>

<h2 className="text-2xl font-bold mb-3 text-black">Premium</h2>

<p className="text-4xl font-extrabold mb-6 text-black">$19</p>

<p className="font-bold text-black mb-4">What you can have:</p>

<ul className="text-left font-bold space-y-3 mb-8">

<li className="flex gap-3"><span className="text-emerald-500">✓</span>25 Listening Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>25 Reading Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>6 Speaking Mock Tests</li>
<li className="flex gap-3"><span className="text-emerald-500">✓</span>6 Writing Corrections</li>

</ul>

<a
href={premiumEmail}
target="_blank"
className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4"
>
Payment of Non-Uzbek people
</a>

<a
href={premiumTelegram}
target="_blank"
className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
>
Payment of Uzbek people
</a>

<p className="text-2xl font-extrabold text-blue-700 mt-6">
118 800 so'm
</p>

</div>

{/* ULTIMATE */}

<div className="bg-gradient-to-br from-black via-gray-900 to-black p-8 rounded-2xl shadow-xl text-center text-white">

<h2 className="text-2xl font-bold mb-3">Ultimate</h2>

<p className="text-4xl font-extrabold mb-6">$29</p>

<p className="font-bold mb-4">What you can have:</p>

<ul className="text-left font-bold space-y-3 mb-8">

<li className="flex gap-3"><span className="text-emerald-400">✓</span>Unlimited Listening Tests</li>
<li className="flex gap-3"><span className="text-emerald-400">✓</span>Unlimited Reading Tests</li>
<li className="flex gap-3"><span className="text-emerald-400">✓</span>Unlimited Speaking Mock Tests</li>
<li className="flex gap-3"><span className="text-emerald-400">✓</span>Unlimited Writing Corrections</li>

</ul>

<a
href={ultimateEmail}
target="_blank"
className="block bg-white text-black px-6 py-3 rounded-lg font-bold mb-4"
>
Payment of Non-Uzbek people
</a>

<a
href={ultimateTelegram}
target="_blank"
className="block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
>
Payment of Uzbek people
</a>

<p className="text-2xl font-extrabold text-blue-300 mt-6">
228 790 so'm
</p>

</div>

</div>
</div>

)
}