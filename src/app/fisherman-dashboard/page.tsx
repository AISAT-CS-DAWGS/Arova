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
  AlertTriangle,
  Activity,
  Compass,
  Navigation,
  Navigation2
} from "lucide-react";
import EEZMap from "@/components/EEZMap";
import PFZMap from "@/components/PFZMap";
import LocationSelector from "@/components/LocationSelector";

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

function getSwellStatus(heightM: number) {
  if (heightM >= 2.0) return { status: "Heavy Swell", color: "text-red-400" };
  if (heightM >= 1.0) return { status: "Moderate", color: "text-amber-400" };
  return { status: "Light Swell", color: "text-[#00F5D4]" };
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

function getCurrentVelocityStatus(velocityKmh: number) {
  if (velocityKmh >= 2.0) return { status: "Strong", color: "text-amber-400" };
  if (velocityKmh >= 0.5) return { status: "Moderate", color: "text-white" };
  return { status: "Weak", color: "text-[#00F5D4]" };
}

function getDirection(degree: number | undefined | null) {
  if (degree === undefined || degree === null) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const val = Math.floor((degree / 45) + 0.5);
  return directions[(val % 8)];
}

// --- STRICT REAL-TIME API FETCH FUNCTION ---
async function getOceanData(lat: number, lon: number) {
  try {
    const owmKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
    if (!owmKey) throw new Error("OpenWeatherMap API Key is missing.");

    // Fetch Weather Data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owmKey}&units=metric`,
      { next: { revalidate: 3600 } }
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data.");
    const weatherData = await weatherRes.json();

    // Fetch Marine Data (Expanded with critical safety metrics)
    const marineRes = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_period,wave_direction,ocean_current_velocity,ocean_current_direction&timezone=auto`,
      { next: { revalidate: 3600 } }
    );
    if (!marineRes.ok) throw new Error("Failed to fetch marine data.");
    const marineData = await marineRes.json();
    
    // Parse Real Data
    const currentHourIndex = new Date().getHours();
    
    // Original metrics
    const waveHeightRaw = marineData.hourly?.wave_height?.[currentHourIndex];
    const wavePeriodRaw = marineData.hourly?.wave_period?.[currentHourIndex];
    
    // New safety metrics
    const swellHeightRaw = marineData.hourly?.swell_wave_height?.[currentHourIndex];
    const swellPeriodRaw = marineData.hourly?.swell_wave_period?.[currentHourIndex];
    const waveDirRaw = marineData.hourly?.wave_direction?.[currentHourIndex];
    const currentVelRaw = marineData.hourly?.ocean_current_velocity?.[currentHourIndex];
    const currentDirRaw = marineData.hourly?.ocean_current_direction?.[currentHourIndex];

    const windMs = weatherData.wind?.speed ?? 0;
    const visKm = (weatherData.visibility ?? 10000) / 1000;
    const tempRaw = weatherData.main?.temp ?? 0;
    const conditions = weatherData.weather?.[0]?.main ?? "Unknown";

    // Evaluate statuses
    const wind = getWindStatus(windMs);
    const waves = getWaveStatus(waveHeightRaw ?? 0);
    const visibility = getVisibilityStatus(visKm);
    const wavePeriod = getWavePeriodStatus(wavePeriodRaw ?? 0);
    
    // Evaluate new safety statuses
    const swell = getSwellStatus(swellHeightRaw ?? 0);
    const swellPeriod = getWavePeriodStatus(swellPeriodRaw ?? 0);
    const currentVel = getCurrentVelocityStatus(currentVelRaw ?? 0);
    const waveDirStr = getDirection(waveDirRaw);
    const currentDirStr = getDirection(currentDirRaw);

    return {
      wind: { main: wind.status, sub: `${(windMs * 3.6).toFixed(1)} km/h`, color: wind.color },
      visibility: { main: visibility.status, sub: `${visKm.toFixed(1)} km`, color: visibility.color },
      conditions: { main: conditions, sub: "Sky status", color: "text-white" },
      temp: { main: "Optimal", sub: `${tempRaw}°C`, color: "text-white" },
      
      waveHeight: waveHeightRaw !== null && waveHeightRaw !== undefined 
        ? { main: waves.status, sub: `${waveHeightRaw} M`, color: waves.color }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
      wavePeriod: wavePeriodRaw !== null && wavePeriodRaw !== undefined
        ? { main: wavePeriod.status, sub: `${wavePeriodRaw} s`, color: wavePeriod.color }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
        
      // New Safety Widget Data
      swellHeight: swellHeightRaw !== null && swellHeightRaw !== undefined
        ? { main: swell.status, sub: `${swellHeightRaw} M`, color: swell.color }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
      swellPeriod: swellPeriodRaw !== null && swellPeriodRaw !== undefined
        ? { main: swellPeriod.status, sub: `${swellPeriodRaw} s`, color: swellPeriod.color }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
      waveDirection: waveDirRaw !== null && waveDirRaw !== undefined
        ? { main: `Pushing ${waveDirStr}`, sub: `${waveDirRaw}°`, color: "text-white" }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
      currentVelocity: currentVelRaw !== null && currentVelRaw !== undefined
        ? { main: currentVel.status, sub: `${currentVelRaw} km/h`, color: currentVel.color }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
      currentDirection: currentDirRaw !== null && currentDirRaw !== undefined
        ? { main: `Flowing ${currentDirStr}`, sub: `${currentDirRaw}°`, color: "text-white" }
        : { main: "Inland", sub: "N/A", color: "text-[#90E0EF]/50" },
    };
  } catch (error) {
    console.error("Ocean data strictly failed:", error);
    return null; 
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await Promise.resolve(searchParams);
  
  const lat = parseFloat((params?.lat as string) || "9.9312");
  const lon = parseFloat((params?.lon as string) || "76.2673");
  const locName = (params?.name as string) || "Kochi, Kerala";

  const data = await getOceanData(lat, lon);

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
              <LocationSelector initialName={locName} />
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
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
            <MetricCard icon={<Wind />} title="Wind" value={data.wind.main} sub={data.wind.sub} valueColor={data.wind.color} />
            <MetricCard icon={<Eye />} title="Visibility" value={data.visibility.main} sub={data.visibility.sub} valueColor={data.visibility.color} />
            <MetricCard icon={<CloudRain />} title="Conditions" value={data.conditions.main} sub={data.conditions.sub} valueColor={data.conditions.color} />
            <MetricCard icon={<Thermometer />} title="Sea Temp (SST)" value={data.temp.main} sub={data.temp.sub} valueColor={data.temp.color} />
            
            <MetricCard icon={<Waves />} title="Wave Height" value={data.waveHeight.main} sub={data.waveHeight.sub} valueColor={data.waveHeight.color} />
            <MetricCard icon={<Timer />} title="Wave Period" value={data.wavePeriod.main} sub={data.wavePeriod.sub} valueColor={data.wavePeriod.color} />
            <MetricCard icon={<Compass />} title="Wave Direction" value={data.waveDirection.main} sub={data.waveDirection.sub} valueColor={data.waveDirection.color} />
            
            <MetricCard icon={<Activity />} title="Swell Height" value={data.swellHeight.main} sub={data.swellHeight.sub} valueColor={data.swellHeight.color} />
            <MetricCard icon={<Timer />} title="Swell Period" value={data.swellPeriod.main} sub={data.swellPeriod.sub} valueColor={data.swellPeriod.color} />
            
            <MetricCard icon={<Navigation />} title="Current Velocity" value={data.currentVelocity.main} sub={data.currentVelocity.sub} valueColor={data.currentVelocity.color} />
            <MetricCard icon={<Navigation2 />} title="Current Direction" value={data.currentDirection.main} sub={data.currentDirection.sub} valueColor={data.currentDirection.color} />
          </div>
        ) : (
          <div className="bg-red-500/10 border border-red-500/30 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 mb-12 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <AlertTriangle className="w-12 h-12 text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">Live Data Unavailable</h2>
              <p className="text-white/70 max-w-lg mx-auto">
                Real-time ocean data could not be fetched for <strong className="text-white">{locName}</strong>. This may be due to missing API keys or severe network connectivity issues.
              </p>
            </div>
          </div>
        )}

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          
          <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg bg-[#0077B6]/10">
            <div className="absolute bottom-4 left-6 md:left-8 z-[1000] pointer-events-none drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-[#CAF0F8] tracking-wide">EEZ map</h3>
              <p className="text-[#90E0EF] text-xs mt-1 uppercase tracking-widest font-semibold">Exclusive Economic Zone</p>
            </div>
            <EEZMap />
          </div>

         <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-[#0077B6]/30 shadow-lg bg-[#0077B6]/10 group">
            <div className="absolute bottom-4 left-6 md:left-8 z-[1000] pointer-events-none drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold text-[#00F5D4] tracking-wide">PFZ map</h3>
              <p className="text-[#90E0EF] text-xs mt-1 uppercase tracking-widest font-semibold">Potential Fishing Zone</p>
            </div>
            <div className="absolute top-6 right-6 z-[1000] flex items-center gap-2 bg-[#00F5D4]/20 border border-[#00F5D4]/40 px-3 py-1 rounded-full backdrop-blur-sm">
               <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5D4]"></span>
              </span>
              <span className="text-[#00F5D4] text-xs font-bold tracking-widest uppercase">Live</span>
            </div>
            <PFZMap />
          </div>

        </div>
      </main>

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