"use client";

import { MapContainer, TileLayer, Polygon, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Centered between Southern India and Sri Lanka to match the reference view
const mapCenter: [number, number] = [8.5, 79.5];

// 1. Geofenced Boundary (EEZ border line wrapping the coast)
const eezBoundary: [number, number][] = [
  [12.0, 80.2], 
  [10.0, 80.5], 
  [8.0, 81.5],  
  [5.0, 81.0],  
  [5.0, 78.0],  
  [7.0, 77.0],  
  [9.0, 76.0]   
];

// 2. Potential Fishing Zone (PFZ) Polygon
const pfzPolygon: [number, number][] = [
  [9.5, 79.0], [9.5, 79.5], [9.0, 79.5], [9.0, 79.0]
];

export default function MapComponent() {
  // Fix for default Leaflet marker icons not loading in Next.js/Webpack
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      
      {/* UI Overlay matching the "EEZ map" text from the reference */}
      <div className="absolute top-4 left-[3.5rem] z-[1000] pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          EEZ map
        </h2>
        <p className="text-[10px] font-bold tracking-widest text-white uppercase mt-0.5">
          Exclusive Economic Zone
        </p>
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={6} 
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        zoomControl={true}
      >
        {/* Standard OpenStreetMap tiles (Fixes the API Key Required error) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Geofenced Boundary Overlay (Cyan line) */}
        <Polyline 
          positions={eezBoundary} 
          pathOptions={{ color: '#00e5ff', weight: 3 }}
        />

        {/* Potential Fishing Zone (PFZ) Overlay */}
        <Polygon 
          positions={pfzPolygon} 
          pathOptions={{ color: '#00e676', fillColor: '#00e676', fillOpacity: 0.4, weight: 2 }}
        >
          <Popup>
            <strong className="text-[#00e676]">Active PFZ</strong><br/>
            High Chlorophyll-a & Optimal SST detected.
          </Popup>
        </Polygon>

      </MapContainer>
    </div>
  );
}