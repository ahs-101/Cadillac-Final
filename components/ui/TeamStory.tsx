"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ─── Asset base path (GitHub Pages subdirectory support) ─────────────────────
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// ─── Bronze palette (matches CarShowcase) ────────────────────────────────────
const B = {
  solid:  "#C4A97D",
  light:  "#D9C4A0",
  dim:    "rgba(196,169,125,0.22)",
  rule:   "rgba(196,169,125,0.14)",
  glow:   "rgba(196,169,125,0.06)",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Memory cards ─────────────────────────────────────────────────────────────
// Hero frames sampled at narrative intervals across the 240-frame sequence.
// pos: CSS absolute positioning keys; depth drives parallax magnitude.
const CARDS: {
  frame: string; w: number; h: number;
  pos: React.CSSProperties;
  depth: number; rot: number; opacity: number; blur: number;
  float: string; fDelay: string;
  enterX: number; enterY: number; enterDelay: number;
}[] = [
  {
    frame: "008", w: 240, h: 160,
    pos: { left: "1%", top: "7%" },
    depth: 1.8, rot: -7, opacity: 0.52, blur: 0,
    float: "ts-float-a", fDelay: "0s",
    enterX: -90, enterY: -50, enterDelay: 0.1,
  },
  {
    frame: "048", w: 178, h: 120,
    pos: { left: "4%", top: "38%" },
    depth: 2.8, rot: 9, opacity: 0.32, blur: 2,
    float: "ts-float-b", fDelay: "1.3s",
    enterX: -60, enterY: 30, enterDelay: 0.4,
  },
  {
    frame: "095", w: 210, h: 140,
    pos: { right: "2%", top: "9%" },
    depth: -1.6, rot: 5, opacity: 0.58, blur: 0,
    float: "ts-float-c", fDelay: "0.5s",
    enterX: 80, enterY: -40, enterDelay: 0.2,
  },
  {
    frame: "140", w: 158, h: 106,
    pos: { right: "7%", top: "42%" },
    depth: -2.4, rot: -5, opacity: 0.28, blur: 2.5,
    float: "ts-float-a", fDelay: "2.1s",
    enterX: 55, enterY: 15, enterDelay: 0.6,
  },
  {
    frame: "182", w: 256, h: 172,
    pos: { left: "0%", bottom: "10%" },
    depth: 1.2, rot: -10, opacity: 0.48, blur: 0,
    float: "ts-float-b", fDelay: "0.9s",
    enterX: -100, enterY: 70, enterDelay: 0.3,
  },
  {
    frame: "218", w: 196, h: 132,
    pos: { right: "1%", bottom: "12%" },
    depth: -3.0, rot: 7, opacity: 0.38, blur: 1,
    float: "ts-float-c", fDelay: "1.7s",
    enterX: 85, enterY: 60, enterDelay: 0.5,
  },
  {
    frame: "236", w: 148, h: 99,
    pos: { left: "17%", top: "58%" },
    depth: 3.2, rot: 13, opacity: 0.24, blur: 1.5,
    float: "ts-float-a", fDelay: "2.6s",
    enterX: -40, enterY: 45, enterDelay: 0.7,
  },
];

// ─── Headline words for staggered reveal ─────────────────────────────────────
const LINE1 = ["What", "started", "as", "an", "idea"];
const LINE2 = ["that", "refused", "to", "stay", "quiet."];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { num: "2026", label: "Debut Season" },
  { num: "11th", label: "On the Grid"  },
  { num: "2",    label: "Race Drivers" },
  { num: "240+", label: "Employees"    },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function TeamStory() {
  const sectionRef   = useRef<HTMLElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const lerpRef      = useRef({ x: 0, y: 0 });
  const rafRef       = useRef<number>(0);

  // Controls word-stagger reveal
  const [wordsVisible, setWordsVisible] = useState(false);

  // ── Intersection observer — fire word reveal on enter ──────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setWordsVisible(true); },
      { threshold: 0.18 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── Mouse parallax — zero React re-renders, direct DOM ────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left  - r.width  / 2) / (r.width  / 2),
        y: (e.clientY - r.top   - r.height / 2) / (r.height / 2),
      };
    };

    const tick = () => {
      lerpRef.current.x += (mouseRef.current.x - lerpRef.current.x) * 0.05;
      lerpRef.current.y += (mouseRef.current.y - lerpRef.current.y) * 0.05;

      parallaxRefs.current.forEach((el, i) => {
        if (!el) return;
        const d  = CARDS[i].depth;
        const tx = lerpRef.current.x * d * 26;
        const ty = lerpRef.current.y * d * 20;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    section.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMove);
    };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="story"
      style={{
        position: "relative",
        backgroundColor: "#020202",
        overflow: "hidden",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "160px",
      }}
    >
      {/* ═══ CSS animations + keyframes ═══════════════════════════════════════ */}
      <style>{`
        /* Slow organic float — three variants for variety */
        @keyframes ts-float-a {
          0%,100% { transform: translateY(0px)   rotate(0deg);    }
          33%     { transform: translateY(-14px)  rotate(0.4deg);  }
          66%     { transform: translateY(-6px)   rotate(-0.3deg); }
        }
        @keyframes ts-float-b {
          0%,100% { transform: translateY(0px)   rotate(0deg);    }
          40%     { transform: translateY(-10px)  rotate(-0.5deg); }
          70%     { transform: translateY(-18px)  rotate(0.3deg);  }
        }
        @keyframes ts-float-c {
          0%,100% { transform: translateY(0px)   rotate(0deg);    }
          50%     { transform: translateY(-16px)  rotate(0.6deg);  }
        }
      `}</style>

      {/* ═══ LAYER 0 — Blueprint SVG texture ════════════════════════════════ */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: 0.032,
      }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Grid lines */}
              <line x1="80" y1="0" x2="80" y2="80" stroke="#C4A97D" strokeWidth="0.4"/>
              <line x1="0" y1="80" x2="80" y2="80" stroke="#C4A97D" strokeWidth="0.4"/>
              {/* Diagonal aero flow hint */}
              <line x1="0" y1="40" x2="40" y2="0" stroke="#C4A97D" strokeWidth="0.25" strokeDasharray="3,6"/>
              {/* Node dot */}
              <circle cx="80" cy="80" r="1.2" fill="#C4A97D"/>
              <circle cx="0"  cy="0"  r="0.8" fill="#C4A97D"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp)"/>
        </svg>
      </div>

      {/* ═══ LAYER 1 — Cinematic grain overlay ══════════════════════════════ */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        opacity: 0.028,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        mixBlendMode: "overlay",
      }} />

      {/* ═══ LAYER 2 — Ghost car silhouette (massive, behind everything) ════ */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img
          src={`${BASE}/car-showcase2.png`}
          alt=""
          style={{
            width: "120%", maxWidth: "none",
            opacity: 0.025,
            filter: "grayscale(1) blur(2px)",
            userSelect: "none", pointerEvents: "none",
          }}
        />
      </div>

      {/* ═══ LAYER 3 — Ambient bronze glow behind text area ═════════════════ */}
      <div aria-hidden style={{
        position: "absolute",
        left: "50%", top: "40%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "500px",
        zIndex: 3, pointerEvents: "none",
        background: `radial-gradient(ellipse at center, ${B.glow} 0%, transparent 68%)`,
        filter: "blur(40px)",
      }} />

      {/* ═══ LAYER 4 — Floating memory cards ════════════════════════════════
          Each card: parallax outer div → float inner div → styled image card
      ═══════════════════════════════════════════════════════════════════════ */}
      {CARDS.map((card, i) => (
        <div
          key={card.frame}
          // Parallax wrapper — JS writes transform here (no React re-render)
          ref={el => { parallaxRefs.current[i] = el; }}
          style={{
            position: "absolute",
            zIndex: 4,
            pointerEvents: "none",
            willChange: "transform",
            ...card.pos,
          }}
        >
          {/* Entrance motion — drifts in from off-screen on mount */}
          <motion.div
            initial={{ opacity: 0, x: card.enterX, y: card.enterY, scale: 0.88 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 1.4,
              delay: card.enterDelay,
              ease: EASE,
            }}
          >
            {/* Float animation wrapper */}
            <div style={{
              animation: `${card.float} ${7 + i * 1.1}s ease-in-out infinite`,
              animationDelay: card.fDelay,
            }}>
              {/* Card frame */}
              <div
                style={{
                  width: `${card.w}px`,
                  height: `${card.h}px`,
                  transform: `rotate(${card.rot}deg)`,
                  borderRadius: "6px",
                  overflow: "hidden",
                  opacity: card.opacity,
                  filter: `blur(${card.blur}px)`,
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.7), " +
                    `0 0 0 1px rgba(196,169,125,0.08)`,
                  transition: "opacity 0.6s ease, filter 0.6s ease",
                  cursor: "default",
                  position: "relative",
                }}
              >
                <img
                  src={`${BASE}/hero-frames/ezgif-frame-${card.frame}.jpg`}
                  alt=""
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "brightness(0.9) contrast(1.05) saturate(0.85)",
                    userSelect: "none",
                  }}
                />
                {/* Inner vignette on each card */}
                <div style={{
                  position: "absolute", inset: 0,
                  background:
                    "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      ))}

      {/* ═══ LAYER 5 — Main editorial content ═══════════════════════════════ */}
      <div style={{
        position: "relative", zIndex: 10,
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 32px",
        textAlign: "center",
      }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ marginBottom: "52px" }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "14px",
          }}>
            <div style={{ width: "40px", height: "1px", background: B.dim }} />
            <span style={{
              fontSize: "9px", letterSpacing: "0.55em",
              textTransform: "uppercase", color: B.solid,
            }}>
              Chapter One of Many
            </span>
            <div style={{ width: "40px", height: "1px", background: B.dim }} />
          </div>
        </motion.div>

        {/* ── THE SURPRISE ELEMENT ─────────────────────────────────────────────
            Word-by-word cinematic blur-reveal of the headline.
            Each word blurs in from transparent + vertical drift + filter blur.
            The two lines reveal sequentially with staggered delays.
        ──────────────────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: "20px" }}>
          {/* Line 1 */}
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0 0.28em",
            lineHeight: 1.15,
          }}>
            {LINE1.map((word, wi) => (
              <motion.span
                key={`l1-${wi}`}
                initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
                animate={wordsVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}}
                transition={{
                  duration: 1.1,
                  delay: 0.15 + wi * 0.09,
                  ease: EASE,
                }}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(36px, 5.2vw, 72px)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  color: "#fff",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          {/* Line 2 — offset below with generous breathing room */}
          <div style={{
            display: "flex", flexWrap: "wrap", justifyContent: "center",
            gap: "0 0.28em", marginTop: "18px",
            lineHeight: 1.15,
          }}>
            {LINE2.map((word, wi) => (
              <motion.span
                key={`l2-${wi}`}
                initial={{ opacity: 0, y: 18, filter: "blur(14px)" }}
                animate={wordsVisible
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}}
                transition={{
                  duration: 1.1,
                  delay: 0.6 + wi * 0.09,
                  ease: EASE,
                }}
                style={{
                  display: "inline-block",
                  fontSize: "clamp(36px, 5.2vw, 72px)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Bronze rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
          style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${B.dim}, transparent)`,
            margin: "44px auto",
            transformOrigin: "center",
            maxWidth: "280px",
          }}
        />

        {/* Primary narrative */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{
            fontSize: "clamp(16px, 1.6vw, 21px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.75,
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          A new chapter for the entire industry — beginning with a clear focus:
          build something that endures and defines what's next. From design to
          engineering to culture, this is a commitment to the highest level of sport.
        </motion.p>

        {/* Secondary narrative */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          style={{
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.85,
            marginBottom: "52px",
            maxWidth: "540px",
            margin: "0 auto 52px",
          }}
        >
          Two American originals — Cadillac and Formula 1 — driving forward
          together. The first Formula 1® team built from the ground up in over
          a decade. History is written by those who know what it demands.
        </motion.p>

        {/* ── Stats bar ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0",
            borderTop: `1px solid ${B.rule}`,
            borderBottom: `1px solid ${B.rule}`,
            padding: "36px 0",
            margin: "52px 0 48px",
          }}
        >
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && (
                <div style={{
                  width: "1px",
                  alignSelf: "stretch",
                  background: B.rule,
                  margin: "0 40px",
                }} />
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.08, ease: EASE }}
                style={{ textAlign: "center", flexShrink: 0 }}
              >
                <p style={{
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}>
                  {s.num}
                </p>
                <p style={{
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: B.solid,
                }}>
                  {s.label}
                </p>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>

        {/* ── CTAs ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{ display: "flex", justifyContent: "center",
            alignItems: "center", gap: "36px", flexWrap: "wrap" }}
        >
          <a
            href="https://careers.cadillacf1team.com"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", textDecoration: "none",
              transition: "color 0.4s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = B.light)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            <span style={{
              display: "inline-block", width: "24px", height: "1px",
              background: B.dim, flexShrink: 0,
            }} />
            Disruptors wanted
          </a>

          <div style={{ width: "4px", height: "4px", borderRadius: "50%",
            background: B.dim }} />

          <a
            href="#drivers"
            style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              fontSize: "10px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", textDecoration: "none",
              transition: "color 0.4s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = B.light)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            Meet the drivers
            <span style={{
              display: "inline-block", width: "24px", height: "1px",
              background: B.dim, flexShrink: 0,
            }} />
          </a>
        </motion.div>
      </div>

      {/* ═══ LAYER 6 — Edge bleed so section doesn't hard-cut ════════════════ */}
      <div aria-hidden style={{
        position: "absolute", inset: "auto 0 0 0", height: "120px",
        zIndex: 11, pointerEvents: "none",
        background: "linear-gradient(to bottom, transparent, #020202 100%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: "0 0 auto 0", height: "80px",
        zIndex: 11, pointerEvents: "none",
        background: "linear-gradient(to top, transparent, #020202 100%)",
      }} />
    </section>
  );
}
