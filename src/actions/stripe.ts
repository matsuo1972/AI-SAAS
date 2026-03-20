"use server";
import { STRIPE_PLANS } from "@/config/plans";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { StripeState } from "@/types/actions";
import { currentUser } from "@clerk/nextjs/server";

const ALLOWED_PRICE_IDS = new Set(Object.values(STRIPE_PLANS));

export default async function createStripeSession(
	prevState: StripeState,
	formData: FormData,
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

		let customerId = dbUser?.stripeCustomerId;

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

		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [
				{
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
		return {
			status: "error",
			error: "決済処理中にエラーが発生しました。",
			redirectUrl: "",
		};
	}
}
