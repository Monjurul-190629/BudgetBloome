// src/features/transaction/types/transaction.types.ts

import { z } from "zod";
import { transactionSchema } from "../schema/transaction.schema";
import { WALLET_RESPONSE } from "@/features/wallet/type/wallet.types";

export type MUTATE_TRANSACTION = z.infer<typeof transactionSchema>;

export interface TRANSACTION extends MUTATE_TRANSACTION{
  _id?: string;
}

export type TRANSACTION_PAYLOAD = {
  wallet: string;
  category_name: string;
  description?: string;
  amount: number;
  created_date: Date | string;
};

export type TRANSACTION_RESPONSE = {
  _id: string;
  user: string;
  wallet: WALLET_RESPONSE;
  category_name: string;
  description?: string;
  amount: number;
  created_date: string;
  createdAt: string;
  updatedAt: string;
};

export type TRANSACTION_HISTORY_RESPONSE = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: TRANSACTION_RESPONSE[];
};