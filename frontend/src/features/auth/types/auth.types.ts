import { z } from "zod";
import { registrationSchema } from "../schema/auth.schema";

export type REGISTRATION = z.infer<typeof registrationSchema>;