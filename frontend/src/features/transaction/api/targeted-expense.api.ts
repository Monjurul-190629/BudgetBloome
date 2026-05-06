import { instance } from "@/lib/api/apiIntellisence";
import { TARGETED_EXPENSE_PAYLOAD } from "../type/target-expense.types";

export const createTargetedExpense = ({
  data,
}: {
  data: TARGETED_EXPENSE_PAYLOAD;
}) => instance.post("/targeted-expenses", data);

export const getTargetedExpenses = ({
  from,
  to,
}: {
  from?: string;
  to?: string;
}) => {
  return instance.get("/targeted-expenses", {
    params: {
      from,
      to,
    },
  });
};

export const updateTargetedExpense = ({
  id,
  data,
}: {
  id: string;
  data: Partial<TARGETED_EXPENSE_PAYLOAD>;
}) => {
  return instance.put(`/targeted-expenses/${id}`, data);
};

export const deleteTargetedExpense = ({ id }: { id: string }) =>
  instance.delete(`/targeted-expenses/${id}`);