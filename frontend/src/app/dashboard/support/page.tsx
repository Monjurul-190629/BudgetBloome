import DashboardHeader from "@/components/layout/DashboardHeader";
import BasicTicketCard from "@/features/support/components/BasicTicketCard";
import TicketData from "@/features/support/components/TicketData";

const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <DashboardHeader title="Ticket" />
      <BasicTicketCard />
      <TicketData />
    </div>
  );
};

export default page;
