"use client";

import useFetchData from "@/hooks/useFetchData";
import { getTransactionHistory } from "../api/transaction.api";
import { getDateRange, PeriodType } from "@/lib/utils/getDateRange";
import { ArrowDownCircle, ArrowUpCircle, Wallet2 } from "lucide-react";

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
      icon: ArrowUpCircle,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Expenses",
      amount: expense,
      icon: ArrowDownCircle,
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
    },
    {
      title: "Saves",
      amount: saves,
      icon: Wallet2,
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
  ];

  return (
    <div className="w-full rounded-xl bg-[#020202] p-5 md:p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>

                <p className="text-sm text-gray-400">{item.title}</p>
              </div>

              <h3 className="text-xl font-bold text-white">
                {isLoading ? "..." : `৳${item.amount.toLocaleString()}`}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlySummaryCard;
