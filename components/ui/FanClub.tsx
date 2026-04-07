"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const products = [
  {
    id: 1,
    name: "Full-Zip Replica Stripe Bomber Jacket",
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
    name: "White Logo Adjustable Cap",
    tag: "Official Team Headwear",
    href: "https://shop.cadillacf1team.com",
    img: "https://images.footballfanatics.com/cadillac-f1-team/cadillac%C2%A0tommy-hilfiger-2026-sergio-perez-team-cap-black_ss5_p-203721322+u-0xehql20qa3ozmlkf9hh+v-7jtyswxz0go3mdtta5rs.jpg?_hv=2&w=532",
  },
  {
    id: 4,
    name: "Racing Graphic T-Shirt",
    tag: "Official Fanwear",
    href: "https://shop.cadillacf1team.com",
    img: "https://i.redd.it/cadillacf1-looking-the-part-v0-fi3jmmu5rofg1.jpg?width=1079&format=pjpg&auto=webp&s=f527c43c1761f887929e2d5f463da011fa32d31e",
  },
  {
    id: 5,
    name: "Men's Full-Zip Track Jacket",
    tag: "Tommy Hilfiger × Cadillac F1",
    href: "https://shop.cadillacf1team.com",
    img: "https://www.theindustry.fashion/wp-content/uploads/2026/02/SP26_Cadillac_F1_Fanwear_Drivers_Perez_Look2_RGB_300_39L.jpg",
  },
];

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

function MerchCard({
  product,
  active,
  onClick,
}: {
  product: (typeof products)[0];
  active: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col cursor-pointer group"
      style={{ transition: "opacity 0.4s ease" }}
    >
      {/* Image frame */}
      <div
        className="w-full rounded-2xl overflow-hidden border relative"
        style={{
          aspectRatio: "3/4",
          borderColor: active
            ? "rgba(196,169,125,0.35)"
            : "rgba(255,255,255,0.07)",
          boxShadow: active
            ? "0 0 32px rgba(196,169,125,0.12)"
            : "none",
          transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Buy now button — fills on hover */}
        <AnimatePresence>
          {(active || hovered) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="absolute bottom-4 left-4 right-4"
            >
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-[10px] uppercase tracking-widest font-semibold transition-all duration-300"
                style={{
                  background: hovered
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.12)",
                  color: hovered ? "#000" : "#fff",
                  backdropFilter: "blur(8px)",
                }}
              >
                Buy Now →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-4 px-1">
        <p className="text-white/30 text-[9px] tracking-widest uppercase mb-1 truncate">
          {product.tag}
        </p>
        <p
          className="text-white text-sm font-medium leading-snug transition-colors duration-300"
          style={{ color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)" }}
        >
          {product.name}
        </p>
      </div>
    </div>
  );
}

export default function FanClub() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % products.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + products.length) % products.length),
    []
  );

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    resetAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetAuto]);

  // Desktop shows 3 cards at a time (current, current+1, current+2)
  function getVisibleIndices(count: 1 | 2 | 3) {
    return Array.from({ length: count }, (_, i) => (current + i) % products.length);
  }

  return (
    <>
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
                transition={{ duration: 0.6, ease: EASE }}
                className="text-white/25 text-xs tracking-[0.5em] uppercase mb-4"
              >
                Official Merchandise
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                className="font-bold tracking-tight leading-none"
                style={{ fontSize: "clamp(32px,5vw,60px)" }}
              >
                Shop the look.
              </motion.h2>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              href="https://shop.cadillacf1team.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 text-white text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white/[0.06] hover:border-white/40 transition-all duration-300 self-start md:self-auto cursor-pointer"
            >
              Shop our team store →
            </motion.a>
          </div>

          {/* Carousel — 3 cards desktop, 2 tablet, 1 mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            {/* Desktop: 3 cards */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mb-8">
              {getVisibleIndices(3).map((idx) => (
                <MerchCard
                  key={products[idx].id}
                  product={products[idx]}
                  active={idx === current}
                  onClick={() => {
                    setCurrent(idx);
                    resetAuto();
                  }}
                />
              ))}
            </div>

            {/* Tablet: 2 cards */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5 mb-8">
              {getVisibleIndices(2).map((idx) => (
                <MerchCard
                  key={products[idx].id}
                  product={products[idx]}
                  active={idx === current}
                  onClick={() => {
                    setCurrent(idx);
                    resetAuto();
                  }}
                />
              ))}
            </div>

            {/* Mobile: 1 card */}
            <div className="sm:hidden mb-8">
              <MerchCard
                product={products[current]}
                active={true}
                onClick={() => {}}
              />
            </div>
          </motion.div>

          {/* Nav controls */}
          <div className="flex justify-center items-center gap-4 mb-24">
            <button
              onClick={() => { prev(); resetAuto(); }}
              aria-label="Previous product"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); resetAuto(); }}
                  aria-label={`Go to product ${i + 1}`}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-5 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => { next(); resetAuto(); }}
              aria-label="Next product"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 cursor-pointer"
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
              transition={{ duration: 0.6, ease: EASE }}
              className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-8 text-center"
            >
              Our Partners
            </motion.p>
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-16 whitespace-nowrap"
              >
                {[...partners, ...partners].map((p, i) => (
                  <span
                    key={i}
                    className="text-white/20 text-sm uppercase tracking-widest hover:text-white/50 transition-colors duration-300 cursor-default"
                  >
                    {p}
                  </span>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://www.cadillacf1team.com/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 text-xs uppercase tracking-widest hover:text-white transition-colors duration-300 cursor-pointer"
              >
                Discover our Partners →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter signup ── */}
      <section className="bg-[#080808] text-white py-20 px-6 md:px-16 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-4"
          >
            Stay Connected
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(28px,4vw,48px)" }}
          >
            Access it first.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="text-white/40 text-sm leading-relaxed mb-8"
          >
            Race updates, team news, and exclusive access — delivered directly
            before anyone else.
          </motion.p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 bg-white/[0.05] border border-white/10 rounded-full px-6 py-3.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <p className="text-white/20 text-[10px] mt-4">
            By signing up you agree to our{" "}
            <a href="/privacy" className="underline hover:text-white/40 transition-colors">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="underline hover:text-white/40 transition-colors">
              Terms of Use
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
