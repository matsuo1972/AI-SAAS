import { removeBackgroundFromApi } from "@/lib/stability-api";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const formData = await req.formData();
		const file = formData.get("image") as File;

		if (!file) {
			return NextResponse.json(
				{ error: "画像ファイルを選択してください" },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const data = await removeBackgroundFromApi(buffer, file.name);

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error removing background:", error);
		return NextResponse.json(
			{ error: "Failed to remove background" },
			{ status: 500 }
		);
	}
}
