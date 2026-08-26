
// import { useState } from 'react';
// import { projects, type Project } from '@/data/portfolio';
// import ModuleShell from '../ModuleShell';
// import { Cpu, Activity, ArrowUpRight, ImageOff } from 'lucide-react';

// const statusColor: Record<Project['status'], string> = {
//   OPERATIONAL: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
//   ARCHIVED: 'text-cyan-400/50 border-cyan-500/20 bg-cyan-500/5',
//   EXPERIMENTAL: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
// };

// function ProjectImage({ src, alt }: { src?: string; alt: string }) {
//   const [errored, setErrored] = useState(false);

//   if (!src || errored) {
//     return (
//       <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/5">
//         <ImageOff className="w-10 h-10 text-cyan-400/40" />
//       </div>
//     );
//   }

//   return (
//     <img
//       src={src}
//       alt={alt}
//       onError={() => setErrored(true)}
//       className="absolute inset-0 w-full h-full object-cover"
//     />
//   );
// }

// export default function ProjectsModule({ onClose }: { onClose: () => void }) {
//   const [selected, setSelected] = useState<Project | null>(null);

//   return (
//     <ModuleShell
//       title="Projects"
//       codename="HOLOGRAPHIC ARTIFACT TABLE"
//       accent="cyan"
//       onClose={onClose}
//     >
//       {selected ? (
//         <div className="animate-fade-in-up">
//           <button
//             onClick={() => setSelected(null)}
//             className="font-mono text-xs text-cyan-400/70 hover:text-cyan-300 mb-5"
//           >
//             ← RETURN TO ARTIFACT TABLE
//           </button>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <span
//                   className={`font-mono text-[10px] px-2 py-0.5 rounded border ${statusColor[selected.status]}`}
//                 >
//                   {selected.status}
//                 </span>

//                 <span className="font-mono text-[10px] text-cyan-400/50">
//                   {selected.codename}
//                 </span>
//               </div>

//               <h3 className="font-display text-3xl font-bold text-cyan-200 glow-cyan mb-1">
//                 {selected.name}
//               </h3>

//               <div className="font-mono text-xs text-amber-300/80 mb-4">
//                 {selected.category} · {selected.year}
//               </div>

//               <p className="text-cyan-100/80 leading-relaxed mb-5">
//                 {selected.description}
//               </p>

//               {selected.website && (
//                 <a
//                   href={selected.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:text-cyan-200 transition-all duration-300"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   VISIT WEBSITE
//                   <ArrowUpRight className="w-4 h-4" />
//                 </a>
//               )}

//               <div className="font-mono text-[10px] text-cyan-400/50 mb-2 flex items-center gap-1">
//                 <Cpu className="w-3 h-3" /> TECH STACK
//               </div>

//               <div className="flex flex-wrap gap-2 mb-6">
//                 {selected.tech.map((t) => (
//                   <span
//                     key={t}
//                     className="font-mono text-xs px-2.5 py-1 rounded-md border border-cyan-500/25 bg-cyan-500/5 text-cyan-200/90"
//                   >
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="font-mono text-[10px] text-cyan-400/50 mb-2 flex items-center gap-1">
//                 <Activity className="w-3 h-3" /> OPERATIONAL METRICS
//               </div>

//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 {selected.metrics.map((m) => (
//                   <div key={m.label} className="glass rounded-lg p-3 text-center">
//                     <div className="font-display text-xl font-bold text-emerald-300">
//                       {m.value}
//                     </div>

//                     <div className="font-mono text-[9px] text-cyan-400/50 mt-1">
//                       {m.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* per-project image, now actually different per project */}
//               <div className="relative aspect-square rounded-xl glass overflow-hidden">
//                 <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-10" />
//                 <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none z-10" />

//                 <ProjectImage
//                   src={selected.image}
//                   alt={selected.name}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projects.map((p, idx) => (
//             <button
//               key={p.id}
//               onClick={() => setSelected(p)}
//               className="group glass rounded-xl p-5 text-left border border-cyan-500/15 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
//               style={{ animationDelay: `${idx * 0.05}s` }}
//             >
//               <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 border border-cyan-400/20">
//                 <ProjectImage src={p.image} alt={p.name} />
//               </div>

//               <div className="flex items-center justify-between mb-3">
//                 <span
//                   className={`font-mono text-[9px] px-2 py-0.5 rounded border ${statusColor[p.status]}`}
//                 >
//                   {p.status}
//                 </span>
//               </div>

//               <h3 className="font-display text-lg font-bold text-cyan-200 group-hover:glow-cyan transition-all mb-1">
//                 {p.name}
//               </h3>

//               <div className="font-mono text-[10px] text-amber-300/70 mb-2">
//                 {p.category} · {p.year}
//               </div>

//               <p className="text-sm text-cyan-100/70 leading-snug mb-3">
//                 {p.summary}
//               </p>

//               <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
//                 OPEN CASE STUDY
//                 <ArrowUpRight className="w-3 h-3" />
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
//     </ModuleShell>
//   );
// }

















import { useState } from 'react';
import { projects, type Project } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { Cpu, Activity, ArrowUpRight, ImageOff } from 'lucide-react';

const statusColor: Record<Project['status'], string> = {
  OPERATIONAL: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10',
  ARCHIVED: 'text-cyan-400/50 border-cyan-500/20 bg-cyan-500/5',
  EXPERIMENTAL: 'text-amber-300 border-amber-400/40 bg-amber-400/10',
};

function ProjectImage({ src, alt }: { src?: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/5">
        <ImageOff className="w-10 h-10 text-cyan-400/40" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      // object-contain = full image always visible, never cropped.
      // bg-black/30 fills any letterbox space left/right or top/bottom.
      className="absolute inset-0 w-full h-full object-contain bg-black/30"
    />
  );
}

export default function ProjectsModule({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <ModuleShell
      title="Projects"
      codename="HOLOGRAPHIC ARTIFACT TABLE"
      accent="cyan"
      onClose={onClose}
    >
      {selected ? (
        <div className="animate-fade-in-up">
          <button
            onClick={() => setSelected(null)}
            className="font-mono text-xs text-cyan-400/70 hover:text-cyan-300 mb-5"
          >
            ← RETURN TO ARTIFACT TABLE
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded border ${statusColor[selected.status]}`}
                >
                  {selected.status}
                </span>

                <span className="font-mono text-[10px] text-cyan-400/50">
                  {selected.codename}
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold text-cyan-200 glow-cyan mb-1">
                {selected.name}
              </h3>

              <div className="font-mono text-xs text-amber-300/80 mb-4">
                {selected.category} · {selected.year}
              </div>

              <p className="text-cyan-100/80 leading-relaxed mb-5">
                {selected.description}
              </p>

              {selected.website && (
                <a
                  href={selected.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs hover:bg-cyan-500/20 hover:border-cyan-300/60 hover:text-cyan-200 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  VISIT WEBSITE
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <div className="font-mono text-[10px] text-cyan-400/50 mb-2 flex items-center gap-1">
                <Cpu className="w-3 h-3" /> TECH STACK
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded-md border border-cyan-500/25 bg-cyan-500/5 text-cyan-200/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] text-cyan-400/50 mb-2 flex items-center gap-1">
                <Activity className="w-3 h-3" /> OPERATIONAL METRICS
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-6">
                {selected.metrics.map((m) => (
                  <div key={m.label} className="glass rounded-lg p-2 sm:p-3 text-center overflow-hidden">
                    <div className="font-display text-base sm:text-xl font-bold text-emerald-300 truncate">
                      {m.value}
                    </div>

                    <div className="font-mono text-[8px] sm:text-[9px] text-cyan-400/50 mt-1 leading-tight break-words">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* per-project image — aspect-video matches typical website
                  screenshot proportions, so object-contain shows the full
                  image with no awkward crop */}
              <div className="relative aspect-video rounded-xl glass overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none z-10" />

                <ProjectImage
                  src={selected.image}
                  alt={selected.name}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="group glass rounded-xl p-5 text-left border border-cyan-500/15 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3 border border-cyan-400/20">
                <ProjectImage src={p.image} alt={p.name} />
              </div>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-mono text-[9px] px-2 py-0.5 rounded border ${statusColor[p.status]}`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-cyan-200 group-hover:glow-cyan transition-all mb-1">
                {p.name}
              </h3>

              <div className="font-mono text-[10px] text-amber-300/70 mb-2">
                {p.category} · {p.year}
              </div>

              <p className="text-sm text-cyan-100/70 leading-snug mb-3">
                {p.summary}
              </p>

              <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                OPEN CASE STUDY
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      )}
    </ModuleShell>
  );
}