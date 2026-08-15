import type { IconType } from 'react-icons';
import { useEffect, useState } from 'react';
import { ArrowRight, Award, Code2, Layers, Sparkles } from 'lucide-react';
import { SiReact, SiTypescript, SiTailwindcss, SiVite, SiPhp, SiNodedotjs, SiMysql, SiSupabase, SiSwagger, SiGit, SiFigma, SiGooglechrome, SiPostman } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { getProjects, ProjectRecord } from '../services/projects';
import { getCertificates, CertificateRecord } from '../services/certificates';
import { techItems } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ProjectCard } from './ProjectCard';

const tabs = ['Projects', 'Certificates', 'Tech Stack'] as const;

const iconMap: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  Vite: SiVite,
  PHP: SiPhp,
  'Node.js': SiNodedotjs,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  'REST API': SiSwagger,
  Git: SiGit,
  Figma: SiFigma,
  'VS Code': VscVscode,
  'Chrome DevTools': SiGooglechrome,
  Postman: SiPostman,
};

type TabKey = (typeof tabs)[number];

const badgeColors: Record<string, string> = {
  Frontend: 'from-sky-500 via-cyan-400 to-teal-300',
  'Backend / Data': 'from-violet-500 via-fuchsia-500 to-pink-400',
  Tools: 'from-emerald-400 via-lime-400 to-amber-300',
};

export function PortfolioShowcase() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [activeTab, setActiveTab] = useState<TabKey>('Projects');
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCertificates, setLoadingCertificates] = useState(true);
  const [activePanelVisible, setActivePanelVisible] = useState(true);

  useEffect(() => {
    setLoadingProjects(true);
    setLoadingCertificates(true);

    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error('Failed to load projects:', error);
        setProjects([]);
      })
      .finally(() => setLoadingProjects(false));

    getCertificates()
      .then((data) => setCertificates(data))
      .catch((error) => {
        console.error('Failed to load certificates:', error);
        setCertificates([]);
      })
      .finally(() => setLoadingCertificates(false));
  }, []);

  useEffect(() => {
    setActivePanelVisible(false);
    const timeout = window.setTimeout(() => setActivePanelVisible(true), 80);
    return () => window.clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="showcase" className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_40px_120px_-80px_rgba(67,56,202,0.6)] sm:p-8">
      <div id="projects" className="absolute -top-28" />
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

      <div className="relative">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-3 py-4 backdrop-blur-xl shadow-inner shadow-slate-950/30 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400/90">EXPLORE MY WORK</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Showcase Karya, Skill &amp; Sertifikasi.</h2>
          </div>
          <div className="flex flex-wrap gap-3 overflow-x-auto rounded-[1.5rem] bg-slate-950/80 px-2 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                  activeTab === tab
                    ? 'border-cyan-400/40 bg-slate-900 text-white shadow-[0_20px_80px_-60px_rgba(56,189,248,0.45)]'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                }`}
                aria-selected={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 transition duration-500 ease-out" style={{ opacity: activePanelVisible ? 1 : 0 }}>
          {activeTab === 'Projects' ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">SELECTED PROJECTS</p>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">Project Pilihan &amp; Hasil Karya.</h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-400">Beberapa projek terbaik yang pernah saya buat, lengkap dengan live demo dan source code-nya.</p>
              </div>

              {loadingProjects ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="h-72 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6" />
                  ))}
                </div>
              ) : projects.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/80 p-12 text-center text-slate-500">Projects coming soon. Stay tuned for new updates!</div>
              ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                  {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
                </div>
              )}
            </div>
          ) : activeTab === 'Certificates' ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">CERTIFICATES</p>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">Bukti Skill &amp; Validasi Sertifikat.</h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-400">Lisensi dan sertifikat resmi dari berbagai pelatihan.</p>
              </div>

              {loadingCertificates ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2].map((item) => (
                    <div key={item} className="h-64 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6" />
                  ))}
                </div>
              ) : certificates.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/80 p-12 text-center text-slate-500">No certificates found. Add them in the admin panel.</div>
              ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                  {certificates.map((cert) => (
                    <article data-scroll-reveal key={cert.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40">
                      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] p-6">
                        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80">
                          <img src={cert.image} alt={cert.title} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{cert.issuer}</p>
                            <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">{cert.issue_date}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                          <p className="text-sm leading-6 text-slate-400">Issued by {cert.issuer} in {cert.issue_date}</p>
                          <a href={cert.credential_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-neon-cyan/40 hover:bg-slate-900/95">
                            View credential <Award className="h-4 w-4 text-neon-cyan" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">TECH STACK</p>
                  <h3 className="text-2xl font-semibold text-white sm:text-3xl">Tech Stack &amp; Tools yang Sering Dipakai.</h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-400">Kumpulan teknologi dan tools pendukung buat bikin aplikasi web modern.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {techItems.map((item) => {
                  const Icon = iconMap[item.name] as IconType | undefined;
                  return (
                    <div data-scroll-reveal key={item.name} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.category}</p>
                        </div>
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-950/80 text-white shadow-[0_12px_30px_-18px_rgba(56,189,248,0.7)] transition duration-300 group-hover:scale-105"
                          style={{
                            color: item.accent,
                            backgroundImage: `linear-gradient(135deg, ${item.accent}22 0%, rgba(15,23,42,0.65) 100%)`,
                            boxShadow: `0 18px 35px -20px ${item.accent}60`,
                          }}
                        >
                          {Icon ? <Icon className="h-6 w-6" /> : <span className="text-sm font-semibold">{item.label.slice(0, 2).toUpperCase()}</span>}
                        </div>
                      </div>
                      <div className="mt-5 rounded-[1.5rem] border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
