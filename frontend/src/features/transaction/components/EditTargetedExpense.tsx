"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { updateTargetedExpense } from "../api/targeted-expense.api";
import type { TARGETED_EXPENSE } from "../type/target-expense.types";
import TargetedExpenseMutationForm from "./TargetExpenseMutationForm";

interface Props {
  target: TARGETED_EXPENSE;
  onSuccess: () => void;
}

const EditTargetedExpense = ({ target, onSuccess }: Props) => {
  const formRef = useRef<UseFormReturn<TARGETED_EXPENSE> | null>(null);

  const queryClient = useQueryClient();

  const updateTargetedExpenseMutation = useMutation({
    mutationFn: updateTargetedExpense,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(
          response?.data?.message || "Targeted expense updated successfully",
        );

        queryClient.invalidateQueries({
          queryKey: ["targetedExpenses"],
        });

        onSuccess();
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error.message ||
          "Failed to update targeted expense",
      );
    },
  });

  const onSubmit = (data: TARGETED_EXPENSE) => {
    if (target._id) {
      updateTargetedExpenseMutation.mutate({
        id: target._id,
        data,
      });
    }
  };

  return (
    <TargetedExpenseMutationForm
      onSubmit={onSubmit}
      isPending={updateTargetedExpenseMutation.isPending}
      formRef={formRef}
      target={target}
    />
  );
};

export default EditTargetedExpense;
