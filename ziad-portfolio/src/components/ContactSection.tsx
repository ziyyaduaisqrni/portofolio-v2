import { useState } from 'react';
import { Check, Copy, Github, Instagram, Linkedin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const emailAddress = 'ziaduwes71@gmail.com';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ziyyaduaisqrni', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ziad-uais-2b268a329', Icon: Linkedin },
  { label: 'Instagram', href: 'https://instagram.com/ziyyaduaisqrni', Icon: Instagram },
];

async function copyText(text: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!copied) throw new Error('Clipboard is unavailable');
}

export function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyEmail = async () => {
    try {
      await copyText(emailAddress);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    }

    window.setTimeout(() => setCopyStatus('idle'), 2500);
  };

  return (
    <section ref={sectionRef} id="contact" className="space-y-8 pb-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">GET IN TOUCH</p>
        <h2 className="max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Let’s connect and build something great together.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/30 hover:bg-white/10">
          <p className="text-base leading-8 text-slate-300">
            Punya projek menarik, tawaran kolaborasi, atau sekadar ingin bertanya? Silakan kirim pesan melalui email di bawah.
          </p>
          <div className="mt-6 flex flex-col gap-3 rounded-[1.75rem] bg-black/50 p-6 text-slate-200 shadow-soft">
            <span className="font-semibold text-white">{emailAddress}</span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="btn-shine inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-5 py-3 text-sm font-semibold text-white shadow-glow transition duration-300 hover:scale-[1.02]"
              aria-live="polite"
            >
              {copyStatus === 'success' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copyStatus === 'success' ? 'Email copied!' : copyStatus === 'error' ? 'Copy failed' : 'Copy email'}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/30 hover:bg-white/10">
          <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">CONNECT WITH ME</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-3xl border border-white/10 bg-black/50 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/30 hover:bg-white/10"
              >
                <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
