"use client";

import { Home, Wallet, Target, User, LifeBuoy, BarChart3 } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Wallet, label: "Wallets" },
  { icon: Target, label: "Goals" },
  { icon: BarChart3, label: "Analytics" },
  { icon: User, label: "Profile" },
  { icon: LifeBuoy, label: "Support" },
];

export default function Sidebar() {
  return (
    <div className="w-20 flex flex-col items-center py-4 shadow-md">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className="p-3 my-2 rounded-xl  transition"
          >
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        );
      })}
    </div>
  );
}
