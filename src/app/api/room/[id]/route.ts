import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/db/primsa";

export async function GET({ params }: { params: { roomId: string } }) {
  const { roomId } = params;

  if (!roomId) {
    return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
        ownerId: session.user.id,
      },
    });

    if (!room) {
      return NextResponse.json(
        { error: "Room not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, room });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while fetching the room",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
