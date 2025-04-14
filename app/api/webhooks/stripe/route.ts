import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/stripe";
import { updateCheckoutSessionCompleted } from "@/lib/stripe/handleCheckoutSessionCompleted";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const rawBody = await request.arrayBuffer();
  const bodyBuffer = Buffer.from(rawBody);
  const signature = (await headers()).get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      bodyBuffer,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed":
        await updateCheckoutSessionCompleted(event.data.object);
        break;
      default:
        break;
    }

    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error("Webhook Error:", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
