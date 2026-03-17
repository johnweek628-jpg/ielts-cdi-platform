'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { supabase } from "../../../lib/supabase"

export default function ReadingTest1() {

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
      .eq("id", user.id)
      .single()

      const plan = profile?.plan || "free"

      // FREE USER faqat 2 ta reading test
      if(plan === "free"){
        const allowedTests = ["/practice/reading/test1","/practice/reading/test2"]

        const current = window.location.pathname

        if(!allowedTests.includes(current)){
          alert("Upgrade your plan to access more reading tests")
          router.push("/pricing")
        }
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
          src="/tests/reading-test-3.html"
          className="w-full h-full border-0"
        />

      </div>

    </div>

  )

}