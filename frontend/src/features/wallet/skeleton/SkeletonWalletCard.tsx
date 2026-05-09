import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";

const SkeletonWalletCard = () => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-5 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-28 bg-zinc-800" />
        <Wallet className="text-green-400" />
      </div>

      <div className="mb-5 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-zinc-900 p-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full bg-zinc-800" />
              <Skeleton className="h-4 w-24 bg-zinc-800" />
            </div>

            <Skeleton className="h-4 w-16 bg-zinc-800" />
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-lg bg-zinc-800" />
    </div>
  );
};

export default SkeletonWalletCard;
