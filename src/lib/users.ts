import { prisma } from "./prisma";

export async function createUser(clerkId: string, email: string) {
    return prisma.user.create({
        data: {
            clerkId: clerkId,
            email: email,
            credits: 5,
            subscriptionState: 'FREE'
        },
    });
}

export async function updateUser(clerkId: string, email: string) {
    return prisma.user.update({
        where: {
            clerkId: clerkId,
        },
        data: {
            email: email
        }
    });
}

export async function deleteUser(clerkId: string) {
    return prisma.$transaction(async (tx) => {
        await tx.subscription.deleteMany({
            where: {
                user: {
                    clerkId: clerkId
                }
            }
        });
        return tx.user.delete({
            where: {
                clerkId: clerkId
            }
        });
    });
}
