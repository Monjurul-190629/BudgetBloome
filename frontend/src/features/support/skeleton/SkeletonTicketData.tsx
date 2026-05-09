import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTicketData = () => {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl bg-white/10" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-[140px] bg-white/10" />
          <Skeleton className="h-4 w-[220px] bg-white/10" />
        </div>
      </div>

      {/* Accordion Skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-full bg-white/10" />

              <Skeleton className="h-5 w-[70%] bg-white/10" />
            </div>

            <div className="mt-4 space-y-2 pl-7">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-[90%] bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-end gap-3">
        <Skeleton className="h-4 w-[120px] bg-white/10" />

        <Skeleton className="h-10 w-[110px] rounded-lg bg-white/10" />

        <Skeleton className="h-10 w-[90px] rounded-lg bg-white/10" />
      </div>
    </div>
  );
};

export default SkeletonTicketData;
