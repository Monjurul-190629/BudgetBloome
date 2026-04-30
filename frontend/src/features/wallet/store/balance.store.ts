import { create } from "zustand";

interface BalanceState {
  totalBalance: number;
  totalExpense: number;

  setTotalBalance: (amount: number) => void;
  setTotalExpense: (amount: number) => void;

  resetBalance: () => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  totalBalance: 0,
  totalExpense: 0,

  setTotalBalance: (amount) =>
    set({
      totalBalance: amount,
    }),

  setTotalExpense: (amount) =>
    set({
      totalExpense: amount,
    }),

  resetBalance: () =>
    set({
      totalBalance: 0,
      totalExpense: 0,
    }),
}));