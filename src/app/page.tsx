import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Grainient from "@/components/Gradient";
import Navbar from "@/components/Navbar";
export default function ArovaLandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col font-sans bg-[#03045E]">
      
      {/* Background WebGL Layer */}
      <div className="absolute inset-0 z-0">
        <Grainient 
          color1="#03045E"
          color2="#0077B6"
          color3="#90E0EF"
          timeSpeed={0.25}
          className="w-full h-full opacity-80"
        />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col flex-1 w-full">
        
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 w-full pt-12 pb-32 text-center">
          
          <h1 className="text-6xl lg:text-[6.5rem] font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#90e0ef] to-[#00b4d8] drop-shadow-[0_0_35px_rgba(0,180,216,0.6)]">
            AROVA
          </h1>
          
          <p className="text-xl lg:text-2xl text-[#caf0f8]/85 leading-relaxed mb-10 font-medium max-w-2xl">
            Empowering fishermen, researchers, and authorities with real-time, conversational decision support for safer seas.
          </p>
          
          <Button 
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white border border-[#90e0ef]/40 rounded-full px-10 py-7 text-lg font-semibold group shadow-[0_0_20px_rgba(0,119,182,0.6)] transition-all duration-300"
          >
            Explore as Guest
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform text-[#caf0f8]" />
          </Button>
          
        </main>
      </div>
    </div>
  );
}