import { useState } from 'react';
import { ArrowRight, Briefcase, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experienceItems = [
  {
    id: 'informatics-study',
    title: 'UNIVERSITAS SUNAN KALI JAGA',
    subtitle: 'Informatics / Computer Science Student',
    date: '2022 – Present',
    description:
      'Mengembangkan pemahaman dasar software engineering dengan fokus pada arsitektur frontend yang rapi, antarmuka responsif, serta alur kerja tim modern.',
    accent: 'from-cyan-400 via-sky-400 to-blue-500',
    logo: 'II',
    logoImage: '/logo-uin.png',
    badge: 'ACADEMIC',
    gridSpan: 'sm:col-span-2 xl:col-span-1',
  },
  {
    id: 'kampung-bahari',
    title: 'Kampung Bahari',
    subtitle: 'Frontend Developer / Tech Lead',
    date: '2024',
    description:
      'Mengerjakan platform komunitas pesisir dengan alur konten yang rapi, sinkronisasi data berbasis Supabase, serta alat admin yang responsif.',
    accent: 'from-violet-400 via-fuchsia-400 to-pink-500',
    logo: 'KB',
    logoImage: 'kampung bahari.png',
    badge: 'FEATURED PROJECT',
    gridSpan: 'sm:col-span-1 xl:col-span-2',
  },
  {
    id: 'qrisuka',
    title: 'QRIsuka',
    subtitle: 'Product & UI/UX Designer',
    date: '2025',
    description:
      'Merancang sistem antarmuka berbasis QR yang intuitif, mengutamakan kemudahan navigasi dan pengalaman pengguna yang cepat.',
    accent: 'from-emerald-400 via-teal-400 to-cyan-400',
    logo: 'QR',
    logoImage: 'qris.png',
    badge: 'UI/UX DESIGN',
  },
  {
    id: 'growth-focus',
    title: 'Growth & Technical Focus',
    subtitle: 'Continuous Improvement',
    date: 'Ongoing',
    description:
      'Berfokus pada eksplorasi teknologi baru, peningkatan kualitas kode, serta penerapan best practices dalam pengembangan web modern.',
    accent: 'from-slate-400 via-slate-300 to-slate-200',
    logo: 'GF',
    logoImage: '11.png',
    badge: 'CORE STRATEGY',
  },
];

export function ExperienceTimeline() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [activeExperience, setActiveExperience] = useState(experienceItems[0]);
  const [showModal, setShowModal] = useState(false);

  const openModal = (item: typeof experienceItems[number]) => {
    setActiveExperience(item);
    setShowModal(true);
  };

  return (
    <section ref={sectionRef} id="journey" className="relative space-y-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-90px_rgba(59,130,246,0.45)] sm:p-8">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">EXPERIENCE &amp; MILESTONES</p>
        <h2 className="max-w-3xl text-3xl font-semibold text-white sm:text-4xl">A learning journey built from education, hands-on projects, and technical growth.</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {experienceItems.map((item) => (
          <button
            data-scroll-reveal
            key={item.id}
            type="button"
            onClick={() => openModal(item)}
            className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 text-left shadow-[0_24px_60px_-48px_rgba(56,189,248,0.35)] transition duration-300 focus:outline-none sm:focus:ring-2 sm:focus:ring-cyan-400/40 ${item.gridSpan} hover:-translate-y-1 hover:scale-[1.01] hover:border-cyan-400/40 hover:bg-white/10`}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/40 via-transparent to-violet-400/40" />
            <div className="relative flex items-start gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-3xl text-lg font-semibold text-white shadow-[0_0_0_6px_rgba(255,255,255,0.03)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${item.accent})` }}
              >
                {item.logoImage ? (
                  <img
                    src={item.logoImage}
                    alt={`Logo ${item.title}`}
                    className="h-full w-full rounded-3xl object-cover"
                  />
                ) : (
                  item.logo
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">{item.badge}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-300">{item.subtitle}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-400 line-clamp-4">{item.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-100">
              Learn more <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl">
          <div className="absolute inset-0 bg-slate-950/80" aria-hidden="true" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_100px_-40px_rgba(56,189,248,0.55)] transition duration-300 ease-out">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-900/90"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{activeExperience.date}</p>
                  <h3 className="text-3xl font-semibold tracking-tight text-white">{activeExperience.title}</h3>
                  <p className="mt-2 text-lg font-medium text-slate-300">{activeExperience.subtitle}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  <Briefcase className="h-4 w-4 text-cyan-300" />
                  {activeExperience.badge}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 text-slate-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <p className="text-base leading-8 text-slate-300">{activeExperience.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">{activeExperience.date}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2">{activeExperience.subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
