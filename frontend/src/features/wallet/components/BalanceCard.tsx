"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/store/auth.store";
import useFetchData from "@/hooks/useFetchData";
import { getTotalBalance } from "../api/wallet.api";
import { TrendingUp, Coins } from "lucide-react";

type BalanceCardType = "current" | "saving";

interface BalanceCardProps {
  title?: string;
  type?: BalanceCardType;
  amount?: number;
}

const BalanceCard = ({ title, type = "current", amount }: BalanceCardProps) => {
  const profile = useAuth((state) => state?.profile);

  const { data: totalBalanceData, isLoading } = useFetchData(
    ["getTotalBalance"],
    () => getTotalBalance(),
  );

  const totalBalance = totalBalanceData?.data?.data?.total_balance ?? 0;
  const finalAmount = amount ?? totalBalance;

  const isSaving = type === "saving";

  const Icon = isSaving ? Coins : TrendingUp;

  return (
    <Card
      className={`
        w-full overflow-hidden rounded-2xl border-0 text-white shadow-xl
        ${isSaving ? "bg-blue-600" : "bg-green-600"}
      `}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-bold opacity-90 sm:text-xl">
              {title || (isSaving ? "Saving Balance" : "Current Balance")}
            </CardTitle>

            <p className="mt-1 text-xs opacity-80 sm:text-sm">
              {isSaving ? "Total saved amount" : "Available wallet balance"}
            </p>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {isLoading ? (
            <span className="text-base font-normal opacity-80">Loading...</span>
          ) : (
            <>৳ {finalAmount}</>
          )}
        </h2>

        <div className="rounded-xl bg-white/15 p-3 text-sm opacity-95">
          <p className="opacity-80">Card Holder</p>
          <p className="font-semibold">{profile?.name || "Unknown"}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
