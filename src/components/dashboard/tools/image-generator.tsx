'use client'

import { generateImage } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GenerateImageState } from "@/types/actions";
import { Download, ImageIcon } from "lucide-react";
import { useActionState } from "react";
import LoadingSpinner from "../loading-spinner";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";


const initialState: GenerateImageState = {
    status: "idle"
}
export default function ImageGenerator() {
    // ユーザーが認証しているかを検証
    const { isSignedIn } = useUser();
    
    const [state, formAction, isPending] = useActionState(generateImage, initialState);

    console.log('state = ', state);

    if (state.error && state.redirect) {
        console.log('error: ', state.redirect);
        return redirect(state.redirect);
    }

    const handleDownload = () => {
        if (!state.imageUrl) {
            return;
        }
        try {
            const base64Data = state.imageUrl.split(',')[1];
            const blob = new Blob([Buffer.from(base64Data, 'base64')], {type: 'image/png'});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${state.keyword}.png`;
            document.body.appendChild(link);
            link.click();

            // 一時的に作ったリンクをメモリリークを防ぐために削除する必要がある
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast('ダウンロード完了！')
        } catch (error) {
            console.error('Download Error', error);
            toast('エラー: ダウンロードに失敗しました');
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <form className="space-y-4" action={formAction}>
                    <div className="space-y-2">
                        <Label htmlFor="keyword">キーワード</Label>
                        <Input required id="keyword" name="keyword" placeholder="作成したい画像のキーワードを入力（例：海、山、都会、自然）"></Input>
                    </div>
                    { /* submit ボタン */}
                    { isSignedIn ? (
                        <Button disabled={isPending} className={ cn("w-full duration-200", isPending && 'bg-primary/80') }>
                            { isPending ? (<LoadingSpinner />) : <><ImageIcon className="mr-2"/>画像を生成する</>}
                        </Button>
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="w-full">
                                <ImageIcon className="mr-2" />
                                ログインしてから画像を生成
                            </Button>
                        </SignInButton>
                    )}
                </form>
            </div>

            { /* image preview */ }
            {state.imageUrl && (
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg border bg-background ">
                        <div className="aspect-video relative">
                            <img src={state.imageUrl} alt="Generated Image" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                    <Button className="w-full" onClick={handleDownload}>
                        <Download className="mr-2"/>
                        ダウンロード
                    </Button>
                </div>
            )}
        </div>
    )
}
