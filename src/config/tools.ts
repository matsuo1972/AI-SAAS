import backgroundRemover from "@/components/dashboard/tools/background-remover";
import ImageGenerator from "@/components/dashboard/tools/image-generator";
import MusicGenerator from "@/components/dashboard/tools/music-generator";

export const tools = {
	"image-generator": {
		title: "画像生成",
		description: "AIを使用して好みの画像を生成してみよう",
		component: ImageGenerator,
	},
	"remove-bg": {
		title: "背景削除",
		description: "画像から背景を自動で削除",
		component: backgroundRemover,
	},
	"music-generator": {
		title: "ミュージック生成",
		description: "自由なイメージで曲を生成してみよう",
		component: MusicGenerator,
	},
	setting: {
		title: "画像生成",
		description: "AIを使用して好みの画像を生成してみよう",
		component: ImageGenerator,
	},
};

export type ToolType = keyof typeof tools;
