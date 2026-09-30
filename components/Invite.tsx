"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Floral } from "./Art";
import Reveal from "./Reveal";
import { couple, families } from "@/lib/wedding";

const text: [string, boolean?][] = [
  ["Together"], ["with"], ["our"], ["families,"], ["we"], ["joyfully"], ["invite"], ["you"], ["to"], ["celebrate"], ["the"], ["union"], ["of"],
  ["Anas Rasool", true], ["and"], ["Iram Nasir.", true],
  ["Your"], ["presence,"], ["love"], ["and"], ["prayers"], ["would"], ["make"], ["our"], ["happiness"], ["complete."],
];

function Word({ w, em, i, total, progress }: { w: string; em?: boolean; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, start + 1 / total], [0.12, 1]);
  const y = useTransform(progress, [start, start + 1 / total], [8, 0]);
  return (
    <>
      <motion.span className={`w${em ? " em" : ""}`} style={{ opacity, y }}>{w}</motion.span>{" "}
    </>
  );
}

export default function Invite() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sp } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const f1 = useTransform(sp, [0, 1], [80, -80]);
  const f2 = useTransform(sp, [0, 1], [-60, 80]);

  return (
    <section ref={sectionRef} className="invite">
      <motion.div className="corner tl" style={{ y: f1, top: 0 }}><Floral /></motion.div>
      <motion.div className="corner br" style={{ y: f2, bottom: 0 }}><Floral /></motion.div>
      <div className="wrap">
        <Reveal as="p" className="eyebrow">With the blessings of Allah</Reveal>
        <Reveal className="divider" delay={0.1}>❦</Reveal>
        <p ref={ref} className="words">
          {text.map(([w, em], i) => (
            <Word key={i} w={w} em={em} i={i} total={text.length} progress={scrollYProgress} />
          ))}
        </p>

        <div className="families">
          <Reveal className="family">
            <p className="role">The Groom</p>
            <h3>{couple.groom}</h3>
            <p className="rel">{families.groom.relation}</p>
            <p className="parents">{families.groom.father}<br />&amp; {families.groom.mother}</p>
          </Reveal>
          <Reveal className="family-amp" delay={0.15}>&amp;</Reveal>
          <Reveal className="family" delay={0.25}>
            <p className="role">The Bride</p>
            <h3>{couple.bride}</h3>
            <p className="rel">{families.bride.relation}</p>
            <p className="parents">{families.bride.father}<br />&amp; {families.bride.mother}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
