import { instance } from "@/lib/apiIntellisence";
import { REGISTRATION } from "../types/auth.types";

export const userRegistration = ({data} : {data : REGISTRATION})  => instance.post("auth/register");