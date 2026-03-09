'use client'

import { useRouter } from "next/navigation"

export default function ReadingPractice() {

  const router = useRouter()

  const tests = [
    { id: 1, title: "Evolution of the Calculator" },
    { id: 2, title: "Sleeping on the Job" },
    { id: 3, title: "The History of Ice Cream" },
    { id: 4, title: "Gobekli Tepe Discovery" }
  ]

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-10">
        IELTS Reading Tests
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {tests.map(test => (

          <div
            key={test.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-semibold mb-4">
              {test.title}
            </h2>

            <button
              onClick={() =>
                router.push(`/practice/reading/test${test.id}`)
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Start Test
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}