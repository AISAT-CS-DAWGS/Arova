"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ theme = "ocean" }: { theme?: "ocean" | "white" | "black" }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "DASHBOARD", href: "/fisherman-dashboard" },
    { name: "LOGIN", href: "/login" },
  ];

  const isWhite = theme === "white";
  const baseText = isWhite ? "text-slate-500" : "text-[#90E0EF]/70";
  const hoverText = isWhite ? "hover:text-sky-700" : "hover:text-[#CAF0F8]";
  const activeText = isWhite ? "text-sky-700 font-bold" : "text-[#CAF0F8]";

  return (
    <header className="w-full pt-10 pb-4 relative z-20">
      <nav className={`flex justify-center items-center gap-10 text-sm font-semibold tracking-widest ${baseText}`}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                isActive ? activeText : hoverText
              } transition-colors duration-300`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}