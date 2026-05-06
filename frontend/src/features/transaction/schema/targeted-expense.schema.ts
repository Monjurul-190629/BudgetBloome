import { z } from "zod";

export const targetedExpenseSchema = z.object({
  name: z.string().min(1, "Targeted expense name is required"),

  amount: z.coerce
    .number({
      message: "Amount is required",
    })
    .min(1, "Amount must be at least 1"),

  filled: z.boolean().optional(),
});