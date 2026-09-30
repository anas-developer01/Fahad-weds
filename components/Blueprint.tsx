"use client";

import { motion } from "motion/react";
import { couple } from "@/lib/wedding";
import Reveal from "./Reveal";

const ink = "#dbe8f7";
const faint = "rgba(219,232,247,.45)";

/* a line that draws itself when the sheet scrolls into view */
function Draw({ d, delay = 0, w = 1.4, color = ink, dash }: { d: string; delay?: number; w?: number; color?: string; dash?: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      strokeDasharray={dash}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.6, delay, ease: "easeInOut" }}
    />
  );
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.g>
  );
}

const hangers = Array.from({ length: 11 }, (_, i) => 150 + i * 30);
const archY = (x: number) => 250 - 120 * (1 - ((x - 300) / 170) ** 2);

const spec: [string, string][] = [
  ["Project", "Forever Home"],
  ["Engineer", `${couple.groom}, ${couple.groomProfession}`],
  ["Partner", couple.bride],
  ["Foundation", "Faith · Trust · Love"],
  ["Design Load", "A Lifetime"],
  ["Completion", "13 · 11 · 2026"],
];

export default function Blueprint() {
  return (
    <section className="blueprint center">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">For the civil engineer in the groom</Reveal>
        <Reveal as="h2" className="title" delay={0.1}>The <em className="foil">Blueprint</em> of Forever</Reveal>
        <Reveal as="p" className="sub" delay={0.2}>Two foundations, one bridge, built to last a lifetime</Reveal>

        <motion.div
          className="sheet"
          initial={{ opacity: 0, y: 60, rotateX: 14 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1200 }}
        >
          <svg viewBox="0 0 600 400" role="img" aria-label={`Blueprint of an arch bridge joining ${couple.groomFirst} and ${couple.brideFirst}`}>
            <defs>
              <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="rgba(219,232,247,.12)" strokeWidth=".6" />
              </pattern>
              <pattern id="bpGridBig" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M100 0H0V100" fill="none" stroke="rgba(219,232,247,.2)" strokeWidth=".8" />
              </pattern>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill={ink} />
              </marker>
            </defs>
            <rect width="600" height="400" fill="url(#bpGrid)" />
            <rect width="600" height="400" fill="url(#bpGridBig)" />
            <rect x="10" y="10" width="580" height="380" fill="none" stroke={faint} strokeWidth="1" />

            {/* ground & river */}
            <Draw d="M20 300H130M470 300H580" w={1.2} delay={0.2} />
            <Draw d="M130 300C180 318 420 318 470 300" w={0.9} color={faint} delay={0.4} dash="4 4" />
            <Draw d="M170 322q15 -5 30 0t30 0M300 326q15 -5 30 0t30 0M390 320q15 -5 30 0" w={0.8} color={faint} delay={0.6} />

            {/* piers */}
            <Draw d="M110 300V240H150V300" w={1.6} delay={0.4} />
            <Draw d="M450 300V240H490V300" w={1.6} delay={0.4} />
            <Draw d="M100 300V330H160V300M440 300V330H500V300" w={1} color={faint} delay={0.6} />

            {/* deck */}
            <Draw d="M110 240H490" w={2.2} delay={0.8} />
            <Draw d="M110 232H490" w={0.8} color={faint} delay={0.9} />

            {/* the arch */}
            <Draw d="M150 250Q300 10 450 250" w={2.2} delay={1.1} />
            <Draw d="M160 250Q300 30 440 250" w={0.8} color={faint} delay={1.2} />

            {/* hangers */}
            {hangers.map((x, i) => (
              <Draw key={x} d={`M${x} 240V${Math.min(240, archY(x) + 6)}`} w={0.9} delay={1.6 + i * 0.05} />
            ))}

            {/* F & Z on the piers */}
            <Fade delay={1.4}>
              <circle cx="130" cy="210" r="18" fill="none" stroke={ink} strokeWidth="1.2" />
              <text x="130" y="217" textAnchor="middle" fontSize="20" fontWeight="600" fill={ink} style={{ fontFamily: "var(--serif)" }}>F</text>
              <circle cx="470" cy="210" r="18" fill="none" stroke={ink} strokeWidth="1.2" />
              <text x="470" y="217" textAnchor="middle" fontSize="20" fontWeight="600" fill={ink} style={{ fontFamily: "var(--serif)" }}>Z</text>
              {/* heart at the crown of the arch */}
              <path d="M300 118c-4-6-14-4-12 4 1 5 12 11 12 11s11-6 12-11c2-8-8-10-12-4z" fill="#e3c27a" />
            </Fade>

            {/* dimension lines */}
            <Fade delay={2}>
              <line x1="130" y1="352" x2="470" y2="352" stroke={ink} strokeWidth=".8" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <line x1="130" y1="340" x2="130" y2="360" stroke={faint} strokeWidth=".8" />
              <line x1="470" y1="340" x2="470" y2="360" stroke={faint} strokeWidth="1" />
              <rect x="248" y="344" width="104" height="16" fill="#1a4b86" />
              <text x="300" y="356" textAnchor="middle" fontSize="10" fill={ink} fontFamily="ui-monospace, Menlo, monospace">SPAN = ∞ LOVE</text>

              <line x1="530" y1="130" x2="530" y2="240" stroke={ink} strokeWidth=".8" markerStart="url(#arrow)" markerEnd="url(#arrow)" />
              <text x="540" y="190" fontSize="9" fill={ink} fontFamily="ui-monospace, Menlo, monospace" transform="rotate(90 540 190)" textAnchor="middle">RISE = HAPPINESS</text>

              <text x="40" y="60" fontSize="9.5" fill={ink} fontFamily="ui-monospace, Menlo, monospace">NOTE 1: FOUNDATIONS CAST IN FAITH</text>
              <text x="40" y="76" fontSize="9.5" fill={ink} fontFamily="ui-monospace, Menlo, monospace">NOTE 2: REINFORCED WITH DUAS</text>
              <text x="40" y="92" fontSize="9.5" fill={ink} fontFamily="ui-monospace, Menlo, monospace">NOTE 3: NO EXPANSION JOINTS REQUIRED</text>
              <path d="M205 88L292 124" stroke={faint} strokeWidth=".6" markerEnd="url(#arrow)" />
            </Fade>

            {/* title block */}
            <Fade delay={2.3}>
              <g transform="translate(372 18)">
                <rect width="210" height="96" fill="#173f72" stroke={ink} strokeWidth=".9" />
                {spec.map(([k, v], i) => (
                  <g key={k} transform={`translate(0 ${i * 16})`}>
                    {i > 0 && <line x1="0" y1="0" x2="210" y2="0" stroke={faint} strokeWidth=".5" />}
                    <text x="6" y="11.5" fontSize="7.5" fill={faint} fontFamily="ui-monospace, Menlo, monospace">{k.toUpperCase()}</text>
                    <text x="72" y="11.5" fontSize="8.5" fill={ink} fontFamily="ui-monospace, Menlo, monospace">{v}</text>
                  </g>
                ))}
                <line x1="66" y1="0" x2="66" y2="96" stroke={faint} strokeWidth=".5" />
              </g>
              <text x="582" y="128" textAnchor="end" fontSize="8" fill={faint} fontFamily="ui-monospace, Menlo, monospace">DWG No. FZ-1311 · SCALE 1:∞</text>
            </Fade>

            {/* approval stamp */}
            <motion.g
              initial={{ opacity: 0, scale: 2.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.45, delay: 3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: "100px 360px" }}
            >
              <g transform="rotate(-12 100 362)">
                <rect x="30" y="344" width="140" height="36" rx="4" fill="none" stroke="#e3c27a" strokeWidth="2.4" />
                <rect x="35" y="349" width="130" height="26" rx="2" fill="none" stroke="#e3c27a" strokeWidth=".8" />
                <text x="100" y="362" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="2" fill="#e3c27a" fontFamily="ui-monospace, Menlo, monospace">APPROVED</text>
                <text x="100" y="372" textAnchor="middle" fontSize="6.5" letterSpacing="1" fill="#e3c27a" fontFamily="ui-monospace, Menlo, monospace">BY BOTH FAMILIES</text>
              </g>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
