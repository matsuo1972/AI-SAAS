import { generateMusicFromApi } from "@/lib/stability-api";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { decrementUserCredits } from "@/lib/credits";

export async function POST(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { prompt, duration, seed, steps, cfgScale } = await req.json();

		if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
			return NextResponse.json(
				{ error: "Invalid prompt" },
				{ status: 400 }
			);
		}

		if (prompt.length > 1000) {
			return NextResponse.json(
				{ error: "プロンプトは1000文字以内にしてください" },
				{ status: 400 }
			);
		}

		const safeDuration = Number(duration);
		const safeSteps = Number(steps);
		const safeSeed = Number(seed);
		const safeCfgScale = Number(cfgScale);

		if (isNaN(safeDuration) || safeDuration < 1 || safeDuration > 300) {
			return NextResponse.json(
				{ error: "durationは1〜300の範囲で指定してください" },
				{ status: 400 }
			);
		}

		if (isNaN(safeSteps) || safeSteps < 1 || safeSteps > 150) {
			return NextResponse.json(
				{ error: "stepsは1〜150の範囲で指定してください" },
				{ status: 400 }
			);
		}

		const decremented = await decrementUserCredits(userId);
		if (!decremented) {
			return NextResponse.json(
				{ error: "クレジットが不足しています" },
				{ status: 403 }
			);
		}

		const data = await generateMusicFromApi(
			prompt,
			String(safeDuration),
			String(safeSeed),
			String(safeSteps),
			String(safeCfgScale)
		);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error generating music:", error);
		return NextResponse.json(
			{ error: "Failed to generate music" },
			{ status: 500 }
		);
	}
}
