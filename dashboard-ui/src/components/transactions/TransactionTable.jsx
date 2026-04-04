import { useStore } from "../../store/useStore";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";
import { Edit2, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function TransactionTable({ 
  limit = 10, 
  onShowAllClick, 
  onShowLessClick, 
  showAllTransactions = false 
}) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const { transactions, role, search, filterType, sortBy, darkMode, deleteTransaction } = useStore();

  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  filtered.sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    return new Date(b.date) - new Date(a.date);
  });

  // Apply limit if specified and not showing all
  const displayedTransactions = limit && !showAllTransactions ? filtered.slice(0, limit) : filtered;
  const hasMore = limit && filtered.length > limit && !showAllTransactions;

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
        {showAllTransactions ? "All Transactions" : "Recent Transactions"}
      </h2>

      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center gap-2 shadow-md"
        >
          <Plus size={18} /> Add Transaction
        </button>
      )}

      <div
        className={`overflow-x-auto rounded-lg shadow-lg transition-colors ${
          darkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <table className="w-full text-sm sm:text-base">
          <thead>
            <tr
              className={`border-b ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <th className="p-2 sm:p-4 text-left font-semibold">Date</th>
              <th className="p-2 sm:p-4 text-left font-semibold">Amount</th>
              <th className="p-2 sm:p-4 text-left font-semibold">Category</th>
              <th className="p-2 sm:p-4 text-left font-semibold">Type</th>
              {role === "admin" && <th className="p-2 sm:p-4 text-left font-semibold">Action</th>}
            </tr>
          </thead>

          <tbody>
            {displayedTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className={`p-4 sm:p-8 text-center text-sm sm:text-base ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              displayedTransactions.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b transition-all duration-200 hover:shadow-md ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-2 sm:p-4">{t.date}</td>

                  <td
                    className={`p-2 sm:p-4 font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ₹ {t.amount.toLocaleString()}
                  </td>

                  <td className="p-2 sm:p-4">{t.category}</td>

                  <td className="p-2 sm:p-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${
                        t.type === "income"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td className="p-2 sm:p-4">
                      <div className="flex gap-1 sm:gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setSelectedTransaction(t);
                            setEditOpen(true);
                          }}
                          className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-all duration-200 hover:shadow-md ${
                            darkMode
                              ? "bg-blue-600 hover:bg-blue-500 text-white"
                              : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                          }`}
                        >
                          <Edit2 size={14} /> <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this transaction?")) {
                              deleteTransaction(t.id);
                            }
                          }}
                          className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm transition-all duration-200 hover:shadow-md ${
                            darkMode
                              ? "bg-red-600 hover:bg-red-500 text-white"
                              : "bg-red-100 hover:bg-red-200 text-red-600"
                          }`}
                        >
                          <Trash2 size={14} /> <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* See All / Show Less Button */}
      {hasMore && onShowAllClick && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={onShowAllClick}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-lg transform hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border border-purple-500/30"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border border-purple-300/50"
            }`}
          >
            <ChevronDown size={18} />
            See All Transactions ({filtered.length})
          </button>
        </div>
      )}

      {showAllTransactions && onShowLessClick && (
        <div className="flex justify-center mt-4 sm:mt-6">
          <button
            onClick={onShowLessClick}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 hover:shadow-lg transform hover:scale-105 ${
              darkMode
                ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border border-orange-500/30"
                : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border border-orange-300/50"
            }`}
          >
            <ChevronUp size={18} />
            Show Less
          </button>
        </div>
      )}

      <AddTransactionModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <EditTransactionModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}