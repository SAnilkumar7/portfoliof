export type Project = {
  id: string;
  name: string;
  codename: string;
  category: string;
  status: 'OPERATIONAL' | 'ARCHIVED' | 'EXPERIMENTAL';
  summary: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  year: string;
  image: string;
  website?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
};

export type Skill = {
  name: string;
  level: number;
  category: string;
};

export type Review = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

export type Repo = {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  x: number;
  y: number;
  size: number;
};

export const profile = {
  name: 'ANIL KUMAR',
  callsign: 'BUILDER_01',
  title: 'Full-Stack Engineer · AI Systems Architect',
  tagline: 'From ideas to intelligent systems that make an impact.',
  location: 'Bengaluru, IN',
  status: 'AVAILABLE FOR MISSIONS',
  stats: {
    projects: 4,
    clients: 3,
    repos: 12,
    models: 1,
    years: 1.9,
  },
  contact: {
    email: 'anil@digitalhq.dev',
    github: 'github.com/anilkumar',
    linkedin: 'linkedin.com/in/anilkumar',
    twitter: 'x.com/anilkumar',
  },
};

export const projects: Project[] = [
  {
  id: 'p1',
  name: 'Devanampriya',
  codename: 'PROJECT_Devanampriya',
  image: '/images/projects/Devanampriya.jpg',
  category: 'NGO Platform',
  status: 'OPERATIONAL',
  summary:
    'A social-impact platform dedicated to promoting equality, education, social justice, and the values of compassion, dignity, and human progress.',
  description:
    'Devanampriya is a social-impact initiative inspired by the timeless values of Gautama Buddha, Dr. B. R. Ambedkar, and Samrat Ashoka. The platform focuses on education, social awareness, equality, community development, and empowering individuals through knowledge and opportunity. It brings together people, initiatives, and resources to create meaningful social change while promoting compassion, justice, democracy, and a more inclusive society.',
  tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'vite'],
  metrics: [
    { label: 'Social Impact', value: 'Focus' },
    { label: 'Equality', value: 'Mission' },
    { label: 'Active', value: 'Status' },
  ],
  year: '2026',
  website: 'https://devanampriya.com',
  },

  {
  id: 'p2',
  name: 'SafeTrack',
  codename: 'PROJECT_SAFETRACK',
  image: '/images/projects/track.jpg',
  category: 'Location Tracking',
  status: 'OPERATIONAL',
  summary: 'Real-time GPS family tracking app with secure sign-in and live location sharing.',
  description:
    'SafeTrace lets families track each other\'s live location in real time. Built on Flask with Google OAuth for secure sign-in and MongoDB for persistence, it streams location updates over Server-Sent Events so a family member\'s position updates instantly on everyone else\'s screen without polling. Per-session locking keeps concurrent location writes consistent, and an admin dashboard gives oversight into active sessions and users.',
  tech: ['Python', 'FastApi', 'Mongodb', 'Leaflet API', 'Google OAuth'],
  metrics: [
    { label: 'Updates', value: 'Real-time' },
    { label: 'Sign-in', value: 'Google OAuth' },
    { label: 'Status', value: 'Active' },
  ],
  year: '2026',
  website: 'https://trackthelocation.vercel.app/',
},
  {
    id: 'p3',
    name: 'Deeksha Interior',
    codename: 'PROJECT_Deeksha',
    image: '/images/projects/Deeksha.jpg', 
    category: 'Interior Design',
    status: 'OPERATIONAL',
    summary: 'Premium interior design services transforming spaces into stunning living experiences.',
    description:
      'Deeksha Interior specializes in creating beautiful, functional spaces that reflect your personality and lifestyle. From modern minimalist to classic elegance, we bring your dream space to life with expert design and seamless execution.',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion', 'shadcn/ui'],
    metrics: [
      { label: 'Spaces & Interiors', value: 'Focus' },
      { label: 'Timeless Design', value: 'Mission' },
      { label: 'Active', value: 'Status' },
    ],
    year: '2026',
    website: 'https://deekshainterior.netlify.app/',
  },
  {
    id: 'p4',
    name: 'JBR-Flower',
    codename: 'PROJECT_JBR',
    image: '/images/projects/jbr.jpg', 
    category: 'E-Commerce',
    status: 'OPERATIONAL',
    summary: 'A florist e-commerce and showcase platform for a local business, featuring a product catalog, WhatsApp ordering, and a community giving-back initiative.',
    description:
      'A streaming TTS engine fine-tuned on 14 languages with per-utterance emotion tags. Sub-300ms time-to-first-audio on commodity GPUs. Powers an accessibility suite used by 30k+ users.',
    tech: ['Next js', 'Talwind css', 'Typescript', 'Node js'],
    metrics: [
      { label: 'Floral Craft', value: 'Focus' },
      { label: 'Giving Back', value: 'Mission' },
      { label: 'Active', value: 'Status' },
    ],
    year: '2025',
    website: 'https://jbr-flowers.netlify.app/',
  },

  
  {
    id: 'p6',
    name: 'VisionGrid',
    codename: 'PROJECT_VISION',
    image: '/images/projects/7.jpg', 
    category: 'Computer Vision',
    status: 'EXPERIMENTAL',
    summary: 'Edge-based defect detection for manufacturing lines.',
    description:
      'A compact vision model running on edge TPUs inspecting 120 parts/min with 99.4% precision. Includes a labeling loop that auto-retrains on flagged edge cases. Cut scrap rate 38% in pilot deployment.',
    tech: ['Python', 'TensorFlow Lite', 'Coral Edge TPU', 'MQTT', 'Grafana'],
    metrics: [
      { label: 'Parts/min', value: '120' },
      { label: 'Precision', value: '99.4%' },
      { label: 'Scrap cut', value: '38%' },
    ],
    year: '2025',
    website: 'https://devanampriya.com',
  },
];

export const experience: Experience[] = [
  {
    id: 'e1',
    company: 'Sonata Software',
    role: 'Software Developement Engineer - 1',
    period: '2026-jan — Present',
    location: 'Bengaluru, IND',
    description: '',
    highlights: [
      
    ],
  },
  {
    id: 'e2',
    role: ' Front End Developer ( Intern ) ',
    company: 'EpicMinds pvt',
    period: '2025-june — 2025-sep',
    location: 'Bangalore, IND',
    description: '',
    highlights: [
      
    ],
  },
  
  
];


// data/portfolio.ts



export const skills: Skill[] = [

  // ================= LANGUAGES =================

  { name: 'TypeScript', level: 95, category: 'Languages' },
  { name: 'Python', level: 92, category: 'Languages' },
  { name: 'JavaScript', level: 80, category: 'Languages' },
  { name: 'Java', level: 78, category: 'Languages' },


  // ================= FRONTEND =================

  { name: 'React', level: 96, category: 'Frontend' },
  { name: 'Next.js', level: 90, category: 'Frontend' },
  { name: 'Three.js', level: 84, category: 'Frontend' },
  { name: 'WebGL', level: 76, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 94, category: 'Frontend' },
  { name: 'Vue.js', level: 70, category: 'Frontend' },
  { name: 'HTML5', level: 88, category: 'Frontend' },
  { name: 'CSS3', level: 88, category: 'Frontend' },
  { name: 'Sass / SCSS', level: 72, category: 'Frontend' },


  // ================= BACKEND =================

  { name: 'Node.js', level: 84, category: 'Backend' },
  { name: 'Express.js', level: 82, category: 'Backend' },
  { name: 'FastAPI', level: 90, category: 'Backend' },
  { name: 'Flask', level: 88, category: 'Backend' },
  { name: 'Django', level: 82, category: 'Backend' },
  { name: 'WebSocket', level: 85, category: 'Backend' },
  { name: 'MongoDB', level: 84, category: 'Backend' },
  { name: 'SQL', level: 80, category: 'Backend' },
  { name: 'MySQL', level: 78, category: 'Backend' },


  // ================= AI / ML =================

  { name: 'Machine Learning', level: 86, category: 'AI / ML' },
  { name: 'NLP', level: 84, category: 'AI / ML' },
  { name: 'PyTorch', level: 88, category: 'AI / ML' },
  { name: 'TensorFlow / Keras', level: 84, category: 'AI / ML' },
  { name: 'Scikit-learn', level: 88, category: 'AI / ML' },
  { name: 'NLTK', level: 80, category: 'AI / ML' },
  { name: 'Pandas', level: 88, category: 'AI / ML' },
  { name: 'NumPy', level: 86, category: 'AI / ML' },
  { name: 'XGBoost', level: 85, category: 'AI / ML' },
  { name: 'LightGBM', level: 82, category: 'AI / ML' },
  { name: 'LangChain', level: 86, category: 'AI / ML' },
  { name: 'RAG', level: 82, category: 'AI / ML' },
  { name: 'MCP', level: 80, category: 'AI / ML' },
  { name: 'Agentic AI', level: 82, category: 'AI / ML' },
  { name: 'LLMs', level: 84, category: 'AI / ML' },
  { name: 'Vector Databases', level: 78, category: 'AI / ML' },
  { name: 'Prompt Engineering', level: 86, category: 'AI / ML' },
  { name: 'Claude API', level: 88, category: 'AI / ML' },
  { name: 'ChatGPT', level: 90, category: 'AI / ML' },
  { name: 'Ollama', level: 78, category: 'AI / ML' },
  { name: 'Sentiment Analysis', level: 82, category: 'AI / ML' },


  // ================= CLOUD & DEVOPS =================

  { name: 'AWS', level: 82, category: 'Cloud & DevOps' },
  { name: 'Microsoft Azure', level: 78, category: 'Cloud & DevOps' },
  { name: 'Docker', level: 91, category: 'Cloud & DevOps' },
  { name: 'Kubernetes', level: 82, category: 'Cloud & DevOps' },
  { name: 'Terraform', level: 76, category: 'Cloud & DevOps' },
  { name: 'Vercel', level: 84, category: 'Cloud & DevOps' },
  { name: 'Cloudflare Workers', level: 78, category: 'Cloud & DevOps' },
  { name: 'CI/CD', level: 80, category: 'Cloud & DevOps' },


  // ================= DATABASES =================

  { name: 'PostgreSQL', level: 85, category: 'Databases' },
  { name: 'MongoDB', level: 84, category: 'Databases' },
  { name: 'MySQL', level: 82, category: 'Databases' },
  { name: 'Redis', level: 78, category: 'Databases' },
  { name: 'Elasticsearch', level: 72, category: 'Databases' },
  { name: 'Firebase', level: 80, category: 'Databases' },
  { name: 'Supabase', level: 76, category: 'Databases' },
  { name: 'Prisma', level: 82, category: 'Databases' },


  // ================= TOOLS =================

  { name: 'Git', level: 92, category: 'Tools' },
  { name: 'GitHub Actions', level: 85, category: 'Tools' },
  { name: 'VS Code', level: 90, category: 'Tools' },
  { name: 'Jupyter', level: 88, category: 'Tools' },
  { name: 'Postman', level: 84, category: 'Tools' },
  { name: 'Figma', level: 78, category: 'Tools' },
  { name: 'Linux', level: 86, category: 'Tools' },
  { name: 'Bash', level: 82, category: 'Tools' },

];



export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Vijay Prsad',
    role: 'Founder',
    company: 'Devanampriya Trust',
    quote:
      'Anil turned an elegant vision into a platform that makes Devanampriya’s mission clear, accessible, and impactful.',
    rating: 5,
  },
  {
    id: 'r2',
    author: 'Taya Reedy',
    role: 'Founder',
    company: 'Deeksha Interior',
    quote:
      'The website is now the first thing we share with clients. Our projects finally feel alive online, the details stand out beautifully, and it feels completely like our brand.',
    rating: 5,
  },
  {
    id: 'r3',
    author: 'Sameer Pasha',
    role: 'Founder',
    company: 'JBR Flowers E-Commerce  ',
    quote:
      'He owned our ledger from whiteboard to SOC2. Rare to find someone equally comfortable with Rust and a compliance audit.',
    rating: 5,
  },
  
];



export const aiKnowledge: { q: string; a: string }[] = [
  {
    q: 'Who is Anil?',
    a: 'Anil Kumar is a full-stack engineer and AI systems architect with 7+ years building production platforms — from LLM orchestration to realtime telemetry and event-sourced ledgers. He is currently Principal Engineer at Helix AI Labs.',
  },
  {
    q: 'What is his strongest project?',
    a: 'NeuralForge — a low-code LLM orchestration platform serving 2M+ inferences/month across 3 enterprise tenants with 340ms P99 latency. It combines his frontend, backend, and AI infrastructure experience.',
  },
  {
    q: 'What technologies does he use?',
    a: 'TypeScript, Python, and Rust across the stack; React + Three.js on the frontend; FastAPI, PostgreSQL, and Kafka on the backend; PyTorch, pgvector, and ONNX in the AI layer; Docker and Kubernetes for deployment.',
  },
  {
    q: 'Is he available for work?',
    a: 'Yes. Anil is currently available for missions — full-time roles, founding-engineer positions, and select consulting engagements. Reach out via the Contact module.',
  },
  {
    q: 'Where is he based?',
    a: 'Bengaluru, India. He works remotely and has operated across multiple timezones throughout his career.',
  },
];
// ============ HACK THE SYSTEM / OVERRIDE TYPES ============

export type ArrowDirection = '↑' | '→' | '↓' | '←';
export type GamePhase = 'intro' | 'phase1' | 'phase2' | 'phase3' | 'phase4' | 'success' | 'failed';

export interface OverrideState {
  phase: GamePhase;
  sequence: ArrowDirection[];
  userInput: ArrowDirection[];
  countdown: number;
  trace: number;
  attempts: number;
  aiMessage: string;
  accuracy: number;
  elapsedTime: number;
  showSequence: boolean;
  phaseComplete: boolean;
  totalAttempts: number;
  correctAttempts: number;
}

// AI responses for the override game
export const AI_RESPONSES = {
  wrong: [
    '"Nice try."',
    '"Predictable."',
    '"You\'ll have to do better."',
    '"That was... expected."',
    '"Is that all you\'ve got?"',
  ],
  close: [
    '"You\'re getting closer..."',
    '"Interesting approach..."',
    '"Almost had it..."',
    '"Not bad, not bad..."',
  ],
  success: [
    '"IMPOSSIBLE."',
    '"How did you..."',
    '"SYSTEM BREACH DETECTED."',
    '"You\'re either very good, or very lucky."',
  ],
  phaseComplete: [
    '"Layer 1 bypassed."',
    '"Security protocol weakened."',
    '"I\'m impressed. Proceed."',
    '"You shouldn\'t be able to do that..."',
  ],
} as const;

// Sequence lengths for each phase
export const SEQUENCE_LENGTHS = {
  phase1: 3,
  phase2: 5,
  phase3: 6,
  phase4: 8,
} as const;

// ============ END OF OVERRIDE TYPES ============

// data/portfolio.ts

// Update socialLinks to remove the 'key' field
export const socialLinks = [
  {
    label: 'GitHub',
    sub: 'source & repos',
    href: `https://${profile.contact.github}`,
  },
  {
    label: 'LinkedIn',
    sub: 'career network',
    href: `https://${profile.contact.linkedin}`,
  },
  {
    label: 'Email',
    sub: 'direct line',
    href: `mailto:${profile.contact.email}`,
  },
];