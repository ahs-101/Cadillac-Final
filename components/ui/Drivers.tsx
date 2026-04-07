"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const raceDrivers = [
  {
    id: "perez",
    name: "Sergio Perez",
    number: "11",
    country: "Mexico",
    flag: "🇲🇽",
    age: 35,
    role: "Race Driver",
    quote: "Pressure-tested. Championship-proven.",
    bio: "With multiple Grand Prix victories and a World Championship podium finish, Sergio Perez arrives at Cadillac F1 carrying the experience and precision that only the highest levels of the sport can forge.",
    stat1: { label: "Grands Prix", value: "281+" },
    stat2: { label: "Victories", value: "9" },
    color: "from-zinc-900/80 to-zinc-950",
    accentColor: "rgba(196,169,125,0.18)",
  },
  {
    id: "bottas",
    name: "Valtteri Bottas",
    number: "77",
    country: "Finland",
    flag: "🇫🇮",
    age: 36,
    role: "Race Driver",
    quote: "Measured. Precise. Relentless.",
    bio: "Valtteri Bottas brings a decade of elite Formula 1 experience to Cadillac — a driver defined by technical mastery, race intelligence, and an ability to extract maximum performance from every machine he commands.",
    stat1: { label: "Grands Prix", value: "250+" },
    stat2: { label: "Victories", value: "10" },
    color: "from-neutral-900/80 to-neutral-950",
    accentColor: "rgba(196,169,125,0.14)",
  },
];

const reserveDrivers = [
  {
    id: "zhou",
    name: "Zhou Guanyu",
    number: "24",
    country: "China",
    flag: "🇨🇳",
    age: 26,
    role: "Reserve Driver",
    quote: "Behind the scenes. Ahead of the curve.",
    bio: "Zhou Guanyu supports operations from the inside — analysing data, refining setups, and standing ready to deliver precision on demand.",
    stat1: { label: "F1 Seasons", value: "3" },
    stat2: { label: "Points Finishes", value: "12" },
    color: "from-stone-900/80 to-stone-950",
    accentColor: "rgba(196,169,125,0.10)",
  },
  {
    id: "herta",
    name: "Colton Herta",
    number: "06",
    country: "USA",
    flag: "🇺🇸",
    age: 25,
    role: "Test Driver",
    quote: "Dialled in. Ready to deliver.",
    bio: "One of America's most gifted young racing talents, Colton Herta brings IndyCar pedigree and exceptional instinct to the Cadillac F1 test programme.",
    stat1: { label: "IndyCar Wins", value: "7" },
    stat2: { label: "Pole Positions", value: "9" },
    color: "from-zinc-900/80 to-zinc-950",
    accentColor: "rgba(196,169,125,0.10)",
  },
];

function DriverCard({
  driver,
  large = false,
  delay = 0,
}: {
  driver: (typeof raceDrivers)[0];
  large?: boolean;
  delay?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b ${driver.color} group cursor-pointer flex flex-col h-full`}
      style={{
        boxShadow: hovered
          ? `0 0 60px ${driver.accentColor}, 0 2px 40px rgba(0,0,0,0.6)`
          : "0 2px 40px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Portrait header — driver number as visual identity */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{
          aspectRatio: large ? "16/9" : "2/1",
          background: `radial-gradient(ellipse at 60% 40%, ${driver.accentColor} 0%, transparent 70%), #0a0a0a`,
        }}
      >
        {/* Car number as hero typography */}
        <span
          className="text-white font-bold leading-none select-none"
          style={{
            fontSize: large ? "clamp(80px,14vw,180px)" : "clamp(60px,10vw,130px)",
            opacity: 0.07,
            letterSpacing: "-0.04em",
          }}
        >
          {driver.number}
        </span>
        {/* Subtle scan lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
          }}
        />
        {/* Bottom fade into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
        {/* Role pill */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-1 h-3.5 bg-white/35 rounded-full" />
          <span className="text-white/35 text-[9px] tracking-[0.5em] uppercase">
            {driver.role}
          </span>
        </div>
        {/* Number badge */}
        <div className="absolute top-3 right-4 text-white/20 font-bold text-xs tracking-widest font-mono">
          #{driver.number}
        </div>
      </div>

      {/* Card body */}
      <div className={`relative z-10 flex flex-col flex-1 ${large ? "p-8 md:p-10" : "p-6 md:p-8"}`}>
        {/* Name & flag */}
        <div className="mb-3">
          <h3
            className="text-white font-bold tracking-tight leading-none"
            style={{
              fontSize: large
                ? "clamp(22px,2.8vw,36px)"
                : "clamp(18px,2.2vw,26px)",
            }}
          >
            {driver.name}
          </h3>
          <p className="text-white/35 text-xs mt-1.5 tracking-wide">
            {driver.flag} {driver.country} · Age {driver.age}
          </p>
        </div>

        {/* Quote */}
        <p className="text-white/45 text-sm italic mb-4 leading-relaxed">
          &ldquo;{driver.quote}&rdquo;
        </p>

        {/* Bio — expands on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-white/35 text-xs leading-relaxed mb-4 overflow-hidden"
            >
              {driver.bio}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Spacer pushes stats + CTA to bottom */}
        <div className="flex-1" />

        {/* Stats */}
        <div className="flex gap-6 border-t border-white/[0.08] pt-5 mb-5">
          <div>
            <p className="text-white/25 text-[9px] tracking-widest uppercase mb-1">
              {driver.stat1.label}
            </p>
            <p className="text-white font-semibold text-lg tabular-nums">
              {driver.stat1.value}
            </p>
          </div>
          <div>
            <p className="text-white/25 text-[9px] tracking-widest uppercase mb-1">
              {driver.stat2.label}
            </p>
            <p className="text-white font-semibold text-lg tabular-nums">
              {driver.stat2.value}
            </p>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://www.cadillacf1team.com/drivers/${driver.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-widest hover:text-white transition-colors duration-300 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          View Profile
          <span
            className="transition-transform duration-300"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          >
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export default function Drivers() {
  return (
    <section
      id="drivers"
      className="bg-black text-white py-24 md:py-36 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Race Drivers */}
        <div className="mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
          >
            Race Drivers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(32px,5vw,60px)" }}
          >
            A Tale of Two Icons.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="text-white/40 max-w-xl text-sm leading-relaxed mb-12"
          >
            History is written by those who know what it demands. Bottas and
            Perez arrive with years of pressure-tested judgement and earned
            instinct.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5 items-stretch">
            {raceDrivers.map((d, i) => (
              <DriverCard key={d.id} driver={d} large delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-24" />

        {/* Support Programme */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
          >
            Support Programme
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(28px,4vw,52px)" }}
          >
            Excellence in Reserve.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="text-white/40 max-w-xl text-sm leading-relaxed mb-12"
          >
            Shifting momentum behind the scenes — Zhou and Herta keep the
            operation fine-tuned. Sharpening setups. Analysing data. Ready to
            deliver precision and impact on demand.
          </motion.p>

          <div className="grid sm:grid-cols-2 gap-5 items-stretch">
            {reserveDrivers.map((d, i) => (
              <DriverCard
                key={d.id}
                driver={d as typeof raceDrivers[0]}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
