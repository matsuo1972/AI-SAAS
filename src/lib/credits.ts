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
			},
		});

		return dbUser?.credits ?? 0; // もし存在しなければ0を返す
	} catch (error) {
		console.error("error fetching user credits: ", error);
		return 0;
	}
}

export async function decrementUserCredits(clerkId: string) {
	try {
		const user = await prisma.user.update({
			where: {
				clerkId: clerkId,
			},
			data: {
				credits: {
					decrement: 1, // -1してくれる書き方
				},
			},
			select: {
				credits: true,
			},
		});

		return user?.credits ?? 0; // もし存在しなければ0を返す
	} catch (error) {
		console.error("error decrementing user credits: ", error);
		throw new Error("Failed to update credits");
	}
}
