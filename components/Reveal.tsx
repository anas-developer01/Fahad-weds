"use client";

import { motion } from "motion/react";

export default function Reveal({
  children, delay = 0, y = 40, className, as = "div",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "p" | "h2" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}
