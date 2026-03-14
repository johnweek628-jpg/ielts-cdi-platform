'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {
  const router = useRouter()

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
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-blue-200 transition text-center">
          <h2 className="text-2xl font-bold mb-3 text-black">Starter</h2>

          <p className="text-4xl font-extrabold mb-6 text-black">$0</p>

          <p className="font-bold text-black mb-4">What you can have:</p>

          <ul className="text-left font-semibold space-y-3 mb-8">
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>2 Listening Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>2 Reading Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>1 Speaking Mock Test</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
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
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-blue-200 transition text-center">
          <h2 className="text-2xl font-bold mb-3 text-black">Basic</h2>

          <p className="text-4xl font-extrabold mb-6 text-black">$9</p>

          <p className="font-bold text-black mb-4">What you can have:</p>

          <ul className="text-left font-semibold space-y-3 mb-8">
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>10 Listening Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>10 Reading Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>3 Speaking Mock Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>3 Writing Corrections</span>
            </li>
          </ul>

          <button className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4 w-full">
            Payment of Non-Uzbek people
          </button>

          <a
            href={basicTelegram}
            target="_blank"
            rel="noreferrer"
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            Payment of Uzbek people
          </a>

          <div className="flex justify-center mt-6">
            <p className="text-2xl font-extrabold text-blue-700">49 880 so&apos;m</p>
          </div>
        </div>

        {/* PREMIUM */}
        <div className="relative bg-white p-10 rounded-2xl border-2 border-black shadow-xl hover:shadow-blue-300 transition text-center scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-4 py-1 rounded-full font-semibold">
            Most Popular
          </div>

          <h2 className="text-2xl font-bold mb-3 text-black">Premium</h2>

          <p className="text-4xl font-extrabold mb-6 text-black">$19</p>

          <p className="font-bold text-black mb-4">What you can have:</p>

          <ul className="text-left font-semibold space-y-3 mb-8">
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>25 Listening Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>25 Reading Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>6 Speaking Mock Tests</span>
            </li>
            <li className="flex items-start gap-3 text-black">
              <span className="text-emerald-500 text-lg leading-6">✓</span>
              <span>6 Writing Corrections</span>
            </li>
          </ul>

          <button className="block bg-black text-white px-6 py-3 rounded-lg font-bold mb-4 w-full">
            Payment of Non-Uzbek people
          </button>

          <a
            href={premiumTelegram}
            target="_blank"
            rel="noreferrer"
            className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full"
          >
            Payment of Uzbek people
          </a>

          <div className="flex justify-center mt-6">
            <p className="text-2xl font-extrabold text-blue-700">118 800 so&apos;m</p>
          </div>
        </div>

        {/* ULTIMATE */}
        <div className="bg-black p-8 rounded-2xl shadow-lg hover:shadow-blue-300 transition text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Ultimate</h2>

          <p className="text-4xl font-extrabold mb-6">$29</p>

          <p className="font-bold mb-4">What you can have:</p>

          <ul className="text-left font-semibold space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 text-lg leading-6">✓</span>
              <span>Unlimited Listening Tests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 text-lg leading-6">✓</span>
              <span>Unlimited Reading Tests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 text-lg leading-6">✓</span>
              <span>Unlimited Speaking Mock Tests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 text-lg leading-6">✓</span>
              <span>Unlimited Writing Corrections</span>
            </li>
          </ul>

          <button className="block bg-white text-black px-6 py-3 rounded-lg font-extrabold mb-4 w-full">
            Payment of Non-Uzbek people
          </button>

          <a
            href={ultimateTelegram}
            target="_blank"
            rel="noreferrer"
            className="block bg-blue-500 text-white px-6 py-3 rounded-lg font-bold w-full"
          >
            Payment of Uzbek people
          </a>

          <div className="flex justify-center mt-6">
            <p className="text-2xl font-extrabold text-blue-300">228 790 so&apos;m</p>
          </div>
        </div>
      </div>
    </div>
  )
}