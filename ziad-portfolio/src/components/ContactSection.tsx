import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>();

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
            <span className="font-semibold text-white">ziaduwes71@gmail.com</span>
            <button className="btn-shine w-fit rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-5 py-3 text-sm font-semibold text-white shadow-glow transition duration-300 hover:scale-[1.02]">
              Copy email
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/30 hover:bg-white/10">
          <p className="text-sm uppercase tracking-[0.35em] text-neon-blue/80">CONNECT WITH ME</p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            {['GitHub', 'LinkedIn', 'Instagram'].map((item) => (
              <a
                key={item}
                href="#"
                className="block rounded-3xl border border-white/10 bg-black/50 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-neon-cyan/30 hover:bg-white/10"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
