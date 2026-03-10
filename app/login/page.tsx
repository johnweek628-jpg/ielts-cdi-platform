'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const [step,setStep] = useState(1)
  const [email,setEmail] = useState("")
  const [code,setCode] = useState(["","","","",""])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  const sendEmail = async () => {

    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email
    })

    setLoading(false)

    if(error){
      alert(error.message)
    }else{
      setStep(2)
    }

  }

  const verifyCode = async () => {

    const token = code.join("")

    setLoading(true)

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email"
    })

    if(error){

      setError(true)
      setLoading(false)

    }else{

      setError(false)

      router.push("/dashboard")

    }

  }

  const handleChange = (value:string,index:number) => {

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError(false)

  }

  return (

    <div className="flex items-center justify-center h-screen bg-black text-white">

      <div className="bg-gray-900 p-10 rounded-2xl w-96 text-center">

        {step === 1 && (

          <>

            <h1 className="text-2xl font-semibold mb-6">
              Thank you for choosing us!
            </h1>

            <p className="text-gray-400 mb-6">
              Please write your e-mail here
            </p>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 rounded bg-black border border-gray-600 mb-6"
            />

            <button
              onClick={sendEmail}
              className="w-full bg-red-600 py-3 rounded-lg"
            >
              {loading ? "Sending..." : "Continue"}
            </button>

          </>

        )}

        {step === 2 && (

          <>

            <h1 className="text-xl font-semibold mb-6">
              We have sent a code to your e-mail
            </h1>

            <div className="flex justify-between mb-6">

              {code.map((digit,index)=>(

                <input
                  key={index}
                  maxLength={1}
                  value={digit}
                  onChange={(e)=>handleChange(e.target.value,index)}
                  className={`w-12 h-12 text-center text-xl rounded bg-black border ${
                    error ? "border-red-500" : "border-gray-600"
                  }`}
                />

              ))}

            </div>

            {error && (

              <p className="text-red-500 mb-4">
                We didn't send you this code.
              </p>

            )}

            <button
              onClick={verifyCode}
              className="w-full bg-blue-600 py-3 rounded-lg"
            >
              {loading ? "Checking..." : "Verify"}
            </button>

          </>

        )}

      </div>

    </div>

  )

}