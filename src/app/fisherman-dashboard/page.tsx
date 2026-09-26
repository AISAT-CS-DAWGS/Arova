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

// --- EVALUATION LOGIC FOR ZERO-JARGON METRICS ---
function getWindStatus(speedMs: number) {
  const speedKmh = speedMs * 3.6;
  if (speedKmh >= 40) return { status: "Danger (High)", color: "text-red-400" };
  if (speedKmh >= 20) return { status: "Strong", color: "text-amber-400" };
  if (speedKmh >= 10) return { status: "Moderate", color: "text-white" };
  return { status: "Calm", color: "text-[#00F5D4]" };
}

function getWaveStatus(heightM: number) {
  if (heightM >= 2.5) return { status: "Danger (High)", color: "text-red-400" };
  if (heightM >= 1.2) return { status: "Moderate", color: "text-amber-400" };
  if (heightM >= 0.5) return { status: "Smooth", color: "text-white" };
  return { status: "Calm", color: "text-[#00F5D4]" };
}

function getVisibilityStatus(visKm: number) {
  if (visKm < 2) return { status: "Poor", color: "text-red-400" };
  if (visKm < 5) return { status: "Moderate", color: "text-amber-400" };
  return { status: "Good", color: "text-[#00F5D4]" };
}

function getWavePeriodStatus(seconds: number) {
  if (seconds < 6) return { status: "Choppy", color: "text-amber-400" };
  if (seconds <= 9) return { status: "Moderate Swells", color: "text-white" };
  return { status: "Long Swells", color: "text-[#00F5D4]" };
}

// --- API FETCH FUNCTION ---
async function getOceanData() {
  const lat = 9.9312;
  const lon = 76.2673;

  try {
    // 1. Fetch Marine Data
    const marineRes = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period&timezone=auto`,
      { next: { revalidate: 3600 } }
    );
    const marineData = await marineRes.json();
    const currentHourIndex = new Date().getHours();
    const waveHeightRaw = marineData.hourly?.wave_height[currentHourIndex] ?? 1.2;
    const wavePeriodRaw = marineData.hourly?.wave_period[currentHourIndex] ?? 8;

    // 2. Fetch Weather Data
    const owmKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
    let weatherData = null;
    
    if (owmKey) {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owmKey}&units=metric`,
        { next: { revalidate: 3600 } }
      );
      weatherData = await weatherRes.json();
    }

    const windMs = weatherData?.wind.speed ?? 4.5;
    const visKm = weatherData ? weatherData.visibility / 1000 : 10;
    const tempRaw = weatherData?.main.temp ?? 28.5;

    // Evaluate statuses
    const wind = getWindStatus(windMs);
    const waves = getWaveStatus(waveHeightRaw);
    const visibility = getVisibilityStatus(visKm);
    const wavePeriod = getWavePeriodStatus(wavePeriodRaw);

    return {
      wind: { main: wind.status, sub: `${(windMs * 3.6).toFixed(1)} km/h`, color: wind.color },
      visibility: { main: visibility.status, sub: `${visKm.toFixed(1)} km`, color: visibility.color },
      conditions: { main: weatherData ? weatherData.weather[0].main : "Clear", sub: "Sky status", color: "text-white" },
      waveHeight: { main: waves.status, sub: `${waveHeightRaw} M`, color: waves.color },
      temp: { main: "Optimal", sub: `${tempRaw}°C`, color: "text-white" }, // Sea temp usually doesn't need a danger rating for sailing
      wavePeriod: { main: wavePeriod.status, sub: `${wavePeriodRaw} s`, color: wavePeriod.color },
    };
  } catch (error) {
    console.error("Failed to fetch ocean data", error);
    // Fallback data
    return {
      wind: { main: "Moderate", sub: "16 km/h", color: "text-white" },
      visibility: { main: "Good", sub: "10 km", color: "text-[#00F5D4]" },
      conditions: { main: "Clear", sub: "Sky status", color: "text-white" },
      waveHeight: { main: "Smooth", sub: "1.2 M", color: "text-white" },
      temp: { main: "Optimal", sub: "28.5°C", color: "text-white" },
      wavePeriod: { main: "Moderate Swells", sub: "8 s", color: "text-white" },
    };
  }
}

export default async function DashboardPage() {
  const data = await getOceanData();

  return (
    <div className="min-h-screen bg-[#03045E] text-white font-sans relative pb-24">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors md:hidden text-[#CAF0F8]">
              <Menu className="w-7 h-7" />
            </button>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CAF0F8] to-[#90E0EF] tracking-tight">
                Greetings User,
              </h1>
              <p className="text-[#90E0EF] mt-1 font-medium tracking-wide">Kochi, Kerala</p>
            </div>
          </div>

          {/* Status Controls */}
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

        {/* Actionable Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <MetricCard icon={<Wind />} title="Wind" value={data.wind.main} sub={data.wind.sub} valueColor={data.wind.color} />
          <MetricCard icon={<Eye />} title="Visibility" value={data.visibility.main} sub={data.visibility.sub} valueColor={data.visibility.color} />
          <MetricCard icon={<CloudRain />} title="Conditions" value={data.conditions.main} sub={data.conditions.sub} valueColor={data.conditions.color} />
          <MetricCard icon={<Waves />} title="Wave Height" value={data.waveHeight.main} sub={data.waveHeight.sub} valueColor={data.waveHeight.color} />
          <MetricCard icon={<Thermometer />} title="Sea Temp (SST)" value={data.temp.main} sub={data.temp.sub} valueColor={data.temp.color} />
          <MetricCard icon={<Timer />} title="Wave Period" value={data.wavePeriod.main} sub={data.wavePeriod.sub} valueColor={data.wavePeriod.color} />
        </div>

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          <div className="bg-[#0077B6]/10 backdrop-blur-md border border-[#0077B6]/30 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center group hover:bg-[#0077B6]/20 hover:border-[#00B4D8]/50 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg">
            <MapIcon className="w-12 h-12 text-[#90E0EF] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#CAF0F8] tracking-wide">EEZ map</h3>
            <p className="text-[#90E0EF]/60 text-sm mt-2 uppercase tracking-widest font-semibold">Exclusive Economic Zone</p>
          </div>
          <div className="bg-[#0077B6]/10 backdrop-blur-md border border-[#0077B6]/30 rounded-[2.5rem] p-8 aspect-video flex flex-col items-center justify-center group hover:bg-[#0077B6]/20 hover:border-[#00B4D8]/50 transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg">
            <MapIcon className="w-12 h-12 text-[#90E0EF] mb-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-2xl md:text-3xl font-bold text-[#CAF0F8] tracking-wide">PFZ map</h3>
            <p className="text-[#90E0EF]/60 text-sm mt-2 uppercase tracking-widest font-semibold">Potential Fishing Zone</p>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#00B4D8] to-[#0077B6] rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(0,180,216,0.6)] hover:scale-110 transition-transform duration-300 group z-50 border-2 border-[#CAF0F8]/20">
        <div className="absolute inset-0 rounded-full animate-ping bg-[#00B4D8] opacity-30"></div>
        <Mic className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:text-[#CAF0F8] transition-colors" />
      </button>
    </div>
  );
}

function MetricCard({ 
  icon, 
  title, 
  value, 
  sub, 
  valueColor = "text-white" 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  sub?: string;
  valueColor?: string;
}) {
  return (
    <div className="bg-gradient-to-r from-[#0077B6]/40 to-[#0077B6]/20 backdrop-blur-lg border border-[#00B4D8]/30 rounded-[2rem] p-5 flex flex-col justify-center hover:from-[#00B4D8]/30 hover:to-[#0077B6]/30 transition-all duration-300 shadow-lg shadow-[#03045E]/50 group">
      <div className="flex items-center gap-2 text-[#90E0EF] mb-2">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { 
          className: "w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity" 
        })}
        <span className="text-sm font-semibold tracking-wide">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-2xl md:text-3xl font-bold leading-tight ${valueColor}`}>
          {value}
        </span>
        {sub && <span className="text-sm md:text-base text-[#CAF0F8]/70 font-medium">({sub})</span>}
      </div>
    </div>
  );
}