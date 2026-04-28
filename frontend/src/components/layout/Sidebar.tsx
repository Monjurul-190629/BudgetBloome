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
    <div className="w-20 m-4 bg-green-600 rounded-full flex flex-col items-center py-8 gap-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={index}
            title={item.label}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-green-500 transition"
          >
            <Icon className="w-5 h-5 text-white" />
          </button>
        );
      })}
    </div>
  );
}
