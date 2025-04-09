"use client";

import { removeBackground } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { GenerateImageState } from "@/types/actions";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Download, ImageIcon, Layers } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import LoadingSpinner from "../loading-spinner";

const initialState: GenerateImageState = {
	status: "idle",
};
export default function backgroundRemover() {
	// ユーザーが認証しているかを検証
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { isSignedIn } = useUser();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [state, formAction, isPending] = useActionState(
		removeBackground,
		initialState
	);

	if (state.error && state.redirect) {
		return redirect(state.redirect);
	}

	const handleDownload = () => {
		if (!state.processedImage) {
			return;
		}
		try {
			const base64Data = state.processedImage.split(",")[1];
			const blob = new Blob([Buffer.from(base64Data, "base64")], {
				type: "image/png",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `background-removed-${state.fileName}.png`;
			document.body.appendChild(link);
			link.click();

			// 一時的に作ったリンクをメモリリークを防ぐために削除する必要がある
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			toast("ダウンロード完了！");
		} catch (error) {
			console.error("Download Error", error);
			toast("エラー: ダウンロードに失敗しました");
		}
	};

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<form className="space-y-4" action={formAction}>
					<div className="space-y-2">
						<Label htmlFor="image">ファイルをアップロード</Label>
						<Input
							required
							id="image"
							type="file"
							accept="image/*"
							name="image"
							className="w-full"
						/>
					</div>
					{/* submit ボタン */}
					{isSignedIn ? (
						<Button
							disabled={isPending}
							className={cn(
								"w-full duration-200",
								isPending && "bg-primary/80"
							)}
						>
							{isPending ? (
								<LoadingSpinner />
							) : (
								<>
									<Layers className="mr-2" />
									背景を削除
								</>
							)}
						</Button>
					) : (
						<SignInButton mode="modal">
							<Button className="w-full">
								<ImageIcon className="mr-2" />
								ログインしてから背景を削除
							</Button>
						</SignInButton>
					)}
				</form>
			</div>

			{/* image preview */}
			{state.processedImage && (
				<div className="space-y-4">
					<div className="overflow-hidden rounded-lg border bg-background ">
						<div className="aspect-video relative">
							<img
								src={state.processedImage}
								alt="Generated Image"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					<Button className="w-full" onClick={handleDownload}>
						<Download className="mr-2" />
						ダウンロード
					</Button>
				</div>
			)}
		</div>
	);
}
