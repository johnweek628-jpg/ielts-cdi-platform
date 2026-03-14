import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "IELTS Mock Platform Premium"
          },
          unit_amount: 1999
        },
        quantity: 1
      }
    ],

    success_url: "http://localhost:3000/dashboard",
    cancel_url: "http://localhost:3000/pricing"
  })

  return NextResponse.json({ url: session.url })

}