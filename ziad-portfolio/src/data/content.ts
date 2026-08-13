export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  tech: string[];
  features: string[];
  live: string;
  github: string;
  role: string;
  date: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
  details: string;
};

export type TechItem = {
  name: string;
  category: 'Frontend' | 'Backend / Data' | 'Tools';
  label: string;
  accent: string;
  layout?: 'large' | 'wide' | 'normal';
};

export const heroStats = [
  { value: '2+', label: 'years refining premium interfaces' },
  { value: '12', label: 'selected digital products' },
  { value: '20+', label: 'modern tools & frameworks' },
];

export const projects: Project[] = [
  {
    id: 'kampung-bahari',
    title: 'Kampung Bahari',
    summary: 'Public service platform for coastal communities.',
    description:
      'A polished service dashboard that connects administrators, locals, and maritime programs with clear reporting, resource controls, and responsive content delivery.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    tech: ['React', 'PHP', 'MySQL', 'Tailwind CSS', 'Supabase'],
    features: [
      'Responsive content management for small government programs',
      'Filtered coastal resource maps and announcement streams',
      'Accessible admin workflows for non-technical operators',
    ],
    live: 'https://example.com/kampung-bahari',
    github: 'https://github.com/ziad/kampung-bahari',
    role: 'UI/UX design, frontend build, backend integration',
    date: '2025',
  },
  {
    id: 'qrisuka',
    title: 'QRIsuka',
    summary: 'QR-based attendance and feedback platform.',
    description:
      'A compact event check-in system designed for fast scanning, instant record updates, and clear feedback capture across mobile screens.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    tech: ['React', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Mobile-first scanner interface with real-time status',
      'Secure attendance logs and feedback submission flow',
      'Dashboard with summary metrics and exports',
    ],
    live: 'https://example.com/qrisuka',
    github: 'https://github.com/ziad/qrisuka',
    role: 'Product strategy, frontend development, Supabase integration',
    date: '2025',
  },
  {
    id: 'inventory-edge',
    title: 'Inventory Edge',
    summary: 'Modern inventory interface for fast operations.',
    description:
      'A lightweight inventory system engineered for quick access, item tagging, and real-time status updates across desktop and tablet views.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'MySQL'],
    features: [
      'Fast search with smart filters and status chips',
      'Compact item cards with priority badges',
      'Clean admin tools for stock and audit actions',
    ],
    live: 'https://example.com/inventory-edge',
    github: 'https://github.com/ziad/inventory-edge',
    role: 'Frontend architecture, UI polish, data flows',
    date: '2024',
  },
];

export const certifications: Certification[] = [
  {
    id: 'supabase-certified',
    title: 'Supabase Fundamentals',
    issuer: 'Supabase Academy',
    date: '2025',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    link: 'https://example.com/certificates/supabase-fundamentals',
    details: 'Verified proficiency integrating Supabase auth, database schemas, realtime sync, and serverless workflow patterns for frontend applications.',
  },
  {
    id: 'web-performance',
    title: 'Web Performance Essentials',
    issuer: 'Frontend Masters',
    date: '2024',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    link: 'https://example.com/certificates/web-performance-essentials',
    details: 'Focused on modern performance strategies, caching, bundling, and UX-first delivery for web applications.',
  },
];

export const techItems: TechItem[] = [
  { name: 'React', category: 'Frontend', label: 'React', accent: '#61DAFB', layout: 'large' },
  { name: 'TypeScript', category: 'Frontend', label: 'TypeScript', accent: '#3178C6' },
  { name: 'Tailwind CSS', category: 'Frontend', label: 'Tailwind CSS', accent: '#38B2F0' },
  { name: 'Vite', category: 'Frontend', label: 'Vite', accent: '#646CFF' },
  { name: 'PHP', category: 'Backend / Data', label: 'PHP', accent: '#777BB4' },
  { name: 'Node.js', category: 'Backend / Data', label: 'Node.js', accent: '#88C300', layout: 'wide' },
  { name: 'MySQL', category: 'Backend / Data', label: 'MySQL', accent: '#00758F' },
  { name: 'Supabase', category: 'Backend / Data', label: 'Supabase', accent: '#3ECF8E' },
  { name: 'REST API', category: 'Backend / Data', label: 'REST API', accent: '#F97316' },
  { name: 'Git', category: 'Tools', label: 'Git', accent: '#F1502F' },
  { name: 'Figma', category: 'Tools', label: 'Figma', accent: '#F24E1E', layout: 'wide' },
  { name: 'VS Code', category: 'Tools', label: 'VS Code', accent: '#007ACC' },
  { name: 'Chrome DevTools', category: 'Tools', label: 'Chrome DevTools', accent: '#4285F4' },
  { name: 'Postman', category: 'Tools', label: 'Postman', accent: '#FF6C37' },
];
