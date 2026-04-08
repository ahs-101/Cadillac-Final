"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// ─── Bronze palette ───────────────────────────────────────────────────────────
// Cadillac champagne-bronze — warm metallic, never orange
const B = {
  solid:   "#C4A97D",
  light:   "#D9C4A0",
  glow:    "rgba(196,169,125,0.38)",
  ring:    "rgba(196,169,125,0.22)",
  ringOff: "rgba(196,169,125,0.14)",
  fill:    "rgba(196,169,125,0.10)",
  line:    "rgba(196,169,125,0.55)",
  lineFad: "rgba(196,169,125,0.03)",
  card:    "rgba(196,169,125,0.55)",    // card accent stripe
  cardDim: "rgba(196,169,125,0.28)",
};

// ─── Motion easing ────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ─── Dot geometry ─────────────────────────────────────────────────────────────
// All sizes in px; centred via transform on a 0×0 anchor element
const DOT_REST   = 14;   // diameter at rest
const DOT_ACTIVE = 22;   // diameter when hovered
const DOT_R      = 7;    // rest radius — line starts here
const LINE_H     = 62;   // connector line height
const LABEL_GAP  = 8;    // gap between line-end and label

// ─── Hotspot definitions ──────────────────────────────────────────────────────
// x / y = % of rendered <img> element (CarShowcase2.png, side-profile, car faces left)
const HOTSPOTS = [
  {
    id:    "aero",
    label: "AERO",
    x: 10, y: 53,
    dir:   "up"    as const,
    align: "left"  as const,
    title: "Front Wing & Aerodynamics",
    body:  "The front wing is the car's primary aerodynamic interface — shaping airflow around the chassis, generating front-axle downforce, and conditioning the wake for everything behind it.",
  },
  {
    id:    "chassis",
    label: "CHASSIS",
    x: 42, y: 34,
    dir:   "up"    as const,
    align: "center" as const,
    title: "Carbon Fibre Monocoque",
    body:  "Built to meet the FIA's most demanding structural requirements while minimising mass at every gram. Strength, stiffness, and driver protection — precision-balanced.",
  },
  {
    id:    "powerunit",
    label: "POWER UNIT",
    x: 66, y: 44,
    dir:   "up"    as const,
    align: "center" as const,
    title: "Hybrid Power Unit",
    body:  "The 2026 regulations introduce a significant increase in electrical deployment alongside the internal combustion unit. A new era of power, efficiency, and performance.",
  },
  {
    id:    "suspension",
    label: "SUSPENSION",
    x: 21, y: 67,
    dir:   "down"  as const,
    align: "left"  as const,
    title: "Suspension Geometry",
    body:  "Precision-tuned geometry for superior control and stability. Setup is continuously adapted across circuit types to manage tyre load, thermal behaviour, and mechanical balance.",
  },
  {
    id:    "sidepods",
    label: "SIDE PODS",
    x: 47, y: 53,
    dir:   "down"  as const,
    align: "center" as const,
    title: "Sidepod Airflow",
    body:  "Optimised for better cooling and aerodynamic performance. The undercut geometry channels air to the radiators while conditioning the rear-end aerodynamic environment.",
  },
  {
    id:    "rearwing",
    label: "REAR WING",
    x: 83, y: 29,
    dir:   "up"    as const,
    align: "right" as const,
    title: "Rear Wing",
    body:  "Engineered for maximum downforce and reduced drag. The DRS system opens on straights for a speed advantage, balanced against the cornering stability requirement.",
  },
] as const;

type Dir   = "up" | "down";
type Align = "left" | "center" | "right";

// Card horizontal offset from the 0-width anchor
function cardHoriz(align: Align): React.CSSProperties {
  if (align === "left")   return { left: "-14px" };   // slight left offset from dot
  if (align === "right")  return { right: "-14px", left: "auto" };
  return { left: "50%", transform: "translateX(-50%)" };
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Season",        value: "2026",          note: "Formula 1® debut" },
  { label: "Grid Position", value: "11th",           note: "Constructor entry" },
  { label: "Chassis",       value: "CADILLAC01",     note: "First car built" },
  { label: "Drivers",       value: "#11 · #77",      note: "Perez · Bottas" },
  { label: "Livery",        value: "Black & White",  note: "Gold crest detail" },
  { label: "Powered By",    value: "TWG · GM",       note: "TWG Motorsports" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
export default function CarShowcase() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="car" className="relative text-white overflow-hidden"
      style={{ backgroundColor: "#030303" }}>

      {/* Keyframe for slow bronze pulse — overrides Tailwind's default "ping" */}
      <style>{`
        @keyframes bronzePing {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
          80%  { transform: translate(-50%,-50%) scale(2.2); opacity: 0;   }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0;   }
        }
        @keyframes bronzePing2 {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.4; }
          80%  { transform: translate(-50%,-50%) scale(3.0); opacity: 0;   }
          100% { transform: translate(-50%,-50%) scale(3.0); opacity: 0;   }
        }
        @media (min-width:640px)  { .cs-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (min-width:1024px) { .cs-grid { grid-template-columns: repeat(6,1fr) !important; } }
        @media (min-width:768px)  { .cs-story-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>

      {/* Overhead spotlight */}
      <div aria-hidden style={{
        position: "absolute", inset: "0 0 auto 0",
        height: "500px", pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 500px at 50% -80px, rgba(196,169,125,0.04) 0%, transparent 100%)",
      }} />

      {/* ══ SECTION HEADER ══════════════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-28 md:pt-36 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p style={{ fontSize: "10px", letterSpacing: "0.55em", textTransform: "uppercase",
            color: B.cardDim, marginBottom: "22px" }}>
            2026 Challenger · Interactive Showcase
          </p>
          <h2 style={{ fontSize: "clamp(34px,5vw,66px)", fontWeight: 700,
            lineHeight: 1.05, letterSpacing: "-0.02em", color: "#fff", marginBottom: "18px" }}>
            The 2026 Cadillac<br />
            Formula 1 Challenger.
          </h2>
          <p style={{ fontSize: "clamp(14px,1.4vw,18px)", fontWeight: 400,
            color: "rgba(255,255,255,0.45)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
            Precision engineered for the next era of racing.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.24)",
            lineHeight: 1.75, maxWidth: "420px" }}>
            Built from the ground up. Every surface shaped by performance,
            every component defined by intent.{" "}
            <span style={{ color: B.cardDim }}>Hover to explore.</span>
          </p>
        </motion.div>
      </div>

      {/* ══ CAR STAGE ═══════════════════════════════════════════════════════════
          paddingTop/Bottom = headroom for cards + lines above/below the image.
          overflow: visible so cards can float outside.
      ══════════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", paddingTop: "148px",
        paddingBottom: "148px", overflow: "visible" }}>

        <motion.div
          initial={{ opacity: 0, scale: 0.988 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ position: "relative", overflow: "visible" }}
        >
          {/* Car photo */}
          <img
            src={`${BASE}/car-showcase2.png`}
            alt="2026 Cadillac Formula 1 Challenger — official studio livery"
            draggable={false}
            style={{ display: "block", width: "100%", height: "auto", userSelect: "none",
              filter: "brightness(1.08) contrast(1.07) saturate(0.9)" }}
          />

          {/* ── Edge-blend overlays — dissolve photo into #030303 ── */}
          <div aria-hidden style={{ position:"absolute", inset:"0 auto 0 0",
            width:"13%", zIndex:10, pointerEvents:"none",
            background:"linear-gradient(to right,#030303 0%,rgba(3,3,3,0.72) 45%,transparent 100%)" }} />
          <div aria-hidden style={{ position:"absolute", inset:"0 0 0 auto",
            width:"13%", zIndex:10, pointerEvents:"none",
            background:"linear-gradient(to left,#030303 0%,rgba(3,3,3,0.72) 45%,transparent 100%)" }} />
          <div aria-hidden style={{ position:"absolute", inset:"0 0 auto 0",
            height:"16%", zIndex:10, pointerEvents:"none",
            background:"linear-gradient(to bottom,#030303 0%,transparent 100%)" }} />
          <div aria-hidden style={{ position:"absolute", inset:"auto 0 0 0",
            height:"22%", zIndex:10, pointerEvents:"none",
            background:"linear-gradient(to top,#030303 0%,rgba(3,3,3,0.48) 55%,transparent 100%)" }} />
          {/* Corner vignettes */}
          <div aria-hidden style={{ position:"absolute", inset:0, zIndex:11, pointerEvents:"none",
            background:
              "radial-gradient(ellipse 120% 120% at 0% 0%,rgba(3,3,3,0.65) 0%,transparent 42%)," +
              "radial-gradient(ellipse 120% 120% at 100% 0%,rgba(3,3,3,0.65) 0%,transparent 42%)," +
              "radial-gradient(ellipse 120% 120% at 0% 100%,rgba(3,3,3,0.55) 0%,transparent 35%)," +
              "radial-gradient(ellipse 120% 120% at 100% 100%,rgba(3,3,3,0.55) 0%,transparent 35%)" }} />
          {/* Floor glow */}
          <div aria-hidden style={{ position:"absolute", bottom:"2%", left:"15%", right:"15%",
            height:"24px", zIndex:9, pointerEvents:"none", filter:"blur(14px)",
            background:"radial-gradient(ellipse at 50% 100%,rgba(196,169,125,0.04) 0%,transparent 100%)" }} />

          {/* ══ HOTSPOT LAYER ════════════════════════════════════════════════════
              Each hotspot = a 0×0 anchor div at the exact car-part coordinate.
              Dot, line, label, and card all position relative to this anchor,
              ensuring everything is mathematically centred on the same point.
          ════════════════════════════════════════════════════════════════════════ */}
          <div style={{ position:"absolute", inset:0, zIndex:20, overflow:"visible" }}>
            {HOTSPOTS.map((h) => {
              const isOn     = active === h.id;
              const isDimmed = active !== null && !isOn;
              const dotSize  = isOn ? DOT_ACTIVE : DOT_REST;
              const dotR     = dotSize / 2;

              // Vertical position of elements relative to 0-height anchor
              // "up" → elements above anchor (use bottom:)
              // "down" → elements below anchor (use top:)
              const lineStart  = DOT_R;              // connector starts at dot edge
              const lineEnd    = DOT_R + LINE_H;     // connector far end
              const labelOff   = lineEnd + LABEL_GAP;// label sits beyond line end

              return (
                /* ── Zero-size anchor — positioned at car-part coordinate ── */
                <div
                  key={h.id}
                  style={{
                    position: "absolute",
                    left: `${h.x}%`,
                    top:  `${h.y}%`,
                    width: 0,
                    height: 0,
                    overflow: "visible",
                    zIndex: isOn ? 50 : 20,
                  }}
                >
                  {/* ── Connector line ── */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    [h.dir === "up" ? "bottom" : "top"]: `${lineStart}px`,
                    transform: "translateX(-50%)",
                    width: "1px",
                    height: `${LINE_H}px`,
                    pointerEvents: "none",
                    transition: "opacity 0.45s ease",
                    opacity: isOn ? 1 : isDimmed ? 0.06 : 0.32,
                    background: h.dir === "up"
                      ? `linear-gradient(to top,   ${B.line}, ${B.lineFad})`
                      : `linear-gradient(to bottom,${B.line}, ${B.lineFad})`,
                  }} />

                  {/* ── Label — always centred on anchor via translateX(-50%) ── */}
                  <div style={{
                    position: "absolute",
                    left: 0,
                    [h.dir === "up" ? "bottom" : "top"]: `${labelOff}px`,
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    textAlign: "center",
                    pointerEvents: "none",
                    transition: "opacity 0.45s ease",
                    opacity: isOn ? 1 : isDimmed ? 0.07 : 0.55,
                  }}>
                    <span style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: isOn ? B.light : B.solid,
                      textShadow: isOn ? `0 0 12px ${B.glow}` : "none",
                      transition: "color 0.4s ease, text-shadow 0.4s ease",
                    }}>
                      {h.label}
                    </span>
                  </div>

                  {/* ── Dot — centred exactly on anchor point ── */}
                  <button
                    onMouseEnter={() => setActive(h.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(isOn ? null : h.id)}
                    aria-label={`${h.label} — ${h.title}`}
                    style={{
                      position: "absolute",
                      left: 0, top: 0,
                      transform: "translate(-50%, -50%)",
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      outline: "none",
                      transition: "width 0.45s cubic-bezier(0.25,1,0.5,1), height 0.45s cubic-bezier(0.25,1,0.5,1)",
                    }}
                  >
                    {/* Slow bronze pulse rings — only when idle */}
                    {!isOn && !isDimmed && (<>
                      <span style={{
                        position: "absolute",
                        left: "50%", top: "50%",
                        width: `${DOT_REST}px`, height: `${DOT_REST}px`,
                        borderRadius: "9999px",
                        border: `1px solid ${B.ring}`,
                        animation: "bronzePing 3.5s cubic-bezier(0,0,0.2,1) infinite",
                        pointerEvents: "none",
                      }} />
                      <span style={{
                        position: "absolute",
                        left: "50%", top: "50%",
                        width: `${DOT_REST}px`, height: `${DOT_REST}px`,
                        borderRadius: "9999px",
                        border: `1px solid ${B.ringOff}`,
                        animation: "bronzePing2 3.5s cubic-bezier(0,0,0.2,1) infinite",
                        animationDelay: "0.7s",
                        pointerEvents: "none",
                      }} />
                    </>)}

                    {/* Core dot */}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9999px",
                      width:   `${dotSize}px`,
                      height:  `${dotSize}px`,
                      background: isOn
                        ? `radial-gradient(circle at 38% 36%, ${B.light}, ${B.solid})`
                        : B.fill,
                      border: `1px solid ${isOn ? B.solid : B.ringOff}`,
                      boxShadow: isOn
                        ? `0 0 0 5px rgba(196,169,125,0.1), 0 0 22px 5px ${B.glow}, 0 0 55px 14px rgba(196,169,125,0.1)`
                        : "none",
                      opacity: isDimmed ? 0.14 : 1,
                      backdropFilter: "blur(6px)",
                      transition: "all 0.45s cubic-bezier(0.25,1,0.5,1)",
                    }}>
                      <span style={{
                        borderRadius: "9999px",
                        width:      isOn ? "5px" : "3.5px",
                        height:     isOn ? "5px" : "3.5px",
                        background: isOn ? "#1a1308" : B.solid,
                        transition: "all 0.35s ease",
                      }} />
                    </span>
                  </button>

                  {/* ── Floating glass info card ── */}
                  <AnimatePresence>
                    {isOn && (
                      <motion.div
                        key={`card-${h.id}`}
                        initial={{ opacity: 0, scale: 0.93, y: h.dir === "up" ? 14 : -14 }}
                        animate={{ opacity: 1, scale: 1,    y: 0 }}
                        exit={{   opacity: 0, scale: 0.96,  y: h.dir === "up" ? 7  : -7  }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{
                          position: "absolute",
                          left: 0,
                          width: "236px",
                          pointerEvents: "none",
                          zIndex: 60,
                          // Position card beyond label
                          [h.dir === "up" ? "bottom" : "top"]: `${labelOff + 26}px`,
                          ...cardHoriz(h.align),
                        }}
                      >
                        <div style={{
                          borderRadius: "16px",
                          padding: "20px 22px 22px",
                          background: "rgba(5,4,3,0.94)",
                          border: `1px solid rgba(196,169,125,0.12)`,
                          backdropFilter: "blur(32px)",
                          WebkitBackdropFilter: "blur(32px)",
                          boxShadow:
                            "0 32px 72px rgba(0,0,0,0.92)," +
                            `0 0 0 0.5px rgba(196,169,125,0.06),` +
                            `inset 0 1px 0 rgba(196,169,125,0.08)`,
                        }}>

                          {/* Card eyebrow */}
                          <div style={{ display:"flex", alignItems:"center",
                            gap:"8px", marginBottom:"13px" }}>
                            <span style={{
                              display:"inline-block", width:"2px", height:"13px",
                              borderRadius:"999px", background: B.card, flexShrink: 0,
                            }} />
                            <span style={{ fontSize:"8px", letterSpacing:"0.42em",
                              textTransform:"uppercase", color: B.cardDim }}>
                              {h.label}
                            </span>
                          </div>

                          {/* Card title */}
                          <p style={{ fontSize:"13.5px", fontWeight:700, color:"#fff",
                            lineHeight:1.3, letterSpacing:"-0.015em", marginBottom:"11px" }}>
                            {h.title}
                          </p>

                          {/* Divider */}
                          <div style={{ height:"1px", marginBottom:"11px",
                            background:"rgba(196,169,125,0.08)" }} />

                          {/* Card body */}
                          <p style={{ fontSize:"12px", lineHeight:1.68,
                            color:"rgba(255,255,255,0.4)" }}>
                            {h.body}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ══ STATS GRID + BRAND STORY ═════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pb-28 md:pb-36">

        {/* Rule label */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"28px" }}>
          <div style={{ width:"32px", height:"1px", background: B.ringOff }} />
          <p style={{ fontSize:"9px", letterSpacing:"0.5em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.2)" }}>
            Team Profile · 2026
          </p>
        </div>

        {/* Stats grid */}
        <div className="cs-grid" style={{ display:"grid",
          gridTemplateColumns:"repeat(2,1fr)", gap:"1px",
          background:"rgba(255,255,255,0.045)", borderRadius:"20px",
          overflow:"hidden", marginBottom:"80px" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="cs-grid group"
              initial={{ opacity:0, y:10 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.52, delay:i*0.06, ease:EASE }}
              style={{ position:"relative", background:"#030303",
                padding:"26px 22px", overflow:"hidden", cursor:"default" }}
            >
              <motion.div initial={{ opacity:0 }} whileHover={{ opacity:1 }}
                transition={{ duration:0.4 }}
                style={{ position:"absolute", inset:0, pointerEvents:"none",
                  background:"rgba(196,169,125,0.025)" }} />
              <motion.div initial={{ scaleX:0 }} whileHover={{ scaleX:1 }}
                transition={{ duration:0.45, ease:EASE }}
                style={{ position:"absolute", bottom:0, left:"8%", right:"8%",
                  height:"1px", background: B.ringOff,
                  transformOrigin:"center", pointerEvents:"none" }} />

              <p style={{ fontSize:"8px", letterSpacing:"0.45em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.18)", marginBottom:"10px", position:"relative" }}>
                {s.label}
              </p>
              <p style={{ fontSize:"15px", fontWeight:600, color:"#fff",
                letterSpacing:"-0.02em", lineHeight:1.2, marginBottom:"5px", position:"relative" }}>
                {s.value}
              </p>
              <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.24)",
                lineHeight:1.5, position:"relative" }}>
                {s.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand story */}
        <motion.div
          initial={{ opacity:0, y:18 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.85, ease:EASE }}
          style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:"56px" }}
        >
          <div className="cs-story-grid" style={{ display:"grid",
            gridTemplateColumns:"1fr", gap:"48px", alignItems:"start" }}>
            <div>
              <p style={{ fontSize:"9px", letterSpacing:"0.55em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.18)", marginBottom:"20px" }}>
                Built to Define the Future
              </p>
              <h3 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:700,
                lineHeight:1.12, letterSpacing:"-0.02em", color:"#fff" }}>
                What started as an idea<br />
                <span style={{ color:"rgba(255,255,255,0.26)" }}>
                  that refused to stay quiet.
                </span>
              </h3>
            </div>
            <div style={{ paddingTop:"clamp(0px,3vw,48px)" }}>
              <p style={{ fontSize:"13.5px", color:"rgba(255,255,255,0.42)",
                lineHeight:1.85, marginBottom:"20px" }}>
                From design to engineering to culture, this is a commitment to
                the highest level of sport. Two American originals — Cadillac
                and Formula 1 — driving forward together.
              </p>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.2)",
                lineHeight:1.85, marginBottom:"28px" }}>
                "History is written by those who know what it demands."
                The first Formula 1® team built from the ground up in over a
                decade is here.
              </p>
              <div style={{ display:"flex", gap:"28px", flexWrap:"wrap" }}>
                {[
                  { label:"Future thinkers wanted", href:"https://careers.cadillacf1team.com" },
                  { label:"Shop the team store",    href:"https://shop.cadillacf1team.com" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                      fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase",
                      color:"rgba(255,255,255,0.28)", textDecoration:"none",
                      transition:"color 0.35s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = B.solid)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}>
                    <span style={{ display:"inline-block", width:"20px", height:"1px",
                      background:"currentColor", flexShrink:0 }} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
