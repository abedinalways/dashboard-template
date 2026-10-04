"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  hasDot?: boolean;
}

export function Badge({
  children,
  variant = "brand",
  size = "md",
  hasDot = false,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    brand: "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200/80 dark:border-brand-800/60",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60",
    info: "bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60",
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  };

  const dotColors = {
    brand: "bg-brand-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-rose-500",
    info: "bg-sky-500",
    neutral: "bg-gray-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-0.5 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {hasDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
