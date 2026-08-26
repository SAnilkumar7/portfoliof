import { useEffect } from 'react';
import { X } from 'lucide-react';

type Props = {
  title: string;
  codename?: string;
  accent?: string;  
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModuleShell({ title, codename, accent = 'cyan', onClose, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const accentMap: Record<string, string> = {
    cyan: 'text-cyan-300 border-cyan-400/40 shadow-cyan-500/20',
    emerald: 'text-emerald-300 border-emerald-400/40 shadow-emerald-500/20',
    amber: 'text-amber-300 border-amber-400/40 shadow-amber-500/20',
    pink: 'text-pink-300 border-pink-400/40 shadow-pink-500/20',
    violet: 'text-violet-300 border-violet-400/40 shadow-violet-500/20',
  };
  const a = accentMap[accent] ?? accentMap.cyan;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full max-w-5xl max-h-[88vh] glass-strong rounded-2xl border ${a} shadow-2xl flex flex-col animate-scale-in`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-cyan-500/15">
          <div>
            <div className="flex items-center gap-3">
              <span className={`font-display text-lg sm:text-xl font-bold ${a.split(' ')[0]}`}>
                {title}
              </span>
              {codename && (
                <span className="font-mono text-[10px] text-cyan-500/50 hidden sm:inline">
                  {codename}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-cyan-500/20 hover:border-rose-400/50 hover:bg-rose-500/10 transition-colors flex items-center justify-center text-cyan-300/70 hover:text-rose-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* body */}
        <div className="overflow-y-auto no-scrollbar px-5 sm:px-7 py-6 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
