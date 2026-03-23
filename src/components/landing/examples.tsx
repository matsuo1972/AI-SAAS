"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Examples() {
	const examples = [
		{
			before: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
			after: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80",
			title: "AI画像生成",
			description: "テキストプロンプトから希望のイメージを生成",
		},
		{
			before: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80",
			after: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80",
			title: "音楽生成",
			description: "テキストプロンプトからオリジナル楽曲を生成",
		},
		{
			before: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80",
			after: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&blend=000000&blend-alpha=0",
			title: "AI背景除去",
			description: "画像から背景を自動で除去し、透明化",
		},
	];

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">活用例</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{examples.map((example, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="bg-card rounded-lg overflow-hidden border"
						>
							<div className="relative aspect-square">
								<Image
									src={example.before}
									alt={`${example.title} - Before`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
									<span className="text-white font-medium">
										Before
									</span>
								</div>
							</div>
							<div className="relative aspect-square">
								<Image
									src={example.after}
									alt={`${example.title} - After`}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
									<span className="text-white font-medium">
										After
									</span>
								</div>
							</div>
							<div className="p-4">
								<h3 className="text-lg font-semibold mb-2">
									{example.title}
								</h3>
								<p className="text-muted-foreground text-sm">
									{example.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
