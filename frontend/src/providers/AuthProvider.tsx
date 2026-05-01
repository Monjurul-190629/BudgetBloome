"use client";

import { useEffect } from "react";
import { getUserProfile } from "@/features/auth/api/profile.api";
import { useAuth } from "@/features/auth/store/auth.store";
import useFetchData from "@/hooks/useFetchData";
import { getTotalBalance } from "@/features/wallet/api/wallet.api";
import { useBalanceStore } from "@/features/wallet/store/balance.store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = useAuth((state) => state?.token);
  const setBalance = useBalanceStore((state) => state?.setTotalBalance);
  const setProfile = useAuth((state) => state?.setProfile);
  const logout = useAuth((state) => state?.logOut);

  const { data: profileData, error } = useFetchData(
    ["getUserProfile", token],
    () => getUserProfile({ token: token as string }),
    {
      enabled: !!token,
      queryKey: ["getUserProfile", token],
    },
  );

  const { data: totalBalanceData } = useFetchData(
    ["getTotalBalance"],
    getTotalBalance,
  );

  const totalBalance = totalBalanceData?.data?.data?.total_balance ?? 0;

  useEffect(() => {
    if (profileData?.data) {
      setProfile(profileData?.data?.data);
      setBalance(totalBalance);
    }
  }, [profileData, setProfile]);

  useEffect(() => {
    if (error) {
      logout?.();
    }
  }, [error, logout]);

  console.log("profileData", profileData?.data?.data);

  return <>{children}</>;
};

export default AuthProvider;
