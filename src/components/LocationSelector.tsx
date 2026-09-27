"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Loader2 } from "lucide-react";

export default function LocationSelector({ 
  initialName, 
  theme = "ocean" 
}: { 
  initialName: string;
  theme?: "ocean" | "white" | "black";
}) {
  const [query, setQuery] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const { lat, lon, name } = data[0];
        setQuery(name);
        router.push(`/fisherman-dashboard?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`);
      } else {
        alert("Location not found. Try a valid coastal city or port.");
      }
    } catch (err) {
      console.error("Geocoding failed", err);
    } finally {
      setLoading(false);
    }
  };

  const locateMe = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported by your browser");
    
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
          const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
          const data = await res.json();
          const name = data?.[0]?.name || "Current Location";
          setQuery(name);
          router.push(`/fisherman-dashboard?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(name)}`);
        } catch {
          router.push(`/fisherman-dashboard?lat=${latitude}&lon=${longitude}&name=Current%20Location`);
        }
        setLoading(false);
      },
      () => {
        alert("Please allow location access to use this feature.");
        setLoading(false);
      }
    );
  };

  const isWhite = theme === "white";
  
  const formClasses = isWhite 
    ? "bg-slate-100 border-slate-300 focus-within:border-sky-500 shadow-sm"
    : "bg-[#0077B6]/20 border-[#00B4D8]/30 focus-within:border-[#00F5D4]/60 shadow-[0_0_15px_rgba(0,180,216,0.1)]";

  const inputClasses = isWhite
    ? "text-slate-800 placeholder:text-slate-400"
    : "text-[#CAF0F8] placeholder:text-[#90E0EF]/50";

  const searchBtnClasses = isWhite 
    ? "text-slate-500 hover:bg-slate-200" 
    : "text-[#90E0EF] hover:bg-[#0077B6]/50";

  const locateBtnClasses = isWhite 
    ? "text-sky-600 hover:bg-sky-100" 
    : "text-[#00F5D4] hover:bg-[#00F5D4]/20";

  const dividerClasses = isWhite ? "bg-slate-300" : "bg-[#00B4D8]/30";

  return (
    <form 
      onSubmit={handleSearch} 
      className={`flex items-center gap-1 mt-3 backdrop-blur-md rounded-full px-2 py-1 w-full max-w-sm transition-all border ${formClasses}`}
    >
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Search port or city..." 
        className={`bg-transparent border-none outline-none px-3 py-1.5 w-full text-sm font-medium ${inputClasses}`} 
      />
      
      <button 
        type="submit" 
        disabled={loading}
        className={`p-2 rounded-full transition-colors ${searchBtnClasses}`}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
      </button>

      <div className={`w-px h-5 mx-1 ${dividerClasses}`} />

      <button 
        type="button" 
        onClick={locateMe}
        disabled={loading}
        className={`p-2 rounded-full transition-colors ${locateBtnClasses}`}
        title="Use Device Location"
      >
        <MapPin className="w-4 h-4" />
      </button>
    </form>
  );
}