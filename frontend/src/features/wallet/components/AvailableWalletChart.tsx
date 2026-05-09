"use client";

import useFetchData from "@/hooks/useFetchData";
import { getAllWallets } from "../api/wallet.api";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SkeletonWalletChart from "../skeleton/SkeletonWalletChart";

const AvailableWalletChart = () => {
  const { data: walletsData, isLoading } = useFetchData(
    ["getWallets"],
    getAllWallets,
  );

  const wallets = walletsData?.data?.data ?? [];

  const chartData = wallets.map((wallet: any) => ({
    name: wallet.wallet_name,
    amount: Number(wallet.amount || 0),
  }));

  const totalAmount = chartData.reduce(
    (acc: number, wallet: any) => acc + wallet.amount,
    0,
  );

  if (isLoading) return <SkeletonWalletChart />;

  return (
    <div className="w-full rounded-2xl bg-[#020202] p-5 shadow-lg md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Available Wallet Balance
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Wallet-wise available balance overview
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Total</p>
          <h3 className="text-lg font-bold text-white">৳{totalAmount}</h3>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value) => [`৳${value}`, "Amount"]}
            />

            <Area
              type="monotone"
              dataKey="amount"
              fill="#22c55e"
              stroke="#22c55e"
              fillOpacity={0.18}
            />

            <Bar
              dataKey="amount"
              barSize={32}
              fill="#16a34a"
              radius={[8, 8, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AvailableWalletChart;
