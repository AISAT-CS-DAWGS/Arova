"use client";

import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LineWaves from "@/components/ui/LineWaves"; 

const guestData = {
  locationContext: "Demo Region: Chennai Coast",
  metrics: {
    seaSurfaceTemp: "28.5°C",
    chlorophyll: "1.2 mg/m³",
    waveHeight: "1.5m",
    windSpeed: "12 knots"
  },
  aiExplanation: "Arova AI Analysis: Current marine conditions are optimal. High chlorophyll and favorable temperatures indicate an active Potential Fishing Zone (PFZ) in this region. Weather parameters confirm safe navigation with wave heights under 2 meters.",
  statusColor: "text-[#00b4d8]"
};

export default function GuestPage() {
  return (
    <div className="h-screen w-full flex flex-col font-sans bg-[#010214] text-[#caf0f8] overflow-hidden relative">
      
      {/* Animated Background Layer - Removed pointer-events-none, decreased opacity, removed mix-blend-screen */}
      <div className="absolute inset-0 z-0 opacity-25">
        <LineWaves 
          speed={0.15}
          innerLineCount={30}
          outerLineCount={40}
          warpIntensity={1.5}
          rotation={-45}
          edgeFadeWidth={0.2}
          colorCycleSpeed={1.0}
          brightness={0.3} /* Lowered brightness for a darker vibe */
          color1="#0077b6"
          color2="#001d3d" /* Darker navy secondary color */
          color3="#00b4d8"
          enableMouseInteraction={true}
          mouseInfluence={5.0} /* Increased so the warp is very obvious */
        />
      </div>

      {/* Foreground - Added pointer-events-none to let mouse pass through empty spaces */}
      <div className="relative z-10 flex flex-col h-full w-full pointer-events-none">
        
        {/* Re-enable pointer events for the Navbar */}
        <div className="pointer-events-auto w-full flex justify-center">
          <Navbar />
        </div>

        {/* Structural Main Container */}
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:px-10 w-full max-w-[1600px] mx-auto gap-4">
          
          {/* Top Header - Re-enable pointer events */}
          <header className="flex justify-between items-center bg-[#0077B6]/20 backdrop-blur-md p-4 rounded-xl border border-[#90e0ef]/20 shadow-lg shrink-0 pointer-events-auto">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Guest Dashboard</h1>
              <p className="text-sm opacity-80 text-[#90e0ef]">Platform Capabilities Demo</p>
            </div>
          </header>

          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 pb-4 min-h-0">
            
            {/* Main Canvas: Map - Re-enable pointer events */}
            <section className="lg:col-span-2 bg-[#0077B6]/10 backdrop-blur-sm border border-[#90e0ef]/20 rounded-2xl relative overflow-hidden flex items-center justify-center h-full shadow-[inset_0_0_40px_rgba(0,119,182,0.2)] pointer-events-auto">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
               <SpotlightCard className="max-w-md text-center bg-[#03045E]/80 backdrop-blur-md border-[#90e0ef]/30" spotlightColor="rgba(0, 180, 216, 0.25)">
                  <h3 className="text-2xl font-bold text-white mb-3">Interactive Smart Map</h3>
                  <p className="text-sm opacity-90 leading-relaxed text-[#caf0f8]">
                    This interactive canvas visualizes ISRO satellite data, overlaying weather warnings, Potential Fishing Zones, and geofenced boundaries for real-time maritime intelligence.
                  </p>
               </SpotlightCard>
            </section>

            {/* Right Panel: AI Insights & Context */}
            <section className="lg:col-span-1 flex flex-col gap-4 h-full">
              {/* Card 1 - Re-enable pointer events */}
              <SpotlightCard spotlightColor="rgba(0, 180, 216, 0.2)" className="flex flex-col flex-1 bg-[#0077B6]/10 backdrop-blur-md pointer-events-auto">
                <h2 className="text-sm font-semibold tracking-wider uppercase mb-3 text-[#90e0ef]">Live Insights</h2>
                <p className="text-sm xl:text-base leading-relaxed text-white flex-1 overflow-y-auto pr-2">
                  {guestData.aiExplanation}
                </p>
              </SpotlightCard>

              {/* Card 2 - Re-enable pointer events */}
              <SpotlightCard spotlightColor="rgba(0, 180, 216, 0.15)" className="bg-[#0077B6]/10 backdrop-blur-md shrink-0 pointer-events-auto">
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-2 text-[#90e0ef]">Location Context</h3>
                <p className="text-lg text-white font-medium">{guestData.locationContext}</p>
              </SpotlightCard>
            </section>

            {/* Bottom Panel: Horizontal Metrics Row */}
            <section className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 h-32 shrink-0">
              {Object.entries(guestData.metrics).map(([key, value]) => (
                <SpotlightCard 
                  key={key} 
                  className="flex flex-col justify-center items-center text-center !p-4 bg-[#0077B6]/10 backdrop-blur-md h-full pointer-events-auto"
                  spotlightColor="rgba(144, 224, 239, 0.15)"
                >
                  <span className="text-xs uppercase tracking-wider opacity-70 mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-2xl xl:text-3xl font-bold ${guestData.statusColor}`}>{value}</span>
                </SpotlightCard>
              ))}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}