import DashboardHeader from "@/components/layout/DashboardHeader";
import WalletCard from "@/features/wallet/components/WalletCard";

const page = () => {
  return (
    <div>
      <DashboardHeader title="Wallets" />
      <WalletCard />
      <div></div>
    </div>
  );
};

export default page;
