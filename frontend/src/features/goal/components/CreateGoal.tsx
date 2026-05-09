"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { GOAL } from "../type/goal.types";
import { createGoal } from "../api/goal.api";
import GoalMutationForm from "./GoalsMutationForm";

const CreateGoal = () => {
  const formRef = useRef<UseFormReturn<GOAL> | null>(null);

  const queryClient = useQueryClient();

  const createWalletMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success(response?.data?.detail || "Wallet created successfully");
        queryClient.invalidateQueries({ queryKey: ["getGoals"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalBalance"] });
        formRef.current?.reset();
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.detail ||
          error.message ||
          "Failed to create wallet",
      );
    },
  });

  const onSubmit = (data: GOAL) => {
    createWalletMutation.mutate({ data });
  };

  return (
    <GoalMutationForm
      onSubmit={onSubmit}
      isPending={createWalletMutation.isPending}
      formRef={formRef}
    />
  );
};

export default CreateGoal;
