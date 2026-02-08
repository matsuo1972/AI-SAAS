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

		if (!prompt || typeof prompt !== "string") {
			return NextResponse.json(
				{ error: "Invalid prompt" },
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

		const data = await generateMusicFromApi(prompt, duration, seed, steps, cfgScale);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error generating music:", error);
		return NextResponse.json(
			{ error: "Failed to generate music" },
			{ status: 500 }
		);
	}
}
