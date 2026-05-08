import ProfileCard from "@/features/profile/components/ProfileCard";
import TransactionBarChart from "@/features/transaction/components/TransactionBarChart";
import TransactionChart from "@/features/transaction/components/TransactionChart";
import TransactionHistoryTable from "@/features/transaction/components/TransactionHistoryTable";

const page = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-2">
        <ProfileCard />
        <TransactionBarChart type="both" />
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <TransactionChart type="income" />
      </div>
    </div>
  );
};

export default page;
