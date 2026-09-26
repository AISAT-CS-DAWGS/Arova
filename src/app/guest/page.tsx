"use client";

import Navbar from "@/components/Navbar";

// A single, unified data payload for the general guest experience
const guestData = {
  locationContext: "Demo Region: Chennai Coast",
  metrics: {
    seaSurfaceTemp: "28.5°C",
    chlorophyll: "1.2 mg/m³",
    waveHeight: "1.5m",
    windSpeed: "12 knots"
  },
  aiExplanation: "Arova AI Analysis: Current marine conditions are optimal. High chlorophyll and favorable temperatures indicate an active Potential Fishing Zone (PFZ) in this region. Weather parameters confirm safe navigation with wave heights under 2 meters.",
  statusColor: "text-[#00b4d8]",
  borderColor: "border-[#00b4d8]/50",
  bgColor: "bg-[#00b4d8]/10"
};

export default function GuestPage() {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-[#03045E] text-[#caf0f8]">
      <Navbar />

      <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full gap-6 mt-4">
        
        {/* Top Header */}
        <header className="flex justify-between items-center bg-[#0077B6]/20 p-4 rounded-xl border border-[#90e0ef]/20">
          <div>
            <h1 className="text-2xl font-bold text-white">Guest Dashboard</h1>
            <p className="text-sm opacity-80">Platform Capabilities Demo</p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Left Panel: Insights & Metrics */}
          <section className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* AI Explanation Card */}
            <div className={`p-6 rounded-xl border ${guestData.borderColor} ${guestData.bgColor}`}>
              <h2 className="text-sm font-semibold tracking-wider uppercase mb-2 opacity-80 text-white">Live Insights</h2>
              <p className="text-lg leading-relaxed">{guestData.aiExplanation}</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(guestData.metrics).map(([key, value]) => (
                <div key={key} className="bg-[#0077B6]/10 border border-[#90e0ef]/10 p-4 rounded-xl flex flex-col justify-center items-center text-center">
                  <span className="text-xs uppercase tracking-wider opacity-70 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-xl font-bold ${guestData.statusColor}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Context Info */}
            <div className="bg-[#0077B6]/10 border border-[#90e0ef]/10 p-6 rounded-xl mt-auto">
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-3 opacity-80">Location Context</h3>
              <p className="text-lg">{guestData.locationContext}</p>
            </div>

          </section>

          {/* Main Canvas: Map Placeholder */}
          <section className="w-full lg:w-2/3 bg-[#0077B6]/5 border border-[#90e0ef]/20 rounded-xl relative overflow-hidden flex items-center justify-center min-h-[500px]">
             {/* Mapbox will eventually go here. */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
             <div className="text-center p-8 z-10 bg-[#03045E]/80 border border-[#90e0ef]/30 rounded-2xl backdrop-blur-sm max-w-md">
                <h3 className="text-2xl font-bold text-white mb-2">Interactive Smart Map</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  This interactive canvas visualizes ISRO satellite data, overlaying weather warnings, Potential Fishing Zones, and geofenced boundaries for real-time maritime intelligence.
                </p>
             </div>
          </section>
        </div>

      </main>
    </div>
  );
}