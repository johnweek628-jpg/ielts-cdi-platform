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

<div className="mt-8 flex gap-4">

<button
onClick={() => router.push("/auth/register")}
className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
>
Get Started →
</button>

<button
onClick={() => {
    const section = document.getElementById("demo")
    section?.scrollIntoView({ behavior: "smooth" })
  }}
className="px-6 py-3 rounded-xl border border-red-500 text-red-500 
             font-semibold transition-all duration-300 
             hover:bg-red-500 hover:text-white hover:shadow-lg"
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

<section className="py-20">
  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold text-gray-900">
      Why you’re stuck at Band 6.0 😓
    </h2>

    <p className="text-gray-500 mt-4">
      It’s not your fault — most students practice the wrong way.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-12">

      <div className="p-6 border border-gray-200 rounded-2xl bg-white
                hover:shadow-[0_10px_40px_rgba(255,100,0,0.2)] 
                transition duration-300">
        <h3 className="font-semibold text-lg 
                 bg-gradient-to-r from-orange-500 to-red-500 
                 bg-clip-text text-transparent">No Feedback</h3>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          You practice every day, but no one tells you what you're doing wrong.
        </p>
      </div>
<div className="p-6 border border-gray-200 rounded-2xl 
                hover:shadow-[0_10px_40px_rgba(255,100,0,0.2)] 
                transition duration-300 bg-white">

  <h3 className="font-semibold text-lg 
                 bg-gradient-to-r from-orange-500 to-red-500 
                 bg-clip-text text-transparent">
    No Strategy
  </h3>

  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
    You don’t know how to approach tasks like a high-band student.
  </p>

</div>

      <div className="p-6 border border-gray-200 rounded-2xl bg-white
                hover:shadow-[0_10px_40px_rgba(255,100,0,0.2)] 
                transition duration-300">
        <h3 className="font-semibold text-lg 
                 bg-gradient-to-r from-orange-500 to-red-500 
                 bg-clip-text text-transparent">
          No Progress
        </h3>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          You can’t clearly see what’s improving and what’s holding you back.
        </p>
      </div>

    </div>

  </div>
</section>

<section className="bg-black text-white py-20">
  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold">
      We built a system that fixes this 🚀
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

<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">
        How much is staying at Band 6.0 costing you?
      </h2>

      <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed">
        Every failed IELTS attempt quietly drains your money, time, and opportunities.
      </p>
    </div>

    <div className="mt-16 grid md:grid-cols-2 gap-8 items-stretch">
      
      {/* LEFT CARD */}
      <div className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-8 shadow-sm hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-bold text-red-600">
          Every failed attempt costs you:
        </h3>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">✖</span>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">$200+ exam fee</span> every time you retake it
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">✖</span>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Weeks or months of wasted time</span> repeating the same mistakes
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-red-500 text-xl">✖</span>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Lost opportunities</span> for study, work, and visa plans
            </p>
          </div>
        </div>

        <p className="mt-8 text-gray-600 leading-relaxed">
          Most students work hard, yet they keep going round in circles because they do not know
          <span className="font-semibold text-black"> what exactly is holding them back.</span>
        </p>
      </div>

      {/* RIGHT CARD */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-bold text-black">
          Or fix your strategy once — and improve faster
        </h3>

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl">✔</span>
            <p className="text-gray-700 text-lg">
              Real IELTS-style practice environment
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl">✔</span>
            <p className="text-gray-700 text-lg">
              Instant AI feedback on what you did wrong
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl">✔</span>
            <p className="text-gray-700 text-lg">
              Smart tracking so you can actually see progress
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-green-500 text-xl">✔</span>
            <p className="text-gray-700 text-lg">
              A clearer path from Band 6.0 to Band 7.0+
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-100 p-5">
          <p className="text-gray-700 text-lg leading-relaxed">
            Instead of burning money on another disappointing attempt,
            <span className="font-semibold text-black"> invest in a system that helps you improve intelligently.</span>
          </p>
        </div>
      </div>
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