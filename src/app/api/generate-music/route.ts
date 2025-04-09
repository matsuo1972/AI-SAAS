import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { prompt, duration, seed, steps, cfgScale } = await req.json();
	try {
		const payload = {
			prompt: `${prompt}`,
			output_format: "mp3",
			duration: duration,
			steps: steps,
			seed: seed,
			cfg_scale: cfgScale,
		};
		const formData = new FormData();
		formData.append("prompt", payload.prompt);
		formData.append("output_Format", payload.output_format);
		formData.append("duration", payload.duration);
		formData.append("steps", payload.steps);

		const response = await axios.postForm(
			`https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio`,
			formData,
			{
				validateStatus: undefined,
				responseType: "arraybuffer",
				headers: {
					Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
					Accept: "audio/*",
				},
			}
		);

		if (response.status !== 200) {
			throw new Error(`${response.status}: ${response.data.toString()}`);
		}

		// Base64 Encoding
		const base64Audio = Buffer.from(response.data).toString("base64");
		const musicUrl = `data:audio/mp3;base64,${base64Audio}`;
		const now = new Date();
		const jstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC から JST へ変換

		// 日本時間を文字列フォーマットで取得
		const jstString = jstDate
			.toISOString()
			.replace("T", " ")
			.substring(0, 19);
		const data = {
			success: true,
			audioData: musicUrl,
			format: "mp3",
			fileName: `generated-music-${jstString}.mp3`,
		};

		return NextResponse.json(data);
	} catch (error) {
		console.error("Error generate image", error);
		return NextResponse.json(
			{
				error: "Failed to generate image",
			},
			{
				status: 500,
			}
		);
	}
}
