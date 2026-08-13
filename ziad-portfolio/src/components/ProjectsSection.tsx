import { useEffect, useState } from 'react';
import { ArrowRight, Code2, Layers, Sparkles, Wrench, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getProjects, ProjectRecord } from '../services/projects';

const badgeColors: Record<string, string> = {
  React: 'bg-sky-500/15 text-sky-300 ring-sky-500/25',
  PHP: 'bg-violet-500/15 text-violet-300 ring-violet-500/25',
  MySQL: 'bg-orange-500/15 text-orange-300 ring-orange-500/25',
  Supabase: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/25',
  Tailwind: 'bg-sky-400/15 text-sky-200 ring-sky-400/20',
  'Tailwind CSS': 'bg-sky-400/15 text-sky-200 ring-sky-400/20',
};

const featureIcons = {
  Problem: Code2,
  Solution: Layers,
  Role: Wrench,
};

export function ProjectsSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((error) => {
        console.error('Failed to load projects:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">Featured work</p>
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Projects with crisp structure, subtle glow, and meaningful detail.
        </h2>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 text-slate-400">Loading projects…</div>
        ) : projects.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-8 text-slate-400">No projects available yet.</div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/80 p-0 transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900 hover:shadow-[0_30px_80px_-40px_rgba(59,130,246,0.55)]"
            >
              <div className="pointer-events-none absolute -right-12 top-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-10 bottom-4 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="overflow-hidden rounded-t-[2rem] bg-slate-900/90">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-slate-900 text-slate-500">No project image</div>
                )}
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm uppercase tracking-[0.35em] text-sky-300/70">{project.title}</span>
                      <span className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.35em] text-slate-400">Featured</span>
                    </div>
                    <h3 className="max-w-2xl text-3xl font-semibold leading-tight text-white">{project.description}</h3>
                  </div>
                  <div className="grid gap-2 rounded-[1.75rem] border border-slate-800 bg-slate-900/80 p-4 text-right text-sm uppercase tracking-[0.35em] text-slate-500 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-neon-cyan">Live demo</a>
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-neon-cyan">Source code</a>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ring-1 ${badgeColors[tech] ?? 'bg-slate-900/70 text-slate-200 ring-slate-700'}`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {project.features.slice(0, 2).map((feature) => (
                    <div key={feature} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 transition duration-300 group-hover:border-slate-700">
                      <div className="flex items-center gap-3 text-slate-300">
                        <ArrowRight className="h-4 w-4 text-neon-blue" />
                        <p className="text-sm leading-6 text-slate-200">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
