"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProfileCard = () => {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 shadow-xl dark:border-zinc-300 dark:bg-zinc-100">
      <div className="flex flex-col items-center">
        <Skeleton className="h-24 w-24 rounded-full bg-zinc-800 dark:bg-zinc-300" />

        <Skeleton className="mt-4 h-7 w-40 bg-zinc-800 dark:bg-zinc-300" />

        <Skeleton className="mt-2 h-3 w-24 bg-zinc-800 dark:bg-zinc-300" />
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-200/70">
          <Skeleton className="h-4 w-4 rounded-md bg-zinc-800 dark:bg-zinc-300" />
          <Skeleton className="h-4 w-44 bg-zinc-800 dark:bg-zinc-300" />
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-200/70">
          <Skeleton className="h-4 w-4 rounded-md bg-zinc-800 dark:bg-zinc-300" />
          <Skeleton className="h-4 w-32 bg-zinc-800 dark:bg-zinc-300" />
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-200/70">
          <Skeleton className="h-4 w-4 rounded-md bg-zinc-800 dark:bg-zinc-300" />
          <Skeleton className="h-4 w-40 bg-zinc-800 dark:bg-zinc-300" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileCard;
