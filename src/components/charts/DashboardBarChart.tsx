"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/src/lib/utils";

export interface BarSeries {
  dataKey: string;
  name: string;
  color?: string;
}

interface DashboardBarChartProps {
  data: Record<string, string | number>[];
  xAxisKey: string;
  series: BarSeries[];
  height?: number;
  className?: string;
}

export function DashboardBarChart({
  data,
  xAxisKey,
  series,
  height = 300,
  className,
}: DashboardBarChartProps) {
  const defaultColors = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            className="stroke-gray-200 dark:stroke-gray-800"
            vertical={false}
          />
          <XAxis
            dataKey={xAxisKey}
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dx={-8}
          />
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
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: "12px", fontSize: "12px" }}
          />

          {series.map((s, index) => {
            const color = s.color ?? defaultColors[index % defaultColors.length];
            return (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                fill={color}
                radius={[6, 6, 0, 0]}
                maxBarSize={40}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
