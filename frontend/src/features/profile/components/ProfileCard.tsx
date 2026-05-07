"use client";

import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { useAuth } from "@/features/auth/store/auth.store";

const ProfileCard = () => {
  const profile = useAuth((state) => state?.profile);

  if (!profile) {
    return (
      <div className="flex h-[400px] w-full max-w-md items-center justify-center rounded-3xl border border-white/10 bg-black p-8 text-gray-400 shadow-2xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-black p-8 shadow-2xl">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-green-500 shadow-lg">
          <Image
            src={profile.image || "/default-avatar.png"}
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="mt-5 text-3xl font-bold text-white">{profile.name}</h2>

        <p className="mt-1 text-sm text-gray-400">BudgetBloom User</p>
      </div>

      {/* Info Section */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
          <Mail className="h-5 w-5 text-green-400" />
          <span className="text-sm text-gray-300">{profile.email}</span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
          <Phone className="h-5 w-5 text-green-400" />
          <span className="text-sm text-gray-300">
            {profile.phone || "No phone added"}
          </span>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
          <MapPin className="h-5 w-5 text-green-400" />
          <span className="text-sm text-gray-300">
            {profile.address || "No address added"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
