"use client";

import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { getTickets } from "../api/ticket.api";
import { TICKET } from "../types/ticket.types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import IconButton from "@/components/common-ui/button/IconButton";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleQuestion,
  Ticket,
} from "lucide-react";
import SkeletonTicketData from "../skeleton/SkeletonTicketData";

const TicketData = () => {
  const [page, setPage] = useState(1);

  const { data: ticketsData, isLoading } = useFetchData(
    ["getTickets", page],
    () => getTickets({ page }),
  );

  const tickets: TICKET[] = ticketsData?.data?.data ?? [];
  const meta = ticketsData?.data?.meta;

  if (isLoading) {
    return <SkeletonTicketData />;
  }

  if (!tickets.length) {
    return (
      <div className="w-full rounded-2xl bg-black p-5 shadow-sm">
        <p className="text-sm text-gray-400">No tickets found.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
          <Ticket className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Your Tickets</h2>

          <p className="text-sm text-gray-400">
            View your submitted support questions.
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {tickets.map((ticket, index) => (
          <AccordionItem
            key={ticket._id || index}
            value={`ticket-${ticket._id || index}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4"
          >
            <AccordionTrigger className="gap-3 text-left text-white hover:no-underline">
              <div className="flex items-center gap-3">
                <MessageCircleQuestion className="h-4 w-4 shrink-0 text-green-400" />
                <span>{ticket.subject}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pl-7 text-sm leading-6 text-gray-300">
              {ticket.message}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-5 flex items-center justify-end gap-3">
        <p className="mr-2 text-sm text-gray-400">
          Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
        </p>

        <IconButton
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="w-[110px] border border-white/10 bg-white/5 text-white hover:bg-white/10"
          icon={<ChevronLeft className="h-4 w-4" />}
        >
          Previous
        </IconButton>

        <IconButton
          disabled={page >= (meta?.totalPages ?? 1)}
          onClick={() => setPage((prev) => prev + 1)}
          className="w-[90px] border border-white/10 bg-green-500 text-black hover:bg-green-600"
          isReversed
          icon={<ChevronRight className="h-4 w-4" />}
        >
          Next
        </IconButton>
      </div>
    </div>
  );
};

export default TicketData;
