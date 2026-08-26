import { useEffect, useState } from 'react';
import { profile } from '@/data/portfolio';

type Props = {
  onOpenPalette: () => void;
  onOpenAssistant: () => void;
};

export default function HudFrame({ onOpenPalette, onOpenAssistant }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const clock = time.toLocaleTimeString('en-US', { hour12: false });

  return (
    <>
      {/* top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between glass-strong border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-spin-slow" />
            <div className="absolute inset-1 rounded-full border border-emerald-400/40 animate-spin-reverse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse-glow" />
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold text-cyan-200 glow-cyan">
              ANIL OS
            </div>
            <div className="font-mono text-[10px] text-cyan-500/60">v3.2 · LAB</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs text-cyan-300/70">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            SYSTEM ONLINE
          </span>
          <span className="text-cyan-500/40">|</span>
          <span>{profile.callsign}</span>
          <span className="text-cyan-500/40">|</span>
          <span className="text-amber-300/80">{profile.status}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/15 transition-colors"
          >
            <span className="font-mono text-[11px] text-cyan-300/80">⌘K</span>
            <span className="font-mono text-[11px] text-cyan-400/60 group-hover:text-cyan-300 hidden sm:inline">
              SEARCH
            </span>
          </button>
          <button
            onClick={onOpenAssistant}
            className="px-3 py-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/15 transition-colors font-mono text-[11px] text-emerald-300">
            AI ASSIST
          </button>
          <div className="hidden sm:block font-mono text-xs text-cyan-300/70 tabular-nums">
            {clock}
          </div>
        </div>
      </header>

      {/* corner brackets */}
      <div className="pointer-events-none fixed inset-0 z-30">
        <div className="absolute top-16 left-3 w-10 h-10 border-l-2 border-t-2 border-cyan-400/40" />
        <div className="absolute top-16 right-3 w-10 h-10 border-r-2 border-t-2 border-cyan-400/40" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-l-2 border-b-2 border-cyan-400/40" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-r-2 border-b-2 border-cyan-400/40" />
      </div>

      {/* scanline */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan" />
      </div>

      {/* bottom status strip */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-8 py-2 flex items-center justify-between glass-strong border-t border-cyan-500/20 font-mono text-[10px] text-cyan-500/60">
        <span>SECTOR 7G · DIGITAL LAB · {profile.location}</span>
        <span className="hidden sm:inline">RENDER: 60FPS · UPLINK: STABLE</span>
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </footer>
    </>
  );
}
