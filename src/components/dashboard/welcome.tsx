"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export function Welcome() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>ようこそ AImagine へ！</CardTitle>
          <CardDescription>
            AIを活用した画像編集ツールで、クリエイティブワークを効率化しましょう。
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button className="h-auto p-4 text-left" variant="outline">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">チュートリアルを見る</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  基本的な使い方を動画で学べます
                </p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
            <Button className="h-auto p-4 text-left" variant="outline">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">サンプルを試す</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  実際の使用例を体験できます
                </p>
              </div>
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Button>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              alt="Tutorial Preview"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <div className="relative aspect-square">
          <Image
            src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?auto=format&fit=crop&q=80"
            alt="AI Image Processing"
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <p className="font-medium">今日のヒント</p>
          <p className="text-sm text-muted-foreground">
            プロンプトに詳細な説明を加えることで、より精度の高い画像生成が可能です。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
