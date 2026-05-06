import DashboardHeader from "@/components/layout/DashboardHeader";
import GoalCard from "@/features/goal/components/GoalCard";

const page = () => {
  return (
    <div>
      <DashboardHeader title="Goals" />
      <div>
        <GoalCard />
      </div>
    </div>
  );
};

export default page;
