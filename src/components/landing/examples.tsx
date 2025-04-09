"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Examples() {
  const examples = [
    {
      before:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80",
      after:
        "https://images.unsplash.com/photo-1600880292089-90a6a0a4c3d1?auto=format&fit=crop&q=80",
      title: "商品画像の背景除去",
      description:
        "商品写真から背景を自動で除去し、プロフェッショナルな仕上がりに",
    },
    {
      before:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
      after:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80",
      title: "画像生成",
      description: "テキストプロンプトから希望のイメージを生成",
    },
    {
      before:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
      after:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80",
      title: "画像加工",
      description: "色調補正やフィルター適用で魅力的な仕上がりに",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">活用例</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <span className="text-white font-medium">Before</span>
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
                  <span className="text-white font-medium">After</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
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
