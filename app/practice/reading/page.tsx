'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ReadingPractice() {

  const router = useRouter()

  const [subscription, setSubscription] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("plan") || "free"
    }
    return "free"
  })

  const [loading, setLoading] = useState(true)

  const limits = {
    free: 0,
    basic: 10,
    premium: 30,
    ultimate: 100
  }

  const currentLimit = limits[(subscription as keyof typeof limits) || "free"]

  const sets = [
    {
      name: "Set 1",
      packs: [
        { name: "Test Package 1", range: [1, 10] },
        { name: "Test Package 2", range: [11, 20] },
        { name: "Test Package 3", range: [21, 30] }
      ]
    },
    {
      name: "Set 2",
      packs: [
        { name: "Test Package 4", range: [31, 40] },
        { name: "Test Package 5", range: [41, 50] },
        { name: "Test Package 6", range: [51, 60] }
      ]
    },
    {
      name: "Set 3",
      packs: [
        { name: "Test Package 7", range: [61, 70] },
        { name: "Test Package 8", range: [71, 80] }
      ]
    }
  ]

  useEffect(() => {

    const getSubscription = async () => {

      const { data } = await supabase.auth.getUser()

      if (!data.user) return

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("email", data.user.email)
        .single()

      if (profile) {
        setSubscription(profile.plan)
        localStorage.setItem("plan", profile.plan)
      }

    }

    getSubscription()

  }, [])

  const handleClick = (id: number) => {
    if (id <= currentLimit) {
      router.push(`/practice/reading/set/${id}`)
    } else {
      router.push("/pricing")
    }
  }

if (loading) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      Loading...
    </div>
  )
}

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        IELTS Reading Tests
      </h1>

      {sets.map((set, i) => (

        <div key={i} className="mb-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {set.name}
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {set.packs.map((pack, j) => {

              const isLocked = pack.range[0] > currentLimit

              return (

                <div
                  key={j}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
                >

                  {isLocked && (
                    <span className="absolute top-3 right-3 text-xl">
                      🔒
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    {pack.name}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    Tests {pack.range[0]} – {pack.range[1]}
                  </p>

                  {isLocked && (
                    <p className="text-sm text-gray-500 mb-2">
                      🔒 Unlock with Pro
                    </p>
                  )}

                  <div className="flex justify-center">

                    <button
                      onClick={() => {
                        if (isLocked) {
                          router.push("/pricing")
                        } else {
                          handleClick(pack.range[0])
                        }
                      }}
                      className={`px-6 py-2 rounded-lg text-white transition
                      ${!isLocked
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gradient-to-r from-purple-500 to-red-500"
                      }`}
                    >
                      {!isLocked ? "Open Package" : "Unlock"}
                    </button>

                  </div>

                </div>

              )

            })}

          </div>

        </div>

      ))}

    </div>

  )
}