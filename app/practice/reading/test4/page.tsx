'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { supabase } from "../../../lib/supabase"

export default function ReadingTest4() {

  const router = useRouter()

  useEffect(()=>{

    const checkLimit = async () => {

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

const rawPlan = profile?.plan || "free"

const plan: Plan =
  rawPlan === "basic" ||
  rawPlan === "premium" ||
  rawPlan === "ultimate"
    ? rawPlan
    : "free"
       const testId = 4

      const limits = {
        free: 2,
        basic: 10,
        premium: 25,
        ultimate: 9999
      }

      if(testId > limits[plan]){
        router.replace("/pricing")
        return
      }

    }

    checkLimit()

  },[router])


  return (

    <div className="w-screen h-screen flex flex-col bg-black overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700 text-white flex-shrink-0">

        <h1 className="text-sm font-semibold tracking-wide">
          IELTS Reading Test 1
        </h1>

        <button
          onClick={() => router.push("/practice/reading")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs transition"
        >
          Back to Tests
        </button>

      </div>

      {/* TEST FRAME */}

      <div className="flex-1 w-full">

        <iframe
          src="/tests/reading-test-4.html"
          className="w-full h-full border-0"
        />

      </div>

    </div>

  )

}