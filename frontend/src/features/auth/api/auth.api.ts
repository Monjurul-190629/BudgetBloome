import { instance } from "@/lib/api/apiIntellisence";
import { LOGIN, REGISTRATION_PAYLOAD } from "../types/auth.types";

export const userRegistration = (data: REGISTRATION_PAYLOAD) =>
  instance.post("/auth/register", data);

export const userLogin = ({data} : {data: LOGIN}) => instance.post("/auth/login", data)