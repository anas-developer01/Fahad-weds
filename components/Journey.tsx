"use client";

import { useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { events } from "@/lib/wedding";
import Reveal from "./Reveal";

/* the road across Hasilpur: Ghulam Rasool house (left) to Ghulam Nabi house (right) */
const ROAD = "M40 382C150 382 170 306 270 314S432 384 532 332S640 272 712 270";

/* ------------------------------------------------------------------ */
/*  Decorated wedding car — facing right, origin at road contact point  */
/* ------------------------------------------------------------------ */
const bead = (i: number) => (i % 4 === 3 ? "#c42a43" : i % 2 ? "#f7b73f" : "#fffaf0");

function Garland({ from, to, sag, n }: { from: [number, number]; to: [number, number]; sag: number; n: number }) {
  const [x1, y1] = from, [x2, y2] = to;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t + Math.sin(t * Math.PI) * sag;
        return <circle key={i} cx={x} cy={y} r={1.55} fill={bead(i)} stroke="#b8933f" strokeWidth=".2" />;
      })}
    </g>
  );
}

function Rose({ x, y, r = 3.2, c = "#c42a43" }: { x: number; y: number; r?: number; c?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c} />
      <path d={`M${-r * 0.5} 0a${r * 0.5} ${r * 0.5} 0 1 1 ${r * 0.6} ${r * 0.3}`} fill="none" stroke="#7a0f22" strokeWidth=".5" />
      <circle r={r * 0.3} fill="#7a0f22" opacity=".6" />
    </g>
  );
}

function WeddingCar({ wheelA, wheelB }: { wheelA: React.Ref<SVGGElement>; wheelB: React.Ref<SVGGElement> }) {
  return (
    <g className="car-body">
      <defs>
        <linearGradient id="carIvory" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#f6efe2" />
          <stop offset="1" stopColor="#dccfb6" />
        </linearGradient>
        <linearGradient id="carGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a8782f" />
          <stop offset=".45" stopColor="#f3e2b3" />
          <stop offset="1" stopColor="#b88a3e" />
        </linearGradient>
        <linearGradient id="carGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e7f0f3" />
          <stop offset="1" stopColor="#a9bfc9" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff4cf" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff4cf" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* headlight beam */}
      <path className="beam" d="M52 -19L96 -30L96 -4Z" fill="url(#beam)" />
      {/* ground shadow */}
      <ellipse cx="2" cy="1.5" rx="52" ry="4.5" fill="#2b2320" opacity=".28" />

      {/* trailing ribbons */}
      <path className="ribbon r1" d="M-46 -22C-56 -24 -60 -18 -70 -20" fill="none" stroke="#c42a43" strokeWidth="1.6" strokeLinecap="round" />
      <path className="ribbon r2" d="M-46 -19C-55 -17 -60 -12 -68 -12" fill="none" stroke="#e3c27a" strokeWidth="1.6" strokeLinecap="round" />

      {/* body */}
      <path
        d="M-47 -9Q-50 -21 -40 -24L-26 -26L-16 -40Q-12 -45 -4 -45L18 -45Q26 -45 30 -39L38 -27L47 -25Q54 -23 54 -14L54 -8Q54 -4 50 -4L-45 -4Q-49 -4 -47 -9Z"
        fill="url(#carIvory)" stroke="#b8933f" strokeWidth=".7"
      />
      {/* windows */}
      <path d="M-13 -40L-3 -40L-3 -28L-22 -28Z" fill="url(#carGlass)" stroke="#b8933f" strokeWidth=".5" />
      <path d="M1 -40L17 -40Q22 -40 25 -35L29 -28L1 -28Z" fill="url(#carGlass)" stroke="#b8933f" strokeWidth=".5" />
      <path d="M-10 -38L-6 -38L-12 -30" stroke="#fff" strokeWidth="1" opacity=".7" fill="none" />
      <path d="M5 -38L10 -38L4 -30" stroke="#fff" strokeWidth="1" opacity=".7" fill="none" />
      {/* gold waist line, door, handle */}
      <path d="M-46 -16H53" stroke="url(#carGold)" strokeWidth="1.6" />
      <path d="M-1 -27V-6" stroke="#cbbd9f" strokeWidth=".6" />
      <rect x="4" y="-22" width="5" height="1.4" rx=".7" fill="url(#carGold)" />
      {/* bumpers & lights */}
      <rect x="47" y="-9" width="9" height="3.4" rx="1.7" fill="url(#carGold)" />
      <rect x="-51" y="-9" width="8" height="3.4" rx="1.7" fill="url(#carGold)" />
      <circle cx="51" cy="-19" r="2.8" fill="#fff4cf" stroke="url(#carGold)" strokeWidth=".8" />
      <rect x="-48" y="-21" width="2.6" height="4" rx="1" fill="#c42a43" />
      {/* number plate */}
      <rect x="44" y="-14" width="10" height="4.4" rx=".8" fill="#fffaf0" stroke="#b8933f" strokeWidth=".3" />
      <text x="49" y="-10.8" textAnchor="middle" fontSize="3" fontWeight="700" fill="#6e2f3c" style={{ fontFamily: "var(--serif)" }}>F♥Z</text>

      {/* flower garland swags along the side */}
      <Garland from={[-44, -24]} to={[-24, -24]} sag={5} n={9} />
      <Garland from={[-22, -26]} to={[-1, -26]} sag={6} n={10} />
      <Garland from={[1, -26]} to={[24, -26]} sag={6} n={10} />
      <Garland from={[26, -26]} to={[46, -24]} sag={5} n={9} />
      {/* strings hanging over the windows */}
      {[-18, -10, 6, 14, 22].map((x) => (
        <g key={x}>
          <line x1={x} y1="-44" x2={x} y2="-31" stroke="#b8933f" strokeWidth=".25" />
          {[0, 1, 2, 3].map((j) => <circle key={j} cx={x} cy={-42 + j * 3.2} r="1.05" fill={j === 3 ? "#c42a43" : "#fffaf0"} stroke="#d8c9a6" strokeWidth=".15" />)}
        </g>
      ))}
      {/* rose bouquet on the bonnet */}
      <path d="M32 -28c4-4 10-4 14 0" fill="#2f7d4f" />
      <Rose x={35} y={-29} r={3} />
      <Rose x={40.5} y={-30.5} r={3.4} c="#d6455d" />
      <Rose x={45.5} y={-28.2} r={2.8} />
      <circle cx="38" cy="-33" r="1.3" fill="#fffaf0" />
      <circle cx="43" cy="-34" r="1.3" fill="#f7b73f" />
      {/* floral crown on the roof with a bow */}
      <path d="M-10 -45Q2 -52 16 -45" fill="#2f7d4f" />
      <Rose x={-5} y={-47} r={2.6} />
      <Rose x={1.5} y={-49.5} r={3} c="#d6455d" />
      <Rose x={8.5} y={-48.5} r={2.7} />
      <circle cx="13" cy="-46.5" r="1.4" fill="#f7b73f" />
      <circle cx="-9" cy="-45.5" r="1.3" fill="#fffaf0" />
      <path d="M1 -52l-4 -3v5zM2 -52l4 -3v5z" fill="#e3c27a" />

      {/* wheels (spokes rotate with distance) */}
      {[
        { x: -30, ref: wheelA },
        { x: 32, ref: wheelB },
      ].map((w) => (
        <g key={w.x} transform={`translate(${w.x} -4)`}>
          <circle r="9" fill="#2b2624" />
          <circle r="6.4" fill="#fbf8f1" />
          <g ref={w.ref}>
            <circle r="5.4" fill="url(#carGold)" />
            {[0, 45, 90, 135].map((a) => (
              <rect key={a} x="-.5" y="-5" width="1" height="10" fill="#8f6d22" transform={`rotate(${a})`} />
            ))}
            <circle r="1.8" fill="#fbf8f1" stroke="#8f6d22" strokeWidth=".5" />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Scenery                                                             */
/* ------------------------------------------------------------------ */
/* deterministic pseudo-random so server & client render the same */
const rnd = (i: number, k = 1) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;

const STARS = Array.from({ length: 46 }, (_, i) => ({ x: rnd(i) * 800, y: rnd(i, 2) * 170, r: 0.6 + rnd(i, 3) * 1.3, d: (rnd(i, 4) * 3).toFixed(2) }));
const FROST = Array.from({ length: 34 }, (_, i) => ({ x: rnd(i, 5) * 800, y: 300 + rnd(i, 6) * 115, d: (rnd(i, 7) * 3).toFixed(2) }));

function Cypress({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-1.2" y="-6" width="2.4" height="6" fill="#4a3a36" />
      <path d="M0 -44C7 -30 9 -16 6 -6H-6C-9 -16 -7 -30 0 -44Z" fill="#2f5a55" />
      <path d="M0 -44C4 -30 5 -16 3 -6H0Z" fill="#3d6f68" />
    </g>
  );
}

function BareTree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#5a4a4c" strokeLinecap="round" fill="none">
      <path d="M0 0V-26" strokeWidth="2.6" />
      <path d="M0 -14L-10 -24M0 -18L9 -28M0 -24L-5 -34M0 -24L6 -36M-10 -24L-14 -30M9 -28L14 -32" strokeWidth="1.3" />
    </g>
  );
}

function Palm({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0C-2 -14 1 -28 -1 -40" stroke="#6b5448" strokeWidth="3" fill="none" />
      <g fill="#35645a">
        <path d="M-1 -40C-10 -44 -18 -40 -22 -34C-14 -38 -8 -38 -1 -40Z" />
        <path d="M-1 -40C8 -45 17 -42 21 -35C13 -39 7 -39 -1 -40Z" />
        <path d="M-1 -40C-6 -48 -14 -50 -19 -48C-12 -46 -7 -44 -1 -40Z" />
        <path d="M-1 -40C4 -49 11 -52 17 -50C10 -47 5 -45 -1 -40Z" />
        <path d="M-1 -40C-2 -48 1 -54 4 -56C2 -50 1 -45 -1 -40Z" />
      </g>
      <circle cx="-2" cy="-38" r="1.8" fill="#b87a3a" /><circle cx="1" cy="-37" r="1.8" fill="#b87a3a" />
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cy="-36" r="16" fill="url(#lampGlow)" className="lamp-glow" />
      <rect x="-1" y="-34" width="2" height="34" fill="#3d3a44" />
      <path d="M-4 -36h8l-1.5 -6h-5z" fill="#3d3a44" />
      <rect x="-2.6" y="-35" width="5.2" height="4" fill="#ffe3a0" />
    </g>
  );
}

/** a draped string of twinkling fairy bulbs */
function Lights({ x1, y1, x2, y2, sag, n, id }: { x1: number; y1: number; x2: number; y2: number; sag: number; n: number; id: number }) {
  return (
    <g>
      <path d={`M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`} fill="none" stroke="#4a3a36" strokeWidth=".5" opacity=".6" />
      {Array.from({ length: n }, (_, i) => {
        const t = i / (n - 1);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t + 4 * sag * t * (1 - t);
        return <circle key={i} className="bulb" cx={x} cy={y} r="1.3" fill={i % 3 === 1 ? "#ffc3c3" : "#ffe7a3"} style={{ animationDelay: `${((i + id) * 0.29) % 2}s` }} />;
      })}
    </g>
  );
}

/** vertical strands of lights hanging down a facade (like a mehndi house) */
function LightCurtain({ x, y, w, h, n, id }: { x: number; y: number; w: number; h: number; n: number; id: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const sx = x + (w / (n - 1)) * i;
        const len = h * (0.55 + 0.45 * rnd(i + id, 9));
        const beads = Math.floor(len / 4);
        return (
          <g key={i}>
            <line x1={sx} y1={y} x2={sx} y2={y + len} stroke="#4a3a36" strokeWidth=".3" opacity=".5" />
            {Array.from({ length: beads }, (_, j) => (
              <circle key={j} className="bulb" cx={sx} cy={y + 2 + j * 4} r=".95" fill={j % 4 === 3 ? "#ffc3c3" : "#ffe7a3"} style={{ animationDelay: `${((i * 3 + j + id) * 0.17) % 2}s` }} />
            ))}
          </g>
        );
      })}
    </g>
  );
}

function Hasilpur() {
  const win = "#ffd98a";
  return (
    <g>
      {/* warm town glow */}
      <ellipse cx="100" cy="280" rx="130" ry="46" fill="url(#townGlow)" />
      {/* back row */}
      <rect x="8" y="262" width="30" height="38" fill="#b9a4a4" />
      <rect x="150" y="258" width="34" height="42" fill="#b9a4a4" />
      <rect x="14" y="270" width="5" height="6" fill={win} opacity=".8" /><rect x="162" y="266" width="5" height="6" fill={win} opacity=".8" /><rect x="172" y="276" width="5" height="6" fill={win} opacity=".8" />

      {/* little mosque */}
      <g>
        <rect x="120" y="258" width="26" height="42" fill="#efe6da" />
        <path d="M120 258c0-18 26-18 26 0z" fill="#f6efe4" stroke="#d8c9b0" strokeWidth=".6" />
        <path d="M133 240v-6" stroke="#c8a96a" strokeWidth="1" />
        <path d="M131.5 233.5a2.2 2.2 0 1 0 3 0a1.7 1.7 0 1 1 -3 0z" fill="#e3c27a" />
        <path d="M128 300v-10a5 5 0 0 1 10 0v10z" fill="#8e6a5a" />
        <rect x="148" y="236" width="6" height="64" fill="#efe6da" />
        <path d="M147 236c0-8 8-8 8 0z" fill="#f6efe4" /><rect x="147" y="250" width="8" height="2" fill="#c8a96a" />
        <rect x="123" y="266" width="4" height="6" rx="2" fill={win} /><rect x="139" y="266" width="4" height="6" rx="2" fill={win} />
      </g>

      {/* groom's house, dressed in wedding lights */}
      <g>
        <rect x="40" y="244" width="62" height="56" fill="#f3e6d6" />
        <rect x="37" y="240" width="68" height="5" fill="#d8c3a8" />
        {[40, 50, 60, 70, 80, 90, 100].map((x) => <rect key={x} x={x} y="234" width="5" height="6" fill="#d8c3a8" />)}
        <path d="M63 300v-18a8 8 0 0 1 16 0v18z" fill="#7a3f45" />
        <path d="M63 300v-18a8 8 0 0 1 16 0" fill="none" stroke="#c8a96a" strokeWidth="1" />
        {[46, 86].map((x) => <g key={x}><rect x={x} y="258" width="9" height="11" rx="4.5" fill={win} /><rect x={x} y="276" width="9" height="11" rx="4.5" fill={win} /></g>)}
        <LightCurtain x={40} y={245} w={62} h={46} n={14} id={1} />
        <Lights x1={36} y1={236} x2={106} y2={236} sag={6} n={16} id={3} />
      </g>
      <Lights x1={8} y1={262} x2={40} y2={246} sag={4} n={8} id={7} />
      <Lights x1={102} y1={246} x2={120} y2={258} sag={3} n={6} id={11} />

      <Palm x={6} y={304} s={1.05} />
      <Palm x={190} y={302} s={0.9} />
    </g>
  );
}

/** the bride's family haveli (Ghulam Nabi house) in Hasilpur, dressed for the wedding */
function MalikHaveli() {
  const win = "#ffd98a";
  const stone = "#f1e6d6", trim = "#c9937e", shade = "#dccab3";
  const Chhatri = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-9" y="-2" width="18" height="3" fill={trim} />
      <rect x="-8" y="-16" width="2.4" height="14" fill={stone} /><rect x="5.6" y="-16" width="2.4" height="14" fill={stone} />
      <path d="M-10 -16h20" stroke={trim} strokeWidth="2" />
      <path d="M-8 -17c0-11 16-11 16 0z" fill="#fbf6ee" stroke={shade} strokeWidth=".6" />
      <path d="M0 -26v-4" stroke="#c8a96a" strokeWidth="1" /><circle cy="-31" r="1.4" fill="#e3c27a" />
      <path d="M-5.6 -2v-8a5.6 5.6 0 0 1 11.2 0v8z" fill={win} opacity=".7" />
    </g>
  );
  return (
    <g>
      <ellipse cx="695" cy="240" rx="150" ry="70" fill="url(#townGlow)" />

      {/* side wings */}
      {[590, 742].map((x) => (
        <g key={x}>
          <rect x={x} y="214" width="58" height="56" fill={stone} />
          <rect x={x - 2} y="210" width="62" height="5" fill={trim} />
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M${x + 8 + k * 16} 262v-22a6 6 0 0 1 12 0v22z`} fill={k === 1 ? "#7a3f45" : win} opacity={k === 1 ? 1 : 0.85} stroke={trim} strokeWidth=".8" />
          ))}
          {Array.from({ length: 7 }, (_, k) => <rect key={k} x={x + 2 + k * 8.5} y="204" width="4.5" height="6" fill={trim} />)}
        </g>
      ))}

      {/* central block */}
      <rect x="646" y="176" width="98" height="94" fill={stone} />
      <rect x="642" y="170" width="106" height="7" fill={trim} />
      {Array.from({ length: 11 }, (_, k) => <rect key={k} x={644 + k * 9.8} y="162" width="5.5" height="8" fill={trim} />)}
      <path d="M646 196h98" stroke={shade} strokeWidth="1" />

      {/* jharokha balcony */}
      <g>
        <rect x="676" y="186" width="38" height="4" fill={trim} />
        <path d="M672 214h46l-4 8h-38z" fill={trim} />
        <rect x="678" y="190" width="34" height="24" fill="#fbf6ee" stroke={shade} strokeWidth=".6" />
        {[680, 691, 702].map((x) => <path key={x} d={`M${x} 212v-12a4.5 4.5 0 0 1 9 0v12z`} fill={win} />)}
        <path d="M676 186c0-14 38-14 38 0z" fill="#fbf6ee" stroke={shade} strokeWidth=".6" />
        <path d="M695 173v-5" stroke="#c8a96a" strokeWidth="1" /><circle cx="695" cy="167" r="1.8" fill="#e3c27a" />
      </g>

      {/* grand entrance with marigold garland */}
      <path d="M678 270v-30a17 17 0 0 1 34 0v30z" fill="#6e3940" />
      <path d="M682 270v-28a13 13 0 0 1 26 0v28z" fill={win} opacity=".9" />
      <path d="M678 270v-30a17 17 0 0 1 34 0v30" fill="none" stroke="#c8a96a" strokeWidth="1.4" />
      {Array.from({ length: 15 }, (_, k) => {
        const t = k / 14, ang = Math.PI * (1 - t);
        return <circle key={k} cx={695 + Math.cos(ang) * 19} cy={241 - Math.sin(ang) * 19} r="2" fill={k % 3 === 1 ? "#c42a43" : "#f0a02c"} />;
      })}
      {[656, 724].map((x) => <path key={x} d={`M${x} 256v-18a5.5 5.5 0 0 1 11 0v18z`} fill={win} opacity=".85" stroke={trim} strokeWidth=".8" />)}

      {/* rooftop chhatris */}
      <Chhatri x={650} y={162} s={0.9} />
      <Chhatri x={740} y={162} s={0.9} />
      <Chhatri x={596} y={204} s={0.7} />
      <Chhatri x={794} y={204} s={0.7} />

      {/* wedding lights all over the haveli */}
      <LightCurtain x={648} y={198} w={94} h={38} n={18} id={41} />
      <LightCurtain x={592} y={216} w={54} h={22} n={9} id={47} />
      <LightCurtain x={744} y={216} w={54} h={22} n={9} id={53} />
      <Lights x1={596} y1={196} x2={650} y2={150} sag={10} n={14} id={59} />
      <Lights x1={740} y1={150} x2={794} y2={196} sag={10} n={14} id={63} />
      <Lights x1={642} y1={164} x2={748} y2={164} sag={6} n={20} id={67} />
      <Lights x1={590} y1={210} x2={800} y2={210} sag={3} n={34} id={71} />

      <Palm x={578} y={274} s={1} />
    </g>
  );
}

/** dx shifts the label pill sideways (keeps it inside the frame) while the pin stays put */
function Pin({ x, y, label, color, dx = 0 }: { x: number; y: number; label: string; color: string; dx?: number }) {
  const w = label.length * 9.4 + 26;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={dx - w / 2} y="-44" width={w} height="26" rx="13" fill="#fffaf0" stroke="#c8a96a" strokeWidth="1" />
      <text x={dx} y="-26" textAnchor="middle" fontSize="16" fontWeight="600" fill="#6e2f3c" style={{ fontFamily: "var(--serif)" }}>{label}</text>
      <path d="M0 0c-6-7-9-11-9-15a9 9 0 0 1 18 0c0 4-3 8-9 15z" fill={color} />
      <circle cy="-15" r="3.4" fill="#fffaf0" />
    </g>
  );
}

const petals = Array.from({ length: 30 }, (_, i) => ({
  t: 0.03 + (i / 30) * 0.94,
  off: ((i * 37) % 13) - 6,
  rot: (i * 53) % 360,
  c: ["#e9b8b0", "#f7b73f", "#c42a43", "#fffaf0"][i % 4],
}));

export default function Journey() {
  const box = useRef<HTMLDivElement>(null);
  const road = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const car = useRef<SVGGElement>(null);
  const wheelA = useRef<SVGGElement>(null);
  const wheelB = useRef<SVGGElement>(null);
  const petalRefs = useRef<(SVGEllipseElement | null)[]>([]);
  const [arrived, setArrived] = useState(false);

  const { scrollYProgress } = useScroll({ target: box, offset: ["start 75%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  const place = (v: number) => {
    const el = road.current, c = car.current;
    if (!el || !c) return;
    const len = el.getTotalLength();
    const d = v * len;
    const a = el.getPointAtLength(d);
    const b = el.getPointAtLength(Math.min(len, d + 2));
    const ang = Math.max(-16, Math.min(16, (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI));
    c.setAttribute("transform", `translate(${a.x} ${a.y - 5}) rotate(${ang}) scale(1.3)`);
    const spin = (d / (2 * Math.PI * 9)) * 360;
    wheelA.current?.setAttribute("transform", `rotate(${spin})`);
    wheelB.current?.setAttribute("transform", `rotate(${spin})`);
    if (trail.current) {
      trail.current.style.strokeDasharray = `${len}`;
      trail.current.style.strokeDashoffset = `${len * (1 - v)}`;
    }
    petals.forEach((pt, i) => {
      const n = petalRefs.current[i];
      if (n) n.style.opacity = v > pt.t + 0.02 ? "0.9" : "0";
    });
    setArrived(v > 0.97);
  };

  useEffect(() => {
    // lay petals along the road once, then place the car at the start
    const el = road.current;
    if (el) {
      const len = el.getTotalLength();
      petals.forEach((pt, i) => {
        const n = petalRefs.current[i];
        if (!n) return;
        const q = el.getPointAtLength(pt.t * len);
        n.setAttribute("transform", `translate(${q.x} ${q.y + pt.off}) rotate(${pt.rot})`);
      });
    }
    place(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMotionValueEvent(p, "change", place);

  const barat = events.find((e) => e.key === "barat")!;

  return (
    <section className="journey">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">13 November · 5:00 PM · Hasilpur</Reveal>
        <Reveal as="h2" className="title" delay={0.1}>The Barat <em className="foil">Journey</em></Reveal>

        <div className={`scene${arrived ? " arrived" : ""}`} ref={box}>
          <svg viewBox="0 0 800 420" role="img" aria-label="On a winter evening the Barat drives across Hasilpur from the Ghulam Rasool house to the Ghulam Nabi house">
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2c3157" />
                <stop offset=".38" stopColor="#5b5582" />
                <stop offset=".66" stopColor="#c4899a" />
                <stop offset=".86" stopColor="#f0b9a0" />
                <stop offset="1" stopColor="#f8d3b0" />
              </linearGradient>
              <radialGradient id="moonGlow">
                <stop offset="0" stopColor="#fff6e0" stopOpacity=".55" />
                <stop offset="1" stopColor="#fff6e0" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="townGlow">
                <stop offset="0" stopColor="#ffd98a" stopOpacity=".45" />
                <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lampGlow">
                <stop offset="0" stopColor="#ffe3a0" stopOpacity=".9" />
                <stop offset="1" stopColor="#ffe3a0" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8aa79f" />
                <stop offset="1" stopColor="#5f7f7a" />
              </linearGradient>
              <linearGradient id="fogG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#f3eef5" stopOpacity="0" />
                <stop offset=".5" stopColor="#f3eef5" stopOpacity=".55" />
                <stop offset="1" stopColor="#f3eef5" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* winter twilight sky */}
            <rect width="800" height="420" fill="url(#sky)" />
            {STARS.map((st, i) => (
              <circle key={i} className="star" cx={st.x} cy={st.y} r={st.r} fill="#fff8e7" style={{ animationDelay: `${st.d}s` }} />
            ))}
            <circle cx="150" cy="70" r="46" fill="url(#moonGlow)" />
            <path d="M150 48a22 22 0 1 0 16 38a18 18 0 1 1 -16 -38z" fill="#fff4dc" />
            <g className="cloud c2" fill="#e9dcea" opacity=".35">
              <ellipse cx="520" cy="96" rx="70" ry="9" /><ellipse cx="560" cy="88" rx="34" ry="8" />
            </g>

            {/* distant hills in the cold haze */}
            <path d="M0 246C90 212 180 222 270 240S430 214 520 228S700 208 800 226V420H0Z" fill="#7d86a4" />
            <path d="M0 266C120 242 230 254 330 262S520 244 640 254S760 248 800 252V420H0Z" fill="#6f8792" />
            <rect className="fog f1" x="-100" y="236" width="1000" height="34" fill="url(#fogG)" />

            <MalikHaveli />

            {/* frosty fields */}
            <path d="M0 290C160 274 320 284 480 278S700 266 800 272V420H0Z" fill="url(#field)" />
            <g stroke="#a6c0b8" strokeWidth="1" fill="none" opacity=".6">
              <path d="M0 330C200 316 420 330 800 300" /><path d="M0 360C220 350 460 368 800 340" /><path d="M0 395C240 390 500 405 800 380" />
            </g>
            {FROST.map((f, i) => (
              <circle key={i} className="frost" cx={f.x} cy={f.y} r=".9" fill="#ffffff" style={{ animationDelay: `${f.d}s` }} />
            ))}

            <Hasilpur />

            {/* winter trees along the way */}
            <Cypress x={232} y={292} s={0.8} />
            <BareTree x={262} y={296} s={0.9} />
            <Cypress x={350} y={294} s={0.9} />
            <BareTree x={455} y={286} s={0.8} />
            <Cypress x={560} y={290} s={0.85} />
            <BareTree x={430} y={414} s={1.4} />
            <Cypress x={150} y={420} s={1.4} />
            <Cypress x={600} y={420} s={1.2} />

            <rect className="fog f2" x="-100" y="296" width="1000" height="26" fill="url(#fogG)" />

            {/* street lamps */}
            <Lamp x={118} y={357} />
            <Lamp x={300} y={296} />
            <Lamp x={470} y={346} />
            <Lamp x={590} y={290} />

            {/* road */}
            <path d={ROAD} fill="none" stroke="#c9c2c6" strokeWidth="36" strokeLinecap="round" />
            <path ref={road} d={ROAD} fill="none" stroke="#5a5660" strokeWidth="28" strokeLinecap="round" />
            <path d={ROAD} fill="none" stroke="#fffaf0" strokeWidth="1.6" strokeDasharray="10 10" opacity=".8" />
            <path ref={trail} d={ROAD} fill="none" stroke="#e3c27a" strokeWidth="3" strokeLinecap="round" opacity=".95" />

            {/* petals scattered behind the car */}
            {petals.map((pt, i) => (
              <ellipse
                key={i}
                ref={(n) => { petalRefs.current[i] = n; }}
                rx="3.2" ry="1.8" fill={pt.c} opacity="0"
                style={{ transition: "opacity .4s" }}
              />
            ))}

            {/* place markers */}
            <Pin x={71} y={226} dx={40} label="Ghulam Rasool House" color="#1f3a5f" />
            <Pin x={695} y={128} label="Ghulam Nabi House" color="#8e2436" />

            {/* fireworks over the Ghulam Nabi house on arrival */}
            <g className="fireworks" aria-hidden="true">
              {[
                { x: 640, y: 90, c: "#e3c27a", d: "0s" },
                { x: 760, y: 80, c: "#e9b8b0", d: ".5s" },
                { x: 705, y: 50, c: "#fffaf0", d: "1s" },
              ].map((f) => (
                <g key={f.x} transform={`translate(${f.x} ${f.y})`}>
                  <g className="fw" style={{ animationDelay: f.d }}>
                    {Array.from({ length: 12 }, (_, k) => (
                      <line key={k} x1="0" y1="6" x2="0" y2="18" stroke={f.c} strokeWidth="2" strokeLinecap="round" transform={`rotate(${k * 30})`} />
                    ))}
                  </g>
                </g>
              ))}
            </g>

            {/* the car */}
            <g ref={car}>
              <WeddingCar wheelA={wheelA} wheelB={wheelB} />
            </g>
          </svg>
        </div>

        <Reveal as="p" className="journey-caption">Across Hasilpur — to bring Zurtashey home</Reveal>
        <Reveal delay={0.15}>
          <a className="btn solid" style={{ marginTop: 22 }} href={barat.map} target="_blank" rel="noopener noreferrer">View Barat Location</a>
        </Reveal>
      </div>
    </section>
  );
}
