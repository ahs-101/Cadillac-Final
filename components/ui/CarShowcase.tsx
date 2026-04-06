"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Hotspot coordinates are % of the IMG element's rendered width/height,
// measured against the actual physical car parts in car-showcase.png.
//
// Car anatomy reference (side-profile, car faces left):
//   Front wing tip       ≈  x:10  y:52
//   Front wheel center   ≈  x:20  y:64
//   Halo / cockpit       ≈  x:40  y:33
//   Sidepod inlet body   ≈  x:46  y:52
//   Engine cover upper   ≈  x:66  y:42
//   Rear wing plane      ≈  x:82  y:27
// ─────────────────────────────────────────────────────────────────────────────
const HOTSPOTS = [
  {
    id: "aero",
    label: "AERO",
    // Front wing body — left third, mid-height
    x: 11,
    y: 52,
    lineDir: "up" as const,
    cardAlign: "left" as const,   // card left-aligns to avoid left-edge overflow
    title: "Front Wing & Aerodynamics",
    body: "Advanced aerodynamics for maximum downforce and efficiency. The front wing shapes airflow around the entire chassis, generating front-axle grip and managing the downstream wake.",
  },
  {
    id: "chassis",
    label: "CHASSIS",
    // Halo top / cockpit opening
    x: 40,
    y: 33,
    lineDir: "up" as const,
    cardAlign: "center" as const,
    title: "Carbon Fibre Monocoque",
    body: "Carbon fibre monocoque built for strength, lightness, and precision. The survival cell meets the FIA's most stringent structural requirements while minimising mass at every gram.",
  },
  {
    id: "powerunit",
    label: "POWER UNIT",
    // Engine cover — rear upper body
    x: 66,
    y: 42,
    lineDir: "up" as const,
    cardAlign: "center" as const,
    title: "Hybrid Power Unit",
    body: "High-performance hybrid power unit delivering exceptional efficiency. The 2026 regulations introduce a significant step-up in electrical deployment alongside the internal combustion unit.",
  },
  {
    id: "suspension",
    label: "SUSPENSION",
    // Front wheel hub — lower left
    x: 20,
    y: 65,
    lineDir: "down" as const,
    cardAlign: "left" as const,
    title: "Suspension Geometry",
    body: "Precision-tuned suspension for superior control and stability. Setup is continuously optimised across circuits to manage tyre temperatures, load transfer, and mechanical balance.",
  },
  {
    id: "sidepods",
    label: "SIDE PODS",
    // Sidepod inlet / body panel
    x: 47,
    y: 53,
    lineDir: "down" as const,
    cardAlign: "center" as const,
    title: "Sidepod Airflow",
    body: "Optimised airflow for better cooling and aerodynamic performance. The undercut geometry channels air efficiently to the radiators while managing the downstream wake environment.",
  },
  {
    id: "rearwing",
    label: "REAR WING",
    // Rear wing main plane — far right, upper
    x: 82,
    y: 27,
    lineDir: "up" as const,
    cardAlign: "right" as const,   // card right-aligns to avoid right-edge overflow
    title: "Rear Wing",
    body: "Designed for maximum downforce and reduced drag. Includes the Drag Reduction System (DRS) for straight-line speed gain, balanced against the cornering stability demand.",
  },
] as const;

type LineDir = "up" | "down";
type CardAlign = "left" | "center" | "right";

// Card + line measurements
const LINE_H = 72; // px — connector line height

function cardHorizontal(align: CardAlign): React.CSSProperties {
  switch (align) {
    case "left":   return { left: 0 };
    case "right":  return { right: 0 };
    case "center": return { left: "50%", transform: "translateX(-50%)" };
  }
}

function cardVertical(dir: LineDir): React.CSSProperties {
  return dir === "up"
    ? { bottom: `calc(100% + ${LINE_H}px + 6px)` }
    : { top: `calc(100% + ${LINE_H}px + 6px)` };
}

function lineStyle(dir: LineDir): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1px",
    height: `${LINE_H}px`,
    pointerEvents: "none",
  };
  return dir === "up"
    ? { ...base, bottom: "calc(50% + 6px)", background: "linear-gradient(to top, rgba(255,255,255,0.55), rgba(255,255,255,0.06))" }
    : { ...base, top:  "calc(50% + 6px)", background: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.06))" };
}

// ─────────────────────────────────────────────────────────────────────────────
// Data highlights
// ─────────────────────────────────────────────────────────────────────────────
const HIGHLIGHTS = [
  { label: "Season",       value: "2026",           sub: "Formula 1® debut campaign" },
  { label: "Constructor",  value: "11th",            sub: "Entry on the starting grid" },
  { label: "Chassis",      value: "CADILLAC01",      sub: "First car under the F1 identity" },
  { label: "Race Drivers", value: "Perez · Bottas",  sub: "#11 Sergio Perez · #77 Valtteri Bottas" },
  { label: "Livery",       value: "Black / White",   sub: "Matte carbon with Cadillac gold crest" },
  { label: "Backed By",    value: "TWG · GM",        sub: "TWG Motorsports & General Motors" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
export default function CarShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="car" className="relative bg-[#050505] text-white overflow-hidden">

      {/* ── Subtle top ambient spotlight ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "1000px",
          height: "440px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.055) 0%, transparent 68%)",
        }}
      />

      {/* ══════════════════════════════════════════
          SECTION HEADER
      ══════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-24 md:pt-32 pb-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white/20 text-[10px] tracking-[0.55em] uppercase mb-3"
            >
              2026 Challenger · Interactive Showcase
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="font-bold tracking-tight leading-none"
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
            >
              The Cadillac F1<br />
              <span className="text-white/25">Challenger.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-white/30 text-sm leading-relaxed max-w-xs"
          >
            Hover each hotspot to explore the engineering. Every component,
            every surface — built with intent.
          </motion.p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CAR STAGE
          Outer div: overflow-visible so cards can extend beyond image bounds.
          paddingTop/Bottom create space for the cards + lines above/below the car.
      ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{
          paddingTop: "130px",    // card + line headroom above car
          paddingBottom: "130px", // card + line headroom below car
          overflow: "visible",
        }}
      >
        {/* Image wrapper — relative so hotspots can be %-positioned over it */}
        <div className="relative" style={{ overflow: "visible" }}>

          {/* ── Real car photograph ── */}
          <img
            src="/car-showcase.png"
            alt="2026 Cadillac Formula 1 Car — official livery, side profile"
            className="block w-full h-auto"
            draggable={false}
            style={{
              filter: "brightness(1.12) contrast(1.06) saturate(0.95)",
              // image already has a near-black background — we blend edges
              // using overlay gradient divs below (more browser-compatible
              // than CSS mask-composite, which varies by browser)
            }}
          />

          {/* ── Edge-blending overlays — make the photo native to the page ── */}
          {/* Left fade */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: "12%",
              background: "linear-gradient(to right, #050505 0%, rgba(5,5,5,0.7) 40%, transparent 100%)",
              zIndex: 10,
            }}
          />
          {/* Right fade */}
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 pointer-events-none"
            style={{
              width: "12%",
              background: "linear-gradient(to left, #050505 0%, rgba(5,5,5,0.7) 40%, transparent 100%)",
              zIndex: 10,
            }}
          />
          {/* Top fade */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: "14%",
              background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
              zIndex: 10,
            }}
          />
          {/* Bottom fade — gentle, preserves the baked-in floor reflection */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "18%",
              background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.4) 50%, transparent 100%)",
              zIndex: 10,
            }}
          />
          {/* Corner vignettes for seamless corners */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 0% 0%, rgba(5,5,5,0.6) 0%, transparent 45%), " +
                "radial-gradient(ellipse 100% 100% at 100% 0%, rgba(5,5,5,0.6) 0%, transparent 45%), " +
                "radial-gradient(ellipse 100% 100% at 0% 100%, rgba(5,5,5,0.5) 0%, transparent 35%), " +
                "radial-gradient(ellipse 100% 100% at 100% 100%, rgba(5,5,5,0.5) 0%, transparent 35%)",
              zIndex: 11,
            }}
          />

          {/* ── Hotspot layer — z above overlays ── */}
          <div
            className="absolute inset-0"
            style={{ zIndex: 20, overflow: "visible" }}
          >
            {HOTSPOTS.map((h) => {
              const isActive = activeId === h.id;
              const isDimmed = activeId !== null && !isActive;

              return (
                <div
                  key={h.id}
                  className="absolute"
                  style={{
                    left: `${h.x}%`,
                    top: `${h.y}%`,
                    transform: "translate(-50%, -50%)",
                    overflow: "visible",
                    zIndex: isActive ? 40 : 20,
                  }}
                >
                  {/* ── Connector line ── */}
                  <div
                    style={{
                      ...lineStyle(h.lineDir),
                      opacity: isActive ? 1 : isDimmed ? 0.12 : 0.3,
                      transition: "opacity 0.3s",
                    }}
                  />

                  {/* ── Dot ── */}
                  <button
                    onMouseEnter={() => setActiveId(h.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onClick={() => setActiveId(isActive ? null : h.id)}
                    aria-label={h.label}
                    className="relative flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    {/* Outer pulse rings — hidden when active */}
                    {!isActive && !isDimmed && (
                      <>
                        <span
                          className="absolute rounded-full border border-white/25 animate-ping"
                          style={{ inset: "-4px", animationDuration: "2.6s" }}
                        />
                        <span
                          className="absolute rounded-full border border-white/10 animate-ping"
                          style={{ inset: "-10px", animationDuration: "2.6s", animationDelay: "0.5s" }}
                        />
                      </>
                    )}

                    {/* Core dot */}
                    <span
                      className="relative rounded-full transition-all duration-300 flex items-center justify-center"
                      style={{
                        width: isActive ? "20px" : "14px",
                        height: isActive ? "20px" : "14px",
                        background: isActive ? "#fff" : "rgba(255,255,255,0.18)",
                        border: `1px solid ${isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)"}`,
                        boxShadow: isActive
                          ? "0 0 18px 5px rgba(255,255,255,0.3), 0 0 40px 10px rgba(255,255,255,0.1)"
                          : "none",
                        opacity: isDimmed ? 0.18 : 1,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span
                        className="rounded-full"
                        style={{
                          width: isActive ? "5px" : "4px",
                          height: isActive ? "5px" : "4px",
                          background: isActive ? "#000" : "rgba(255,255,255,0.85)",
                          transition: "all 0.25s",
                        }}
                      />
                    </span>

                    {/* ── Floating label (always faintly visible) ── */}
                    <span
                      className="absolute pointer-events-none whitespace-nowrap font-medium tracking-[0.22em] uppercase transition-all duration-300"
                      style={{
                        fontSize: "8.5px",
                        color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                        ...(h.lineDir === "up"
                          ? { bottom: `calc(100% + ${LINE_H}px + 16px)` }
                          : { top:  `calc(100% + ${LINE_H}px + 16px)` }),
                        ...(() => {
                          switch (h.cardAlign) {
                            case "left":   return { left: 0 };
                            case "right":  return { right: 0 };
                            default:       return { left: "50%", transform: "translateX(-50%)" };
                          }
                        })(),
                      }}
                    >
                      {h.label}
                    </span>

                    {/* ── Floating detail card ── */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={`card-${h.id}`}
                          initial={{
                            opacity: 0,
                            scale: 0.93,
                            y: h.lineDir === "up" ? 10 : -10,
                          }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: h.lineDir === "up" ? 5 : -5 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute pointer-events-none"
                          style={{
                            width: "220px",
                            zIndex: 50,
                            ...cardVertical(h.lineDir),
                            ...cardHorizontal(h.cardAlign),
                          }}
                        >
                          <div
                            style={{
                              background: "rgba(8, 8, 8, 0.94)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "14px",
                              padding: "18px 20px",
                              backdropFilter: "blur(24px)",
                              boxShadow:
                                "0 28px 56px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
                            }}
                          >
                            {/* Card eyebrow */}
                            <div className="flex items-center gap-2 mb-3">
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "3px",
                                  height: "12px",
                                  background: "rgba(255,255,255,0.5)",
                                  borderRadius: "999px",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                className="text-white/30 uppercase tracking-[0.4em]"
                                style={{ fontSize: "8px" }}
                              >
                                {h.label}
                              </span>
                            </div>
                            {/* Card title */}
                            <p
                              className="text-white font-semibold mb-2 leading-snug tracking-tight"
                              style={{ fontSize: "13px" }}
                            >
                              {h.title}
                            </p>
                            {/* Card body */}
                            <p
                              className="text-white/40 leading-relaxed"
                              style={{ fontSize: "11px", lineHeight: 1.65 }}
                            >
                              {h.body}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          DATA PANEL + BRAND STORY
      ══════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pb-28 md:pb-36">

        {/* Section rule + label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-px bg-white/10" />
          <p
            className="text-white/20 uppercase tracking-[0.5em]"
            style={{ fontSize: "9px" }}
          >
            Team Profile · 2026
          </p>
        </div>

        {/* Highlight cards */}
        <div
          className="grid rounded-2xl overflow-hidden mb-20"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {/* on md+ use 3 columns via inline style so Tailwind doesn't need to know */}
          <style>{`@media(min-width:768px){.showcase-grid{grid-template-columns:repeat(3,1fr)!important}}@media(min-width:1024px){.showcase-grid{grid-template-columns:repeat(6,1fr)!important}}`}</style>
          {HIGHLIGHTS.map((h, i) => (
            <motion.div
              key={h.label}
              className="showcase-grid group relative bg-[#050505] px-5 py-7 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.055 }}
            >
              {/* Hover lift surface */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "rgba(255,255,255,0.025)" }}
              />
              {/* Animated bottom border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "rgba(255,255,255,0.12)" }}
              />

              <p
                className="text-white/18 uppercase mb-3 relative z-10"
                style={{ fontSize: "8px", letterSpacing: "0.45em", color: "rgba(255,255,255,0.2)" }}
              >
                {h.label}
              </p>
              <p
                className="text-white font-semibold tracking-tight mb-1.5 relative z-10"
                style={{ fontSize: "15px", lineHeight: 1.2 }}
              >
                {h.value}
              </p>
              <p
                className="text-white/25 leading-snug relative z-10"
                style={{ fontSize: "10px", lineHeight: 1.5 }}
              >
                {h.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="grid md:grid-cols-2 gap-12 md:gap-20 items-start border-t pt-16"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div>
            <p
              className="text-white/20 uppercase mb-5"
              style={{ fontSize: "9px", letterSpacing: "0.55em" }}
            >
              Built to Define the Future
            </p>
            <h3
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              What started as an idea<br />
              <span className="text-white/28" style={{ color: "rgba(255,255,255,0.28)" }}>
                that refused to stay quiet.
              </span>
            </h3>
          </div>
          <div className="space-y-5 md:pt-12">
            <p className="text-white/45 text-sm leading-[1.85]">
              From design to engineering to culture, this is a commitment to
              the highest level of sport. Two American originals — Cadillac and
              Formula 1 — driving forward together.
            </p>
            <p
              className="text-white/22 text-sm leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              "History is written by those who know what it demands." The first
              Formula 1® team built from the ground up in over a decade is here.
            </p>
            <div className="pt-2 flex gap-6">
              <a
                href="https://careers.cadillacf1team.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors duration-300 group"
                style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                <span
                  className="h-px bg-white/20 group-hover:bg-white/60 group-hover:w-8 transition-all duration-300"
                  style={{ width: "20px", display: "inline-block" }}
                />
                Future thinkers wanted
              </a>
              <a
                href="https://shop.cadillacf1team.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors duration-300 group"
                style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                <span
                  className="h-px bg-white/20 group-hover:bg-white/60 group-hover:w-8 transition-all duration-300"
                  style={{ width: "20px", display: "inline-block" }}
                />
                Shop the team store
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
