"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Testimonials() {
	const testimonials = [
		{
			name: "田中 美咲",
			role: "フリーランスデザイナー",
			image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
			content:
				"AIStationのおかげで、クライアントワークの効率が格段に上がりました。特に背景除去機能は本当に便利です。",
		},
		{
			name: "佐藤 健一",
			role: "マーケティングマネージャー",
			image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
			content:
				"SNSマーケティングの画像作成が驚くほど簡単になりました。チーム全体の生産性が向上しています。",
		},
		{
			name: "山田 優子",
			role: "ECサイトオーナー",
			image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
			content:
				"商品画像の編集が簡単にできるようになり、オンラインストアの見栄えが格段に良くなりました。",
		},
	];

	return (
		<section className="py-16 bg-muted/50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					お客様の声
				</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card p-6 rounded-lg border"
						>
							<div className="flex items-center gap-4 mb-4">
								<div className="relative w-12 h-12 rounded-full overflow-hidden">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										fill
										sizes="48px"
										className="object-cover"
									/>
								</div>
								<div>
									<h3 className="font-semibold">
										{testimonial.name}
									</h3>
									<p className="text-sm text-muted-foreground">
										{testimonial.role}
									</p>
								</div>
							</div>
							<p className="text-muted-foreground">
								{testimonial.content}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
