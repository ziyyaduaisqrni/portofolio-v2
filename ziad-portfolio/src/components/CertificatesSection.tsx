import { useEffect, useState } from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { getCertificates, type CertificateRecord } from '../services/certificates';

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const activeCertificate = certificates.find((item) => item.id === activeId);

  useEffect(() => {
    getCertificates()
      .then(setCertificates)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load certificates.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="space-y-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">Certificates</p>
        <h2 className="max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Verified skills and modern learning credentials.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {loading ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-slate-400">Loading certificates…</div>
        ) : error ? (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-red-200">{error}</div>
        ) : certificates.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-8 text-slate-400">No certificates available yet.</div>
        ) : certificates.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setActiveId(cert.id)}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/30 hover:bg-white/10"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neon-cyan/80 via-transparent to-neon-blue/80 opacity-90" />
            <div className="relative grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/30">
                <img src={cert.image} alt={cert.title} className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">{cert.issuer}</p>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                    {cert.issue_date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                <p className="text-sm leading-6 text-slate-300 line-clamp-3">Issued by {cert.issuer} on {cert.issue_date}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeCertificate ? (
        <div className="certificate-modal fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/90 p-8 shadow-soft">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
              onClick={() => setActiveId(null)}
              aria-label="Close details"
            >
              ✕
            </button>
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  <Award className="h-4 w-4 text-neon-cyan" />
                  Certification detail
                </div>
                <h3 className="text-3xl font-semibold text-white">{activeCertificate.title}</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-neon-blue/80">{activeCertificate.issuer} · {activeCertificate.issue_date}</p>
                <p className="text-base leading-8 text-slate-300">Issued by {activeCertificate.issuer} on {activeCertificate.issue_date}</p>
                <a
                  href={activeCertificate.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-neon-cyan/60 hover:bg-white/10"
                >
                  View credential
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-white/5">
                <img src={activeCertificate.image} alt={activeCertificate.title} className="h-full w-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
