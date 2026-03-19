'use client'

import { useParams, useRouter } from "next/navigation"

export default function SetPage() {

  const params = useParams()
  const router = useRouter()

  const setId = Number(params.id)

  // 🔥 FIX: har package ichida faqat 1–10
  const tests = Array.from({ length: 10 }, (_, i) => i + 1)

  return (

    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100">

      {/* 🔝 HEADER */}
      <div className="flex items-center justify-between mb-10">

        <button
          onClick={() => router.push('/practice/reading')}
          className="
            px-4 py-2 rounded-xl
            bg-white/40 backdrop-blur-xl
            border border-white/30
            shadow-md
            hover:scale-105 transition
          "
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Practice {setId}
        </h1>

        <div />

      </div>

      {/* 📊 OPTIONAL PROGRESS */}
      <div className="mb-8">

        <div className="text-sm text-gray-600 mb-2">
          Progress: 0 / 10
        </div>

        <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden backdrop-blur">
          <div className="h-full w-[0%] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        </div>

      </div>

      {/* 🧊 TEST GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {tests.map((testNumber) => {

          // 🔥 GLOBAL mapping (bu muhim)
          const realTestId = (setId - 1) * 10 + testNumber

          return (

            <div
              key={testNumber}
              onClick={() => router.push(`/practice/reading/${realTestId}`)}
              className="
                relative
                p-6
                rounded-2xl
                cursor-pointer
                transition-all duration-300

                bg-white/40
                backdrop-blur-xl
                border border-white/30

                shadow-[0_8px_30px_rgba(0,0,0,0.12)]

                hover:scale-[1.04]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]

                active:scale-[0.96]
              "
            >

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 pointer-events-none" />

              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                Test {testNumber}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                IELTS Reading Practice
              </p>

            </div>

          )

        })}

      </div>

    </div>
  )
}