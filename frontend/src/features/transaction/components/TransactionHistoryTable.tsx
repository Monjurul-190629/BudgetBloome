"use client";

import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTransaction from "./CreateTransaction";

const transactions = [
  {
    id: 1,
    category_name: "Food",
    date: "2026-05-01",
    description: "Lunch with friends",
    amount: 250,
    wallet: "Cash",
    type: "expense",
  },
  {
    id: 2,
    category_name: "Salary",
    date: "2026-05-01",
    description: "Monthly salary",
    amount: 30000,
    wallet: "Bank",
    type: "income",
  },
];

export default function TransactionHistoryTable() {
  return (
    <div className="w-full rounded-2xl bg-black p-4 text-white">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-sm text-gray-400">Manage your income & expenses</p>
        </div>

        <ShapedModal
          trigger={
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
            </Button>
          }
          title="Add New Transaction"
          description="Create a new transaction"
          isPermitted={true}
        >
          <CreateTransaction />
        </ShapedModal>
      </div>

      <div className="overflow-x-auto scroll-smooth">
        <table className="w-full min-w-[750px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="px-4">Category</th>
              <th className="px-4">Date</th>
              <th className="px-4">Description</th>
              <th className="px-4">Amount</th>
              <th className="px-4">Wallet</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="bg-[#111111] hover:bg-[#1a1a1a] transition rounded-xl"
              >
                <td className="px-4 py-4 font-medium rounded-l-xl">
                  {t.category_name}
                </td>

                <td className="px-4 py-4 text-gray-300">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-4 text-gray-400 max-w-[250px] truncate">
                  {t.description}
                </td>

                <td
                  className={`px-4 py-4 font-semibold ${
                    t.type === "income" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  ৳{t.amount}
                </td>

                <td className="px-4 py-4 text-gray-300 rounded-r-xl">
                  {t.wallet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
