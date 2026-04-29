"use client";

import { Home, Wallet, Target, User, LifeBuoy, BarChart3 } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Wallet, label: "Wallets" },
  { icon: Target, label: "Goals" },
  { icon: BarChart3, label: "Analytics" },
  { icon: User, label: "Profile" },
  { icon: LifeBuoy, label: "Support" },
];

export default function BottomNavbar() {
  const [active, setActive] = useState(0);

  return (
    <nav
      className="bottom-nav fixed bottom-0 left-0 right-0 z-50 
                bg-green-600 rounded-t-3xl px-2 pt-2 pb-4 
                justify-around items-center"
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = active === index;

        return (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
              isActive ? "bg-white/20" : "bg-transparent hover:bg-white/10"
            }`}
          >
            <Icon
              className={`w-5 h-5 ${isActive ? "text-white" : "text-white/65"}`}
            />
            <span
              className={`text-[10px] tracking-wide ${
                isActive
                  ? "text-white font-medium"
                  : "text-white/65 font-normal"
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
