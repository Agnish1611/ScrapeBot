'use server';

import { auth } from "@/auth";
import { getAppUrl } from "@/lib/helper/appUrl";
import { stripe } from "@/lib/stripe/stripe";
import { getCreditsPack, PackId } from "@/utils/types/billing";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function purchaseCredits(packId: PackId) {
    const authSession = await auth.api.getSession({
        headers: await headers(),
    });

    if (!authSession) {
        throw new Error("Not authenticated");
    }

    const selectedPack = getCreditsPack(packId);
    if (!selectedPack) {
        throw new Error("Invalid credits pack");
    }

    const stripeSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        invoice_creation: {
            enabled: true,
        },
        success_url: getAppUrl('billing'),
        cancel_url: getAppUrl('billing'),
        metadata: {
            userId: authSession.session.userId,
            packId,
        },
        line_items: [
            {
                quantity: 1,
                price: selectedPack.priceId,
            }
        ]
    });
    if (!stripeSession.url) {
        throw new Error("Failed to create Stripe session");
    }

    redirect(stripeSession.url);
}