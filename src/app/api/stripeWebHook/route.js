import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import connectToDB from '@/database';
import User from '@/models/UserData';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // Get raw body to verify the Stripe signature
    const buf = await req.arrayBuffer();
    const textBody = Buffer.from(buf).toString('utf8');

    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(textBody, sig, webhookSecret);

  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      console.log(`Payment for ${session.amount_total / 100} was successful.`);
      // Fulfill the purchase or update the order status in your database

      const userId = session.client_reference_id

      try {

        await connectToDB();

        const foundUser = await User.findOne({ userId: userId });

        console.log(foundUser);

        let orderId = [];

        foundUser.cart.map((item) => {
          orderId = [...orderId , { pujaId : item.pujaId , date : item.date , time : item.time }];
        })

        const order = {
          orderId: orderId-1,
          transactionId: session.created,
          nowDate: new Date().toLocaleDateString(),
          nowTime: new Date().toLocaleTimeString(),
          totalAmount: session.amount_total / 100
        }

        const updatedUser = await User.findOneAndUpdate({ userId: userId }, {$push : {orders : order }});

        if (updatedUser) {
          return NextResponse.json({ message: 'success' }, {status : 200})
        } else {
          return NextResponse.json({ message: 'updation failed' }, {status : 500})
        }

      } catch (err) {
        console.log('database error', err)
        return NextResponse.json({ message: 'database error' } , {status : 500});
      }

      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
