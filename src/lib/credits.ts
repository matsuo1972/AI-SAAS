import { currentUser } from "@clerk/nextjs/server";
import "server-only";
import { prisma } from "./prisma";

export async function getUserCredits() {
	try {
		const user = await currentUser();

		if (!user) {
			return null;
		}

		const dbUser = await prisma.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				credits: true,
				subscriptionState: true,
			},
		});

		return {
			credits: dbUser?.credits ?? 0,
			subscriptionState: dbUser?.subscriptionState,
		};
	} catch (error) {
		console.error("error fetching user credits: ", error);
		return null;
	}
}

export async function decrementUserCredits(clerkId: string): Promise<boolean> {
	try {
		const result = await prisma.user.updateMany({
			where: {
				clerkId: clerkId,
				credits: {
					gt: 0,
				},
			},
			data: {
				credits: {
					decrement: 1,
				},
			},
		});

		return result.count > 0;
	} catch (error) {
		console.error("error decrementing user credits: ", error);
		throw new Error("Failed to update credits");
	}
}
