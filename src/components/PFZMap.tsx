"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });

// Simulated PFZ Data off the coast of Kochi
const mockPfzData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "High Probability Catch Zone",
        type: "PFZ",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.7, 9.8],   // [Longitude, Latitude]
            [76.0, 9.9],
            [75.9, 10.2],
            [75.6, 10.1],
            [75.7, 9.8],   // Close the polygon
          ],
        ],
      },
    },
  ],
};

export default function PFZMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        center={[9.95, 75.8]} // Centered off the coast of Kochi
        zoom={9}              // Zoomed in closer than the EEZ map
        style={{ height: "100%", width: "100%", background: "#03045E" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="dark-map-tiles"
        />

        <GeoJSON
          data={mockPfzData as any}
          style={{
            color: "#00F5D4",      // Bright Cyan/Green border for "Safe/Good"
            weight: 2,
            fillColor: "#00F5D4",  // Glowing fill
            fillOpacity: 0.35,
          }}
        />
      </MapContainer>
    </div>
  );
}