"use client";

import { motion } from "framer-motion";
import { FileDown, Image as ImageIcon, Zap } from "lucide-react";
import Image from "next/image";

export function Features() {
  return (
    <section id="features" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">主要機能</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-lg border overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80"
                alt="AI画像生成"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <ImageIcon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI画像生成</h3>
              <p className="text-muted-foreground">
                テキストから希望の画像を生成。ブランドに合わせたビジュアルを瞬時に作成できます。
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg border overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
                alt="背景除去"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">背景除去</h3>
              <p className="text-muted-foreground">
                ワンクリックで背景を自動除去。商品画像の編集や素材作成が驚くほど簡単に。
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg border overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80"
                alt="画像圧縮"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <FileDown className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">画像圧縮</h3>
              <p className="text-muted-foreground">
                品質を保ちながら最適なサイズに圧縮。ウェブサイトのパフォーマンスを向上。
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
