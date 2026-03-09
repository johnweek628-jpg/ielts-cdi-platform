'use client'

import { useRouter } from "next/navigation"

export default function ReadingTest1() {

  const router = useRouter()

  return (

    <div className="w-full h-screen flex flex-col bg-black">

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 text-white">

        <h1 className="text-lg font-semibold">
          IELTS Reading Test 1
        </h1>

        <button
          onClick={() => router.push("/practice/reading")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm"
        >
          Back to Tests
        </button>

      </div>

      {/* TEST FRAME */}

      <div className="flex-1">

        <iframe
          src="/tests/reading-test.html"
          className="w-full h-full border-none"
        />

      </div>

    </div>

  )
}