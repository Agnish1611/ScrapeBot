'use server';

import { auth } from "@/auth";
import { symmetricEncrypt } from "@/lib/encryption";
import prisma from "@/lib/prisma";
import { createCredentialSchema, createCredentialSchemaType } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createCredential(form: createCredentialSchemaType) {
    const {success, data} = createCredentialSchema.safeParse(form);
    if (!success) {
        throw new Error('Invalid form data');
    }

    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new Error('Not authenticated');
    }

    const encryptedValue = symmetricEncrypt(data.value);

    const result = await prisma.credential.create({
        data: {
            name: data.name,
            value: encryptedValue,
            userId: session.session.userId,
        }
    });
    if (!result) {
        throw new Error('Failed to create credential');
    }

    revalidatePath('/credentials');
}