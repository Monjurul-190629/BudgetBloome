"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { TARGETED_EXPENSE } from "../type/target-expense.types";
import { createTargetedExpense } from "../api/targeted-expense.api";
import TargetedExpenseMutationForm from "./TargetExpenseMutationForm";

const CreateTargetedExpense = () => {
  const formRef = useRef<UseFormReturn<TARGETED_EXPENSE> | null>(null);

  const queryClient = useQueryClient();

  const createTargetedExpenseMutation = useMutation({
    mutationFn: createTargetedExpense,
    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success(
          response?.data?.message || "Targeted expense created successfully",
        );

        queryClient.invalidateQueries({
          queryKey: ["targetedExpenses"],
        });

        formRef.current?.reset();
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error.message ||
          "Failed to create targeted expense",
      );
    },
  });

  const onSubmit = (data: TARGETED_EXPENSE) => {
    createTargetedExpenseMutation.mutate({ data });
  };

  return (
    <TargetedExpenseMutationForm
      onSubmit={onSubmit}
      isPending={createTargetedExpenseMutation.isPending}
      formRef={formRef}
    />
  );
};

export default CreateTargetedExpense;