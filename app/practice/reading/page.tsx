'use client'

import { useRouter } from "next/navigation"

export default function ReadingPractice() {

  const router = useRouter()

  const tests = [
    { id: 1, title: "READING TEST 1" },
    { id: 2, title: "READING TEST 2" },
    { id: 3, title: "READING TEST 3" },
    { id: 4, title: "READING TEST 4" }
  ]

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        IELTS Reading Tests
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {tests.map(test => (

          <div
            key={test.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >

            <h2 className="text-xl font-semibold text-blue-900 mb-6">
              {test.title}
            </h2>

            <div className="flex justify-center">
              <button
                onClick={() =>
                  router.push(`/practice/reading/test${test.id}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Start Test
              </button>
            </div>

          </div>

        ))}

      </div>

    </div>

  )
}