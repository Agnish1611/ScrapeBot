import { getCreditsPack, PackId } from '@/utils/types/billing';
import 'server-only';

import Stripe from 'stripe';
import prisma from '../prisma';

export async function updateCheckoutSessionCompleted(event: Stripe.Checkout.Session) {
    if (!event.metadata) {
        throw new Error('Missing metadata');
    }
    const { userId, packId } = event.metadata;
    if (!userId) {
        throw new Error('Missing userId in metadata');
    }
    if (!packId) {
        throw new Error('Missing packId in metadata');
    }

    const purchasedPack = getCreditsPack(packId as PackId);
    if (!purchasedPack) {
        throw new Error('Purchased pack not found');
    }

    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            credits: {
                increment: purchasedPack.credits,
            },
        },
    });
}