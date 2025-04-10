import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getUserCredits } from "@/lib/credits";
import { currentUser } from "@clerk/nextjs/server";
import { SubscriptionStatus } from "@prisma/client";
import { Lock, Sparkles } from "lucide-react";
import Image from "next/image";

export async function CreditStatus() {
	const user = await currentUser();
	if (!user) {
		return (
			<div className="rounded-lg border bg-background p-4">
				<div className="font-medium text-sm text-muted-foreground">
					残りクレジット
				</div>
				<div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
					<Lock className="size-3" />
					<span>ログインが必要です</span>
				</div>
			</div>
		);
	}
	const dbData = await getUserCredits();
	if (!dbData) {
		throw new Error("クレジット取得エラー");
	}
	return (
		<Card>
			<div className="relative h-32">
				<Image
					src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
					alt="Credit Status"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
			</div>
			<CardHeader>
				<div className="flex items-center gap-2">
					<Sparkles className="h-5 w-5 text-primary" />
					<CardTitle>クレジット残高</CardTitle>
				</div>
				{dbData.subscriptionState === SubscriptionStatus.ENTERPRISE ? (
					<CardDescription>
						ENTERPRISEプラン: {dbData.credits}{" "}
						クレジット残っています
					</CardDescription>
				) : dbData.subscriptionState === SubscriptionStatus.PRO ? (
					<CardDescription>
						PROプラン: {dbData.credits} クレジット残っています
					</CardDescription>
				) : dbData.subscriptionState === SubscriptionStatus.STARTER ? (
					<CardDescription>
						STARTERプラン: {dbData.credits} クレジット残っています
					</CardDescription>
				) : (
					<CardDescription>
						無料トライアル: 20クレジット中 {dbData.credits}
						クレジット残っています
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				<Progress value={75} className="h-2" />
				{/* <p className="text-sm text-muted-foreground mt-4">
					1クレジットで1回の画像生成または編集が可能です
				</p> */}
			</CardContent>
		</Card>
	);
}
