'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

type PriceItem = {
  price: string
  som: string
  old?: string
  save?: string
  oldSom?: string
}

type PlanType = "monthly" | "2" | "3" | "5"

type PricingType = {
  [key in PlanType]: {
    basic: PriceItem
    premium: PriceItem
    ultimate: PriceItem
  }
}

export default function Pricing() {

const router = useRouter()

const [plan, setPlan] = useState<PlanType>("monthly")

const pricing: PricingType = {
  monthly: {
    basic: { price: "$9", som: "98,000 so'm" },
    premium: { price: "$19", som: "118,000 so'm" },
    ultimate: { price: "$29", som: "228,000 so'm" }
  },
  "2": {
    basic: { price: "$15", old: "$18", save: "17%", som: "163,000 so'm", oldSom: "196,000 so'm" },
    premium: { price: "$35", old: "$38", save: "7%", som: "220,000 so'm", oldSom: "236,000 so'm" },
    ultimate: { price: "$54", old: "$58", save: "7%", som: "424,000 so'm", oldSom: "456,000 so'm" }
  },
  "3": {
    basic: { price: "$23", old: "$27", save: "15%", som: "250,000 so'm", oldSom: "294,000 so'm" },
    premium: { price: "$53", old: "$57", save: "7%", som: "329,000 so'm", oldSom: "354,000 so'm" },
    ultimate: { price: "$83", old: "$87", save: "5%", som: "650,000 so'm", oldSom: "684,000 so'm" }
  },
  "5": {
    basic: { price: "$40", old: "$45", save: "11%", som: "436,000 so'm", oldSom: "490,000 so'm" },
    premium: { price: "$80", old: "$95", save: "16%", som: "496,000 so'm", oldSom: "590,000 so'm" },
    ultimate: { price: "$125", old: "$145", save: "13%", som: "991,000 so'm", oldSom: "1,140,000 so'm" }
  }
}

const basic = pricing[plan].basic
const premium = pricing[plan].premium
const ultimate = pricing[plan].ultimate

return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-extrabold text-center mb-10 text-black">
Choose your plan
</h1>

{/* 🔘 TOGGLE BUTTONS */}
<div className="flex justify-center gap-4 mb-12 flex-wrap">

{[
  { key: "monthly" as PlanType, label: "Monthly" },
  { key: "2" as PlanType, label: "2 Months" },
  { key: "3" as PlanType, label: "3 Months" },
  { key: "5" as PlanType, label: "5 Months" }
].map(btn => (
  <button
    key={btn.key}
    onClick={() => setPlan(btn.key)}
    className={`px-6 py-2 rounded-full font-semibold transition 
    ${plan === btn.key 
      ? "bg-black text-white scale-105 shadow-lg" 
      : "bg-white text-black border hover:bg-gray-200"}`}
  >
    {btn.label}
  </button>
))}

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">

{/* STARTER */}

<div className="bg-white p-8 rounded-2xl shadow-lg text-center">

<h2 className="text-2xl font-bold mb-3 text-black">Starter</h2>

<p className="text-4xl font-extrabold mb-6 text-black">$0</p>

<p className="font-bold text-black mb-4">What you can have:</p>

<ul className="text-left space-y-3 mb-8">
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>2 Listening Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>2 Reading Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>1 Speaking Mock Test</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>1 Writing Correction</li>
</ul>

<button
onClick={() => router.push("/dashboard")}
className="bg-black text-white px-6 py-3 rounded-lg font-semibold w-full transition transform hover:scale-105 hover:bg-gray-800"
>
Start Free
</button>

</div>

{/* BASIC */}

<div className="bg-white p-8 rounded-2xl shadow-lg text-center relative">

{basic.save && (
  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
    Save {basic.save}
  </div>
)}

<h2 className="text-2xl font-bold mb-3 text-black">Basic</h2>

<p className="text-4xl font-extrabold text-black">
{basic.price} 
{basic.old && <span className="text-sm line-through text-gray-400 ml-2">{basic.old}</span>}
</p>

<p className="text-blue-700 font-bold mt-2">
{basic.som} 
{basic.oldSom && <span className="line-through text-gray-400 text-sm ml-2">{basic.oldSom}</span>}
</p>

<p className="font-bold text-black mb-4 mt-4">What you can have:</p>

<ul className="text-left space-y-3 mb-8">
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>10 Listening Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>10 Reading Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>3 Speaking Mock Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>3 Writing Corrections</li>
</ul>

<a href="#" className="block bg-black !text-white font-bold px-6 py-3 rounded-lg mb-4 text-center">
Payment of Non-Uzbek people
</a>

<a href="#" className="block bg-blue-600 !text-white font-bold px-6 py-3 rounded-lg text-center">
Payment of Uzbek people
</a>

</div>

{/* PREMIUM */}

<div className="bg-white p-10 rounded-2xl border-2 border-blue-600 shadow-xl text-center scale-105 relative">

{premium.save && (
  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
    Save {premium.save}
  </div>
)}

<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
Most Popular
</div>

<h2 className="text-2xl font-bold mb-3 text-black">Premium</h2>

<p className="text-4xl font-extrabold text-black">
{premium.price} 
{premium.old && <span className="text-sm line-through text-gray-400 ml-2">{premium.old}</span>}
</p>

<p className="text-blue-700 font-bold mt-2">
{premium.som} 
{premium.oldSom && <span className="line-through text-gray-400 text-sm ml-2">{premium.oldSom}</span>}
</p>

<p className="font-bold text-black mb-4 mt-4">What you can have:</p>

<ul className="text-left space-y-3 mb-8">
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>30 Listening Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>30 Reading Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>6 Speaking Mock Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>6 Writing Corrections</li>
</ul>

<a href="#" className="block bg-black !text-white font-bold px-6 py-3 rounded-lg mb-4 text-center">
Payment of Non-Uzbek people
</a>

<a href="#" className="block bg-blue-600 !text-white font-bold px-6 py-3 rounded-lg text-center">
Payment of Uzbek people
</a>

</div>

{/* ULTIMATE */}

<div className="bg-gradient-to-br from-black via-gray-900 to-black p-8 rounded-2xl shadow-xl text-center text-white relative">

{ultimate.save && (
  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
    Save {ultimate.save}
  </div>
)}

<h2 className="text-2xl font-bold mb-3">Ultimate</h2>

<p className="text-4xl font-extrabold">
{ultimate.price} 
{ultimate.old && <span className="text-sm line-through text-gray-400 ml-2">{ultimate.old}</span>}
</p>

<p className="text-blue-300 font-bold mt-2">
{ultimate.som} 
{ultimate.oldSom && <span className="line-through text-gray-400 text-sm ml-2">{ultimate.oldSom}</span>}
</p>

<p className="font-bold mb-4 mt-4">What you can have:</p>

<ul className="text-left space-y-3 mb-8">
<li className="flex gap-3 font-bold"><span className="text-emerald-400">✓</span>Unlimited Listening Tests</li>
<li className="flex gap-3 font-bold"><span className="text-emerald-400">✓</span>Unlimited Reading Tests</li>
<li className="flex gap-3 font-bold"><span className="text-emerald-400">✓</span>Unlimited Speaking Mock Tests</li>
<li className="flex gap-3 font-bold"><span className="text-emerald-400">✓</span>Unlimited Writing Corrections</li>
</ul>

<a href="#" className="block bg-black text-white font-bold px-6 py-3 rounded-lg mb-4 text-center">
Payment of Non-Uzbek people
</a>

<a href="#" className="block bg-blue-600 text-white font-bold px-6 py-3 rounded-lg text-center">
Payment of Uzbek people
</a>

</div>

</div>
</div>
)
}