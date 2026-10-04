"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { DashboardMapProps, MapMarkerData } from "./DashboardMapInner";
import { MapPin } from "lucide-react";

export type { DashboardMapProps, MapMarkerData };

const MapComponent = dynamic(() => import("./DashboardMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-[360px] bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 animate-pulse text-gray-400">
      <MapPin className="w-8 h-8 mb-2 opacity-50" />
      <span className="text-xs font-medium">Loading interactive map...</span>
    </div>
  ),
});

export function DashboardMap(props: DashboardMapProps) {
  return <MapComponent {...props} />;
}
