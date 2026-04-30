"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Target, User, LifeBuoy, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Wallet, label: "Wallets", href: "/dashboard/wallets" },
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/support" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      style={{ height: "500px", padding: "40px 28px" }}
      className="bg-green-600 rounded-full flex flex-col items-center justify-center gap-4"
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition
                  ${
                    isActive
                      ? "bg-white text-green-600 shadow-md"
                      : "text-white hover:bg-green-500"
                  }`}
              >
                <Icon className="w-5 h-5" />
              </Link>
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
