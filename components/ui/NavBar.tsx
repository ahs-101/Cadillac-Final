"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "The Car", href: "#car" },
  { label: "Race Calendar", href: "#race" },
  { label: "Drivers", href: "#drivers" },
  { label: "Fan Club", href: "#fanclub" },
  { label: "Partners", href: "https://www.cadillacf1team.com/partners", external: true },
  { label: "Store", href: "https://shop.cadillacf1team.com", external: true },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/cadillacf1" },
  { label: "X", href: "https://x.com/Cadillac_F1" },
  { label: "YouTube", href: "https://www.youtube.com/@CadillacF1TeamOfficial" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cadillacf1" },
  { label: "TikTok", href: "https://www.tiktok.com/discover/cadillac-f1-team" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex flex-col gap-[5px] w-5 h-4 justify-center">
      <span
        className="block h-px bg-white/70 transition-all duration-300 origin-center"
        style={{
          width: "20px",
          transform: open ? "rotate(45deg) translate(0, 5px)" : "none",
          opacity: open ? 1 : 0.7,
        }}
      />
      <span
        className="block h-px bg-white/70 transition-all duration-300"
        style={{
          width: "14px",
          opacity: open ? 0 : 0.7,
          transform: open ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      <span
        className="block h-px bg-white/70 transition-all duration-300 origin-center"
        style={{
          width: "20px",
          transform: open ? "rotate(-45deg) translate(0, -5px)" : "none",
          opacity: open ? 1 : 0.7,
        }}
      />
    </div>
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/92 backdrop-blur-md border-b border-white/[0.08]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation left">
            <a
              href="#race"
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              Calendar
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://www.cadillacf1team.com/news"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              News
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Center wordmark */}
          <a
            href="#home"
            className="absolute left-1/2 -translate-x-1/2 text-center transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Cadillac Formula 1 Team — Home"
          >
            <div className="text-white font-bold tracking-[0.25em] text-sm uppercase leading-none">
              Cadillac
            </div>
            <div className="text-white/50 tracking-[0.4em] text-[9px] uppercase mt-0.5">
              Formula 1® Team
            </div>
          </a>

          {/* Right desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation right">
            <a
              href="https://www.cadillacf1team.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              Partners
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://shop.cadillacf1team.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              Store
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
            </a>
            {/* Hamburger — 44×44 touch target */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative flex items-center justify-center cursor-pointer"
              style={{ width: 44, height: 44 }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </nav>

          {/* Mobile hamburger — 44×44 touch target */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden relative flex items-center justify-center ml-auto cursor-pointer"
            style={{ width: 44, height: 44 }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            {/* Top bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/[0.08]">
              <a href="#home" onClick={() => setMenuOpen(false)} className="text-center">
                <div className="text-white font-bold tracking-[0.25em] text-sm uppercase leading-none">
                  Cadillac
                </div>
                <div className="text-white/40 tracking-[0.4em] text-[9px] uppercase mt-0.5">
                  Formula 1® Team
                </div>
              </a>
              {/* Close — 44×44 touch target */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                style={{ width: 44, height: 44 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                  <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav
              className="flex flex-col justify-center flex-1 px-10 gap-2"
              aria-label="Full screen navigation"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.45, ease: EASE }}
                  onClick={() => !item.external && setMenuOpen(false)}
                  className="flex items-center justify-between group border-b border-white/[0.07] py-5 cursor-pointer"
                >
                  <span className="text-white/75 hover:text-white transition-colors duration-300 font-light tracking-tight"
                    style={{ fontSize: "clamp(28px,5vw,48px)" }}>
                    {item.label}
                  </span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors duration-300 text-xl">
                    →
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Social links at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-10 pb-8 flex gap-5 flex-wrap items-center"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors duration-300 cursor-pointer"
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
