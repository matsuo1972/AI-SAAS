"use server";
import { STRIPE_PLANS } from "@/config/plans";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { StripeState } from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";

const ALLOWED_PRICE_IDS = new Set(Object.values(STRIPE_PLANS));

export default async function createStripeSession(
	prevState: StripeState,
	formData: FormData
): Promise<StripeState> {
	const priceId = formData.get("priceId") as string;

	if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
		return {
			status: "error",
			error: "無効なプランが選択されました。",
			redirectUrl: "",
		};
	}

	const user = await currentUser();
	if (!user) {
		throw new Error("認証が必要です");
	}
	try {
		const dbUser = await prisma.user.findUnique({
			where: { clerkId: user.id },
		});

		// カスタマーIDを取得
		let customerId = dbUser?.stripeCustomerId;

		// 最初に決済したユーザーはStripeでユーザーを作成しそのIDをカスタマーIDに代入
		if (!customerId) {
			const customer = await stripe.customers.create({
				email: user.emailAddresses[0].emailAddress,
				metadata: {
					clerkId: user.id,
				},
			});

			await prisma.user.update({
				where: { clerkId: user.id },
				data: { stripeCustomerId: customer.id },
			});

			customerId = customer.id;
		}

		// const headersList = await headers()
		// const origin = headersList.get('origin')

		// Create Checkout Sessions from body params.
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
					price: priceId,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${process.env.BASE_URL}/dashboard/?success=true`,
			cancel_url: `${process.env.BASE_URL}/dashboard/?canceled=true`,
			metadata: {
				clerkId: user.id,
			},
		});
		// return NextResponse.redirect(session.url!, 303)

		if (!session.url) {
			throw new Error("セッションの作成に失敗しました");
		}
		return {
			status: "success",
			error: "",
			redirectUrl: session.url,
		};
	} catch (error) {
		console.error("Stripe session creation error: ", error);
		// return NextResponse.json(
		// { error: err.message },
		// { status: err.statusCode || 500 }
		// )
		return {
			status: "error",
			error: "決済処理中にエラーが発生しました。",
			redirectUrl: "",
		};
	}
}
