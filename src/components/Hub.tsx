import { profile } from '@/data/portfolio';
import {
  Boxes,
  Orbit,
  Network,
  MessageSquareQuote,
  Sparkles,
  Mail,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

export type ModuleId =
  | 'projects'
  | 'experience'
  | 'skills'
  | 'reviews'
  | 'assistant'
  | 'contact'
  |'override';

type Props = {
  onOpen: (id: ModuleId) => void;
};

const modules: {
  id: ModuleId;
  label: string;
  sub: string;
  icon: typeof Boxes;
  color: string;
  ring: string;
  glow: string;
}[] = [
  { id: 'projects', label: 'Projects', sub: 'Holographic Artifacts', icon: Boxes, color: 'text-cyan-300', ring: 'group-hover:border-cyan-400/60', glow: 'group-hover:shadow-cyan-500/30' },
  { id: 'experience', label: 'Experience', sub: 'Career Orbit', icon: Orbit, color: 'text-emerald-300', ring: 'group-hover:border-emerald-400/60', glow: 'group-hover:shadow-emerald-500/30' },
  { id: 'skills', label: 'Skills', sub: 'Neural Network', icon: Network, color: 'text-amber-300', ring: 'group-hover:border-amber-400/60', glow: 'group-hover:shadow-amber-500/30' },
  { id: 'reviews', label: 'Reviews', sub: 'Field Reports', icon: MessageSquareQuote, color: 'text-pink-300', ring: 'group-hover:border-pink-400/60', glow: 'group-hover:shadow-pink-500/30' },
  { id: 'assistant', label: 'AI Assistant', sub: 'Conversational Core', icon: Sparkles, color: 'text-cyan-200', ring: 'group-hover:border-cyan-300/60', glow: 'group-hover:shadow-cyan-400/30' },
  { id: 'contact', label: 'Contact', sub: 'Secure Comms', icon: Mail, color: 'text-emerald-200', ring: 'group-hover:border-emerald-300/60', glow: 'group-hover:shadow-emerald-400/30' },
  { id: 'override', label: 'Hack the System', sub: 'Final Override', icon: AlertTriangle, color: 'text-red-300', ring: 'group-hover:border-red-400/60', glow: 'group-hover:shadow-red-500/30' },
];


export default function Hub({ onOpen }: Props) {
 const stats = [
    { label: 'PROJECTS', value: `${profile.stats.projects}+` },
    { label: 'CLIENTS', value: `${profile.stats.clients}+` },
    { label: 'REPOSITORIES', value: `${profile.stats.repos}+` },
    { label: 'AI MODELS', value: `${profile.stats.models}+` },
    { label: 'YEARS ACTIVE', value: `${profile.stats.years}+` }, // This will show "1.9+"
];

  return (
    <div className="relative z-10 min-h-screen pt-24 pb-16 px-4 sm:px-8 flex flex-col items-center">
      {/* hero / mission status */}
      <div className="w-full max-w-5xl text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="font-mono text-xs text-emerald-300 tracking-widest">
            MISSION STATUS · SYSTEM ONLINE
          </span>
        </div>

        <h1 className="font-display font-black tracking-tight mb-3 text-center leading-tight">
          <span className="block text-4xl sm:text-6xl md:text-7xl text-gradient-cyan glow-cyan">
           S Anil Kumar
          </span>
          <span className="block text-3xl sm:text-5xl md:text-6xl text-gradient-amber glow-amber mt-1">
            AI Developer
          </span>
        </h1>
        <p className="font-body text-lg sm:text-xl text-cyan-100/80 max-w-2xl mx-auto">
          {profile.tagline}
        </p>
        <p className="font-mono text-xs text-cyan-400/50 mt-3">
          OPERATOR: {profile.name} · CALLSIGN: {profile.callsign} · {profile.title}
        </p>
      </div>

      {/* stat strip */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass rounded-lg px-4 py-3 text-center hover:border-cyan-400/40 transition-colors"
          >
            <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-200 glow-cyan">
              {s.value}
            </div>
            <div className="font-mono text-[10px] text-cyan-400/60 tracking-widest mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* AI greeting */}
      <div className="w-full max-w-3xl glass-strong rounded-xl px-6 py-5 mb-12 animate-fade-in-up flex items-start gap-4" style={{ animationDelay: '0.2s' }}>
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-cyan-300" />
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] text-cyan-400/50 mb-1">AI ASSISTANT · ONLINE</div>
          <p className="text-cyan-100/90 text-base leading-relaxed">
            "Welcome to the digital laboratory of {profile.name}. Every project here was built to solve real-world problems. Where would you like to begin?"
          </p>
        </div>
      </div>

      {/* modules grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => onOpen(m.id)}
              className={`group relative glass rounded-xl p-5 text-left border border-cyan-500/15 ${m.ring} hover:shadow-2xl ${m.glow} transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-lg border border-cyan-500/20 flex items-center justify-center ${m.color} bg-cyan-500/5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ChevronRight className={`w-4 h-4 ${m.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
              </div>
              <div className={`font-display text-base font-bold ${m.color}`}>
                {m.label}
              </div>
              <div className="font-mono text-[10px] text-cyan-400/50 mt-1">
                {m.sub}
              </div>
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute -inset-1 bg-gradient-to-br from-current/0 via-current/0 to-current/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 font-mono text-[10px] text-cyan-500/40 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        TIP · PRESS ⌘K ANYWHERE TO OPEN COMMAND CENTER
      </div>
    </div>
  );
}
