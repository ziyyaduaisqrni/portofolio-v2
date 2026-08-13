import { Navbar } from '../components/Navbar';
import { BackgroundEffect } from '../components/BackgroundEffect';
import { Hero } from '../components/Hero';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { AboutSection } from '../components/AboutSection';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ContactSection } from '../components/ContactSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 antialiased">
      <BackgroundEffect />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
        <Navbar />
        <main className="space-y-28">
          <Hero />
          <PortfolioShowcase />
          <AboutSection />
          <ExperienceTimeline />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
