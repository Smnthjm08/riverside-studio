import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/db/prisma";

export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "User not authenticated" },
            { status: 401 }
        );
    }

    try {
        const rooms = await prisma.room.findMany({
            where: {
                ownerId: session.user.id,
            },
        });

        return NextResponse.json({
            success: true,
            data: rooms,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Error fetching rooms",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "User not authenticated" },
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const {
            name,
            enableChat,
            isPublic,
            isPasswordProtected,
            password,
            maxParticipants,
        } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Room name is required" },
                { status: 400 }
            );
        }

        const room = await prisma.room.create({
            data: {
                name,
                enableChat,
                isPublic,
                isPasswordProtected,
                password: isPasswordProtected ? password : null,
                maxParticipants,
                ownerId: session.user.id,
            },
        });

        return NextResponse.json({
            success: true,
            data: room,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Error creating room",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
