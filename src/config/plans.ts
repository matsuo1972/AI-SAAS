import { Crown, Rocket, Sparkles } from "lucide-react";

export const STRIPE_PLANS = {
    STARTER: "price_1R8dE6QESOQQDHCZ1mNMZ7li",
    PRO: "price_1R8dG7QESOQQDHCZCMUHydav",
    ENTERPRISE: "price_1R8dGhQESOQQDHCZHZfMdk1X"
}

export const plans = [
    {
        name: "Starter",
        icon: Sparkles,
        price: "¥1,000",
        description: "個人利用に最適なエントリープラン",
        features: ['月50クレジット付与', '基本的な画像生成', 'メールサポート'],
        buttonText: 'Starterプランを選択',
        priceId: STRIPE_PLANS.STARTER,
    },
    {
        name: "Pro",
        icon: Rocket,
        price: "¥2,000",
        description: "プロフェッショナルな制作活動に",
        features: ['月120クレジット付与', '優先サポート', '商法利用可能', 'メールサポート'],
        buttonText: 'Proプランを選択',
        popular: true,
        priceId: STRIPE_PLANS.PRO,
    },
    {
        name: "Enterprise",
        icon: Crown,
        price: "¥5,000",
        description: "ビジネス向けの完全なソリューション",
        features: ['月300クレジット付与', '24時間優先サポート', 'API利用可能', 'メールサポート', 'カスタマイズ可能'],
        buttonText: 'Enterpriseプランを選択',
        priceId: STRIPE_PLANS.ENTERPRISE,
    }
]
