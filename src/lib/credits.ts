import { currentUser } from "@clerk/nextjs/server";
import "server-only"; // clientコンポーネントでは実行しない指定
import { prisma } from "./prisma";

/**
 * ユーザーが持つ残りクレジット残数を取得する
 * @returns
 */
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
		}; // もし存在しなければ0を返す
	} catch (error) {
		console.error("error fetching user credits: ", error);
		return 0;
	}
}

export async function decrementUserCredits(clerkId: string) {
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

		if (result.count === 0) {
			throw new Error("Insufficient credits");
		}

		const user = await prisma.user.findUnique({
			where: { clerkId },
			select: { credits: true },
		});

		return user?.credits ?? 0;
	} catch (error) {
		console.error("error decrementing user credits: ", error);
		throw new Error("Failed to update credits");
	}
}
