"use client";

import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import useFetchData from "@/hooks/useFetchData";
import { getDateRange, PeriodType } from "@/lib/utils/getDateRange";
import { FileText, FileType2, TrendingUp } from "lucide-react";

const MonthlyAnalyticsCard = ({
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
      title: "Monthly Income",
      amount: income,
      percent: "+12.5%",
      bg: "bg-[#16a34a]",
      icon: TrendingUp,
    },
    {
      title: "Monthly Expenses",
      amount: expense,
      percent: "+5.2%",
      bg: "bg-[#dc2626]",
      icon: FileText,
    },
    {
      title: "Total Savings",
      amount: saves,
      percent: "+18.3%",
      bg: "bg-[#f59e0b]",
      icon: FileType2,
    },
  ];

  return (
    <div className="w-full rounded-xl bg-[#00140a] p-5 md:p-6">
      {title && <h2 className="mb-5 text-lg font-bold text-white">{title}</h2>}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl bg-black shadow-xl"
            >
              <div className={`${item.bg} px-5 py-4`}>
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-6 w-6 text-white" />

                  <span className="text-sm font-semibold text-white">
                    ↑ {item.percent}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {isLoading ? "..." : `৳${item.amount.toLocaleString()}`}
                </h3>
              </div>

              <div className="px-5 py-5">
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyAnalyticsCard;
