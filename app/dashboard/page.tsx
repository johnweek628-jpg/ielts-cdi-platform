'use client'

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

  const [email,setEmail] = useState("")
  const [user,setUser] = useState<any>(null)
  const [showSignupWarning,setShowSignupWarning] = useState(false)

  useEffect(()=>{

    const getUser = async () => {

      const { data } = await supabase.auth.getUser()

      if(data.user){
        setUser(data.user)
        setEmail(data.user.email || "")
      }

    }

    getUser()

  },[])

  const handleClick = () => {

    if(!user){
      setShowSignupWarning(true)
    }

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">

      {/* SIGN UP WARNING MODAL */}

      {showSignupWarning && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">

          <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl text-center max-w-md">

            <h2 className="text-xl font-semibold mb-4">
              First, sign up for free to use our platform
            </h2>

            <p className="text-gray-400 text-sm">
              Please click the Sign Up button above to create your free account.
            </p>

          </div>

        </div>

      )}

      {/* HEADER */}

      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800">

        <h1 className="text-3xl font-bold tracking-wide">
          IELTS Mock Test Platform
        </h1>

        {user && (

          <span className="text-gray-400 text-sm">
            {email}
          </span>

        )}

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

            {user ? (

              <a
                href="/practice/reading"
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition block text-center"
              >
                Start Reading
              </a>

            ) : (

              <button
                onClick={handleClick}
                className="w-full bg-blue-600 py-3 rounded-lg font-medium"
              >
                Start Reading
              </button>

            )}

          </div>


          {/* WRITING */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition">

            <h3 className="text-xl font-semibold mb-4">
              Writing Practice
            </h3>

            <p className="text-gray-400 mb-6">
              Practice Task 1 and Task 2 essays with AI evaluation.
            </p>

            {user ? (

              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition">
                Start Writing
              </button>

            ) : (

              <button
                onClick={handleClick}
                className="w-full bg-purple-600 py-3 rounded-lg font-medium"
              >
                Start Writing
              </button>

            )}

          </div>


          {/* SPEAKING */}

          <div className="bg-gray-900 p-8 rounded-2xl shadow-xl hover:scale-105 transition">

            <h3 className="text-xl font-semibold mb-4">
              Speaking Practice
            </h3>

            <p className="text-gray-400 mb-6">
              Answer IELTS speaking questions and record responses.
            </p>

            {user ? (

              <button className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition">
                Start Speaking
              </button>

            ) : (

              <button
                onClick={handleClick}
                className="w-full bg-green-600 py-3 rounded-lg font-medium"
              >
                Start Speaking
              </button>

            )}

          </div>

        </div>

      </div>

    </div>

  )

}