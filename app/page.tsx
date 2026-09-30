import { Petals, Progress } from "@/components/Ambient";
import { SvgDefs } from "@/components/Art";
import { Dua, Footer } from "@/components/Closing";
import Countdown from "@/components/Countdown";
import Events from "@/components/Events";
import Hero from "@/components/Hero";
import Invite from "@/components/Invite";
import Journey from "@/components/Journey";
import Merge from "@/components/Merge";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SvgDefs />
      <SmoothScroll />
      <Preloader />
      <Progress />
      <Petals />
      <main>
        <Hero />
        <Invite />
        <Countdown />
        <Events />
        <Journey />
        <Merge />
        <Dua />
      </main>
      <Footer />
    </>
  );
}
