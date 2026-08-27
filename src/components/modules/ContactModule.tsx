
import { profile } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Copy,
  Check,
  Radio,
  Terminal,
  Wifi,
  Signal,
  Send,
  MousePointer2,
} from 'lucide-react';
import { useState } from 'react';

export default function ContactModule({
  onClose,
}: {
  onClose: () => void;
}) {
  const [activeChannel, setActiveChannel] = useState('EMAIL');
  const [copied, setCopied] = useState(false);

  const channels = [
    {
      id: 'EMAIL',
      label: 'EMAIL',
      value: profile.contact.email,
      icon: Mail,
      color: 'cyan',
      description: 'Direct communication',
      href: `mailto:${profile.contact.email}`,
    },
    {
      id: 'GITHUB',
      label: 'GITHUB',
      value: profile.contact.github,
      icon: Github,
      color: 'violet',
      description: 'Code & experiments',
      href: `https://${profile.contact.github}`,
    },
    {
      id: 'LINKEDIN',
      label: 'LINKEDIN',
      value: profile.contact.linkedin,
      icon: Linkedin,
      color: 'emerald',
      description: 'Professional network',
      href: `https://${profile.contact.linkedin}`,
    },
    {
      id: 'TWITTER',
      label: 'X / TWITTER',
      value: profile.contact.twitter,
      icon: Twitter,
      color: 'amber',
      description: 'Thoughts & updates',
      href: `https://${profile.contact.twitter}`,
    },
  ];

  const active = channels.find((c) => c.id === activeChannel)!;
  const ActiveIcon = active.icon;

  const copyEmail = async () => {
    if (activeChannel !== 'EMAIL') return;

    await navigator.clipboard.writeText(active.value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  };

  const colorMap: Record<string, string> = {
    cyan: 'text-cyan-300',
    violet: 'text-violet-300',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
  };

  const borderMap: Record<string, string> = {
    cyan: 'border-cyan-400/40',
    violet: 'border-violet-400/40',
    emerald: 'border-emerald-400/40',
    amber: 'border-amber-400/40',
  };

  const glowMap: Record<string, string> = {
    cyan: 'shadow-cyan-500/20',
    violet: 'shadow-violet-500/20',
    emerald: 'shadow-emerald-500/20',
    amber: 'shadow-amber-500/20',
  };

  return (
    <ModuleShell
      title="Contact"
      codename="SECURE COMMUNICATIONS"
      accent="emerald"
      onClose={onClose}
    >
      <div className="max-w-4xl mx-auto">

        {/* TOP STATUS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-3 rounded-xl border border-emerald-400/10 bg-black/20 font-mono text-[10px]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-emerald-400 blur-sm animate-pulse" />
            </div>

            <span className="text-emerald-300 tracking-[0.2em]">
              CHANNEL ONLINE
            </span>
          </div>

          <div className="flex items-center gap-4 text-cyan-400/50">
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              ENCRYPTED
            </span>

            <span className="flex items-center gap-1">
              <Signal className="w-3 h-3" />
              STABLE
            </span>
          </div>
        </div>

        {/* HERO */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-cyan-500/[0.04] p-6 sm:p-8 mb-6">

          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/10 blur-3xl rounded-full" />

          <div className="relative">

            <div className="flex items-center gap-2 mb-5">
              <Terminal className="w-4 h-4 text-emerald-400" />

              <span className="font-mono text-[10px] text-emerald-400/70 tracking-[0.25em]">
                INCOMING CONNECTION
              </span>

              <span className="flex-1 h-px bg-gradient-to-r from-emerald-400/20 to-transparent" />
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Let's build something
              <span className="text-emerald-300"> interesting.</span>
            </h3>

            <p className="max-w-xl text-cyan-100/60 leading-relaxed">
              Have a product idea, engineering challenge, or opportunity?
              Select a communication channel below and establish a direct
              connection.
            </p>

            {/* Fake terminal */}
            <div className="mt-6 rounded-lg border border-white/5 bg-black/30 p-4 font-mono text-[11px]">
              <div className="text-cyan-400/40 mb-2">
                {'>'} system.contact.initialize()
              </div>

              <div className="text-emerald-300">
                {'>'} secure channel available
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* CHANNEL SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isActive = activeChannel === channel.id;

            return (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`
                  group relative overflow-hidden
                  rounded-xl border p-4 text-left
                  transition-all duration-300
                  ${
                    isActive
                      ? `${borderMap[channel.color]} bg-white/[0.05] shadow-lg ${glowMap[channel.color]}`
                      : 'border-white/5 bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03]'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-current opacity-80" />
                )}

                <Icon
                  className={`
                    w-5 h-5 mb-3 transition-transform duration-300
                    ${
                      isActive
                        ? colorMap[channel.color]
                        : 'text-cyan-100/30 group-hover:text-cyan-100/60'
                    }
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `}
                />

                <div
                  className={`
                    font-mono text-[10px] tracking-widest
                    ${
                      isActive
                        ? colorMap[channel.color]
                        : 'text-cyan-100/40'
                    }
                  `}
                >
                  {channel.label}
                </div>

                <div className="text-[9px] text-cyan-100/25 mt-1 truncate">
                  {channel.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE CHANNEL */}
        <div
          className={`
            relative overflow-hidden
            rounded-2xl border
            ${borderMap[active.color]}
            bg-black/20
            shadow-xl ${glowMap[active.color]}
            transition-all duration-500
          `}
        >

          {/* Scan line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />

          <div className="p-6 sm:p-8">

            <div className="flex items-start justify-between mb-6">

              <div className="flex items-center gap-4">
                <div
                  className={`
                    relative w-14 h-14 rounded-xl
                    border ${borderMap[active.color]}
                    bg-white/[0.03]
                    flex items-center justify-center
                  `}
                >
                  <div
                    className={`
                      absolute inset-0 rounded-xl blur-xl opacity-20
                      bg-current ${colorMap[active.color]}
                    `}
                  />

                  <ActiveIcon
                    className={`relative w-7 h-7 ${colorMap[active.color]}`}
                  />
                </div>

                <div>
                  <div className="font-mono text-[9px] text-cyan-100/30 tracking-[0.2em] mb-1">
                    SELECTED CHANNEL
                  </div>

                  <div
                    className={`font-mono text-sm tracking-widest ${colorMap[active.color]}`}
                  >
                    {active.label}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-emerald-400/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                READY
              </div>
            </div>

            {/* Address */}
            <div className="rounded-xl border border-white/5 bg-black/30 p-4 mb-5">

              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-3 h-3 text-cyan-400/40" />

                <span className="font-mono text-[9px] text-cyan-100/30 tracking-widest">
                  DESTINATION
                </span>
              </div>

              <div
                className={`
                  font-mono text-sm sm:text-base
                  break-all
                  ${colorMap[active.color]}
                `}
              >
                {active.value}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">

              {activeChannel === 'EMAIL' && (
                <button
                  onClick={copyEmail}
                  className="
                    flex-1 flex items-center justify-center gap-2
                    rounded-xl border border-white/10
                    bg-white/[0.03]
                    px-5 py-3
                    font-mono text-xs
                    text-cyan-100/70
                    hover:bg-white/[0.07]
                    hover:text-white
                    transition-all
                  "
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      COPIED TO CLIPBOARD
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      COPY ADDRESS
                    </>
                  )}
                </button>
              )}

              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                className={`
                  flex-1
                  flex items-center justify-center gap-2
                  rounded-xl
                  px-5 py-3
                  font-mono text-xs
                  ${colorMap[active.color]}
                  border ${borderMap[active.color]}
                  bg-white/[0.03]
                  hover:bg-white/[0.08]
                  transition-all
                  hover:-translate-y-0.5
                `}
              >
                {activeChannel === 'EMAIL' ? (
                  <>
                    <Send className="w-4 h-4" />
                    OPEN MAIL CLIENT
                  </>
                ) : (
                  <>
                    OPEN CHANNEL
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="flex items-center justify-center gap-2 mt-6 text-center">
          <MousePointer2 className="w-3 h-3 text-cyan-400/30" />

          <span className="font-mono text-[9px] text-cyan-100/25 tracking-widest">
            SELECT A CHANNEL TO ESTABLISH CONNECTION
          </span>
        </div>
      </div>
    </ModuleShell>
  );
}