import { z } from "zod";
import { walletSchema } from "../schema/wallet.api";

export type WALLET = z.infer<typeof walletSchema>;

export type WALLET_PAYLOAD = {
  wallet_name: string;
  amount: number;
};

export type WALLET_RESPONSE = {
  _id: string;
  user: string;
  wallet_name: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};