// components/modules/OverrideModule.tsx
import { useState, useEffect, useCallback, useRef } from 'react';
import ModuleShell from '../ModuleShell';
import { Shield, Clock, Key, Terminal } from 'lucide-react';
import { 
  ArrowDirection, 
  GamePhase, 
  AI_RESPONSES, 
  SEQUENCE_LENGTHS 
} from '@/data/portfolio';

// Helper function to get random response
const getRandomResponse = (responses: readonly string[]) => 
  responses[Math.floor(Math.random() * responses.length)];

// Generate sequence based on phase
const generateSequence = (phase: GamePhase): ArrowDirection[] => {
  const length = SEQUENCE_LENGTHS[phase as keyof typeof SEQUENCE_LENGTHS] || 3;
  const arrows: ArrowDirection[] = ['↑', '→', '↓', '←'];
  return Array.from({ length }, () => arrows[Math.floor(Math.random() * arrows.length)]);
};

export default function OverrideModule({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [sequence, setSequence] = useState<ArrowDirection[]>([]);
  const [userInput, setUserInput] = useState<ArrowDirection[]>([]);
  const [countdown, setCountdown] = useState(10);
  const [trace, setTrace] = useState(87);
  const [attempts, setAttempts] = useState(0);
  const [aiMessage, setAiMessage] = useState<string>('INTRUSION DETECTED. AI CORE DEFENSE: ACTIVE');
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSequence, setShowSequence] = useState(true);
  const [phaseComplete, setPhaseComplete] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [flashColor, setFlashColor] = useState<'red' | 'green' | null>(null);
  
  // FIXED: Use number instead of NodeJS.Timeout (browser environment)
  const timerRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const sequenceTimerRef = useRef<number | null>(null);
  
  // Flash effect
  const triggerFlash = useCallback((color: 'red' | 'green') => {
    setFlashColor(color);
    setTimeout(() => setFlashColor(null), 300);
  }, []);
  
  // Start Phase 1
  const startPhase1 = () => {
    setPhase('phase1');
    setSequence(generateSequence('phase1'));
    setUserInput([]);
    setAttempts(0);
    setShowSequence(true);
    setTrace(87);
    setStartTime(Date.now());
    setAiMessage('OVERRIDE SEQUENCE INITIATED');
    setPhaseComplete(false);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  };
  
  // Initialize game
  useEffect(() => {
    if (phase === 'intro') {
      setCountdown(10);
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            startPhase1();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    };
  }, []);
  
  // Handle arrow input
  const handleArrowInput = useCallback((direction: ArrowDirection) => {
    if (phase === 'success' || phase === 'failed' || phaseComplete) return;
    
    setUserInput(prev => {
      const newInput = [...prev, direction];
      const expected = sequence.slice(0, newInput.length);
      const isCorrect = newInput.every((val, idx) => val === expected[idx]);
      
      if (!isCorrect) {
        setTotalAttempts(prev => prev + 1);
        const newTrace = Math.min(100, trace + 12);
        setTrace(newTrace);
        setAiMessage(`> INVALID INPUT\n\nAI CORE: ${getRandomResponse(AI_RESPONSES.wrong)}\n\n> TRACE INCREASED: +12%`);
        setAttempts(prev => prev + 1);
        triggerFlash('red');
        
        if (newTrace >= 100) {
          setPhase('failed');
          setAiMessage('> TRACE REACHED 100%\n\n> SECURITY RESPONSE ACTIVATED\n\n> SYSTEM LOCKDOWN INITIATED');
          if (timerRef.current) clearInterval(timerRef.current);
        }
        return [];
      }
      
      if (newInput.length === sequence.length) {
        setCorrectAttempts(prev => prev + 1);
        setPhaseComplete(true);
        const newTrace = Math.min(100, trace + 5);
        setTrace(newTrace);
        setAiMessage(`> PATTERN RECOGNIZED\n\nAI CORE: ${getRandomResponse(AI_RESPONSES.phaseComplete)}\n\n> SECURITY BYPASS: ${newTrace}%`);
        
        setTimeout(() => {
          advancePhase();
        }, 1500);
        
        return newInput;
      }
      
      setAiMessage(`> SEQUENCE: ${newInput.map(a => a).join(' ')}`);
      return newInput;
    });
  }, [phase, sequence, trace, phaseComplete, triggerFlash]);
  
  // Advance to next phase
  const advancePhase = () => {
    const phaseMap: Record<string, GamePhase> = {
      phase1: 'phase2',
      phase2: 'phase3',
      phase3: 'phase4',
    };
    
    const nextPhase = phaseMap[phase] as GamePhase;
    
    if (nextPhase === 'phase4') {
      setPhase('phase4');
      const newSequence = generateSequence('phase4');
      setSequence(newSequence);
      setUserInput([]);
      setShowSequence(true);
      setPhaseComplete(false);
      setTrace(prev => Math.min(100, prev + 5));
      
      setAiMessage('> MEMORIZE THE SEQUENCE\n\n' + newSequence.join('  '));
      
      sequenceTimerRef.current = setTimeout(() => {
        setShowSequence(false);
        setAiMessage('> ⚠ AI DEFENSE ADAPTIVE\n\nSEQUENCE: ? ? ? ? ? ? ? ?\n\nENTER OVERRIDE');
      }, 2000);
    } else if (nextPhase) {
      setPhase(nextPhase);
      const newSequence = generateSequence(nextPhase);
      setSequence(newSequence);
      setUserInput([]);
      setShowSequence(true);
      setPhaseComplete(false);
      setTrace(prev => Math.min(100, prev + 5));
      setAiMessage(`> NEW SEQUENCE DETECTED\n\n${newSequence.join('  ')}`);
    } else {
      handleSuccess();
    }
  };
  
  // Handle success
  const handleSuccess = () => {
    setPhase('success');
    if (timerRef.current) clearInterval(timerRef.current);
    const time = (Date.now() - (startTime || Date.now())) / 1000;
    const acc = totalAttempts > 0 
      ? Math.round((correctAttempts / (correctAttempts + totalAttempts)) * 100)
      : 100;
    
    setAccuracy(acc);
    setElapsedTime(time);
    setAiMessage('> FINAL SEQUENCE ACCEPTED\n\n> DISABLING SECURITY...\n\n> 100%');
    triggerFlash('green');
  };
  
  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: Record<string, ArrowDirection> = {
        'ArrowUp': '↑',
        'ArrowRight': '→',
        'ArrowDown': '↓',
        'ArrowLeft': '←',
      };
      
      if (e.key in keyMap) {
        e.preventDefault();
        handleArrowInput(keyMap[e.key]);
      }
      
      if (e.key === 'Enter' && phase === 'success') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleArrowInput, phase, onClose]);
  
  // Render UI based on phase
  const renderContent = () => {
    if (phase === 'intro') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] relative">
          <div className="absolute inset-0 bg-red-900/10 animate-pulse" />
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">⚠</div>
            <h2 className="text-2xl font-mono text-red-400 mb-2">INTRUSION DETECTED</h2>
            <div className="space-y-2 font-mono text-sm text-red-300/80">
              <p>AI CORE DEFENSE: ACTIVE</p>
              <p>TRACE STATUS: {trace}%</p>
              <p>ACCESS ATTEMPTS: {attempts}</p>
              <div className="mt-4 p-4 border border-red-500/30 rounded bg-red-950/30">
                <p className="text-red-400">EMERGENCY OVERRIDE REQUIRED</p>
                <p className="text-sm mt-2 text-red-300/60">SYSTEM LOCKDOWN IN:</p>
                <div className="text-4xl font-mono text-red-400 mt-2">{countdown}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (phase === 'failed') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] relative">
          <div className="absolute inset-0 bg-red-900/20 animate-pulse" />
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-mono text-red-400 mb-4">SYSTEM LOCKDOWN</h2>
            <div className="font-mono text-sm text-red-300/80 whitespace-pre-line">
              {aiMessage}
            </div>
            <button
              onClick={() => {
                setPhase('intro');
                setCountdown(10);
                setTrace(87);
                setAttempts(0);
                setTotalAttempts(0);
                setCorrectAttempts(0);
                setElapsedTime(0);
                setUserInput([]);
                setShowSequence(true);
                setAiMessage('INTRUSION DETECTED. AI CORE DEFENSE: ACTIVE');
                countdownRef.current = setInterval(() => {
                  setCountdown(prev => {
                    if (prev <= 1) {
                      if (countdownRef.current) clearInterval(countdownRef.current);
                      startPhase1();
                      return 0;
                    }
                    return prev - 1;
                  });
                }, 1000);
              }}
              className="mt-6 px-6 py-2 bg-red-500/20 border border-red-500/30 rounded text-red-300 hover:bg-red-500/30 transition font-mono"
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }
    
    if (phase === 'success') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] relative">
          <div className="absolute inset-0 bg-green-900/10 animate-pulse" />
          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🔓</div>
            <h2 className="text-2xl font-mono text-green-400 mb-2">ACCESS GRANTED</h2>
            <div className="glass rounded-lg p-6 max-w-md mx-auto bg-black/40 border border-green-500/20">
              <div className="grid grid-cols-2 gap-4 text-left font-mono text-sm">
                <div className="text-cyan-100/60">SECURITY LAYERS:</div>
                <div className="text-green-400">4 / 4</div>
                <div className="text-cyan-100/60">TIME:</div>
                <div className="text-green-400">{elapsedTime.toFixed(2)} SEC</div>
                <div className="text-cyan-100/60">ACCURACY:</div>
                <div className="text-green-400">{accuracy}%</div>
                <div className="text-cyan-100/60">RANK:</div>
                <div className="text-yellow-400">SYSTEM ARCHITECT</div>
              </div>
            </div>
            <div className="mt-6 font-mono text-sm text-green-300/80 whitespace-pre-line">
              {aiMessage}
            </div>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-green-500/20 border border-green-500/30 rounded text-green-300 hover:bg-green-500/30 transition font-mono flex items-center gap-2 mx-auto"
            >
              <Terminal className="w-4 h-4" />
              ENTER ANIL OS
            </button>
          </div>
        </div>
      );
    }
    
    // Game phases
    return (
      <div className="min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center px-4 py-2 mb-4 border-b border-red-500/20 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-red-400 flex items-center gap-1">
              <Shield className="w-3 h-3" /> TRACE: {trace}%
            </span>
            <span className="text-cyan-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {elapsedTime.toFixed(1)}s
            </span>
            <span className="text-yellow-400 flex items-center gap-1">
              <Key className="w-3 h-3" /> ATTEMPT: {attempts + 1}
            </span>
          </div>
          <span className="text-cyan-100/40 uppercase">
            {phase.replace('phase', 'LAYER ')}
          </span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl mb-6 p-4 bg-black/40 border border-red-500/20 rounded font-mono text-sm whitespace-pre-line min-h-[80px]">
            <div className="text-cyan-400/80">{aiMessage}</div>
          </div>
          
          <div className="mb-8 text-center">
            <div className="text-xs text-cyan-100/40 mb-2 uppercase tracking-wider">
              {phase === 'phase4' ? 'MEMORIZE' : 'OVERRIDE SEQUENCE'}
            </div>
            <div className="flex gap-4 text-4xl font-mono justify-center min-h-[60px]">
              {showSequence ? (
                sequence.map((arrow, idx) => (
                  <span
                    key={idx}
                    className={`${
                      idx < userInput.length 
                        ? 'text-green-400' 
                        : 'text-cyan-400'
                    } transition-colors duration-200`}
                  >
                    {arrow}
                  </span>
                ))
              ) : (
                sequence.map((_, idx) => (
                  <span key={idx} className="text-cyan-100/20">
                    ?
                  </span>
                ))
              )}
            </div>
            {userInput.length > 0 && !phaseComplete && (
              <div className="text-xs text-cyan-100/40 mt-2">
                {userInput.length} / {sequence.length}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
            <div />
            <button
              onClick={() => handleArrowInput('↑')}
              disabled={phaseComplete}
              className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↑
            </button>
            <div />
            <button
              onClick={() => handleArrowInput('←')}
              disabled={phaseComplete}
              className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <button
              onClick={() => handleArrowInput('↓')}
              disabled={phaseComplete}
              className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↓
            </button>
            <button
              onClick={() => handleArrowInput('→')}
              disabled={phaseComplete}
              className="p-4 bg-cyan-950/50 border border-cyan-500/30 rounded hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
          
          <div className="mt-4 text-xs text-cyan-100/30 font-mono">
            or use arrow keys on your keyboard
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <ModuleShell 
      title="SECURITY OVERRIDE" 
      codename="FINAL OVERRIDE" 
      accent="red" 
      onClose={onClose}
    >
      {flashColor && (
        <div 
          className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${
            flashColor === 'red' ? 'bg-red-500/20' : 'bg-green-500/20'
          }`}
          style={{
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }}
        />
      )}
      {renderContent()}
    </ModuleShell>
  );
}