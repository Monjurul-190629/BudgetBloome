import { z } from "zod";

export const ticketSchema = z.object({
  type: z
    .enum(["question"])
    .default("question"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .trim(),

  message: z
    .string()
    .min(1, "Message is required")
    .trim(),

  status: z
    .enum(["open", "closed"])
    .optional(),
});