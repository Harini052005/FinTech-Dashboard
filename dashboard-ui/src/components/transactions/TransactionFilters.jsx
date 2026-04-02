import { useStore } from "../../store/useStore";
import { Search, Filter } from "lucide-react";

export default function TransactionFilters() {
  const {
    search,
    setSearch,
    filterType,
    setFilterType,
    sortBy,
    setSortBy,
    darkMode,
  } = useStore();

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 p-6 rounded-lg shadow-md transition-colors ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      {/* 🔍 Search */}
      <div className="flex items-center flex-1">
        <Search size={18} className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border p-2 rounded-lg w-full transition ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
        />
      </div>

      {/* 🎯 Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className={`border p-2 rounded-lg transition ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      >
        <option value="all">All Transactions</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* 📅 Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`border p-2 rounded-lg transition ${
          darkMode
            ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  );
}