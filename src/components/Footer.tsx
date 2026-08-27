

// import { useEffect, useState } from 'react';
// import { profile } from '@/data/portfolio';
// import type { ModuleId } from './Hub';

// type Props = {
//   onOpen: (id: ModuleId) => void;
// };

// const logLines = [
//   `> booting ${profile.name.toLowerCase().replace(/\s+/g, '_')}.exe`,
//   '> loading modules: projects, experience, skills, contact',
//   `> location: ${profile.location}`,
//   `> status: ${profile.status}`,
//   '> awaiting user input...',
// ];

// const channels: { label: string; sub: string; href: string; key: string }[] = [
//   { key: 'GH', label: 'GitHub', sub: 'source & repos', href: profile.github ?? '#' },
//   { key: 'LI', label: 'LinkedIn', sub: 'career network', href: profile.linkedin ?? '#' },
//   { key: 'MAIL', label: 'Email', sub: 'direct line', href: `mailto:${profile.email ?? ''}` },
// ];

// const navNodes: { label: string; id: ModuleId }[] = [
//   { label: 'PROJECTS', id: 'projects' },
//   { label: 'EXPERIENCE', id: 'experience' },
//   { label: 'SKILLS', id: 'skills' },
//   { label: 'CONTACT', id: 'contact' },
// ];

// export default function Footer({ onOpen }: Props) {
//   const [typed, setTyped] = useState<string[]>([]);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     setVisible(true);
//     let cancelled = false;
//     let lineIdx = 0;
//     let charIdx = 0;

//     const tick = () => {
//       if (cancelled || lineIdx >= logLines.length) return;
//       const line = logLines[lineIdx];
//       charIdx++;
//       setTyped((prev) => {
//         const next = [...prev];
//         next[lineIdx] = line.slice(0, charIdx);
//         return next;
//       });
//       if (charIdx >= line.length) {
//         lineIdx++;
//         charIdx = 0;
//         setTimeout(tick, 250);
//       } else {
//         setTimeout(tick, 18);
//       }
//     };
//     tick();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <footer className="relative z-10 mt-16 border-t border-cyan-500/20 overflow-hidden">
//       {/* top glow line */}
//       <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

//       {/* faint moving grid backdrop */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.06]"
//         style={{
//           backgroundImage:
//             'linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)',
//           backgroundSize: '32px 32px',
//         }}
//       />

//       {/* sweeping scanline */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scan" />
//       </div>

//       <div className="relative glass-strong px-6 sm:px-10 py-12">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
//           {/* terminal log panel */}
//           <div
//             className={`lg:col-span-2 rounded-xl border border-cyan-500/20 bg-black/30 p-6 shadow-[0_0_30px_-12px_rgba(34,211,238,0.5)] transition-all duration-700 ${
//               visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
//             }`}
//           >
//             <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-cyan-500/10">
//               <span className="w-3 h-3 rounded-full bg-rose-400/70" />
//               <span className="w-3 h-3 rounded-full bg-amber-300/70" />
//               <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
//               <span className="ml-2 font-mono text-xs text-cyan-400/50">
//                 console — anil@lab
//               </span>
//             </div>
//             <div className="font-mono text-sm leading-loose text-emerald-300/80 min-h-[120px]">
//               {logLines.map((_, i) => (
//                 <div key={i}>
//                   {typed[i]}
//                   {i === typed.length - 1 && (
//                     <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse align-middle" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* nav nodes */}
//           <div
//             className={`lg:col-span-1 transition-all duration-700 delay-150 ${
//               visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
//             }`}
//           >
//             <div className="font-mono text-sm tracking-widest text-amber-300/80 mb-6">
//               JUMP TO
//             </div>
//             <div className="flex flex-col gap-4">
//               {navNodes.map((n) => (
//                 <button
//                   key={n.id}
//                   onClick={() => onOpen(n.id)}
//                   className="group flex items-center gap-3 font-mono text-sm text-cyan-300/70 hover:text-cyan-100 transition-colors"
//                 >
//                   <span className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_2px_rgba(34,211,238,0.8)] transition-all" />
//                   <span className="group-hover:translate-x-0.5 transition-transform">
//                     {n.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* comm channels */}
//           <div
//             className={`lg:col-span-2 transition-all duration-700 delay-300 ${
//               visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
//             }`}
//           >
//             <div className="font-mono text-sm tracking-widest text-emerald-300/80 mb-6">
//               COMM CHANNELS
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {channels.map((c, i) => (
//                 <a
//                   key={c.key}
//                   href={c.href}
//                   target={c.href.startsWith('http') ? '_blank' : undefined}
//                   rel="noreferrer"
//                   style={{ transitionDelay: `${350 + i * 90}ms` }}
//                   className={`group relative rounded-lg border border-cyan-500/20 bg-cyan-500/[0.03] hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)] transition-all duration-500 p-5 ${
//                     visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-mono text-xs text-cyan-500/50 group-hover:text-cyan-300/80">
//                       {c.key}
//                     </span>
//                     <span className="w-2 h-2 rounded-full bg-emerald-400/70 animate-pulse-glow" />
//                   </div>
//                   <div className="font-mono text-base text-cyan-200/90">{c.label}</div>
//                   <div className="font-mono text-xs text-cyan-500/50 mt-1">{c.sub}</div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* bottom bar */}
//       <div className="relative border-t border-cyan-500/10 glass-strong">
//         <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-cyan-500/50">
//           <span>© {new Date().getFullYear()} {profile.name} · all systems nominal</span>
//           <span className="flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
//             BUILT WITH REACT + VITE
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// }





















import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/portfolio';
import type { ModuleId } from './Hub';

type Props = {
  onOpen: (id: ModuleId) => void;
};

const logLines = [
  `> booting ${profile.name.toLowerCase().replace(/\s+/g, '_')}.exe`,
  '> loading modules: projects, experience, skills, contact',
  `> location: ${profile.location}`,
  `> status: ${profile.status}`,
  '> awaiting user input...',
];

const channels: { label: string; sub: string; href: string; key: string }[] = [
  { key: 'GH', label: 'GitHub', sub: 'source & repos', href: profile.github ?? '#' },
  { key: 'LI', label: 'LinkedIn', sub: 'career network', href: profile.linkedin ?? '#' },
  { key: 'MAIL', label: 'Email', sub: 'direct line', href: `mailto:${profile.email ?? ''}` },
];

const navNodes: { label: string; id: ModuleId }[] = [
  { label: 'PROJECTS', id: 'projects' },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'CONTACT', id: 'contact' },
];

export default function Footer({ onOpen }: Props) {
  const [typed, setTyped] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);

  // watch for the footer entering the viewport
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setStarted(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.3 } // fires once ~30% of the footer is on screen
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // typewriter effect, only runs once "started" flips true
  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;

    const tick = () => {
      if (cancelled || lineIdx >= logLines.length) return;
      const line = logLines[lineIdx];
      charIdx++;
      setTyped((prev) => {
        const next = [...prev];
        next[lineIdx] = line.slice(0, charIdx);
        return next;
      });
      if (charIdx >= line.length) {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, 250);
      } else {
        setTimeout(tick, 18);
      }
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, [started]);

  return (
    <footer ref={footerRef} className="relative z-10 mt-16 border-t border-cyan-500/20 overflow-hidden">
      {/* top glow line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* faint moving grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* sweeping scanline */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scan" />
      </div>

      <div className="relative glass-strong px-6 sm:px-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* terminal log panel */}
          <div
            className={`lg:col-span-2 rounded-xl border border-cyan-500/20 bg-black/30 p-6 shadow-[0_0_30px_-12px_rgba(34,211,238,0.5)] transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-cyan-500/10">
              <span className="w-3 h-3 rounded-full bg-rose-400/70" />
              <span className="w-3 h-3 rounded-full bg-amber-300/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
              <span className="ml-2 font-mono text-xs text-cyan-400/50">
                console — anil@lab
              </span>
            </div>
            <div className="font-mono text-sm leading-loose text-emerald-300/80 min-h-[120px]">
              {logLines.map((_, i) => (
                <div key={i}>
                  {typed[i]}
                  {started && i === typed.length - 1 && (
                    <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse align-middle" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* nav nodes */}
          <div
            className={`lg:col-span-1 transition-all duration-700 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="font-mono text-sm tracking-widest text-amber-300/80 mb-6">
              JUMP TO
            </div>
            <div className="flex flex-col gap-4">
              {navNodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => onOpen(n.id)}
                  className="group flex items-center gap-3 font-mono text-sm text-cyan-300/70 hover:text-cyan-100 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500/40 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_2px_rgba(34,211,238,0.8)] transition-all" />
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {n.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* comm channels */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <div className="font-mono text-sm tracking-widest text-emerald-300/80 mb-6">
              COMM CHANNELS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {channels.map((c, i) => (
                <a
                  key={c.key}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  style={{ transitionDelay: `${350 + i * 90}ms` }}
                  className={`group relative rounded-lg border border-cyan-500/20 bg-cyan-500/[0.03] hover:bg-cyan-500/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_-6px_rgba(34,211,238,0.6)] transition-all duration-500 p-5 ${
                    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-cyan-500/50 group-hover:text-cyan-300/80">
                      {c.key}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400/70 animate-pulse-glow" />
                  </div>
                  <div className="font-mono text-base text-cyan-200/90">{c.label}</div>
                  <div className="font-mono text-xs text-cyan-500/50 mt-1">{c.sub}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative border-t border-cyan-500/10 glass-strong">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-cyan-500/50">
          <span>© {new Date().getFullYear()} {profile.name} · all systems nominal</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            BUILT WITH REACT + VITE
          </span>
        </div>
      </div>
    </footer>
  );
}