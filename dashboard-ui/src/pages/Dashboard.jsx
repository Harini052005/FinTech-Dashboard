import Navbar from "../components/layout/Navbar";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilters";
import Insights from "../components/insights/Insights";
import { useStore } from "../store/useStore";
import { useState } from "react";

export default function Dashboard() {
  const { darkMode } = useStore();
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <SummaryCards />
        <div className="p-2 sm:p-4 md:p-6">
          <BalanceChart />
        </div>
        <Insights />
        <div className="p-2 sm:p-4 md:p-6">
          <TransactionFilters />
        </div>
        <TransactionTable 
          limit={showAllTransactions ? null : 10}
          onShowAllClick={() => setShowAllTransactions(true)}
          onShowLessClick={() => setShowAllTransactions(false)}
          showAllTransactions={showAllTransactions}
        />
      </div>
    </div>
  );
}