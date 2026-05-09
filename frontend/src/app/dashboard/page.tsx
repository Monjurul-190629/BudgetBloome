import GoalsProgressCard from "@/features/goal/components/GoalProgressCard";
import ExpenseCard from "@/features/transaction/components/ExpenseCard";
import IncomeCard from "@/features/transaction/components/IncomeCard";
import TargetedExpenseCard from "@/features/transaction/components/TargetExpenseCard";
import TransactionAreaChart from "@/features/transaction/components/TransactionAreaChart";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";
import TransactionWeeklyBarChart from "@/features/transaction/components/TransactionWeeklyBarChart";
import BalanceCard from "@/features/wallet/components/BalanceCard";

const Page = () => {
  return (
    <div className="w-full space-y-4 overflow-hidden sm:space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <IncomeCard type="total" title="Total Income" />
          <ExpenseCard type="total" title="Total Expense" />
          <IncomeCard type="this-month" title="This Month Income" />
          <ExpenseCard type="this-month" title="This Month Expense" />
        </div>

        <div className="w-full min-w-0">
          <TransactionAreaChart type="income" />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2 lg:flex-row">
        <div className="w-full shrink-0 md:w-[400px]">
          <BalanceCard title="Current Balance" type="current" />
        </div>

        <div className="w-full flex-1">
          <TransactionWeeklyBarChart />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-start">
        <TargetedExpenseCard type="this-month" />
        <TargetedExpenseCard type="last-month" />
        <GoalsProgressCard />
      </div>

      <div className="w-full min-w-0 overflow-x-auto">
        <TransactionHistoryTable />
      </div>
    </div>
  );
};

export default Page;
