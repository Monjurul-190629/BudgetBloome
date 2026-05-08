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
    <div className="h-[380px] w-full rounded-2xl bg-black p-4 text-white shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">{title || getTitle(type)}</h2>

      {isLoading ? (
        <SkeletonTransactionBarChart />
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
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis
              dataKey="name"
              stroke="#aaa"
              tickLine={false}
              axisLine={false}
            />

            <YAxis stroke="#aaa" tickLine={false} axisLine={false} />

            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
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
                barSize={22}
                minPointSize={4}
              />
            )}

            {(type === "expense" || type === "both") && (
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                barSize={22}
                minPointSize={4}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TransactionWeeklyBarChart;
