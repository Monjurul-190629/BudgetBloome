"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionBarChart = () => {
  return (
    <div className="h-[380px] w-full rounded-2xl bg-[#111111] p-4 shadow-lg dark:bg-[#f4f4f5]">
      <Skeleton className="mb-6 h-6 w-40 bg-zinc-800 dark:bg-zinc-300" />

      <div className="flex h-[300px] items-end justify-between gap-3">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-32 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-40 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-24 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-52 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-36 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-44 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-60 w-8 rounded-t-xl bg-green-500/70" />
          <Skeleton className="h-3 w-10 bg-zinc-700 dark:bg-zinc-300" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTransactionBarChart;
