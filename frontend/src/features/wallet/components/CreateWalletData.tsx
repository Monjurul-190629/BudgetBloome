"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { createWallet } from "../api/wallet.api";
import type { WALLET } from "../type/wallet.types";
import WalletMutationForm from "./WalletMutationForm";

const CreateWallet = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const formRef = useRef<UseFormReturn<WALLET> | null>(null);

  const queryClient = useQueryClient();

  const createWalletMutation = useMutation({
    mutationFn: createWallet,
    onSuccess: (response) => {
      if (response?.status === 201) {
        toast.success(response?.data?.detail || "Wallet created successfully");
        queryClient.invalidateQueries({ queryKey: ["getWallets"] });
        queryClient.invalidateQueries({ queryKey: ["total_balance"] });
        formRef.current?.reset();
        setModalOpen(false);
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

  const onSubmit = (data: WALLET) => {
    createWalletMutation.mutate({ data });
  };

  return (
    <WalletMutationForm
      onSubmit={onSubmit}
      isPending={createWalletMutation.isPending}
      formRef={formRef}
    />
  );
};

export default CreateWallet;
