"use client";

import { Bell, Sun, Moon, Search, User } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-3 shadow">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">BudgetBloome</h1>

        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Bell className="w-5 h-5 cursor-pointer" />

        {/* Theme Toggle */}
        <button onClick={() => setDark(!dark)}>
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User */}
        <User className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}
