import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "../../store/useStore";

export default function MonthlyCalendar() {
  const { darkMode, transactions } = useStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  // Get first day of month and number of days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Create transaction map for quick lookup
  const transactionMap = {};
  transactions.forEach((t) => {
    const txDate = t.date; // Format: YYYY-MM-DD
    if (!transactionMap[txDate]) {
      transactionMap[txDate] = { count: 0, income: 0, expense: 0 };
    }
    transactionMap[txDate].count += 1;
    if (t.type === "income") {
      transactionMap[txDate].income += t.amount;
    } else {
      transactionMap[txDate].expense += t.amount;
    }
  });

  // Calculate stats for current month
  let monthlyTransactions = 0;
  let monthlyIncome = 0;
  let monthlyExpense = 0;

  Object.keys(transactionMap).forEach((dateStr) => {
    const [txYear, txMonth, txDay] = dateStr.split("-").map(Number);
    if (txYear === year && txMonth === month + 1) {
      monthlyTransactions += transactionMap[dateStr].count;
      monthlyIncome += transactionMap[dateStr].income;
      monthlyExpense += transactionMap[dateStr].expense;
    }
  });

  // Navigate months
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  // Build calendar grid
  const calendarDays = [];

  // Previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      date: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    });
  }

  // Next month's days
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
    });
  }

  return (
    <div
      className={`p-3 md:p-4 lg:p-5 rounded-xl shadow-xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-800/40 backdrop-blur-xl border border-gray-700/30 hover:bg-gray-800/50 hover:border-gray-600/40"
          : "bg-white border border-gray-200 hover:shadow-2xl"
      }`}
    >
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div>
          <h2 className="text-base md:text-lg lg:text-xl font-bold">Overview</h2>
          <p className={`text-xs md:text-sm transition-colors ${darkMode ? "text-gray-400/80" : "text-gray-500"}`}>
            {monthNames[month]} {year}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={handlePrevMonth}
            className={`p-1 md:p-2 rounded-lg transition-all duration-200 transform hover:scale-110 ${
              darkMode
                ? "bg-gray-700/50 hover:bg-gray-600/70 text-white/80 hover:text-white backdrop-blur-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className={`p-1 md:p-2 rounded-lg transition-all duration-200 transform hover:scale-110 ${
              darkMode
                ? "bg-gray-700/50 hover:bg-gray-600/70 text-white/80 hover:text-white backdrop-blur-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"
            }`}
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
        <div className={`text-center p-2 md:p-3 rounded-lg transition-all duration-200 ${
          darkMode
            ? "bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm border border-blue-500/20"
            : "bg-blue-50 hover:bg-blue-100/50"
        }`}>
          <p className={`text-xs transition-colors ${darkMode ? "text-blue-400/70" : "text-blue-600"}`}>
            Transaction
          </p>
          <p className="text-lg md:text-xl font-bold text-blue-500 animate-pulse">
            {monthlyTransactions}
          </p>
        </div>
        <div className={`text-center p-2 md:p-3 rounded-lg transition-all duration-200 ${
          darkMode
            ? "bg-green-500/10 hover:bg-green-500/20 backdrop-blur-sm border border-green-500/20"
            : "bg-green-50 hover:bg-green-100/50"
        }`}>
          <p className={`text-xs transition-colors ${darkMode ? "text-green-400/70" : "text-green-600"}`}>
            Income
          </p>
          <p className="text-lg md:text-xl font-bold text-green-500">
            {monthlyIncome}
          </p>
        </div>
        <div className={`text-center p-2 md:p-3 rounded-lg transition-all duration-200 ${
          darkMode
            ? "bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm border border-red-500/20"
            : "bg-red-50 hover:bg-red-100/50"
        }`}>
          <p className={`text-xs transition-colors ${darkMode ? "text-red-400/70" : "text-red-600"}`}>
            Outcome
          </p>
          <p className="text-lg md:text-xl font-bold text-red-500">
            {monthlyExpense}
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border-t border-gray-300/30 dark:border-gray-600/30 pt-2 md:pt-3">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1 md:mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs md:text-sm font-semibold py-1 md:py-2 text-gray-600 dark:text-gray-400/70">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-1">
          {calendarDays.map((item, index) => {
            const hasTransaction =
              item.isCurrentMonth && transactionMap[item.date];
            const txStats = hasTransaction
              ? transactionMap[item.date]
              : null;

            return (
              <div
                key={index}
                className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xs md:text-sm transition-all duration-200 transform cursor-pointer ${
                  !item.isCurrentMonth
                    ? darkMode
                      ? "bg-gray-700/20 text-gray-600/50 opacity-50"
                      : "bg-gray-100/50 text-gray-400 opacity-60"
                    : hasTransaction
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold shadow-lg md:shadow-xl hover:shadow-orange-500/50 hover:scale-110 dark:shadow-orange-500/30"
                    : darkMode
                    ? "bg-gray-700/30 hover:bg-gray-600/50 text-white/70 hover:text-white backdrop-blur-sm border border-gray-600/30 hover:border-gray-500/50 hover:scale-105"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900 hover:shadow-md hover:scale-105"
                }`}
                title={
                  hasTransaction
                    ? `${txStats.count} transaction${txStats.count > 1 ? "s" : ""}`
                    : ""
                }
              >
                <div className="w-full text-center leading-none">
                  <div>{item.day}</div>
                  {hasTransaction && (
                    <div className="text-xs md:text-xs leading-none">
                      {txStats.count}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 md:mt-4 flex flex-col md:flex-row gap-2 md:gap-4 justify-center text-xs md:text-sm">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          darkMode
            ? "bg-orange-500/10 hover:bg-orange-500/20 backdrop-blur-sm border border-orange-500/20"
            : "bg-orange-50 hover:bg-orange-100/50"
        }`}>
          <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-gradient-to-br from-orange-500 to-orange-600"></div>
          <span className={darkMode ? "text-orange-400/80" : "text-orange-600"}>Has Transaction</span>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          darkMode
            ? "bg-gray-700/30 hover:bg-gray-600/40 backdrop-blur-sm border border-gray-600/30"
            : "bg-gray-100 hover:bg-gray-200"
        }`}>
          <div
            className={`w-3 h-3 md:w-4 md:h-4 rounded ${
              darkMode ? "bg-gray-600/50" : "bg-gray-300"
            }`}
          ></div>
          <span className={darkMode ? "text-gray-400/80" : "text-gray-600"}>No Transaction</span>
        </div>
      </div>
    </div>
  );
}
