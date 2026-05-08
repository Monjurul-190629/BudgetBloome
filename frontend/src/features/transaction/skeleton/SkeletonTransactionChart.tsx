"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionChart = () => {
  return (
    <div className="h-[300px] w-full overflow-hidden">
      <div className="flex h-full flex-col justify-between">
        <div className="space-y-8">
          <Skeleton className="h-px w-full bg-zinc-800" />
          <Skeleton className="h-px w-full bg-zinc-800" />
          <Skeleton className="h-px w-full bg-zinc-800" />
          <Skeleton className="h-px w-full bg-zinc-800" />
          <Skeleton className="h-px w-full bg-zinc-800" />
        </div>

        <div className="relative h-[180px]">
          <Skeleton className="absolute left-4 top-24 h-2 w-20 rotate-[-18deg] rounded-full bg-green-500/70" />
          <Skeleton className="absolute left-[18%] top-16 h-2 w-24 rotate-[14deg] rounded-full bg-green-500/70" />
          <Skeleton className="absolute left-[36%] top-20 h-2 w-24 rotate-[-12deg] rounded-full bg-green-500/70" />
          <Skeleton className="absolute left-[55%] top-10 h-2 w-24 rotate-[18deg] rounded-full bg-green-500/70" />
          <Skeleton className="absolute left-[74%] top-16 h-2 w-20 rotate-[-15deg] rounded-full bg-green-500/70" />

          <Skeleton className="absolute left-5 top-28 h-3 w-3 rounded-full bg-green-500" />
          <Skeleton className="absolute left-[23%] top-14 h-3 w-3 rounded-full bg-green-500" />
          <Skeleton className="absolute left-[42%] top-24 h-3 w-3 rounded-full bg-green-500" />
          <Skeleton className="absolute left-[62%] top-8 h-3 w-3 rounded-full bg-green-500" />
          <Skeleton className="absolute left-[82%] top-20 h-3 w-3 rounded-full bg-green-500" />
        </div>

        <div className="flex justify-between">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-3 w-10 rounded-full bg-zinc-800"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonTransactionChart;
