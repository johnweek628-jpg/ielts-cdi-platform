import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {

  try {
    const { userId } = await req.json()

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // 🔴 1. PROFILES DELETE
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId)

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), { status: 500 })
    }

    // 🔴 2. SUBSCRIPTIONS DELETE
    const { error: subError } = await supabaseAdmin
      .from("subscriptions")
      .delete()
      .eq("user_id", userId)

    if (subError) {
      return new Response(JSON.stringify({ error: subError.message }), { status: 500 })
    }

    // 🔴 3. AUTH DELETE (ENG MUHIM JOY)
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId, false)

    if (deleteError) {
      return new Response(JSON.stringify({ error: deleteError.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}