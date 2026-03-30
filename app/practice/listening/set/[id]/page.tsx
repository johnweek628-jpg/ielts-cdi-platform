'use client'

import { useParams, useRouter } from "next/navigation"

export default function SetPage() {
  const params = useParams()
  const router = useRouter()

  const setId = Number(params.id)
  const tests = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-[#0f1623] px-6 py-8 font-sans">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 hover:text-white/60 transition-all duration-200"
        >
          ← Back
        </button>

        <div className="text-center">
          <div className="flex items-center gap-2 justify-center mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fc3a1]" />
            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#4fc3a1]">
              Listening
            </span>
          </div>
          <h1 className="text-xl font-semibold text-[#e8e0d0] tracking-tight">
            Practice Set {setId}
          </h1>
        </div>

        <div className="w-24" />
      </div>

      {/* PROGRESS */}
      <div className="flex items-center gap-4 mb-8 px-1">
        <span className="text-xs text-white/30 min-w-fit">Your progress</span>
        <div className="flex-1 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full w-[0%] bg-[#4fc3a1] rounded-full transition-all duration-500" />
        </div>
        <span className="text-xs text-white/30 min-w-fit">0 / 10</span>
      </div>

      {/* TEST GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tests.map((testNumber) => {
          const testId = setId + (testNumber - 1)

          return (
            <div
              key={testNumber}
              onClick={() => router.push(`/practice/listening/${testId}`)}
              className="
                group relative
                p-5 rounded-xl cursor-pointer
                bg-[#1a2235]
                border border-white/[0.06]
                hover:border-[#4fc3a1]/30
                hover:bg-[#1f2a40]
                hover:-translate-y-[2px]
                transition-all duration-200
                overflow-hidden
              "
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4fc3a1] to-[#2eab82] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Headphone icon */}
              <div className="w-8 h-8 rounded-lg bg-[#4fc3a1]/[0.08] flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-[#4fc3a1]" viewBox="0 0 16 16" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10V8a6 6 0 0 1 12 0v2" />
                  <rect x="1" y="10" width="3" height="4" rx="1.5" />
                  <rect x="12" y="10" width="3" height="4" rx="1.5" />
                </svg>
              </div>

              <div className="text-[10px] font-semibold tracking-[0.1em] uppercase text-white/20 mb-1">
                Test {String(testNumber).padStart(2, '0')}
              </div>
              <div className="text-[15px] font-medium text-[#d8d0c4] mb-1">
                Listening Practice
              </div>
              <div className="text-xs text-white/28 text-white/30">
                40 questions · ~30 min
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
