"use client";

import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      enqueueSnackbar("Тема изменена на темную", { variant: "success" });
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      enqueueSnackbar("Тема изменена на светлую", { variant: "success" });
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={toggleTheme}
        className={`relative h-8 w-14 rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span 
          className={`absolute top-1 left-1 h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isDarkMode ? "translate-x-6" : "translate-x-0"
          }`} 
        />
      </button>
      <span className="text-sm font-medium text-gray-800 dark:text-white">
        Ночная тема
      </span>
    </div>
  );
} 