"use client";

import { Bell, Sun, Moon, Search, User2 } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full flex items-center justify-between md:px-6 py-2">
      <div className="flex items-center gap-3 md:gap-6">
        <div className="w-10 h-10 md:w-[54px] md:h-[54px] bg-green-600 text-white rounded-full text-[16px] md:text-[22px] flex items-center justify-center font-bold">
          B
        </div>
        <div className="flex items-center gap-2 border-[1px] border-gray-100 dark:border-gray-700 rounded-full px-3 py-2 w-40 md:w-72">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Search transactions"
            className="bg-transparent outline-none text-sm placeholder:text-gray-400 w-full"
          />
        </div>
      </div>

      <div className="flex items-center md:gap-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-lg transition"
        >
          {dark ? (
            <Sun className="w-5 h-5 fill-none text-yellow-500" />
          ) : (
            <Sun className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          )}
        </button>
        <button className="relative w-10 h-10 flex items-center justify-center rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-1 h-1 bg-red-500 rounded-full" />
        </button>
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-medium cursor-pointer">
          <User2 className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
