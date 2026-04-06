"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Calendar", href: "#race" },
  { label: "News", href: "/news" },
  { label: "Partners", href: "/partners" },
  { label: "Store", href: "https://shop.cadillacf1team.com", external: true },
  { label: "Careers", href: "https://careers.cadillacf1team.com", external: true },
  { label: "Stay Connected", href: "/stay-connected" },
];

const legalLinks = [
  "Legal Notice",
  "Terms Of Use",
  "Privacy Policy",
  "Cookie Policy",
  "Contact Us",
  "Sustainability Statement",
  "Cookie Settings",
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/cadillacf1" },
  { label: "X", href: "https://x.com/Cadillac_F1" },
  { label: "YouTube", href: "https://www.youtube.com/@CadillacF1TeamOfficial" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cadillacf1" },
  { label: "TikTok", href: "https://www.tiktok.com/discover/cadillac-f1-team" },
  { label: "Threads", href: "https://www.threads.com/@cadillacf1" },
  { label: "Facebook", href: "https://www.facebook.com/CadillacF1/" },
];

const mottoFrames = ["ambition", "ingenuity", "AND THE pursuit of excellence"];

export default function Footer() {
  const [mottoIdx, setMottoIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMottoIdx((p) => (p + 1) % mottoFrames.length);
        setVisible(true);
      }, 600);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-black text-white border-t border-white/[0.06]">
      {/* Car silhouette banner */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-b from-black to-[#0a0a0a] flex items-end justify-center overflow-hidden">
        {/* Animated motto overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            key={mottoIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
            transition={{ duration: 0.5 }}
            className="text-white/10 text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest text-center px-8 leading-none"
          >
            {mottoFrames[mottoIdx]}
          </motion.p>
        </div>

        {/* Stylised car silhouette SVG */}
        <svg
          viewBox="0 0 1200 200"
          className="absolute bottom-0 w-full opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
        >
          <path
            d="M0 180 Q200 160 350 140 Q500 120 600 115 Q700 120 850 140 Q1000 160 1200 180 L1200 200 L0 200Z"
            fill="rgba(255,255,255,0.08)"
          />
          {/* Car body */}
          <ellipse cx="600" cy="170" rx="360" ry="18" fill="#111" />
          <path
            d="M250 164 Q400 130 600 122 Q800 130 950 164 Q800 175 600 177 Q400 175 250 164Z"
            fill="#1a1a1a"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          {/* Cockpit */}
          <path
            d="M490 148 Q540 115 600 110 Q660 115 710 148Z"
            fill="#0d0d0d"
          />
          {/* Halo */}
          <path
            d="M530 128 Q600 112 670 128"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
            fill="none"
          />
          {/* Front wing */}
          <path
            d="M255 168 Q280 155 340 160 L340 172 Q280 178 255 168Z"
            fill="#1a1a1a"
          />
          {/* Rear wing */}
          <rect x="850" y="128" width="80" height="5" rx="2" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" />
          {/* Wheels */}
          <circle cx="370" cy="176" r="24" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <circle cx="830" cy="176" r="24" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {/* Gold crest */}
          <rect x="591" y="118" width="18" height="12" rx="1.5" fill="rgba(212,175,55,0.4)" />
        </svg>
      </div>

      {/* Main footer body */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 py-16">
        {/* Top — logo + nav */}
        <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-0 justify-between mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4">
              <div className="text-white font-bold tracking-[0.25em] text-base uppercase">
                Cadillac
              </div>
              <div className="text-white/30 tracking-[0.4em] text-[10px] uppercase">
                Formula 1® Team
              </div>
            </div>
            <p className="text-white/30 text-xs leading-relaxed">
              Ambition. Ingenuity. And the pursuit of excellence.
            </p>
            <div className="mt-6 text-white/15 text-[10px]">
              Powered by{" "}
              <a
                href="https://www.twgmotorsports.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                TWG Motorsports
              </a>{" "}
              ·{" "}
              <a
                href="https://www.gm.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                General Motors
              </a>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-10 gap-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-white/40 text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex flex-wrap gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/25 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                aria-label={s.label}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-8" />

        {/* Bottom — legal + copyright */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between">
          <p className="text-white/20 text-[10px]">
            © 2026 Cadillac Formula 1® Team. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            {legalLinks.map((l) => (
              <span
                key={l}
                className="text-white/20 text-[10px] uppercase tracking-wide hover:text-white/40 transition-colors cursor-pointer"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
