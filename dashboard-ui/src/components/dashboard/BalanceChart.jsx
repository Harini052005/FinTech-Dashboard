import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../store/useStore";
import MonthlyCalendar from "./MonthlyCalendar";

export default function BalanceChart() {
  const { darkMode, transactions } = useStore();

  // Bar chart data: Income vs Expenses
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const barData = [
    { name: "Income", amount: income, fill: "#10B981" },
    { name: "Expenses", amount: expense, fill: "#EF4444" },
  ];

  // Pie chart data: Spending breakdown by category
  const expenses = transactions.filter((t) => t.type === "expense");
  const categoryMap = {};

  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.entries(categoryMap).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Yearly tracking data
  const yearlyMap = {};
  
  transactions.forEach((t) => {
    const year = new Date(t.date).getFullYear().toString();
    
    if (!yearlyMap[year]) {
      yearlyMap[year] = { income: 0, expenses: 0 };
    }
    
    if (t.type === "income") {
      yearlyMap[year].income += t.amount;
    } else {
      yearlyMap[year].expenses += t.amount;
    }
  });

  const yearlyData = Object.keys(yearlyMap).sort().map((year) => ({
    year,
    Income: yearlyMap[year].income,
    Expenses: yearlyMap[year].expenses,
  }));

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#10B981",
    "#06B6D4",
    "#EF4444",
    "#6366F1",
  ];

  return (
    <div
      className={`p-6 rounded-lg shadow-lg transition-colors ${
        darkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <h2 className="text-xl font-bold mb-6">Financial Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart: Income vs Expenses */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis
                dataKey="name"
                stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              />
              <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                  border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                  color: darkMode ? "#FFFFFF" : "#000000",
                }}
                formatter={(value) => `₹ ${value.toLocaleString()}`}
              />
              <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Spending by Category */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: ₹${(value / 1000).toFixed(1)}k`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    color: darkMode ? "#FFFFFF" : "#000000",
                  }}
                  formatter={(value) => `₹ ${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 h-[300px] flex items-center justify-center">
              No expense data available
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Monthly Calendar & Yearly Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Calendar */}
        <MonthlyCalendar />

        {/* Yearly Tracking */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">📊 Yearly Tracking</h3>
          {yearlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearlyData}>
                <XAxis
                  dataKey="year"
                  stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                />
                <YAxis stroke={darkMode ? "#9CA3AF" : "#6B7280"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${darkMode ? "#374151" : "#E5E7EB"}`,
                    color: darkMode ? "#FFFFFF" : "#000000",
                  }}
                  formatter={(value) => `₹ ${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="Income" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expenses" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 h-[300px] flex items-center justify-center">
              No yearly data available
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Income</p>
          <p className="text-2xl font-bold text-green-600">₹ {income.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">₹ {expense.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Balance</p>
          <p className={`text-2xl font-bold ${income - expense >= 0 ? "text-green-600" : "text-red-600"}`}>
            ₹ {(income - expense).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}