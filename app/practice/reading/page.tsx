'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ReadingPractice() {

  const router = useRouter()

  const [subscription,setSubscription] = useState("free")

  const tests = [
    { id: 1, title: "READING TEST 1" },
    { id: 2, title: "READING TEST 2" },
    { id: 3, title: "READING TEST 3" },
    { id: 4, title: "READING TEST 4" }
  ]

  useEffect(()=>{

    const getSubscription = async () => {

      const { data } = await supabase.auth.getSession()

      const session = data.session

      if(!session) return

      const userSubscription =
        session.user.user_metadata?.subscription || "free"

      setSubscription(userSubscription)

    }

    getSubscription()

  },[])

  const handleClick = (id:number) => {

    if(id <= 2){
      router.push(`/practice/reading/test${id}`)
    }else{

      if(subscription === "premium" || subscription === "ultimate"){
        router.push(`/practice/reading/test${id}`)
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

        {tests.map(test => (

          <div
            key={test.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
          >

            {/* LOCK ICON */}

            {test.id > 2 && subscription === "free" && (
              <span className="absolute top-3 right-3 text-xl">
                🔒
              </span>
            )}

            <h2 className="text-xl font-semibold text-blue-900 mb-6">
              {test.title}
            </h2>

            <div className="flex justify-center">

              <button
                onClick={() => handleClick(test.id)}
                className={`px-6 py-2 rounded-lg transition text-white
                ${test.id <= 2 || subscription !== "free"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {test.id <= 2 || subscription !== "free"
                  ? "Start Test"
                  : "Premium"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}