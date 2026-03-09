'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (email) setLoggedIn(true)
  }, [])

  const featureBtn =
    "bg-white text-blue-600 hover:text-blue-700 hover:-translate-y-[2px] hover:shadow-xl transition-all duration-200 p-4 rounded-xl shadow text-sm font-semibold flex items-center justify-center gap-2"

  return (

    <main className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-white border-r flex flex-col justify-between">

        <div className="p-6">

          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🎓</span>
            <h1 className="text-lg font-semibold text-gray-800">
              IELTS CDI
            </h1>
          </div>

          <nav className="space-y-2 text-sm text-gray-700">

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              🏆 Leaderboard
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              🤖 Premium AI Writing Check
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              🔤 Translation Practice
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              📊 Student Results
            </button>

            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              📚 Read Articles
            </button>

          </nav>

        </div>

        <div className="p-6">

          <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition">
            Join My Lessons
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <div className="flex-1 flex flex-col">

        {/* HERO */}

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Welcome to English Learning Platform!
          </h2>

          {!loggedIn && (

            <div className="flex gap-3">

              <button
                onClick={() => router.push("/login")}
                className="bg-white text-red-600 px-4 py-2 rounded-lg text-sm font-medium shadow hover:shadow-lg transition"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/login")}
                className="border border-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white hover:text-red-600 transition"
              >
                Sign Up
              </button>

            </div>

          )}

        </div>


        {/* CONTENT */}

        <div className="flex-1 flex flex-col items-center justify-center p-10">

          <h3 className="text-lg font-semibold mb-10 text-gray-700">
            The most popular features
          </h3>

          <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">

            <button className={featureBtn}>
              📖 Learn Vocabulary
            </button>

            <button className={featureBtn}>
              🎧 Listening Practice
            </button>

            {/* READING PRACTICE FIXED */}

            <button
              onClick={() => router.push("/practice/reading")}
              className={featureBtn}
            >
              📚 Reading Practice
            </button>

            <button className={featureBtn}>
              ✍️ Writing Practice
            </button>

            <button className={featureBtn}>
              ⭐ Band 9.0 Samples
            </button>

            <button className={featureBtn}>
              📝 Take a Full Mock
            </button>

            <button className={featureBtn}>
              📦 My Special Prep Materials
            </button>

            <button className={`${featureBtn} col-span-3`}>
              🎤 Speaking Practice
            </button>

          </div>

        </div>


        {/* FOOTER */}

        <footer className="text-center text-sm text-gray-500 pb-10 px-6">

          <p>© 2025 IELTS CDI Platform</p>

          <p className="mt-2 max-w-3xl mx-auto text-xs leading-relaxed">
            This is an independent English language practice platform. We are NOT affiliated with IELTS, Cambridge Assessment English, the British Council or IDP.
          </p>

        </footer>

      </div>

    </main>

  )
}