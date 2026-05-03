"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import { getDateRange, PeriodType } from "@/lib/utils/getDateRange";

type ChartPeriod = Exclude<PeriodType, "today" | "weekly" | "total">;

type TransactionChartType = "income" | "expense" | "both";

interface TransactionChartProps {
  type?: TransactionChartType;
}

const chartPeriods: ChartPeriod[] = [
  "six-months-ago",
  "five-months-ago",
  "four-months-ago",
  "three-months-ago",
  "two-months-ago",
  "last-month",
  "this-month",
];

const useTransactionChartData = () => {
  return useQuery({
    queryKey: ["transaction-chart-data"],
    queryFn: async () => {
      const results = await Promise.all(
        chartPeriods.map(async (period) => {
          const { from, to, label } = getDateRange(period);

          const res = await getTransactionHistory({
            page: 1,
            from,
            to,
          });

          return {
            name: label,
            income: res?.data?.data?.total_income ?? 0,
            expense: res?.data?.data?.total_expense ?? 0,
          };
        }),
      );

      return results;
    },
  });
};

const getTitle = (type: TransactionChartType) => {
  if (type === "income") return "Income Chart";
  if (type === "expense") return "Expense Chart";
  return "Transaction Chart";
};

const TransactionChart = ({ type = "both" }: TransactionChartProps) => {
  const { data: chartData = [], isLoading } = useTransactionChartData();

  return (
    <div className="h-[380px] w-full rounded-2xl bg-black p-4 text-white">
      <h2 className="mb-4 text-lg font-semibold">{getTitle(type)}</h2>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center text-sm text-gray-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <LineChart
            data={chartData}
            margin={{
              top: 15,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
              }}
            />

            <Legend />

            {(type === "income" || type === "both") && (
              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            )}

            {(type === "expense" || type === "both") && (
              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionChart;
