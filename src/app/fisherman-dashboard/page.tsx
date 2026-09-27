import React from "react";
import FishermanDashboardView, { OceanDataPayload } from "@/components/FishermanDashboardView";

function getWindStatus(speedMs: number) {
  const speedKmh = speedMs * 3.6;
  if (speedKmh >= 40) return { key: "danger_high", status: "Danger (High)", color: "text-red-400" };
  if (speedKmh >= 20) return { key: "strong", status: "Strong", color: "text-amber-400" };
  if (speedKmh >= 10) return { key: "moderate", status: "Moderate", color: "text-white" };
  return { key: "calm", status: "Calm", color: "text-emerald-400" };
}

function getWaveStatus(heightM: number) {
  if (heightM >= 2.5) return { key: "danger_high", status: "Danger (High)", color: "text-red-400" };
  if (heightM >= 1.2) return { key: "moderate", status: "Moderate", color: "text-amber-400" };
  if (heightM >= 0.5) return { key: "smooth", status: "Smooth", color: "text-white" };
  return { key: "calm", status: "Calm", color: "text-emerald-400" };
}

function getSwellStatus(heightM: number) {
  if (heightM >= 2.0) return { key: "heavy_swell", status: "Heavy Swell", color: "text-red-400" };
  if (heightM >= 1.0) return { key: "moderate_swells", status: "Moderate", color: "text-amber-400" };
  return { key: "light_swell", status: "Light Swell", color: "text-emerald-400" };
}

function getVisibilityStatus(visKm: number) {
  if (visKm < 2) return { key: "poor", status: "Poor", color: "text-red-400" };
  if (visKm < 5) return { key: "moderate", status: "Moderate", color: "text-amber-400" };
  return { key: "good", status: "Good", color: "text-emerald-400" };
}

function getWavePeriodStatus(seconds: number) {
  if (seconds < 6) return { key: "choppy", status: "Choppy", color: "text-amber-400" };
  if (seconds <= 9) return { key: "moderate_swells", status: "Moderate Swells", color: "text-white" };
  return { key: "long_swells", status: "Long Swells", color: "text-emerald-400" };
}

function getCurrentVelocityStatus(velocityKmh: number) {
  if (velocityKmh >= 2.0) return { key: "strong", status: "Strong", color: "text-amber-400" };
  if (velocityKmh >= 0.5) return { key: "moderate", status: "Moderate", color: "text-white" };
  return { key: "weak", status: "Weak", color: "text-emerald-400" };
}

function getDirection(degree: number | undefined | null) {
  if (degree === undefined || degree === null) return "N/A";
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const val = Math.floor(degree / 45 + 0.5);
  return directions[val % 8];
}

async function getOceanData(lat: number, lon: number): Promise<OceanDataPayload | null> {
  try {
    const owmKey = process.env.NEXT_PUBLIC_OWM_API_KEY;
    if (!owmKey) throw new Error("OpenWeatherMap API Key is missing.");

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${owmKey}&units=metric`,
      { next: { revalidate: 1800 } }
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data.");
    const weatherData = await weatherRes.json();

    const marineRes = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_period,swell_wave_height,swell_wave_period,wave_direction,ocean_current_velocity,ocean_current_direction&timezone=auto`,
      { next: { revalidate: 1800 } }
    );
    if (!marineRes.ok) throw new Error("Failed to fetch marine data.");
    const marineData = await marineRes.json();

    const currentHourIndex = new Date().getHours();

    const waveHeightRaw = marineData.hourly?.wave_height?.[currentHourIndex];
    const wavePeriodRaw = marineData.hourly?.wave_period?.[currentHourIndex];
    const swellHeightRaw = marineData.hourly?.swell_wave_height?.[currentHourIndex];
    const swellPeriodRaw = marineData.hourly?.swell_wave_period?.[currentHourIndex];
    const waveDirRaw = marineData.hourly?.wave_direction?.[currentHourIndex];
    const currentVelRaw = marineData.hourly?.ocean_current_velocity?.[currentHourIndex];
    const currentDirRaw = marineData.hourly?.ocean_current_direction?.[currentHourIndex];

    const windMs = weatherData.wind?.speed ?? 0;
    const visKm = (weatherData.visibility ?? 10000) / 1000;
    const tempRaw = weatherData.main?.temp ?? 0;
    const conditions = weatherData.weather?.[0]?.main ?? "Clear";

    const wind = getWindStatus(windMs);
    const waves = getWaveStatus(waveHeightRaw ?? 0);
    const visibility = getVisibilityStatus(visKm);
    const wavePeriod = getWavePeriodStatus(wavePeriodRaw ?? 0);
    const swell = getSwellStatus(swellHeightRaw ?? 0);
    const swellPeriod = getWavePeriodStatus(swellPeriodRaw ?? 0);
    const currentVel = getCurrentVelocityStatus(currentVelRaw ?? 0);
    const waveDirStr = getDirection(waveDirRaw);
    const currentDirStr = getDirection(currentDirRaw);

    return {
      wind: { main: wind.status, key: wind.key, sub: `${(windMs * 3.6).toFixed(1)} km/h`, color: wind.color },
      visibility: { main: visibility.status, key: visibility.key, sub: `${visKm.toFixed(1)} km`, color: visibility.color },
      conditions: { main: conditions, key: conditions.toLowerCase(), sub: "Sky status", color: "text-white" },
      temp: { main: "Optimal", key: "optimal", sub: `${tempRaw}°C`, color: "text-white" },

      waveHeight:
        waveHeightRaw !== null && waveHeightRaw !== undefined
          ? { main: waves.status, key: waves.key, sub: `${waveHeightRaw} M`, color: waves.color }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
      wavePeriod:
        wavePeriodRaw !== null && wavePeriodRaw !== undefined
          ? { main: wavePeriod.status, key: wavePeriod.key, sub: `${wavePeriodRaw} s`, color: wavePeriod.color }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },

      swellHeight:
        swellHeightRaw !== null && swellHeightRaw !== undefined
          ? { main: swell.status, key: swell.key, sub: `${swellHeightRaw} M`, color: swell.color }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
      swellPeriod:
        swellPeriodRaw !== null && swellPeriodRaw !== undefined
          ? { main: swellPeriod.status, key: swellPeriod.key, sub: `${swellPeriodRaw} s`, color: swellPeriod.color }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
      waveDirection:
        waveDirRaw !== null && waveDirRaw !== undefined
          ? { main: `Pushing ${waveDirStr}`, sub: `${waveDirRaw}°`, color: "text-white" }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
      currentVelocity:
        currentVelRaw !== null && currentVelRaw !== undefined
          ? { main: currentVel.status, key: currentVel.key, sub: `${currentVelRaw} km/h`, color: currentVel.color }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
      currentDirection:
        currentDirRaw !== null && currentDirRaw !== undefined
          ? { main: `Flowing ${currentDirStr}`, sub: `${currentDirRaw}°`, color: "text-white" }
          : { main: "Inland", key: "inland", sub: "N/A", color: "opacity-50" },
    };
  } catch (error) {
    console.error("Ocean data fetch failed:", error);
    return null;
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const lat = parseFloat((params?.lat as string) || "9.9312");
  const lon = parseFloat((params?.lon as string) || "76.2673");
  const locName = (params?.name as string) || "Kochi, Kerala";

  const data = await getOceanData(lat, lon);

  return <FishermanDashboardView initialData={data} locationName={locName} />;
}