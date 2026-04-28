"use client";

import { Bell, Sun, Moon, Search } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="5" stroke="white" strokeWidth="1.5" />
              <path
                d="M8 5v3l2 1.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[16px] font-semibold text-gray-900 dark:text-white">
            BudgetBloome
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-3 py-2 w-72">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions…"
            className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 w-full"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {dark ? (
            <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-medium cursor-pointer">
          JD
        </div>
      </div>
    </header>
  );
}
