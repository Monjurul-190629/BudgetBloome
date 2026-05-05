"use client";

import useFetchData from "@/hooks/useFetchData";
import { deleteWallet, getAllWallets } from "../api/wallet.api";
import { Edit, PlusCircle, Trash2, Wallet } from "lucide-react";
import { useState } from "react";
import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import CreateWallet from "./CreateWalletData";
import EditWallet from "./EditWallet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { WALLET } from "../type/wallet.types";
import { AlertModal } from "@/components/common-ui/modal/AlertModal";

const WalletCard = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  const queryClient = useQueryClient();

  const { data: walletsData } = useFetchData(["getWallets"], getAllWallets);
  const wallets = walletsData?.data?.data ?? [];

  const deleteWalletMutation = useMutation({
    mutationFn: deleteWallet,
    onSuccess: (response) => {
      toast.success(response?.data?.detail || "Wallet deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getWallets"] });
      queryClient.invalidateQueries({ queryKey: ["getTotalBalance"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.detail ||
          error.message ||
          "Failed to delete wallet",
      );
    },
  });

  const handleEdit = (wallet: WALLET) => {
    setSelectedWallet(wallet);
    setEditOpen(true);
  };

  return (
    <div className="bg-black text-white rounded-2xl p-5 w-full max-w-md shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Accounts</h2>
        <Wallet className="text-green-400" />
      </div>

      <div className="space-y-3 mb-5">
        {wallets.length > 0 ? (
          wallets.map((wallet: any) => (
            <div
              key={wallet?._id}
              className="group flex items-center justify-between bg-zinc-900 p-3 rounded-lg hover:bg-zinc-800 transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Wallet className="w-4 h-4 text-green-400" />
                </div>

                <span className="text-sm font-medium">
                  {wallet?.wallet_name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-green-400">
                  ৳ {wallet?.amount}
                </span>

                <div className="hidden group-hover:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(wallet)}
                    className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <AlertModal
                    trigger={
                      <button
                        className={` p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    }
                    title="Delete Wallet?"
                    description="This action cannot be undone. All associated data will be permanently removed."
                    actionButton={
                      <button
                        onClick={() =>
                          deleteWalletMutation.mutate({ id: wallet._id })
                        }
                      >
                        Delete Wallet
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No wallets found</p>
        )}
      </div>

      <ShapedModal
        trigger={
          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition">
            <PlusCircle className="w-4 h-4" />
            Add Wallet
          </button>
        }
        title="Add Wallet"
        description="Create a new wallet"
        open={open}
        onOpenChange={setOpen}
        isPermitted={true}
      >
        <CreateWallet />
      </ShapedModal>

      {selectedWallet && (
        <ShapedModal
          trigger={<button className="hidden">Edit Wallet</button>}
          title="Edit Wallet"
          description="Update wallet information"
          open={editOpen}
          onOpenChange={setEditOpen}
          isPermitted={true}
        >
          <EditWallet
            wallet={selectedWallet}
            onSuccess={() => {
              setEditOpen(false);
              setSelectedWallet(null);
            }}
          />
        </ShapedModal>
      )}
    </div>
  );
};

export default WalletCard;
