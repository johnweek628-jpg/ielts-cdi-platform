'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

// ─── Tiny sub-components ──────────────────────────────────────────────────────

function StatCard({ num, label }: { num: string; label: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
      <div className="text-xl font-extrabold text-red-500 tracking-tight font-['Sora']">
        {num}
      </div>
      <div className="text-[10px] text-gray-600 mt-0.5">{label}</div>
    </div>
  )
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled,
}: {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="
          w-full px-4 py-3 rounded-xl
          border border-gray-200 bg-gray-50
          text-sm text-gray-900 placeholder:text-gray-300
          focus:outline-none focus:border-gray-900 focus:bg-white
          disabled:opacity-50
          transition-all duration-150
        "
      />
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)
    setError(null)

    const { error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setLoading(false)
      setError(signUpError.message)
      return
    }

    // Auto-login after signup
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (loginError) {
      setError(loginError.message)
      return
    }

    router.replace("/dashboard")
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[880px] grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/80">

        {/* ── LEFT — brand panel ─────────────────────────────────────────── */}
        <div className="bg-[#0a0a0a] px-10 py-12 flex flex-col justify-between">
          {/* Logo */}
          <div className="text-[15px] font-bold tracking-tight text-white">
            IELTS <span className="text-red-500">CDI</span>
          </div>

          {/* Body */}
          <div className="py-10">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/25 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-red-500">
                Band 9 system
              </span>
            </div>

            <h2 className="text-3xl font-extrabold text-white leading-tight tracking-[-0.6px] mb-4">
              Your IELTS score,{" "}
              <span className="text-red-500">faster than ever</span>
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-[240px] mb-8">
              Real exam simulations, AI feedback, and smart progress tracking — all in one place.
            </p>

            <div className="flex gap-3">
              <StatCard num="6,500+" label="Students" />
              <StatCard num="94%"    label="Success rate" />
              <StatCard num="24/7"   label="AI feedback" />
            </div>
          </div>

          {/* Footer */}
          <div className="text-[11px] text-gray-700">
            © 2025 IELTS CDI Platform
          </div>
        </div>

        {/* ── RIGHT — form ───────────────────────────────────────────────── */}
        <div className="bg-white px-10 py-12 flex flex-col justify-center">
          <h1 className="text-2xl font-extrabold text-gray-950 tracking-[-0.5px] mb-1">
            Create your account
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Start improving your score in 30 seconds
          </p>

          <div className="flex flex-col gap-4">
            <Field
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              disabled={loading}
            />
            <Field
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={setPassword}
              disabled={loading}
            />
          </div>

          {/* Inline error */}
          {error && (
            <p className="mt-3 text-[12px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="
              mt-5 w-full py-3 rounded-xl
              bg-gray-950 hover:bg-gray-800
              text-white text-sm font-semibold
              transition-all duration-150
              active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed
              shadow-lg shadow-gray-900/10
            "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Creating account…
              </span>
            ) : (
              "Create account →"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              border border-gray-200 bg-white hover:bg-gray-50
              text-sm font-medium text-gray-700
              flex items-center justify-center gap-2.5
              transition-all duration-150 active:scale-[0.98]
              disabled:opacity-50
            "
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-7">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="text-red-500 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>

          <div className="flex justify-center gap-5 mt-4">
            {["Free to start", "No card needed", "Cancel anytime"].map((t) => (
              <span key={t} className="text-[10px] text-gray-300 flex items-center gap-1">
                <span className="text-green-500 font-bold">✓</span> {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
