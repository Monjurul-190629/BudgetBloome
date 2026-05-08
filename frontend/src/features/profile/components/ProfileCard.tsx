"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useAuth } from "@/features/auth/store/auth.store";
import SkeletonProfileCard from "../SkeletonProfileCard";

const ProfileCard = () => {
  const profile = useAuth((state) => state?.profile);

  if (!profile) {
    return <SkeletonProfileCard />;
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 shadow-xl transition-all dark:g-[#f4f4f5] darK:border darK:border-zinc-200">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-green-500 shadow-md">
          <Image
            src={profile.image || "/default-avatar.png"}
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-white">{profile.name}</h2>

        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
          BudgetBloom User
        </p>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-100/70">
          <Mail className="h-4 w-4 shrink-0 text-green-500" />
          <span className="truncate text-sm text-white dark:text-zinc-900">
            {profile.email}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-100/70">
          <Phone className="h-4 w-4 shrink-0 text-green-500" />
          <span className="text-sm text-white dark:text-zinc-900">
            {profile.phone || "No phone added"}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 dark:bg-zinc-100/70">
          <MapPin className="h-4 w-4 shrink-0 text-green-500" />
          <span className="truncate text-sm text-white dark:text-zinc-900">
            {profile.address || "No address added"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
