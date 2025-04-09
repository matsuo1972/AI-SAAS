
interface ProfileSectionProps {
    email: string;
    subscriptionState: string;
    nextBillingDate?: Date;
}

export default function ProfileSection({ email, subscriptionState, nextBillingDate }: ProfileSectionProps) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">プロフィール</h2>
            <div className="grid gap-4 p-4 border-2 rounded-lg">
                <div className="grid gap-1">
                    <p className="text-sm font-medium">メールアドレス</p>
                    <p className="text-sm text-muted-foreground">{ email }</p>
                </div>

                <div className="grid gap-1">
                    <p className="text-sm font-medium">現在プラン</p>
                    <p className="text-sm text-muted-foreground">{ subscriptionState }プラン</p>
                </div>

                <div className="grid gap-1">
                    <p className="text-sm font-medium">次回の更新日</p>
                    <p className="text-sm text-muted-foreground">
                        { nextBillingDate?.toLocaleDateString('ja-JP') }
                    </p>
                </div>
            </div>
        </div>
    )
}
