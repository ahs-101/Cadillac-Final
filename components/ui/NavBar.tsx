"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Car", href: "#car" },
  { label: "Race", href: "#race" },
  { label: "Drivers", href: "#drivers" },
  { label: "Fan Club", href: "#fanclub" },
  { label: "Partners", href: "/partners" },
  { label: "Store", href: "https://shop.cadillacf1team.com", external: true },
  { label: "Calendar", href: "#race" },
];

export default function NavBar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#race"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Calendar
            </a>
            <a
              href="/news"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              News
            </a>
          </nav>

          {/* Center Logo */}
          <a href="#home" className="absolute left-1/2 -translate-x-1/2">
            <div className="text-center">
              <div className="text-white font-bold tracking-[0.25em] text-sm uppercase">
                Cadillac
              </div>
              <div className="text-white/50 tracking-[0.4em] text-[9px] uppercase">
                Formula 1® Team
              </div>
            </div>
          </a>

          {/* Right Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/partners"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Partners
            </a>
            <a
              href="https://shop.cadillacf1team.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              Store
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-1 cursor-pointer group"
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-white/60 group-hover:bg-white transition-colors" />
              <span className="w-3 h-px bg-white/60 group-hover:bg-white transition-colors" />
            </button>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-1 cursor-pointer group ml-auto"
            aria-label="Open menu"
          >
            <span className="w-6 h-px bg-white/70 group-hover:bg-white transition-colors" />
            <span className="w-4 h-px bg-white/70 group-hover:bg-white transition-colors" />
          </button>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
              <div className="text-center">
                <div className="text-white font-bold tracking-[0.25em] text-sm uppercase">
                  Cadillac
                </div>
                <div className="text-white/40 tracking-[0.4em] text-[9px] uppercase">
                  Formula 1® Team
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-white text-2xl transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col justify-center flex-1 px-10 gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => !item.external && setMenuOpen(false)}
                  className="text-4xl font-light tracking-tight text-white/80 hover:text-white transition-colors border-b border-white/10 pb-6"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-10 pb-8 flex gap-6 flex-wrap">
              {["Instagram", "X", "YouTube", "LinkedIn", "TikTok"].map((s) => (
                <span
                  key={s}
                  className="text-xs uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
