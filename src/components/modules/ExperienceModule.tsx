


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

//               <div className="glass rounded-xl p-4 sm:p-5 hover:border-emerald-400/40 transition-colors">
//                 <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mb-1">
//                   <h3 className="font-display text-lg sm:text-xl font-bold text-emerald-200 leading-snug break-words">
//                     {e.company}
//                   </h3>
//                   <span className="font-mono text-[11px] sm:text-xs text-emerald-300/70 shrink-0">
//                     {e.period}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 font-mono text-[11px] sm:text-xs">
//                   <span className="text-cyan-300/80 break-words">{e.role}</span>
//                   <span className="text-cyan-500/30 hidden sm:inline">·</span>
//                   <span className="text-cyan-400/50 flex items-center gap-1">
//                     <MapPin className="w-3 h-3 shrink-0" /> {e.location}
//                   </span>
//                 </div>
//                 <p className="text-cyan-100/75 text-sm leading-relaxed mb-3">
//                   {e.description}
//                 </p>
//                 <ul className="space-y-1.5">
//                   {e.highlights.map((h) => (
//                     <li key={h} className="flex items-start gap-2 text-sm text-cyan-100/70">
//                       <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
//                       <span className="break-words">{h}</span>
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
import {
  MapPin,
  Briefcase,
  ChevronRight,
  CalendarDays,
  Radio,
  ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';

export default function ExperienceModule({
  onClose,
}: {
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(0);

  const active = experience[selected];

  return (
    <ModuleShell
      title="Experience"
      codename="CAREER NAVIGATION SYSTEM"
      accent="emerald"
      onClose={onClose}
    >
      <div className="max-w-6xl mx-auto">

        {/* STATUS BAR */}
        <div className="flex items-center justify-between mb-6 px-4 py-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04]">

          <div className="flex items-center gap-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-50" />
              <span className="relative w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </span>

            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-emerald-300">
                CAREER SYSTEM ONLINE
              </div>

              <div className="font-mono text-[9px] text-cyan-100/40 mt-0.5">
                {experience.length} EXPERIENCE RECORDS
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-cyan-100/40">
            <Radio className="w-3.5 h-3.5 text-emerald-400/70" />
            LIVE DATABASE
          </div>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-5">

          {/* LEFT SIDE */}
          <aside className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden">

            {/* HEADER */}
            <div className="px-5 py-4 border-b border-white/10">
              <div className="font-mono text-[9px] tracking-[0.2em] text-cyan-100/40">
                CAREER HISTORY
              </div>

              <div className="text-xs text-cyan-100/60 mt-1">
                Select a position to inspect
              </div>
            </div>

            {/* EXPERIENCE LIST */}
            <div className="p-3">
              {experience.map((item, index) => {
                const isActive = selected === index;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelected(index)}
                    className={`
                      relative w-full text-left
                      rounded-xl p-4 mb-2
                      border transition-all duration-300
                      ${
                        isActive
                          ? 'border-emerald-400/50 bg-emerald-400/[0.08] shadow-lg shadow-emerald-500/10'
                          : 'border-transparent hover:border-white/10 hover:bg-white/[0.04]'
                      }
                    `}
                  >

                    {/* ACTIVE INDICATOR */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-emerald-400" />
                    )}

                    <div className="flex items-start gap-3">

                      <div
                        className={`
                          shrink-0 w-9 h-9 rounded-lg
                          flex items-center justify-center
                          border
                          ${
                            isActive
                              ? 'border-emerald-400/40 bg-emerald-400/10'
                              : 'border-white/10 bg-white/[0.03]'
                          }
                        `}
                      >
                        <Briefcase
                          className={`
                            w-4 h-4
                            ${
                              isActive
                                ? 'text-emerald-300'
                                : 'text-cyan-100/30'
                            }
                          `}
                        />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div
                          className={`
                            font-display font-bold text-sm truncate
                            ${
                              isActive
                                ? 'text-emerald-200'
                                : 'text-cyan-100/65'
                            }
                          `}
                        >
                          {item.company}
                        </div>

                        <div className="font-mono text-[9px] text-cyan-100/40 mt-1">
                          {item.period}
                        </div>

                        <div className="text-[10px] text-cyan-100/50 mt-2 truncate">
                          {item.role}
                        </div>

                      </div>

                      <ChevronRight
                        className={`
                          w-4 h-4 mt-1 shrink-0
                          ${
                            isActive
                              ? 'text-emerald-400'
                              : 'text-cyan-100/20'
                          }
                        `}
                      />

                    </div>
                  </button>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="px-5 py-4 border-t border-white/10">
              <div className="font-mono text-[8px] text-cyan-100/30">
                RECORD {String(selected + 1).padStart(2, '0')} /{' '}
                {String(experience.length).padStart(2, '0')}
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <main className="relative rounded-2xl border border-emerald-400/20 bg-black/25 overflow-hidden">

            {/* GRID */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* GLOW */}
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

            <div
              key={active.id}
              className="relative p-6 sm:p-8 animate-fade-in-up"
            >

              {/* RECORD HEADER */}
              <div className="flex items-center justify-between mb-8">

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300">
                    EXPERIENCE RECORD
                  </span>

                  <span className="font-mono text-[9px] text-cyan-100/25">
                    #{String(selected + 1).padStart(2, '0')}
                  </span>
                </div>

                <span className="font-mono text-[9px] text-emerald-400/60">
                  VERIFIED
                </span>
              </div>

              {/* COMPANY */}
              <div className="mb-7">

                <div className="font-mono text-[9px] tracking-[0.2em] text-cyan-100/35 mb-2">
                  ORGANIZATION
                </div>

                <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">

                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-200 leading-tight">
                      {active.company}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mt-4">

                      <span className="font-mono text-sm text-cyan-300">
                        {active.role}
                      </span>

                      <span className="text-cyan-100/20">
                        /
                      </span>

                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-100/50">
                        <MapPin className="w-3 h-3" />
                        {active.location}
                      </span>

                    </div>
                  </div>

                  {/* PERIOD */}
                  <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-emerald-400/25 bg-emerald-400/[0.05]">

                    <CalendarDays className="w-4 h-4 text-emerald-300" />

                    <span className="font-mono text-xs text-emerald-200">
                      {active.period}
                    </span>

                  </div>

                </div>
              </div>

              {/* DESCRIPTION */}
              <section className="mb-6">

                <div className="flex items-center gap-3 mb-3">

                  <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300/70">
                    ABOUT THE ROLE
                  </span>

                  <div className="flex-1 h-px bg-white/10" />

                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">

                  <p className="text-sm sm:text-[15px] leading-7 text-cyan-50/80">
                    {active.description}
                  </p>

                </div>
              </section>

              {/* CONTRIBUTIONS */}
              <section>

                <div className="flex items-center gap-3 mb-3">

                  <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300/70">
                    KEY CONTRIBUTIONS
                  </span>

                  <div className="flex-1 h-px bg-white/10" />

                  <span className="font-mono text-[8px] text-cyan-100/30">
                    {active.highlights.length} ITEMS
                  </span>

                </div>

                <div className="grid gap-2">

                  {active.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="
                        group flex items-start gap-3
                        rounded-xl
                        border border-white/10
                        bg-white/[0.025]
                        hover:border-emerald-400/30
                        hover:bg-emerald-400/[0.04]
                        p-4
                        transition-all duration-300
                      "
                    >

                      <div
                        className="
                          shrink-0 w-7 h-7
                          rounded-lg
                          border border-emerald-400/20
                          bg-emerald-400/[0.05]
                          flex items-center justify-center
                        "
                      >
                        <span className="font-mono text-[9px] text-emerald-300">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="flex-1 text-sm leading-6 text-cyan-50/75">
                        {highlight}
                      </p>

                      <ArrowUpRight
                        className="
                          w-4 h-4 shrink-0 mt-1
                          text-cyan-100/15
                          group-hover:text-emerald-300
                          transition-colors
                        "
                      />

                    </div>
                  ))}

                </div>
              </section>

              {/* NAVIGATION */}
              <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/10">

                <div>
                  <div className="font-mono text-[8px] text-cyan-100/25">
                    CAREER NAVIGATION
                  </div>

                  <div className="font-mono text-[9px] text-emerald-400/50 mt-1">
                    NODE {selected + 1} OF {experience.length}
                  </div>
                </div>

                <div className="flex gap-2">

                  {selected > 0 && (
                    <button
                      onClick={() => setSelected(selected - 1)}
                      className="
                        px-4 py-2
                        rounded-lg
                        border border-white/10
                        bg-white/[0.02]
                        hover:bg-white/[0.06]
                        hover:border-white/20
                        font-mono text-[9px]
                        text-cyan-100/50
                        hover:text-cyan-100/80
                        transition-all
                      "
                    >
                      ← PREVIOUS
                    </button>
                  )}

                  {selected < experience.length - 1 && (
                    <button
                      onClick={() => setSelected(selected + 1)}
                      className="
                        flex items-center gap-2
                        px-4 py-2
                        rounded-lg
                        border border-emerald-400/25
                        bg-emerald-400/[0.04]
                        hover:bg-emerald-400/[0.09]
                        hover:border-emerald-400/40
                        font-mono text-[9px]
                        text-emerald-300
                        transition-all
                      "
                    >
                      NEXT
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}

                </div>
              </div>

            </div>
          </main>
        </div>

        {/* BOTTOM INDICATOR */}
        <div className="flex items-center justify-center gap-2 mt-5">

          {experience.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              aria-label={`View experience ${index + 1}`}
              className={`
                h-1.5 rounded-full transition-all duration-300
                ${
                  selected === index
                    ? 'w-8 bg-emerald-400'
                    : 'w-2 bg-cyan-100/15 hover:bg-cyan-100/40'
                }
              `}
            />
          ))}

        </div>

      </div>
    </ModuleShell>
  );
}