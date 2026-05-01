import { instance } from "@/lib/api/apiIntellisence";
import { TRANSACTION_PAYLOAD } from "../type/transaction.type";

export const createTransaction = ({
  data,
}: {
  data: TRANSACTION_PAYLOAD;
}) => instance.post("/transactions", data);

export const getTransactionHistory = ({
  page = 1,
  from,
  to,
}: {
  page?: number;
  from?: string;
  to?: string;
}) => {
  return instance.get("/transactions", {
    params: {
      page,
      from,
      to,
    },
  });
};

export const getTotalIncome = ({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) => {
  return instance.get("/total-income", {
    params: {
      from,
      to,
    },
  });
};

export const getTotalExpense = () => instance.get("/transactions/total-expense");

export const deleteTransaction = ({ id }: { id: string }) =>
  instance.delete(`/transactions/${id}`);