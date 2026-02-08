import { generateImageFromApi } from "@/lib/stability-api";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { decrementUserCredits } from "@/lib/credits";

export async function POST(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { keyword } = await req.json();

		if (!keyword || typeof keyword !== "string") {
			return NextResponse.json(
				{ error: "Invalid keyword" },
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

		const imageUrl = await generateImageFromApi(keyword);

		return NextResponse.json({ imageUrl });
	} catch (error) {
		console.error("Error generating image:", error);
		return NextResponse.json(
			{ error: "Failed to generate image" },
			{ status: 500 }
		);
	}
}
