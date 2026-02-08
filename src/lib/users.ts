import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function createUser(clerkId: string, email: string) {
    try {
        const user = await prisma.user.create({
            data: {
                clerkId: clerkId,
                email: email,
                credits: 5,
                subscriptionState: 'FREE'
            },
        });

        return NextResponse.json({ user }, { status: 201 }); //　リソース作成時は201
    } catch (error) {
        console.error('Failed to create User: ', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function updateUser(clerkId: string, email: string) {
    try {
        const user = await prisma.user.update({
            where: {
                clerkId: clerkId,
            },
            data: {
                email: email
            }
        });

        return NextResponse.json({ user }, { status: 200 }); // 更新時は200
    } catch (error) {
        console.error('Failed to create User: ', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function deleteUser(clerkId: string) {
    try {
        /* Prismaのトランザクション処理：まずはUserテーブルに紐づくSubscriptionテーブルのデータを削除してからUserのデータを削除する */
        const user = await prisma.$transaction(async (tx) => {
            await tx.subscription.deleteMany({
                where: {
                    user: {
                        clerkId: clerkId
                    }
                }
            });
            const user = await tx.user.delete({
                where: {
                    clerkId: clerkId
                }
            });
            return user;
        });

        return NextResponse.json({ user }, { status: 200 }); 
    } catch (error) {
        console.error('Failed to create User: ', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}