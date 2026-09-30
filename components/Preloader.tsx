"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.classList.add("loading");
    window.__lenis?.stop();
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.classList.remove("loading");
        window.__lenis?.start();
        window.__inviteReady = true;
        window.dispatchEvent(new Event("invite:ready"));
      }}
    >
      {show && (
        <motion.div
          className="preloader"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg viewBox="0 0 150 150" aria-hidden="true">
            <motion.circle
              cx="75" cy="75" r="68" fill="#fbf8f1" fillOpacity=".06" stroke="#d9b56a" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
            <motion.circle
              cx="75" cy="75" r="60" fill="none" stroke="#ecd7a4" strokeWidth=".6" strokeDasharray="2 5"
              initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1.8, delay: .3 }}
              style={{ transformOrigin: "75px 75px" }}
            />
            <motion.text
              x="75" y="88" textAnchor="middle" fontSize="40" fontWeight="600" fill="#fbf3de"
              style={{ fontFamily: "var(--serif)", letterSpacing: 2 }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: .7 }}
            >
              A<tspan fill="#e3c27a" fontStyle="italic">&amp;</tspan>I
            </motion.text>
          </svg>
          <motion.p className="bism" lang="ar" dir="rtl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: .9 }}>
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
