"use client";

import { useWatch, type Control } from "react-hook-form";
import { REGISTRATION } from "../types/auth.types";

const rules = [
  { label: "8+ characters", test: (value: string) => value.length >= 8 },
  { label: "Uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Number", test: (value: string) => /[0-9]/.test(value) },
  {
    label: "Symbol",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

const levels = [
  { label: "", bar: "", text: "" },
  { label: "Weak", bar: "bg-red-500", text: "text-red-500" },
  { label: "Fair", bar: "bg-amber-500", text: "text-amber-600" },
  { label: "Good", bar: "bg-lime-500", text: "text-lime-600" },
  { label: "Strong", bar: "bg-emerald-500", text: "text-emerald-600" },
];

const PasswordStrength = ({ control }: { control: Control<REGISTRATION> }) => {
  const password = useWatch({ control, name: "password" }) || "";
  const passed = rules.filter((rule) => rule.test(password)).length;
  const level = levels[passed];

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {rules.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              index < passed ? level.bar : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="text-gray-400">
          Use 8+ characters with a number, symbol & uppercase letter
        </span>
        {password && (
          <span className={`shrink-0 font-semibold ${level.text}`}>
            {level.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
