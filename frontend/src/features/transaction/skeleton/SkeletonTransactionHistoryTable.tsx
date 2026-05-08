"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTransactionHistoryTable = () => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-48 bg-zinc-800" />
          <Skeleton className="mt-2 h-4 w-56 bg-zinc-800" />
        </div>

        <Skeleton className="h-10 w-10 rounded-full bg-zinc-800" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] border-separate border-spacing-y-3">
          <thead>
            <tr>
              {["w-24", "w-20", "w-28", "w-20", "w-20"].map((width, index) => (
                <th key={index} className="px-4">
                  <Skeleton className={`h-4 ${width} bg-zinc-800`} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="bg-[#111111]">
                <td className="rounded-l-xl px-4 py-4">
                  <Skeleton className="h-4 w-28 bg-zinc-800" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-44 bg-zinc-800" />
                </td>

                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-20 bg-zinc-800" />
                </td>

                <td className="rounded-r-xl px-4 py-4">
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SkeletonTransactionHistoryTable;
