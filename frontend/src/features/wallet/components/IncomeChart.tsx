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
import useFetchData from "@/hooks/useFetchData";
import { getTransactionHistory } from "@/features/transaction/api/transaction.api";

type IncomePeriod =
  | "this-month"
  | "last-month"
  | "two-months-ago"
  | "three-months-ago";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getMonthRange = (type: IncomePeriod) => {
  const today = new Date();

  let monthOffset = 0;

  if (type === "last-month") monthOffset = 1;
  if (type === "two-months-ago") monthOffset = 2;
  if (type === "three-months-ago") monthOffset = 3;

  const year = today.getFullYear();
  const month = today.getMonth() - monthOffset;

  const fromDate = new Date(year, month, 1);
  const toDate = new Date(year, month + 1, 0);

  return {
    from: formatDate(fromDate),
    to: formatDate(toDate),
  };
};

const chartTypes: IncomePeriod[] = [
  "three-months-ago",
  "two-months-ago",
  "last-month",
  "this-month",
];

const labelMap: Record<IncomePeriod, string> = {
  "this-month": "This Month",
  "last-month": "Last Month",
  "two-months-ago": "2 Months Ago",
  "three-months-ago": "3 Months Ago",
};

const IncomeChart = () => {
  const chartData = chartTypes.map((type) => {
    const { from, to } = getMonthRange(type);

    const { data } = useFetchData(
      ["getTransactionHistory", type, from, to],
      () =>
        getTransactionHistory({
          page: 1,
          from,
          to,
        }),
    );

    return {
      name: labelMap[type],
      income: data?.data?.data?.total_income ?? 0,
      expense: data?.data?.data?.total_expense ?? 0,
    };
  });

  return (
    <div className="h-[350px] w-full rounded-2xl bg-black p-4 text-white">
      <h2 className="mb-4 text-lg font-semibold">Income Overview</h2>

      <ResponsiveContainer width="100%" height="100%">
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

          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
