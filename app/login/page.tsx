'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Login() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/callback"
      }
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {

      // ⚡ USER EMAILNI SAQLAYMIZ
      localStorage.setItem("userEmail", email)

      alert("Check your email for login link")

    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-black text-white">

      <h1 className="text-3xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        className="border border-gray-600 bg-black p-3 rounded w-72"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Sending..." : "Send login link"}
      </button>

    </div>
  )
}