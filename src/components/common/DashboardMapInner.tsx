"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/src/lib/utils";

export interface MapMarkerData {
  id: string | number;
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
  badge?: string;
}

export interface DashboardMapProps {
  markers?: MapMarkerData[];
  center?: [number, number];
  zoom?: number;
  height?: number | string;
  className?: string;
}

export default function DashboardMapInner({
  markers = [],
  center = [23.8103, 90.4125], // Default Dhaka / Central
  zoom = 12,
  height = 360,
  className,
}: DashboardMapProps) {
  useEffect(() => {
    // Fix leaflet marker icon URLs in Next.js bundlers
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div
      className={cn(
        "w-full rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xs relative z-0",
        className
      )}
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              <div className="p-1 space-y-1 text-gray-900 font-sans">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-xs">{m.title}</h5>
                  {m.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded">
                      {m.badge}
                    </span>
                  )}
                </div>
                {m.subtitle && <p className="text-[11px] text-gray-500">{m.subtitle}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
