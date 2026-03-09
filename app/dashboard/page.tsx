'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

  const router = useRouter()
  const [email,setEmail] = useState("")

  useEffect(()=>{

    const getUser = async () => {

      const { data } = await supabase.auth.getUser()

      if(!data.user){
        router.replace("/login")
      }else{
        setEmail(data.user.email || "")
      }

    }

    getUser()

  },[router])

  const logout = async () => {

    await supabase.auth.signOut()
    router.push("/login")

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* HEADER */}

      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold tracking-wide">
          IELTS Mock Test Platform
        </h1>

        <div className="flex items-center gap-6">

          <span className="text-gray-400 text-sm">
            {email}
          </span>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>

      </div>


      {/* MAIN */}

      <div className="max-w-6xl mx-auto mt-16 px-6">

        <h2 className="text-2xl font-semibold mb-10 text-center">
          Choose Your Practice
        </h2>


        <div className="grid md:grid-cols-3 gap-8">


          {/* READING */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition">

            <h3 className="text-xl font-semibold mb-4">
              Reading Practice
            </h3>

            <p className="text-gray-400 mb-6">
              Practice IELTS Academic Reading tests.
            </p>

            <button
              onClick={() => router.push("/practice/reading")}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition"
            >
              Start Reading
            </button>

          </div>


          {/* WRITING */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition">

            <h3 className="text-xl font-semibold mb-4">
              Writing Practice
            </h3>

            <p className="text-gray-400 mb-6">
              Practice Task 1 and Task 2 essays with AI evaluation.
            </p>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition"
            >
              Start Writing
            </button>

          </div>


          {/* SPEAKING */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition">

            <h3 className="text-xl font-semibold mb-4">
              Speaking Practice
            </h3>

            <p className="text-gray-400 mb-6">
              Answer IELTS speaking questions and record responses.
            </p>

            <button
              className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition"
            >
              Start Speaking
            </button>

          </div>


        </div>

      </div>

    </div>

  )
}