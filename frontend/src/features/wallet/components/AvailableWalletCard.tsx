import useFetchData from "@/hooks/useFetchData";
import {
  Building2,
  Wallet,
  CreditCard,
  Landmark,
  PiggyBank,
} from "lucide-react";
import { getAllWallets } from "../api/wallet.api";

const iconList = [
  {
    icon: Building2,
    iconBg: "bg-yellow-400",
    barColor: "bg-green-500",
  },
  {
    icon: Wallet,
    iconBg: "bg-indigo-500",
    barColor: "bg-green-500",
  },
  {
    icon: CreditCard,
    iconBg: "bg-purple-500",
    barColor: "bg-sky-500",
  },
  {
    icon: Landmark,
    iconBg: "bg-pink-500",
    barColor: "bg-pink-400",
  },
  {
    icon: PiggyBank,
    iconBg: "bg-orange-500",
    barColor: "bg-orange-400",
  },
];

const AvailableWalletCard = () => {
  const { data: walletsData } = useFetchData(["getWallets"], getAllWallets);

  const wallets = walletsData?.data?.data ?? [];

  const totalAmount = wallets.reduce(
    (acc: number, wallet: any) => acc + Number(wallet.amount || 0),
    0,
  );

  return (
    <div className="w-full rounded-2xl bg-[#020202] p-5 md:p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-6">
        Available by Wallet
      </h2>

      <div className="space-y-7">
        {wallets.map((wallet: any, index: number) => {
          const style = iconList[index % iconList.length];

          const Icon = style.icon;

          const progress =
            totalAmount > 0 ? (Number(wallet.amount) / totalAmount) * 100 : 0;

          return (
            <div
              key={wallet._id}
              className="grid grid-cols-[52px_1fr] items-center gap-3 md:gap-4"
            >
              <div
                className={`w-11 h-11 rounded-full ${style.iconBg} flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-base">
                    {wallet.wallet_name}
                  </h3>

                  <p className="text-indigo-500 font-medium">
                    ৳{wallet.amount}
                  </p>
                </div>

                <div className="relative h-2 w-full rounded-full bg-green-200 overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full ${style.barColor}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableWalletCard;
