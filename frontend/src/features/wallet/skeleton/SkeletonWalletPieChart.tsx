"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonWalletPieChart = () => {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black p-5 text-white shadow-lg dark:border-zinc-200 dark:bg-black md:p-6">
      <div className="mb-5">
        <Skeleton className="h-6 w-44 bg-zinc-800" />

        <Skeleton className="mt-2 h-4 w-52 bg-zinc-800" />
      </div>

      <div className="flex h-[260px] items-center justify-center">
        <div className="relative flex items-center justify-center">
          <Skeleton className="h-[240px] w-[240px] rounded-full bg-zinc-900" />

          <Skeleton className="absolute h-[150px] w-[150px] rounded-full bg-black" />

          <Skeleton className="absolute h-[90px] w-[90px] rounded-full bg-zinc-800" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-zinc-900 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />

              <Skeleton className="h-4 w-24 bg-zinc-800" />
            </div>

            <Skeleton className="h-4 w-16 bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonWalletPieChart;
