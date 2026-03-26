'use client'

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../../lib/supabase"

export default function ReadingTest() {

  const router = useRouter()
  const params = useParams()

  const testId = Number(params.id)

  const [started, setStarted] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(()=>{

    const checkLimit = async () => {

      let localPlan = "free"

      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("plan")
        if (stored) {
          localPlan = stored.toLowerCase().trim()
        }
      }

      const limits = {
        free: 0,
        basic: 10,
        premium: 30,
        ultimate: 100
      }

      if(testId > limits[localPlan as keyof typeof limits]){
        router.replace("/pricing")
        return
      }

      const { data } = await supabase.auth.getSession()

      if(!data.session){
        router.replace("/auth/login")
        return
      }

      const user = data.session.user

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("email", user.email)
        .single()

      type Plan = "free" | "basic" | "premium" | "ultimate"

      const rawPlan = profile?.plan?.toLowerCase().trim()

      const plan: Plan =
        rawPlan === "basic" ||
        rawPlan === "premium" ||
        rawPlan === "ultimate"
          ? rawPlan
          : "free"


      // ✅ ACCESS OK
      setAllowed(true)
      setChecking(false)
    }

    checkLimit()

  },[router, testId])

  // 🔒 loading
  if (checking) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!allowed) return null

  // 🔥 1. INSTRUCTION SCREEN
  if (!started) {
    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-200">

        <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full">

          <h1 className="text-xl font-bold text-black mb-4">
            IELTS Reading
          </h1>

          <p className="mb-4 text-black">
            Time: 60 minutes
          </p>

          <h2 className="font-bold text-black mt-6 mb-2">
            INSTRUCTIONS TO CANDIDATES
          </h2>

          <ul className="list-disc ml-5 mb-4 text-black">
            <li>Answer all the questions.</li>
            <li>You can change your answers at any time during the test.</li>
          </ul>

          <h2 className="font-bold text-black mt-6 mb-2">
            INFORMATION FOR CANDIDATES
          </h2>

          <ul className="list-disc ml-5 mb-6 text-black">
            <li>There are 40 questions in this test.</li>
            <li>Each question carries one mark.</li>
            <li>The test clock will show you when there are 10 and 5 minutes remaining.</li>
          </ul>

          <div className="flex justify-center mt-6">

            <button
              onClick={() => setStarted(true)}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
            >
              Start Test
            </button>

          </div>

        </div>

      </div>
    )
  }

  // 🔥 2. REAL TEST
  return (

    <div className="w-screen h-screen flex flex-col bg-black overflow-hidden">

      <iframe
        src={`/tests/reading-test-${testId}.html`}
        className="w-full h-full border-0"
      />

    </div>

  )

}