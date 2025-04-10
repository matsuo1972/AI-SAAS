"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Music2, Sparkles } from "lucide-react";
import Image from "next/image";

export function RecentActivity() {
	const activities = [
		{
			type: "generate",
			description: "商品画像を生成",
			time: "5分前",
			icon: Sparkles,
			image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200",
		},
		{
			type: "music",
			description: "BGM音楽を生成",
			time: "30分前",
			icon: Music2,
			image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=200",
		},
		{
			type: "music",
			description: "ジングルを生成",
			time: "1時間前",
			icon: Music2,
			image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200",
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>最近の活動</CardTitle>
				<CardDescription>直近の生成履歴</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{activities.map((activity, index) => {
						const Icon = activity.icon;
						return (
							<div
								key={index}
								className="flex items-center gap-4 text-sm group"
							>
								<div className="relative w-16 h-16 rounded-lg overflow-hidden">
									<Image
										src={activity.image}
										alt={activity.description}
										fill
										className="object-cover transition-transform group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
										<Icon className="h-6 w-6 text-white" />
									</div>
								</div>
								<div className="flex-1">
									<p className="font-medium">
										{activity.description}
									</p>
									<p className="text-muted-foreground">
										{activity.time}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
