"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/src/lib/utils";

export interface LineSeries {
  dataKey: string;
  name: string;
  color?: string;
  gradientId?: string;
}

interface DashboardLineChartProps {
  data: Record<string, string | number>[];
  xAxisKey: string;
  series: LineSeries[];
  height?: number;
  className?: string;
  showGrid?: boolean;
}

export function DashboardLineChart({
  data,
  xAxisKey,
  series,
  height = 300,
  className,
  showGrid = true,
}: DashboardLineChartProps) {
  const defaultColors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b"];

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {series.map((s, index) => {
              const color = s.color ?? defaultColors[index % defaultColors.length];
              const gradId = s.gradientId ?? `area-grad-${index}`;
              return (
                <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                </linearGradient>
              );
            })}
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="stroke-gray-200 dark:stroke-gray-800"
              vertical={false}
            />
          )}

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
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
            }}
            labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
          />

          {series.map((s, index) => {
            const color = s.color ?? defaultColors[index % defaultColors.length];
            const gradId = s.gradientId ?? `area-grad-${index}`;

            return (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${gradId})`}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
