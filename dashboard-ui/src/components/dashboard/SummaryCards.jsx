import { useStore } from "../../store/useStore";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function SummaryCards() {
  const { transactions, darkMode } = useStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card 
        title="Balance" 
        value={balance} 
        icon={<Wallet size={24} />}
        bgColor="from-blue-500 to-blue-600"
        darkMode={darkMode}
      />
      <Card 
        title="Income" 
        value={income} 
        icon={<TrendingUp size={24} />}
        bgColor="from-green-500 to-green-600"
        darkMode={darkMode}
      />
      <Card 
        title="Expenses" 
        value={expense} 
        icon={<TrendingDown size={24} />}
        bgColor="from-red-500 to-red-600"
        darkMode={darkMode}
      />
    </div>
  );
}

function Card({ title, value, icon, bgColor, darkMode }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br ${bgColor} text-white`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold opacity-90">{title}</h2>
        <div className="opacity-80">{icon}</div>
      </div>
      <p className="text-3xl font-bold">₹ {value.toLocaleString()}</p>
    </div>
  );
}