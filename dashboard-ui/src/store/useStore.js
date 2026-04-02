import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      role: "viewer",
      darkMode: false,

      transactions: [
        {
          id: 1,
          date: "2026-04-01",
          amount: 5000,
          category: "Salary",
          type: "income",
        },
        {
          id: 2,
          date: "2026-04-02",
          amount: 1200,
          category: "Food",
          type: "expense",
        },
      ],

      search: "",
      filterType: "all",
      sortBy: "date",

      setSearch: (value) => set({ search: value }),
      setFilterType: (type) => set({ filterType: type }),
      setSortBy: (sort) => set({ sortBy: sort }),

      setRole: (role) => set({ role }),

      setDarkMode: (mode) => set({ darkMode: mode }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...tx, id: Date.now() },
          ],
        })),

      updateTransaction: (id, updatedTx) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTx } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "finance-storage", 
    }
  )
);

