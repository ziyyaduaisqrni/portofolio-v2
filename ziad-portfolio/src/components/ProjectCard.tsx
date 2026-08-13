import { Github, ExternalLink } from 'lucide-react';
import type { ProjectRecord } from '../services/projects';

type ProjectCardProps = {
  project: ProjectRecord;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const techStack = (Array.isArray(project.tech_stack) ? project.tech_stack : project.tech_stack.split(','))
    .map((tech) => tech.trim())
    .filter(Boolean)
    .slice(0, 4);
  const date = project.created_at
    ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(project.created_at))
    : project.slug;

  return (
    <article data-scroll-reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 transition-all duration-300 hover:border-cyan-500/40 md:flex-row">
      <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-xl border border-slate-800 md:w-48">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-950 text-xs text-slate-500">No image available</div>
        )}
      </div>

      <div className="min-w-0 flex-1 self-stretch">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-wider">
          <span className="text-cyan-400">PROJECT</span>
          <span className="text-slate-500">{date}</span>
        </div>
        <h3 className="mb-1 mt-1 text-lg font-bold text-white">{project.title}</h3>
        <p className="mb-3 line-clamp-2 text-xs text-slate-400">{project.description}</p>

        {techStack.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span key={tech} className="rounded-full border border-cyan-800/50 bg-cyan-950/40 px-2 py-0.5 text-[10px] text-cyan-400">
                {tech}
              </span>
            ))}
          </div>
        )}

        {(project.live_url || project.github_url) && (
          <div className="flex flex-wrap gap-2">
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-500">
                Live Demo <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-200 transition hover:border-cyan-500">
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
