import OpenAI from "openai"

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req:Request){

const body = await req.json()

const essay = body.essay

try{

const response = await openai.chat.completions.create({

model:"gpt-4o",

messages:[

{
role:"system",
content:"You are a professional IELTS examiner."
},

{
role:"user",
content:`Evaluate this IELTS Writing Task 2 essay.

Score using IELTS band descriptors:

Task Response
Coherence and Cohesion
Lexical Resource
Grammatical Range and Accuracy

Provide:

Band score for each criterion
Overall band score
Detailed feedback
Improvement suggestions

Essay:
${essay}`

}

]

})

return Response.json({
result:response.choices[0].message.content
})

}catch{

return Response.json({
error:"AI request failed"
})

}

}