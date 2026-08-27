// import { reviews } from '@/data/portfolio';
// import ModuleShell from '../ModuleShell';
// import { MessageSquareQuote, Quote, Star } from 'lucide-react';

// export default function ReviewsModule({ onClose }: { onClose: () => void }) {
//   return (
//     <ModuleShell title="Reviews" codename="CONFIDENTIAL FIELD REPORTS" accent="pink" onClose={onClose}>
//       <div className="grid sm:grid-cols-2 gap-4">
//         {reviews.map((r, idx) => (
//           <div
//             key={r.id}
//             className="group glass rounded-xl p-5 border border-pink-500/15 hover:border-pink-400/40 transition-all animate-fade-in-up hover:-translate-y-1"
//             style={{ animationDelay: `${idx * 0.08}s` }}
//           >
//             <div className="flex items-start gap-3 mb-3">
//               <div className="w-11 h-11 rounded-full border border-pink-400/40 bg-pink-400/10 flex items-center justify-center font-display font-bold text-pink-200">
//                 {r.author.split(' ').map((n) => n[0]).join('')}
//               </div>
//               <div>
//                 <div className="font-display text-sm font-bold text-pink-200">
//                   {r.author}
//                 </div>
//                 <div className="font-mono text-[10px] text-pink-300/60">
//                   {r.role} · {r.company}
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <Quote className="absolute -top-1 -left-1 w-5 h-5 text-pink-400/20" />
//               <p className="text-cyan-100/80 text-sm leading-relaxed pl-5 italic">
//                 "{r.quote}"
//               </p>
//             </div>

//             <div className="flex items-center gap-1 mt-4">
//               {Array.from({ length: r.rating }).map((_, i) => (
//                 <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-pink-300/50">
//         <MessageSquareQuote className="w-3 h-3" /> 4 FIELD REPORTS · CLASSIFIED · VERIFIED
//       </div>
//     </ModuleShell>
//   );
// }











import { reviews } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { MessageSquareQuote, Quote, Star } from 'lucide-react';

export default function ReviewsModule({ onClose }: { onClose: () => void }) {
  return (
    <ModuleShell title="Reviews" codename="CONFIDENTIAL FIELD REPORTS" accent="pink" onClose={onClose}>
      <div className="grid sm:grid-cols-2 gap-5">
        {reviews.map((r, idx) => (
          <div
            key={r.id}
            className="group relative rounded-2xl p-6 bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-pink-500/10 backdrop-blur-xl transition-all duration-300 hover:border-pink-400/30 hover:shadow-[0_0_40px_-12px_rgba(244,114,182,0.35)] hover:-translate-y-1.5 animate-fade-in-up overflow-hidden"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* ambient corner glow */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-pink-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* oversized watermark quote */}
            <Quote className="absolute top-4 right-4 w-10 h-10 text-pink-400/[0.08] rotate-180" strokeWidth={1} />

            <div className="relative flex items-center gap-3 mb-4">
              <div className="relative w-11 h-11 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-60 blur-[2px]" />
                <div className="relative w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-display font-bold text-[13px] text-pink-100 ring-1 ring-white/10">
                  {r.author.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-display text-[15px] font-bold text-white leading-tight truncate">
                  {r.author}
                </div>
                <div className="font-mono text-[10px] tracking-wide text-pink-300/60 truncate">
                  {r.role} · {r.company}
                </div>
              </div>
            </div>

            <p className="relative text-[13.5px] leading-relaxed text-slate-300/90 italic">
              “{r.quote}”
            </p>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="h-px flex-1 mx-4 bg-gradient-to-r from-transparent via-pink-400/15 to-transparent" />
              <span className="font-mono text-[9px] tracking-widest text-pink-300/40 uppercase">verified</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-2 py-2.5 rounded-full border border-pink-500/15 bg-pink-500/[0.03] font-mono text-[10px] tracking-wide text-pink-300/60">
        <MessageSquareQuote className="w-3 h-3" /> {reviews.length} FIELD REPORTS · CLASSIFIED · VERIFIED
      </div>
    </ModuleShell>
  );
}