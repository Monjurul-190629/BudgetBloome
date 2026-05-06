"use client";

import useFetchData from "@/hooks/useFetchData";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { AlertModal } from "@/components/common-ui/modal/AlertModal";

import { deleteGoal, getAllGoals } from "@/features/goal/api/goal.api";
import { getTotalBalance } from "@/features/wallet/api/wallet.api";

import type { GOAL } from "@/features/goal/type/goal.types";

import CreateGoal from "./CreateGoal";
import EditGoal from "./EditGoal";
import AvailableWalletCard from "@/features/wallet/components/AvailableWalletCard";

const GoalCard = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState<GOAL | null>(null);

  const queryClient = useQueryClient();

  const { data: goalsData } = useFetchData(["getGoals"], getAllGoals);

  const { data: totalBalanceData } = useFetchData(["getTotalBalance"], () =>
    getTotalBalance(),
  );

  const goals: GOAL[] = goalsData?.data?.data ?? [];

  const totalBalance = totalBalanceData?.data?.data?.total_balance ?? 0;

  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      setSelectedGoal(goals[0]);
    }
  }, [goals, selectedGoal]);

  const deleteGoalMutation = useMutation({
    mutationFn: deleteGoal,

    onSuccess: (response) => {
      toast.success(response?.data?.message || "Goal deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["getGoals"],
      });

      if (selectedGoal?._id) {
        const remainingGoals = goals.filter(
          (goal) => goal._id !== selectedGoal._id,
        );

        setSelectedGoal(remainingGoals[0] || null);
      }
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error.message ||
          "Failed to delete goal",
      );
    },
  });

  const goalAmount = selectedGoal?.amount ?? 0;

  const progress =
    goalAmount > 0
      ? Math.min(Math.round((totalBalance / goalAmount) * 100), 100)
      : 0;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="space-y-5">
          {goals.length > 0 ? (
            goals.map((goal) => {
              const isActive = selectedGoal?._id === goal._id;

              return (
                <div
                  key={goal._id}
                  onClick={() => setSelectedGoal(goal)}
                  className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "bg-black text-white "
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-lg font-semibold">{goal.name}</p>

                      <p className="mt-3 text-sm">
                        <span className="font-bold">৳ {totalBalance}</span>

                        <span
                          className={`ml-2 font-semibold ${
                            isActive ? "text-white/80" : "text-gray-300"
                          }`}
                        >
                          / ৳ {goal.amount}
                        </span>
                      </p>
                    </div>

                    <div className="hidden group-hover:flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedGoal(goal);
                          setEditOpen(true);
                        }}
                        className={`p-2 rounded-lg transition ${
                          isActive
                            ? "bg-blue-900 text-white hover:bg-zinc-800"
                            : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                        }`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <AlertModal
                        trigger={
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className={`p-2 rounded-lg transition ${
                              isActive
                                ? "bg-red-500 text-white hover:bg-zinc-800"
                                : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        }
                        title="Delete Goal?"
                        description="This action cannot be undone."
                        actionButton={
                          <button
                            onClick={() =>
                              deleteGoalMutation.mutate({
                                id: goal._id as string,
                              })
                            }
                          >
                            Delete Goal
                          </button>
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-black rounded-3xl p-6 text-center text-gray-400">
              No goals found
            </div>
          )}

          <ShapedModal
            trigger={
              <button className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-900 font-semibold py-4 rounded-3xl transition">
                <PlusCircle className="w-5 h-5" />
                Add Goal
              </button>
            }
            title="Add Goal"
            description="Create a new saving goal"
            open={open}
            onOpenChange={setOpen}
            isPermitted={true}
          >
            <CreateGoal />
          </ShapedModal>
        </div>

        <div className="space-y-4">
          <div className="bg-black rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedGoal?.name ?? "Select Goal"}
            </h2>
          </div>

          {selectedGoal && (
            <div className="bg-black rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-md text-gray-400 mb-3">Current Balance</p>

                  <h3 className="text-xl font-bold">৳ {totalBalance}</h3>
                </div>

                <div className="text-right">
                  <p className="text-md text-gray-400 mb-3">Goal</p>

                  <h3 className="text-2xl font-bold">৳ {goalAmount}</h3>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-zinc-300 overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>

              {/* PERCENTAGE */}
              <div className="flex items-center justify-between mt-4 text-lg text-gray-300">
                <span>{progress}%</span>

                <span>{100 - progress}%</span>
              </div>
            </div>
          )}
          <AvailableWalletCard />
        </div>
      </div>

      {/* EDIT MODAL */}
      {selectedGoal && (
        <ShapedModal
          trigger={<button className="hidden">Edit Goal</button>}
          title="Edit Goal"
          description="Update goal information"
          open={editOpen}
          onOpenChange={setEditOpen}
          isPermitted={true}
        >
          <EditGoal
            goal={selectedGoal}
            onSuccess={() => {
              setEditOpen(false);
            }}
          />
        </ShapedModal>
      )}
    </div>
  );
};

export default GoalCard;
