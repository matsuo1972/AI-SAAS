"use client";

import { CTA } from "@/components/landing/cta";
import { Examples } from "@/components/landing/examples";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { UseCases } from "@/components/landing/use-cases";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<div className="min-h-screen bg-background relative">
			{/* Animated background patterns */}
			<div className="fixed inset-0 -z-10 overflow-hidden">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.4 }}
					transition={{ duration: 1 }}
					className="absolute inset-0"
				>
					{/* Gradient orbs */}
					<div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
					<div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
					<div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

					{/* Grid pattern */}
					<div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.background)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.background)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
				</motion.div>
			</div>

			<Header />
			<Hero />
			<Stats />
			<Features />
			<Examples />
			<UseCases />
			<Testimonials />
			<Pricing />
			<FAQ />
			<CTA />
			<Footer />
		</div>
	);
}
