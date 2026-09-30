"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { countdownTarget } from "@/lib/wedding";
import Reveal from "./Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

function calc() {
  let d = Math.max(0, new Date(countdownTarget).getTime() - Date.now());
  const days = Math.floor(d / 864e5); d %= 864e5;
  const hours = Math.floor(d / 36e5); d %= 36e5;
  const minutes = Math.floor(d / 6e4); d %= 6e4;
  return { days, hours, minutes, seconds: Math.floor(d / 1e3) };
}

function Unit({ value, label, i }: { value: string; label: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, rotateX: -60 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.b
          key={value}
          initial={{ y: "-60%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "60%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.b>
      </AnimatePresence>
      <small>{label}</small>
    </motion.div>
  );
}

export default function Countdown() {
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const lanternY = useTransform(scrollYProgress, [0, 1], ["-80%", "0%"]);

  const units: [string, string][] = [
    [t ? pad(t.days) : "--", "Days"],
    [t ? pad(t.hours) : "--", "Hours"],
    [t ? pad(t.minutes) : "--", "Minutes"],
    [t ? pad(t.seconds) : "--", "Seconds"],
  ];

  return (
    <section ref={ref} className="countdown">
      <motion.div className="lantern l1" style={{ y: lanternY }} aria-hidden="true"><svg viewBox="0 0 60 150"><use href="#lanternSym" /></svg></motion.div>
      <motion.div className="lantern l2" style={{ y: lanternY }} aria-hidden="true"><svg viewBox="0 0 60 150"><use href="#lanternSym" /></svg></motion.div>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal as="p" className="eyebrow">Save the Date</Reveal>
        <Reveal as="h2" className="title" delay={0.1}>Counting down to the <em className="foil">Barat</em></Reveal>
        <div className="cd" role="timer" aria-live="off">
          {units.map(([v, l], i) => <Unit key={l} value={v} label={l} i={i} />)}
        </div>
        <Reveal as="p" className="cd-note" delay={0.3}>Saturday, 14 November 2026 · 5:00 PM</Reveal>
      </div>
    </section>
  );
}
