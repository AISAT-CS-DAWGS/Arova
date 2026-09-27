"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {
  Menu,
  ChevronDown,
  Wind,
  Eye,
  CloudRain,
  Waves,
  Thermometer,
  Timer,
  Mic,
  AlertTriangle,
  Activity,
  Compass,
  Navigation,
  Navigation2,
  Wifi,
  WifiOff,
  Palette,
  Check
} from "lucide-react";
import EEZMap from "@/components/EEZMap";
import PFZMap from "@/components/PFZMap";
import LocationSelector from "@/components/LocationSelector";
import { SUPPORTED_LANGUAGES, LanguageCode, translate } from "@/lib/translations";

export type ThemeMode = "ocean" | "white" | "black";
export type SignalLevel = "good" | "moderate" | "weak" | "offline";

export interface OceanMetricItem {
  main: string;
  sub: string;
  color?: string;
  key?: string;
}

export interface OceanDataPayload {
  wind: OceanMetricItem;
  visibility: OceanMetricItem;
  conditions: OceanMetricItem;
  temp: OceanMetricItem;
  waveHeight: OceanMetricItem;
  wavePeriod: OceanMetricItem;
  waveDirection: OceanMetricItem;
  swellHeight: OceanMetricItem;
  swellPeriod: OceanMetricItem;
  currentVelocity: OceanMetricItem;
  currentDirection: OceanMetricItem;
}

interface Props {
  initialData: OceanDataPayload | null;
  locationName: string;
}

export default function FishermanDashboardView({ initialData, locationName }: Props) {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [theme, setTheme] = useState<ThemeMode>("ocean");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // --- 1. NETWORK STATUS & SIGNAL STRENGTH LOGIC ---
  const [isOnline, setIsOnline] = useState(true);
  const [signal, setSignal] = useState<SignalLevel>("good");

  useEffect(() => {
    const updateNetworkStatus = () => {
      const online = typeof navigator !== "undefined" ? navigator.onLine : true;
      setIsOnline(online);

      if (!online) {
        setSignal("offline");
        return;
      }

      // Check Network Information API if supported by the browser
      const navConn = (navigator as unknown as { connection?: { effectiveType?: string; rtt?: number } }).connection;
      if (navConn) {
        const type = navConn.effectiveType;
        const rtt = navConn.rtt ?? 100;

        if (type === "4g" && rtt < 250) {
          setSignal("good");
        } else if (type === "3g" || (rtt >= 250 && rtt < 600)) {
          setSignal("moderate");
        } else {
          setSignal("weak");
        }
      } else {
        setSignal("good");
      }
    };

    updateNetworkStatus();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    const navConn = (navigator as unknown as { connection?: EventTarget }).connection;
    if (navConn) {
      navConn.addEventListener("change", updateNetworkStatus);
    }

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
      if (navConn) {
        navConn.removeEventListener("change", updateNetworkStatus);
      }
    };
  }, []);

  const t = (key: string) => translate(key, lang);

  // --- THEME COLOR TOKENS ---
  const themeClasses = {
    ocean: {
      wrapper: "bg-[#03045E] text-white",
      greetingGrad: "from-white via-[#CAF0F8] to-[#90E0EF]",
      controlPill: "bg-white/5 border-[#00B4D8]/30 text-[#CAF0F8]",
      cardBg: "bg-gradient-to-r from-[#0077B6]/40 to-[#0077B6]/20 border-[#00B4D8]/30 text-white shadow-[#03045E]/50",
      cardIconText: "text-[#90E0EF]",
      cardSub: "text-[#CAF0F8]/70",
      dropdownBg: "bg-[#03045E]/95 border-[#00B4D8]/40 text-[#CAF0F8]",
      dropdownHover: "hover:bg-[#0077B6]/40",
      mapBorder: "border-[#0077B6]/30 bg-[#0077B6]/10",
      fab: "bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white border-[#CAF0F8]/20",
    },
    white: {
      wrapper: "bg-[#F8FAFC] text-slate-900",
      greetingGrad: "from-slate-900 via-sky-900 to-cyan-800",
      controlPill: "bg-white border-slate-300 text-slate-800 shadow-md",
      cardBg: "bg-white border-slate-200 text-slate-900 shadow-lg shadow-slate-200/60",
      cardIconText: "text-sky-700",
      cardSub: "text-slate-500",
      dropdownBg: "bg-white border-slate-300 text-slate-800 shadow-xl",
      dropdownHover: "hover:bg-slate-100",
      mapBorder: "border-slate-300 bg-slate-100",
      fab: "bg-gradient-to-br from-sky-600 to-blue-700 text-white border-white",
    },
    black: {
      wrapper: "bg-black text-white",
      greetingGrad: "from-white via-neutral-300 to-cyan-400",
      controlPill: "bg-[#111111] border-neutral-800 text-white shadow-lg",
      cardBg: "bg-[#0E0E10] border-neutral-800 text-white shadow-black",
      cardIconText: "text-cyan-400",
      cardSub: "text-neutral-400",
      dropdownBg: "bg-[#111111] border-neutral-800 text-white shadow-2xl",
      dropdownHover: "hover:bg-neutral-800",
      mapBorder: "border-neutral-800 bg-[#0E0E10]",
      fab: "bg-gradient-to-br from-cyan-500 to-emerald-500 text-black border-cyan-300/30",
    },
  }[theme];

  // Helper for dynamic translation of metric status values
  const translateMetricValue = (item: OceanMetricItem) => {
    if (item.main.startsWith("Pushing")) {
      const dir = item.main.replace("Pushing", "").trim();
      return `${t("pushing")} ${dir}`;
    }
    if (item.main.startsWith("Flowing")) {
      const dir = item.main.replace("Flowing", "").trim();
      return `${t("flowing")} ${dir}`;
    }
    return t(item.key || item.main);
  };

  return (
    <div className={`min-h-screen font-sans relative pb-28 transition-colors duration-500 ${themeClasses.wrapper}`}>
      <Navbar theme={theme} />

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 rounded-xl transition-colors md:hidden opacity-80 hover:opacity-100">
              <Menu className="w-7 h-7" />
            </button>
            <div>
              <h1 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r tracking-tight ${themeClasses.greetingGrad}`}>
                {t("greetings")}
              </h1>
              <LocationSelector initialName={locationName} theme={theme} />
            </div>
          </div>

          {/* Status Controls: Signal, Indic Languages, Theme */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 1. Network Status Pill */}
            <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-xl text-xs md:text-sm font-bold shadow-lg ${themeClasses.controlPill}`}>
              {isOnline ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        signal === "good" ? "bg-emerald-400" : signal === "moderate" ? "bg-amber-400" : "bg-orange-500"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        signal === "good" ? "bg-emerald-400" : signal === "moderate" ? "bg-amber-400" : "bg-orange-500"
                      }`}
                    />
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wifi className="w-4 h-4 text-emerald-400" />
                    <span>{t(`signal_${signal}`)}</span>
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-1.5 text-red-500">
                  <WifiOff className="w-4 h-4" />
                  <span>{t("signal_offline")}</span>
                </div>
              )}
            </div>

            {/* 2. Indic Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsLangOpen(!isLangOpen);
                  setIsThemeOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl text-xs md:text-sm font-bold transition-all shadow-lg ${themeClasses.controlPill}`}
              >
                <span>{SUPPORTED_LANGUAGES.find((l) => l.code === lang)?.nativeLabel || "English"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
              </button>

              {isLangOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-2xl border backdrop-blur-2xl shadow-2xl z-50 overflow-hidden py-1.5 ${themeClasses.dropdownBg}`}>
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs md:text-sm font-semibold flex items-center justify-between transition-colors ${themeClasses.dropdownHover} ${
                        lang === l.code ? "text-cyan-400 font-bold" : ""
                      }`}
                    >
                      <span>{l.nativeLabel} ({l.label})</span>
                      {lang === l.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Theme Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsThemeOpen(!isThemeOpen);
                  setIsLangOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl text-xs md:text-sm font-bold transition-all shadow-lg ${themeClasses.controlPill}`}
              >
                <Palette className="w-4 h-4" />
                <span className="capitalize">{t(`theme_${theme}`)}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isThemeOpen ? "rotate-180" : ""}`} />
              </button>

              {isThemeOpen && (
                <div className={`absolute right-0 mt-2 w-44 rounded-2xl border backdrop-blur-2xl shadow-2xl z-50 overflow-hidden py-1.5 ${themeClasses.dropdownBg}`}>
                  {(["ocean", "white", "black"] as ThemeMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setTheme(m);
                        setIsThemeOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs md:text-sm font-semibold flex items-center justify-between transition-colors ${themeClasses.dropdownHover} ${
                        theme === m ? "text-cyan-400 font-bold" : ""
                      }`}
                    >
                      <span className="capitalize">{t(`theme_${m}`)}</span>
                      {theme === m && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actionable Metrics Grid */}
        {initialData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12">
            <MetricCard
              icon={<Wind />}
              title={t("wind")}
              value={translateMetricValue(initialData.wind)}
              sub={initialData.wind.sub}
              valueColor={initialData.wind.color}
              themeClasses={themeClasses}
              theme={theme} // <-- ADD THIS TO ALL CARDS
            />
            <MetricCard
              icon={<Eye />}
              title={t("visibility")}
              value={translateMetricValue(initialData.visibility)}
              sub={initialData.visibility.sub}
              valueColor={initialData.visibility.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<CloudRain />}
              title={t("conditions")}
              value={translateMetricValue(initialData.conditions)}
              sub={initialData.conditions.sub}
              valueColor={initialData.conditions.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<Thermometer />}
              title={t("sea_temp")}
              value={translateMetricValue(initialData.temp)}
              sub={initialData.temp.sub}
              valueColor={initialData.temp.color}
              themeClasses={themeClasses}
              theme={theme}
            />

            <MetricCard
              icon={<Waves />}
              title={t("wave_height")}
              value={translateMetricValue(initialData.waveHeight)}
              sub={initialData.waveHeight.sub}
              valueColor={initialData.waveHeight.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<Timer />}
              title={t("wave_period")}
              value={translateMetricValue(initialData.wavePeriod)}
              sub={initialData.wavePeriod.sub}
              valueColor={initialData.wavePeriod.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<Compass />}
              title={t("wave_direction")}
              value={translateMetricValue(initialData.waveDirection)}
              sub={initialData.waveDirection.sub}
              valueColor={initialData.waveDirection.color}
              themeClasses={themeClasses}
              theme={theme}
            />

            <MetricCard
              icon={<Activity />}
              title={t("swell_height")}
              value={translateMetricValue(initialData.swellHeight)}
              sub={initialData.swellHeight.sub}
              valueColor={initialData.swellHeight.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<Timer />}
              title={t("swell_period")}
              value={translateMetricValue(initialData.swellPeriod)}
              sub={initialData.swellPeriod.sub}
              valueColor={initialData.swellPeriod.color}
              themeClasses={themeClasses}
              theme={theme}
            />

            <MetricCard
              icon={<Navigation />}
              title={t("current_velocity")}
              value={translateMetricValue(initialData.currentVelocity)}
              sub={initialData.currentVelocity.sub}
              valueColor={initialData.currentVelocity.color}
              themeClasses={themeClasses}
              theme={theme}
            />
            <MetricCard
              icon={<Navigation2 />}
              title={t("current_direction")}
              value={translateMetricValue(initialData.currentDirection)}
              sub={initialData.currentDirection.sub}
              valueColor={initialData.currentDirection.color}
              themeClasses={themeClasses}
              theme={theme}
            />
          </div>
        
        ) : (
          <div className="bg-red-500/10 border border-red-500/30 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-4 mb-12 shadow-lg">
            <AlertTriangle className="w-12 h-12 text-red-400" />
            <div>
              <h2 className="text-2xl font-bold text-red-400 mb-2">{t("live_data_unavailable")}</h2>
              <p className="max-w-lg mx-auto opacity-80">{t("data_error_message")}</p>
            </div>
          </div>
        )}

        {/* Maps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* EEZ Map */}
          <div className={`relative aspect-video w-full rounded-[2.5rem] overflow-hidden border shadow-lg ${themeClasses.mapBorder}`}>
            <div className="absolute top-4 left-6 md:left-8 z-[1000] pointer-events-none drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold tracking-wide">{t("eez_map")}</h3>
              <p className="text-xs mt-1 uppercase tracking-widest font-semibold opacity-75">{t("eez_desc")}</p>
            </div>
            <EEZMap />
          </div>

          {/* PFZ Map */}
          <div className={`relative aspect-video w-full rounded-[2.5rem] overflow-hidden border shadow-lg ${themeClasses.mapBorder} group`}>
            <div className="absolute top-4 left-6 md:left-8 z-[1000] pointer-events-none drop-shadow-md">
              <h3 className="text-xl md:text-2xl font-bold tracking-wide text-cyan-400">{t("pfz_map")}</h3>
              <p className="text-xs mt-1 uppercase tracking-widest font-semibold opacity-75">{t("pfz_desc")}</p>
            </div>
            <div className="absolute top-6 right-6 z-[1000] flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">{t("live")}</span>
            </div>
            <PFZMap />
          </div>
        </div>
      </main>

      {/* Floating Action Button (Voice Assistant) */}
      <button
        type="button"
        className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-300 group z-50 border-2 ${themeClasses.fab}`}
      >
        <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current" />
        <Mic className="w-7 h-7 md:w-8 md:h-8 transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
function MetricCard({
  icon,
  title,
  value,
  sub,
  valueColor = "",
  themeClasses,
  theme,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub?: string;
  valueColor?: string;
  themeClasses: {
    cardBg: string;
    cardIconText: string;
    cardSub: string;
  };
  theme: ThemeMode;
}) {
  const finalColor = (theme === "white" && valueColor === "text-white") 
    ? "text-slate-900" 
    : valueColor;

  return (
    <div className={`backdrop-blur-lg border rounded-[2rem] p-5 flex flex-col justify-center transition-all duration-300 group hover:scale-[1.02] ${themeClasses.cardBg}`}>
      <div className={`flex items-center gap-2 mb-2 ${themeClasses.cardIconText}`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
          // Added shrink-0 so the icon doesn't squish if the title is long
          className: "w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity shrink-0", 
        })}
        <span className="text-sm font-semibold tracking-wide">{title}</span>
      </div>
      
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-auto">
        <span className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight break-words ${finalColor}`}>
          {value}
        </span>
        {sub && (
          // whitespace-nowrap ensures (31.51°C) or (1.18 M) stays on one single line
          <span className={`text-sm md:text-base font-medium whitespace-nowrap ${themeClasses.cardSub}`}>
            ({sub})
          </span>
        )}
      </div>
    </div>
  );
}