"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "FEATURES", href: "/features" },
    { name: "DASHBOARD", href: "/dashboard" },
    { name: "LOGIN", href: "/login" },
  ];

  return (
    <header className="w-full pt-10 pb-4 relative z-20">
      <nav className="flex justify-center items-center gap-10 text-sm font-semibold tracking-widest text-[#90E0EF]/70">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${
                isActive ? "text-[#CAF0F8]" : "hover:text-[#CAF0F8]"
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