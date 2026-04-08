import { seed } from "@/lib/seed";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import Essay from "@/components/Essay";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  await seed();
  return (
    <>
      <Header />
      <Hero />
      <Works />
      <Essay />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
