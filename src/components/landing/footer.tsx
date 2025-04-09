"use client";

import { Sparkles } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-muted/50 py-12">
			<div className="container mx-auto px-4">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center space-x-2 mb-4">
							<Sparkles className="h-6 w-6 text-primary" />
							<span className="text-xl font-bold">AImagine</span>
						</div>
						<p className="text-sm text-muted-foreground">
							AIで画像編集をもっと簡単に。
							クリエイターの作業効率を劇的に向上させます。
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-4">製品</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="#features"
									className="text-muted-foreground hover:text-primary"
								>
									機能
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className="text-muted-foreground hover:text-primary"
								>
									料金プラン
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									ステータス
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">サポート</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									ヘルプセンター
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									お問い合わせ
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									API ドキュメント
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="font-semibold mb-4">法的情報</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									利用規約
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									プライバシーポリシー
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-muted-foreground hover:text-primary"
								>
									特定商取引法に基づく表記
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
					© 2024 AImagine. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
