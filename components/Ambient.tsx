"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/** Rose & marigold petals that start falling once the doors open. */
export function Petals() {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#e9b8b0", "#dcc48f", "#e8a33d", "#f4ddd6"];
    let started = false, burst = 45, timer = 0, alive = true;
    const spawn = () => {
      if (!alive || !box.current) return;
      const p = document.createElement("div");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}vw`;
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.setProperty("--dx", `${Math.random() * 200 - 100}px`);
      p.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
      p.style.animationDuration = `${7 + Math.random() * 6}s`;
      box.current.appendChild(p);
      setTimeout(() => p.remove(), 14000);
      timer = window.setTimeout(spawn, burst-- > 0 ? 110 : 1500);
    };
    const onScroll = () => {
      if (!started && window.scrollY > window.innerHeight * 0.6) { started = true; spawn(); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { alive = false; clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <div ref={box} className="petals" aria-hidden="true" />;
}
