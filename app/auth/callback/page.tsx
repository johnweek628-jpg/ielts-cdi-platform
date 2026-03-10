'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function CallbackPage() {

const router = useRouter()

useEffect(()=>{

const { data: listener } = supabase.auth.onAuthStateChange(
(event,session)=>{

if(event==="SIGNED_IN" && session){
router.replace("/dashboard")
}

})

return ()=>{

listener.subscription.unsubscribe()

}

},[router])

return(
<div style={{padding:40}}>
Signing you in...
</div>
)

}