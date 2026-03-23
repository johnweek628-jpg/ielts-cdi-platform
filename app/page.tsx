'use client'

import { useRouter } from "next/navigation"

export default function LandingPage() {

const router = useRouter()

return (

<main className="relative overflow-hidden bg-white">

{/* 🔴 RED GLOW */}
<div className="absolute top-[-150px] left-[-150px] w-[600px] h-[600px] bg-red-500 opacity-20 blur-[120px] animate-pulse"></div>

{/* ================= HERO ================= */}

<section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

<div>

<h1 className="text-5xl font-extrabold leading-tight text-gray-900">
Boost your IELTS score <br />
<span className="text-red-500">faster than ever</span>
</h1>

<p className="mt-6 text-lg text-gray-600">
Practice with real exam simulations, AI feedback, and smart progress tracking.
</p>

<div className="mt-8 flex gap-4">

<button
onClick={() => router.push("/home")}
className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
>
Get Started →
</button>

<button
className="border px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
>
See how it works
</button>

</div>

<p className="mt-4 text-sm text-gray-400">
✔ No credit card required &nbsp;&nbsp; ✔ Start in 30 seconds
</p>

</div>

{/* RIGHT */}
<div className="rounded-2xl shadow-2xl overflow-hidden border">

<img
src="/reading-preview.png"
alt="IELTS Interface"
/>

</div>

</section>

{/* ================= SOCIAL PROOF ================= */}

<section className="bg-gray-50 py-16 border-t">

<div className="max-w-5xl mx-auto px-6 text-center">

<p className="text-gray-500 text-sm uppercase tracking-wide">
Trusted by students worldwide
</p>

<h2 className="text-3xl font-bold mt-4 text-gray-900">
7,200+ students improving their IELTS scores
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">

<div>
<p className="text-2xl font-bold text-red-500">7,200+</p>
<p className="text-gray-500 text-sm">Students</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">250+</p>
<p className="text-gray-500 text-sm">Tests</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">95%</p>
<p className="text-gray-500 text-sm">Success</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">24/7</p>
<p className="text-gray-500 text-sm">AI Feedback</p>
</div>

</div>

</div>

</section>

</main>
)
}