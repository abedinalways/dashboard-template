"use client";

import React from "react";
import { useSidebar } from "@/src/context/SidebarContext";
import { useTheme } from "@/src/context/ThemeContext";
import { useAuth } from "@/src/hooks/useAuth";
import { Menu, Moon, Sun, Bell, Search } from "lucide-react";

export function AppHeader() {
  const { openMobileSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { user, role } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800">
      {/* Left Area: Mobile Menu + Search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="w-64 h-9 pl-9 pr-3 text-xs bg-gray-100 dark:bg-gray-800/60 border border-transparent rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 transition-colors"
          />
        </div>
      </div>

      {/* Right Area: Actions */}
      <div className="flex items-center gap-2.5">
        {/* Role Badge */}
        {role && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800/60">
            {role}
          </span>
        )}

        {/* Notifications Icon */}
        <button
          type="button"
          className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors cursor-pointer"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center pl-2 ml-1 border-l border-gray-200 dark:border-gray-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white font-semibold text-xs shadow-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>
      </div>
    </header>
  );
}
