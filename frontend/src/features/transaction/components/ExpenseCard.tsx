"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import useFetchData from "@/hooks/useFetchData";
import { AlertTriangle, CalendarDays, TrendingDown } from "lucide-react";

type ExpensePeriod = "today" | "weekly" | "this-month" | "last-month";

interface ExpenseCardProps {
  type: ExpensePeriod;
  title?: string;
  warningLimit?: number;
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getDateRange = (type: ExpensePeriod) => {
  const today = new Date();

  let fromDate: Date;
  let toDate: Date;
  let label: string;

  if (type === "today") {
    fromDate = today;
    toDate = today;
    label = "Today";
  } else if (type === "weekly") {
    const day = today.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;

    fromDate = new Date(today);
    fromDate.setDate(today.getDate() - diffToMonday);

    toDate = today;
    label = "This Week";
  } else if (type === "last-month") {
    fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    toDate = new Date(today.getFullYear(), today.getMonth(), 0);

    label = fromDate.toLocaleString("default", {
      month: "long",
    });
  } else {
    fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    label = today.toLocaleString("default", {
      month: "long",
    });
  }

  return {
    from: formatDate(fromDate),
    to: formatDate(toDate),
    label,
  };
};

const ExpenseCard = ({
  type,
  title,
  warningLimit = 1000,
}: ExpenseCardProps) => {
  const { from, to, label } = getDateRange(type);

  const { data: getTransactionsData, isLoading } = useFetchData(
    ["getTransactionHistory", type, from, to],
    () =>
      getTransactionHistory({
        page: 1,
        from,
        to,
      }),
  );

  const expense = getTransactionsData?.data?.data?.total_expense ?? 0;
  const isHighExpense = expense > warningLimit;

  return (
    <Card className="overflow-hidden rounded-2xl bg-red-600 text-white shadow-xl">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-2xl font-bold opacity-90">
            {title || `${label} Expense`}
          </CardTitle>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
            <TrendingDown className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h2 className="text-xl font-bold">
          {isLoading ? "Loading..." : `৳ ${expense}`}
        </h2>

        <div className="flex items-center gap-2 text-md opacity-90">
          <CalendarDays className="h-4 w-4" />
          <div>
            <p>Period</p>
            <p className="font-semibold">{label}</p>
          </div>
        </div>

        {isHighExpense && type ==="today" && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/20 p-3 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Expense is greater than ৳ {warningLimit}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
