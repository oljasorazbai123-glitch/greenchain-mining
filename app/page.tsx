import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Dashboard from "@/components/sections/Dashboard";
import Farm3D from "@/components/sections/Farm3D";
import KazakhstanCase from "@/components/sections/KazakhstanCase";
import AIControl from "@/components/sections/AIControl";
import Future from "@/components/sections/Future";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Navigation from "@/components/ui/Navigation";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";
import Background from "@/components/ui/Background";
import RevealObserver from "@/components/ui/RevealObserver";

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Background />
      <Navigation />
      <RevealObserver />

      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Dashboard />
        <Farm3D />
        <KazakhstanCase />
        <AIControl />
        <Future />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
