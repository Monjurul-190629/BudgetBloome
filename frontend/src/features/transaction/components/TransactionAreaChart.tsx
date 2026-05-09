"use client";

import {
  Area,
  AreaChart,
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
import SkeletonTransactionChart from "../skeleton/SkeletonTransactionChart";

type ChartPeriod = Exclude<PeriodType, "today" | "weekly" | "total">;

type TransactionChartType = "income" | "expense" | "both";

interface TransactionAreaChartProps {
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
    queryKey: ["transaction-area-chart-data"],
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
  if (type === "income") return "Income Area Chart";
  if (type === "expense") return "Expense Area Chart";

  return "Financial Area Chart";
};

const TransactionAreaChart = ({ type = "both" }: TransactionAreaChartProps) => {
  const { data: chartData = [], isLoading } = useTransactionChartData();

  return (
    <div className="h-[380px] w-full rounded-2xl bg-black p-5 text-white shadow-lg">
      <h2 className="mb-5 text-lg font-semibold">{getTitle(type)}</h2>

      {isLoading ? (
        <SkeletonTransactionChart />
      ) : (
        <ResponsiveContainer width="100%" height="88%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />

            <XAxis
              dataKey="name"
              stroke="#a3a3a3"
              tickLine={false}
              axisLine={false}
            />

            <YAxis stroke="#a3a3a3" tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "1px solid #333",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Legend />

            {(type === "income" || type === "both") && (
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#incomeGradient)"
                strokeWidth={3}
              />
            )}

            {(type === "expense" || type === "both") && (
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#expenseGradient)"
                strokeWidth={3}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionAreaChart;
