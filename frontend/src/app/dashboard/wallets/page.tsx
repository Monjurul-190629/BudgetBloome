import DashboardHeader from "@/components/layout/DashboardHeader";
import BalanceCard from "@/features/wallet/components/BalanceCard";
import ExpenseCard from "@/features/transaction/components/ExpenseCard";
import QuickActionCard from "@/features/wallet/components/QuickActionCard";
import WalletCard from "@/features/wallet/components/WalletCard";

const WalletPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader title="Wallets" />

      <div className="grid grid-cols-1 justify-start gap-5 xl:grid-cols-12 xl:items-start">
        <div className="flex flex-col xl:col-span-5 2xl:col-span-4">
          <WalletCard />
          <QuickActionCard />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-7">
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
      </div>
    </div>
  );
};

export default WalletPage;
