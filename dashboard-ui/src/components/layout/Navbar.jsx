import { useStore } from "../../store/useStore";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();

  return (
    <div
      className={`flex justify-between items-center px-6 py-4 shadow-md transition-colors ${
        darkMode
          ? "bg-gray-900 text-white border-b border-gray-700"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          💰 Finance Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`px-3 py-2 rounded-lg border transition-colors ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
          }`}
        >
          <option value="viewer">👁️ Viewer</option>
          <option value="admin">⚙️ Admin</option>
        </select>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}