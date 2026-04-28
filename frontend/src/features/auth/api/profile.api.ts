import { instance } from "@/lib/api/apiIntellisence";
import { USER_PROFILE } from "../types/profile.types";


export const getUserProfile = ({ token }: { token: string }) =>
  instance.get(`/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateProfile = ({data} : {data: USER_PROFILE}) => instance.put("/user/update", data)