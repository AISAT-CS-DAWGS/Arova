import React from "react";
import {
  AlertTriangle,
  Brain,
  Satellite,
  Database,
  Activity,
  CloudRain,
  Languages,
  Map,
  ShieldCheck,
  Eye,
  Layers3,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Grainient from "@/components/Gradient";

const features = [
  {
    number: "01",
    icon: Brain,
    title: "Multi-Agent Collaborative AI",
    description:
      "Not just a chatbot, but a virtual mission control. Powered by specialized AI agents (Planning, Oceanographic, Meteorological, and Geospatial) that autonomously decompose complex user queries, fetch real-time satellite data, and synthesize evidence-based recommendations.",
  },
  {
    number: "02",
    icon: Languages,
    title: "Vernacular Conversational Interface",
    description:
      "Breaking language barriers at sea. Features native support for regional Indian languages. Fishermen can speak or type queries in Tamil, Hindi, Malayalam, and other supported languages and receive understandable maritime advice.",
  },
  {
    number: "03",
    icon: Map,
    title: "Dynamic Geospatial Intelligence",
    description:
      "From raw data to visual clarity. Transforms complex satellite outputs into interactive, real-time maps. Instantly visualizes Potential Fishing Zones, weather patterns, and navigation-related information.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Proactive Safety & Geofencing",
    description:
      "Your automated maritime guardian. Designed to trigger proactive warnings for approaching cyclones, hazardous wave conditions, restricted Marine Protected Areas, and maritime boundaries.",
  },
  {
    number: "05",
    icon: Eye,
    title: "Transparent & Explainable Reasoning",
    description:
      "AROVA doesn't just give answers; it shows its work. Recommendations can expose supporting data points, source information, and the logical reasoning used to derive the advice.",
  },
  {
    number: "06",
    icon: Layers3,
    title: "Heterogeneous Data Fusion",
    description:
      "Connecting the dots across the ocean. Seamlessly correlates satellite observations, oceanographic information, weather forecasts, cyclone information, and maritime datasets into a unified intelligence stream.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03045E] text-white">

      {/* ======================================================= */}
      {/* SAME BACKGROUND AS HOME PAGE                            */}
      {/* ======================================================= */}

      <div className="fixed inset-0 z-0">
        <Grainient
          color1="#03045E"
          color2="#0077B6"
          color3="#90E0EF"
          timeSpeed={0.25}
          className="h-full w-full opacity-80"
        />

        {/* Slight readability layer */}
        <div className="absolute inset-0 bg-[#03045E]/10" />
      </div>

      {/* ======================================================= */}
      {/* CONTENT                                                  */}
      {/* ======================================================= */}

      <div className="relative z-10 flex min-h-screen flex-col">

        <Navbar />

        <main className="flex-1">

          <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">

            {/* ================================================= */}
            {/* HEADER                                            */}
            {/* ================================================= */}

            <section className="mx-auto mb-20 max-w-4xl text-center">

              <div className="mb-6 inline-flex items-center rounded-full border border-[#90E0EF]/40 bg-[#03045E]/35 px-5 py-2.5 backdrop-blur-sm">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#90E0EF]">
                  About AROVA
                </span>
              </div>

              <h1 className="text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">

                Bridging the Gap Between

                <br />

                <span className="bg-gradient-to-r from-white via-[#90E0EF] to-[#00B4D8] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,180,216,0.25)]">
                  Satellite Data and Human Action
                </span>

              </h1>

              <p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-[#CAF0F8] md:text-xl">
                Turning terabytes of ocean data into life-saving decisions.
              </p>

            </section>

            {/* ================================================= */}
            {/* CHALLENGE + SOLUTION                              */}
            {/* ================================================= */}

            <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">

              {/* CHALLENGE */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-[#0077B6]/50 bg-[#03045E]/55 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#00B4D8]/70 hover:bg-[#03045E]/65 md:p-10">

                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#0077B6] to-transparent" />

                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#0077B6]/50 bg-[#0077B6]/20">
                  <AlertTriangle className="h-8 w-8 text-[#90E0EF]" />
                </div>

                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#90E0EF]">
                  The Challenge
                </p>

                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  The Challenge
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-[#CAF0F8]/85">
                  Every day, ISRO and global agencies generate massive volumes
                  of oceanographic data — Sea Surface Temperature, Chlorophyll-a,
                  wave heights, and cyclone forecasts. But fishermen, coastal
                  authorities, and researchers cannot parse raw NetCDF files or
                  complex meteorological charts. Critical information remains
                  locked in scientific formats, inaccessible to those who need
                  it most.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                  <div className="rounded-2xl border border-[#0077B6]/35 bg-[#03045E]/45 p-5 transition-all duration-300 hover:border-[#00B4D8]/50 hover:bg-[#0077B6]/15">

                    <div className="text-2xl font-black text-[#90E0EF]">
                      100+ TB
                    </div>

                    <div className="mt-2 text-sm leading-snug text-[#90E0EF]/70">
                      Daily satellite data generated
                    </div>

                  </div>

                  <div className="rounded-2xl border border-[#0077B6]/35 bg-[#03045E]/45 p-5 transition-all duration-300 hover:border-[#00B4D8]/50 hover:bg-[#0077B6]/15">

                    <div className="text-2xl font-black text-[#90E0EF]">
                      10M+
                    </div>

                    <div className="mt-2 text-sm leading-snug text-[#90E0EF]/70">
                      Indian fishermen at sea
                    </div>

                  </div>

                  <div className="rounded-2xl border border-[#0077B6]/35 bg-[#03045E]/45 p-5 transition-all duration-300 hover:border-[#00B4D8]/50 hover:bg-[#0077B6]/15">

                    <div className="text-2xl font-black text-[#90E0EF]">
                      0
                    </div>

                    <div className="mt-2 text-sm leading-snug text-[#90E0EF]/70">
                      Natural language marine interfaces
                    </div>

                  </div>

                </div>
              </div>

              {/* SOLUTION */}
              <div className="group relative overflow-hidden rounded-[2rem] border border-[#00B4D8]/50 bg-[#0077B6]/25 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#90E0EF]/70 hover:bg-[#0077B6]/30 md:p-10">

                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#00B4D8] to-transparent" />

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#90E0EF]/10 blur-3xl" />

                <div className="relative z-10">

                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#90E0EF]/40 bg-[#00B4D8]/20">
                    <Brain className="h-8 w-8 text-[#CAF0F8]" />
                  </div>

                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#CAF0F8]">
                    The Solution
                  </p>

                  <h2 className="mt-3 text-3xl font-black md:text-4xl">
                    Enter Arova
                  </h2>

                  <p className="mt-5 text-lg leading-relaxed text-[#CAF0F8]/90">
                    Arova acts as your intelligent marine co-pilot. Using
                    Agentic AI, we translate terabytes of satellite data into
                    natural language answers, interactive maps, and life-saving
                    alerts. Ask in your language, get evidence-based
                    recommendations, and navigate the seas with confidence.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-[#90E0EF]/25 bg-[#03045E]/25 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-[#00B4D8]/15">

                      <div className="text-lg font-black text-white">
                        Multi-Agent AI
                      </div>

                      <div className="mt-2 text-sm leading-snug text-[#CAF0F8]/70">
                        Collaborative reasoning
                      </div>

                    </div>

                    <div className="rounded-2xl border border-[#90E0EF]/25 bg-[#03045E]/25 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-[#00B4D8]/15">

                      <div className="text-lg font-black text-white">
                        10+ Languages
                      </div>

                      <div className="mt-2 text-sm leading-snug text-[#CAF0F8]/70">
                        Including all Indic scripts
                      </div>

                    </div>

                    <div className="rounded-2xl border border-[#90E0EF]/25 bg-[#03045E]/25 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-[#00B4D8]/15">

                      <div className="text-lg font-black text-white">
                        Real-Time
                      </div>

                      <div className="mt-2 text-sm leading-snug text-[#CAF0F8]/70">
                        Live ISRO & INCOIS data
                      </div>

                    </div>

                  </div>

                </div>
              </div>

            </section>

            {/* ================================================= */}
            {/* DATA SOURCES                                      */}
            {/* ================================================= */}

            <section className="mt-8 rounded-3xl border border-[#0077B6]/45 bg-[#03045E]/50 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-8">

              <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

                <div>

                  <p className="text-base font-bold tracking-wide text-[#CAF0F8]">
                    Built for Smart India Hackathon 2026
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <span className="rounded-full border border-[#0077B6]/50 bg-[#0077B6]/15 px-4 py-2 text-xs font-bold text-[#90E0EF]">
                      Problem ID: SIH26176
                    </span>

                    <span className="rounded-full border border-[#0077B6]/50 bg-[#0077B6]/15 px-4 py-2 text-xs font-bold text-[#90E0EF]">
                      Problem Creator: ISRO
                    </span>

                  </div>

                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-[#CAF0F8]/75">

                  <div className="flex flex-col items-center gap-2">
                    <Database className="h-6 w-6 text-[#90E0EF]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      INCOIS
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Satellite className="h-6 w-6 text-[#90E0EF]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      MOSDAC
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Activity className="h-6 w-6 text-[#90E0EF]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      IMD
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <CloudRain className="h-6 w-6 text-[#90E0EF]" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Open-Meteo
                    </span>
                  </div>

                </div>

              </div>

            </section>

            {/* ================================================= */}
            {/* SIX CORE FEATURES                                 */}
            {/* ================================================= */}

            <section id="features" className="mt-28">

              <div className="mx-auto max-w-3xl text-center">

                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#90E0EF]">
                  Core Capabilities
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
                  Six Core Features
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-[#CAF0F8]/80">
                  AROVA combines collaborative AI, multilingual interaction,
                  geospatial intelligence, safety analysis, explainability, and
                  heterogeneous data fusion into one marine intelligence platform.
                </p>

              </div>

              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <article
                      key={feature.number}
                      className="group relative overflow-hidden rounded-[1.75rem] border border-[#0077B6]/45 bg-[#03045E]/50 p-7 shadow-[0_15px_40px_rgba(0,0,0,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#00B4D8]/70 hover:bg-[#03045E]/60 md:p-8"
                    >

                      <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF] transition-all duration-300 group-hover:w-full" />

                      <div className="flex items-start justify-between">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0077B6]/50 bg-[#0077B6]/20 transition-all duration-300 group-hover:border-[#00B4D8]/60 group-hover:bg-[#00B4D8]/15">
                          <Icon className="h-7 w-7 text-[#90E0EF]" />
                        </div>

                        <span className="text-5xl font-black text-white/10 transition-colors duration-300 group-hover:text-[#90E0EF]/15">
                          {feature.number}
                        </span>

                      </div>

                      <h3 className="mt-7 text-xl font-black leading-tight text-white md:text-2xl">
                        {feature.title}
                      </h3>

                      <p className="mt-4 leading-relaxed text-[#CAF0F8]/75">
                        {feature.description}
                      </p>

                      <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#90E0EF]">

                        <span>Explore capability</span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />

                      </div>

                    </article>
                  );
                })}

              </div>
            </section>

            {/* ================================================= */}
            {/* FINAL CTA                                         */}
            {/* ================================================= */}

            <section className="mt-20 pb-12">

              <div className="relative overflow-hidden rounded-[2rem] border border-[#00B4D8]/50 bg-[#0077B6]/25 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md md:p-12">

                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#90E0EF]/10 blur-3xl" />

                <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#00B4D8]/10 blur-3xl" />

                <div className="relative z-10">

                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#90E0EF]">
                    AROVA
                  </p>

                  <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
                    Turning Marine Data Into Human Action
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-[#CAF0F8]/75">
                    A unified approach to conversational marine intelligence,
                    geospatial reasoning, safety, and evidence-based decisions.
                  </p>

                  <button
                    type="button"
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#90E0EF]/50 bg-[#0077B6] px-7 py-3 text-sm font-black text-white shadow-[0_0_20px_rgba(0,119,182,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00B4D8] hover:shadow-[0_0_25px_rgba(0,180,216,0.45)]"
                  >
                    Explore AROVA
                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>
              </div>

            </section>

          </div>
        </main>
      </div>
    </div>
  );
}