'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ListeningPractice() {

  const router = useRouter()

  const [subscription, setSubscription] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("plan") || "free"
    }
    return "free"
  })

  const limits = {
    free: 0,
    basic: 10,
    premium: 30,
    ultimate: 100
  }

  const currentLimit = limits[(subscription as keyof typeof limits) || "free"]

const generateSets = () => {
  const sets = []
  let testNumber = 1

  for (let s = 1; s <= 10; s++) { // nechta set bo‘lishini xohlasang oshir
    const packs = []

    for (let p = 1; p <= 3; p++) {
      packs.push({
        name: `Test Package ${((s - 1) * 3) + p}`,
        range: [testNumber, testNumber + 9]
      })
      testNumber += 10
    }

    sets.push({
      name: `Set ${s}`,
      packs
    })
  }

  return sets
}

const sets = generateSets()   

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
      router.push(`/practice/listening/set/${id}`)
    } else {
      router.push("/pricing")
    }
  }

  
  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        IELTS Listening Tests
      </h1>

      {sets.map((set, i) => (

        <div key={i} className="mb-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {set.name}
          </h2>

          <div className="grid grid-cols-3 gap-6">

            {set.packs.map((pack, j) => {

              const isUnlocked = (() => {
  const plan = (subscription || "free").toLowerCase()

  // free → hammasi lock
  if (plan === "free") return false

  // basic → faqat Set 1, Package 1
  if (plan === "basic") {
    return set.name === "Set 1" && pack.name === "Test Package 1"
  }

  // premium → Set 1, Package 1 & 2
  if (plan === "premium") {
    return (
      set.name === "Set 1" &&
      (pack.name === "Test Package 1" ||
       pack.name === "Test Package 2")
    )
  }

  // ultimate → hammasi ochiq
  if (plan === "ultimate") return true

  return false
})()

const isLocked = !isUnlocked

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
                          router.push(`/practice/listening/set/${pack.range[0]}`)
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