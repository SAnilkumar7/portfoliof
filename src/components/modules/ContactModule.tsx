import { profile } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export default function ContactModule({ onClose }: { onClose: () => void }) {
  const channels = [
    { label: 'EMAIL', value: profile.contact.email, icon: Mail, href: `mailto:${profile.contact.email}`, color: 'text-cyan-300' },
    { label: 'GITHUB', value: profile.contact.github, icon: Github, href: `https://${profile.contact.github}`, color: 'text-violet-300' },
    { label: 'LINKEDIN', value: profile.contact.linkedin, icon: Linkedin, href: `https://${profile.contact.linkedin}`, color: 'text-emerald-300' },
    { label: 'TWITTER / X', value: profile.contact.twitter, icon: Twitter, href: `https://${profile.contact.twitter}`, color: 'text-amber-300' },
  ];

  return (
    <ModuleShell title="Contact" codename="SECURE COMMUNICATIONS" accent="emerald" onClose={onClose}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="font-mono text-xs text-emerald-300 tracking-widest">
            {profile.status}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-emerald-200 mb-2">
          Open a Secure Channel
        </h3>
        <p className="text-cyan-100/70 max-w-md mx-auto">
          Mission-ready for full-time roles, founding-engineer positions, and select consulting.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {channels.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group glass rounded-xl p-5 border border-emerald-500/15 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg border border-current/20 bg-current/5 flex items-center justify-center ${c.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className={`w-4 h-4 ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className="font-mono text-[10px] text-cyan-400/50 mb-1">{c.label}</div>
              <div className={`font-mono text-sm ${c.color}`}>{c.value}</div>
            </a>
          );
        })}
      </div>
    </ModuleShell>
  );
}
