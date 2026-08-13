import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const orbTransition = {
  duration: 12,
  ease: 'easeInOut' as const,
  repeat: Infinity,
  repeatType: 'mirror' as const,
};

/** Fixed ambient background with compositor-driven scroll parallax. */
export function BackgroundEffect() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const cyanX = useTransform(scrollYProgress, [0, 0.5, 1], ['-8%', '20%', '-12%']);
  const cyanY = useTransform(scrollYProgress, [0, 0.5, 1], ['-6%', '26%', '54%']);
  const blueX = useTransform(scrollYProgress, [0, 0.5, 1], ['68%', '40%', '72%']);
  const blueY = useTransform(scrollYProgress, [0, 0.5, 1], ['8%', '44%', '22%']);

  const floatingAnimation = reduceMotion ? undefined : { y: [0, -24, 8], x: [0, 12, -6] };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#030712]" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <motion.div className="absolute h-[34rem] w-[34rem] rounded-full blur-3xl" style={{ x: cyanX, y: cyanY, willChange: 'transform' }}>
        <motion.div
          className="h-full w-full rounded-full"
          animate={floatingAnimation}
          transition={orbTransition}
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.06) 42%, transparent 74%)' }}
        />
      </motion.div>

      <motion.div className="absolute h-[40rem] w-[40rem] rounded-full blur-3xl" style={{ x: blueX, y: blueY, willChange: 'transform' }}>
        <motion.div
          className="h-full w-full rounded-full"
          animate={reduceMotion ? undefined : { y: [0, 20, -10], x: [0, -16, 8] }}
          transition={{ ...orbTransition, duration: 15 }}
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.13) 0%, rgba(59, 130, 246, 0.05) 42%, transparent 74%)' }}
        />
      </motion.div>
    </div>
  );
}
