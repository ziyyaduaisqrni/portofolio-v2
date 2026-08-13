import { Github, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import laptopCoding from '../laptop_17122711-ezgif.com-remove-background.gif';

export function Hero() {
  const sectionRef = useScrollReveal<HTMLElement>();
  return (
    <section ref={sectionRef} id="top" className="grid gap-12 pt-10 lg:grid-cols-[1.2fr_0.95fr] lg:items-center">
      <div className="space-y-8">
        <div className="space-y-5">
          <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-neon-cyan/80 shadow-glow">
            HI, I'M ZIAD. I BUILD PREMIUM UI EXPERIENCES.
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Transforming ideas into <span className="bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text text-transparent">polished, interactive</span> web{' '}
            <span className="bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">experiences.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
            Saya fokus membangun antarmuka web modern dengan performa tinggi, animasi yang halus, dan desain yang mengutamakan user experience.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="btn-shine relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-7 py-3 text-sm font-semibold text-white shadow-glow transition duration-300 hover:scale-[1.03]"
          >
            Explore Works
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:border-neon-cyan/40"
          >
            Let's Collaborate
          </a>
        </div>

        <div className="flex items-center gap-3" aria-label="Social media links">
          <a
            href="https://github.com/ziyyaduaisqrni"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ziad-uais-2b268a329"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/ziyyaduaisqrni"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-lg items-center justify-center p-4">
        <div className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-cyan-500/20 blur-3xl" />
        <motion.div
          className="relative z-10 w-full text-center"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity }}
          style={{ willChange: 'transform' }}
        >
          <img
            src={laptopCoding}
            alt="Laptop coding animation"
            className="relative z-10 h-auto w-full max-w-[390px] object-contain drop-shadow-[0_10px_25px_rgba(6,182,212,0.3)] sm:max-w-[440px]"
          />
        </motion.div>
      </div>

    </section>
  );
}
