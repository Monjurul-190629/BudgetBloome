import DashboardHeader from "@/components/layout/DashboardHeader";
import ProfileCard from "@/features/profile/components/ProfileCard";
import TransactionAreaChart from "@/features/transaction/components/TransactionAreaChart";
import TransactionBarChart from "@/features/transaction/components/TransactionBarChart";
import AvailableWalletPieChart from "@/features/wallet/components/AvailableWalletPieChart";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardHeader title="Profile" />
      <div className="flex flex-col md:flex-row gap-2 justify-center">
        <ProfileCard />
        <TransactionBarChart type="both" />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <TransactionAreaChart type="income" />
        <AvailableWalletPieChart />
      </div>
    </div>
  );
};

export default page;
