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
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
      className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br ${color} text-white`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold opacity-90">{title}</h3>
        <div className="opacity-80">{icon}</div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}