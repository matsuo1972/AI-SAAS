"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center"
				>
					<h2 className="text-3xl font-bold mb-6">
						今すぐ始めましょう
					</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						無料トライアルで20クレジットをプレゼント。
						メールアドレスを登録するだけで、すぐに利用開始できます。
					</p>
					<Button size="lg" className="gap-2">
						無料トライアルを始める
						<ArrowRight className="h-4 w-4" />
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
