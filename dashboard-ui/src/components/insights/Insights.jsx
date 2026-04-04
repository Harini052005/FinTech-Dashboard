import { useStore } from "../../store/useStore";
import { TrendingDown, Tag, Lightbulb } from "lucide-react";

export default function Insights() {
  const { transactions, darkMode } = useStore();

  // 💸 Total expenses
  const expenses = transactions.filter((t) => t.type === "expense");

  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  // 🏆 Highest spending category
  const categoryMap = {};

  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  let highestCategory = "N/A";

  if (Object.keys(categoryMap).length > 0) {
    highestCategory = Object.keys(categoryMap).reduce(
      (a, b) => (categoryMap[a] > categoryMap[b] ? a : b)
    );
  }

  // 📈 Monthly comparison (simple)
  const currentMonth = new Date().getMonth();

  const thisMonth = expenses.filter(
    (t) => new Date(t.date).getMonth() === currentMonth
  );

  const lastMonth = expenses.filter(
    (t) => new Date(t.date).getMonth() === currentMonth - 1
  );

  const thisMonthTotal = thisMonth.reduce((a, b) => a + b.amount, 0);
  const lastMonthTotal = lastMonth.reduce((a, b) => a + b.amount, 0);

  let insightMessage = "Good job managing your expenses 👍";

  if (thisMonthTotal > lastMonthTotal) {
    insightMessage = "⚠️ You spent more than last month";
  }

  return (
    <div className="p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card
        title="Total Expenses"
        value={`₹ ${totalExpense.toLocaleString()}`}
        icon={<TrendingDown size={24} />}
        color="from-orange-500 to-orange-600"
        darkMode={darkMode}
      />

      <Card
        title="Top Category"
        value={highestCategory || "N/A"}
        icon={<Tag size={24} />}
        color="from-purple-500 to-purple-600"
        darkMode={darkMode}
      />

      <Card
        title="Monthly Insight"
        value={insightMessage}
        icon={<Lightbulb size={24} />}
        color="from-yellow-500 to-yellow-600"
        darkMode={darkMode}
      />
    </div>
  );
}

function Card({ title, value, icon, color, darkMode }) {
  return (
    <div
      className={`p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:brightness-110 transition-all duration-300 ease-out cursor-pointer transform bg-gradient-to-br ${color} text-white`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base sm:text-lg font-semibold opacity-90">{title}</h3>
        <div className="opacity-80">{icon}</div>
      </div>
      <p className="text-xl sm:text-2xl font-bold">{value}</p>
    </div>
  );
}