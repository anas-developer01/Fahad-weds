"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { calendarUrl, events, type WeddingEvent } from "@/lib/wedding";
import { BaratArt, Icon, MehndiArt, Scallop, WalimaArt } from "./Art";
import Reveal from "./Reveal";

const art = { mehndi: <MehndiArt />, barat: <BaratArt />, walima: <WalimaArt /> };

function EventCard({ e, i }: { e: WeddingEvent; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [40, -30]);
  const artScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.04, 1]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const side = i % 2 ? 1 : -1;

  return (
    <article ref={ref} className="ev" style={{ ["--accent" as string]: e.accent }}>
      <motion.div
        className="node"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
      >
        {i + 1}
      </motion.div>
      <motion.div
        className="ev-card"
        initial={{ opacity: 0, x: 60 * side, rotateY: 14 * side, y: 30 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1400 }}
        whileHover={{ y: -6 }}
      >
        <div className="ev-art">
          <motion.div style={{ y: artY, scale: artScale, rotate: artRotate }}>{art[e.key]}</motion.div>
          <Scallop />
        </div>
        <div className="ev-body">
          <h3>{e.title}</h3>
          <p className="day">{e.day}</p>
          <p className="row">{Icon.clock}{e.time}</p>
          <p className="row">{Icon.pin}{e.venue}</p>
          <div className="actions">
            <a className="btn solid" href={e.map} target="_blank" rel="noopener noreferrer">{Icon.pin}Location</a>
            <a className="btn" href={calendarUrl(e)} target="_blank" rel="noopener noreferrer">{Icon.cal}Add to Calendar</a>
          </div>
        </div>
      </motion.div>
    </article>
  );
}

export default function Events() {
  const tl = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tl, offset: ["start 70%", "end 70%"] });
  const rail = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="events" id="events">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">The Celebrations</Reveal>
        <Reveal as="h2" className="title" delay={0.1}>Wedding <em className="foil">Events</em></Reveal>
        <Reveal className="divider" delay={0.2}>✦</Reveal>
        <div className="timeline" ref={tl}>
          <div className="rail"><motion.div className="rail-fill" style={{ scaleY: rail }} /></div>
          {events.map((e, i) => <EventCard key={e.key} e={e} i={i} />)}
        </div>
      </div>
    </section>
  );
}
