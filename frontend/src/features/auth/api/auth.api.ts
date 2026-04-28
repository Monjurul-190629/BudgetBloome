import { instance } from "@/lib/apiIntellisence";
import { REGISTRATION_PAYLOAD } from "../types/auth.types";

export const userRegistration = (data: REGISTRATION_PAYLOAD) =>
  instance.post("/auth/register", data);