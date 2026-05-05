import { z } from "zod";

export const goalSchema = z.object({
  name: z
    .string()
    .min(1, "Goal name is required")
    .trim(),

  amount: z.coerce
    .number({
      message: "Amount is required",
    })
    .min(1, "Amount must be at least 1"),

  filled: z.boolean().optional(),

  description: z
    .string()
    .trim()
    .optional(),
});