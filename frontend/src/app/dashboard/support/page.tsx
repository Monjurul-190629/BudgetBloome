import DashboardHeader from "@/components/layout/DashboardHeader";
import BasicTicketCard from "@/features/support/components/BasicTicketCard";

const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <DashboardHeader title="Ticket" />
      <BasicTicketCard />
    </div>
  );
};

export default page;
