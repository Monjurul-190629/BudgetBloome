"use client";

import useFetchData from "@/hooks/useFetchData";
import { getTransactionHistory } from "../api/transaction.api";
import { getDateRange, PeriodType } from "@/lib/utils/getDateRange";

const MonthlySummaryCard = ({
  type,
  title,
}: {
  type: PeriodType;
  title: string;
}) => {
  const { from, to } = getDateRange(type);

  const { data: getTransactionsData, isLoading } = useFetchData(
    ["getTransactionHistory", from, to],
    () =>
      getTransactionHistory({
        page: 1,
        from,
        to,
      }),
  );

  const income = getTransactionsData?.data?.data?.total_income ?? 0;

  const expense = getTransactionsData?.data?.data?.total_expense ?? 0;

  const saves = income - expense;

  const summaryItems = [
    {
      title: "Income",
      amount: income,
    },
    {
      title: "Expenses",
      amount: expense,
    },
    {
      title: "Saves",
      amount: saves,
    },
  ];

  return (
    <div className="w-full rounded-xl bg-[#020202] p-5 md:p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {summaryItems.map((item) => (
          <div key={item.title}>
            <p className="mb-2 text-sm text-gray-400">{item.title}</p>

            <h3 className="text-xl md:text-xl font-bold text-white">
              {isLoading ? "..." : `৳${item.amount.toLocaleString()}`}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummaryCard;
