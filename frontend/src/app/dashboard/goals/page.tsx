import DashboardHeader from "@/components/layout/DashboardHeader";
import GoalCard from "@/features/goal/components/GoalCard";
import MonthlySummaryCard from "@/features/transaction/components/MonthlySummaryCard";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";
import AvailableWalletCard from "@/features/wallet/components/AvailableWalletCard";

const GoalsPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Goals" />
      <GoalCard />
      <AvailableWalletCard />
    </div>
  );
};

export default GoalsPage;
