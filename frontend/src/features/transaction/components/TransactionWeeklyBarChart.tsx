"use client";

import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import { getLastSevenDaysData } from "@/features/transaction/api/transaction.api";
import SkeletonTransactionBarChart from "../skeleton/SkeletonTransactionBarChart";

type TransactionChartType = "income" | "expense" | "both";

interface TransactionWeeklyBarChartProps {
  type?: TransactionChartType;
  title?: string;
}

const useTransactionWeeklyBarChartData = () => {
  return useQuery({
    queryKey: ["transaction-last-seven-days"],
    queryFn: async () => {
      const res = await getLastSevenDaysData();

      return (
        res?.data?.data?.map(
          (item: {
            day: string;
            date: string;
            income: number;
            expense: number;
          }) => ({
            name: item.day.slice(0, 3),
            date: item.date,
            income: Number(item.income) || 0,
            expense: Number(item.expense) || 0,
          }),
        ) ?? []
      );
    },
  });
};

const getTitle = (type: TransactionChartType) => {
  if (type === "income") return "Last 7 Days Income";
  if (type === "expense") return "Last 7 Days Expense";
  return "Last 7 Days Financial Overview";
};

const TransactionWeeklyBarChart = ({
  type = "both",
  title,
}: TransactionWeeklyBarChartProps) => {
  const { data: chartData = [], isLoading } =
    useTransactionWeeklyBarChartData();

  return (
    <div className="h-[390px] w-full rounded-3xl border border-white/10 bg-[#020c06] p-4 text-white shadow-xl sm:p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold sm:text-xl">
            {title || getTitle(type)}
          </h2>
          <p className="mt-1 text-xs text-gray-400">
            Income and expense summary from the last 7 days
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          Weekly
        </span>
      </div>

      {isLoading ? (
        <SkeletonTransactionBarChart />
      ) : (
        <ResponsiveContainer width="100%" height="82%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -12, bottom: 5 }}
            barGap={8}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#1f2937"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              stroke="#9ca3af"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                backgroundColor: "#06130b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                color: "#fff",
              }}
              labelFormatter={(label) => `${label}`}
            />

            <Legend iconType="circle" />

            {(type === "income" || type === "both") && (
              <>
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  fill="url(#incomeGradient)"
                  strokeWidth={2}
                  tooltipType="none"
                  legendType="none"
                />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#22c55e"
                  radius={[12, 12, 0, 0]}
                  barSize={22}
                  minPointSize={4}
                />
              </>
            )}

            {(type === "expense" || type === "both") && (
              <>
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fill="url(#expenseGradient)"
                  strokeWidth={2}
                  tooltipType="none"
                  legendType="none"
                />

                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ef4444"
                  radius={[12, 12, 0, 0]}
                  barSize={22}
                  minPointSize={4}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionWeeklyBarChart;
