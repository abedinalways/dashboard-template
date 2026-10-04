"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "glass";
}

export function Card({
  className,
  variant = "default",
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xs",
    elevated: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-md",
    outlined: "bg-transparent border border-gray-200 dark:border-gray-800",
    glass: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-800/60 shadow-xs",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-200 overflow-hidden",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-xs text-gray-500 dark:text-gray-400 mt-0.5", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 sm:p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 p-4 px-5 sm:px-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number; // 0 - 100
  badgeText?: string;
  badgeType?: "success" | "warning" | "danger" | "info";
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  progress,
  badgeText,
  badgeType = "success",
  icon,
  className,
}: MetricCardProps) {
  const badgeColors = {
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/40",
    info: "bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200 dark:border-brand-800/40",
  };

  return (
    <Card className={cn("p-5 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        {badgeText && (
          <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full border", badgeColors[badgeType])}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {value}
        </span>
        {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
      </div>

      {progress !== undefined && (
        <div className="space-y-1 pt-1">
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-600 dark:bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
          {subtitle && (
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>{subtitle}</span>
              <span>{progress}%</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
