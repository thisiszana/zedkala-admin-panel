"use client";

import { useDarkMode } from "@/providers/DarkModeProvider";

export default function Loaderbar() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="h-[50vh] w-full flex items-center justify-center">
      <span className={`loader ${isDarkMode && "dark"}`}></span>
    </div>
  );
}
