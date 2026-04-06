"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// HOTSPOT MAP — coordinates measured against CarShowcase2.png
// Image is a left-facing side-profile studio shot on near-black background.
// All x/y values are percentage of the rendered <img> element dimensions.
//
//  Part               x      y     notes
//  Front wing         10%   53%    wing endplate / front aero surface
//  Front wheel hub    21%   67%    centre of front tyre
//  Cockpit / halo     42%   34%    top of halo arch
//  Sidepod inlet      47%   53%    sidepod body / intake wall
//  Engine cover       66%   44%    rear upper bodywork
//  Rear wing          83%   29%    main-plane element, upper right
// ─────────────────────────────────────────────────────────────────────────────
const HOTSPOTS = [
  {
    id: "aero",
    label: "AERO",
    x: 10, y: 53,
    dir: "up"   as const,
    align: "left"   as const,
    title: "Front Wing & Aerodynamics",
    body:  "The front wing is the car's primary aerodynamic interface — shaping airflow around the chassis, generating front-axle downforce, and conditioning the wake for everything behind it.",
  },
  {
    id: "chassis",
    label: "CHASSIS",
    x: 42, y: 34,
    dir: "up"   as const,
    align: "center" as const,
    title: "Carbon Fibre Monocoque",
    body:  "The survival cell is built to meet the FIA's most demanding structural requirements while minimising mass at every gram. Strength, stiffness, and driver protection — precision-balanced.",
  },
  {
    id: "powerunit",
    label: "POWER UNIT",
    x: 66, y: 44,
    dir: "up"   as const,
    align: "center" as const,
    title: "Hybrid Power Unit",
    body:  "The 2026 regulations introduce a significant increase in electrical deployment alongside the internal combustion unit. A new era of power, efficiency, and performance.",
  },
  {
    id: "suspension",
    label: "SUSPENSION",
    x: 21, y: 67,
    dir: "down" as const,
    align: "left"   as const,
    title: "Suspension Geometry",
    body:  "Precision-tuned geometry for superior control and stability. Setup is continuously adapted across circuit types to manage tyre load, thermal behaviour, and mechanical balance.",
  },
  {
    id: "sidepods",
    label: "SIDE PODS",
    x: 47, y: 53,
    dir: "down" as const,
    align: "center" as const,
    title: "Sidepod Airflow",
    body:  "Optimised for better cooling and aerodynamic performance. The undercut geometry channels air efficiently to the radiators while conditioning the rear-end aerodynamic environment.",
  },
  {
    id: "rearwing",
    label: "REAR WING",
    x: 83, y: 29,
    dir: "up"   as const,
    align: "right"  as const,
    title: "Rear Wing",
    body:  "Engineered for maximum downforce and reduced drag. The DRS system flattens the rear wing on straights for a speed advantage, balanced against the cornering stability requirement.",
  },
] as const;

type Dir   = "up" | "down";
type Align = "left" | "center" | "right";

// Connector line height (px)
const LINE = 68;

// Easing shared across all motion
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

function lineCSS(dir: Dir): React.CSSProperties {
  const shared: React.CSSProperties = {
    position: "absolute", left: "50%",
    transform: "translateX(-50%)",
    width: "1px", height: `${LINE}px`,
    pointerEvents: "none",
    transition: "opacity 0.4s ease",
  };
  return dir === "up"
    ? { ...shared, bottom: "calc(50% + 8px)",
        background: "linear-gradient(to top,   rgba(255,255,255,0.6), rgba(255,255,255,0.04))" }
    : { ...shared, top:    "calc(50% + 8px)",
        background: "linear-gradient(to bottom,rgba(255,255,255,0.6), rgba(255,255,255,0.04))" };
}

function cardPos(dir: Dir, align: Align): React.CSSProperties {
  const vert: React.CSSProperties = dir === "up"
    ? { bottom: `calc(100% + ${LINE + 10}px)` }
    : { top:    `calc(100% + ${LINE + 10}px)` };
  const horiz: React.CSSProperties =
    align === "left"   ? { left: 0 } :
    align === "right"  ? { right: 0 } :
    /* center */         { left: "50%", transform: "translateX(-50%)" };
  return { ...vert, ...horiz };
}

// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Season",       value: "2026",           note: "Formula 1® debut" },
  { label: "Grid position",value: "11th",            note: "Constructor entry" },
  { label: "Chassis",      value: "CADILLAC01",      note: "First car built" },
  { label: "Drivers",      value: "#11 · #77",       note: "Perez · Bottas" },
  { label: "Livery",       value: "Black & White",   note: "Gold crest detail" },
  { label: "Powered by",   value: "TWG · GM",        note: "TWG Motorsports" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
export default function CarShowcase() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      id="car"
      className="relative bg-black text-white overflow-hidden"
      style={{ backgroundColor: "#030303" }}
    >

      {/* ── Overhead studio spotlight ── */}
      <div aria-hidden className="absolute inset-x-0 top-0 pointer-events-none" style={{
        height: "520px",
        background: "radial-gradient(ellipse 55% 520px at 50% -60px, rgba(255,255,255,0.05) 0%, transparent 100%)",
      }} />

      {/* ══════════════════════════════════════════════════
          SECTION HEADER
      ══════════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pt-28 md:pt-36 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Eyebrow */}
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            2026 Challenger · Interactive Showcase
          </p>

          {/* Primary headline */}
          <h2 style={{
            fontSize: "clamp(34px, 5vw, 66px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#fff",
            marginBottom: "16px",
          }}>
            The 2026 Cadillac<br />
            Formula 1 Challenger.
          </h2>

          {/* Subheading */}
          <p style={{
            fontSize: "clamp(14px, 1.4vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
            marginBottom: "14px",
            letterSpacing: "-0.01em",
          }}>
            Precision engineered for the next era of racing.
          </p>

          {/* Supporting copy */}
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.25)",
            lineHeight: 1.75,
            maxWidth: "440px",
          }}>
            Built from the ground up. Every surface shaped by performance,
            every component defined by intent.
            Hover the hotspots to explore the machine.
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════
          CAR STAGE
          paddingTop/Bottom creates headroom for the floating
          cards + connector lines above and below the image.
          overflow:visible lets cards escape the container.
      ══════════════════════════════════════════════════ */}
      <div style={{
        position: "relative",
        paddingTop: "140px",
        paddingBottom: "140px",
        overflow: "visible",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ position: "relative", overflow: "visible" }}
        >
          {/* ── Car photograph ── */}
          <img
            src="/car-showcase2.png"
            alt="2026 Cadillac Formula 1 Challenger — official studio livery"
            draggable={false}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              // Lift sharpness and livery contrast slightly
              filter: "brightness(1.08) contrast(1.07) saturate(0.92)",
              userSelect: "none",
            }}
          />

          {/* ── Edge-blending gradient overlays ──────────────────────────────
              These use the exact page background colour (#030303) so the
              photo edges dissolve naturally into the section — no hard border.
          ──────────────────────────────────────────────────────────────────── */}
          {/* LEFT  */}
          <div aria-hidden style={{
            position: "absolute", inset: "0 auto 0 0",
            width: "13%", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to right, #030303 0%, rgba(3,3,3,0.75) 45%, transparent 100%)",
          }} />
          {/* RIGHT */}
          <div aria-hidden style={{
            position: "absolute", inset: "0 0 0 auto",
            width: "13%", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to left,  #030303 0%, rgba(3,3,3,0.75) 45%, transparent 100%)",
          }} />
          {/* TOP   */}
          <div aria-hidden style={{
            position: "absolute", inset: "0 0 auto 0",
            height: "16%", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to bottom, #030303 0%, transparent 100%)",
          }} />
          {/* BOTTOM — gentle, preserves the baked-in floor reflection */}
          <div aria-hidden style={{
            position: "absolute", inset: "auto 0 0 0",
            height: "22%", zIndex: 10, pointerEvents: "none",
            background: "linear-gradient(to top, #030303 0%, rgba(3,3,3,0.5) 55%, transparent 100%)",
          }} />
          {/* CORNER vignettes */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, zIndex: 11, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 120% 120% at 0%   0%,   rgba(3,3,3,0.65) 0%, transparent 42%)," +
              "radial-gradient(ellipse 120% 120% at 100% 0%,   rgba(3,3,3,0.65) 0%, transparent 42%)," +
              "radial-gradient(ellipse 120% 120% at 0%   100%, rgba(3,3,3,0.55) 0%, transparent 35%)," +
              "radial-gradient(ellipse 120% 120% at 100% 100%, rgba(3,3,3,0.55) 0%, transparent 35%)",
          }} />

          {/* ── Subtle studio floor glow (sits below the car reflection) ── */}
          <div aria-hidden style={{
            position: "absolute", bottom: "2%", left: "15%", right: "15%",
            height: "28px", zIndex: 9, pointerEvents: "none",
            background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.055) 0%, transparent 100%)",
            filter: "blur(12px)",
          }} />

          {/* ══════════════════════════════════════════════════
              HOTSPOT LAYER — z-index above overlays.
              overflow:visible so cards float outside image.
          ══════════════════════════════════════════════════ */}
          <div style={{
            position: "absolute", inset: 0,
            zIndex: 20, overflow: "visible",
          }}>
            {HOTSPOTS.map((h) => {
              const isOn     = active === h.id;
              const isDimmed = active !== null && !isOn;

              return (
                <div
                  key={h.id}
                  style={{
                    position: "absolute",
                    left: `${h.x}%`,
                    top:  `${h.y}%`,
                    transform: "translate(-50%, -50%)",
                    overflow: "visible",
                    zIndex: isOn ? 50 : 20,
                  }}
                >
                  {/* Connector line */}
                  <div style={{
                    ...lineCSS(h.dir),
                    opacity: isOn ? 1 : isDimmed ? 0.08 : 0.28,
                  }} />

                  {/* Standing label (always visible at rest, brightens on hover) */}
                  <div
                    style={{
                      position: "absolute",
                      ...(h.dir === "up"
                        ? { bottom: `calc(100% + ${LINE + 14}px)` }
                        : { top:    `calc(100% + ${LINE + 14}px)` }),
                      ...(h.align === "left"  ? { left: 0 } :
                          h.align === "right" ? { right: 0 } :
                          { left: "50%", transform: "translateX(-50%)" }),
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      transition: "opacity 0.4s ease, color 0.4s ease",
                      opacity: isOn ? 1 : isDimmed ? 0.1 : 0.38,
                    }}
                  >
                    <span style={{
                      fontSize: "8.5px",
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: isOn ? "#fff" : "rgba(255,255,255,0.7)",
                    }}>
                      {h.label}
                    </span>
                  </div>

                  {/* Dot button */}
                  <button
                    onMouseEnter={() => setActive(h.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={() => setActive(isOn ? null : h.id)}
                    aria-label={`${h.label} — ${h.title}`}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      outline: "none",
                    }}
                  >
                    {/* Outer pulse ring 1 */}
                    {!isOn && !isDimmed && (
                      <>
                        <span style={{
                          position: "absolute",
                          inset: "-3px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.22)",
                          animation: "ping 3s cubic-bezier(0,0,0.2,1) infinite",
                        }} />
                        <span style={{
                          position: "absolute",
                          inset: "-9px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.1)",
                          animation: "ping 3s cubic-bezier(0,0,0.2,1) infinite",
                          animationDelay: "0.6s",
                        }} />
                      </>
                    )}

                    {/* Core dot */}
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "9999px",
                      width:  isOn ? "22px" : "15px",
                      height: isOn ? "22px" : "15px",
                      background: isOn ? "#ffffff" : "rgba(255,255,255,0.16)",
                      border:  `1px solid ${isOn ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)"}`,
                      boxShadow: isOn
                        ? "0 0 0 6px rgba(255,255,255,0.08), 0 0 28px 6px rgba(255,255,255,0.22), 0 0 60px 12px rgba(255,255,255,0.08)"
                        : "none",
                      opacity: isDimmed ? 0.15 : 1,
                      transition: "all 0.45s cubic-bezier(0.25,1,0.5,1)",
                      backdropFilter: "blur(6px)",
                    }}>
                      <span style={{
                        width:      isOn ? "5px"  : "4px",
                        height:     isOn ? "5px"  : "4px",
                        borderRadius: "9999px",
                        background: isOn ? "#000" : "rgba(255,255,255,0.9)",
                        transition: "all 0.3s ease",
                      }} />
                    </span>
                  </button>

                  {/* Floating glass info card */}
                  <AnimatePresence>
                    {isOn && (
                      <motion.div
                        key={`card-${h.id}`}
                        initial={{ opacity: 0, scale: 0.94, y: h.dir === "up" ? 12 : -12 }}
                        animate={{ opacity: 1, scale: 1,    y: 0 }}
                        exit={{   opacity: 0, scale: 0.96,  y: h.dir === "up" ? 6  : -6  }}
                        transition={{ duration: 0.38, ease: EASE }}
                        style={{
                          position: "absolute",
                          width: "228px",
                          pointerEvents: "none",
                          zIndex: 60,
                          ...cardPos(h.dir, h.align),
                        }}
                      >
                        {/* Glass card surface */}
                        <div style={{
                          borderRadius: "16px",
                          padding: "20px 22px",
                          background: "rgba(6,6,6,0.92)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          backdropFilter: "blur(28px)",
                          WebkitBackdropFilter: "blur(28px)",
                          boxShadow:
                            "0 32px 64px rgba(0,0,0,0.88)," +
                            "0 0 0 0.5px rgba(255,255,255,0.04)," +
                            "inset 0 1px 0 rgba(255,255,255,0.07)",
                        }}>
                          {/* Card eyebrow */}
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "12px",
                          }}>
                            <span style={{
                              display: "inline-block",
                              width: "2px",
                              height: "14px",
                              borderRadius: "999px",
                              background: "rgba(255,255,255,0.45)",
                              flexShrink: 0,
                            }} />
                            <span style={{
                              fontSize: "8px",
                              letterSpacing: "0.42em",
                              textTransform: "uppercase",
                              color: "rgba(255,255,255,0.28)",
                            }}>
                              {h.label}
                            </span>
                          </div>

                          {/* Card title */}
                          <p style={{
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: "#fff",
                            lineHeight: 1.35,
                            letterSpacing: "-0.01em",
                            marginBottom: "10px",
                          }}>
                            {h.title}
                          </p>

                          {/* Divider */}
                          <div style={{
                            height: "1px",
                            background: "rgba(255,255,255,0.06)",
                            marginBottom: "10px",
                          }} />

                          {/* Card body */}
                          <p style={{
                            fontSize: "11.5px",
                            color: "rgba(255,255,255,0.38)",
                            lineHeight: 1.65,
                          }}>
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

      {/* ══════════════════════════════════════════════════
          STATS GRID + BRAND STORY
      ══════════════════════════════════════════════════ */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 pb-28 md:pb-36">

        {/* Section label */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "12px", marginBottom: "28px",
        }}>
          <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.1)" }} />
          <p style={{
            fontSize: "9px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}>
            Team Profile · 2026
          </p>
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "80px",
        }}>
          <style>{`
            @media (min-width: 640px)  { .cs-grid { grid-template-columns: repeat(3,1fr) !important; } }
            @media (min-width: 1024px) { .cs-grid { grid-template-columns: repeat(6,1fr) !important; } }
          `}</style>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="cs-grid group"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.065, ease: EASE }}
              style={{
                position: "relative",
                background: "#030303",
                padding: "28px 22px",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              {/* Hover fill */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(255,255,255,0.028)",
                  pointerEvents: "none",
                }}
              />
              {/* Hover bottom accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  position: "absolute", bottom: 0, left: "10%", right: "10%",
                  height: "1px",
                  background: "rgba(255,255,255,0.18)",
                  transformOrigin: "center",
                  pointerEvents: "none",
                }}
              />

              <p style={{
                fontSize: "8px",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
                marginBottom: "10px",
                position: "relative",
              }}>
                {s.label}
              </p>
              <p style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                marginBottom: "6px",
                position: "relative",
              }}>
                {s.value}
              </p>
              <p style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.24)",
                lineHeight: 1.5,
                position: "relative",
              }}>
                {s.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand story */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EASE }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "56px",
          }}
        >
          <style>{`@media(min-width:768px){.cs-story{grid-template-columns:1fr 1fr !important}}`}</style>
          <div className="cs-story" style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            alignItems: "start",
          }}>
            <div>
              <p style={{
                fontSize: "9px",
                letterSpacing: "0.55em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.18)",
                marginBottom: "20px",
              }}>
                Built to Define the Future
              </p>
              <h3 style={{
                fontSize: "clamp(26px, 3.5vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}>
                What started as an idea<br />
                <span style={{ color: "rgba(255,255,255,0.26)" }}>
                  that refused to stay quiet.
                </span>
              </h3>
            </div>
            <div style={{ paddingTop: "clamp(0px, 3vw, 48px)" }}>
              <p style={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.85,
                marginBottom: "20px",
              }}>
                From design to engineering to culture, this is a commitment to
                the highest level of sport. Two American originals — Cadillac
                and Formula 1 — driving forward together.
              </p>
              <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.2)",
                lineHeight: 1.85,
                marginBottom: "28px",
              }}>
                "History is written by those who know what it demands."
                The first Formula 1® team built from the ground up in over a
                decade is here.
              </p>
              <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                {[
                  { label: "Future thinkers wanted", href: "https://careers.cadillacf1team.com" },
                  { label: "Shop the team store",    href: "https://shop.cadillacf1team.com"    },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.28)",
                      textDecoration: "none",
                      transition: "color 0.35s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                  >
                    <span style={{
                      display: "inline-block",
                      width: "20px", height: "1px",
                      background: "currentColor",
                      transition: "width 0.35s ease",
                      flexShrink: 0,
                    }} />
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
