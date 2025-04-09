"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">料金プラン</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card p-6 rounded-lg border"
          >
            <h3 className="text-xl font-semibold mb-2">フリープラン</h3>
            <div className="text-3xl font-bold mb-4">¥0/月</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>月20クレジット</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>基本機能利用可能</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>画質標準</span>
              </li>
            </ul>
            <Button className="w-full">無料で始める</Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-6 rounded-lg border border-primary"
          >
            <h3 className="text-xl font-semibold mb-2">プロプラン</h3>
            <div className="text-3xl font-bold mb-4">¥2,980/月</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>月200クレジット</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>全機能利用可能</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>画質高品質</span>
              </li>
            </ul>
            <Button className="w-full" variant="default">
              プロプランを選択
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 rounded-lg border"
          >
            <h3 className="text-xl font-semibold mb-2">エンタープライズ</h3>
            <div className="text-3xl font-bold mb-4">要相談</div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>無制限クレジット</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>API利用可能</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary" />
                <span>カスタムサポート</span>
              </li>
            </ul>
            <Button className="w-full" variant="outline">
              お問い合わせ
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
