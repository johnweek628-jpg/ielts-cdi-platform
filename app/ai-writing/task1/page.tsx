'use client'

import { useState } from "react"

export default function Task1Page(){

const [essay,setEssay] = useState("")
const [image,setImage] = useState<File | null>(null)
const [preview,setPreview] = useState<string | null>(null)

const wordCount = essay.trim().split(/\s+/).filter(Boolean).length


// FILE SELECT
const handleFile = (file:File)=>{
setImage(file)
setPreview(URL.createObjectURL(file))
}


// INPUT UPLOAD
const handleImageUpload = (e:any)=>{
const file = e.target.files[0]
if(file){
handleFile(file)
}
}


// DRAG DROP
const handleDrop = (e:any)=>{
e.preventDefault()

const file = e.dataTransfer.files[0]

if(file && file.type.startsWith("image")){
handleFile(file)
}
}


// PREVENT BROWSER OPENING IMAGE
const handleDragOver = (e:any)=>{
e.preventDefault()
}


// DELETE IMAGE
const removeImage = ()=>{
setImage(null)
setPreview(null)
}


return(

<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

<h1 className="text-4xl font-extrabold mb-10">
IELTS Writing Task 1
</h1>


{/* IMAGE UPLOAD */}

<div className="mb-10">

<p className="mb-3 text-lg font-semibold">
Upload Task Image
</p>

<div
onDrop={handleDrop}
onDragOver={handleDragOver}
className="border-2 border-dashed border-gray-500 rounded-xl p-10 text-center hover:border-white transition cursor-pointer"
>

{!preview && (

<>
<p className="text-gray-300 mb-2">
Drag & Drop Chart Image
</p>

<p className="text-sm text-gray-400 mb-4">
or click to upload
</p>

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="mx-auto"
/>

</>

)}


{/* PREVIEW */}

{preview && (

<div className="relative inline-block">

<img
src={preview}
className="max-h-64 rounded-lg"
/>

<button
onClick={removeImage}
className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full font-bold"
>
✕
</button>

</div>

)}

</div>

</div>


{/* ESSAY */}

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


{/* WORD COUNT */}

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