import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Code2, GitBranch, Globe, type LucideIcon, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

type WelcomeScreenProps = {
  onLoadingComplete?: () => void;
};

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

function TypewriterEffect({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index += 1;
      } else {
        window.clearInterval(timer);
      }
    }, 120);

    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

function BackgroundEffect() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-500/15 via-blue-600/10 to-cyan-400/15 blur-3xl" />
      <div className="absolute inset-0 animate-float bg-gradient-to-tr from-cyan-600/10 via-transparent to-blue-500/10 blur-2xl" />
    </div>
  );
}

function IconButton({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="group relative transition-transform duration-300 ease-out hover:scale-110">
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur transition duration-300 group-hover:opacity-75" />
      <div className="relative rounded-full border border-cyan-500/20 bg-[#0d1117]/80 p-3 backdrop-blur-sm">
        <Icon className="h-6 w-6 text-cyan-400 sm:h-7 sm:w-7" />
      </div>
    </div>
  );
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: smoothEase } },
  exit: {
    opacity: 0,
    scale: 1.03,
    filter: 'blur(12px)',
    transition: {
      duration: 0.8,
      ease: smoothEase,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
};

const childVariants: Variants = {
  exit: {
    y: -15,
    opacity: 0,
    transition: { duration: 0.35, ease: smoothEase },
  },
};

export function WelcomeScreen({ onLoadingComplete }: WelcomeScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isLoading]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
    const timer = window.setTimeout(() => setIsLoading(false), 3200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={onLoadingComplete}>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex touch-none select-none items-center justify-center bg-[#030712]"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerVariants}
          style={{ willChange: 'transform, opacity, filter', transform: 'translateZ(0)' }}
          role="status"
          aria-label="Memuat portofolio"
        >
          <BackgroundEffect />

          <div className="relative z-10 mx-auto w-full max-w-4xl px-4">
            <motion.div className="mb-8 flex justify-center gap-4 sm:mb-12 sm:gap-6" variants={childVariants}>
              {[Code2, User, GitBranch].map((Icon, index) => (
                <div key={index} data-aos="fade-down" data-aos-delay={index * 120}>
                  <IconButton Icon={Icon} />
                </div>
              ))}
            </motion.div>

            <motion.div className="mb-8 text-center sm:mb-10" variants={childVariants}>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <div className="mb-2 sm:mb-3">
                  {['Welcome', 'To', 'My'].map((word, index) => (
                    <span key={word} data-aos="fade-right" data-aos-delay={150 + index * 100} className="inline-block px-1 text-white">
                      {word}
                    </span>
                  ))}
                </div>
                <div>
                  {['Portfolio', 'Website'].map((word, index) => (
                    <span
                      key={word}
                      data-aos="fade-up"
                      data-aos-delay={500 + index * 150}
                      className="inline-block bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text px-1 text-transparent"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </h1>
            </motion.div>

            <motion.div className="text-center" variants={childVariants} data-aos="fade-up" data-aos-delay="800">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-[#0d1117]/60 px-5 py-2.5 backdrop-blur-md">
                <Globe className="animate-spin-slow h-4 w-4 text-cyan-400" />
                <span className="font-mono text-sm tracking-widest text-cyan-400 sm:text-base md:text-lg">
                  <TypewriterEffect text="WWW.ZIAD.DIGITAL" />
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
