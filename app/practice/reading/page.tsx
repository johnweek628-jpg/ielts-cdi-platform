'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ReadingPractice() {

  const router = useRouter()

  const [subscription, setSubscription] = useState<string | null>(null)

  const tests = [
    { id: 1, title: "READING TEST 1" },
    { id: 2, title: "READING TEST 2" },
    { id: 3, title: "READING TEST 3" },
    { id: 4, title: "READING TEST 4" }
  ]

  useEffect(()=>{

    const getSubscription = async () => {

      const { data } = await supabase.auth.getUser()

      if(!data.user) return

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("email", data.user.email)
        .single()

      if(profile){
        setSubscription(profile.plan)
        localStorage.setItem("plan", profile.plan)
      }

    }

    getSubscription()

  },[])

  const handleClick = (id:number) => {

    if(id <= 2){
      router.push(`/practice/reading/${id}`)
    }else{

      if(subscription !== "free"){
        router.push(`/practice/reading/${id}`)
      }else{
        router.push("/pricing")
      }

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        IELTS Reading Tests
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {tests.map(test => {

          const isFree = subscription === "free"
          const isLocked = test.id > 2 && isFree

          return (

            <div
              key={test.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
            >

              {isLocked && (
                <span className="absolute top-3 right-3 text-xl">
                  🔒
                </span>
              )}

              <h2 className="text-xl font-semibold text-blue-900 mb-6">
                {test.title}
              </h2>

              <div className="flex justify-center">

                <button
                  onClick={() => {
                    if (isLocked) {
                      router.push("/pricing")
                    } else {
                      handleClick(test.id)
                    }
                  }}
                  className={`px-6 py-2 rounded-lg transition text-white
                  ${!isLocked
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {!isLocked ? "Start Test" : "Premium"}
                </button>

              </div>

            </div>

          )

        })}

      </div>

    </div>

  )
}