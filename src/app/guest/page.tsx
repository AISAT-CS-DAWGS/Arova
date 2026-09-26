"use client";

import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LineWaves from "@/components/ui/LineWaves"; 
import { Wind, Eye, CloudRain, Waves, Thermometer, Timer } from "lucide-react";

const guestData = {
  locationContext: "Demo Region: Chennai Coast",
  aiExplanation: "Arova AI Analysis: Current marine conditions are optimal. High chlorophyll and favorable temperatures indicate an active Potential Fishing Zone (PFZ) in this region. Weather parameters confirm safe navigation with wave heights under 2 meters.",
  metrics: [
    { label: "Wind", status: "Moderate", value: "(10.3 km/h)", icon: Wind, statusColor: "text-white" },
    { label: "Visibility", status: "Good", value: "(10.0 km)", icon: Eye, statusColor: "text-[#00e676]" }, // Emerald green
    { label: "Conditions", status: "Rain", value: "(Sky status)", icon: CloudRain, statusColor: "text-white" },
    { label: "Wave Height", status: "Moderate", value: "(1.2 M)", icon: Waves, statusColor: "text-[#ffc107]" }, // Warning yellow
    { label: "Sea Temp (SST)", status: "Optimal", value: "(25.95°C)", icon: Thermometer, statusColor: "text-white" },
    { label: "Wave Period", status: "Moderate Swells", value: "(7.5 s)", icon: Timer, statusColor: "text-white" }
  ]
};

export default function GuestPage() {
  return (
    <div className="h-screen w-full flex flex-col font-sans bg-[#010214] text-[#caf0f8] overflow-hidden relative">
      
      {/* Animated Background Layer */}
      <div className="absolute inset-0 z-0 opacity-25">
        <LineWaves 
          speed={0.15}
          innerLineCount={30}
          outerLineCount={40}
          warpIntensity={1.5}
          rotation={-45}
          edgeFadeWidth={0.2}
          colorCycleSpeed={1.0}
          brightness={0.3} 
          color1="#0077b6"
          color2="#001d3d" 
          color3="#00b4d8"
          enableMouseInteraction={true}
          mouseInfluence={5.0} 
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col h-full w-full pointer-events-none">
        
        <div className="pointer-events-auto w-full flex justify-center">
          <Navbar />
        </div>

        <main className="flex-1 flex flex-col p-4 md:p-6 lg:px-10 w-full max-w-[1600px] mx-auto gap-4">
          
          <header className="flex justify-between items-center bg-[#0077B6]/30 backdrop-blur-md p-4 rounded-xl border border-[#90e0ef]/30 shadow-lg shrink-0 pointer-events-auto">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Guest Dashboard</h1>
              <p className="text-sm font-medium text-[#90e0ef]">Platform Capabilities Demo</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 pb-4 min-h-0">
            
            {/* Main Canvas: Map (Height increased via flex-grow and min-h) */}
            <section className="lg:col-span-2 bg-[#0077B6]/10 backdrop-blur-sm border border-[#90e0ef]/30 rounded-2xl relative overflow-hidden flex items-center justify-center h-full min-h-[400px] lg:min-h-[500px] shadow-[inset_0_0_40px_rgba(0,119,182,0.2)] pointer-events-auto">
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
               <SpotlightCard className="max-w-md text-center bg-[#03045E]/80 backdrop-blur-md border-[#90e0ef]/40" spotlightColor="rgba(0, 180, 216, 0.25)">
                  <h3 className="text-2xl font-bold text-white mb-3">Interactive Smart Map</h3>
                  <p className="text-sm opacity-100 font-medium leading-relaxed text-[#caf0f8]">
                    This interactive canvas visualizes ISRO satellite data, overlaying weather warnings, Potential Fishing Zones, and geofenced boundaries for real-time maritime intelligence.
                  </p>
               </SpotlightCard>
            </section>

            {/* Right Panel: AI Insights & Context */}
            <section className="lg:col-span-1 flex flex-col gap-4 h-full">
              <SpotlightCard spotlightColor="rgba(0, 180, 216, 0.2)" className="flex flex-col flex-1 bg-[#0077B6]/10 backdrop-blur-md pointer-events-auto border-[#90e0ef]/20">
                <h2 className="text-sm font-bold tracking-wider uppercase mb-3 text-[#90e0ef]">Live Insights</h2>
                <p className="text-sm xl:text-base font-medium leading-relaxed text-white flex-1 overflow-y-auto pr-2">
                  {guestData.aiExplanation}
                </p>
              </SpotlightCard>

              <SpotlightCard spotlightColor="rgba(0, 180, 216, 0.15)" className="bg-[#0077B6]/10 backdrop-blur-md shrink-0 pointer-events-auto border-[#90e0ef]/20">
                <h3 className="text-sm font-bold tracking-wider uppercase mb-2 text-[#90e0ef]">Location Context</h3>
                <p className="text-lg text-white font-semibold">{guestData.locationContext}</p>
              </SpotlightCard>
            </section>

            {/* Bottom Panel: Horizontal Metrics Row (6 items) */}
            <section className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 shrink-0">
              {guestData.metrics.map((item, index) => (
                <SpotlightCard 
                  key={index} 
                  className="flex flex-col justify-center items-start text-left !p-4 bg-[#0077B6]/20 backdrop-blur-md pointer-events-auto border border-[#90e0ef]/20 shadow-sm"
                  spotlightColor="rgba(144, 224, 239, 0.15)"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-[#90e0ef]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#90e0ef]/90">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={`text-lg xl:text-xl font-black ${item.statusColor}`}>
                      {item.status}
                    </span>
                    <span className="text-[13px] font-semibold text-white/60 whitespace-nowrap">
                      {item.value}
                    </span>
                  </div>
                </SpotlightCard>
              ))}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}