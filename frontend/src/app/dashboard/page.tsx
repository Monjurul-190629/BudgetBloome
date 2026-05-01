import ExpenseCard from "@/features/transaction/components/ExpenseCard";
import IncomeCard from "@/features/transaction/components/IncomeCard";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";

const Page = () => {
  return (
    <div className="w-full space-y-4 overflow-hidden sm:space-y-6">
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          <IncomeCard type="total" title="Total Income" />
          <ExpenseCard type="total" title="Total Expense" />
          <IncomeCard type="this-month" title="This Month Income" />
          <ExpenseCard type="this-month" title="This Month Expense" />
        </div>

        {/* Side Table */}
        <div className="w-full min-w-0 overflow-x-auto lg:col-span-1">
          <TransactionHistoryTable />
        </div>
      </div>

      {/* Full Width Table */}
      <div className="w-full min-w-0 overflow-x-auto">
        <TransactionHistoryTable />
      </div>
    </div>
  );
};

export default Page;
