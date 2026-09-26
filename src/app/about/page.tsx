import React from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  Brain, 
  Satellite, 
  Database, 
  Activity, 
  CloudRain 
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#03045E] text-white font-sans selection:bg-[#00B4D8] selection:text-[#03045E]">
      
      <Navbar />

      {/* Main About Section */}
      <main className="relative w-full py-16 px-6 overflow-hidden flex-1 flex flex-col justify-center">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0077B6]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* 1. Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            
            <h1 className="text-4xl md:text-3xl font-black mb-6 leading-tight tracking-tight">
              Bridging the Gap Between <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CAF0F8] to-[#00B4D8]">
                Satellite Data and Human Action
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#90E0EF]/90 font-medium">
              Turning terabytes of ocean data into life-saving decisions.
            </p>
          </div>

          {/* 2. Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* LEFT COLUMN - The Problem */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-[#0077B6]/30 rounded-[2.5rem] p-8 md:p-12 relative group hover:bg-white/[0.04] transition-all duration-500 overflow-hidden shadow-2xl shadow-[#0077B6]/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0077B6]/60 to-transparent" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#0077B6]/20 flex items-center justify-center mb-8 border border-[#0077B6]/30 shadow-[0_0_20px_rgba(0,119,182,0.2)]">
                <AlertTriangle className="w-8 h-8 text-[#90E0EF]" />
              </div>
              
              <h2 className="text-3xl font-bold mb-5 text-white">The Challenge</h2>
              <p className="text-[#CAF0F8]/80 leading-relaxed mb-12 text-lg">
                Every day, ISRO and global agencies generate massive volumes of oceanographic data — Sea Surface Temperature, Chlorophyll-a, wave heights, and cyclone forecasts. But fishermen, coastal authorities, and researchers cannot parse raw NetCDF files or complex meteorological charts. Critical information remains locked in scientific formats, inaccessible to those who need it most.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                <div className="bg-black/20 rounded-2xl p-5 border border-[#0077B6]/20">
                  <div className="text-2xl font-black text-[#90E0EF] mb-2">100+ TB</div>
                  <div className="text-sm text-[#90E0EF]/60 leading-snug">Daily satellite data generated</div>
                </div>
                <div className="bg-black/20 rounded-2xl p-5 border border-[#0077B6]/20">
                  <div className="text-2xl font-black text-[#90E0EF] mb-2">10M+</div>
                  <div className="text-sm text-[#90E0EF]/60 leading-snug">Indian fishermen at sea</div>
                </div>
                <div className="bg-black/20 rounded-2xl p-5 border border-[#0077B6]/20">
                  <div className="text-2xl font-black text-[#90E0EF] mb-2">0</div>
                  <div className="text-sm text-[#90E0EF]/60 leading-snug">Natural language marine interfaces</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - The Solution */}
            <div className="bg-white/[0.02] backdrop-blur-xl border border-[#00B4D8]/30 rounded-[2.5rem] p-8 md:p-12 relative group hover:bg-white/[0.04] transition-all duration-500 overflow-hidden shadow-2xl shadow-[#00B4D8]/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00B4D8]/60 to-transparent" />
              
              <div className="w-16 h-16 rounded-2xl bg-[#00B4D8]/20 flex items-center justify-center mb-8 border border-[#00B4D8]/30 shadow-[0_0_20px_rgba(0,180,216,0.2)]">
                <Brain className="w-8 h-8 text-[#CAF0F8]" />
              </div>
              
              <h2 className="text-3xl font-bold mb-5 text-white">Enter Arova</h2>
              <p className="text-[#CAF0F8]/80 leading-relaxed mb-12 text-lg">
                Arova acts as your intelligent marine co-pilot. Using Agentic AI, we translate terabytes of satellite data into natural language answers, interactive maps, and life-saving alerts. Ask in your language, get evidence-based recommendations, and navigate the seas with confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                <div className="bg-black/20 rounded-2xl p-5 border border-[#00B4D8]/20">
                  <div className="text-lg font-black text-[#CAF0F8] mb-2 leading-tight">Multi-Agent AI</div>
                  <div className="text-sm text-[#90E0EF]/70 leading-snug">Collaborative reasoning</div>
                </div>
                <div className="bg-black/20 rounded-2xl p-5 border border-[#00B4D8]/20">
                  <div className="text-lg font-black text-[#CAF0F8] mb-2 leading-tight">10+ Languages</div>
                  <div className="text-sm text-[#90E0EF]/70 leading-snug">Including all Indic scripts</div>
                </div>
                <div className="bg-black/20 rounded-2xl p-5 border border-[#00B4D8]/20">
                  <div className="text-lg font-black text-[#CAF0F8] mb-2 leading-tight">Real-Time</div>
                  <div className="text-sm text-[#90E0EF]/70 leading-snug">Live ISRO & INCOIS data</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Bottom Banner (Full Width) */}
          <div className="mt-16 bg-white/[0.02] backdrop-blur-xl border border-[#0077B6]/30 rounded-2xl p-6 md:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 text-center xl:text-left shadow-lg">
            
            <div>
              <p className="text-base text-[#CAF0F8] font-semibold tracking-wide">Built for Smart India Hackathon 2026</p>
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 mt-3 text-sm text-[#90E0EF]/80">
                <span className="bg-[#0077B6]/10 px-4 py-1.5 rounded-full border border-[#0077B6]/30 shadow-inner">Problem ID: SIH26176</span>
                <span className="bg-[#0077B6]/10 px-4 py-1.5 rounded-full border border-[#0077B6]/30 shadow-inner">Problem Creator: ISRO</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[#90E0EF]/70">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <Database className="w-6 h-6 group-hover:text-[#00B4D8] transition-colors duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider group-hover:text-[#CAF0F8] transition-colors">INCOIS</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <Satellite className="w-6 h-6 group-hover:text-[#00B4D8] transition-colors duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider group-hover:text-[#CAF0F8] transition-colors">MOSDAC</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <Activity className="w-6 h-6 group-hover:text-[#00B4D8] transition-colors duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider group-hover:text-[#CAF0F8] transition-colors">IMD</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <CloudRain className="w-6 h-6 group-hover:text-[#00B4D8] transition-colors duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider group-hover:text-[#CAF0F8] transition-colors">Open-Meteo</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}