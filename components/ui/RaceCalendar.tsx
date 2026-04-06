"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 2026 F1 Calendar — next upcoming race from today (Apr 6 2026)
// Miami GP: May 8–10, 2026 (race: Sunday May 10, 2026 at 21:00 UTC)
const NEXT_RACE = {
  name: "Formula 1 Crypto.com Miami Grand Prix 2026",
  shortName: "Miami Grand Prix",
  round: 6,
  circuit: "Miami International Autodrome",
  city: "Miami, Florida",
  country: "USA",
  flag: "🇺🇸",
  dates: "8–10 May 2026",
  raceDate: new Date("2026-05-10T21:00:00Z"),
  laps: 57,
  story:
    "The Miami International Autodrome sits within the grounds of Hard Rock Stadium — a purpose-built street-style circuit that rewards aggressive aerodynamic setups and precise tyre management across its mix of fast sweepers and technical low-speed sections.",
};

// Miami circuit path — simplified SVG approximation of the actual layout
const MIAMI_PATH =
  "M120,40 L280,40 Q320,40 320,80 L320,110 Q320,130 340,130 L420,130 Q460,130 460,160 L460,190 Q460,210 440,210 L380,210 Q340,210 340,240 L340,270 Q340,300 310,300 L200,300 Q170,300 170,270 L170,240 Q170,200 130,200 L100,200 Q70,200 70,170 L70,100 Q70,60 120,40Z";

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const total = Math.max(0, diff);
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const mins = Math.floor((total % 3600000) / 60000);
  const secs = Math.floor((total % 60000) / 1000);
  return { days, hours, mins, secs };
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.span
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tabular-nums leading-none tracking-tight text-white"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-white/30 text-[9px] tracking-[0.4em] uppercase">
        {label}
      </span>
    </div>
  );
}

export default function RaceCalendar() {
  const { days, hours, mins, secs } = useCountdown(NEXT_RACE.raceDate);

  return (
    <section
      id="race"
      className="bg-[#080808] text-white py-24 md:py-36 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
          >
            Round {NEXT_RACE.round} · {NEXT_RACE.country} {NEXT_RACE.flag}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4"
          >
            {NEXT_RACE.shortName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-sm tracking-wide"
          >
            {NEXT_RACE.dates} · {NEXT_RACE.circuit}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — 3D circuit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            {/* Premium circuit card */}
            <div className="relative bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] rounded-3xl p-10 md:p-12 overflow-hidden">
              {/* Glow orb */}
              <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

              {/* Circuit SVG */}
              <div className="flex justify-center items-center py-4">
                <svg
                  viewBox="0 0 540 360"
                  className="w-full max-w-sm"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Shadow / depth layer */}
                  <path
                    d={MIAMI_PATH}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="28"
                    fill="none"
                    transform="translate(4,4)"
                  />
                  {/* Track base */}
                  <path
                    d={MIAMI_PATH}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="22"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Track surface */}
                  <path
                    d={MIAMI_PATH}
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Gold accent — Cadillac crest color */}
                  <path
                    d={MIAMI_PATH}
                    stroke="rgba(212,175,55,0.5)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 60"
                  />
                  {/* Start/finish marker */}
                  <rect x="116" y="34" width="12" height="14" rx="2" fill="rgba(212,175,55,0.9)" />
                  <text x="134" y="45" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">
                    Start / Finish
                  </text>
                  {/* Corner number labels */}
                  {[
                    { cx: 118, cy: 55, label: "T1" },
                    { cx: 320, cy: 96, label: "T9" },
                    { cx: 460, cy: 175, label: "T16" },
                    { cx: 340, cy: 255, label: "T17" },
                    { cx: 170, cy: 215, label: "T19" },
                  ].map((p) => (
                    <g key={p.label}>
                      <circle cx={p.cx} cy={p.cy} r="3" fill="rgba(255,255,255,0.5)" />
                      <text x={p.cx + 6} y={p.cy + 4} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
                        {p.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Track info strip */}
              <div className="flex justify-between items-center border-t border-white/[0.08] pt-5 mt-2">
                <div>
                  <p className="text-white/25 text-[9px] tracking-widest uppercase">Circuit</p>
                  <p className="text-white text-sm font-medium">{NEXT_RACE.circuit}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/25 text-[9px] tracking-widest uppercase">Laps</p>
                  <p className="text-white text-sm font-medium">{NEXT_RACE.laps}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/25 text-[9px] tracking-widest uppercase">Location</p>
                  <p className="text-white text-sm font-medium">{NEXT_RACE.city}</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-white/[0.06] border border-white/[0.12] backdrop-blur-md rounded-full px-4 py-2">
              <span className="text-white/60 text-[10px] tracking-widest uppercase">
                Next Race
              </span>
            </div>
          </motion.div>

          {/* Right — countdown + copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            {/* Countdown */}
            <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-8">
              Race Starts In
            </p>
            <div className="grid grid-cols-4 gap-4 mb-12">
              <CountUnit value={days} label="Days" />
              <CountUnit value={hours} label="Hrs" />
              <CountUnit value={mins} label="Min" />
              <CountUnit value={secs} label="Sec" />
            </div>

            {/* Separators */}
            <div className="flex gap-4 mb-12">
              {[":", ":", ":"].map((s, i) => (
                <div
                  key={i}
                  className="text-white/20 text-4xl font-thin leading-none"
                  style={{ marginTop: "-80px", marginLeft: i === 0 ? "56px" : "44px" }}
                />
              ))}
            </div>

            {/* Race copy */}
            <div className="space-y-5">
              <p className="text-white/70 text-sm leading-relaxed">
                {NEXT_RACE.laps} laps. The growl of 1000 horsepower. The hush
                as the red lights flick on — then nothing but speed.
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {NEXT_RACE.story}
              </p>
            </div>

            {/* Weekend schedule */}
            <div className="mt-10 grid grid-cols-3 gap-px bg-white/[0.06] rounded-xl overflow-hidden">
              {[
                { day: "FRI 8 MAY", session: "Practice" },
                { day: "SAT 9 MAY", session: "Qualifying" },
                { day: "SUN 10 MAY", session: "Race" },
              ].map((s) => (
                <div key={s.day} className="bg-[#080808] px-4 py-4">
                  <p className="text-white/25 text-[9px] tracking-widest uppercase mb-1">
                    {s.day}
                  </p>
                  <p className="text-white text-sm font-medium">{s.session}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
