'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

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

<div className="relative z-20 mt-8 flex gap-4">

<button
onClick={() => router.push("/auth/register")}
className="inline-flex items-center justify-center
               bg-red-500 text-white
               px-8 py-4
               rounded-2xl
               font-semibold text-lg
               hover:bg-red-600
               active:scale-[0.98]
               transition duration-200
               cursor-pointer"
>
Get Started →
</button>

<button
onClick={() => {
    const section = document.getElementById("demo")
    section?.scrollIntoView({ behavior: "smooth" })
  }}
className="inline-flex items-center justify-center
               px-8 py-4
               rounded-2xl
               border border-red-500 text-red-500
               font-semibold text-lg
               hover:bg-red-500 hover:text-white
               transition duration-200
               cursor-pointer"
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
6,500+ students improving their IELTS scores
</h2>

<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">

<div>
<p className="text-2xl font-bold text-red-500">6,500+</p>
<p className="text-gray-500 text-sm">Students</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">235+</p>
<p className="text-gray-500 text-sm">Reading passages</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">94%</p>
<p className="text-gray-500 text-sm">Success</p>
</div>

<div>
<p className="text-2xl font-bold text-red-500">24/7</p>
<p className="text-gray-500 text-sm">AI Feedback</p>
</div>

</div>

</div>
</section>



<section className="bg-black text-white py-20">
  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold">
      We built a perfect system for you!
    </h2>

    <p className="text-gray-400 mt-4">
      Everything you need to improve your IELTS score — in one smart system.
    </p>

    <div className="grid md:grid-cols-3 gap-10 mt-12">

      <div>
        <h3 className="text-xl font-semibold">Real Exam Practice</h3>
        <p className="text-gray-400 text-sm mt-2">
          Experience real IELTS-style tests, not random exercises.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">AI Feedback</h3>
        <p className="text-gray-400 text-sm mt-2">
          Get instant evaluation on writing and speaking tasks.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">Smart Tracking</h3>
        <p className="text-gray-400 text-sm mt-2">
          Track your progress and focus on your weak areas.
        </p>
      </div>

    </div>

  </div>
</section>

<section id="demo" className="py-24 bg-gray-50">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold text-gray-900">
      Experience the real IELTS environment
    </h2>

    <p className="text-gray-500 mt-4">
      From instructions to real test interface — just like the actual exam.
    </p>

    <div className="flex flex-col gap-24 mt-24">

      {/* STEP 1 */}
<motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="group transition-all duration-700 ease-out"
>

  <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white
                  transform transition duration-700 group-hover:scale-[1.02]">

    <img
      src="/instructions.png"
      className="w-[88%] md:w-[75%] mx-auto h-auto object-cover transition duration-700 group-hover:scale-105"
    />

  </div>

  <p className="mt-6 text-xl italic font-medium text-black tracking-tight">
    Step 1: Understand the test
  </p>

</motion.div>

      {/* STEP 2 */}
<motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="group transition-all duration-700 ease-out"
>

  <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white
                  transform transition duration-700 group-hover:scale-[1.02]">

    <img
      src="/reading-test.png"
      className="w-[88%] md:w-[75%] mx-auto h-auto object-cover transition duration-700 group-hover:scale-105"
    />

  </div>

  <p className="mt-6 text-xl italic font-medium text-black tracking-tight">
    Step 2: Take the real test
  </p>

</motion.div>

      {/* STEP 3 */}
     <motion.div
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="group transition-all duration-700 ease-out"
>

  <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white
                  transform transition duration-700 group-hover:scale-[1.02]">

    <img
      src="/dashboard.png"
      className="w-[88%] md:w-[75%] mx-auto h-auto object-cover transition duration-700 group-hover:scale-105"
    />

  </div>

  <p className="mt-6 text-xl italic font-medium text-black tracking-tight">
    Step 3: Own your dashboard
  </p>

</motion.div>

    </div>

  </div>

</section>

<section className="py-20 bg-white">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">
      See it in action!
    </h2>

    <p className="text-gray-500 mt-4 text-lg italic">
      Watch how the real inspera-like interface works
    </p>

   <div className="mt-16 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)] border border-gray-200">

      <video
  src="/reading-demo.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-[520px] md:h-[620px] object-contain bg-black"
/>

    </div>

  </div>

</section>

<section className="py-24 bg-gradient-to-b from-white to-red-50">
  <div className="max-w-4xl mx-auto px-6 text-center">
    
    <div className="rounded-[32px] border border-red-100 bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10 md:p-14">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
        Start improving your IELTS score today
      </h2>

      <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
        No guessing. No confusion. Just real practice, sharp feedback, and measurable progress.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => router.push("/auth/register")}
          className="px-8 py-4 rounded-2xl bg-red-500 text-white text-lg font-semibold
                     shadow-lg shadow-red-200 hover:bg-red-600 hover:scale-[1.02]
                     active:scale-[0.98] transition duration-300"
        >
          Get Started — it takes 30 seconds
        </button>

        <button
          onClick={() => router.push("/pricing")}
          className="px-8 py-4 rounded-2xl border border-red-200 text-red-500 text-lg font-semibold
                     hover:bg-red-50 hover:border-red-300 transition duration-300"
        >
          View Pricing
        </button>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base text-gray-500">
        <p>✔ No credit card required</p>
        <p>✔ Start instantly</p>
        <p>✔ Cancel anytime</p>
      </div>
    </div>
  </div>
</section>

</main>
)
}