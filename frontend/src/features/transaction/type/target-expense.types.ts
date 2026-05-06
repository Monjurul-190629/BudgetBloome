import { z } from "zod";
import { targetedExpenseSchema } from "../schema/targeted-expense.schema";

export type MUTATE_TARGETED_EXPENSE = z.infer<typeof targetedExpenseSchema>;

export interface TARGETED_EXPENSE extends MUTATE_TARGETED_EXPENSE {
  _id?: string;
}

export type TARGETED_EXPENSE_PAYLOAD = {
  name: string;
  amount: number;
  filled?: boolean;
};

export type TARGETED_EXPENSE_RESPONSE = {
  _id: string;
  user: string;
  name: string;
  amount: number;
  filled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TARGETED_EXPENSES_RESPONSE = {
  data: TARGETED_EXPENSE_RESPONSE[];
  totalTargetedExpense?: number;
  thisMonthExpense?: number;
};