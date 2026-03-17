'use client'

import { useRouter, useParams } from "next/navigation"
import { useEffect } from "react"
import { supabase } from "../../../lib/supabase"

export default function ReadingTest() {

  const router = useRouter()
  const params = useParams()

  const testId = parseInt(params.id as string) || 1

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



const rawPlan = profile?.plan?.toLowerCase().trim()

const plan: Plan =
  rawPlan === "basic" ||
  rawPlan === "premium" ||
  rawPlan === "ultimate"
    ? rawPlan
    : "free"

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

  },[router, testId])

  return (

    <div className="w-screen h-screen flex flex-col bg-black overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-700 text-white">

        <h1 className="text-sm font-semibold">
          IELTS Reading Test {testId}
        </h1>

        <button
          onClick={() => router.push("/practice/reading")}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs"
        >
          Back to Tests
        </button>

      </div>

      {/* TEST */}
      <iframe
        src={`/tests/reading-test-${testId}.html`}
        className="w-full h-full border-0"
      />

    </div>

  )

}