import { instance } from "@/lib/api/apiIntellisence";
import { TRANSACTION_PAYLOAD } from "../type/transaction.type";

export const createTransaction = ({
  data,
}: {
  data: TRANSACTION_PAYLOAD;
}) => instance.post("/transactions", data);

export const getTransactionHistory = ({ page = 1 }: { page?: number }) =>
  instance.get(`/transactions?page=${page}`);

export const getTotalExpense = () => instance.get("/transactions/total-expense");

export const deleteTransaction = ({ id }: { id: string }) =>
  instance.delete(`/transactions/${id}`);