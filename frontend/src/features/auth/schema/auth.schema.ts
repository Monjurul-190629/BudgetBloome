import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().optional().default(""),
  address: z.string().min(1, "Address is required"),
  phone: z.string().optional().default(""),
});