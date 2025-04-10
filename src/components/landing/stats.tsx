"use client";

import { motion } from "framer-motion";

export function Stats() {
	const stats = [
		{
			value: "50万+",
			label: "生成画像数",
		},
		{
			value: "10万+",
			label: "ユーザー数",
		},
		{
			value: "98%",
			label: "顧客満足度",
		},
		{
			value: "24時間",
			label: "サポート対応",
		},
	];

	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className="text-center"
						>
							<div className="text-4xl font-bold mb-2">
								{stat.value}
							</div>
							<div className="text-muted-foreground">
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
