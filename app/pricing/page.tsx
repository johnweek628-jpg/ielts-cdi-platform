'use client'

import { useRouter } from "next/navigation"

export default function Pricing() {

const router = useRouter()

return (

<div className="min-h-screen bg-gray-100 p-10">

<h1 className="text-3xl font-bold text-center mb-10">
Choose your plan
</h1>

<div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">

{/* FREE */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-xl font-bold mb-4">
Free
</h2>

<p className="text-3xl font-bold mb-4">
$0
</p>

<p className="mb-6">
1 Mock Test
</p>

<button
onClick={()=>router.push("/dashboard")}
className="bg-gray-800 text-white px-6 py-2 rounded-lg"
>
Start Free
</button>

</div>


{/* PRO */}

<div className="bg-white p-8 rounded-xl shadow text-center">

<h2 className="text-xl font-bold mb-4">
Pro
</h2>

<p className="text-3xl font-bold mb-4">
$9
</p>

<p className="mb-6">
10 Mock Tests
</p>

<button
className="bg-black text-white px-6 py-2 rounded-lg"
>
Buy Now
</button>

</div>


{/* PREMIUM */}

<div className="bg-white p-8 rounded-xl shadow text-center border-2 border-black">

<h2 className="text-xl font-bold mb-4">
Premium
</h2>

<p className="text-3xl font-bold mb-4">
$19
</p>

<p className="mb-6">
Unlimited Tests
</p>

<button
className="bg-black text-white px-6 py-2 rounded-lg"
>
Get Premium
</button>

</div>

</div>

</div>

)

}