import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(4, "Room name to be minimum 4 characters"),
  enableChat: z.boolean().default(false),
  isPasswordProtected: z.boolean().default(false),
  password: z
    .string()
    .min(4, "Password to be minimum of 4 characters")
    .optional(),
  maxParticipants: z.number().default(2),
});
