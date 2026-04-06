"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const raceDrivers = [
  {
    id: "perez",
    name: "Sergio Perez",
    number: "#11",
    country: "Mexico 🇲🇽",
    age: 35,
    role: "Race Driver",
    quote: "Pressure-tested. Championship-proven.",
    bio: "With multiple Grand Prix victories and a World Championship podium finish, Sergio Perez arrives at Cadillac F1 carrying the experience and precision that only the highest levels of the sport can forge.",
    stat1: { label: "Grands Prix", value: "281+" },
    stat2: { label: "Victories", value: "9" },
    imageUrl: "/placeholder-perez.jpg",
    initials: "SP",
    color: "from-zinc-900 to-zinc-950",
  },
  {
    id: "bottas",
    name: "Valtteri Bottas",
    number: "#77",
    country: "Finland 🇫🇮",
    age: 36,
    role: "Race Driver",
    quote: "Measured. Precise. Relentless.",
    bio: "Valtteri Bottas brings a decade of elite Formula 1 experience to Cadillac — a driver defined by technical mastery, race intelligence, and an ability to extract maximum performance from every machine he commands.",
    stat1: { label: "Grands Prix", value: "250+" },
    stat2: { label: "Victories", value: "10" },
    imageUrl: "/placeholder-bottas.jpg",
    initials: "VB",
    color: "from-neutral-900 to-neutral-950",
  },
];

const reserveDrivers = [
  {
    id: "zhou",
    name: "Zhou Guanyu",
    number: "—",
    country: "China 🇨🇳",
    age: 26,
    role: "Reserve Driver",
    quote: "Behind the scenes. Ahead of the curve.",
    bio: "Zhou Guanyu supports operations from the inside — analysing data, refining setups, and standing ready to deliver precision on demand.",
    stat1: { label: "F1 Seasons", value: "3" },
    stat2: { label: "Role", value: "Reserve" },
    initials: "ZG",
    color: "from-stone-900 to-stone-950",
  },
  {
    id: "herta",
    name: "Colton Herta",
    number: "—",
    country: "USA 🇺🇸",
    age: 25,
    role: "Test Driver",
    quote: "Dialled in. Ready to deliver.",
    bio: "One of America's most gifted young racing talents, Colton Herta brings IndyCar pedigree and exceptional instinct to the Cadillac F1 test programme.",
    stat1: { label: "IndyCar Wins", value: "7" },
    stat2: { label: "Role", value: "Test" },
    initials: "CH",
    color: "from-zinc-900 to-zinc-950",
  },
];

function DriverCard({
  driver,
  large = false,
}: {
  driver: (typeof raceDrivers)[0];
  large?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b ${driver.color} group cursor-pointer`}
    >
      {/* Driver number watermark */}
      <div
        className="absolute top-0 right-0 text-white/[0.04] font-bold leading-none select-none pointer-events-none"
        style={{ fontSize: large ? "200px" : "140px", lineHeight: 1 }}
      >
        {driver.number.replace("#", "")}
      </div>

      <div className={`relative z-10 ${large ? "p-10 md:p-12" : "p-8"}`}>
        {/* Role tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-4 bg-white/40 rounded-full" />
          <span className="text-white/30 text-[9px] tracking-[0.5em] uppercase">
            {driver.role}
          </span>
        </div>

        {/* Avatar placeholder */}
        <div
          className={`${
            large ? "w-24 h-24" : "w-16 h-16"
          } rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6 transition-all duration-500 ${
            hovered ? "bg-white/[0.12] border-white/20" : ""
          }`}
        >
          <span className="text-white/40 font-bold text-lg tracking-tight">
            {driver.initials}
          </span>
        </div>

        {/* Name & number */}
        <div className="mb-4">
          <p className="text-white/25 text-xs tracking-widest mb-1">
            {driver.number}
          </p>
          <h3
            className={`text-white font-bold tracking-tight leading-none ${
              large ? "text-3xl md:text-4xl" : "text-2xl"
            }`}
          >
            {driver.name}
          </h3>
          <p className="text-white/35 text-sm mt-1">{driver.country} · Age {driver.age}</p>
        </div>

        {/* Quote */}
        <p className="text-white/50 text-sm italic mb-6 leading-relaxed">
          "{driver.quote}"
        </p>

        {/* Bio — expands on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white/40 text-xs leading-relaxed mb-6 overflow-hidden"
            >
              {driver.bio}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="flex gap-6 border-t border-white/[0.08] pt-6">
          <div>
            <p className="text-white/25 text-[9px] tracking-widest uppercase mb-1">
              {driver.stat1.label}
            </p>
            <p className="text-white font-semibold text-lg">
              {driver.stat1.value}
            </p>
          </div>
          <div>
            <p className="text-white/25 text-[9px] tracking-widest uppercase mb-1">
              {driver.stat2.label}
            </p>
            <p className="text-white font-semibold text-lg">
              {driver.stat2.value}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
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
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
          >
            Race Drivers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4"
          >
            A Tale of Two Icons.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl text-sm leading-relaxed mb-12"
          >
            History is written by those who know what it demands. Bottas and
            Perez arrive with years of pressure-tested judgement and earned
            instinct.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-4">
            {raceDrivers.map((d) => (
              <DriverCard key={d.id} driver={d} large />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-20" />

        {/* Reserve Drivers */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
          >
            Support Programme
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight leading-none mb-4"
          >
            Excellence in Reserve.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl text-sm leading-relaxed mb-12"
          >
            Shifting momentum behind the scenes — Zhou and Herta keep the
            operation fine-tuned. Sharpening setups. Analysing data. Ready to
            deliver precision and impact on demand.
          </motion.p>

          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">
            {reserveDrivers.map((d) => (
              <DriverCard key={d.id} driver={d as typeof raceDrivers[0]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
