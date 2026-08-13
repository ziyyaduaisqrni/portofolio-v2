import { useState } from 'react';
import { Mail, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#stack' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full py-4">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#030712]/40 px-4 py-2.5 backdrop-blur-md sm:px-6">
        <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-[0.12em] text-slate-100 transition hover:text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_22px_rgba(6,182,212,0.2)]">
            Z
          </span>
          Ziad
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-cyan-400">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.14em] text-cyan-400 transition hover:bg-cyan-500/20 lg:inline-flex">
            <Mail className="h-4 w-4" />
            Let's Talk
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-cyan-500/30 hover:bg-cyan-500/10 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] w-full rounded-3xl border border-white/10 bg-[#030712]/90 p-3 shadow-soft backdrop-blur-md lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.14em] text-slate-200 transition hover:bg-cyan-500/10 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
