import DashboardHeader from "@/components/layout/DashboardHeader";
import MonthlyAnalyticsCard from "@/features/analytics/components/MonthlyAnalyticsCard";
import TargetedExpenseCard from "@/features/transaction/components/TargetExpenseCard";
import TransactionChart from "@/features/transaction/components/TransactionChart";
import TransactionWeeklyBarChart from "@/features/transaction/components/TransactionWeeklyBarChart";
import AvailableWalletCard from "@/features/wallet/components/AvailableWalletCard";

const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <DashboardHeader title="Analytics" />
      <MonthlyAnalyticsCard type="this-month" title="Current Month Overflow" />
      <div className="flex flex-col md:flex-row gap-2">
        <TransactionWeeklyBarChart title="Weekly Expenses" type="expense" />
        <TransactionChart />
      </div>
      <div className="flex w-full flex-col items-start gap-2 md:flex-row">
        <TargetedExpenseCard type="this-month" />
        <TargetedExpenseCard type="last-month" />
        <AvailableWalletCard />
      </div>
    </div>
  );
};

export default page;
