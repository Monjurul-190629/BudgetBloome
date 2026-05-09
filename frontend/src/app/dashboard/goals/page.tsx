import DashboardHeader from "@/components/layout/DashboardHeader";
import GoalCard from "@/features/goal/components/GoalCard";
import MonthlySummaryCard from "@/features/transaction/components/MonthlySummaryCard";
import TransactionAreaChart from "@/features/transaction/components/TransactionAreaChart";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";
import AvailableWalletCard from "@/features/wallet/components/AvailableWalletCard";

const GoalsPage = () => {
  return (
    <div className="space-y-4">
      <DashboardHeader title="Goals" />
      <GoalCard />
      <div className="flex flex-col gap-2 md:flex-row">
        <AvailableWalletCard />
        <TransactionAreaChart type="expense" />
      </div>
    </div>
  );
};

export default GoalsPage;
