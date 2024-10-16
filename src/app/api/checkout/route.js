import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  const {userId} = getAuth(req);
  console.log(userId)

  try {

    const body = await req.json();

    console.log(body)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body.map((item) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.puja_name,
          },
          unit_amount: item.price * 100 + (0.08 * item.price * 100), // Make sure price is in cents
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
      client_reference_id : userId
    });

    return NextResponse.json({ id: session.id });

  } catch (err) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}