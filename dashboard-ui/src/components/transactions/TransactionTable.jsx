import { useStore } from "../../store/useStore";
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";
import { Edit2, Plus, Trash2 } from "lucide-react";

export default function TransactionTable() {
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>

      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="mb-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-md"
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
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <th className="p-4 text-left font-semibold">Date</th>
              <th className="p-4 text-left font-semibold">Amount</th>
              <th className="p-4 text-left font-semibold">Category</th>
              <th className="p-4 text-left font-semibold">Type</th>
              {role === "admin" && <th className="p-4 text-left font-semibold">Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className={`p-8 text-center ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b transition-colors ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="p-4">{t.date}</td>

                  <td
                    className={`p-4 font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    ₹ {t.amount.toLocaleString()}
                  </td>

                  <td className="p-4">{t.category}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        t.type === "income"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(t);
                          setEditOpen(true);
                        }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-500 text-white"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-600"
                        }`}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this transaction?")) {
                            deleteTransaction(t.id);
                          }
                        }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${
                          darkMode
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : "bg-red-100 hover:bg-red-200 text-red-600"
                        }`}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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