import { z } from "zod";
import { registrationSchema } from "../schema/auth.schema";

export type REGISTRATION = z.infer<typeof registrationSchema>;

export type REGISTRATION_PAYLOAD = {
  name: string;
  email: string;
  password: string;
  address: string;
  image?: string;
  phone?: string;
};