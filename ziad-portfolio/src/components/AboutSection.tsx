import { Compass, Sparkles, Zap } from 'lucide-react';
import { useRef, type MouseEvent } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import profileImage from '../WhatsApp Image 2026-08-12 at 01.40.28.jpg';

const aboutHighlights = [
  {
    icon: Sparkles,
    label: 'Currently building',
    value: 'Interactive web portfolio with custom motion and refined UI components.',
    accent: '#22D3EE',
  },
  {
    icon: Compass,
    label: 'Currently exploring',
    value: 'Advanced React patterns, micro-interactions, and web performance optimization.',
    accent: '#38BDF8',
  },
  {
    icon: Zap,
    label: 'Latest focus',
    value: 'Polishing user experience, loading performance, and clean code structure.',
    accent: '#22C55E',
  },
];

export function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = profileRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty('--spot-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    profileRef.current?.style.setProperty('--spot-x', '50%');
    profileRef.current?.style.setProperty('--spot-y', '50%');
  };

  return (
    <section ref={sectionRef} id="about" className="space-y-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">About Me</p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          ✧ Transforming ideas into digital experiences ✧
        </h2>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-[0_30px_80px_-40px_rgba(99,102,241,0.35)]">
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-transparent via-slate-900/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="relative space-y-6">
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Saya seorang pengembang Frontend yang fokus membangun produk web modern dengan visual system yang kuat dan arsitektur yang responsif. Menggabungkan estetika desain dengan kode yang cepat, andal, dan clean.
            </p>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Setiap projek dirancang dengan memperhatikan hirarki visual dan interaksi yang intuitif. Fokus utama saya adalah menyederhanakan alur yang kompleks menjadi pengalaman pengguna yang menyenangkan.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {aboutHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/95 hover:shadow-[0_20px_60px_-30px_rgba(79,70,229,0.25)]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900 transition duration-300"
                        style={{ boxShadow: `0 0 0 1px ${item.accent}20` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.accent }} />
                      </div>
                      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                    </div>
                    <p className="mt-4 text-base font-medium text-slate-100">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div
            ref={profileRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative profile-card overflow-hidden rounded-[2.5rem] border border-white/10 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:bg-white/10"
          >
            <div className="profile-spotlight" />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-cyan/80 via-transparent to-neon-blue/80 opacity-90" />

            <div className="relative flex h-full flex-col items-center gap-5 rounded-[2rem] border border-white/5 bg-black/40 p-6 text-center backdrop-blur-2xl">
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border border-white/10 bg-white/5 shadow-glow transition duration-300">
                <img src={profileImage} alt="Ziad profile" className="profile-image h-full w-full object-cover" />
              </div>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">Frontend Developer &amp; UI Engineer</p>
                <h2 className="text-2xl font-semibold text-white">Ziad</h2>
                <p className="max-w-sm text-sm leading-7 text-slate-300">
                  Mengerjakan setiap projek dengan kode yang rapi, komponen modular, dan visual yang memikat.
                </p>
              </div>
              <div className="grid w-full gap-3 sm:grid-cols-2">
                {['REACT / NEXT.JS', 'TAILWIND CSS', 'INTERACTIVE UI', 'CLEAN CODE'].map((label) => (
                  <span key={label} className="rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-200 transition duration-300 hover:border-neon-cyan/40 hover:bg-white/10">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
