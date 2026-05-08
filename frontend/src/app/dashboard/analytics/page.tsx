import DashboardHeader from "@/components/layout/DashboardHeader";
import MonthlyAnalyticsCard from "@/features/analytics/components/MonthlyAnalyticsCard";

const page = () => {
  return (
    <div>
      <DashboardHeader title="Analytics" />
      <MonthlyAnalyticsCard type="this-month" title="This Month Overflow" />
    </div>
  );
};

export default page;
