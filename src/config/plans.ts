import { Crown, Rocket, Sparkles } from "lucide-react";

function getEnv(name: string): string {
	return process.env[name]?.trim() ?? "";
}

function getRequiredEnv(name: string): string {
	const value = getEnv(name);
	if (!value) {
		throw new Error(`${name} is not configured`);
	}
	return value;
}

export function getStripePlans() {
	return {
		STARTER: getRequiredEnv("STRIPE_PRICE_STARTER"),
		PRO: getRequiredEnv("STRIPE_PRICE_PRO"),
		ENTERPRISE: getRequiredEnv("STRIPE_PRICE_ENTERPRISE"),
	};
}

const optionalStripePlans = {
	STARTER: getEnv("STRIPE_PRICE_STARTER"),
	PRO: getEnv("STRIPE_PRICE_PRO"),
	ENTERPRISE: getEnv("STRIPE_PRICE_ENTERPRISE"),
};

export const plans = [
	{
		name: "Starter",
		icon: Sparkles,
		price: "¥1,000",
		description: "個人利用に最適なエントリープラン",
		// features: ['月50クレジット付与', '基本的な画像生成', 'メールサポート'],
		features: ["月50クレジット付与", "60秒までの音楽生成"],
		buttonText: "Starterプランを選択",
		priceId: optionalStripePlans.STARTER,
	},
	{
		name: "Pro",
		icon: Rocket,
		price: "¥2,000",
		description: "プロフェッショナルな制作活動に",
		// features: ['月120クレジット付与', '優先サポート', '商法利用可能', 'メールサポート'],
		features: ["月120クレジット付与", "190秒までの音楽生成"],
		buttonText: "Proプランを選択",
		popular: true,
		priceId: optionalStripePlans.PRO,
	},
	{
		name: "Enterprise",
		icon: Crown,
		price: "¥5,000",
		description: "ビジネス向けの完全なソリューション",
		// features: [
		// 	"月300クレジット付与",
		// 	"24時間優先サポート",
		// 	"API利用可能",
		// 	"メールサポート",
		// 	"カスタマイズ可能",
		// ],
		features: ["月300クレジット付与", "190秒までの音楽生成"],
		buttonText: "Enterpriseプランを選択",
		priceId: optionalStripePlans.ENTERPRISE,
	},
];
