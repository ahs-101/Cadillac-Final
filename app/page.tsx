import NavBar from "@/components/ui/NavBar";
import Hero from "@/components/ui/Hero";
import CarShowcase from "@/components/ui/CarShowcase";
import RaceCalendar from "@/components/ui/RaceCalendar";
import Drivers from "@/components/ui/Drivers";
import FanClub from "@/components/ui/FanClub";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      {/* 1. Fixed navigation */}
      <NavBar />

      {/* 2. Cinematic hero with frame animation */}
      <Hero />

      {/* 3. Car showcase with interactive hotspots */}
      <CarShowcase />

      {/* 4. Race calendar + live countdown */}
      <RaceCalendar />

      {/* 5. Drivers — race drivers + support programme */}
      <Drivers />

      {/* 6. Newsletter + merch carousel + partners marquee + 2nd newsletter */}
      <FanClub />

      {/* 7. Footer with animated motto + socials */}
      <Footer />
    </main>
  );
}
