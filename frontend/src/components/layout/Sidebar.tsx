"use client";

import { Home, Wallet, Target, User, LifeBuoy, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: Wallet, label: "Wallets" },
  { icon: Target, label: "Goals" },
  { icon: BarChart3, label: "Analytics" },
  { icon: User, label: "Profile" },
  { icon: LifeBuoy, label: "Support" },
];

export default function Sidebar() {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{ height: "500px", padding: "40px 28px" }}
      className="bg-green-600 rounded-full flex flex-col items-center justify-center gap-4"
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = active === index;

        return (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActive(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition
                  ${
                    isActive
                      ? "bg-white text-green-600 shadow-md"
                      : "text-white hover:bg-green-500"
                  }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            </TooltipTrigger>

            <TooltipContent
              side="right"
              className="text-green-600 bg-white font-semibold"
            >
              {item.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
