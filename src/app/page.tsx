import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Menu } from "@/components/Menu";
import { Experience } from "@/components/Experience";
import { Process } from "@/components/Process";
import { Story } from "@/components/Story";
import { Reviews } from "@/components/Reviews";
import { Offer } from "@/components/Offer";
import { Visit } from "@/components/Visit";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <Providers>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Menu />
        <Experience />
        <Process />
        <Story />
        <Reviews />
        <Offer />
        <Visit />
        <Faq />
      </main>
      <Footer />
    </Providers>
  );
}
