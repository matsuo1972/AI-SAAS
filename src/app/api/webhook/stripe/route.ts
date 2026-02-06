import { stripe } from "@/lib/stripe";
import {
	handleSubscriptionCreated,
	handleSubscriptionDeleted,
	handleSubscriptionUpdated,
} from "@/lib/subscriptions";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
	try {
		let event;
		const body = await request.text();
		const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

		if (!endPointSecret) {
			return new NextResponse("Webhook secret not configured", {
				status: 500,
			});
		}

		const signature = request.headers.get("stripe-signature");
		if (!signature) {
			return new NextResponse("Missing stripe-signature header", {
				status: 400,
			});
		}

		try {
			event = stripe.webhooks.constructEvent(
				body,
				signature,
				endPointSecret
			);
		} catch (err) {
			console.error("Webhook signature verification failed:", err);
			return new NextResponse("Webhook signature verification failed", {
				status: 400,
			});
		}

		if (!event) {
			return new NextResponse("Webhook Event Error", { status: 500 });
		}

		const subscription = event.data.object as Stripe.Subscription;

		// Handle the event
		switch (event.type) {
			case "customer.subscription.created": {
				await handleSubscriptionCreated(subscription);
				break;
			}

			case "customer.subscription.updated": {
				await handleSubscriptionUpdated(subscription);
				break;
			}

			case "customer.subscription.deleted": {
				await handleSubscriptionDeleted(subscription);
				break;
			}
		}
		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Error: ", error);
		return NextResponse.json(
			{ error: "Internal Server Error " },
			{ status: 500 }
		);
	}
}
