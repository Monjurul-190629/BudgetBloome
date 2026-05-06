"use client";

import useFetchData from "@/hooks/useFetchData";
import { Edit, PlusCircle, Target, Trash2 } from "lucide-react";
import { useState } from "react";
import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { AlertModal } from "@/components/common-ui/modal/AlertModal";

import { getAllGoals, deleteGoal } from "@/features/goal/api/goal.api";
import type { GOAL } from "@/features/goal/type/goal.types";
import CreateGoal from "./CreateGoal";
import EditGoal from "./EditGoal";

const GoalCard = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GOAL | null>(null);

  const queryClient = useQueryClient();

  const { data: goalsData } = useFetchData(["getGoals"], getAllGoals);

  const goals = goalsData?.data?.data ?? [];
  const numberOfFilled = goalsData?.data?.numberOfFilled ?? 0;

  const deleteGoalMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: (response) => {
      toast.success(response?.data?.message || "Goal deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getGoals"] });
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

  const handleEdit = (goal: GOAL) => {
    setSelectedGoal(goal);
    setEditOpen(true);
  };

  return (
    <div className=" text-white rounded-2xl p-5 w-full max-w-md shadow-xl">
      <div className="space-y-3 mb-5">
        {goals.length > 0 ? (
          goals.map((goal: GOAL) => (
            <div
              key={goal?._id}
              className="group flex items-center justify-between bg-black p-3 rounded-lg transition"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Target className="w-4 h-4 text-green-400" />
                </div>

                <div>
                  <p className="text-sm font-medium">{goal?.name}</p>

                  {goal?.description && (
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {goal.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-sm font-semibold text-green-400">
                    ৳ {goal?.amount}
                  </span>

                  <p
                    className={`text-xs ${
                      goal?.filled ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {goal?.filled ? "Filled" : "Pending"}
                  </p>
                </div>

                <div className="hidden group-hover:flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(goal)}
                    className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <AlertModal
                    trigger={
                      <button className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    }
                    title="Delete Goal?"
                    description="This action cannot be undone. This goal will be permanently removed."
                    actionButton={
                      <button
                        onClick={() =>
                          deleteGoalMutation.mutate({ id: goal._id as string })
                        }
                      >
                        Delete Goal
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No goals found</p>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">My Goals</h2>
          <p className="text-xs text-gray-400">
            Filled goals: {numberOfFilled}
          </p>
        </div>

        <Target className="text-green-400" />
      </div>

      <ShapedModal
        trigger={
          <button className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition">
            <PlusCircle className="w-4 h-4" />
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
              setSelectedGoal(null);
            }}
          />
        </ShapedModal>
      )}
    </div>
  );
};

export default GoalCard;
