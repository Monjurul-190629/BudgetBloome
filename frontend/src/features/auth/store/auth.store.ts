import { PROFILE } from "@/shared/common.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface STORE_TYPE {
  token?: string;
  setToken: (token?: string) => void;
  profile?: PROFILE;
  setProfile: (profile: PROFILE) => void;
  stored_email_or_phone: string;
  setStoredEmailOrPhone: (storedEmailOrPhone: string) => void;
  logOut: () => void;
}

export const useAuth = create<STORE_TYPE>()(
  devtools(
    persist(
      (set) => ({
        token: undefined,
        setToken: (token: STORE_TYPE["token"]) =>
          set({
            token,
          }),
        profile: undefined,
        setProfile: (profile: STORE_TYPE["profile"]) => set({ profile }),
        stored_email_or_phone: "",
        setStoredEmailOrPhone: (
          emailOrPhone: STORE_TYPE["stored_email_or_phone"],
        ) => set({ stored_email_or_phone: emailOrPhone }),
        logOut: () => set({ profile: undefined, token: undefined }),
      }),
      {
        name: "budget-bloome-auth-token",
      },
    ),
  ),
);
