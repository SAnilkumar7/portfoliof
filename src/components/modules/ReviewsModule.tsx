import { reviews } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { MessageSquareQuote, Quote, Star } from 'lucide-react';

export default function ReviewsModule({ onClose }: { onClose: () => void }) {
  return (
    <ModuleShell title="Reviews" codename="CONFIDENTIAL FIELD REPORTS" accent="pink" onClose={onClose}>
      <div className="grid sm:grid-cols-2 gap-4">
        {reviews.map((r, idx) => (
          <div
            key={r.id}
            className="group glass rounded-xl p-5 border border-pink-500/15 hover:border-pink-400/40 transition-all animate-fade-in-up hover:-translate-y-1"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-11 h-11 rounded-full border border-pink-400/40 bg-pink-400/10 flex items-center justify-center font-display font-bold text-pink-200">
                {r.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="font-display text-sm font-bold text-pink-200">
                  {r.author}
                </div>
                <div className="font-mono text-[10px] text-pink-300/60">
                  {r.role} · {r.company}
                </div>
              </div>
            </div>

            <div className="relative">
              <Quote className="absolute -top-1 -left-1 w-5 h-5 text-pink-400/20" />
              <p className="text-cyan-100/80 text-sm leading-relaxed pl-5 italic">
                "{r.quote}"
              </p>
            </div>

            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-pink-300/50">
        <MessageSquareQuote className="w-3 h-3" /> 4 FIELD REPORTS · CLASSIFIED · VERIFIED
      </div>
    </ModuleShell>
  );
}
