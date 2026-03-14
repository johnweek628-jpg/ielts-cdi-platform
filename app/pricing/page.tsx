'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {

const router = useRouter()

const email = "johnweek628@gmail.com"

const basicEmail =
`mailto:${email}?subject=Basic%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Basic%20package%20($9).%20Please%20send%20me%20payment%20instructions.`

const premiumEmail =
`mailto:${email}?subject=Premium%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Premium%20package%20($19).%20Please%20send%20me%20payment%20instructions.`

const ultimateEmail =
`mailto:${email}?subject=Ultimate%20Package%20Payment&body=Hello%2C%20I%20would%20like%20to%20buy%20the%20Ultimate%20package%20($29).%20Please%20send%20me%20payment%20instructions.`

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

<ul className="text-left font-semibold space-y-3 mb-8">

<li className="flex items-start gap-3 text-black">
<span className="text-emerald-500 text-lg">✓</span>
<span>2 Listening Tests</span>
</li>

<li className="flex items-start gap-3 text-black">
<span className="text-emerald-500 text-lg">✓</span>
<span>2 Reading Tests</span>
</li>

<li className="flex items-start gap-3 text-black">
<span className="text-emerald-500 text-lg">✓</span>
<span>1 Speaking Mock Test</span>
</li>

<li className="flex items-start gap-3 text-black">
<span className="text-emerald-500 text-lg">✓</span>
<span>1 Writing Correction</span>
</li>

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

<a
href={basicEmail}
className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4 w-full"
>
Payment of Non-Uzbek people
</a>

<a
href={basicTelegram}
target="_blank"
rel="noreferrer"
className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
>
Payment of Uzbek people
</a>

<div className="flex justify-center mt-6">
<p className="text-2xl font-extrabold text-blue-700">49 880 so'm</p>
</div>

</div>

{/* PREMIUM */}
<div className="bg-white p-10 rounded-2xl border-2 border-black shadow-xl text-center scale-105">

<h2 className="text-2xl font-bold mb-3 text-black">Premium</h2>

<p className="text-4xl font-extrabold mb-6 text-black">$19</p>

<a
href={premiumEmail}
className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4 w-full"
>
Payment of Non-Uzbek people
</a>

<a
href={premiumTelegram}
target="_blank"
rel="noreferrer"
className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
>
Payment of Uzbek people
</a>

<div className="flex justify-center mt-6">
<p className="text-2xl font-extrabold text-blue-700">118 800 so'm</p>
</div>

</div>

{/* ULTIMATE */}
<div className="bg-black p-8 rounded-2xl shadow-lg text-center text-white">

<h2 className="text-2xl font-bold mb-3">Ultimate</h2>

<p className="text-4xl font-extrabold mb-6">$29</p>

<a
href={ultimateEmail}
className="block bg-white text-black px-6 py-3 rounded-lg font-extrabold mb-4 w-full"
>
Payment of Non-Uzbek people
</a>

<a
href={ultimateTelegram}
target="_blank"
rel="noreferrer"
className="block bg-blue-500 text-white px-6 py-3 rounded-lg font-bold w-full"
>
Payment of Uzbek people
</a>

<div className="flex justify-center mt-6">
<p className="text-2xl font-extrabold text-blue-300">228 790 so'm</p>
</div>

</div>

</div>
</div>

)
}