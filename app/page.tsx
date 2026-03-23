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

      <div className="p-6 border rounded-2xl hover:shadow-xl transition">
        <h3 className="font-semibold text-lg">No Feedback</h3>
        <p className="text-gray-500 mt-2 text-sm">
          You practice every day, but no one tells you what you're doing wrong.
        </p>
      </div>

      <div className="p-6 border rounded-2xl hover:shadow-xl transition">
        <h3 className="font-semibold text-lg">No Strategy</h3>
        <p className="text-gray-500 mt-2 text-sm">
          You don’t know how to approach tasks like a high-band student.
        </p>
      </div>

      <div className="p-6 border rounded-2xl hover:shadow-xl transition">
        <h3 className="font-semibold text-lg">No Progress</h3>
        <p className="text-gray-500 mt-2 text-sm">
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

<section className="py-24 bg-gray-50">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold text-gray-900">
      Experience the real IELTS environment
    </h2>

    <p className="text-gray-500 mt-4">
      From instructions to real test interface — just like the actual exam.
    </p>

    <div className="grid md:grid-cols-3 gap-10 mt-16">

      {/* STEP 1 */}
      <div className="group">
        <div className="overflow-hidden rounded-2xl shadow-xl border">
          <img
            src="/instructions.png"
            className="group-hover:scale-110 transition duration-500"
          />
        </div>
        <p className="mt-4 font-semibold">
          Step 1: Understand the test
        </p>
      </div>

      {/* STEP 2 */}
      <div className="group">
        <div className="overflow-hidden rounded-2xl shadow-xl border">
          <img
            src="/reading-test.png"
            className="group-hover:scale-110 transition duration-500"
          />
        </div>
        <p className="mt-4 font-semibold">
          Step 2: Take the real test
        </p>
      </div>

      {/* STEP 3 */}
      <div className="group">
        <div className="overflow-hidden rounded-2xl shadow-xl border">
          <img
            src="/dashboard.png"
            className="group-hover:scale-110 transition duration-500"
          />
        </div>
        <p className="mt-4 font-semibold">
          Step 3: Track your progress
        </p>
      </div>

    </div>

  </div>

</section>

<section className="py-20 bg-white">

  <div className="max-w-4xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-bold text-gray-900">
      See it in action 🎥
    </h2>

    <p className="text-gray-500 mt-4">
      Watch how the real test interface works
    </p>

    <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl border">

      <video
        src="/reading-demo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full"
      />

    </div>

  </div>

</section>

</main>
)
}