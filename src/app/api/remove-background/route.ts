import { removeBackgroundFromApi } from "@/lib/stability-api";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { decrementUserCredits } from "@/lib/credits";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
	"image/png",
	"image/jpeg",
	"image/webp",
	"image/gif",
]);

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

		if (!ALLOWED_MIME_TYPES.has(file.type)) {
			return NextResponse.json(
				{ error: "対応形式: PNG, JPEG, WebP, GIF" },
				{ status: 400 }
			);
		}

		if (file.size > MAX_FILE_SIZE) {
			return NextResponse.json(
				{ error: "ファイルサイズは10MB以下にしてください" },
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
