"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import useFetchData from "@/hooks/useFetchData";
import { CalendarDays, TrendingUp } from "lucide-react";

type IncomePeriod = "today" | "weekly" | "this-month" | "last-month" | "total";

interface IncomeCardProps {
  type: IncomePeriod;
  title?: string;
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getDateRange = (type: IncomePeriod) => {
  const today = new Date();

  let fromDate: Date | null = null;
  let toDate: Date | null = null;
  let label: string;

  if (type === "total") {
    return {
      from: undefined,
      to: undefined,
      label: "Total",
    };
  }

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
    from: formatDate(fromDate!),
    to: formatDate(toDate!),
    label,
  };
};

const IncomeCard = ({ type, title }: IncomeCardProps) => {
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

  const income = getTransactionsData?.data?.data?.total_income ?? 0;

  return (
    <Card className="overflow-hidden rounded-2xl bg-black text-white shadow-xl">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-xl font-bold opacity-90">
            {title || `${label} Income`}
          </CardTitle>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h2 className="text-xl font-bold text-green-400">
          {isLoading ? "Loading..." : `৳ ${income}`}
        </h2>

        <div className="flex items-center gap-2 text-md opacity-80">
          <CalendarDays className="h-4 w-4" />
          <div>
            <p>Period</p>
            <p className="font-semibold">{label}</p>
          </div>
        </div>

        {/* Bottom green bars */}
        <div className="mt-4 flex items-end justify-between">
          {[6, 10, 14, 18, 12, 20, 16, 24, 22, 14, 8, 18, 20, 12, 16].map(
            (h, i) => (
              <div
                key={i}
                className="w-[10px] bg-green-500"
                style={{ height: `${h}px` }}
              />
            ),
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeCard;
