import { Navbar } from '../components/Navbar';
import { BackgroundEffect } from '../components/BackgroundEffect';
import { Hero } from '../components/Hero';
import { PortfolioShowcase } from '../components/PortfolioShowcase';
import { AboutSection } from '../components/AboutSection';
import { ExperienceTimeline } from '../components/ExperienceTimeline';
import { ContactSection } from '../components/ContactSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#0B0F17] text-slate-100 antialiased">
      <BackgroundEffect />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden="true">
        <div className="absolute -left-48 top-24 h-[34rem] w-[34rem] animate-pulse rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute right-[-12rem] top-[38%] h-[38rem] w-[38rem] animate-pulse rounded-full bg-blue-500/5 blur-3xl [animation-delay:1.5s]" />
        <div className="absolute -bottom-48 left-[28%] h-[32rem] w-[32rem] animate-pulse rounded-full bg-cyan-400/5 blur-3xl [animation-delay:3s]" />
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
