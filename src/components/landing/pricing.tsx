"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Pricing() {
	return (
		<section id="pricing" className="py-16 bg-muted/50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					料金プラン
				</h2>
				<div className="grid md:grid-cols-4 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="bg-card p-6 rounded-lg border"
					>
						<h3 className="text-xl font-semibold mb-2">
							フリープラン
						</h3>
						<div className="text-3xl font-bold mb-4">¥0/月</div>
						<ul className="space-y-2 mb-6">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>月5クレジット</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>全機能利用可能</span>
							</li>
						</ul>
						<Button className="w-full">
							<Link href={"/dashboard"}>無料で始める</Link>
						</Button>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-card p-6 rounded-lg border"
					>
						<h3 className="text-xl font-semibold mb-2">
							スタータープラン
						</h3>
						<div className="text-3xl font-bold mb-4">¥1,000/月</div>
						<ul className="space-y-2 mb-6">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>月50クレジット</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>全機能利用可能</span>
							</li>
						</ul>
						<Button className="w-full" variant="default">
							<Link href={"/dashboard/plan"}>STARTER</Link>
						</Button>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="bg-card p-6 rounded-lg border border-primary"
					>
						<h3 className="text-xl font-semibold mb-2">
							プロプラン
						</h3>
						<div className="text-3xl font-bold mb-4">¥2,000/月</div>
						<ul className="space-y-2 mb-6">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>月120クレジット</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>全機能利用可能</span>
							</li>
						</ul>
						<Button className="w-full" variant="default">
							<Link href={"/dashboard/plan"}>PRO</Link>
						</Button>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-card p-6 rounded-lg border"
					>
						<h3 className="text-xl font-semibold mb-2">
							エンタープライズ
						</h3>
						<div className="text-3xl font-bold mb-4">¥5,000/月</div>
						<ul className="space-y-2 mb-6">
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>月300クレジット</span>
							</li>
							<li className="flex items-center gap-2">
								<ArrowRight className="h-4 w-4 text-primary" />
								<span>全機能利用可能</span>
							</li>
						</ul>
						<Button className="w-full" variant="default">
							<Link href={"/dashboard/plan"}>ENTERPRISE</Link>
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
