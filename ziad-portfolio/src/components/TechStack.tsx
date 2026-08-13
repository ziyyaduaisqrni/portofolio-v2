import type { IconType } from 'react-icons';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiSupabase,
  SiSwagger,
  SiGit,
  SiFigma,
  SiGooglechrome,
  SiPostman,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { techItems } from '../data/content';

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

export function TechStack() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="stack" className="space-y-6 overflow-hidden">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Tech Stack</p>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Essential tools for clean, fast, premium frontend builds.
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-400">
          A compact, high-density toolkit of modern web technologies with brand-led icon accents and polished hover motion.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {techItems.map((item) => {
          const Icon = iconMap[item.name] as IconType | undefined;
          return (
            <div
              key={item.name}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-4 transition duration-300 hover:-translate-y-1 hover:bg-slate-900"
              style={{
                boxShadow: `0 20px 45px -32px ${item.accent}40`,
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-900 transition duration-300"
                  style={{
                    boxShadow: `0 0 0 1px ${item.accent}25`,
                    color: item.accent,
                  }}
                >
                  {Icon ? <Icon className="h-7 w-7" /> : <span className="text-sm font-semibold">{item.label.slice(0, 2).toUpperCase()}</span>}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{item.label}</p>
                  <p className="truncate text-[11px] uppercase tracking-[0.35em] text-slate-500">{item.category}</p>
                </div>
              </div>

              <div
                className="mt-4 h-0.5 rounded-full bg-gradient-to-r opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${item.accent} 0%, rgba(255,255,255,0) 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
