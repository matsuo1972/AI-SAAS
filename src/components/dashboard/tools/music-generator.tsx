"use client";

import { generateMusic } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { GenerateMusicState } from "@/types/actions";
import { SignInButton, useUser } from "@clerk/nextjs";
import { FileAudio } from "lucide-react";
import { redirect } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import LoadingSpinner from "../loading-spinner";

const initialState: GenerateMusicState = {
	status: "idle",
};

export default function MusicGenerator() {
	const audioRef = useRef<HTMLAudioElement>(null);

	const [durationRange, setDurationRange] = useState(190);
	const [seedRange, setSeedRange] = useState(0);
	const [stepRange, setStepRange] = useState(50);
	const [cfgScaleRange, setCfgScaleRange] = useState(7);

	// ユーザーが認証しているかを検証
	const { isSignedIn } = useUser();

	const [state, formAction, isPending] = useActionState(
		generateMusic,
		initialState
	);

	if (state.error && state.redirect) {
		console.error("error: ", state.redirect);
		return redirect(state.redirect);
	}

	const handleDownload = async () => {
		if (!state.success) {
			return;
		}
		if (!state.audioData) return;

		if (!state.fileName) {
			return;
		}

		const link = document.createElement("a");
		link.href = state.audioData;
		link.download = state.fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<form className="space-y-4" action={formAction}>
					<div className="space-y-4">
						<Label htmlFor="prompt">キーワード</Label>
						<Input
							required
							id="prompt"
							name="prompt"
							placeholder="作曲したい曲のキーワードを入力"
						></Input>
						<div className="flex justify-between">
							<span className="pr-5">duration:</span>
							<span className="pr-5">{durationRange}</span>
							<Slider
								defaultValue={[190]}
								max={190}
								min={1}
								step={1}
								onValueChange={(value: number[]) =>
									setDurationRange(value[0])
								}
							/>
						</div>
						<div className="flex justify-between">
							<span className="pr-5">seed:</span>
							<span className="pr-5">{seedRange}</span>
							<Slider
								defaultValue={[0]}
								max={4294967294}
								min={0}
								step={1}
								onValueChange={(value: number[]) =>
									setSeedRange(value[0])
								}
							/>
						</div>
						<div className="flex justify-between">
							<span className="pr-5">steps:</span>
							<span className="pr-5">{stepRange}</span>
							<Slider
								defaultValue={[50]}
								max={100}
								min={30}
								step={1}
								onValueChange={(value: number[]) =>
									setStepRange(value[0])
								}
							/>
						</div>
						<div className="flex justify-between">
							<span className="pr-5">cfg_scale:</span>
							<span className="pr-5">{cfgScaleRange}</span>
							<Slider
								defaultValue={[7]}
								max={25}
								min={1}
								step={1}
								onValueChange={(value: number[]) =>
									setCfgScaleRange(value[0])
								}
							/>
						</div>
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
									<FileAudio className="mr-2" />
									曲を生成する
								</>
							)}
						</Button>
					) : (
						<SignInButton mode="modal">
							<Button className="w-full">
								<FileAudio className="mr-2" />
								ログインしてから曲を生成
							</Button>
						</SignInButton>
					)}
					<input
						type="hidden"
						name="duration"
						value={durationRange}
					/>
					<input type="hidden" name="seed" value={seedRange} />
					<input type="hidden" name="steps" value={stepRange} />
					<input
						type="hidden"
						name="cfgScale"
						value={cfgScaleRange}
					/>
				</form>
			</div>

			{state.success && state.audioData && (
				<div className="space-y-4 pt-8">
					<h3 className="font-bold">Your Generated Music</h3>
					<audio ref={audioRef} controls src={state.audioData} />
					<Button onClick={handleDownload}>Download Music</Button>
				</div>
			)}

			{state.error && (
				<div className="error-message">
					<p>Error: {state.error}</p>
				</div>
			)}
		</div>
	);
}
