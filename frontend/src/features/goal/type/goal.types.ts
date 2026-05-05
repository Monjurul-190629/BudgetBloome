import { z } from "zod";
import { goalSchema } from "../schema/goal.schema";

export type MUTATE_GOAL = z.infer<typeof goalSchema>;

export interface GOAL extends MUTATE_GOAL {
  _id?: string;
}

export type GOAL_PAYLOAD = {
  name: string;
  amount: number;
  description?: string;
  filled?: boolean;
};

export type GOAL_RESPONSE = {
  _id: string;
  user: string;
  name: string;
  amount: number;
  filled: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
};