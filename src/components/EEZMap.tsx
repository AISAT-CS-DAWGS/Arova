"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

export default function EEZMap() {
  const [geoData, setGeoData] = useState(null);
  
  // 1. Add a mounted state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 2. Set mounted to true immediately on the client
    setIsMounted(true);

    fetch("/data/eez.json")
      .then((res) => {
        if (!res.ok) throw new Error("File not found! Check public folder path.");
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading EEZ data:", err));
  }, []);

  // 3. HYDRATION FIX: Return a placeholder div that perfectly matches the map container's classes
  if (!isMounted) {
    return (
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg relative z-0 bg-[#03045E]" />
    );
  }

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg relative z-0">
      
      <style>{`
        .dark-map-tiles {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
      `}</style>

      <MapContainer
        center={[9.9312, 76.2673]}
        zoom={4}
        style={{ height: "100%", width: "100%", background: "#03045E" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="dark-map-tiles"
        />
        
        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              color: "#00F5D4", // Bright Cyan border
              weight: 2,
              fillColor: "#0077B6", // Deep blue fill
              fillOpacity: 0.3,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}