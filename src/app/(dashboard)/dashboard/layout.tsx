import AuthButton from "@/components/auth/auth-button";
import MobileNav from "@/components/dashboard/mobile-nav";
import DashboardNav from "@/components/dashboard/nav";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            { /** header */}
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="flex items-center h-16 px-6">
                    <MobileNav />

                    <div className="flex w-full items-center">
                        <Link href='/'>
                            <h1 className="text-lg font-bold">AI Image generator</h1>
                        </Link>

                        <div className="ml-auto hidden md:block">
                            <AuthButton />
                        </div>
                    </div>

                </div>
            </header>

            { /** sidebar and main contents */}
            <div className="md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"> { /** 左のサイドメニューが220px固定で残りがコンテンツエリア（1fr は空いた余白を全部使うという意味）　*/ }
                { /** sidebar */}
                <aside className="fixed md:sticky top-16 z-30 hidden md:block border-r h-[calc(100vh-4.1rem)]"> { /** fixedで固定にする 画面が大きい時はナビゲーションが見えて小さい時は消える　*/}
                    <div className="py-6 px-2 lg:py-8">
                        <DashboardNav />
                    </div>
                </aside>

                { /** main contents */ }
                <main className="flex w-full flex-col overflow-hidden p-4">
                    {children}
                </main>
            </div>

            <Toaster />
        </div>
    );
}
