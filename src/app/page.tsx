import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Marquee from "@/components/sections/Marquee";
import SelectedWork from "@/components/sections/SelectedWork";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Marquee />
      <SelectedWork />
      <Skills />
      <Marquee />
      <Contact />
      <Footer />
    </main>
  );
}
