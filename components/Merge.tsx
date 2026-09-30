"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

type Seg = [string, string?];
const lines: Seg[][] = [
  [["$ ", "p"], ["git checkout -b ", ""], ["forever", "s"]],
  [["$ ", "p"], ["git merge ", ""], ["iram-nasir", "s"], [" --no-ff", "c"]],
  [["  ✓ ", "ok"], ["Merged ", ""], ["anas-rasool ", "s"], ["♥ ", "h"], ["iram-nasir", "s"]],
  [["  ✓ ", "ok"], ["Reviewed & approved by: ", ""], ["both families", "s"]],
  [["  ✓ ", "ok"], ["Conflicts: ", ""], ["0", "s"], ["  // alhamdulillah", "c"]],
  [["$ ", "p"], ["deploy --env ", ""], ["forever", "s"], [" --date ", ""], ["2026-11-14", "s"]],
  [["  → ", "ok"], ["Mehndi ", ""], ["12 Nov", "s"], ["  → ", "ok"], ["Barat ", ""], ["14 Nov", "s"], ["  → ", "ok"], ["Walima ", ""], ["15 Nov", "s"]],
  [["  🚀 ", ""], ["Shipping happiness… ", ""], ["██████████ 100%", "ok"]],
];

export default function Merge() {
  return (
    <section className="merge center">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">For the engineer in the groom</Reveal>
        <Reveal as="h2" className="title" delay={0.1}>The <em className="foil">Final Merge</em></Reveal>
        <Reveal as="p" className="sub" delay={0.2}>Two branches, one beautiful future</Reveal>

        <motion.div
          className="term"
          initial={{ opacity: 0, y: 60, rotateX: 18 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <div className="term-bar">
            <i style={{ background: "#e46b5d" }} /><i style={{ background: "#e7b54a" }} /><i style={{ background: "#5fbf7c" }} />
            <span>~/life/anas-weds-iram</span>
          </div>
          <motion.div
            className="term-body"
            initial="hide"
            whileInView="show"
            viewport={{ once: true, margin: "-15% 0px" }}
            variants={{ show: { transition: { staggerChildren: 0.45, delayChildren: 0.6 } } }}
          >
            {lines.map((segs, i) => (
              <motion.div
                key={i}
                className="ln"
                variants={{ hide: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.35 } } }}
              >
                {segs.map(([t, c], j) => <span key={j} className={c}>{t}</span>)}
              </motion.div>
            ))}
            <motion.div className="ln" variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}>
              <span className="p">$ </span><span className="cursor" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
