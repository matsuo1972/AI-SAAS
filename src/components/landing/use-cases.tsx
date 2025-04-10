"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function UseCases() {
	return (
		<section id="use-cases" className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					活用シーン
				</h2>
				<div className="grid md:grid-cols-2 gap-12">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-4"
					>
						<div className="relative h-64 rounded-lg overflow-hidden mb-6">
							<Image
								src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80"
								alt="デザイナー・クリエイター"
								fill
								className="object-cover"
							/>
						</div>
						<h3 className="text-2xl font-semibold">
							デザイナー・クリエイター
						</h3>
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>素材作成の時間を大幅短縮</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>クライアントワークの効率化</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>アイデアの素早い可視化</span>
							</li>
						</ul>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="space-y-4"
					>
						<div className="relative h-64 rounded-lg overflow-hidden mb-6">
							<Image
								src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80"
								alt="マーケター"
								fill
								className="object-cover"
							/>
						</div>
						<h3 className="text-2xl font-semibold">マーケター</h3>
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>SNS投稿用画像の作成</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>広告バナーの制作</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>プロモーション素材の準備</span>
							</li>
						</ul>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
