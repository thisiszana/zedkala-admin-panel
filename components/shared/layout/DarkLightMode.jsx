"use client"

import { useDarkMode } from "@/providers/DarkModeProvider";
import { FiSun, FiMoon } from "react-icons/fi"

export default function DarkLightMode() {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-yellow-300 dark:bg-gray-900 transition"
    >
      {isDarkMode ? <FiMoon /> : <FiSun />}
    </button>
  );
}
