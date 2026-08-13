import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectBySlug, ProjectRecord } from '../services/projects';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProjectBySlug(slug)
      .then((data) => {
        setProject(data);
        if (!data) {
          setError('Project not found.');
        }
      })
      .catch((err) => setError(err.message || 'Failed to load project.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-obsidian px-6 py-10 text-slate-100">Loading project…</div>;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-obsidian px-6 py-10 text-slate-100">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </button>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-slate-200">{error ?? 'Project not found.'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian px-6 py-10 text-slate-100 sm:px-10">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to portfolio
      </button>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-soft">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{project.slug}</p>
            <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
            <p className="text-slate-300">{project.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live</p>
              <a href={project.live_url} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-white hover:text-neon-cyan">View demo <ExternalLink className="inline-block h-4 w-4" /></a>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Source</p>
              <a href={project.github_url} target="_blank" rel="noreferrer" className="mt-2 block text-sm text-white hover:text-neon-cyan">View code <ExternalLink className="inline-block h-4 w-4" /></a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech_stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Features</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {project.features.map((feature) => (
                  <li key={feature} className="list-disc pl-4">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-soft">
          <img src={project.image_url} alt={project.title} className="h-full w-full rounded-[2rem] object-cover object-center" />
        </div>
      </div>
    </div>
  );
}
