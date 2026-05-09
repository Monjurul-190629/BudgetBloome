"use client";

import useFetchData from "@/hooks/useFetchData";
import { getAllGoals } from "../api/goal.api";
import { getTotalBalance } from "@/features/wallet/api/wallet.api";

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const colors = [
  "#ff4f7b",
  "#22c55e",
  "#3b82f6",
  "#facc15",
  "#a855f7",
  "#14b8a6",
];

const GoalsProgressCard = () => {
  const { data: goalsData, isLoading } = useFetchData(
    ["getGoals"],
    getAllGoals,
  );

  const { data: totalBalanceData } = useFetchData(["getTotalBalance"], () =>
    getTotalBalance(),
  );

  const goals = goalsData?.data?.data ?? [];
  const totalBalance = totalBalanceData?.data?.data?.total_balance ?? 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[170px] animate-pulse rounded-2xl bg-[#111] sm:h-[220px] sm:rounded-3xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-[#020c06] p-4 shadow-xl sm:rounded-3xl sm:p-6">
      <h2 className="mb-5 text-center text-lg font-semibold text-white sm:mb-6 sm:text-xl">
        Saving Goals
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        {goals.map((goal: any, index: number) => {
          const goalAmount = Number(goal.amount || 0);

          const progress =
            goal.filled || goalAmount <= totalBalance
              ? 100
              : goalAmount > 0
                ? Math.min(Math.round((totalBalance / goalAmount) * 100), 100)
                : 0;

          const color = colors[index % colors.length];

          const chartData = [
            {
              name: goal.name,
              value: progress,
              fill: color,
            },
          ];

          return (
            <div key={goal._id} className="flex min-w-0 flex-col items-center">
              <div className="relative h-[105px] w-[105px] sm:h-[130px] sm:w-[130px] lg:h-[145px] lg:w-[145px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={chartData}
                    innerRadius="82%"
                    outerRadius="100%"
                    startAngle={90}
                    endAngle={-270}
                    barSize={10}
                  >
                    <PolarAngleAxis
                      type="number"
                      domain={[0, 100]}
                      tick={false}
                    />

                    <RadialBar
                      dataKey="value"
                      cornerRadius={30}
                      background={{ fill: "#dff5e8" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-2xl font-bold sm:text-3xl lg:text-4xl"
                    style={{ color }}
                  >
                    {progress}%
                  </span>
                </div>
              </div>

              <h3 className="mt-3 max-w-full truncate text-center text-sm font-semibold text-white sm:mt-4 sm:text-base">
                {goal.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsProgressCard;
