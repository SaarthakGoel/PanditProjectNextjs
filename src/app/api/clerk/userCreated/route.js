'use server'

import { Webhook } from "svix";
import { NextResponse } from "next/server"; // Use Next.js specific Response handling
import connectToDB from "@/database";
import User from "@/models/UserData";

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Please add WEBHOOK_SECRET from Clerk dashboard" },
      { status: 500 }
    );
  }

  // Extract headers from the incoming request
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // Error out if any of the necessary headers are missing
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  // Parse the incoming JSON payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  try {
    // Verify the incoming webhook payload and headers
    evt = await wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return NextResponse.json(
      { error: "Error verifying webhook" },
      { status: 400 }
    );
  }

  // Destructure event data and type
  const { id } = evt.data;

  console.log(`Received Webhook with ID: ${id}`);

  // Process the event payload as needed for your application
  await connectToDB();

  await User.create({userId : id});

  // Respond with a 200 OK status to acknowledge receipt of the webhook
  return NextResponse.json(
    { message: "Webhook received successfully" },
    { status: 200 }
  );
}
