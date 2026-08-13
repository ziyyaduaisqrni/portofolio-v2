import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = [root, ...Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-reveal]'))];
    targets.forEach((target) => {
      target.classList.add('opacity-0', 'translate-y-8');
    });

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('animate-fade-in-up', 'opacity-100');
            target.classList.remove('translate-y-8');
            observerInstance.unobserve(target);
          }
        });
      },
      { threshold: 0.18 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return ref;
}
