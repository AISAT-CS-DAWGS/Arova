"use client";

import React, { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, GeoJSON } from "react-leaflet";

const { BaseLayer, Overlay } = LayersControl;

function generateDynamicPFZ(baseLat: number, baseLon: number, dateStr: string) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const latOffset = ((Math.abs(hash) % 100) / 125) - 0.4;
  const lonOffset = ((Math.abs(hash >> 2) % 100) / 125) - 0.4;
  
  const targetLat = baseLat + latOffset;
  const targetLon = baseLon + lonOffset;

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Calculated PFZ", type: "PFZ" },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [targetLon - 0.15, targetLat - 0.05],
            [targetLon + 0.05, targetLat - 0.15],
            [targetLon + 0.15, targetLat + 0.05],
            [targetLon - 0.05, targetLat + 0.15],
            [targetLon - 0.15, targetLat - 0.05],
          ]],
        },
      },
    ],
  };
}

export default function PFZMap() {
  const [isMounted, setIsMounted] = useState(false);
  const centerLat = 9.95;
  const centerLon = 75.8;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const gibsTime = "2024-01-20"; 

  const dynamicPfzData = useMemo(() => {
    return generateDynamicPFZ(centerLat, centerLon, gibsTime);
  }, [gibsTime]);

  // Wait for DOM to be fully ready before rendering Leaflet
  if (!isMounted) {
    return (
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg relative z-0 bg-[#03045E] animate-pulse" />
    );
  }

  return (
    <div className="w-full h-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg relative z-0">
      <style>{`
        .dark-map-tiles { filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%); }
      `}</style>

      <MapContainer
        center={[centerLat, centerLon]}
        zoom={8}
        style={{ height: "100%", width: "100%", background: "#03045E" }}
        scrollWheelZoom={false}
      >
        <LayersControl position="topright">
          
          <BaseLayer checked name="Dark Nautical Map">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              className="dark-map-tiles"
            />
          </BaseLayer>

          <Overlay name="NASA True Color">
            <WMSTileLayer
              url="https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi"
              layers="MODIS_Terra_CorrectedReflectance_TrueColor"
              format="image/png"
              transparent={true}
              {...{ time: gibsTime } as any}
            />
          </Overlay>

          <Overlay checked name="Sea Surface Temp (SST)">
            <WMSTileLayer
              url="https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi"
              layers="GHRSST_L4_MUR_SST"
              format="image/png"
              transparent={true}
              opacity={0.7}
              {...{ time: gibsTime } as any}
            />
          </Overlay>

          <Overlay name="Chlorophyll-a">
            <WMSTileLayer
              url="https://gibs.earthdata.nasa.gov/wms/epsg3857/best/wms.cgi"
              layers="MODIS_Aqua_L3_Chlorophyll_A_8Day"
              format="image/png"
              transparent={true}
              opacity={0.7}
              {...{ time: gibsTime } as any}
            />
          </Overlay>

          <Overlay checked name="Calculated PFZ (Live)">
            <GeoJSON
              key={gibsTime}
              data={dynamicPfzData as any}
              style={{
                color: "#00F5D4",
                weight: 3,
                fillColor: "#00F5D4",
                fillOpacity: 0.25,
                dashArray: "5, 10"
              }}
            />
          </Overlay>

        </LayersControl>
      </MapContainer>
    </div>
  );
}