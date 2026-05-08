import ProfileCard from "@/features/profile/components/ProfileCard";
import TransactionChart from "@/features/transaction/components/TransactionChart";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <ProfileCard />
      <TransactionChart type="expense" />
    </div>
  );
};

export default page;
