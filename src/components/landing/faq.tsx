"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FAQ() {
	const faqs = [
		{
			question: "無料トライアルはどのように始められますか？",
			answer: "メールアドレスを登録するだけで、すぐに20クレジット分の無料トライアルを開始できます。クレジットカードの登録は不要です。",
		},
		{
			question: "1クレジットで何ができますか？",
			answer: "1クレジットで1回の画像生成、背景除去、または高品質な画像圧縮が可能です。画像のサイズや複雑さによって消費されるクレジット数が変わることはありません。",
		},
		{
			question: "生成された画像の著作権はどうなりますか？",
			answer: "AImagineで生成された画像の著作権は、生成したユーザーに帰属します。商用利用も可能です。ただし、他者の著作権を侵害するような使用は禁止されています。",
		},
		{
			question: "対応している画像フォーマットは？",
			answer: "JPG、PNG、WEBP、GIF、SVGなど、一般的な画像フォーマットに対応しています。出力フォーマットは用途に応じて選択可能です。",
		},
		{
			question: "アップロードした画像のプライバシーは守られますか？",
			answer: "はい。アップロードされた画像は暗号化して保存され、処理完了後24時間で自動的に削除されます。また、他のユーザーがアクセスすることはできません。",
		},
		{
			question: "プランはいつでもキャンセルできますか？",
			answer: "はい。月額プランはいつでもキャンセル可能で、次回の更新日までサービスを利用できます。年間プランの場合は、未使用期間分が返金されます。",
		},
	];

	return (
		<section className="py-16 bg-muted/50">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center mb-12"
				>
					<h2 className="text-3xl font-bold mb-4">よくある質問</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AImagineに関する一般的な質問をまとめました。
						さらに詳しい情報は、ヘルプセンターをご覧ください。
					</p>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="max-w-3xl mx-auto"
				>
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq, index) => (
							<AccordionItem key={index} value={`item-${index}`}>
								<AccordionTrigger className="text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
