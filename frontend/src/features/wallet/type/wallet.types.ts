import { z } from "zod";
import { walletSchema } from "../schema/wallet.schema";

export type MUTATE_WALLET = z.infer<typeof walletSchema>;

export interface WALLET extends MUTATE_WALLET{
  _id?: string;
}

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