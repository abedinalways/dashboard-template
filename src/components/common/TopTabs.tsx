"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export type TabItem<T extends string = string> = {
  key: T;
  label: string;
  count?: number;
};

interface TopTabsProps<T extends string> {
  tabs: TabItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;
  variant?: "segmented" | "stepper" | "pills";
  className?: string;
}

export default function TopTabs<T extends string>({
  tabs,
  activeKey,
  onChange,
  variant = "segmented",
  className,
}: TopTabsProps<T>) {
  // 1. STEPPER VARIANT (Numbered Wizard / Progress)
  if (variant === "stepper") {
    const activeIndex = tabs.findIndex((t) => t.key === activeKey);

    return (
      <div className={cn("w-full", className)}>
        <div className="flex w-full items-center">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;
            const isCompleted = activeIndex >= 0 && index < activeIndex;
            const isLast = index === tabs.length - 1;

            return (
              <div key={tab.key} className="flex flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => onChange(tab.key)}
                  className="flex min-w-0 items-center gap-2 group cursor-pointer"
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200",
                      isActive
                        ? "bg-brand-600 text-white shadow-sm ring-4 ring-brand-100 dark:ring-brand-900/40"
                        : isCompleted
                        ? "bg-emerald-600 text-white"
                        : "border border-gray-300 dark:border-gray-700 text-gray-400 group-hover:border-gray-400"
                    )}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden sm:inline text-sm font-medium transition-colors",
                      isActive
                        ? "text-gray-900 dark:text-white font-semibold"
                        : isCompleted
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500"
                    )}
                  >
                    {tab.label}
                  </span>
                </button>

                {!isLast && (
                  <span
                    className={cn(
                      "mx-3 h-0.5 flex-1 transition-colors",
                      isCompleted ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-800"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. PILLS VARIANT (Filter Buttons)
  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-brand-600 text-white shadow-xs"
                  : "bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // 3. SEGMENTED VARIANT (Default Pill Container)
  return (
    <div
      className={cn(
        "flex w-full rounded-xl bg-gray-100 dark:bg-gray-800/80 p-1 border border-gray-200/80 dark:border-gray-700/60",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={cn(
              "flex-1 min-w-0 py-2 px-3 text-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer select-none",
              isActive
                ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs font-semibold"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <span className="truncate">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="ml-2 text-xs opacity-75 font-normal">
                ({tab.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
