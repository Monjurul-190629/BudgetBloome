"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Target, User, LifeBuoy, BarChart3 } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Wallet, label: "Wallets", href: "/dashboard/wallets" },
  { icon: Target, label: "Goals", href: "/dashboard/goals" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/support" },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 
                 bg-green-600 rounded-t-3xl px-2 pt-2 pb-4 
                 flex justify-around items-center md:hidden"
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all ${
              isActive ? "bg-white/20" : "hover:bg-white/10"
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
          </Link>
        );
      })}
    </nav>
  );
}
