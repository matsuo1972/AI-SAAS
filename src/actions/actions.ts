"use server";

import { decrementUserCredits } from "@/lib/credits";
import {
	generateImageFromApi,
	generateMusicFromApi,
	removeBackgroundFromApi,
} from "@/lib/stability-api";
import {
	GenerateImageState,
	GenerateMusicState,
	RemoveBackgroundState,
} from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generateImage(
	state: GenerateImageState,
	formData: FormData
): Promise<GenerateImageState> {
	try {
		const user = await currentUser();
		if (!user) {
			throw new Error("認証が必要です");
		}

		const keyword = formData.get("keyword");

		if (!keyword || typeof keyword !== "string") {
			return {
				status: "error",
				error: "キーワードを入力してください",
			};
		}

		const decremented = await decrementUserCredits(user.id);
		if (!decremented) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits",
			};
		}

		const imageUrl = await generateImageFromApi(keyword);
		revalidatePath("/dashboard");

		return {
			status: "success",
			imageUrl,
			keyword,
		};
	} catch (error) {
		console.error(error);
		return {
			status: "error",
			error: "画像の生成に失敗しました",
		};
	}
}

export async function removeBackground(
	state: RemoveBackgroundState,
	formData: FormData
): Promise<RemoveBackgroundState> {
	try {
		const user = await currentUser();
		if (!user) {
			throw new Error("認証が必要です");
		}

		const image = formData.get("image") as File;

		if (!image) {
			return {
				status: "error",
				error: "画像ファイルを選択してください",
			};
		}

		const decremented = await decrementUserCredits(user.id);
		if (!decremented) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits",
			};
		}

		const bytes = await image.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const data = await removeBackgroundFromApi(buffer, image.name);
		revalidatePath("/dashboard");

		return {
			status: "success",
			processedImage: data.imageUrl,
			fileName: data.fileName.split(".")[0],
		};
	} catch (error) {
		console.error(error);
		return {
			status: "error",
			error: "画像の透過に失敗しました",
		};
	}
}

export async function generateMusic(
	state: GenerateMusicState,
	formData: FormData
): Promise<GenerateMusicState> {
	try {
		const user = await currentUser();
		if (!user) {
			throw new Error("認証が必要です");
		}

		const prompt = formData.get("prompt");
		const duration = formData.get("duration");
		const seed = formData.get("seed");
		const steps = formData.get("steps");

		if (!prompt || typeof prompt !== "string") {
			return {
				status: "error",
				error: "キーワードを入力してください",
			};
		}

		const decremented = await decrementUserCredits(user.id);
		if (!decremented) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits",
			};
		}

		const data = await generateMusicFromApi(
			prompt,
			String(duration),
			String(seed),
			String(steps)
		);
		revalidatePath("/dashboard");

		return {
			status: "success",
			success: data.success,
			audioData: data.audioData,
			fileName: data.fileName,
			format: data.format,
		};
	} catch (error) {
		console.error(error);
		return {
			status: "error",
			error: "音楽の生成に失敗しました",
		};
	}
}
