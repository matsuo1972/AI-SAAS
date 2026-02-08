import { generateImageFromApi } from "@/lib/stability-api";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserCredits, decrementUserCredits } from "@/lib/credits";

export async function POST(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userCredits = await getUserCredits();
		if (!userCredits || userCredits.credits <= 0) {
			return NextResponse.json(
				{ error: "クレジットが不足しています" },
				{ status: 403 }
			);
		}

		const { keyword } = await req.json();

		if (!keyword || typeof keyword !== "string") {
			return NextResponse.json(
				{ error: "Invalid keyword" },
				{ status: 400 }
			);
		}

		const imageUrl = await generateImageFromApi(keyword);

		await decrementUserCredits(userId);

		return NextResponse.json({ imageUrl });
	} catch (error) {
		console.error("Error generating image:", error);
		return NextResponse.json(
			{ error: "Failed to generate image" },
			{ status: 500 }
		);
	}
}
