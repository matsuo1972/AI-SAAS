"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AImagine</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#features"
            className="text-sm hover:text-primary transition-colors"
          >
            機能
          </a>
          <a
            href="#use-cases"
            className="text-sm hover:text-primary transition-colors"
          >
            活用例
          </a>
          <a
            href="#pricing"
            className="text-sm hover:text-primary transition-colors"
          >
            料金プラン
          </a>
          <Button variant="default">
            <Link href={"/dashboard"}>無料で始める</Link>
          </Button>
        </nav>
        <Button variant="outline" size="icon" className="md:hidden">
          <Zap className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
