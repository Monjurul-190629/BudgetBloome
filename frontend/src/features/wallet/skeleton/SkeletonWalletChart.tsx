import { Skeleton } from "@/components/ui/skeleton";

const SkeletonWalletChart = () => {
  return (
    <div className="w-full rounded-2xl bg-[#020202] p-5 shadow-lg md:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44 bg-white/10" />
          <Skeleton className="h-4 w-60 bg-white/5" />
        </div>

        <div className="space-y-2">
          <Skeleton className="ml-auto h-3 w-12 bg-white/10" />
          <Skeleton className="ml-auto h-6 w-24 bg-white/5" />
        </div>
      </div>

      <div className="flex h-[280px] items-end gap-3 rounded-xl bg-white/[0.02] p-4">
        <Skeleton className="h-[45%] w-full rounded-t-xl bg-green-500/20" />
        <Skeleton className="h-[75%] w-full rounded-t-xl bg-green-500/20" />
        <Skeleton className="h-[55%] w-full rounded-t-xl bg-green-500/20" />
        <Skeleton className="h-[90%] w-full rounded-t-xl bg-green-500/20" />
        <Skeleton className="h-[65%] w-full rounded-t-xl bg-green-500/20" />
      </div>
    </div>
  );
};

export default SkeletonWalletChart;
