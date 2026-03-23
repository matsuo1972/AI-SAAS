"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon, Music2, Zap } from "lucide-react";
import Image from "next/image";

export function Features() {
	return (
		<section id="features" className="py-16 bg-muted/50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					主要機能
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-card rounded-lg border overflow-hidden"
					>
						<div className="relative h-48">
							<Image
								src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80"
								alt="AI画像生成"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								className="object-cover"
							/>
						</div>
						<div className="p-6">
							<ImageIcon className="h-12 w-12 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								AI画像生成
							</h3>
							<p className="text-muted-foreground">
								テキストから希望の画像を生成。ブランドに合わせたビジュアルを瞬時に作成できます。
							</p>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-card rounded-lg border overflow-hidden"
					>
						<div className="relative h-48">
							<Image
								src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
								alt="背景除去"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								className="object-cover"
							/>
						</div>
						<div className="p-6">
							<Zap className="h-12 w-12 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								AI背景除去
							</h3>
							<p className="text-muted-foreground">
								画像から背景を自動で除去。商品写真やプロフィール画像の編集に最適です。
							</p>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="bg-card rounded-lg border overflow-hidden"
					>
						<div className="relative h-48">
							<Image
								src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"
								alt="音楽生成"
								fill
								sizes="(max-width: 768px) 100vw, 33vw"
								className="object-cover"
							/>
						</div>
						<div className="p-6">
							<Music2 className="h-12 w-12 text-primary mb-4" />
							<h3 className="text-xl font-semibold mb-2">
								音楽生成
							</h3>
							<p className="text-muted-foreground">
								AIが作る完全オリジナルの楽曲。動画やプレゼンテーションのBGMをカスタム作成。
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
