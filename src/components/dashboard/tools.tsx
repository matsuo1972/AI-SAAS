"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Music2, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Tools() {
	const tools = [
		{
			href: "/dashboard/generate",
			title: "AI画像生成",
			description: "テキストプロンプトから希望の画像を生成",
			icon: Sparkles,
			image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&q=80",
		},
		{
			href: "/dashboard/remove-bg",
			title: "背景除去",
			description: "アップロードした画像から背景を自動で除去",
			icon: Zap,
			image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80",
		},
		{
			href: "/dashboard/music",
			title: "AI音楽生成",
			description: "テキストプロンプトからオリジナル楽曲を生成",
			icon: Music2,
			image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
		},
	];

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold">ツール</h2>
			<div className="grid gap-6 md:grid-cols-3">
				{tools.map((tool) => {
					const Icon = tool.icon;
					return (
						<Card key={tool.href} className="group overflow-hidden">
							<div className="relative aspect-video">
								<Image
									src={tool.image}
									alt={tool.title}
									fill
									className="object-cover transition-transform group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
									<Icon className="h-6 w-6 text-white" />
								</div>
							</div>
							<CardHeader>
								<CardTitle>{tool.title}</CardTitle>
								<CardDescription>
									{tool.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button className="w-full" asChild>
									<Link href={tool.href}>使ってみる</Link>
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
