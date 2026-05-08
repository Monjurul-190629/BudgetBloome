"use client";

import { Skeleton } from "@/components/ui/skeleton";

const barHeights = ["h-28", "h-40", "h-20", "h-52", "h-32", "h-44", "h-60"];

const SkeletonTransactionBarChart = () => {
  return (
    <div className="h-[380px] w-full rounded-2xl border border-white/10 bg-[#111111] p-5 shadow-lg dark:border-zinc-200 dark:bg-[#f4f4f5]">
      <Skeleton className="mb-6 h-6 w-44 rounded-md bg-zinc-800 dark:bg-zinc-300" />

      <div className="flex h-[280px] items-end justify-between gap-4 overflow-hidden">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center justify-end gap-3"
          >
            <Skeleton
              className={`w-full max-w-[36px] rounded-t-xl rounded-b-md bg-green-500/70 ${height}`}
            />

            <Skeleton className="h-3 w-8 rounded-full bg-zinc-700 dark:bg-zinc-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTransactionBarChart;
