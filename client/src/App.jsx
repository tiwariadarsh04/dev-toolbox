import { useState, useEffect } from "react";
import JsonFormatter from "./components/JsonFormatter";
import Base64Tool from "./components/Base64Tool";

export default function App() {
  const [activeTab, setActiveTab] = useState("json");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white p-6 transition-all">
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("json")}
            className={`px-4 py-2 rounded ${activeTab === "json" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800 border"}`}
          >
            JSON Formatter
          </button>
          <button
            onClick={() => setActiveTab("base64")}
            className={`px-4 py-2 rounded ${activeTab === "base64" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-800 border"}`}
          >
            Base64 Encoder/Decoder
          </button>
        </div>

        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-yellow-400 text-black dark:bg-blue-700 dark:text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {activeTab === "json" ? <JsonFormatter /> : <Base64Tool />}
    </div>
  );
}
