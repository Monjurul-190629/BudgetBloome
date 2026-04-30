"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { updateWallet } from "../api/wallet.api";
import type { WALLET, WALLET_RESPONSE } from "../type/wallet.types";
import WalletMutationForm from "./WalletMutationForm";

interface Props {
  wallet: WALLET;
  onSuccess: () => void;
}

const EditWallet = ({ wallet, onSuccess }: Props) => {
  const formRef = useRef<UseFormReturn<WALLET> | null>(null);

  const queryClient = useQueryClient();

  const updateWalletMutation = useMutation({
    mutationFn: updateWallet,
    onSuccess: (response) => {
      if (response?.status === 200) {
        toast.success(response?.data?.detail || "Wallet updated successfully");
        queryClient.invalidateQueries({ queryKey: ["getWallets"] });
        queryClient.invalidateQueries({ queryKey: ["total_balance"] });
        onSuccess();
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
    if (wallet._id) {
      updateWalletMutation.mutate({
        data,
        id: wallet._id,
      });
    }
  };

  return (
    <WalletMutationForm
      onSubmit={onSubmit}
      isPending={updateWalletMutation.isPending}
      formRef={formRef}
      wallet={wallet}
    />
  );
};

export default EditWallet;
