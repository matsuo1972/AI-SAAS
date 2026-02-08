import { createUser, deleteUser, updateUser } from "@/lib/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
	const SIGNING_SECRET = process.env.SIGNING_SECRET;

	if (!SIGNING_SECRET) {
		console.error("SIGNING_SECRET is not configured");
		return new Response("Webhook configuration error", { status: 500 });
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	// Get headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error: Missing Svix headers", {
			status: 400,
		});
	}

	// Get body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt: WebhookEvent;

	// Verify payload with headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error: Could not verify webhook:", err);
		return new Response("Error: Verification error", {
			status: 400,
		});
	}

	if (evt.type === "user.created") {
		const { id, email_addresses } = evt.data;
		const email = email_addresses[0].email_address;
		try {
			await createUser(id, email);
			return NextResponse.json({ success: true }, { status: 201 });
		} catch (error) {
			console.error("Webhook handler error:", error);
			return NextResponse.json({ error: "Internal server error" }, { status: 500 });
		}
	}

	if (evt.type === "user.updated") {
		const { id, email_addresses } = evt.data;
		const email = email_addresses[0].email_address;
		try {
			await updateUser(id, email);
			return NextResponse.json({ success: true }, { status: 200 });
		} catch (error) {
			console.error("Webhook handler error:", error);
			return NextResponse.json({ error: "Internal server error" }, { status: 500 });
		}
	}

	if (evt.type === "user.deleted") {
		const { id } = evt.data;

		if (!id) {
			return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
		}
		try {
			await deleteUser(id);
			return NextResponse.json({ success: true }, { status: 200 });
		} catch (error) {
			console.error("Webhook handler error:", error);
			return NextResponse.json({ error: "Internal server error" }, { status: 500 });
		}
	}

	return new Response("Webhook received", { status: 200 });
}
