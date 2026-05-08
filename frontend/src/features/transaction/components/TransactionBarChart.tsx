"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";
import { getDateRange, PeriodType } from "@/lib/utils/getDateRange";
import SkeletonTransactionBarChart from "../skeleton/SkeletonTransactionBarChart";

type ChartPeriod = Exclude<PeriodType, "today" | "weekly" | "total">;

type TransactionChartType = "income" | "expense" | "both";

interface TransactionBarChartProps {
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

const useTransactionBarChartData = () => {
  return useQuery({
    queryKey: ["transaction-bar-chart-data"],
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
  if (type === "income") return "Income Overview";
  if (type === "expense") return "Expense Overview";
  return "Financial Overview";
};

const TransactionBarChart = ({ type = "both" }: TransactionBarChartProps) => {
  const { data: chartData = [], isLoading } = useTransactionBarChartData();

  if (isLoading) return <SkeletonTransactionBarChart />;

  return (
    <div className="h-[380px] w-full rounded-2xl bg-black p-4 text-white">
      <h2 className="mb-4 text-lg font-semibold">{getTitle(type)}</h2>

      {isLoading ? (
        <div className="flex h-[300px] items-center justify-center text-sm text-gray-400">
          Loading chart...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
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
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            {(type === "income" || type === "both") && (
              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[8, 8, 0, 0]}
              />
            )}

            {(type === "expense" || type === "both") && (
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionBarChart;
