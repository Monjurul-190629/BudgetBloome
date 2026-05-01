import { z } from "zod";

export const walletSchema = z.object({
  wallet_name: z.string().min(1, "Wallet name is required"),
  amount: z.coerce
    .number({
      message: "Amount is required",
    })
    .min(0, "Amount cannot be negative"),
});