'use client'

import { useState } from "react"

export default function Task1Page() {

const [essay,setEssay] = useState("")
const [image,setImage] = useState<File | null>(null)

const wordCount = essay.trim().split(/\s+/).filter(Boolean).length

const handleImageUpload = (e:any) => {
if(e.target.files[0]){
setImage(e.target.files[0])
}
}

return (

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

<h1 className="text-4xl font-extrabold mb-10">
IELTS Writing Task 1
</h1>

{/* IMAGE UPLOAD */}

<div className="mb-10">

<p className="mb-3 text-lg font-semibold">
Upload Task Image
</p>

<label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-xl p-10 cursor-pointer hover:border-white transition">

<p className="text-gray-300 mb-2">
Drag & Drop Chart Image
</p>

<p className="text-sm text-gray-400">
or click to upload
</p>

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="hidden"
/>

</label>

{image && (
<p className="mt-3 text-green-400">
Image uploaded: {image.name}
</p>
)}

</div>

{/* ESSAY BOX */}

<div className="mb-4">

<p className="mb-3 text-lg font-semibold">
Write your essay
</p>

<textarea
value={essay}
onChange={(e)=>setEssay(e.target.value)}
placeholder="Write your Task 1 report here..."
className="w-full h-64 p-4 rounded-lg bg-gray-800 text-white outline-none"
/>

</div>

{/* WORD COUNTER */}

<p className="text-gray-400 mb-6">
Words: {wordCount} / Recommended: 150+
</p>

{/* CHECK BUTTON */}

<button
className="bg-white text-black font-bold px-8 py-3 rounded-lg hover:scale-105 transition"
>
Check My Essay
</button>

</div>

)

}