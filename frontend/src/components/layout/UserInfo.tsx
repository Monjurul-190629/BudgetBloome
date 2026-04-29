import { useAuth } from "@/features/auth/store/auth.store";
import { LogOut, User2 } from "lucide-react";

const UserInfo = () => {
  const profile = useAuth((state) => state.profile);
  const logout = useAuth((state) => state.logOut);

  console.log("Profile Name", profile);

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="w-64 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
      {/* Header banner */}
      <div className="h-12 bg-gradient-to-r from-green-700 to-green-500" />

      {/* Avatar */}
      <div className="px-4 pb-4">
        <div className="-mt-6 mb-3">
          {profile?.image ? (
            <img
              src={profile.image}
              alt={profile.name}
              className="w-14 h-14 rounded-full border-4 border-white shadow-md object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-green-700 flex items-center justify-center text-white font-semibold text-lg">
              {initials}
            </div>
          )}
        </div>

        {/* Name & email */}
        <div className="mb-4">
          <p className="text-gray-900 font-semibold text-sm leading-tight">
            {profile?.name ?? "Unknown User"}
          </p>
          {profile?.email && (
            <p className="text-gray-400 text-xs mt-0.5 truncate">
              {profile.email}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-3" />

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
