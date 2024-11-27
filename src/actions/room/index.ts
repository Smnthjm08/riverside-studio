"use server";

import { prisma } from "@/db/prisma";
import { roomSchema } from "./schema";
import { auth } from "../../../auth";
import { z } from "zod";

export async function createRoom(
  unsafeData: z.infer<typeof roomSchema>
): Promise<{
  status: number;
  data?: unknown;
  error?: boolean;
  message?: string;
}> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      status: 401,
      error: true,
      message: "Unauthorized access. User not authenticated.",
    };
  }

  const parsed = roomSchema.safeParse(unsafeData);

  if (!parsed.success) {
    return { status: 400, error: true, message: "Invalid data provided." };
  }

  const { data } = parsed;

  try {
    const room = await prisma.room.create({
      data: {
        ...data,
        ownerId: session.user.id,
      },
    });
    return {
      status: 201,
      data: room,
    };
  } catch (error) {
    console.error("Error Creating Room:", error);

    return {
      status: 500,
      error: true,
      message: "Failed to create the room. Please try again later.",
    };
  }
}

export async function getRoom() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      status: 401,
      error: true,
      message: "Unauthorized access. User not authenticated.",
    };
  }

  const room = await prisma.room.findMany({
    where: { ownerId: session?.user?.id },
  });
  return { status: 200, data: room };
}
