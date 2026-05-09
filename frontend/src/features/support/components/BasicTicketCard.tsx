"use client";

import IconButton from "@/components/common-ui/button/IconButton";
import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import CreateTicket from "./CreateTicket";

const BasicTicketCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-2xl bg-black p-5 shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Ticket</h2>

          <p className="mt-1 max-w-xl text-sm text-gray-400">
            Need help or have a question? Create a support ticket and we will
            get back to you soon.
          </p>
        </div>

        <ShapedModal
          trigger={
            <IconButton
              icon={<PlusCircle className="h-4 w-4" />}
              className="bg-green-500 font-semibold text-black hover:bg-green-600"
            >
              Create Ticket
            </IconButton>
          }
          title="Create Ticket"
          description="Submit your question or issue"
          open={open}
          onOpenChange={setOpen}
          isPermitted={true}
        >
          <CreateTicket />
        </ShapedModal>
      </div>
    </div>
  );
};

export default BasicTicketCard;
