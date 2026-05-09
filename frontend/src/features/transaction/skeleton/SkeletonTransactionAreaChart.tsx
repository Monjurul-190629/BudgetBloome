"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionAreaChart = () => {
  return (
    <div className="h-[380px] w-full rounded-2xl bg-black p-5">
      {/* Title */}
      <Skeleton className="mb-6 h-6 w-44 bg-zinc-800" />

      {/* Chart Container */}
      <div className="relative h-[280px] w-full overflow-hidden rounded-xl bg-zinc-900 p-4">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between px-4 py-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-[1px] w-full bg-zinc-800" />
          ))}
        </div>

        {/* Fake Area Bars */}
        <div className="absolute bottom-10 left-4 right-4 flex items-end gap-3">
          {[40, 90, 70, 120, 80, 140, 110].map((height, index) => (
            <Skeleton
              key={index}
              className="flex-1 rounded-t-xl bg-zinc-700"
              style={{
                height: `${height}px`,
              }}
            />
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-3 w-10 bg-zinc-800" />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full bg-zinc-700" />
            <Skeleton className="h-3 w-16 bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTransactionAreaChart;
