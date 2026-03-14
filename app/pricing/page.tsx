'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {

const router = useRouter()


// STRIPE PAYMENT

const buyPlan = async (plan:string) => {

const res = await fetch("/api/stripe/checkout",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({plan})
})

const data = await res.json()

window.location.href = data.url

}


// CLICK PAYMENT

const payClick = () => {

window.location.href =
"https://my.click.uz/services/pay?service_id=XXXX"

}


return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-4xl font-extrabold text-center mb-12 text-black">
Choose your plan
</h1>

<div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">


{/* FREE */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold mb-3 text-black">
Starter
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$0
</p>

<button
onClick={()=>router.push("/dashboard")}
className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
>
Start Free
</button>

</div>



{/* BASIC */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold mb-3 text-black">
Basic
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$9
</p>

<button
onClick={()=>buyPlan("pro")}
className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
>
Pay with Card
</button>

<button
onClick={payClick}
className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg"
>
Pay with Click
</button>

</div>



{/* PREMIUM */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-2xl font-bold mb-3 text-black">
Premium
</h2>

<p className="text-4xl font-extrabold mb-6 text-black">
$19
</p>

<button
onClick={()=>buyPlan("premium")}
className="bg-black text-white px-6 py-2 rounded-lg font-semibold"
>
Pay with Card
</button>

</div>



{/* ULTIMATE */}

<div className="bg-black p-8 rounded-xl shadow text-center text-white">

<h2 className="text-2xl font-bold mb-3">
Ultimate
</h2>

<p className="text-4xl font-extrabold mb-6">
$29
</p>

<button
onClick={()=>buyPlan("ultimate")}
className="bg-white text-black px-6 py-2 rounded-lg font-bold"
>
Get Unlimited
</button>

</div>


</div>

</div>

)

}