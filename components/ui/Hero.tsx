"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ─── Frame config ────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function pad(n: number) {
  return String(n).padStart(3, "0");
}
function frameSrc(n: number) {
  return `${BASE}/hero-frames/ezgif-frame-${pad(n)}.jpg`;
}

// ─── Scroll-range → 0-1 mapper (clamped) ─────────────────────────────────────
function mapRange(
  v: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1
): number {
  const t = Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// ─── Copy beats ───────────────────────────────────────────────────────────────
const BEATS = [
  {
    id: "intro",
    inStart: 0.0,
    inEnd: 0.05,
    outStart: 0.16,
    outEnd: 0.22,
    headline: "Cadillac\nFormula One",
    subtitle: "Engineering the future of speed.",
    body: "A new era of American performance meets Formula 1 precision.",
    align: "center" as const,
    size: "xl" as const,
  },
  {
    id: "motion",
    inStart: 0.22,
    inEnd: 0.28,
    outStart: 0.42,
    outEnd: 0.47,
    headline: "Designed to move\nbefore it moves.",
    subtitle: "Every surface is shaped by performance.",
    body: "Every detail is tuned for speed, control, and presence.",
    align: "left" as const,
    size: "lg" as const,
  },
  {
    id: "burnout",
    inStart: 0.47,
    inEnd: 0.53,
    outStart: 0.66,
    outEnd: 0.72,
    headline: "Power,\nunder pressure.",
    subtitle: "A controlled release of energy.",
    body: "Precision meets force in every movement.",
    align: "center" as const,
    size: "lg" as const,
  },
  {
    id: "reveal",
    inStart: 0.72,
    inEnd: 0.78,
    outStart: 0.88,
    outEnd: 0.95,
    headline: "Built for the grid.\nReady for the world.",
    subtitle: "The debut vision of Cadillac Formula 1.",
    body: null,
    align: "center" as const,
    size: "lg" as const,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const [loadPct, setLoadPct] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // scroll progress 0-1 (reactive for copy beats)
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Refs for RAF interpolation (no re-renders)
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastDrawnRef = useRef(-1);
  const progressRef = useRef(0); // raw scroll progress without React state

  // ── Preload all 240 frames ──────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs = new Array<HTMLImageElement>(TOTAL_FRAMES);
    imagesRef.current = imgs;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i + 1);
      const idx = i;
      const finish = () => {
        done++;
        setLoadPct(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) setLoaded(true);
      };
      img.onload = finish;
      img.onerror = finish;
      imgs[idx] = img;
    }
  }, []);

  // ── Draw a specific frame to canvas ────────────────────────────────────────
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[Math.round(idx)];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.scale(dpr, dpr);
    }

    // cover-fit
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // ── RAF interpolation loop ─────────────────────────────────────────────────
  // Smoothly eases currentFrame toward targetFrame, draws only when changed
  useEffect(() => {
    if (!loaded) return;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Lerp with fast-enough coefficient that it feels immediate but smooth
      const next = Math.abs(diff) < 0.5 ? target : current + diff * 0.18;
      currentFrameRef.current = next;

      const frameIdx = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(next))
      );

      if (frameIdx !== lastDrawnRef.current) {
        drawFrame(frameIdx);
        lastDrawnRef.current = frameIdx;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, drawFrame]);

  // ── Scroll handler ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const viewH = window.innerHeight;

      // progress = 0 when sticky viewport first becomes fully in view,
      // progress = 1 when we've scrolled the entire container past.
      const scrolled = -top; // how many px we've scrolled into the container
      const scrollRange = height - viewH; // total scroll travel

      const p = Math.max(0, Math.min(1, scrolled / scrollRange));
      progressRef.current = p;
      setProgress(p); // triggers copy beat re-render

      // Map 0-1 progress → frame index
      targetFrameRef.current = p * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // seed on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Resize — redraw current frame ─────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      // force canvas size reset
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawFrame]);

  // ── Copy beat opacity ──────────────────────────────────────────────────────
  function beatOpacity(beat: (typeof BEATS)[number]): number {
    const p = progress;
    if (p < beat.inStart || p > beat.outEnd) return 0;
    if (p >= beat.inEnd && p <= beat.outStart) return 1;
    if (p < beat.inEnd) return mapRange(p, beat.inStart, beat.inEnd);
    return mapRange(p, beat.outStart, beat.outEnd, 1, 0);
  }

  function beatY(beat: (typeof BEATS)[number]): number {
    const p = progress;
    if (p < beat.inEnd) return mapRange(p, beat.inStart, beat.inEnd, 28, 0);
    if (p > beat.outStart) return mapRange(p, beat.outStart, beat.outEnd, 0, -20);
    return 0;
  }

  // Scroll progress indicator width
  const progressBarW = `${(progress * 100).toFixed(1)}%`;

  // Overall site fade — sections below start to peek through at 95-100%
  const exitOpacity = mapRange(progress, 0.92, 1, 1, 0);

  return (
    /*
     * Outer container: tall enough to give 500vh of scroll travel.
     * The inner sticky div stays fixed at full-viewport height while user scrolls.
     */
    <div
      ref={containerRef}
      id="home"
      style={{ height: "500vh" }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
        style={{ opacity: exitOpacity }}
      >
        {/* ── Canvas ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: loaded ? "block" : "none" }}
        />

        {/* ── Cinematic vignette ── */}
        <div className="absolute inset-0 pointer-events-none">
          {/* bottom dark fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          {/* top thin fade */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
          {/* left edge */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* ── Loading overlay ── */}
        <div
          className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center gap-6 transition-opacity duration-700"
          style={{ opacity: loaded ? 0 : 1, pointerEvents: loaded ? "none" : "auto" }}
        >
          <p className="text-white/25 text-[10px] tracking-[0.6em] uppercase">
            Cadillac Formula 1® Team
          </p>
          <div className="text-white font-light tabular-nums leading-none"
            style={{ fontSize: "clamp(60px, 12vw, 110px)" }}>
            {loadPct}
            <span className="text-white/20" style={{ fontSize: "0.3em" }}>%</span>
          </div>
          <div className="w-56 h-px bg-white/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-white/50 transition-all duration-150"
              style={{ width: `${loadPct}%` }}
            />
          </div>
          <p className="text-white/15 text-[9px] tracking-[0.5em] uppercase mt-2">
            Loading
          </p>
        </div>

        {/* ── Copy beats ── */}
        {BEATS.map((beat) => {
          const op = beatOpacity(beat);
          const ty = beatY(beat);
          if (op < 0.005) return null;

          const isCenter = beat.align === "center";
          const isXL = beat.size === "xl";

          return (
            <div
              key={beat.id}
              className="absolute inset-0 z-20 flex flex-col pointer-events-none px-8 md:px-16"
              style={{
                opacity: op,
                transform: `translateY(${ty}px)`,
                alignItems: isCenter ? "center" : "flex-start",
                justifyContent: "center",
                textAlign: isCenter ? "center" : "left",
                transition: "none", // driven purely by scroll
              }}
            >
              {/* Eyebrow */}
              <p className="text-white/35 text-[10px] tracking-[0.55em] uppercase mb-5">
                {beat.id === "intro"
                  ? "The Mission Begins"
                  : beat.id === "motion"
                  ? "Vehicle Response"
                  : beat.id === "burnout"
                  ? "Controlled Aggression"
                  : "Debut Vision · 2026"}
              </p>

              {/* Headline */}
              <h2
                className="text-white font-bold leading-none tracking-tight mb-6"
                style={{
                  fontSize: isXL
                    ? "clamp(52px, 9vw, 112px)"
                    : "clamp(38px, 6vw, 80px)",
                  maxWidth: isCenter ? "860px" : "680px",
                  whiteSpace: "pre-line",
                }}
              >
                {beat.headline}
              </h2>

              {/* Subtitle */}
              <p
                className="text-white/65 font-light mb-3"
                style={{
                  fontSize: "clamp(14px, 1.6vw, 20px)",
                  maxWidth: "520px",
                }}
              >
                {beat.subtitle}
              </p>

              {/* Body */}
              {beat.body && (
                <p
                  className="text-white/35 font-light"
                  style={{
                    fontSize: "clamp(12px, 1.1vw, 15px)",
                    maxWidth: "460px",
                    lineHeight: 1.7,
                  }}
                >
                  {beat.body}
                </p>
              )}

              {/* CTA — only on intro beat */}
              {beat.id === "intro" && (
                <div className="mt-10 flex flex-wrap gap-4 justify-center pointer-events-auto">
                  <a
                    href="#car"
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    Explore the Car
                    <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* ── Scroll progress bar (bottom) ── */}
        {loaded && (
          <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/[0.08]">
            <div
              className="h-full bg-white/30 transition-none"
              style={{ width: progressBarW }}
            />
          </div>
        )}

        {/* ── Scroll hint (only at very beginning) ── */}
        {loaded && progress < 0.04 && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            style={{ opacity: mapRange(progress, 0.0, 0.04, 1, 0) }}
          >
            <span className="text-white/25 text-[9px] tracking-[0.5em] uppercase">
              Scroll
            </span>
            <div className="w-px h-8 bg-white/20" />
          </div>
        )}

        {/* ── Frame counter (subtle debug, production-tasteful) ── */}
        {loaded && (
          <div className="absolute top-6 right-6 md:right-8 z-20 flex items-center gap-2">
            <span className="text-white/15 text-[9px] tracking-widest font-mono tabular-nums">
              {String(Math.round(progress * (TOTAL_FRAMES - 1)) + 1).padStart(3, "0")}
              <span className="text-white/8"> / {TOTAL_FRAMES}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
