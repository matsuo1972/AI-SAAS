"use server";

import { decrementUserCredits, getUserCredits } from "@/lib/credits";
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

		// クレジット残高をチェックする
		const dbData = await getUserCredits();
		if (!dbData) {
			throw new Error("クレジット取得エラー");
		}
		if (dbData.credits === null || dbData.credits < 1) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits", // try catch の中でredirectができないのでクライアントサイドでリダイレクトさせる　insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
			};
			// redirect('/dashboard/plan?reason=insufficient_credits'); // insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
		}

		const keyword = formData.get("keyword");

		if (!keyword || typeof keyword !== "string") {
			return {
				status: "error",
				error: "キーワードを入力してください",
			};
		}
		try {
			const response = await fetch(
				`${process.env.BASE_URL}/api/generate-image`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ keyword }),
				}
			);

			const data = await response.json();

			await decrementUserCredits(user.id);

			revalidatePath("/dashboard"); // ダッシュボード自体のキャッシュを再検証する　画面をリロードしなくても取得した値を画面へ即時反映させるテクニック

			return {
				status: "success",
				imageUrl: data.imageUrl,
				keyword: keyword,
			};
		} catch (err) {
			console.error("fetch failed", err);
			return {
				status: "error",
				error: "画像の生成に失敗しました",
			};
		}
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

		// クレジット残高をチェックする
		const dbData = await getUserCredits();
		if (!dbData) {
			throw new Error("クレジット取得エラー");
		}
		if (dbData.credits === null || dbData.credits < 1) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits", // try catch の中でredirectができないのでクライアントサイドでリダイレクトさせる　insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
			};
			// redirect('/dashboard/plan?reason=insufficient_credits'); // insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
		}

		const image = formData.get("image") as File;

		if (!image) {
			return {
				status: "error",
				error: "画像ファイルを選択してください",
			};
		}
		try {
			const response = await fetch(
				`${process.env.BASE_URL}/api/remove-background`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("背景の削除に失敗しました");
			}

			const data = await response.json();

			return {
				status: "success",
				processedImage: data.imageUrl,
				fileName: data.fileName.split(".")[0],
			};
		} catch (err) {
			console.error("fetch failed", err);
			return {
				status: "error",
				error: "画像の透過に失敗しました",
			};
		}
	} catch (error) {
		console.error(error);
		return {
			status: "error",
			error: "画像の生成に失敗しました",
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

		// クレジット残高をチェックする
		const dbData = await getUserCredits();
		if (!dbData) {
			throw new Error("クレジット取得エラー");
		}
		if (dbData.credits === null || dbData.credits < 1) {
			return {
				status: "error",
				error: "クレジット残高が不足しています",
				redirect: "/dashboard/plan?reason=insufficient_credits", // try catch の中でredirectができないのでクライアントサイドでリダイレクトさせる　insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
			};
			// redirect('/dashboard/plan?reason=insufficient_credits'); // insufficient_creditsは無効なクレジットという意味　reasonというクエリパラメータに理由をつける　この場合は残高が不足しているので課金ページで課金してくださいと誘導する
		}

		const prompt = formData.get("prompt");
		const duration = formData.get("duration");
		const seed = formData.get("seed");
		const steps = formData.get("steps");
		const cfgScale = formData.get("cfgScale");

		if (!prompt || typeof prompt !== "string") {
			return {
				status: "error",
				error: "キーワードを入力してください",
			};
		}
		try {
			const response = await fetch(
				`${process.env.BASE_URL}/api/generate-music`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						prompt,
						duration,
						seed,
						steps,
						cfgScale,
					}),
				}
			);

			const data = await response.json();

			await decrementUserCredits(user.id);

			revalidatePath("/dashboard"); // ダッシュボード自体のキャッシュを再検証する　画面をリロードしなくても取得した値を画面へ即時反映させるテクニック

			return {
				// status: "success",
				success: data.success,
				audioData: data.audioData,
				fileName: data.fileName,
				format: data.format,
			} as GenerateMusicState;
		} catch (err) {
			console.error("fetch failed", err);
			return {
				status: "error",
				error: "画像の生成に失敗しました",
			};
		}
	} catch (error) {
		console.error(error);
		return {
			status: "error",
			error: "画像の生成に失敗しました",
		};
	}
}
