'use client'

import { useRouter, useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { supabase } from "../../../lib/supabase"
import { injectTestCapture } from "../../../lib/injectTestCapture"

export default function ListeningTest() {

  const router = useRouter()
  const params = useParams()
  const testId = Number(params.id)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [started, setStarted]   = useState(false)
  const [allowed, setAllowed]   = useState(false)
  const [checking, setChecking] = useState(true)
  const [saving, setSaving]     = useState(false)

  // ─── Access check ────────────────────────────────────────────────────
  useEffect(() => {
    const checkLimit = async () => {
      let localPlan = "free"
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("plan")
        if (stored) localPlan = stored.toLowerCase().trim()
      }

      const getPackageAccess = (id: number, plan: string) => {
        const pkg = Math.ceil(id / 10)
        if (plan === "free")     return false
        if (plan === "basic")    return pkg === 1
        if (plan === "premium")  return pkg <= 2
        if (plan === "ultimate") return true
        return false
      }

      if (!getPackageAccess(testId, localPlan)) {
        router.replace("/pricing")
        return
      }

      const { data } = await supabase.auth.getSession()
      if (!data.session) { router.replace("/auth/login"); return }

      setAllowed(true)
      setChecking(false)
    }
    checkLimit()
  }, [router, testId])

  // ─── Listen for TEST_COMPLETE from iframe ─────────────────────────────
  useEffect(() => {
    if (!started) return

    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type !== "TEST_COMPLETE") return

      const score = event.data.score ?? null
      setSaving(true)

      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user?.id

      if (userId) {
        await supabase.from("test_results").upsert(
          {
            user_id:      userId,
            test_type:    "listening",
            test_id:      testId,
            score:        score,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,test_type,test_id" }
        )
      }

      const packageStart = Math.floor((testId - 1) / 10) * 10 + 1
      router.push(`/practice/listening/set/${packageStart}`)
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [started, testId, router])

  // ─── Inject capture script once iframe loads ──────────────────────────
  const handleIframeLoad = () => {
    injectTestCapture(iframeRef.current)
  }

  // ─── Loading ──────────────────────────────────────────────────────────
  if (checking) return (
    <div className="w-screen h-screen flex items-center justify-center">
      Loading...
    </div>
  )

  if (!allowed) return null

  // ─── Saving overlay ───────────────────────────────────────────────────
  if (saving) return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <p className="text-lg font-medium text-gray-800 mb-2">Saving your result...</p>
        <p className="text-sm text-gray-500">You'll be redirected in a moment.</p>
      </div>
    </div>
  )

  // ─── Instructions ─────────────────────────────────────────────────────
  if (!started) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-xl font-bold text-black mb-4">IELTS Listening</h1>
        <h2 className="font-bold text-black mt-6 mb-2">INSTRUCTIONS TO CANDIDATES</h2>
        <ul className="list-disc ml-5 mb-4 text-black">
          <li>Answer all the questions.</li>
          <li>You can change your answers at any time during the test.</li>
        </ul>
        <h2 className="font-bold text-black mt-6 mb-2">INFORMATION FOR CANDIDATES</h2>
        <ul className="list-disc ml-5 mb-6 text-black">
          <li>There are 40 questions in this test.</li>
          <li>Each question carries one mark.</li>
        </ul>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setStarted(true)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  )

  // ─── Test iframe ──────────────────────────────────────────────────────
  return (
    <div className="w-screen h-screen flex flex-col bg-black overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`/tests/listening-test-${testId}.html`}
        className="w-full h-full border-0"
        onLoad={handleIframeLoad}
      />
    </div>
  )
}
