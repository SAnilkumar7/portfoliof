// import { experience } from '@/data/portfolio';
// import ModuleShell from '../ModuleShell';
// import { Orbit, MapPin } from 'lucide-react';



// export default function ExperienceModule({ onClose }: { onClose: () => void }) {
//   return (
//     <ModuleShell title="Experience" codename="CAREER ORBIT TIMELINE" accent="emerald" onClose={onClose}>
//       <div className="relative pl-6 sm:pl-10">
//         {/* energy beam spine */}
//         <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/60 via-cyan-400/40 to-transparent" />

//         <div className="space-y-8">
//           {experience.map((e, idx) => (
//             <div
//               key={e.id}
//               className="relative animate-fade-in-up"
//               style={{ animationDelay: `${idx * 0.1}s` }}
//             >
//               {/* node */}
//               <div className="absolute -left-6 sm:-left-10 top-1.5">
//                 <div className="relative w-5 h-5">
//                   <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse-glow" />
//                   <div className="absolute inset-1 rounded-full bg-emerald-400 border border-emerald-200 shadow-lg shadow-emerald-500/50" />
//                 </div>
//               </div>

//               <div className="glass rounded-xl p-5 hover:border-emerald-400/40 transition-colors">
//                 <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
//                   <h3 className="font-display text-xl font-bold text-emerald-200">
//                     {e.role}
//                   </h3>
//                   <span className="font-mono text-xs text-emerald-300/70">
//                     {e.period}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-3 mb-3 font-mono text-xs">
//                   <span className="text-cyan-300/80">{e.company}</span>
//                   <span className="text-cyan-500/30">·</span>
//                   <span className="text-cyan-400/50 flex items-center gap-1">
//                     <MapPin className="w-3 h-3" /> {e.location}
//                   </span>
//                 </div>
//                 <p className="text-cyan-100/75 text-sm leading-relaxed mb-3">
//                   {e.description}
//                 </p>
//                 <ul className="space-y-1.5">
//                   {e.highlights.map((h) => (
//                     <li key={h} className="flex items-start gap-2 text-sm text-cyan-100/70">
//                       <span className="text-emerald-400 mt-0.5">▸</span>
//                       <span>{h}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* orbiting marker at end */}
//         <div className="relative mt-6 -ml-6 sm:-ml-10 flex items-center gap-2 text-emerald-300/60">
//           <Orbit className="w-4 h-4 animate-spin-slow" />
//           <span className="font-mono text-xs">ORBIT INITIATED · 2018</span>
//         </div>
//       </div>
//     </ModuleShell>
    
//   );
// }
















import { experience } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { Orbit, MapPin } from 'lucide-react';



export default function ExperienceModule({ onClose }: { onClose: () => void }) {
  return (
    <ModuleShell title="Experience" codename="CAREER ORBIT TIMELINE" accent="emerald" onClose={onClose}>
      <div className="relative pl-6 sm:pl-10">
        {/* energy beam spine */}
        <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-400/60 via-cyan-400/40 to-transparent" />

        <div className="space-y-8">
          {experience.map((e, idx) => (
            <div
              key={e.id}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* node */}
              <div className="absolute -left-6 sm:-left-10 top-1.5">
                <div className="relative w-5 h-5">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse-glow" />
                  <div className="absolute inset-1 rounded-full bg-emerald-400 border border-emerald-200 shadow-lg shadow-emerald-500/50" />
                </div>
              </div>

              <div className="glass rounded-xl p-4 sm:p-5 hover:border-emerald-400/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mb-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-emerald-200 leading-snug break-words">
                    {e.company}
                  </h3>
                  <span className="font-mono text-[11px] sm:text-xs text-emerald-300/70 shrink-0">
                    {e.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 font-mono text-[11px] sm:text-xs">
                  <span className="text-cyan-300/80 break-words">{e.role}</span>
                  <span className="text-cyan-500/30 hidden sm:inline">·</span>
                  <span className="text-cyan-400/50 flex items-center gap-1">
                    <MapPin className="w-3 h-3 shrink-0" /> {e.location}
                  </span>
                </div>
                <p className="text-cyan-100/75 text-sm leading-relaxed mb-3">
                  {e.description}
                </p>
                <ul className="space-y-1.5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-cyan-100/70">
                      <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
                      <span className="break-words">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* orbiting marker at end */}
        <div className="relative mt-6 -ml-6 sm:-ml-10 flex items-center gap-2 text-emerald-300/60">
          <Orbit className="w-4 h-4 animate-spin-slow" />
          <span className="font-mono text-xs">ORBIT INITIATED · 2018</span>
        </div>
      </div>
    </ModuleShell>
    
  );
}
