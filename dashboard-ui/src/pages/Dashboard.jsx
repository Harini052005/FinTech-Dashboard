import Navbar from "../components/layout/Navbar";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilters";
import Insights from "../components/insights/Insights";
import { useStore } from "../store/useStore";

export default function Dashboard() {
  const { darkMode } = useStore();

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <SummaryCards />
        <div className="p-6">
          <BalanceChart />
        </div>
        <Insights />
        <div className="p-6">
          <TransactionFilters />
        </div>
        <TransactionTable />
      </div>
    </div>
  );
}