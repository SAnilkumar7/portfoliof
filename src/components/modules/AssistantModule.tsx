



// import { useState, useRef, useEffect } from 'react';
// import { aiKnowledge, profile, projects, experience, skills, reviews } from '@/data/portfolio';
// import ModuleShell from '../ModuleShell';
// import { Sparkles, Send, User, Bot, Mic, X } from 'lucide-react';

// type Msg = { role: 'ai' | 'user'; text: string };

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// // Number of bars in the waveform visualizer
// const BAR_COUNT = 24;

// export default function AssistantModule({ onClose }: { onClose: () => void }) {
//   const [messages, setMessages] = useState<Msg[]>([
//     { role: 'ai', text: `Welcome to the digital laboratory of ${profile.name}. Every project here was built to solve real-world problems. Where would you like to begin?` },
//   ]);
//   const [input, setInput] = useState('');
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(6));
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const recognitionRef = useRef<any>(null);

//   // Tracks whether we're in a hands-free back-and-forth conversation loop
//   const conversationActiveRef = useRef(false);

//   // Web Audio bits for real mic-volume-driven bars
//   const audioCtxRef = useRef<AudioContext | null>(null);
//   const analyserRef = useRef<AnalyserNode | null>(null);
//   const micStreamRef = useRef<MediaStream | null>(null);
//   const rafRef = useRef<number | null>(null);
//   const speakingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   useEffect(() => {
//     scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
//   }, [messages]);

//   // ---- Real mic-driven waveform (listening) ----
//   const startMicAnalysis = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       micStreamRef.current = stream;

//       const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
//       const audioCtx = new AudioCtx();
//       audioCtxRef.current = audioCtx;

//       const source = audioCtx.createMediaStreamSource(stream);
//       const analyser = audioCtx.createAnalyser();
//       analyser.fftSize = 128; // 64 frequency bins, plenty for 24 bars
//       analyser.smoothingTimeConstant = 0.75;
//       source.connect(analyser);
//       analyserRef.current = analyser;

//       const freqData = new Uint8Array(analyser.frequencyBinCount);
//       const binsPerBar = Math.max(1, Math.floor(freqData.length / BAR_COUNT));

//       const tick = () => {
//         analyser.getByteFrequencyData(freqData);
//         const next: number[] = [];
//         for (let i = 0; i < BAR_COUNT; i++) {
//           let sum = 0;
//           const start = i * binsPerBar;
//           for (let j = start; j < start + binsPerBar; j++) sum += freqData[j] || 0;
//           const avg = sum / binsPerBar; // 0-255
//           // scale to a pixel height, with a floor so idle mic still shows a resting bar
//           const height = Math.max(6, Math.round((avg / 255) * 46));
//           next.push(height);
//         }
//         setBars(next);
//         rafRef.current = requestAnimationFrame(tick);
//       };
//       tick();
//     } catch (err) {
//       console.error('Mic access failed, falling back to no visualizer:', err);
//     }
//   };

//   const stopMicAnalysis = () => {
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     rafRef.current = null;
//     analyserRef.current = null;
//     micStreamRef.current?.getTracks().forEach((t) => t.stop());
//     micStreamRef.current = null;
//     audioCtxRef.current?.close().catch(() => {});
//     audioCtxRef.current = null;
//     setBars(Array(BAR_COUNT).fill(6));
//   };

//   // ---- Simulated waveform for AI speaking (TTS audio isn't accessible to analyze) ----
//   useEffect(() => {
//     if (!isSpeaking) {
//       if (speakingIntervalRef.current) clearInterval(speakingIntervalRef.current);
//       speakingIntervalRef.current = null;
//       if (!isListening) setBars(Array(BAR_COUNT).fill(6));
//       return;
//     }
//     speakingIntervalRef.current = setInterval(() => {
//       setBars((prev) => prev.map(() => Math.round(Math.random() * 26 + 8)));
//     }, 120);
//     return () => {
//       if (speakingIntervalRef.current) clearInterval(speakingIntervalRef.current);
//     };
//   }, [isSpeaking, isListening]);

//   useEffect(() => {
//     // cleanup on unmount
//     return () => {
//       stopMicAnalysis();
//       if (speakingIntervalRef.current) clearInterval(speakingIntervalRef.current);
//       window.speechSynthesis?.cancel();
//     };
//   }, []);

//   // Sent once per request so the backend has real facts about Anil to answer from
//   const context = JSON.stringify({ profile, knowledge: aiKnowledge, projects, experience, skills, reviews });

//   // opts.force lets us speak even when not in the hands-free loop (used for the greeting).
//   // Voice replies now only ever happen inside the conversation loop — a typed message
//   // in the normal chat box stays silent, matching the single-button ChatGPT-style flow.
//   // opts.onEnd fires when speech finishes (or immediately, if we didn't speak at all) so callers
//   // can chain the next step (e.g. go back to listening) without racing the TTS engine.
//   const speak = (text: string, opts?: { force?: boolean; onEnd?: () => void }) => {
//     if (!('speechSynthesis' in window) || !opts?.force) {
//       opts?.onEnd?.();
//       return;
//     }
//     window.speechSynthesis.cancel();
//     const utter = new SpeechSynthesisUtterance(text);
//     utter.rate = 1.02;
//     utter.pitch = 1;
//     utter.onstart = () => setIsSpeaking(true);
//     utter.onend = () => {
//       setIsSpeaking(false);
//       opts?.onEnd?.();
//     };
//     utter.onerror = () => {
//       setIsSpeaking(false);
//       opts?.onEnd?.();
//     };
//     window.speechSynthesis.speak(utter);
//   };

//   const ask = async (q: string) => {
//     if (!q.trim() || isStreaming) return;
//     const history = messages;
//     setMessages((m) => [...m, { role: 'user', text: q }, { role: 'ai', text: '' }]);
//     setInput('');
//     setIsStreaming(true);

//     try {
//       const res = await fetch(`${API_URL}/api/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: q, history, context }),
//       });

//       if (!res.body) throw new Error('No response stream');
//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();
//       let buffer = '';
//       let fullText = '';

//       while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;
//         buffer += decoder.decode(value, { stream: true });
//         const lines = buffer.split('\n\n');
//         buffer = lines.pop() || '';

//         for (const line of lines) {
//           if (!line.startsWith('data: ')) continue;
//           const payload = line.slice(6);
//           if (payload === '[DONE]') continue;
//           try {
//             const { text } = JSON.parse(payload);
//             fullText += text;
//             setMessages((m) => {
//               const copy = [...m];
//               copy[copy.length - 1] = { role: 'ai', text: fullText };
//               return copy;
//             });
//           } catch {
//             // ignore malformed chunk
//           }
//         }
//       }

//       // In hands-free mode: speak the reply, then automatically go back to listening.
//       speak(fullText, {
//         force: conversationActiveRef.current,
//         onEnd: () => {
//           if (conversationActiveRef.current) startListening();
//         },
//       });
//     } catch {
//       setMessages((m) => {
//         const copy = [...m];
//         copy[copy.length - 1] = {
//           role: 'ai',
//           text: "I'm having trouble connecting right now — try again in a moment.",
//         };
//         return copy;
//       });
//     } finally {
//       setIsStreaming(false);
//     }
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//     stopMicAnalysis();
//   };

//   const startListening = () => {
//     if (isListening) {
//       stopListening();
//       return;
//     }
//     const SpeechRecognition =
//       (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert('Voice input is not supported in this browser — try Chrome or Edge.');
//       return;
//     }
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.onresult = (e: any) => {
//       const transcript = e.results[0][0].transcript;
//       setInput(transcript);
//       ask(transcript);
//     };
//     recognition.onend = () => {
//       setIsListening(false);
//       stopMicAnalysis();
//     };
//     recognition.onerror = () => {
//       setIsListening(false);
//       stopMicAnalysis();
//     };
//     recognitionRef.current = recognition;
//     recognition.start();
//     setIsListening(true);
//     // Separate raw mic stream purely for visualizing volume — runs alongside SpeechRecognition
//     startMicAnalysis();
//   };

//   // One tap: opens the voice overlay, speaks a greeting out loud, then auto-listens.
//   // Tapping the same button again (or hitting X) ends the whole hands-free loop.
//   const startConversation = () => {
//     if (conversationActiveRef.current) {
//       endConversation();
//       return;
//     }
//     conversationActiveRef.current = true;
//     const greeting = `Hey, I'm the assistant for ${profile.name}. What do you want to know?`;
//     setMessages((m) => [...m, { role: 'ai', text: greeting }]);
//     speak(greeting, {
//       force: true,
//       onEnd: () => {
//         if (conversationActiveRef.current) startListening();
//       },
//     });
//   };

//   const endConversation = () => {
//     conversationActiveRef.current = false;
//     window.speechSynthesis?.cancel();
//     setIsSpeaking(false);
//     stopListening();
//   };

//   const suggestions = aiKnowledge.slice(0, 4).map((k) => k.q);
//   const voiceActive = isListening || isSpeaking;

//   return (
//     <ModuleShell title="AI Assistant" codename="CONVERSATIONAL CORE" accent="cyan" onClose={onClose}>
//       <div className="flex flex-col h-[60vh] relative">
//         {/* ===== Jarvis-style voice overlay ===== */}
//         {voiceActive && (
//           <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md rounded-2xl animate-fade-in-up">
//             <button
//               onClick={endConversation}
//               className="absolute top-4 right-4 w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-300/70 hover:text-cyan-200 hover:border-cyan-400/60 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>

//             {/* Pulsing orb */}
//             <div className="relative w-40 h-40 flex items-center justify-center mb-8">
//               {[0, 1, 2].map((ring) => (
//                 <span
//                   key={ring}
//                   className={`absolute inset-0 rounded-full border ${
//                     isListening ? 'border-emerald-400/40' : 'border-cyan-400/40'
//                   }`}
//                   style={{
//                     animation: `voice-ring 2.2s ease-out infinite`,
//                     animationDelay: `${ring * 0.55}s`,
//                   }}
//                 />
//               ))}
//               <div
//                 className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-[0_0_30px_rgba(34,211,238,0.35)] ${
//                   isListening
//                     ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-300'
//                     : 'border-cyan-400/70 bg-cyan-400/10 text-cyan-300 animate-pulse'
//                 }`}
//               >
//                 {isListening ? <Mic className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
//               </div>
//             </div>

//             {/* Waveform bars — real mic amplitude while listening, simulated while speaking */}
//             <div className="flex items-end gap-[3px] h-14 mb-6">
//               {bars.map((h, i) => (
//                 <span
//                   key={i}
//                   className={`w-[3px] rounded-full transition-[height] duration-75 ${
//                     isListening ? 'bg-emerald-400/80' : 'bg-cyan-400/80'
//                   }`}
//                   style={{ height: `${h}px` }}
//                 />
//               ))}
//             </div>

//             <p className="font-mono text-xs tracking-widest uppercase text-cyan-200/70">
//               {isListening ? 'Listening…' : 'Speaking…'}
//             </p>
//             {isListening && input && (
//               <p className="mt-3 text-sm text-cyan-100/80 max-w-[80%] text-center italic">
//                 “{input}”
//               </p>
//             )}
//           </div>
//         )}

//         {/* messages */}
//         <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
//           {messages.map((m, i) => (
//             <div
//               key={i}
//               className={`flex gap-3 animate-fade-in-up ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
//             >
//               <div
//                 className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${
//                   m.role === 'ai'
//                     ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
//                     : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
//                 }`}
//               >
//                 {m.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
//               </div>
//               <div
//                 className={`glass rounded-2xl px-4 py-3 max-w-[80%] ${
//                   m.role === 'user' ? 'border-emerald-400/20' : 'border-cyan-400/20'
//                 }`}
//               >
//                 <p className="text-cyan-100/85 text-sm leading-relaxed whitespace-pre-wrap">
//                   {m.text}
//                   {isStreaming && m.role === 'ai' && i === messages.length - 1 && (
//                     <span className="inline-block w-1.5 h-4 bg-cyan-300 ml-0.5 animate-pulse align-middle" />
//                   )}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* suggestions */}
//         <div className="flex flex-wrap gap-2 py-3">
//           {suggestions.map((s) => (
//             <button
//               key={s}
//               onClick={() => ask(s)}
//               disabled={isStreaming}
//               className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-200/80 hover:bg-cyan-500/15 hover:border-cyan-400/50 transition-all disabled:opacity-40"
//             >
//               {s}
//             </button>
//           ))}
//         </div>

//         {/* input */}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             if (input.trim()) ask(input.trim());
//           }}
//           className="flex items-center gap-2 pt-3 border-t border-cyan-500/15"
//         >
//           {/* Single unified voice button — tap to enter the hands-free ChatGPT-style
//               voice overlay. Idle = calm gradient orb, listening = emerald + ping ring,
//               speaking = pulsing cyan. No separate mute toggle needed anymore. */}
//           <button
//             type="button"
//             onClick={startConversation}
//             title={voiceActive ? 'End conversation' : 'Start a spoken conversation'}
//             className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 ${
//               voiceActive ? 'scale-105' : 'hover:scale-105'
//             }`}
//           >
//             <span
//               className={`absolute inset-0 rounded-full transition-colors duration-300 ${
//                 isListening
//                   ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_18px_rgba(52,211,153,0.55)]'
//                   : isSpeaking
//                   ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_18px_rgba(34,211,238,0.55)] animate-pulse'
//                   : 'bg-gradient-to-br from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_14px_rgba(34,211,238,0.35)]'
//               }`}
//             />
//             {voiceActive && (
//               <span className="absolute inset-0 rounded-full border border-white/40 animate-ping" />
//             )}
//             <Mic className="w-4 h-4 relative text-white" />
//           </button>

//           <div className="flex-1 relative">
//             <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask the AI about Anil..."
//               className="w-full bg-cyan-500/5 border border-cyan-500/25 rounded-lg pl-10 pr-3 py-2.5 text-sm text-cyan-100 placeholder:text-cyan-500/40 focus:outline-none focus:border-cyan-400/60"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isStreaming}
//             className="w-10 h-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 flex items-center justify-center text-cyan-300 transition-colors disabled:opacity-40"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </form>
//       </div>
//     </ModuleShell>
//   );
// }


















import { useState, useRef, useEffect } from 'react';
import { aiKnowledge, profile, projects, experience, skills, reviews } from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import { Sparkles, Send, User, Bot, Mic, X } from 'lucide-react';

type Msg = { role: 'ai' | 'user'; text: string };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AssistantModule({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'ai', text: `Welcome to the digital laboratory of ${profile.name}. Every project here was built to solve real-world problems. Where would you like to begin?` },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Single 0–1 "how loud right now" value that drives the orb. While listening this
  // comes from real mic amplitude (Web Audio analyser). While speaking, the browser's
  // speechSynthesis gives no audio stream to analyze — so instead we drive it off the
  // utterance's real onboundary events (fires per word), spiking on each word and
  // decaying between them. That means the orb genuinely tracks speech rhythm instead
  // of pulsing on a fixed timer.
  const [level, setLevel] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Tracks whether we're in a hands-free back-and-forth conversation loop
  const conversationActiveRef = useRef(false);

  // Web Audio bits for real mic-volume analysis
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micRafRef = useRef<number | null>(null);

  // Speaking envelope: a ref (for the rAF loop to read/write without re-render churn)
  // plus its own rAF handle. Decays every frame; onboundary spikes it back up.
  const speakLevelRef = useRef(0);
  const speakRafRef = useRef<number | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // ---- Real mic-driven amplitude (listening) ----
  const startMicAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const freqData = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteFrequencyData(freqData);
        let sum = 0;
        for (let i = 0; i < freqData.length; i++) sum += freqData[i];
        const avg = sum / freqData.length; // 0-255, real mic loudness
        setLevel(Math.min(1, avg / 130));
        micRafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (err) {
      console.error('Mic access failed, falling back to no visualizer:', err);
    }
  };

  const stopMicAnalysis = () => {
    if (micRafRef.current) cancelAnimationFrame(micRafRef.current);
    micRafRef.current = null;
    analyserRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    audioCtxRef.current?.close().catch(() => {});
    audioCtxRef.current = null;
    setLevel(0);
  };

  // ---- Real speech-rhythm envelope (speaking) ----
  // No fixed-interval faking: level only moves when the TTS engine actually reports
  // a word boundary, and decays naturally between words like a real audio meter.
  const startSpeakEnvelope = () => {
    speakLevelRef.current = 0;
    const decay = () => {
      speakLevelRef.current = Math.max(0, speakLevelRef.current * 0.90 - 0.01);
      setLevel(speakLevelRef.current);
      speakRafRef.current = requestAnimationFrame(decay);
    };
    decay();
  };

  const stopSpeakEnvelope = () => {
    if (speakRafRef.current) cancelAnimationFrame(speakRafRef.current);
    speakRafRef.current = null;
    setLevel(0);
  };

  const spikeSpeakEnvelope = () => {
    speakLevelRef.current = Math.min(1, speakLevelRef.current + 0.55 + Math.random() * 0.35);
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      stopMicAnalysis();
      stopSpeakEnvelope();
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Sent once per request so the backend has real facts about Anil to answer from
  const context = JSON.stringify({ profile, knowledge: aiKnowledge, projects, experience, skills, reviews });

  // opts.force lets us speak even when not in the hands-free loop (used for the greeting).
  // Voice replies now only ever happen inside the conversation loop — a typed message
  // in the normal chat box stays silent, matching the single-button ChatGPT-style flow.
  // opts.onEnd fires when speech finishes (or immediately, if we didn't speak at all) so callers
  // can chain the next step (e.g. go back to listening) without racing the TTS engine.
  const speak = (text: string, opts?: { force?: boolean; onEnd?: () => void }) => {
    if (!('speechSynthesis' in window) || !opts?.force) {
      opts?.onEnd?.();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onstart = () => {
      setIsSpeaking(true);
      startSpeakEnvelope();
    };
    // Fires once per real word/sentence boundary reported by the speech engine —
    // this is what makes the orb's pulse match actual spoken rhythm.
    utter.onboundary = () => {
      spikeSpeakEnvelope();
    };
    utter.onend = () => {
      setIsSpeaking(false);
      stopSpeakEnvelope();
      opts?.onEnd?.();
    };
    utter.onerror = () => {
      setIsSpeaking(false);
      stopSpeakEnvelope();
      opts?.onEnd?.();
    };
    window.speechSynthesis.speak(utter);
  };

  const ask = async (q: string) => {
    if (!q.trim() || isStreaming) return;
    const history = messages;
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'ai', text: '' }]);
    setInput('');
    setIsStreaming(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history, context }),
      });

      if (!res.body) throw new Error('No response stream');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6);
          if (payload === '[DONE]') continue;
          try {
            const { text } = JSON.parse(payload);
            fullText += text;
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: 'ai', text: fullText };
              return copy;
            });
          } catch {
            // ignore malformed chunk
          }
        }
      }

      // In hands-free mode: speak the reply, then automatically go back to listening.
      speak(fullText, {
        force: conversationActiveRef.current,
        onEnd: () => {
          if (conversationActiveRef.current) startListening();
        },
      });
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: 'ai',
          text: "I'm having trouble connecting right now — try again in a moment.",
        };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    stopMicAnalysis();
  };

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser — try Chrome or Edge.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      ask(transcript);
    };
    recognition.onend = () => {
      setIsListening(false);
      stopMicAnalysis();
    };
    recognition.onerror = () => {
      setIsListening(false);
      stopMicAnalysis();
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    // Real mic amplitude, runs alongside SpeechRecognition purely for the visualizer
    startMicAnalysis();
  };

  // One tap: opens the voice overlay, speaks a greeting out loud, then auto-listens.
  // Tapping the same button again (or hitting X) ends the whole hands-free loop.
  const startConversation = () => {
    if (conversationActiveRef.current) {
      endConversation();
      return;
    }
    conversationActiveRef.current = true;
    const greeting = `Hey, I'm the assistant for ${profile.name}. What do you want to know?`;
    setMessages((m) => [...m, { role: 'ai', text: greeting }]);
    speak(greeting, {
      force: true,
      onEnd: () => {
        if (conversationActiveRef.current) startListening();
      },
    });
  };

  const endConversation = () => {
    conversationActiveRef.current = false;
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    stopSpeakEnvelope();
    stopListening();
  };

  const suggestions = aiKnowledge.slice(0, 4).map((k) => k.q);
  const voiceActive = isListening || isSpeaking;

  // Orb scale driven directly by the real-time `level` value (0–1) — real mic
  // amplitude while listening, real word-boundary envelope while speaking.
  const orbScale = 1 + level * 0.4;

  return (
    <ModuleShell title="AI Assistant" codename="CONVERSATIONAL CORE" accent="cyan" onClose={onClose}>
      <div className="flex flex-col h-[60vh] relative">
        {/* ===== ChatGPT-style minimal voice overlay ===== */}
        {voiceActive && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl rounded-2xl animate-fade-in-up">
            <style>{`
              @keyframes orb-drift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>

            <button
              onClick={endConversation}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Soft blurred gradient orb — scale tracks the real `level` value every frame,
                no fixed-timer animation driving its size. */}
            <div
              className="relative w-52 h-52 rounded-full mb-10"
              style={{
                transform: `scale(${orbScale})`,
                transition: 'transform 60ms linear',
                animation: 'orb-drift 6s ease-in-out infinite',
                backgroundSize: '200% 200%',
                backgroundImage: isListening
                  ? 'radial-gradient(circle at 30% 30%, #a7f3d0, #34d399 35%, #10b981 55%, #064e3b 100%)'
                  : 'radial-gradient(circle at 30% 30%, #e0e7ff, #818cf8 35%, #6366f1 55%, #1e1b4b 100%)',
                filter: 'blur(1px)',
                boxShadow: isListening
                  ? `0 0 ${50 + level * 60}px ${8 + level * 12}px rgba(52,211,153,0.35)`
                  : `0 0 ${50 + level * 60}px ${8 + level * 12}px rgba(99,102,241,0.35)`,
              }}
            />

            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/40">
              {isListening ? 'Listening…' : 'Speaking…'}
            </p>
            {isListening && input && (
              <p className="mt-3 text-sm text-white/70 max-w-[80%] text-center italic">
                “{input}”
              </p>
            )}

            {/* Minimal bottom control, ChatGPT-style */}
            <div className="absolute bottom-8 flex items-center gap-4">
              <button
                onClick={endConversation}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors"
                title="End conversation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-fade-in-up ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 ${
                  m.role === 'ai'
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                    : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                }`}
              >
                {m.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div
                className={`glass rounded-2xl px-4 py-3 max-w-[80%] ${
                  m.role === 'user' ? 'border-emerald-400/20' : 'border-cyan-400/20'
                }`}
              >
                <p className="text-cyan-100/85 text-sm leading-relaxed whitespace-pre-wrap">
                  {m.text}
                  {isStreaming && m.role === 'ai' && i === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-4 bg-cyan-300 ml-0.5 animate-pulse align-middle" />
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* suggestions */}
        <div className="flex flex-wrap gap-2 py-3">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => ask(s)}
              disabled={isStreaming}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-200/80 hover:bg-cyan-500/15 hover:border-cyan-400/50 transition-all disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input.trim());
          }}
          className="flex items-center gap-2 pt-3 border-t border-cyan-500/15"
        >
          {/* Single unified voice button — tap to enter the hands-free ChatGPT-style
              voice overlay. Idle = calm gradient orb, listening = emerald + ping ring,
              speaking = pulsing cyan. No separate mute toggle needed anymore. */}
          <button
            type="button"
            onClick={startConversation}
            title={voiceActive ? 'End conversation' : 'Start a spoken conversation'}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 ${
              voiceActive ? 'scale-105' : 'hover:scale-105'
            }`}
          >
            <span
              className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                isListening
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_18px_rgba(52,211,153,0.55)]'
                  : isSpeaking
                  ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_18px_rgba(34,211,238,0.55)] animate-pulse'
                  : 'bg-gradient-to-br from-cyan-500 via-sky-400 to-blue-500 shadow-[0_0_14px_rgba(34,211,238,0.35)]'
              }`}
            />
            {voiceActive && (
              <span className="absolute inset-0 rounded-full border border-white/40 animate-ping" />
            )}
            <Mic className="w-4 h-4 relative text-white" />
          </button>

          <div className="flex-1 relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI about Anil..."
              className="w-full bg-cyan-500/5 border border-cyan-500/25 rounded-lg pl-10 pr-3 py-2.5 text-sm text-cyan-100 placeholder:text-cyan-500/40 focus:outline-none focus:border-cyan-400/60"
            />
          </div>
          <button
            type="submit"
            disabled={isStreaming}
            className="w-10 h-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 flex items-center justify-center text-cyan-300 transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </ModuleShell>
  );
}