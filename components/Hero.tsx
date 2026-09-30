"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Floral } from "./Art";
import Gate from "./Gate";
import { scrollToY } from "./SmoothScroll";

// deterministic garland lengths (no Math.random -> no hydration mismatch)
const strands = [9, 6, 11, 7, 13, 8, 10, 6, 12, 7, 11, 8, 9];
const beadColor = (j: number) => (j % 3 === 2 ? "#f2c14e" : j % 5 === 4 ? "#e9b8b0" : "#e8a33d");

function Garlands() {
  return (
    <>
      {strands.map((len, i) => {
        const h = len * 13 + 30;
        return (
          <svg key={i} className="strand" width="20" height={h} viewBox={`0 0 20 ${h}`} style={{ animationDelay: `${-i * 0.7}s` }}>
            <line x1="10" y1="0" x2="10" y2={len * 13} stroke="#b8933f" strokeWidth="1" />
            {Array.from({ length: len }, (_, j) => (
              <circle key={j} cx="10" cy={j * 13 + 8} r={j % 3 === 2 ? 5 : 6} fill={beadColor(j)} />
            ))}
            <path d={`M10 ${len * 13 + 2}c-5 5-5 12 0 16c5-4 5-11 0-16z`} fill="#2f8a64" />
            <circle cx="10" cy={len * 13 + 22} r="3" fill="#b8933f" />
          </svg>
        );
      })}
    </>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });


  // the arch comes forward behind the gate
  const archScale = useTransform(p, [0.05, 0.55], [0.78, 1]);
  const archOpacity = useTransform(p, [0.05, 0.4], [0.2, 1]);
  const archY = useTransform(p, [0.55, 1], [0, -40]);
  const garlandY = useTransform(p, [0.25, 0.6], ["-70%", "0%"]);
  const cornerScale = useTransform(p, [0.3, 0.65], [0.6, 1]);
  const cornerOpacity = useTransform(p, [0.3, 0.65], [0, 1]);

  const open = () => {
    const el = ref.current;
    if (!el) return;
    scrollToY(el.offsetTop + el.offsetHeight - window.innerHeight, 2.6);
  };

  return (
    <section ref={ref} className="hero" aria-label="Invitation cover">
      <div className="hero-sticky">
        <div className="hero-glow" aria-hidden="true" />
        <motion.div className="garlands" style={{ y: garlandY }} aria-hidden="true">
          <Garlands />
        </motion.div>
        {(["tl", "tr", "bl", "br"] as const).map((c) => (
          <motion.div key={c} className={`corner ${c}`} style={{ opacity: cornerOpacity }}>
            <motion.div style={{ scale: cornerScale, width: "100%", height: "100%" }}>
              <Floral />
            </motion.div>
          </motion.div>
        ))}

        <div className="hero-stage">
          <motion.div className="arch" style={{ scale: archScale, opacity: archOpacity, y: archY }}>
            <svg viewBox="0 0 300 440" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="archGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8f6d22" />
                  <stop offset=".35" stopColor="#f3e2b3" />
                  <stop offset=".6" stopColor="#b8933f" />
                  <stop offset="1" stopColor="#dcc48f" />
                </linearGradient>
              </defs>
              <path d="M10 440V168C10 104 62 76 104 56C128 44 144 26 150 4C156 26 172 44 196 56C238 76 290 104 290 168V440Z" fill="#fbf8f1" />
              <path d="M22 432V172C22 114 70 88 108 68C130 56 144 42 150 24C156 42 170 56 192 68C230 88 278 114 278 172V432Z" fill="none" stroke="url(#archGold)" strokeWidth="2" />
              <path d="M30 426V176C30 120 74 96 110 76C131 64 144 52 150 38C156 52 169 64 190 76C226 96 270 120 270 176V426Z" fill="none" stroke="#dcc48f" strokeWidth=".8" />
              <circle cx="150" cy="4" r="4" fill="#b8933f" />
            </svg>
            <div className="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</div>
            <p className="small">The Wedding Celebration of</p>
            <h1 className="names">
              <span className="foil-green">Anas</span>
              <span className="amp foil">&amp;</span>
              <span className="foil-green">Iram</span>
            </h1>
            <p className="full">Anas Rasool · Iram Nasir</p>
            <div className="divider">✦</div>
            <div className="dates"><b>12</b><i>·</i><b>14</b><i>·</i><b>15</b></div>
            <p className="month">November 2026</p>
          </motion.div>
        </div>

        <Gate p={p} onOpen={open} />
      </div>
    </section>
  );
}
