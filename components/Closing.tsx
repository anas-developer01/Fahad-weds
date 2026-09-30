"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Floral, Icon } from "./Art";
import Reveal from "./Reveal";
import { contacts, families, intlPhone, prettyPhone } from "@/lib/wedding";

export function Dua() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const f1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const f2 = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  return (
    <section ref={ref} className="dua">
      <motion.div className="corner tr" style={{ y: f1, top: 0 }}><Floral /></motion.div>
      <motion.div className="corner bl" style={{ y: f2, bottom: 0 }}><Floral /></motion.div>
      <div className="wrap">
        <Reveal className="divider">❦</Reveal>
        <Reveal as="p" className="ar" delay={0.1}>بَارَكَ اللّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</Reveal>
        <Reveal as="p" className="en" delay={0.2}>“May Allah bless you both, shower His blessings upon you, and unite you in goodness.”</Reveal>
        <Reveal className="host" delay={0.3}>
          <p>With best compliments from</p>
          <h4>{families.groom.father} &amp; {families.groom.mother}</h4>
        </Reveal>
        <Reveal className="host forward" delay={0.4}>
          <p>Looking forward</p>
          <ul className="forward-list">
            {families.lookingForward.map((name) => <li key={name}>{name}</li>)}
          </ul>
          <p className="forward-sub">Brother &amp; Cousins</p>
          <ul className="forward-list small">
            <li className="brother">{families.brother} <span>(Brother)</span></li>
            {families.cousins.map((name) => <li key={name}>{name}</li>)}
          </ul>
        </Reveal>
        <Reveal className="host contact" delay={0.2}>
          <p>For Queries</p>
          <div className="contact-list">
            {contacts.map((c) => (
              <div key={c.phone} className="contact-card">
                <h5>{c.name}</h5>
                <span className="contact-role">{c.role}</span>
                <a className="contact-num" href={`tel:+${intlPhone(c.phone)}`}>{prettyPhone(c.phone)}</a>
                <div className="contact-actions">
                  <a className="btn solid" href={`tel:+${intlPhone(c.phone)}`}>{Icon.phone}Call</a>
                  <a className="btn" href={`https://wa.me/${intlPhone(c.phone)}`} target="_blank" rel="noopener noreferrer">{Icon.whatsapp}WhatsApp</a>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const [toast, setToast] = useState("");
  const share = async () => {
    const data = { title: "Anas & Iram — Wedding Invitation", text: "You are invited to the wedding of Anas & Iram 💍", url: location.href };
    try {
      if (navigator.share) { await navigator.share(data); return; }
      await navigator.clipboard.writeText(location.href);
      setToast("Link copied"); setTimeout(() => setToast(""), 2200);
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") window.open(`https://wa.me/?text=${encodeURIComponent(`${data.text} ${data.url}`)}`, "_blank");
    }
  };
  return (
    <footer className="footer">
      <motion.div
        className="mono"
        initial={{ rotate: -120, scale: 0.4, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <span className="foil">A&amp;I</span>
      </motion.div>
      <Reveal as="p" className="thanks" delay={0.2}><span className="foil">We can&apos;t wait to celebrate with you</span></Reveal>
      <Reveal as="p" className="sub" delay={0.3}>Anas &amp; Iram · November 2026</Reveal>
      <Reveal delay={0.4}>
        <button className="btn" onClick={share}>{Icon.share}Share Invitation</button>
      </Reveal>
      <p className="credit">{"// built with love by the groom"}</p>
      <div className={`toast${toast ? " show" : ""}`}>{toast}</div>
    </footer>
  );
}
