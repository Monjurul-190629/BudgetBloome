"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { createTicket } from "../api/ticket.api";
import { TICKET } from "../types/ticket.types";
import TicketMutationForm from "./TicketMutationForm";

const CreateTicket = () => {
  const formRef = useRef<UseFormReturn<TICKET> | null>(null);

  const queryClient = useQueryClient();

  const createTicketMutation = useMutation({
    mutationFn: createTicket,

    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success(response?.data?.message || "Ticket created successfully");

        queryClient.invalidateQueries({
          queryKey: ["getTickets"],
        });

        formRef.current?.reset();
      }
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create ticket",
      );
    },
  });

  const onSubmit = (data: TICKET) => {
    createTicketMutation.mutate({ data });
  };

  return (
    <TicketMutationForm
      onSubmit={onSubmit}
      isPending={createTicketMutation.isPending}
      formRef={formRef}
    />
  );
};

export default CreateTicket;
