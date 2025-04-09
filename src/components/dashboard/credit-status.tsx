"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export function CreditStatus() {
  return (
    <Card>
      <div className="relative h-32">
        <Image
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80"
          alt="Credit Status"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>クレジット残高</CardTitle>
        </div>
        <CardDescription>
          無料トライアル: 20クレジット中 15クレジット残っています
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={75} className="h-2" />
        <p className="text-sm text-muted-foreground mt-4">
          1クレジットで1回の画像生成または編集が可能です
        </p>
      </CardContent>
    </Card>
  );
}
