import { useEffect, useState } from 'react';
import { projects, experience, skills, reviews, profile } from '@/data/portfolio';
import type { ModuleId } from './Hub';
import { Search, ArrowRight, Folder, Briefcase, Cpu, MessageSquare, Mail, Github, User } from 'lucide-react';

type Props = {
  onClose: () => void;
  onOpen: (id: ModuleId) => void;
};

type Item = {
  id: string;
  label: string;
  sub: string;
  icon: typeof Search;
  action: () => void;
};

export default function CommandPalette({ onClose, onOpen }: Props) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const items: Item[] = [
    { id: 'nav-projects', label: 'Open Projects', sub: 'Holographic artifacts', icon: Folder, action: () => onOpen('projects') },
    { id: 'nav-experience', label: 'Open Experience', sub: 'Career orbit timeline', icon: Briefcase, action: () => onOpen('experience') },
    { id: 'nav-skills', label: 'Open Skills', sub: 'Neural network', icon: Cpu, action: () => onOpen('skills') },
    { id: 'nav-reviews', label: 'Open Reviews', sub: 'Field reports', icon: MessageSquare, action: () => onOpen('reviews') },
    { id: 'nav-github', label: 'Open GitHub', sub: 'Stellar map', icon: Github, action: () => onOpen('github') },
    { id: 'nav-assistant', label: 'Open AI Assistant', sub: 'Conversational core', icon: User, action: () => onOpen('assistant') },
    { id: 'nav-contact', label: 'Open Contact', sub: 'Secure comms', icon: Mail, action: () => onOpen('contact') },
    ...projects.map((p) => ({
      id: p.id,
      label: p.name,
      sub: `Project · ${p.category}`,
      icon: Folder,
      action: () => onOpen('projects'),
    })),
    ...experience.map((e) => ({
      id: e.id,
      label: `${e.role} @ ${e.company}`,
      sub: `Experience · ${e.period}`,
      icon: Briefcase,
      action: () => onOpen('experience'),
    })),
    ...skills.map((s) => ({
      id: s.name,
      label: s.name,
      sub: `Skill · ${s.category} · ${s.level}%`,
      icon: Cpu,
      action: () => onOpen('skills'),
    })),
    ...reviews.map((r) => ({
      id: r.id,
      label: r.author,
      sub: `Review · ${r.company}`,
      icon: MessageSquare,
      action: () => onOpen('reviews'),
    })),
    {
      id: 'email',
      label: profile.contact.email,
      sub: 'Email Anil',
      icon: Mail,
      action: () => { window.location.href = `mailto:${profile.contact.email}`; },
    },
  ];

  const filtered = q
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(q.toLowerCase()) ||
          i.sub.toLowerCase().includes(q.toLowerCase())
      )
    : items;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        filtered[active]?.action();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, active, onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl glass-strong rounded-2xl border border-cyan-400/40 shadow-2xl shadow-cyan-500/20 animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cyan-500/15">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder="Search projects, skills, experience, contact..."
            className="flex-1 bg-transparent text-cyan-100 placeholder:text-cyan-500/40 focus:outline-none font-body text-base"
          />
          <span className="font-mono text-[10px] text-cyan-500/50">ESC</span>
        </div>

        <div className="max-h-[50vh] overflow-y-auto no-scrollbar py-2">
          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center font-mono text-sm text-cyan-500/50">
              NO MATCHES FOUND
            </div>
          )}
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onMouseEnter={() => setActive(idx)}
                onClick={() => { item.action(); onClose(); }}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                  idx === active ? 'bg-cyan-500/15 border-l-2 border-cyan-400' : 'border-l-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${idx === active ? 'text-cyan-300' : 'text-cyan-400/50'}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm truncate ${idx === active ? 'text-cyan-100' : 'text-cyan-200/80'}`}>
                    {item.label}
                  </div>
                  <div className="font-mono text-[10px] text-cyan-500/50 truncate">
                    {item.sub}
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ${idx === active ? 'text-cyan-300 opacity-100' : 'opacity-0'}`} />
              </button>
            );
          })}
        </div>

        <div className="px-5 py-2.5 border-t border-cyan-500/15 font-mono text-[10px] text-cyan-500/50 flex justify-between">
          <span>↑↓ NAVIGATE · ↵ OPEN</span>
          <span>{filtered.length} RESULTS</span>
        </div>
      </div>
    </div>
  );
}
