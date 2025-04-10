"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Music2, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<>
			<section className="pt-32 pb-16 overflow-hidden">
				<div className="container mx-auto px-4">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="text-center"
					>
						<motion.div
							variants={itemVariants}
							className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-6"
						>
							<Sparkles className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium">
								AIの力でクリエイティブを革新
							</span>
						</motion.div>

						<motion.h1
							variants={itemVariants}
							className="text-4xl md:text-6xl font-bold mb-6"
						>
							AIで画像と音楽を、
							<br />
							もっとクリエイティブに。
						</motion.h1>

						<motion.p
							variants={itemVariants}
							className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
						>
							画像生成、音楽生成、背景除去など、あらゆるクリエイティブワークをAIが数秒で実現。
							クリエイターの可能性を無限に広げます。
						</motion.p>

						<motion.div
							variants={itemVariants}
							className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
						>
							<Button size="lg" className="gap-2 group" asChild>
								<Link href="/dashboard">
									無料トライアルを始める
									<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="group"
							>
								デモを見る
								<ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
							</Button>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="relative"
						>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="aspect-video rounded-xl overflow-hidden border bg-card shadow-2xl"
							>
								<Image
									src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
									alt="AIStation Dashboard Preview"
									width={1920}
									height={1080}
									className="object-cover"
								/>
							</motion.div>
							<div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full" />
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
						>
							{[
								{ icon: Sparkles, label: "AI画像生成" },
								{ icon: Zap, label: "AI背景除去" },
								{ icon: Music2, label: "AI音楽生成" },
								{ icon: Sparkles, label: "高品質出力" },
							].map((item, index) => (
								<div
									key={index}
									className="flex items-center justify-center gap-2 p-4 rounded-lg bg-card border"
								>
									<item.icon className="h-5 w-5 text-primary" />
									<span className="font-medium">
										{item.label}
									</span>
								</div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
