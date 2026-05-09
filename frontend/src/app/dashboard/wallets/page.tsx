import DashboardHeader from "@/components/layout/DashboardHeader";
import BalanceCard from "@/features/wallet/components/BalanceCard";
import ExpenseCard from "@/features/transaction/components/ExpenseCard";
import QuickActionCard from "@/features/wallet/components/QuickActionCard";
import WalletCard from "@/features/wallet/components/WalletCard";
import TargetedExpenseCard from "@/features/transaction/components/TargetExpenseCard";
import TransactionAreaChart from "@/features/transaction/components/TransactionAreaChart";
import AvailableWalletChart from "@/features/wallet/components/AvailableWalletChart";

const WalletPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <DashboardHeader title="Wallets" />

      <section className="grid w-full grid-cols-1 gap-5 xl:grid-cols-12 items-start">
        <div className="w-full xl:col-span-5 2xl:col-span-4 self-start">
          <WalletCard />
        </div>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-7 2xl:col-span-8">
          <BalanceCard title="Current Balance" type="current" />

          <BalanceCard title="Saving Balance" type="saving" />

          <ExpenseCard
            type="this-month"
            title="This Month Expense"
            changeDefault
          />

          <ExpenseCard
            type="last-month"
            title="Last Month Expense"
            changeDefault
          />
        </div>
      </section>

      <section className="flex flex-col gap-2 md:flex-row">
        <AvailableWalletChart />
        <TransactionAreaChart />
      </section>
    </div>
  );
};

export default WalletPage;
