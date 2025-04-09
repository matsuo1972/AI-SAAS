import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_JP } from 'next/font/google';
import {
  ClerkProvider,
} from '@clerk/nextjs'

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  preload: true,
});

export const metadata: Metadata = {
  title: "AI saas App",
  description: "AIの機能を使ったWEBサービスです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/dashboard'}>
      <html suppressHydrationWarning lang="ja">
        <body
          suppressHydrationWarning className={`${notoSansJP.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
