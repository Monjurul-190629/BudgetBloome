import DashboardHeader from "@/components/layout/DashboardHeader";
import MonthlyAnalyticsCard from "@/features/analytics/components/MonthlyAnalyticsCard";
import TransactionBarChart from "@/features/transaction/components/TransactionBarChart";
import TransactionChart from "@/features/transaction/components/TransactionChart";
import TransactionWeeklyBarChart from "@/features/transaction/components/TransactionWeeklyBarChart";

const page = () => {
  return (
    <div>
      <DashboardHeader title="Analytics" />
      <MonthlyAnalyticsCard type="this-month" title="This Month Overflow" />
      <TransactionChart />
      <TransactionBarChart />
      <TransactionWeeklyBarChart title="Weekly Overflow" />
    </div>
  );
};

export default page;
