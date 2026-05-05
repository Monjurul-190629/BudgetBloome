import { instance } from "@/lib/api/apiIntellisence";
import type { GOAL_PAYLOAD } from "../type/goal.types";

export const createGoal = ({ data }: { data: GOAL_PAYLOAD }) =>
  instance.post("/goals", data);

export const getAllGoals = () => instance.get("/goals");

export const updateGoal = ({
  id,
  data,
}: {
  id: string;
  data: Partial<GOAL_PAYLOAD>;
}) => instance.put(`/goals/${id}`, data);

export const deleteGoal = ({ id }: { id: string }) =>
  instance.delete(`/goals/${id}`);