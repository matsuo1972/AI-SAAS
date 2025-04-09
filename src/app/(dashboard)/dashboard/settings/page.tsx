import PageContainer from "@/components/dashboard/page-container";
import PageHeader from "@/components/dashboard/page-header";
import ProfileSection from "@/components/dashboard/settings/profile-section";
import { SubscriptionSettingsForm } from "@/components/dashboard/settings/subscription-settings-form";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


export default async function SettingsPage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div>
                ログインしてください。
            </div>
        )
    }
    const dbUser = await prisma.user.findUnique({
        where : {
            clerkId: user.id
        },
        include: {
            subscriptions: true
        }
    });

    if (!dbUser) {
        throw new Error('ユーザーが見つかりませんでした。');
    }
    return (
        <PageContainer>
            <PageHeader title="設定" description="アカウントの確認とサブスクリプションの設定を管理します">
                { /* アカウントの確認 */ }
                <div className="max-w-2xl">
                    <ProfileSection email={user.emailAddresses[0].emailAddress} subscriptionState={ dbUser.subscriptionState } nextBillingDate={dbUser.subscriptions?.stripeCurrentPeriodEnd} />
                </div>

                { /* サブスクリプション管理用のフォーム・ボタン */ }
                <div className="max-w-2xl">
                    <SubscriptionSettingsForm user={dbUser} />
                </div>
            </PageHeader>
        </PageContainer>
    )
}
