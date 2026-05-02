import ExpenseCard from "@/features/transaction/components/ExpenseCard";
import IncomeCard from "@/features/transaction/components/IncomeCard";
import TransactionChart from "@/features/transaction/components/TransactionChart";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";

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
          <TransactionChart type="income" />
        </div>
      </div>

      <div className="w-full min-w-0 overflow-x-auto">
        <TransactionHistoryTable />
      </div>
    </div>
  );
};

export default Page;
