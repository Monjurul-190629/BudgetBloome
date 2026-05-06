import DashboardHeader from "@/components/layout/DashboardHeader";
import GoalCard from "@/features/goal/components/GoalCard";
import MonthlySummaryCard from "@/features/transaction/components/MonthlySummaryCard";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";

const GoalsPage = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Goals" />

      <section>
        <GoalCard />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-6 items-start">
        <div className="w-full self-start">
          <MonthlySummaryCard title="Last Month" type="last-month" />
        </div>

        <div className="w-full self-start">
          <TransactionHistoryTable />
        </div>
      </section>
    </div>
  );
};

export default GoalsPage;
