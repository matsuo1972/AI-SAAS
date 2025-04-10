import { getUserCredits } from "@/lib/credits";
import { currentUser } from "@clerk/nextjs/server";
import { Lock } from "lucide-react";
import { Suspense } from "react";

async function CreditsContent() {
	const user = await currentUser();

	if (!user) {
		return (
			<div className="rounded-lg border bg-background p-4">
				<div className="font-medium text-sm text-muted-foreground">
					残りクレジット
				</div>
				<div className="mt-2 flex items-center gap-2 text-muted-foreground text-sm">
					<Lock className="size-3" />
					<span>ログインが必要です</span>
				</div>
			</div>
		);
	}
	const dbData = await getUserCredits();
	if (!dbData) {
		throw new Error("クレジット取得エラー");
	}

	return (
		<div className="rounded-lg border bg-background p-4">
			<div className="font-medium text-sm text-muted-foreground">
				残りクレジット
			</div>
			<div className="mt-2 font-bold">{dbData.credits} クレジット</div>
		</div>
	);
}

export default async function CreditDisplay() {
	return (
		<Suspense fallback="Loading...">
			{" "}
			{/** Reactの機能でLoadingアイコンを見せるやり方 Suspenseの中身はコンポーネントにしておかないと機能しない　*/}
			<CreditsContent />
		</Suspense>
	);
}
