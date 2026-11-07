"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import ShapedModal from "@/components/common-ui/modal/ShapedModal";
import { Button } from "@/components/ui/button";
import { Plus, Printer } from "lucide-react";
import CreateTransaction from "./CreateTransaction";
import useFetchData from "@/hooks/useFetchData";
import { getTransactionHistory } from "../api/transaction.api";
import SkeletonTransactionHistoryTable from "../skeleton/SkeletonTransactionHistoryTable";

export default function TransactionHistoryTable() {
  const printRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  const { data: transactionsData, isLoading } = useFetchData(
    ["getTransactionHistory", page],
    () => getTransactionHistory({ page, limit: 10 }),
  );

  const transactions = transactionsData?.data?.data?.data ?? [];
  const meta = transactionsData?.data?.data?.meta;

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "BudgetBloom Transaction History",
  });

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl bg-black p-4 text-white">
        <SkeletonTransactionHistoryTable />
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-black p-4 text-white">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-sm text-gray-400">Manage your income & expenses</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handlePrint}
            className="
            group relative overflow-hidden rounded-full
            border border-green-500/30
            bg-gradient-to-r from-green-500 to-emerald-600
            px-5 py-2.5
            font-medium text-white
            shadow-lg shadow-green-500/20
            transition-all duration-300
            hover:scale-[1.03]
          hover:from-green-400
          hover:to-emerald-500
           hover:shadow-green-500/40
           active:scale-95"
          >
            <span
              className="
              absolute inset-0
            bg-white/10 opacity-0
              transition-opacity duration-300
              group-hover:opacity-100"
            />

            <Printer className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />

            <span className="relative z-10">Export PDF</span>
          </Button>

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
      </div>

      <div
        ref={printRef}
        className={`overflow-x-auto scroll-smooth print-area`}
      >
        <table className="w-full min-w-[750px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-gray-400">
              <th className="px-4">Category</th>
              <th className="px-4">Date</th>
              <th className="px-4">Description</th>
              <th className="px-4">Amount</th>
              <th className="px-4">Wallet</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr
                  key={t._id}
                  className="rounded-xl bg-[#111111] transition hover:bg-[#1a1a1a]"
                >
                  <td className="rounded-l-xl px-4 py-4 font-medium">
                    {t.category_name}
                  </td>

                  <td className="px-4 py-4 text-gray-300">
                    {new Date(t.created_date).toLocaleDateString()}
                  </td>

                  <td className="max-w-[250px] truncate px-4 py-4 text-gray-400">
                    {t.description || "-"}
                  </td>

                  <td
                    className={`px-4 py-4 font-semibold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ৳{t.amount}
                  </td>

                  <td className="rounded-r-xl px-4 py-4 text-gray-300">
                    {t.wallet?.wallet_name || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            Page {meta.page} of {meta.totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border-gray-700 bg-[#111111] text-white hover:bg-[#1a1a1a]"
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="border-gray-700 bg-[#111111] text-white hover:bg-[#1a1a1a]"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
