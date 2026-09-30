"use client";

import Lenis from "lenis";
import { useEffect } from "react";

declare global {
  interface Window { __lenis?: Lenis; __inviteReady?: boolean }
}

export function scrollToY(y: number, duration = 2) {
  if (window.__lenis) window.__lenis.scrollTo(y, { duration });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.__lenis; };
  }, []);
  return null;
}
