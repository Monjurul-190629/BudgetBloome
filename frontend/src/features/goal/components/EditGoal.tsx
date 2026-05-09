"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { GOAL } from "../type/goal.types";
import { updateGoal } from "../api/goal.api";
import GoalMutationForm from "./GoalsMutationForm";

interface Props {
  goal: GOAL;
  onSuccess: () => void;
}

const EditGoal = ({ goal, onSuccess }: Props) => {
  const formRef = useRef<UseFormReturn<GOAL> | null>(null);

  const queryClient = useQueryClient();

  const updateWalletMutation = useMutation({
    mutationFn: updateGoal,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.data?.detail || "Wallet updated successfully");
        queryClient.invalidateQueries({ queryKey: ["getGoals"] });
        queryClient.invalidateQueries({ queryKey: ["getTotalBalance"] });
        onSuccess();
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.detail ||
          error.message ||
          "Failed to create goal",
      );
    },
  });

  const onSubmit = (data: GOAL) => {
    if (goal._id) {
      updateWalletMutation.mutate({
        data,
        id: goal._id,
      });
    }
  };

  return (
    <GoalMutationForm
      onSubmit={onSubmit}
      isPending={updateWalletMutation.isPending}
      formRef={formRef}
      goal={goal}
    />
  );
};

export default EditGoal;
