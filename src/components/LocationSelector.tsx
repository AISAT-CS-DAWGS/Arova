"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Loader2, AlertCircle } from "lucide-react";

export default function LocationSelector({ 
  initialName, 
  theme = "ocean" 
}: { 
  initialName: string;
  theme?: "ocean" | "white" | "black";
}) {
  const [query, setQuery] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Automatically dismiss the error message after 4 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const { lat, lon, name } = data[0];
        setQuery(name);
        router.push(`/fisherman-dashboard?lat=${lat}&lon=${lon}&name=${encodeURIComponent(name)}`);
      } else {
        setError("Location not found. Try a valid coastal city or port.");
      }
    } catch (err) {
      console.error("Geocoding failed", err);
      setError("Failed to search location. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      return setError("Geolocation is not supported by your browser.");
    }
    
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`);
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
        setError("Please allow location access to use this feature.");
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
    <div className="relative w-full max-w-sm mt-3">
      <form 
        onSubmit={handleSearch} 
        className={`flex items-center gap-1 backdrop-blur-md rounded-full px-2 py-1 w-full transition-all border ${formClasses}`}
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

      {/* Elegant Error UI */}
      {error && (
        <div className="absolute top-full left-0 mt-3 w-full bg-red-950/80 border border-red-500/50 backdrop-blur-xl rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2 text-red-400 text-sm font-medium z-50">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}