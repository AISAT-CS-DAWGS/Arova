"use client";

import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
// Removed LayersControl and WMSTileLayer imports
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function EEZMap() {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/data/eez.json")
      .then((res) => {
        if (!res.ok) throw new Error("File not found! Check public folder path.");
        return res.json();
      })
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading EEZ data:", err));
  }, []);

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg relative z-0">
      
      <style>{`
        .dark-map-tiles { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
      `}</style>

      <MapContainer
        center={[9.9312, 76.2673]}
        zoom={4}
        style={{ height: "100%", width: "100%", background: "#03045E" }}
        scrollWheelZoom={false}
      >
        {/* Base Map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="dark-map-tiles"
        />

        {/* EEZ Zone Overlay */}
        {geoData && (
          <GeoJSON
            data={geoData}
            style={{
              color: "#00F5D4",
              weight: 2,
              fillColor: "#0077B6",
              fillOpacity: 0.3,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}