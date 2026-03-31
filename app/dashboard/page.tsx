'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase"

// ─── Types ───────────────────────────────────────────────────────────────────
type Plan = "free" | "premium" | "ultimate"

// ─── Data ────────────────────────────────────────────────────────────────────
const MODULES = [
  {
    icon: "📚",
    title: "Reading",
    desc: "Academic passages with timed scoring.",
    color: "blue",
    href: "/practice/reading",
  },
  {
    icon: "✍️",
    title: "Writing",
    desc: "Task 1 & 2 with AI band evaluation.",
    color: "purple",
    href: "/practice/writing",
  },
  {
    icon: "🎤",
    title: "Speaking",
    desc: "Record answers and get instant feedback.",
    color: "green",
    href: "/practice/speaking",
  },
  {
    icon: "🎧",
    title: "Listening",
    desc: "Real CDI audio tests with answer keys.",
    color: "orange",
    href: "/practice/listening",
  },
] as const

const QUICK_LINKS = [
  { icon: "📝", label: "Full Mock Exam",      sub: "All 4 sections, timed",       href: "/mock" },
  { icon: "⭐", label: "Band 9 Samples",       sub: "Annotated model answers",     href: "/samples" },
] as const

const RESOURCES = [
  { icon: "📖", label: "Vocabulary Builder",  href: "/vocabulary" },
  { icon: "📦", label: "Prep Materials",       href: "/materials" },
  { icon: "📊", label: "My Full Progress",     href: "/progress" },
  { icon: "🎓", label: "Instructor Tips",      href: "/tips" },
] as const

const PLAN_CHIP: Record<Plan, string> = {
  free:     "bg-green-100 text-green-700",
  premium:  "bg-blue-100 text-blue-700",
  ultimate: "bg-purple-100 text-purple-700",
}

const MODULE_STYLES: Record<string, { wrapper: string; icon: string; btn: string; top: string }> = {
  blue:   { wrapper: "hover:border-blue-200 hover:shadow-blue-50",   icon: "bg-blue-50",   btn: "bg-blue-50 text-blue-700 hover:bg-blue-500 hover:text-white",   top: "bg-blue-500"   },
  purple: { wrapper: "hover:border-purple-200 hover:shadow-purple-50", icon: "bg-purple-50", btn: "bg-purple-50 text-purple-700 hover:bg-purple-500 hover:text-white", top: "bg-purple-500" },
  green:  { wrapper: "hover:border-green-200 hover:shadow-green-50", icon: "bg-green-50",  btn: "bg-green-50 text-green-700 hover:bg-green-500 hover:text-white",  top: "bg-green-500"  },
  orange: { wrapper: "hover:border-orange-200 hover:shadow-orange-50", icon: "bg-orange-50", btn: "bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white", top: "bg-orange-500" },
}

const SKILL_PROGRESS = [
  { label: "Reading",   pct: 72, color: "bg-blue-500" },
  { label: "Listening", pct: 65, color: "bg-orange-500" },
  { label: "Writing",   pct: 58, color: "bg-purple-500" },
  { label: "Speaking",  pct: 80, color: "bg-green-500" },
]

// ─── Nav item ─────────────────────────────────────────────────────────────────
function NavItem({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
        active
          ? "bg-red-50 text-red-500 font-semibold"
          : "text-gray-400 hover:bg-red-50 hover:text-red-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          active ? "bg-red-500" : "bg-current opacity-40"
        }`}
      />
      {label}
    </button>
  )
}

// ─── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  valueClass = "text-gray-900",
}: {
  label: string
  value: string | number
  sub: string
  valueClass?: string
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-red-100 hover:shadow-lg hover:shadow-red-50/50 transition-all duration-200">
      <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-gray-300 mb-2">
        {label}
      </div>
      <div className={`text-[26px] font-extrabold tracking-tight leading-none ${valueClass}`}>
        {value}
      </div>
      <div className="text-[11px] text-gray-400 mt-1.5">{sub}</div>
    </div>
  )
}

// ─── Module card ─────────────────────────────────────────────────────────────
function ModuleCard({
  icon,
  title,
  desc,
  color,
  href,
  router,
}: (typeof MODULES)[number] & { router: ReturnType<typeof useRouter> }) {
  const s = MODULE_STYLES[color]
  return (
    <div
      onClick={() => router.push(href)}
      className={`bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer transition-all duration-200 relative overflow-hidden group ${s.wrapper} hover:shadow-md hover:-translate-y-0.5`}
    >
      {/* colour top bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${s.top} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
      />
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl ${s.icon} flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <span className="text-gray-200 text-lg group-hover:translate-x-0.5 group-hover:text-gray-400 transition-all duration-150">
          ›
        </span>
      </div>
      <div className="text-[14px] font-bold text-gray-900 mb-1">{title}</div>
      <div className="text-[11px] text-gray-400 leading-relaxed">{desc}</div>
      <button
        className={`mt-3.5 px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-150 ${s.btn}`}
        onClick={(e) => { e.stopPropagation(); router.push(href) }}
      >
        Start →
      </button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter()

  const [email, setEmail]     = useState("")
  const [plan, setPlan]       = useState<Plan>("free")
  const [loading, setLoading] = useState(true)
  const [stats, setStats]     = useState({ tests: 0, band: 0, time: 0, accuracy: 0 })

  useEffect(() => {
    const checkAccess = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) { router.replace("/auth/login"); return }

      const user = data.session.user
      setEmail(user.email ?? "")

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan")
        .eq("email", user.email)
        .single()

      if (profile?.plan) setPlan(profile.plan.toLowerCase().trim() as Plan)

      const { data: results } = await supabase
        .from("test_results")
        .select("*")
        .eq("user_id", user.id)

      const count     = results?.length ?? 0
      const avgBand   = count ? results!.reduce((a, b) => a + b.score, 0) / count : 0
      const totalTime = results?.reduce((a, b) => a + b.time_spent, 0) ?? 0
      const correct   = results?.reduce((a, b) => a + b.correct_answers, 0) ?? 0
      const total     = results?.reduce((a, b) => a + b.total_questions, 0) ?? 0
      const accuracy  = total ? (correct / total) * 100 : 0

      setStats({
        tests:    count,
        band:     Number(avgBand.toFixed(1)),
        time:     Math.floor(totalTime / 3600),
        accuracy: Number(accuracy.toFixed(0)),
      })
      setLoading(false)
    }
    checkAccess()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace("/auth/login")
  }

  const firstName = email.split("@")[0] ?? "there"
  const today     = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f8f6]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-medium">Loading your dashboard…</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen bg-[#f8f8f6] text-gray-900"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col py-5 px-3 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-[30px] h-[30px] bg-red-500 rounded-lg flex items-center justify-center text-sm">
            🎓
          </div>
          <span className="text-[15px] font-extrabold tracking-tight">
            IELTS <span className="text-red-500">CDI</span>
          </span>
        </div>

        {/* Nav */}
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 px-2 mb-1">Main</p>
        <NavItem label="Dashboard"    active onClick={() => {}} />
        <NavItem label="My Progress"  onClick={() => router.push("/progress")} />
        <NavItem label="Mock Tests"   onClick={() => router.push("/mock")} />

        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 px-2 mt-4 mb-1">Practice</p>
        <NavItem label="Reading"      onClick={() => router.push("/practice/reading")} />
        <NavItem label="Listening"    onClick={() => router.push("/practice/listening")} />
        <NavItem label="Writing"      onClick={() => router.push("/practice/writing")} />
        <NavItem label="Speaking"     onClick={() => router.push("/practice/speaking")} />

        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-300 px-2 mt-4 mb-1">Resources</p>
        <NavItem label="Band 9 Samples"   onClick={() => router.push("/samples")} />
        <NavItem label="Vocabulary"       onClick={() => router.push("/vocabulary")} />
        <NavItem label="Materials"        onClick={() => router.push("/materials")} />

        {/* User */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {email[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="text-left min-w-0">
              <div className="text-[12px] font-semibold text-gray-800 truncate">{firstName}</div>
              <div className="text-[10px] text-gray-400 truncate">{plan} plan · sign out</div>
            </div>
          </button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-7 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-[15px] font-bold text-gray-900">Dashboard</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${PLAN_CHIP[plan]}`}>
              {plan}
            </span>
            {plan === "free" && (
              <button
                onClick={() => router.push("/pricing")}
                className="bg-red-500 hover:bg-red-600 active:scale-[0.97] text-white text-[12px] font-bold px-4 py-1.5 rounded-lg transition-all duration-150"
              >
                Upgrade →
              </button>
            )}
            <button
              onClick={logout}
              className="text-[12px] text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-300 px-3.5 py-1.5 rounded-lg transition-all"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 p-7 overflow-y-auto">

          {/* Welcome Banner */}
          <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[19px] font-extrabold tracking-tight text-gray-950">
                Welcome back, {firstName} 👋
              </h2>
              <p className="text-[13px] text-gray-400 mt-1">
                You're on track — keep practising to hit Band 7.0
              </p>
            </div>
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-red-500">
                {stats.tests} sessions completed
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <StatCard
              label="Tests Taken"
              value={stats.tests}
              sub="+3 this week"
            />
            <StatCard
              label="Avg Band Score"
              value={stats.band || "—"}
              sub="Target: 7.0"
              valueClass="text-red-500"
            />
            <StatCard
              label="Accuracy"
              value={`${stats.accuracy}%`}
              sub="↑ 4% from last week"
              valueClass="text-green-600"
            />
            <StatCard
              label="Study Hours"
              value={`${stats.time}h`}
              sub="This month"
              valueClass="text-blue-600"
            />
          </div>

          {/* Body layout */}
          <div className="grid grid-cols-[1fr_248px] gap-4">

            {/* Left column */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-gray-300 mb-3">
                Practice Modules
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {MODULES.map((m) => (
                  <ModuleCard key={m.title} {...m} router={router} />
                ))}
              </div>

              <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-gray-300 mb-3">
                Quick Access
              </p>
              <div className="grid grid-cols-2 gap-3">
                {QUICK_LINKS.map((q) => (
                  <div
                    key={q.label}
                    onClick={() => router.push(q.href)}
                    className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-red-100 hover:shadow-md hover:shadow-red-50/50 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="text-[16px] mb-2">{q.icon}</div>
                    <div className="text-[13px] font-bold text-gray-900">{q.label}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{q.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-3">

              {/* Skill Progress */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <p className="text-[10px] font-bold tracking-[0.09em] uppercase text-gray-300 mb-4">
                  Skill Progress
                </p>
                {SKILL_PROGRESS.map((s) => (
                  <div key={s.label} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-[11px] mb-1.5">
                      <span className="font-semibold text-gray-700">{s.label}</span>
                      <span className="text-gray-400">{s.pct}%</span>
                    </div>
                    <div className="h-[5px] bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${s.color}`}
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4">
                <p className="text-[10px] font-bold tracking-[0.09em] uppercase text-gray-300 mb-3">
                  Resources
                </p>
                {RESOURCES.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => router.push(r.href)}
                    className="w-full flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-b-0 hover:text-red-500 transition-colors text-left group"
                  >
                    <span className="text-[13px] w-[18px]">{r.icon}</span>
                    <span className="text-[12px] font-medium text-gray-600 group-hover:text-red-500 transition-colors">
                      {r.label}
                    </span>
                    <span className="ml-auto text-[11px] text-gray-200 group-hover:text-red-300 transition-colors">
                      ›
                    </span>
                  </button>
                ))}
              </div>

              {/* Upgrade card — only shown on free plan */}
              {plan === "free" && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                  <p className="text-[13px] font-bold text-gray-900 mb-1">
                    Upgrade to Premium
                  </p>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                    Unlock AI writing feedback, speaking practice, and full mock exams.
                  </p>
                  <button
                    onClick={() => router.push("/pricing")}
                    className="w-full bg-red-500 hover:bg-red-600 active:scale-[0.97] text-white text-[12px] font-bold py-2.5 rounded-xl transition-all duration-150"
                  >
                    Upgrade now →
                  </button>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
