'use client'

import createStripeSession from "@/actions/stripe";
import { Button } from "@/components/ui/button";
import { plans } from "@/config/plans";
import { StripeState } from "@/types/actions";
import { Check } from "lucide-react";
import { useActionState } from "react";
import { toast } from "sonner";


const initialState: StripeState = {
    status: "idle",
    error: "",
    redirectUrl: ''
}

export default function Plan() {
    // サーバーアクションでの返り値でエラーハンドリングする場合の書き方、もしくはリダイレクトさせたい時の書き方
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction, isPending] = useActionState(
        async(prevState: StripeState, formData: FormData) => {
            const result = await createStripeSession(prevState, formData);
            console.log('result = ', result);
            if (result.status === 'error') {
                toast("error",{
                    description: result.error
                });
            } else if (result.status === 'success' && result.redirectUrl) {
                window.location.href = result.redirectUrl;
            }
            return result;
        }
    , initialState);
    return (
        <>
            <div className="container py-8 mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="font-bold text-4xl">料金プラン</h1>
                    <p className="mt-4 text-muted-foreground text-lg">あなたのニーズに合わせて最適なプランをお選びください。</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
            {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                    <div key={plan.priceId} className={`border rounded-xl bg-card p-8 shadow-sm flex flex-col ${plan.popular ? "ring-2 ring-primary scale-105" : ''}`}>
                    <div className="space-y-6 flex-1">
                        <div className="space-y-4">
                            {plan.popular && (
                                <div className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                                    人気プラン
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Icon className="size-6 text-primary"/>
                                <h2 className="text-2xl font-bold">{ plan.name }</h2>
                            </div>
                            <p className="text-muted-foreground">{ plan.description }</p>
                        </div>

                        <div className="flex items-baseline">
                            <span className="text-4xl font-bold">{ plan.price }</span>
                            <span className="ml-2 text-muted-foreground">/月</span>
                        </div>

                        <ul className="space-y-4">
                            { plan.features.map((feature) => {
                                return (
                                    <li key={ feature } className="flex items-center gap-3">
                                        <Check className="size-4 text-primary"/>
                                        <span>{ feature }</span>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>

                    <form action={formAction}>
                        <input name='priceId' value={plan.priceId} type="hidden" />
                        <Button className="w-full mt-8 size={'lg'}" variant={plan.popular ? 'default' : 'outline'} type="submit">{ plan.buttonText }</Button>
                    </form>
                </div>
                )
            })}
            </div>
        </>
    )
}
