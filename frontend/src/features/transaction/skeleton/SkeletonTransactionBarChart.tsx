"use client";

import { Skeleton } from "@/components/ui/skeleton";

const barHeights = ["h-28", "h-40", "h-24", "h-52", "h-32", "h-44", "h-56"];

const SkeletonTransactionBarChart = () => {
  return (
    <div className="flex h-[300px] items-end justify-between gap-4 overflow-hidden">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="flex flex-1 flex-col items-center justify-end gap-3"
        >
          <Skeleton
            className={`w-full max-w-9 rounded-t-lg bg-zinc-800 ${height}`}
          />

          <Skeleton className="h-3 w-10 rounded-full bg-zinc-800" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonTransactionBarChart;
