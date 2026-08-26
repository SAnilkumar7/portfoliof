import { useEffect, useState } from 'react';

type Props = { onComplete: () => void };

const lines = [
  '> INITIALIZING ANIL OS v3.2...',
  '> MOUNTING NEURAL CORE.......... OK',
  '> LOADING DEVELOPER INTELLIGENCE.... OK',
  '> CALIBRATING HOLOGRAPHIC ARRAY.. OK',
  '> ESTABLISHING SECURE UPLINK..... OK',
  '> WARMING UP AI ASSISTANT....... OK',
  '> SYNCHRONIZING GITHUB STELLAR MAP OK',
  '> SYSTEMS NOMINAL. ENTERING LAB.',
];

export default function BootSequence({ onComplete }: Props) {
  const [shown, setShown] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setShown((s) => [...s, lines[i]]);
        setProgress(Math.round(((i + 1) / lines.length) * 100));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setDone(true), 500);
        setTimeout(onComplete, 1400);
      }
    }, 240);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#04060d] transition-opacity duration-700 ${
        done ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 vignette" />

      <div className="relative w-full max-w-2xl px-8">
        {/* progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 font-mono text-xs text-cyan-400/70">
            <span>LOADING DEVELOPER INTELLIGENCE</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-200"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 16px rgba(0,229,255,0.7)',
              }}
            />
          </div>
        </div>

        {/* boot lines */}
        <div className="font-mono text-sm space-y-1.5 min-h-[220px]">
          {shown.map((l, idx) => (
            <div
              key={idx}
              className="text-cyan-300/90 animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {l}
            </div>
          ))}
          <div className="text-emerald-400 animate-fade-in">
            <span className="animate-blink">█</span>
          </div>
        </div>
      </div>
    </div>
  );
}
