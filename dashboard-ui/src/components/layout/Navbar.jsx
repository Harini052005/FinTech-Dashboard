import { useStore } from "../../store/useStore";
import { Moon, Sun, User, Settings } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-3 sm:px-6 py-3 sm:py-4 shadow-md transition-colors ${
        darkMode
          ? "bg-gray-900 text-white border-b border-gray-700"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent truncate">
          Finance Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto relative">
        {/* Role Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-all duration-200 flex items-center gap-2 justify-between sm:justify-start hover:shadow-md ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                : "bg-gray-50 border-gray-300 text-gray-900 hover:bg-gray-100"
            }`}
          >
            {role === "viewer" ? (
              <>
                <User size={18} className={darkMode ? "text-white" : "text-gray-900"} />
                <span>User</span>
              </>
            ) : (
              <>
                <Settings size={18} className={darkMode ? "text-white" : "text-gray-900"} />
                <span>Admin</span>
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className={`absolute top-full left-0 mt-2 w-full sm:w-40 rounded-lg shadow-xl border z-50 transition-all duration-200 ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => {
                  setRole("viewer");
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-t-lg flex items-center gap-2 transition-colors ${
                  role === "viewer"
                    ? darkMode
                      ? "bg-blue-600/20 text-blue-300"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-50 text-gray-900"
                }`}
              >
                <User size={18} className={darkMode ? "text-white" : "text-gray-900"} />
                <span>User</span>
              </button>
              <div className={`h-px ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}></div>
              <button
                onClick={() => {
                  setRole("admin");
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-b-lg flex items-center gap-2 transition-colors ${
                  role === "admin"
                    ? darkMode
                      ? "bg-blue-600/20 text-blue-300"
                      : "bg-blue-50 text-blue-600"
                    : darkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-50 text-gray-900"
                }`}
              >
                <Settings size={18} className={darkMode ? "text-white" : "text-gray-900"} />
                <span>Admin</span>
              </button>
            </div>
          )}
        </div>

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