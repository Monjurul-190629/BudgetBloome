"use client";

import useFetchData from "@/hooks/useFetchData";
import { getAllWallets } from "../api/wallet.api";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import SkeletonWalletPieChart from "../skeleton/SkeletonWalletPieChart";

const COLORS = [
  "#22c55e",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#0ea5e9",
];

const AvailableWalletPieChart = () => {
  const { data: walletsData, isLoading } = useFetchData(
    ["getWallets"],
    getAllWallets,
  );

  const wallets = walletsData?.data?.data ?? [];

  const totalAmount = wallets.reduce(
    (acc: number, wallet: any) => acc + Number(wallet.amount || 0),
    0,
  );

  const innerData = [
    {
      name: "Total Wallet Balance",
      value: totalAmount,
    },
  ];

  const outerData = wallets.map((wallet: any) => ({
    name: wallet.wallet_name,
    value: Number(wallet.amount || 0),
  }));

  if (isLoading) {
    return <SkeletonWalletPieChart />;
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black p-5 text-white shadow-lg transition-all dark:border-zinc-200 dark:bg-black md:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Wallet Distribution
        </h2>

        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          Balance overview by wallet
        </p>
      </div>

      {wallets.length > 0 ? (
        <>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={innerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={70}
                  fill="#22c55e"
                >
                  <Cell fill="#14532d" />
                </Pie>

                <Pie
                  data={outerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={82}
                  outerRadius={120}
                  paddingAngle={3}
                >
                  {outerData.map((_: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  isAnimationActive
                  animationDuration={200}
                  animationEasing="ease-out"
                  wrapperStyle={{
                    transition: "transform 300ms ease-out",
                  }}
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;

                    const item = payload[0];
                    const bgColor = item.payload.fill;

                    return (
                      <div
                        className="rounded-sm border px-8 py-3 shadow-2xl"
                        style={{
                          backgroundColor: bgColor,
                          borderColor: bgColor,
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-sm text-white">{item.name}</p>

                          <p className="text-sm text-white">৳{item.value}</p>
                        </div>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {outerData.map((wallet: any, index: number) => (
              <div
                key={wallet.name}
                className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 transition-all dark:bg-zinc-200/70"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />

                  <p className="text-sm font-medium text-white dark:text-zinc-900">
                    {wallet.name}
                  </p>
                </div>

                <p className="text-sm font-semibold text-zinc-300 dark:text-zinc-700">
                  ৳{wallet.value}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-[260px] items-center justify-center rounded-xl bg-zinc-900 text-sm text-gray-400 dark:bg-zinc-200/70 dark:text-zinc-600">
          No wallets found
        </div>
      )}
    </div>
  );
};

export default AvailableWalletPieChart;
