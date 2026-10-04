"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/src/lib/utils";

export interface PieDataPoint {
  name: string;
  value: number;
  color?: string;
}

interface DashboardPieChartProps {
  data: PieDataPoint[];
  height?: number;
  innerRadius?: number; // >0 creates a donut chart
  outerRadius?: number;
  className?: string;
  centerText?: string;
  centerSubtext?: string;
}

export function DashboardPieChart({
  data,
  height = 280,
  innerRadius = 60,
  outerRadius = 90,
  className,
  centerText,
  centerSubtext,
}: DashboardPieChartProps) {
  const defaultPalette = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      {/* Center Label for Donut Charts */}
      {innerRadius > 0 && centerText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
          <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {centerText}
          </span>
          {centerSubtext && (
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              {centerSubtext}
            </span>
          )}
        </div>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color ?? defaultPalette[index % defaultPalette.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
