"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonGoalCard = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl bg-black p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-28 bg-zinc-800" />

                    {index === 1 && (
                      <Skeleton className="h-5 w-20 rounded-full bg-green-500/20" />
                    )}
                  </div>

                  <Skeleton className="mt-4 h-4 w-36 bg-zinc-800" />
                </div>

                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg bg-zinc-800" />
                  <Skeleton className="h-8 w-8 rounded-lg bg-zinc-800" />
                </div>
              </div>
            </div>
          ))}

          <Skeleton className="h-12 w-full rounded-2xl bg-zinc-800" />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-black p-6">
            <Skeleton className="h-8 w-48 bg-zinc-800" />
          </div>

          <div className="rounded-lg bg-black p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <Skeleton className="mb-3 h-4 w-32 bg-zinc-800" />
                <Skeleton className="h-6 w-28 bg-zinc-800" />
              </div>

              <div className="flex flex-col items-end">
                <Skeleton className="mb-3 h-4 w-20 bg-zinc-800" />
                <Skeleton className="h-7 w-32 bg-zinc-800" />
              </div>
            </div>

            <Skeleton className="h-2 w-full rounded-full bg-zinc-800" />

            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-5 w-12 bg-zinc-800" />
              <Skeleton className="h-5 w-12 bg-zinc-800" />
            </div>
          </div>

          <div className="rounded-lg bg-black p-6">
            <Skeleton className="mb-4 h-6 w-36 bg-zinc-800" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
            </div>
          </div>

          <div className="rounded-lg bg-black p-6">
            <Skeleton className="mb-4 h-6 w-36 bg-zinc-800" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
              <Skeleton className="h-16 rounded-xl bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonGoalCard;
