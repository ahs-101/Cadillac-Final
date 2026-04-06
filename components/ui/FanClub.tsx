"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Unisex Black Full-Zip Replica Stripe Bomber Jacket",
    tag: "Tommy Hilfiger × Cadillac F1",
    href: "https://shop.cadillacf1team.com",
    img: "https://images.footballfanatics.com/cadillac-f1-team/unisex-tommy-hilfiger-x-cadillac-f1-team-black-full-snap-varsity-bomber-jacket_ss5_p-203736788+pv-4+u-2tykpkf1l6bfbqjmosx8+v-xmcfjgzsk5ipsmeiphdx.jpg?_hv=2&w=1018",
  },
  {
    id: 2,
    name: "Unisex Black Replica Polo",
    tag: "Tommy Hilfiger × Cadillac F1",
    href: "https://shop.cadillacf1team.com",
    img: "https://www.theindustry.fashion/wp-content/uploads/2026/02/SP26_Cadillac_F1_Fanwear_Drivers_Perez_Look2_RGB_300_39L.jpg",
  },
  {
    id: 3,
    name: "Unisex White Logo Adjustable Hat",
    tag: "Official Team Headwear",
    href: "https://shop.cadillacf1team.com",
    img: "https://images.footballfanatics.com/cadillac-f1-team/cadillac%C2%A0tommy-hilfiger-2026-sergio-perez-team-cap-black_ss5_p-203721322+u-0xehql20qa3ozmlkf9hh+v-7jtyswxz0go3mdtta5rs.jpg?_hv=2&w=532",
  },
  {
    id: 4,
    name: "Unisex Racing Graphic T-Shirt",
    tag: "Official Fanwear",
    href: "https://shop.cadillacf1team.com",
    img: "https://i.redd.it/cadillacf1-looking-the-part-v0-fi3jmmu5rofg1.jpg?width=1079&format=pjpg&auto=webp&s=f527c43c1761f887929e2d5f463da011fa32d31e",
  },
  {
    id: 5,
    name: "Men's Black Full-Zip Track Jacket",
    tag: "Tommy Hilfiger × Cadillac F1",
    href: "https://shop.cadillacf1team.com",
    img: "https://www.theindustry.fashion/wp-content/uploads/2026/02/SP26_Cadillac_F1_Fanwear_Drivers_Perez_Look2_RGB_300_39L.jpg",
  },
];

// Partners marquee
const partners = [
  "TWG AI",
  "Claro",
  "Core Scientific",
  "IFS",
  "Jim Beam",
  "Tenneco",
  "Tommy Hilfiger",
  "Pirelli",
  "Alpinestars",
];

export default function FanClub() {
  const [current, setCurrent] = useState(Math.floor(products.length / 2));

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % products.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + products.length) % products.length),
    []
  );

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  function getPos(idx: number) {
    const total = products.length;
    let offset = idx - current;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;
    return offset;
  }

  return (
    <>
      {/* ── Newsletter signup ── */}
      <section className="bg-[#080808] text-white py-20 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-3">
              Stay Connected
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-none mb-4">
              Access it first.
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Team news, exclusive content, race-weekend updates — delivered
              directly to you before anyone else.
            </p>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-6 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>

      {/* ── Merch / Fan Club ── */}
      <section
        id="fanclub"
        className="bg-black text-white py-24 md:py-36 px-6 md:px-16 overflow-hidden"
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
              >
                Official Merchandise
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold tracking-tight leading-none"
              >
                Shop the look.
              </motion.h2>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              href="https://shop.cadillacf1team.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 text-white text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/[0.06] transition-all duration-300 self-start md:self-auto"
            >
              Shop our team store →
            </motion.a>
          </div>

          {/* Carousel */}
          <div className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center [perspective:1000px] mb-8">
            {products.map((product, idx) => {
              const pos = getPos(idx);
              const isCenter = pos === 0;
              const isAdjacent = Math.abs(pos) === 1;
              const isVisible = Math.abs(pos) <= 1;

              return (
                <div
                  key={product.id}
                  onClick={() => !isCenter && setCurrent(idx)}
                  className="absolute flex flex-col transition-all duration-500 ease-in-out cursor-pointer"
                  style={{
                    width: isCenter ? "240px" : "180px",
                    transform: `translateX(${pos * 52}%) scale(${
                      isCenter ? 1 : isAdjacent ? 0.82 : 0.68
                    }) rotateY(${pos * -8}deg)`,
                    zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                    opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                    filter: isCenter ? "none" : "blur(2px)",
                    visibility: isVisible ? "visible" : "hidden",
                  }}
                >
                  {/* Image */}
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] mb-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                      }}
                    />
                  </div>
                  {/* Info — only visible on center card */}
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-center px-2"
                      >
                        <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1">
                          {product.tag}
                        </p>
                        <p className="text-white text-sm font-medium leading-snug mb-3">
                          {product.name}
                        </p>
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
                        >
                          Buy now →
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Nav arrows */}
          <div className="flex justify-center gap-4 mb-24">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
            >
              →
            </button>
          </div>

          {/* Partners marquee */}
          <div className="border-t border-white/[0.06] pt-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-8 text-center"
            >
              Our Partners
            </motion.p>
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-16 whitespace-nowrap"
              >
                {[...partners, ...partners].map((p, i) => (
                  <span
                    key={i}
                    className="text-white/20 text-sm uppercase tracking-widest hover:text-white/50 transition-colors cursor-default"
                  >
                    {p}
                  </span>
                ))}
              </motion.div>
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>

            <div className="mt-10 text-center">
              <a
                href="/partners"
                className="text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Discover our Partners →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Second newsletter ── */}
      <section className="bg-[#080808] text-white py-20 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-4">
            Join the Team
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-none mb-4">
            Access it first.
          </h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Be first in line. Race updates, team news, and exclusive access —
            delivered directly.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-6 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="text-white/20 text-[10px] mt-4">
            By signing up you agree to our Privacy Policy and Terms of Use.
          </p>
        </div>
      </section>
    </>
  );
}
