"use client";

import { motion, MotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Floral } from "./Art";

/* ------------------------------------------------------------------ */
/*  One ivory door leaf (drawn for the RIGHT door; left mirrors it)     */
/* ------------------------------------------------------------------ */
const petals12 = Array.from({ length: 12 }, (_, i) => i * 30);

function DoorLeaf({ seam }: { seam: "left" | "right" }) {
  return (
    <svg
      className="door-leaf"
      viewBox="0 0 300 960"
      preserveAspectRatio={seam === "left" ? "xMinYMax slice" : "xMaxYMax slice"}
      style={seam === "right" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {/* fanlight lattice (the arch clips its top) */}
      <rect x="0" y="0" width="300" height="300" fill="url(#ivJali)" />
      <path d="M0 300H300" stroke="#c8a96a" strokeWidth="1.4" />
      <path d="M0 307H300" stroke="#c8a96a" strokeWidth=".5" />

      {/* upper panel with rosette */}
      <rect x="44" y="340" width="222" height="270" rx="3" fill="#fbf8f1" stroke="#c8a96a" strokeWidth="1.2" />
      <rect x="54" y="350" width="202" height="250" rx="2" fill="none" stroke="#c8a96a" strokeWidth=".5" opacity=".7" />
      <g transform="translate(155 475)" fill="none" stroke="#c8a96a">
        <circle r="50" strokeWidth="1" />
        <circle r="44" strokeWidth=".5" strokeDasharray="1.5 3.5" />
        {petals12.map((r) => (
          <ellipse key={r} cx="0" cy="-24" rx="6.5" ry="16" transform={`rotate(${r})`} strokeWidth=".8" />
        ))}
        <circle r="6" fill="#c8a96a" stroke="none" />
      </g>

      {/* lower panel with diamond */}
      <rect x="44" y="640" width="222" height="290" rx="3" fill="#fbf8f1" stroke="#c8a96a" strokeWidth="1.2" />
      <rect x="54" y="650" width="202" height="270" rx="2" fill="none" stroke="#c8a96a" strokeWidth=".5" opacity=".7" />
      <path d="M155 672L230 785L155 898L80 785Z" fill="url(#ivJali)" stroke="#c8a96a" strokeWidth=".8" />
      <use href="#bloom" transform="translate(155 785) scale(.5)" />

      {/* ring handle beside the seam */}
      <g fill="none" stroke="#b8933f">
        <circle cx="22" cy="600" r="3" fill="#b8933f" />
        <circle cx="22" cy="614" r="10" strokeWidth="1.6" />
      </g>

      {/* seam line — fades out behind the names at the bottom */}
      <rect x="0" y="0" width="3" height="960" fill="url(#gSeam)" />
    </svg>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <g transform="translate(100 100)">
        <circle r="96" fill="#fbf8f1" />
        <circle r="96" fill="none" stroke="#c8a96a" strokeWidth="1" />
        <circle r="88" fill="url(#sealGreen)" />
        <circle r="82" fill="none" stroke="#e6d3a3" strokeWidth=".8" strokeDasharray="1.5 4" />
        <circle r="74" fill="none" stroke="#c8a96a" strokeWidth="1.2" />
        <text y="16" textAnchor="middle" fontSize="48" fontWeight="500" fill="#ecdcae" style={{ fontFamily: "var(--serif)", letterSpacing: 2 }}>
          A<tspan fontStyle="italic" fill="#c8a96a">&amp;</tspan>I
        </text>
        <path d="M-22 34h44" stroke="#c8a96a" strokeWidth=".8" />
        <circle cy="34" r="2" fill="#ecdcae" />
      </g>
    </svg>
  );
}

/* pointed Mughal arch, in 0..1 box units */
const ARCH_BOX = "M0 1V0.34C0 0.22 0.14 0.16 0.3 0.11C0.42 0.075 0.48 0.04 0.5 0C0.52 0.04 0.58 0.075 0.7 0.11C0.86 0.16 1 0.22 1 0.34V1Z";

function GateDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <clipPath id="portalClip" clipPathUnits="objectBoundingBox">
          <path d={ARCH_BOX} />
        </clipPath>
        <linearGradient id="gSeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8a96a" />
          <stop offset=".72" stopColor="#c8a96a" />
          <stop offset=".8" stopColor="#c8a96a" stopOpacity="0" />
          <stop offset="1" stopColor="#c8a96a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sealGreen" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#b76e79" />
          <stop offset="1" stopColor="#6e2f3c" />
        </radialGradient>
        <pattern id="ivJali" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M9 0L18 9L9 18L0 9Z" fill="none" stroke="#c8a96a" strokeWidth=".45" opacity=".5" />
          <circle cx="9" cy="9" r="1" fill="#c8a96a" opacity=".5" />
        </pattern>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  The gateway                                                         */
/* ------------------------------------------------------------------ */
export default function Gate({ p, onOpen }: { p: MotionValue<number>; onOpen: () => void }) {
  // auto-open 5 seconds after the gate is revealed (skipped if the guest already scrolled)
  const AUTO_OPEN_SECONDS = 5;
  const [count, setCount] = useState<number | null>(null);
  const openRef = useRef(onOpen);
  openRef.current = onOpen;
  useEffect(() => {
    let id = 0;
    const start = () => {
      let n = AUTO_OPEN_SECONDS;
      setCount(n);
      id = window.setInterval(() => {
        n -= 1;
        setCount(n);
        if (n <= 0) {
          clearInterval(id);
          if (window.scrollY < 40) openRef.current();
        }
      }, 1000);
    };
    if (window.__inviteReady) start();
    else window.addEventListener("invite:ready", start, { once: true });
    return () => { clearInterval(id); window.removeEventListener("invite:ready", start); };
  }, []);

  const leftRot = useTransform(p, [0.05, 0.4], [0, -100]);
  const rightRot = useTransform(p, [0.05, 0.4], [0, 100]);
  const glow = useTransform(p, [0.05, 0.3], [0, 1]);

  // walk through the gateway
  const gateScale = useTransform(p, [0.28, 0.62], [1, 2.8]);
  const gateOpacity = useTransform(p, [0.44, 0.62], [1, 0]);

  const sealScale = useTransform(p, [0, 0.08], [1, 1.3]);
  const sealOpacity = useTransform(p, [0.01, 0.08], [1, 0]);
  const textOpacity = useTransform(p, [0, 0.06], [1, 0]);
  const hintY = useTransform(p, [0, 0.06], [0, 20]);

  return (
    <motion.div className="gateway" style={{ scale: gateScale, opacity: gateOpacity }}>
      <GateDefs />
      <div className="wall" aria-hidden="true" />

      <div className="gate-lantern left" aria-hidden="true"><svg viewBox="0 0 60 150"><use href="#lanternSym" /></svg></div>
      <div className="gate-lantern right" aria-hidden="true"><svg viewBox="0 0 60 150"><use href="#lanternSym" /></svg></div>

      <div className="portal">
        <div className="portal-inner">
          <motion.div className="portal-glow" style={{ opacity: glow }} aria-hidden="true" />
          <motion.div className="door left" style={{ rotateY: leftRot }} aria-hidden="true">
            <DoorLeaf seam="right" />
            <div className="door-shade" />
          </motion.div>
          <motion.div className="door right" style={{ rotateY: rightRot }} aria-hidden="true">
            <DoorLeaf seam="left" />
            <div className="door-shade" />
          </motion.div>
        </div>

        {/* ivory & gold arch frame */}
        <svg className="portal-frame" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
          <path d={ARCH_BOX} fill="none" stroke="#c8a96a" strokeWidth="22" vectorEffect="non-scaling-stroke" />
          <path d={ARCH_BOX} fill="none" stroke="#f4ecdb" strokeWidth="18" vectorEffect="non-scaling-stroke" />
          <path d={ARCH_BOX} fill="none" stroke="#c8a96a" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="finial" viewBox="0 0 40 70" aria-hidden="true">
          <path d="M20 0v14" stroke="#c8a96a" strokeWidth="1.5" />
          <circle cx="20" cy="18" r="4" fill="#c8a96a" />
          <path d="M8 44c0-12 6-18 12-22 6 4 12 10 12 22z" fill="#f4ecdb" stroke="#c8a96a" strokeWidth="1.2" />
          <path d="M4 44h32v5H4z" fill="#c8a96a" />
          <circle cx="20" cy="36" r="2.4" fill="#c8a96a" />
        </svg>

        <motion.div className="gate-floral bl" style={{ opacity: textOpacity }} aria-hidden="true"><Floral /></motion.div>
        <motion.div className="gate-floral br" style={{ opacity: textOpacity }} aria-hidden="true"><Floral /></motion.div>

        <motion.button className="seal" style={{ scale: sealScale, opacity: sealOpacity, x: "-50%", y: "-50%" }} onClick={onOpen} aria-label="Open the invitation">
          <Seal />
        </motion.button>

        <motion.div className="gate-hint" style={{ opacity: textOpacity, y: hintY, x: "-50%" }}>
          <span className="names-top">Anas <em>&amp;</em> Iram</span>
          {count !== null && (
            <>
              <span className="auto-bar" aria-hidden="true"><i style={{ animationDuration: `${AUTO_OPEN_SECONDS}s` }} /></span>
              <span className="label" aria-live="polite">{count > 0 ? `Opening in ${count}` : "Opening…"}</span>
            </>
          )}
        </motion.div>
      </div>

      <motion.div className="gate-top" style={{ opacity: textOpacity, x: "-50%" }}>
        <p className="bism">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <p className="kicker">You are invited to the wedding of</p>
      </motion.div>
    </motion.div>
  );
}
