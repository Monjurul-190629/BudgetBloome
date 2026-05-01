import { z } from "zod";

export const transactionTypeEnum = z.enum(["income", "expense"])

export const transactionSchema = z.object({
  wallet: z.string().min(1, "Wallet is required"),
  category_name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  type: transactionTypeEnum,
  amount: z.coerce
    .number({
      message: "Amount is required",
    })
    .min(1, "Amount must be greater than 0"),
  created_date: z.date({
    message: "Created date is required",
  }),
});