'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe/stripe";
import { headers } from "next/headers";

export async function downloadInvoice(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Not authenticated");
    }

    const purchase = await prisma.userPurchase.findUnique({
        where: {
            id,
            userId: session.session.userId,
        },
    });
    if (!purchase) {
        throw new Error("Bad request");
    }

    const stripeSession = await stripe.checkout.sessions.retrieve(purchase.stripeId);
    if (!stripeSession.invoice) {
        throw new Error("Invoice not found");
    }

    const invoice = await stripe.invoices.retrieve(stripeSession.invoice as string);
    return invoice.hosted_invoice_url;
}