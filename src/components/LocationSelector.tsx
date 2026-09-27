"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, Loader2 } from "lucide-react";

export default function LocationSelector({ initialName }: { initialName: string }) {
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
        // ROUTE UPDATED TO /fisherman-dashboard
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
          // ROUTE UPDATED TO /fisherman-dashboard
          router.push(`/fisherman-dashboard?lat=${latitude}&lon=${longitude}&name=${encodeURIComponent(name)}`);
        } catch {
          // ROUTE UPDATED TO /fisherman-dashboard
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

  return (
    <form 
      onSubmit={handleSearch} 
      className="flex items-center gap-1 mt-3 bg-[#0077B6]/20 border border-[#00B4D8]/30 backdrop-blur-md rounded-full px-2 py-1 shadow-[0_0_15px_rgba(0,180,216,0.1)] w-full max-w-sm transition-all focus-within:border-[#00F5D4]/60"
    >
      <input 
        type="text" 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
        placeholder="Search port or city..." 
        className="bg-transparent border-none outline-none text-[#CAF0F8] px-3 py-1.5 w-full text-sm font-medium placeholder:text-[#90E0EF]/50" 
      />
      
      <button 
        type="submit" 
        disabled={loading}
        className="p-2 hover:bg-[#0077B6]/50 rounded-full text-[#90E0EF] transition-colors"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
      </button>

      <div className="w-px h-5 bg-[#00B4D8]/30 mx-1" />

      <button 
        type="button" 
        onClick={locateMe}
        disabled={loading}
        className="p-2 hover:bg-[#00F5D4]/20 rounded-full text-[#00F5D4] transition-colors"
        title="Use Device Location"
      >
        <MapPin className="w-4 h-4" />
      </button>
    </form>
  );
}