"use server";

import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";

function getApiKey(): string {
	const key = process.env.STABILITY_API_KEY;
	if (!key) {
		throw new Error("STABILITY_API_KEY is not configured");
	}
	return key;
}

export async function generateImageFromApi(keyword: string) {
	const apiKey = getApiKey();
	const formData = new FormData();
	formData.append("prompt", `Create Image with ${keyword}`);
	formData.append("output_Format", "png");

	const response = await axios.postForm(
		"https://api.stability.ai/v2beta/stable-image/generate/core",
		formData,
		{
			validateStatus: undefined,
			responseType: "arraybuffer",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: "image/*",
			},
		},
	);

	if (response.status !== 200) {
		throw new Error("Image generation failed");
	}

	const optimizedImage = await sharp(response.data)
		.resize(1280, 720)
		.png({ quality: 80, compressionLevel: 9 })
		.toBuffer();

	const base64Image = optimizedImage.toString("base64");
	return `data:image/png;base64,${base64Image}`;
}

export async function removeBackgroundFromApi(
	fileBuffer: Buffer,
	fileName: string,
) {
	const apiKey = getApiKey();

	const optimizedInput = await sharp(fileBuffer)
		.resize(1280, 720)
		.png({ quality: 80, compressionLevel: 9 })
		.toBuffer();

	const formData = new FormData();
	formData.append("image", optimizedInput, {
		filename: "image.png",
		contentType: "image/png",
	});
	formData.append("output_format", "png");

	const response = await axios.post(
		"https://api.stability.ai/v2beta/stable-image/edit/remove-background",
		formData,
		{
			validateStatus: undefined,
			responseType: "arraybuffer",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: "image/*",
			},
		},
	);

	if (response.status !== 200) {
		throw new Error("Background removal failed");
	}

	const optimizedImage = await sharp(response.data)
		.resize(1280, 720)
		.png({ quality: 80, compressionLevel: 9 })
		.toBuffer();

	const base64Image = optimizedImage.toString("base64");
	return {
		imageUrl: `data:image/png;base64,${base64Image}`,
		fileName,
	};
}

export async function generateMusicFromApi(
	prompt: string,
	duration: string,
	seed: string,
	steps: string,
) {
	const apiKey = getApiKey();
	const formData = new FormData();
	formData.append("prompt", prompt);
	formData.append("output_Format", "mp3");
	formData.append("duration", duration);
	formData.append("steps", steps);

	const response = await axios.postForm(
		"https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio",
		formData,
		{
			validateStatus: undefined,
			responseType: "arraybuffer",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				Accept: "audio/*",
			},
		},
	);

	if (response.status !== 200) {
		throw new Error("Music generation failed");
	}

	const base64Audio = Buffer.from(response.data).toString("base64");
	const musicUrl = `data:audio/mp3;base64,${base64Audio}`;
	const now = new Date();
	const jstDate = new Date(now.getTime() + 9 * 60 * 60 * 1000);
	const jstString = jstDate.toISOString().replace("T", " ").substring(0, 19);

	return {
		success: true,
		audioData: musicUrl,
		format: "mp3",
		fileName: `generated-music-${jstString}.mp3`,
	};
}
