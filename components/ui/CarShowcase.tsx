"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const hotspots = [
  {
    id: "front-wing",
    label: "Front Wing",
    x: "14%",
    y: "60%",
    title: "Front Wing & Aero",
    body:
      "The front wing is the car's primary aerodynamic interface with the air. It generates critical downforce to load the front tyres and channels airflow around the chassis and into the sidepod intakes — precision-engineered for the 2026 regulation cycle.",
  },
  {
    id: "sidepod",
    label: "Sidepod",
    x: "38%",
    y: "48%",
    title: "Sidepod Airflow",
    body:
      "Redesigned sidepod geometry channels air to the cooling system and manages the turbulent wake environment. The compact undercut profile is optimised for the new 2026 aerodynamic ruleset.",
  },
  {
    id: "powerunit",
    label: "Power Unit",
    x: "52%",
    y: "40%",
    title: "Power Unit",
    body:
      "The 2026 season introduces a new power unit formula. Cadillac competes with a works-level hybrid power unit, blending internal combustion with significant electrical deployment — specifications to be officially confirmed by the FIA.",
  },
  {
    id: "rear-wing",
    label: "Rear Wing",
    x: "80%",
    y: "32%",
    title: "Rear Wing",
    body:
      "The rear wing produces the majority of the car's rear downforce and features the Drag Reduction System (DRS) for reduced drag on straights. Tuned for the balance between top speed and cornering stability.",
  },
  {
    id: "tyres",
    label: "Tyres",
    x: "22%",
    y: "80%",
    title: "Pirelli Tyres",
    body:
      "Cadillac F1 runs on official Pirelli P Zero Formula 1 tyres — the sole official tyre supplier to the FIA Formula 1 World Championship. Tyre management and thermal performance are central to race strategy.",
  },
];

const highlights = [
  {
    label: "Debut Season",
    value: "2026",
    desc: "First Formula 1® season as the 11th constructor on the grid.",
  },
  {
    label: "Chassis",
    value: "CADILLAC01",
    desc: "The first chassis built under the Cadillac Formula 1 Team identity.",
  },
  {
    label: "Race Drivers",
    value: "Perez · Bottas",
    desc: "#11 Sergio Perez and #77 Valtteri Bottas lead the team's racing programme.",
  },
  {
    label: "Livery",
    value: "Black & White",
    desc:
      "Matte black bodywork with white graphic detailing and the iconic Cadillac gold crest.",
  },
  {
    label: "Apparel Partner",
    value: "Tommy Hilfiger",
    desc: "Official apparel partnership with Tommy Hilfiger for the 2026 season.",
  },
  {
    label: "Parent Organisation",
    value: "TWG / GM",
    desc: "Powered by TWG Motorsports in partnership with General Motors.",
  },
];

export default function CarShowcase() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const active = hotspots.find((h) => h.id === activeHotspot);

  return (
    <section
      id="car"
      className="bg-black text-white py-24 md:py-36 px-6 md:px-16 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-screen-xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4"
        >
          2026 Challenger
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-6"
        >
          The 2026 Cadillac
          <br />
          <span className="text-white/40">Formula 1 Challenger.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/50 max-w-xl text-sm md:text-base leading-relaxed"
        >
          Built from the ground up. Every surface, every component — an
          engineering statement. Hover the hotspots to explore the machine.
        </motion.p>
      </div>

      {/* Car showcase stage */}
      <div className="max-w-screen-xl mx-auto relative">
        {/* Car silhouette stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="relative w-full h-64 md:h-96 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl border border-white/[0.06] flex items-center justify-center mb-4 overflow-hidden"
        >
          {/* Subtle grid floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to top, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Car placeholder — real car image via official assets */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            {/* Stylised car SVG silhouette */}
            <svg
              viewBox="0 0 800 220"
              className="w-full max-w-3xl opacity-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Body */}
              <ellipse cx="400" cy="160" rx="310" ry="22" fill="#111" />
              <path
                d="M90 155 Q200 90 400 80 Q600 90 710 155 Q600 165 400 168 Q200 165 90 155Z"
                fill="#1a1a1a"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              {/* Cockpit */}
              <path
                d="M300 130 Q340 90 400 85 Q460 90 500 130Z"
                fill="#0a0a0a"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              {/* Halo */}
              <path
                d="M340 105 Q400 88 460 105"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Front wing */}
              <path
                d="M95 158 Q110 148 160 152 L160 162 Q110 166 95 158Z"
                fill="#222"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              {/* Rear wing */}
              <rect
                x="640"
                y="118"
                width="60"
                height="6"
                rx="2"
                fill="#1a1a1a"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              <rect
                x="660"
                y="124"
                width="4"
                height="30"
                fill="#1a1a1a"
                stroke="rgba(255,255,255,0.1)"
              />
              {/* Wheels */}
              <circle cx="200" cy="168" r="28" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <circle cx="200" cy="168" r="14" fill="#1a1a1a" />
              <circle cx="600" cy="168" r="28" fill="#111" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              <circle cx="600" cy="168" r="14" fill="#1a1a1a" />
              {/* Gold Cadillac crest accent */}
              <rect x="390" y="100" width="20" height="14" rx="2" fill="rgba(212,175,55,0.6)" />
              {/* White racing stripe */}
              <path
                d="M250 130 L550 130"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeDasharray="8 4"
              />
            </svg>

            <p className="text-white/20 text-[10px] tracking-widest uppercase">
              Official livery imagery at cadillacf1team.com
            </p>
          </div>

          {/* Interactive hotspots */}
          {hotspots.map((h) => (
            <button
              key={h.id}
              onClick={() =>
                setActiveHotspot(activeHotspot === h.id ? null : h.id)
              }
              className="absolute group"
              style={{ left: h.x, top: h.y, transform: "translate(-50%,-50%)" }}
              aria-label={h.label}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                  activeHotspot === h.id
                    ? "bg-white border-white scale-125"
                    : "bg-white/10 border-white/40 hover:bg-white/30 hover:border-white/80"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    activeHotspot === h.id ? "bg-black" : "bg-white"
                  }`}
                />
              </span>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
              {/* Label */}
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-white/60 text-[10px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {h.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Hotspot detail card */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 md:p-8 mb-12 max-w-2xl"
            >
              <p className="text-white/30 text-[10px] tracking-widest uppercase mb-2">
                Technical — {active.label}
              </p>
              <h3 className="text-white text-xl font-semibold mb-3">
                {active.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{active.body}</p>
              <button
                onClick={() => setActiveHotspot(null)}
                className="mt-4 text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Close ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlights grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="bg-black px-6 py-8 group hover:bg-white/[0.03] transition-colors"
            >
              <p className="text-white/25 text-[9px] tracking-widest uppercase mb-2">
                {h.label}
              </p>
              <p className="text-white font-semibold text-lg mb-2 tracking-tight">
                {h.value}
              </p>
              <p className="text-white/40 text-xs leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Brand story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-20 grid md:grid-cols-2 gap-12 items-center border-t border-white/[0.08] pt-16"
        >
          <div>
            <p className="text-white/30 text-xs tracking-[0.5em] uppercase mb-4">
              Built to Define the Future
            </p>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              What started as an idea <br />
              <span className="text-white/40">that refused to stay quiet.</span>
            </h3>
          </div>
          <div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              From design to engineering to culture, this is a commitment to the
              highest level of sport. Two American originals — Cadillac and
              Formula 1 — driving forward together.
            </p>
            <p className="text-white/30 text-sm leading-relaxed">
              "History is written by those who know what it demands." The first
              Formula 1® team built from the ground up in over a decade is here.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
