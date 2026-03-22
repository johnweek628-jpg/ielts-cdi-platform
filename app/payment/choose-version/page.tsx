'use client'

import { useRouter } from "next/navigation"

export default function ChoosePaymentVersion() {

const router = useRouter()

return (

<div className="min-h-screen bg-gray-100 flex items-center justify-center">

<div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">

<h1 className="text-3xl font-extrabold text-black mb-6">
Choose your payment version
</h1>

<p className="text-gray-500 mb-10">
Select the method that suits you best
</p>

<div className="flex flex-col gap-4">

<button
onClick={() => router.push("/payment/payoneer")}
className="w-full px-6 py-4 rounded-xl font-bold text-white 
bg-gradient-to-r from-gray-900 via-black to-gray-800
shadow-md transition-all duration-300 
hover:scale-[1.03] hover:shadow-xl 
active:scale-[0.98]"
>
Payoneer
</button>

<button
onClick={() => router.push("/payment/payme")}
className="w-full px-6 py-4 rounded-xl font-bold text-white 
bg-blue-600 shadow-md transition-all duration-300 
hover:scale-[1.03] hover:shadow-xl 
active:scale-[0.98]"
>
Payme
</button>

</div>

</div>

</div>

)
}