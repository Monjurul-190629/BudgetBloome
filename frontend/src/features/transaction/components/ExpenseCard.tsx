"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import useFetchData from "@/hooks/useFetchData";
import { getDateRange, type PeriodType } from "@/lib/utils/getDateRange";
import { AlertTriangle, CalendarDays, TrendingDown } from "lucide-react";

interface ExpenseCardProps {
  type: PeriodType;
  title?: string;
  warningLimit?: number;
  changeDefault?: boolean;
}

const ExpenseCard = ({
  type,
  title,
  warningLimit = 1000,
  changeDefault,
}: ExpenseCardProps) => {
  const { from, to, label } = getDateRange(type);

  const { data: getTransactionsData, isLoading } = useFetchData(
    ["getTransactionHistory", "expense", type, from, to],
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
    <Card
      className={`overflow-hidden rounded-2xl bg-black text-white shadow-xl`}
    >
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-bold opacity-90">
            {title || `${label} Expense`}
          </CardTitle>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90">
            <TrendingDown className="h-6 w-6 text-red-600/80 font-semibold" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h2 className={`text-xl font-bold text-red-600 `}>
          {isLoading ? "Loading..." : `৳ ${expense}`}
        </h2>

        <div className="flex text-gray-200 items-center gap-2 text-md opacity-90">
          <CalendarDays className="h-4 w-4" />
          <div>
            <p>Period</p>
            <p className="font-semibold">{label}</p>
          </div>
        </div>

        {isHighExpense && type === "today" && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/20 p-3 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Expense is greater than ৳ {warningLimit}</span>
          </div>
        )}

        <div className="mt-4 flex items-end justify-between">
          {[6, 20, 24, 18, 12, 20, 16, 24, 22, 14, 8, 18, 20, 12, 16].map(
            (h, i) => (
              <div
                key={i}
                className={`w-[10px] bg-red-600`}
                style={{ height: `${h}px` }}
              />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;
