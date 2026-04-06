"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Hotspots — positions calibrated to the real car photo ──────────────────
// x/y are % of the car image container (left→right, top→bottom)
const HOTSPOTS = [
  {
    id: "aero",
    label: "AERO",
    x: 14,
    y: 28,
    side: "top-left" as const,
    title: "Aerodynamics",
    body: "Advanced aerodynamics engineered for maximum downforce and efficiency. The front wing and nose assembly shape airflow around the entire car, generating grip and reducing drag across every surface.",
  },
  {
    id: "chassis",
    label: "CHASSIS",
    x: 40,
    y: 16,
    side: "top-center" as const,
    title: "Carbon Fibre Monocoque",
    body: "Carbon fibre monocoque built for strength, lightness, and precision. The survival cell meets the FIA's most stringent structural requirements while keeping mass to an absolute minimum.",
  },
  {
    id: "powerunit",
    label: "POWER UNIT",
    x: 70,
    y: 18,
    side: "top-right" as const,
    title: "Power Unit",
    body: "High-performance hybrid power unit delivering exceptional efficiency. The 2026 regulations introduce a significant increase in electrical deployment — specifications subject to official FIA confirmation.",
  },
  {
    id: "suspension",
    label: "SUSPENSION",
    x: 18,
    y: 76,
    side: "bottom-left" as const,
    title: "Suspension",
    body: "Precision-tuned suspension geometry for superior control and stability. The front and rear setups are continuously optimised across circuits to manage tyre temperatures and mechanical balance.",
  },
  {
    id: "sidepods",
    label: "SIDE PODS",
    x: 50,
    y: 78,
    side: "bottom-center" as const,
    title: "Sidepod Airflow",
    body: "Optimised airflow for better cooling and aerodynamic performance. The sidepod undercut channels air efficiently to the radiators while managing the downstream wake environment.",
  },
  {
    id: "rearwing",
    label: "REAR WING",
    x: 80,
    y: 76,
    side: "bottom-right" as const,
    title: "Rear Wing",
    body: "Designed for maximum downforce and reduced drag. Features the Drag Reduction System (DRS) for straight-line speed advantage, balanced against cornering stability demands.",
  },
] as const;

const HIGHLIGHTS = [
  { label: "Season", value: "2026", sub: "Formula 1® debut campaign" },
  { label: "Constructor", value: "11th", sub: "Entry on the starting grid" },
  { label: "Chassis", value: "CADILLAC01", sub: "First car under the F1 identity" },
  { label: "Race Drivers", value: "Perez · Bottas", sub: "#11 and #77" },
  { label: "Livery", value: "Black / White", sub: "Matte carbon with gold crest" },
  { label: "Backed By", value: "TWG · GM", sub: "TWG Motorsports & General Motors" },
] as const;

type HotspotSide = (typeof HOTSPOTS)[number]["side"];

// Floating card — direction relative to hotspot dot
function cardPlacement(side: HotspotSide): React.CSSProperties {
  switch (side) {
    case "top-left":
      return { bottom: "calc(100% + 14px)", left: 0 };
    case "top-center":
      return { bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { bottom: "calc(100% + 14px)", right: 0 };
    case "bottom-left":
      return { top: "calc(100% + 14px)", left: 0 };
    case "bottom-center":
      return { top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":
      return { top: "calc(100% + 14px)", right: 0 };
  }
}

// Line from dot — up or down
function lineDirection(side: HotspotSide) {
  return side.startsWith("top") ? "bottom" : "top";
}

export default function CarShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [carHovered, setCarHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = HOTSPOTS.find((h) => h.id === activeId);

  return (
    <section
      id="car"
      className="relative bg-[#050505] text-white overflow-hidden"
    >
      {/* ── Top ambient glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── Section header ── */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-24 md:pt-32 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/25 text-[10px] tracking-[0.55em] uppercase mb-3"
            >
              2026 Challenger · Interactive Showcase
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-4xl md:text-[56px] font-bold tracking-tight leading-none"
            >
              The Cadillac F1
              <br />
              <span className="text-white/30">Challenger.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/35 text-sm leading-relaxed max-w-sm"
          >
            Hover the hotspots to explore the engineering. Every component,
            every surface — built with intent.
          </motion.p>
        </div>
      </div>

      {/* ── Car stage ── */}
      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-8">

        {/* Outer car container — relative for hotspot positioning */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative select-none"
          onMouseEnter={() => setCarHovered(true)}
          onMouseLeave={() => {
            setCarHovered(false);
          }}
        >
          {/* Subtle studio floor glow — sits UNDER the car */}
          <div
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[70%] h-20 pointer-events-none transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 70%)",
              opacity: carHovered ? 1 : 0.4,
            }}
          />

          {/* Car image */}
          <div className="relative">
            {/* Hover glow ring */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500"
              style={{
                boxShadow: carHovered
                  ? "0 0 120px 20px rgba(255,255,255,0.04), inset 0 0 60px 0px rgba(255,255,255,0.02)"
                  : "none",
              }}
            />

            <img
              src="/car-showcase.png"
              alt="2026 Cadillac Formula 1 Car — official livery"
              className="w-full h-auto object-contain"
              style={{
                filter: carHovered
                  ? "brightness(1.08) contrast(1.02)"
                  : "brightness(1) contrast(1)",
                transition: "filter 0.6s ease",
              }}
              draggable={false}
            />

            {/* ── Hotspot dots ── */}
            {HOTSPOTS.map((h) => {
              const isActive = activeId === h.id;
              const isDimmed = activeId !== null && !isActive;

              return (
                <button
                  key={h.id}
                  className="absolute group"
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isActive ? 30 : 20,
                  }}
                  onMouseEnter={() => setActiveId(h.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() => setActiveId(isActive ? null : h.id)}
                  aria-label={h.label}
                >
                  {/* Connector line (top hotspots go up, bottom go down) */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-px pointer-events-none transition-all duration-300"
                    style={{
                      [lineDirection(h.side)]: "100%",
                      height: "28px",
                      background: isActive
                        ? "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.08))"
                        : "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
                    }}
                  />

                  {/* Label above/below the line */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-all duration-300"
                    style={{
                      [lineDirection(h.side) === "bottom" ? "top" : "bottom"]:
                        "calc(100% + 34px)",
                      opacity: isActive ? 1 : isDimmed ? 0.2 : 0.55,
                    }}
                  >
                    <span
                      className="text-white font-medium tracking-[0.25em] uppercase"
                      style={{ fontSize: "10px" }}
                    >
                      {h.label}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative flex items-center justify-center">
                    {/* Outer pulse ring */}
                    <span
                      className="absolute rounded-full border border-white/30 animate-ping"
                      style={{
                        width: "28px",
                        height: "28px",
                        animationDuration: "2.4s",
                        opacity: isActive ? 0 : isDimmed ? 0 : 0.6,
                      }}
                    />
                    {/* Secondary ring */}
                    <span
                      className="absolute rounded-full border border-white/15 animate-ping"
                      style={{
                        width: "42px",
                        height: "42px",
                        animationDuration: "2.4s",
                        animationDelay: "0.4s",
                        opacity: isActive ? 0 : isDimmed ? 0 : 0.3,
                      }}
                    />
                    {/* Core dot */}
                    <span
                      className="relative flex items-center justify-center rounded-full border transition-all duration-300"
                      style={{
                        width: isActive ? "22px" : "16px",
                        height: isActive ? "22px" : "16px",
                        background: isActive
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.15)",
                        borderColor: isActive
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(4px)",
                        opacity: isDimmed ? 0.2 : 1,
                        boxShadow: isActive
                          ? "0 0 20px 4px rgba(255,255,255,0.35), 0 0 40px 8px rgba(255,255,255,0.12)"
                          : "none",
                      }}
                    >
                      <span
                        className="rounded-full transition-all duration-200"
                        style={{
                          width: isActive ? "6px" : "5px",
                          height: isActive ? "6px" : "5px",
                          background: isActive ? "#000" : "rgba(255,255,255,0.9)",
                        }}
                      />
                    </span>
                  </div>

                  {/* Floating info card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: h.side.startsWith("top") ? 8 : -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: h.side.startsWith("top") ? 4 : -4 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute pointer-events-none"
                        style={{
                          ...cardPlacement(h.side),
                          width: "240px",
                          zIndex: 40,
                        }}
                      >
                        <div
                          className="rounded-xl px-5 py-4 border"
                          style={{
                            background: "rgba(10,10,10,0.92)",
                            borderColor: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(20px)",
                            boxShadow:
                              "0 24px 48px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.06)",
                          }}
                        >
                          {/* Card header */}
                          <div className="flex items-center gap-2 mb-3">
                            <span
                              className="w-1 h-3.5 rounded-full bg-white/60 flex-shrink-0"
                            />
                            <p className="text-white/30 text-[9px] tracking-[0.4em] uppercase">
                              {h.label}
                            </p>
                          </div>
                          <p className="text-white font-semibold text-sm mb-2 leading-snug">
                            {h.title}
                          </p>
                          <p className="text-white/45 text-[11px] leading-relaxed">
                            {h.body}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Data highlights grid ── */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 mt-16 pb-24 md:pb-32">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-6 h-px bg-white/20" />
          <p className="text-white/25 text-[9px] tracking-[0.5em] uppercase">
            Team Profile
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative bg-[#050505] px-5 py-7 overflow-hidden cursor-default"
            >
              {/* Hover lift highlight */}
              <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06] group-hover:bg-white/[0.12] transition-colors duration-400" />

              <p className="text-white/20 text-[8px] tracking-[0.45em] uppercase mb-3 relative z-10">
                {h.label}
              </p>
              <p className="text-white font-semibold text-base leading-tight mb-1.5 tracking-tight relative z-10">
                {h.value}
              </p>
              <p className="text-white/30 text-[10px] leading-snug relative z-10">
                {h.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Brand story ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-20 grid md:grid-cols-2 gap-12 items-start border-t border-white/[0.06] pt-16"
        >
          <div>
            <p className="text-white/20 text-[9px] tracking-[0.55em] uppercase mb-5">
              Built to Define the Future
            </p>
            <h3 className="text-3xl md:text-[40px] font-bold leading-tight tracking-tight">
              What started as an idea
              <br />
              <span className="text-white/30">
                that refused to stay quiet.
              </span>
            </h3>
          </div>
          <div className="space-y-5 md:pt-14">
            <p className="text-white/50 text-sm leading-[1.8]">
              From design to engineering to culture, this is a commitment to
              the highest level of sport. Two American originals — Cadillac and
              Formula 1 — driving forward together.
            </p>
            <p className="text-white/25 text-sm leading-[1.8]">
              "History is written by those who know what it demands." The first
              Formula 1® team built from the ground up in over a decade is here.
            </p>
            <div className="pt-2">
              <a
                href="https://careers.cadillacf1team.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors duration-300 group"
              >
                <span className="w-5 h-px bg-white/20 group-hover:w-8 group-hover:bg-white/60 transition-all duration-300" />
                Disruptors and future thinkers wanted
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
