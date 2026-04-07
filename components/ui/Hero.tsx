"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-screen bg-black overflow-hidden flex items-end"
    >
      {/* Background Image */}
      <Image
        src="/hero-image.png"
        alt="Cadillac F1 Car"
        fill
        priority
        className={`object-cover transition-opacity duration-[2000ms] ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Dark vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Loading overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center gap-4"
          >
            <div className="text-white/30 text-xs tracking-[0.4em] uppercase mb-2">
              Cadillac Formula 1® Team
            </div>
            <div className="text-white font-light text-6xl md:text-8xl tabular-nums">
              0<span className="text-white/30 text-2xl">%</span>
            </div>
            <div className="text-white/20 text-[10px] tracking-widest uppercase">
              Loading
            </div>
            <div className="w-48 h-px bg-white/10 mt-4 relative overflow-hidden">
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero copy */}
      <AnimatePresence>
        {loaded && (
          <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 w-full max-w-screen-xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white/40 text-xs tracking-[0.5em] uppercase mb-4"
            >
              The Mark of a New Era
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.9 }}
              className="text-white font-bold text-5xl sm:text-7xl md:text-8xl lg:text-[96px] leading-none tracking-tight mb-6"
            >
              The mission
              <br />
              begins.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-white/60 max-w-lg text-sm md:text-base leading-relaxed mb-10"
            >
              Built with precision, driven by purpose, and defined by intent.
              Now in its final form.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#car"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                Explore the Car
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </a>
              <a
                href="#drivers"
                className="inline-flex items-center gap-3 text-white/50 text-xs uppercase tracking-widest px-4 py-4 hover:text-white transition-colors duration-300"
              >
                Meet the Drivers →
              </a>
            </motion.div>

            {/* Subtle "We start now" sub-tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 right-8 md:right-16 text-white/20 text-xs tracking-[0.6em] uppercase"
            >
              We start now.
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll cue */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </motion.div>
      )}
    </section>
  );
}
