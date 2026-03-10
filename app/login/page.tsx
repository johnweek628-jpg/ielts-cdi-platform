'use client'

import { useState, useRef, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const [step,setStep] = useState(1)
  const [email,setEmail] = useState("")
  const [code,setCode] = useState(["","","","","","","",""])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(()=>{

    if(step === 2){
      inputs.current[0]?.focus()
    }

  },[step])

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

    if(!/^[0-9]?$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError(false)

    if(value && index < 7){
      inputs.current[index+1]?.focus()
    }

  }

  const handleKeyDown = (e:any,index:number) => {

    if(e.key === "Backspace" && !code[index] && index > 0){
      inputs.current[index-1]?.focus()
    }

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
                  ref={(el) => { inputs.current[index] = el }}
                  maxLength={1}
                  value={digit}
                  onChange={(e)=>handleChange(e.target.value,index)}
                  onKeyDown={(e)=>handleKeyDown(e,index)}
                  className={`w-10 h-12 text-center text-xl rounded bg-black border ${
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