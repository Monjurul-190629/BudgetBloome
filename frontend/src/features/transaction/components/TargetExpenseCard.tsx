"use client";

import useFetchData from "@/hooks/useFetchData";
import { getDateRange } from "@/lib/utils/getDateRange";
import {
  deleteTargetedExpense,
  getTargetedExpenses,
} from "@/features/transaction/api/targeted-expense.api";

import type {
  TARGETED_EXPENSE,
  TARGETED_EXPENSE_RESPONSE,
} from "@/features/transaction/type/target-expense.types";

import {
  Edit,
  PlusCircle,
  Trash2,
  ReceiptText,
  HandCoins,
  CreditCard,
  WalletCards,
  Banknote,
  Coins,
  TrendingDown,
} from "lucide-react";

import { useState } from "react";

import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { AlertModal } from "@/components/common-ui/modal/AlertModal";

import CreateTargetedExpense from "./CreateTargetedExpense";
import EditTargetedExpense from "./EditTargetedExpense";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import type { AxiosError } from "axios";

type TargetedExpenseCardProps = {
  type: "this-month" | "last-month";
};

const expenseIcons = [
  ReceiptText,
  HandCoins,
  CreditCard,
  WalletCards,
  Banknote,
  Coins,
  TrendingDown,
];

const TargetedExpenseCard = ({ type }: TargetedExpenseCardProps) => {
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [selectedTarget, setSelectedTarget] =
    useState<TARGETED_EXPENSE_RESPONSE | null>(null);

  const queryClient = useQueryClient();

  const { from, to } = getDateRange(type);

  const { data, isLoading } = useFetchData(
    ["targetedExpenses", type, from, to],
    () => getTargetedExpenses({ from, to }),
  );

  const targets: TARGETED_EXPENSE_RESPONSE[] = data?.data?.data ?? [];

  console.log(targets);

  const deleteTargetedExpenseMutation = useMutation({
    mutationFn: deleteTargetedExpense,

    onSuccess: (response) => {
      toast.success(
        response?.data?.message || "Targeted expense deleted successfully",
      );

      queryClient.invalidateQueries({
        queryKey: ["targetedExpenses"],
      });
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error.message ||
          "Failed to delete targeted expense",
      );
    },
  });

  const handleEdit = (target: TARGETED_EXPENSE_RESPONSE) => {
    setSelectedTarget(target);
    setEditOpen(true);
  };

  const title =
    type === "this-month" ? "This Month Expenses" : "Last Month Expenses";

  return (
    <div className="w-full max-w-md rounded-2xl bg-black p-5 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="text-sm text-gray-400">Targeted expense list</p>
        </div>

        <TrendingDown className="text-red-400" />
      </div>

      <div className="mb-5 space-y-3">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : targets.length > 0 ? (
          targets.map((target, index) => {
            const Icon = expenseIcons[index % expenseIcons.length];

            return (
              <div
                key={target._id}
                className="group flex items-center justify-between rounded-lg bg-zinc-900 p-3 transition hover:bg-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-red-500/20 p-2">
                    <Icon className="h-4 w-4 text-red-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">{target.name}</h3>

                    {target.filled ? (
                      <p className="text-xs font-medium text-green-400">
                        Expense limit reached
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">Expense Target</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-red-400">
                    ৳ {target.amount}
                  </span>

                  <div className="hidden items-center gap-2 group-hover:flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(target)}
                      className="rounded-md bg-blue-500/20 p-1.5 text-blue-400 transition hover:bg-blue-500/30"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <AlertModal
                      trigger={
                        <button className="rounded-md bg-red-500/20 p-1.5 text-red-400 transition hover:bg-red-500/30">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      }
                      title="Delete Targeted Expense?"
                      description="This action cannot be undone. This targeted expense will be permanently removed."
                      actionButton={
                        <button
                          onClick={() =>
                            deleteTargetedExpenseMutation.mutate({
                              id: target._id,
                            })
                          }
                        >
                          Delete Target
                        </button>
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-400">No targeted expenses found</p>
        )}
      </div>

      <ShapedModal
        trigger={
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2 font-semibold text-white transition hover:bg-red-600">
            <PlusCircle className="h-4 w-4" />
            Add Targeted Expense
          </button>
        }
        title="Add Targeted Expense"
        description="Create a new targeted expense"
        open={open}
        onOpenChange={setOpen}
        isPermitted={true}
      >
        <CreateTargetedExpense />
      </ShapedModal>

      {selectedTarget && (
        <ShapedModal
          trigger={<button className="hidden">Edit Target</button>}
          title="Edit Targeted Expense"
          description="Update targeted expense information"
          open={editOpen}
          onOpenChange={setEditOpen}
          isPermitted={true}
        >
          <EditTargetedExpense
            target={selectedTarget as TARGETED_EXPENSE}
            onSuccess={() => {
              setEditOpen(false);
              setSelectedTarget(null);
            }}
          />
        </ShapedModal>
      )}
    </div>
  );
};

export default TargetedExpenseCard;
