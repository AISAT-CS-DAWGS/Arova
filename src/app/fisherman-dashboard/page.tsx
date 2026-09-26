import React from "react";
import Navbar from "@/components/Navbar";
import {
  Menu,
  ChevronDown,
  Sun,
  Wind,
  Eye,
  CloudRain,
  Waves,
  Thermometer,
  Timer,
  Mic,
  Map as MapIcon,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#03045E] text-white font-sans relative pb-24">
      {/* Reusable Navbar */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Top Header: Hamburger & Greeting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors md:hidden text-[#CAF0F8]">
              <Menu className="w-7 h-7" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CAF0F8] to-[#90E0EF] tracking-tight">
                Greetings User,
              </h1>
            </div>
          </div>

          {/* Status Controls (Online, Language, Theme) */}
          <div className="flex items-center gap-5 bg-white/5 backdrop-blur-xl border border-[#00B4D8]/30 px-5 py-3 rounded-full shadow-[0_0_20px_rgba(0,180,216,0.1)] w-full md:w-auto justify-between md:justify-start">
            
            <div className="flex items-center gap-2 text-sm font-bold text-[#CAF0F8]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00F5D4]"></span>
              </span>
              Online
            </div>

            <div className="w-px h-5 bg-white/20" />
            
            <button className="flex items-center gap-1.5 text-sm font-bold text-[#CAF0F8] hover:text-white transition-colors">
              English <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            <div className="w-px h-5 bg-white/20" />
            
            <button className="text-[#CAF0F8] hover:text-white transition-colors hover:rotate-45 duration-300">
              <Sun className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Metrics Grid (The blue pill cards from wireframe) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <MetricCard 
            icon={<Wind />} 
            title="Wind" 
            value="15 km/h" 
            sub="(North-East)" 
          />
          <MetricCard 
            icon={<Eye />} 
            title="Visibility" 
            value="10 km" 
            sub="(Clear)" 
          />
          <MetricCard 
            icon={<CloudRain />} 
            title="Conditions" 
            value="Partly Cloudy" 
          />
          <MetricCard 
            icon={<Waves />} 
            title="Wave Height" 
            value="1.2 M" 
          />
          <MetricCard 
            icon={<Thermometer />} 
            title="Sea Temp (SST)" 
            value="28.5°C" 
          />
          <MetricCard 
            icon={<Timer />} 
            title="Wave Period" 
            value="8s" 
          />
        </div>

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          
          {/* EEZ Map Placeholder */}
          <div className="bg-[#0077B6]/10 backdrop-blur-md border border-[#0077B6]/30 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center group hover:bg-[#0077B6]/20 hover:border-[#00B4D8]/50 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <MapIcon className="w-12 h-12 text-[#90E0EF] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#CAF0F8] tracking-wide">EEZ map</h3>
            <p className="text-[#90E0EF]/60 text-sm mt-2 uppercase tracking-widest font-semibold">Exclusive Economic Zone</p>
          </div>

          {/* PFZ Map Placeholder */}
          <div className="bg-[#0077B6]/10 backdrop-blur-md border border-[#0077B6]/30 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center group hover:bg-[#0077B6]/20 hover:border-[#00B4D8]/50 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <MapIcon className="w-12 h-12 text-[#90E0EF] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#CAF0F8] tracking-wide">PFZ map</h3>
            <p className="text-[#90E0EF]/60 text-sm mt-2 uppercase tracking-widest font-semibold">Potential Fishing Zone</p>
          </div>

        </div>
      </main>

      {/* Floating Action Button (Voice Assistant) */}
      <button className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(0,180,216,0.6)] hover:scale-110 transition-transform duration-300 group z-50 border-2 border-[#CAF0F8]/20">
        <div className="absolute inset-0 rounded-full animate-ping bg-[#00B4D8] opacity-30"></div>
        <Mic className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:text-[#CAF0F8] transition-colors" />
      </button>
    </div>
  );
}

// -------------------------------------------------------------
// Helper Component for the Weather/Sea Metric "Pills"
// -------------------------------------------------------------
function MetricCard({ 
  icon, 
  title, 
  value, 
  sub 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  sub?: string;
}) {
  return (
    <div className="bg-gradient-to-r from-[#0077B6]/40 to-[#0077B6]/20 backdrop-blur-lg border border-[#00B4D8]/30 rounded-[2rem] p-5 flex flex-col justify-center hover:from-[#00B4D8]/30 hover:to-[#0077B6]/30 transition-all duration-300 shadow-lg shadow-[#03045E]/50 group">
      <div className="flex items-center gap-2 text-[#90E0EF] mb-2">
        {/* Render the passed Lucide icon */}
        
        <span className="text-sm font-semibold tracking-wide">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {value}
        </span>
        {sub && (
          <span className="text-sm md:text-base text-[#CAF0F8]/70 font-medium">
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}