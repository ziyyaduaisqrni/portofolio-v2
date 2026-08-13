import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { ProjectRecord, getProjects, deleteProject, uploadProjectImage, createProject, updateProject } from '../services/projects';
import { CertificateRecord, getCertificates, deleteCertificate, uploadCertificateImage, createCertificate, updateCertificate } from '../services/certificates';
import { ArrowLeft, Plus, Trash2, Edit3, LogOut } from 'lucide-react';

function AdminSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Admin</p>
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
    </div>
  );
}

function AdminItemCard({ title, subtitle, onEdit, onDelete }: { title: string; subtitle: string; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="group relative rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/30 hover:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onEdit} className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition hover:bg-white/10">
            <Edit3 className="h-4 w-4" />
          </button>
          <button type="button" onClick={onDelete} className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition hover:bg-red-500/20">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminItemList<T>({
  title,
  items,
  renderItem,
  emptyLabel,
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyLabel: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="grid gap-4">
        {items.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 text-slate-400">{emptyLabel}</div>
        ) : (
          items.map((item, index) => <div key={index}>{renderItem(item)}</div>)
        )}
      </div>
    </section>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [activeProject, setActiveProject] = useState<ProjectRecord | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CertificateRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.');
      setLoading(false);
      return;
    }

    Promise.all([getProjects(), getCertificates()])
      .then(([projectsData, certificatesData]) => {
        setProjects(projectsData);
        setCertificates(certificatesData);
      })
      .catch((err) => setError(err.message || 'Failed to load admin data.'))
      .finally(() => setLoading(false));
  }, []);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsData, certificatesData] = await Promise.all([getProjects(), getCertificates()]);
      setProjects(projectsData);
      setCertificates(certificatesData);
    } catch (err) {
      setError((err as Error).message || 'Failed to refresh data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (project: ProjectRecord) => {
    if (!window.confirm(`Delete project ${project.title}?`)) return;
    setLoading(true);
    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      setSuccess('Project deleted successfully.');
    } catch (err) {
      setError((err as Error).message || 'Failed to delete project.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCertificate = async (certificate: CertificateRecord) => {
    if (!window.confirm(`Delete certificate ${certificate.title}?`)) return;
    setLoading(true);
    try {
      await deleteCertificate(certificate.id);
      setCertificates((prev) => prev.filter((item) => item.id !== certificate.id));
      setSuccess('Certificate deleted successfully.');
    } catch (err) {
      setError((err as Error).message || 'Failed to delete certificate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian px-4 py-10 text-slate-100 sm:px-6 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </button>
        <button
          type="button"
          onClick={() => getSupabaseClient().auth.signOut()}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>

      <AdminSectionHeader title="Portfolio Admin" />

      <div className="mt-8 grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveProject({
                id: '',
                title: '',
                slug: '',
                description: '',
                image_url: '',
                tech_stack: [],
                features: [],
                live_url: '',
                github_url: '',
                created_at: '',
                updated_at: '',
              })}
              className="inline-flex items-center gap-2 rounded-full bg-neon-cyan px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
            <button
              type="button"
              onClick={() => setActiveCertificate({
                id: '',
                title: '',
                issuer: '',
                issue_date: '',
                image: '',
                credential_url: '',
                created_at: '',
                updated_at: '',
              })}
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Plus className="h-4 w-4" />
              Add Certificate
            </button>
          </div>

          {error ? <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}
          {success ? <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">{success}</div> : null}
          {loading ? <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-slate-300">Loading admin data…</div> : null}

          <AdminItemList
            title="Projects"
            items={projects}
            emptyLabel="No projects yet."
            renderItem={(project) => (
              <AdminItemCard
                title={project.title || 'Untitled project'}
                subtitle={project.slug || 'No slug yet'}
                onEdit={() => setActiveProject(project)}
                onDelete={() => handleDeleteProject(project)}
              />
            )}
          />

          <AdminItemList
            title="Certificates"
            items={certificates}
            emptyLabel="No certificates yet."
            renderItem={(certificate) => (
              <AdminItemCard
                title={certificate.title || 'Untitled certificate'}
                subtitle={`${certificate.issuer} • ${certificate.issue_date}`}
                onEdit={() => setActiveCertificate(certificate)}
                onDelete={() => handleDeleteCertificate(certificate)}
              />
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Status</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Projects: {projects.length}</li>
              <li>Certificates: {certificates.length}</li>
              <li>Connected: {isSupabaseConfigured ? 'Yes' : 'No'}</li>
            </ul>
          </div>

          <div className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Instructions</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Please add Supabase credentials in <code className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300">.env</code></p>
              <p>Use Supabase Storage buckets <code className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300">projects</code> and <code className="rounded bg-slate-900 px-2 py-1 text-xs text-slate-300">certificates</code>.</p>
            </div>
          </div>
        </div>
      </div>

      {(activeProject || activeCertificate) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 p-6 backdrop-blur-xl">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-soft">
            <button
              type="button"
              onClick={() => {
                setActiveProject(null);
                setActiveCertificate(null);
                setError(null);
                setSuccess(null);
              }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Close
            </button>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
                {activeProject ? (
                  <AdminProjectForm
                    project={activeProject}
                    onSaved={(item) => {
                      setActiveProject(null);
                      refreshData();
                      setSuccess(`Project ${item.title} saved.`);
                    }}
                    onCancel={() => setActiveProject(null)}
                  />
                ) : null}
                {activeCertificate ? (
                  <AdminCertificateForm
                    certificate={activeCertificate}
                    onSaved={(item) => {
                      setActiveCertificate(null);
                      refreshData();
                      setSuccess(`Certificate ${item.title} saved.`);
                    }}
                    onCancel={() => setActiveCertificate(null)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminProjectForm({
  project,
  onSaved,
  onCancel,
}: {
  project: ProjectRecord;
  onSaved: (project: ProjectRecord) => void;
  onCancel: () => void;
}) {
  const isEdit = Boolean(project.id);
  const [title, setTitle] = useState(project.title);
  const [slug, setSlug] = useState(project.slug);
  const [description, setDescription] = useState(project.description);
  const [liveUrl, setLiveUrl] = useState(project.live_url);
  const [githubUrl, setGithubUrl] = useState(project.github_url);
  const [techStack, setTechStack] = useState(project.tech_stack.join(', '));
  const [features, setFeatures] = useState(project.features.join('\n'));
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(project.image_url || '');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
    if (!file) {
      setPreviewUrl(project.image_url || '');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!title.trim() || !slug.trim() || !description.trim()) {
      setFormError('Title, slug, and description are required.');
      return;
    }

    if (!project.id && !imageFile) {
      setFormError('Project image is required.');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = project.image_url;
      if (imageFile) {
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(imageFile.type)) {
          throw new Error('Only PNG, JPEG, or WEBP images are allowed.');
        }
        if (imageFile.size > 4 * 1024 * 1024) {
          throw new Error('Image must be smaller than 4MB.');
        }
        imageUrl = await uploadProjectImage(imageFile);
      }

      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        image_url: imageUrl,
        tech_stack: techStack.split(',').map((item) => item.trim()).filter(Boolean),
        features: features.split('\n').map((item) => item.trim()).filter(Boolean),
        live_url: liveUrl.trim(),
        github_url: githubUrl.trim(),
      };

      const result = isEdit
        ? await updateProject(project.id, payload)
        : await createProject(payload as Omit<ProjectRecord, 'id' | 'created_at' | 'updated_at'>);

      onSaved(result);
    } catch (err) {
      setFormError((err as Error).message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Project Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Slug</span>
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-200">Description</span>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Live Demo URL</span>
          <input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">GitHub URL</span>
          <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-200">Tech Stack</span>
        <input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, Supabase, Tailwind CSS" className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        <p className="mt-2 text-xs text-slate-500">Comma separated values.</p>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-200">Features</span>
        <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} placeholder="Fast search\nResponsive admin UI" className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        <p className="mt-2 text-xs text-slate-500">Use one feature per line.</p>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Project Image</span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} className="mt-2 w-full text-slate-200" />
        </label>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
          <p className="text-sm font-medium text-slate-200">Preview</p>
          <div className="mt-3 h-40 overflow-hidden rounded-[1.5rem] bg-slate-900/60">
            {previewUrl ? <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-slate-500">No image selected</div>}
          </div>
        </div>
      </div>

      {formError ? <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{formError}</div> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-full bg-neon-cyan px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Saving…' : isEdit ? 'Save project' : 'Upload project'}
        </button>
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Cancel
        </button>
      </div>
    </form>
  );
}

function AdminCertificateForm({
  certificate,
  onSaved,
  onCancel,
}: {
  certificate: CertificateRecord;
  onSaved: (certificate: CertificateRecord) => void;
  onCancel: () => void;
}) {
  const isEdit = Boolean(certificate.id);
  const [title, setTitle] = useState(certificate.title);
  const [issuer, setIssuer] = useState(certificate.issuer);
  const [issueDate, setIssueDate] = useState(certificate.issue_date);
  const [credentialUrl, setCredentialUrl] = useState(certificate.credential_url);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(certificate.image || '');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
    if (!file) {
      setPreviewUrl(certificate.image || '');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!title.trim() || !issuer.trim() || !issueDate.trim()) {
      setFormError('Title, issuer, and issue date are required.');
      return;
    }

    if (!certificate.id && !imageFile) {
      setFormError('Certificate image is required.');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = certificate.image;
      if (imageFile) {
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(imageFile.type)) {
          throw new Error('Only PNG, JPEG, or WEBP images are allowed.');
        }
        if (imageFile.size > 4 * 1024 * 1024) {
          throw new Error('Image must be smaller than 4MB.');
        }
        imageUrl = await uploadCertificateImage(imageFile);
      }

      const payload = {
        title: title.trim(),
        issuer: issuer.trim(),
        issue_date: issueDate,
        image: imageUrl,
        credential_url: credentialUrl.trim(),
      };

      const result = isEdit
        ? await updateCertificate(certificate.id, payload)
        : await createCertificate(payload as Omit<CertificateRecord, 'id' | 'created_at' | 'updated_at'>);

      onSaved(result);
    } catch (err) {
      setFormError((err as Error).message || 'Failed to save certificate.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Certificate Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Issuer</span>
          <input value={issuer} onChange={(e) => setIssuer(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Issue Date</span>
          <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Credential URL</span>
          <input value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-neon-cyan/60" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-200">Certificate Image</span>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} className="mt-2 w-full text-slate-200" />
        </label>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4">
          <p className="text-sm font-medium text-slate-200">Preview</p>
          <div className="mt-3 h-40 overflow-hidden rounded-[1.5rem] bg-slate-900/60">
            {previewUrl ? <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-slate-500">No image selected</div>}
          </div>
        </div>
      </div>

      {formError ? <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{formError}</div> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-full bg-neon-cyan px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Saving…' : isEdit ? 'Save certificate' : 'Upload certificate'}
        </button>
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AdminPage;
