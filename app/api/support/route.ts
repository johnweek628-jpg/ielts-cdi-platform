import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {

const { email, message } = await req.json()

try {

await resend.emails.send({
from: 'Support <onboarding@resend.dev>',
to: 'johnweek628@gmail.com',
subject: 'New Support Query',
html: `
<h2>New message from platform</h2>
<p><strong>User Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
`
})

await resend.emails.send({
from: 'IELTS Platform <onboarding@resend.dev>',
to: email,
subject: 'Your query has been received',
html: `
<p>Your query has been submitted successfully.</p>

<p>Please wait for our response in 2–3 hours.  
It might also take longer, but we will try to respond as soon as possible.</p>
`
})

return Response.json({ success: true })

}
catch(error){

return Response.json({ success:false })

}

}