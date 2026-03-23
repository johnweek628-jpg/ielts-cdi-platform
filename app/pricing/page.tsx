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

// ✅ FIXED iOS GLASS BUTTON (LIGHT CARDS)
const iosBtn = `
relative isolate overflow-hidden
w-full px-6 py-3 rounded-[24px]
font-semibold text-black

bg-white/60
backdrop-blur-[30px]

border border-white/60

shadow-[0_8px_25px_rgba(0,0,0,0.12),
inset_0_1px_0_rgba(255,255,255,0.9),
inset_0_-1px_0_rgba(255,255,255,0.2)]

before:content-['']
before:absolute before:inset-[1px]
before:rounded-[22px]
before:bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.08)_100%)]
before:pointer-events-none
after:content-['']
after:absolute after:left-[10%] after:right-[10%] after:top-[6%] after:h-[42%]
after:rounded-full
after:bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.18)_100%)]
after:blur-md after:opacity-80
after:pointer-events-none
transition-all duration-300

hover:scale-[1.02]
hover:bg-white/65
hover:shadow-[0_14px_40px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(255,255,255,0.18)]
active:scale-[0.985]
active:shadow-[0_6px_18px_rgba(0,0,0,0.14),inset_0_2px_6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.7)]
`

// ✅ DARK BUTTON (UNCHANGED - already perfect)
const iosBtnDark = `
relative isolate overflow-hidden
w-full px-6 py-3 rounded-[24px]
font-semibold text-white
bg-white/16
backdrop-blur-2xl
border border-white/25
shadow-[0_10px_30px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.06)]
before:content-['']
before:absolute before:inset-[1px]
before:rounded-[22px]
before:bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.03)_100%)]
before:pointer-events-none
after:content-['']
after:absolute after:left-[12%] after:right-[12%] after:top-[7%] after:h-[38%]
after:rounded-full
after:bg-[linear-gradient(180deg,rgba(255,255,255,0.36)_0%,rgba(255,255,255,0.06)_100%)]
after:blur-md after:opacity-90
after:pointer-events-none
transition-all duration-300
hover:scale-[1.02]
hover:bg-white/20
hover:border-white/30
hover:shadow-[0_14px_40px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(255,255,255,0.08)]
active:scale-[0.985]
active:shadow-[0_6px_18px_rgba(0,0,0,0.3),inset_0_2px_8px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]
`

const iosTabBase = `
relative isolate overflow-hidden
min-w-[150px] px-8 py-3 rounded-full
font-semibold text-[15px]
backdrop-blur-2xl
transition-all duration-300
border
`
const iosBtnGold = `
relative isolate overflow-hidden
w-full px-6 py-3 rounded-[24px]
font-semibold text-yellow-900 tracking-wide

bg-yellow-400/30
backdrop-blur-[30px]

border border-yellow-300/50

shadow-[0_10px_30px_rgba(202,138,4,0.25),
inset_0_1px_0_rgba(255,255,255,0.6),
inset_0_-1px_0_rgba(0,0,0,0.1)]

before:content-['']
before:absolute before:inset-[1px]
before:rounded-[22px]
before:bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.2)_50%,rgba(0,0,0,0.08)_100%)]

after:content-['']
after:absolute after:left-[10%] after:right-[10%] after:top-[5%] after:h-[45%]
after:rounded-full
after:bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.25)_100%)]
after:blur-md after:opacity-90

transition-all duration-300

hover:scale-[1.04]
hover:bg-yellow-400/40
hover:shadow-[0_14px_40px_rgba(202,138,4,0.35)]

active:scale-[0.95]
active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.25)]
`

return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-extrabold text-center mb-10 text-black">
Choose your plan
</h1>

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
    className={`${iosTabBase}
    ${plan === btn.key
      ? `
        text-white bg-black
        border-black
        shadow-[0_10px_25px_rgba(0,0,0,0.22)]
        scale-[1.03]
      `
      : `
        text-black
        bg-white/60 backdrop-blur-[30px]
        border-white/70
        shadow-[0_8px_20px_rgba(0,0,0,0.08)]
        hover:bg-white/80
        hover:scale-[1.015]
      `
    }`}
  >
    <span className="relative z-10">{btn.label}</span>
    {plan !== btn.key && (
      <>
        <span className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.15)_100%)]" />
        <span className="pointer-events-none absolute left-[12%] right-[12%] top-[8%] h-[40%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.15)_100%)] blur-md opacity-80" />
      </>
    )}
  </button>
))}

</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">

{/* STARTER */}
<div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg text-center">

<h2 className="text-2xl font-bold mb-3 text-black">Starter</h2>
<p className="text-4xl font-extrabold mb-6 text-black">$0</p>

<ul className="text-left space-y-3 mb-8">
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>2 Listening Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>2 Reading Tests</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>1 Speaking Mock Test</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>1 Writing Correction</li>
</ul>

<button
onClick={() => router.push("/dashboard")}
className={iosBtn}
>
<span className="relative z-10 tracking-wide">Start Free</span>
</button>

</div>

{/* BASIC */}
<div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg text-center relative">

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
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>Weekly Articles</li>
</ul>

<button
onClick={() => router.push("/payment/choose-version")}
className={iosBtnGold}
>
<span className="relative z-10 tracking-wide">Get now</span>
</button>

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
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>Weekly Articles</li>
<li className="flex gap-3 font-bold text-black"><span className="text-emerald-500">✓</span>Weakness Analysis</li>
</ul>

<button
onClick={() => router.push("/payment/choose-version")}
className={iosBtnGold}
>
<span className="relative z-10 tracking-wide">Get now</span>
</button>

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

<button
onClick={() => router.push("/payment/choose-version")}
className={iosBtnGold}
>
<span className="relative z-10 tracking-wide">Get now</span>
</button>

</div>

</div>
</div>
)
}