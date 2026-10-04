"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  changePercentage?: number;
  period?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  changePercentage,
  period = "vs last month",
  icon,
  iconBgColor = "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400",
  className,
}: StatCardProps) {
  const isPositive = (changePercentage ?? 0) >= 0;

  return (
    <div
      className={cn(
        "p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <div className={cn("p-2.5 rounded-xl", iconBgColor)}>{icon}</div>
      </div>

      <div className="mt-4">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          {value}
        </h4>

        {changePercentage !== undefined && (
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center font-semibold",
                isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {Math.abs(changePercentage)}%
            </span>
            <span className="text-gray-400 dark:text-gray-500">{period}</span>
          </div>
        )}
      </div>
    </div>
  );
}
