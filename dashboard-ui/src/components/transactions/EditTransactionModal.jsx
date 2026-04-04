import { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { X } from "lucide-react";

export default function EditTransactionModal({ isOpen, onClose, transaction }) {
  const { updateTransaction, darkMode } = useStore();
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });
  const [isCustom, setIsCustom] = useState(false);

  const commonCategories = ["Food", "Hospital", "Trips", "Entertainment", "Shopping"];

  useEffect(() => {
    if (isOpen && transaction) {
      setForm({
        date: transaction.date,
        amount: transaction.amount,
        category: transaction.category,
        type: transaction.type,
      });
      
      // If the category is not in common categories, mark as custom
      if (!commonCategories.includes(transaction.category)) {
        setIsCustom(true);
      } else {
        setIsCustom(false);
      }
    }
  }, [isOpen, transaction]);

  if (!isOpen) return null;

  const handleCategoryChange = (value) => {
    if (value === "Other") {
      setIsCustom(true);
      setForm({ ...form, category: "" });
    } else {
      setIsCustom(false);
      setForm({ ...form, category: value });
    }
  };

  const handleCustomCategoryChange = (value) => {
    setForm({ ...form, category: value });
  };

  const handleSubmit = () => {
    if (!form.date || !form.amount || !form.category) {
      alert("Please fill all fields");
      return;
    }

    if (form.amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    updateTransaction(transaction.id, {
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition duration-300 z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`p-4 sm:p-6 rounded-lg w-full sm:w-[90%] md:w-[450px] shadow-2xl transition-colors ${
          darkMode
            ? "bg-gray-800 text-white border border-gray-700"
            : "bg-white text-gray-900"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Edit Transaction</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded transition hover:scale-110 ${
              darkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="date"
            className={`border p-2 sm:p-3 w-full rounded-lg transition hover:shadow-md focus:shadow-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="number"
            placeholder="Amount"
            className={`border p-2 sm:p-3 w-full rounded-lg transition hover:shadow-md focus:shadow-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <select
            className={`border p-2 sm:p-3 w-full rounded-lg transition hover:shadow-md focus:shadow-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            value={isCustom ? "Other" : form.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Select Category</option>
            {commonCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>

          {isCustom && (
            <input
              type="text"
              placeholder="Enter custom category"
              className={`border p-2 sm:p-3 w-full rounded-lg transition hover:shadow-md focus:shadow-lg ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              value={form.category}
              onChange={(e) => handleCustomCategoryChange(e.target.value)}
            />
          )}

          <select
            className={`border p-2 sm:p-3 w-full rounded-lg transition hover:shadow-md focus:shadow-lg ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className={`px-3 sm:px-4 py-2 rounded-lg transition hover:shadow-md transform hover:scale-105 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
