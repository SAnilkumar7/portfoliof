import { useState, useRef, useEffect } from 'react';
import {
  aiKnowledge,
  profile,
  projects,
  experience,
  skills,
  reviews,
} from '@/data/portfolio';
import ModuleShell from '../ModuleShell';
import {
  Sparkles,
  Send,
  User,
  Bot,
  Mic,
  X,
  ArrowLeft,
  MessageCircle,
  Volume2,
  Waves,
} from 'lucide-react';

type Msg = {
  role: 'ai' | 'user';
  text: string;
};

type AssistantMode = 'select' | 'voice' | 'chat';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AssistantModule({
  onClose,
}: {
  onClose: () => void;
}) {
  const [mode, setMode] =
    useState<AssistantMode>('select');

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'ai',
      text: `Welcome to the digital laboratory of ${profile.name}. Every project here was built to solve real-world problems. Where would you like to begin?`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] =
    useState(false);
  const [isListening, setIsListening] =
    useState(false);
  const [isSpeaking, setIsSpeaking] =
    useState(false);
  const [level, setLevel] = useState(0);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const recognitionRef =
    useRef<any>(null);

  const conversationActiveRef =
    useRef(false);

  const audioCtxRef =
    useRef<AudioContext | null>(null);

  const analyserRef =
    useRef<AnalyserNode | null>(null);

  const micStreamRef =
    useRef<MediaStream | null>(null);

  const micRafRef =
    useRef<number | null>(null);

  const speakLevelRef =
    useRef(0);

  const speakRafRef =
    useRef<number | null>(null);

  /*
   * =========================================================
   * AUTO SCROLL
   * =========================================================
   */

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  /*
   * =========================================================
   * MICROPHONE ANALYSIS
   * =========================================================
   */

  const startMicAnalysis = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      micStreamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as any).webkitAudioContext;

      if (!AudioCtx) {
        return;
      }

      const audioCtx =
        new AudioCtx();

      audioCtxRef.current =
        audioCtx;

      const source =
        audioCtx.createMediaStreamSource(
          stream
        );

      const analyser =
        audioCtx.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);

      analyserRef.current =
        analyser;

      const freqData =
        new Uint8Array(
          analyser.frequencyBinCount
        );

      const tick = () => {
        if (!analyserRef.current) {
          return;
        }

        analyser.getByteFrequencyData(
          freqData
        );

        let sum = 0;

        for (
          let i = 0;
          i < freqData.length;
          i++
        ) {
          sum += freqData[i];
        }

        const avg =
          sum / freqData.length;

        setLevel(
          Math.min(
            1,
            avg / 130
          )
        );

        micRafRef.current =
          requestAnimationFrame(tick);
      };

      tick();
    } catch (error) {
      console.error(
        'Microphone access failed:',
        error
      );
    }
  };

  const stopMicAnalysis = () => {
    if (micRafRef.current) {
      cancelAnimationFrame(
        micRafRef.current
      );
    }

    micRafRef.current = null;

    analyserRef.current = null;

    micStreamRef.current
      ?.getTracks()
      .forEach((track) => {
        track.stop();
      });

    micStreamRef.current = null;

    audioCtxRef.current
      ?.close()
      .catch(() => {});

    audioCtxRef.current = null;

    setLevel(0);
  };

  /*
   * =========================================================
   * SPEECH VISUALIZER
   * =========================================================
   */

  const startSpeakEnvelope = () => {
    speakLevelRef.current = 0;

    const decay = () => {
      speakLevelRef.current =
        Math.max(
          0,
          speakLevelRef.current *
            0.9 -
            0.01
        );

      setLevel(
        speakLevelRef.current
      );

      speakRafRef.current =
        requestAnimationFrame(
          decay
        );
    };

    decay();
  };

  const stopSpeakEnvelope = () => {
    if (speakRafRef.current) {
      cancelAnimationFrame(
        speakRafRef.current
      );
    }

    speakRafRef.current = null;

    setLevel(0);
  };

  const spikeSpeakEnvelope = () => {
    speakLevelRef.current =
      Math.min(
        1,
        speakLevelRef.current +
          0.55 +
          Math.random() *
            0.35
      );
  };

  /*
   * =========================================================
   * CLEANUP
   * =========================================================
   */

  useEffect(() => {
    return () => {
      stopMicAnalysis();
      stopSpeakEnvelope();

      window.speechSynthesis?.cancel();

      recognitionRef.current?.stop();
    };
  }, []);

  /*
   * =========================================================
   * AI CONTEXT
   * =========================================================
   */

  const context = JSON.stringify({
    profile,
    knowledge: aiKnowledge,
    projects,
    experience,
    skills,
    reviews,
  });

  /*
   * =========================================================
   * TEXT TO SPEECH
   * =========================================================
   */

  const speak = (
    text: string,
    options?: {
      force?: boolean;
      onEnd?: () => void;
    }
  ) => {
    if (
      !('speechSynthesis' in window) ||
      !options?.force
    ) {
      options?.onEnd?.();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.rate = 1.02;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      startSpeakEnvelope();
    };

    utterance.onboundary = () => {
      spikeSpeakEnvelope();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      stopSpeakEnvelope();

      options?.onEnd?.();
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      stopSpeakEnvelope();

      options?.onEnd?.();
    };

    window.speechSynthesis.speak(
      utterance
    );
  };

  /*
   * =========================================================
   * ASK AI
   * =========================================================
   */

  const ask = async (
    question: string
  ) => {
    if (
      !question.trim() ||
      isStreaming
    ) {
      return;
    }

    const history =
      messages;

    setMessages(
      (current) => [
        ...current,
        {
          role: 'user',
          text: question,
        },
        {
          role: 'ai',
          text: '',
        },
      ]
    );

    setInput('');

    setIsStreaming(true);

    try {
      const response =
        await fetch(
          `${API_URL}/api/chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              message: question,
              history,
              context,
            }),
          }
        );

      if (!response.body) {
        throw new Error(
          'No response stream'
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let buffer = '';
      let fullText = '';

      while (true) {
        const {
          value,
          done,
        } = await reader.read();

        if (done) break;

        buffer += decoder.decode(
          value,
          {
            stream: true,
          }
        );

        const lines =
          buffer.split('\n\n');

        buffer =
          lines.pop() || '';

        for (
          const line of lines
        ) {
          if (
            !line.startsWith(
              'data: '
            )
          ) {
            continue;
          }

          const payload =
            line.slice(6);

          if (
            payload === '[DONE]'
          ) {
            continue;
          }

          try {
            const parsed =
              JSON.parse(
                payload
              );

            const text =
              parsed.text || '';

            fullText += text;

            setMessages(
              (current) => {
                const copy =
                  [...current];

                copy[
                  copy.length - 1
                ] = {
                  role: 'ai',
                  text: fullText,
                };

                return copy;
              }
            );
          } catch {
            // Ignore malformed chunks.
          }
        }
      }

      /*
       * Voice mode automatically speaks
       * the response.
       */

      speak(fullText, {
        force:
          mode === 'voice' &&
          conversationActiveRef.current,

        onEnd: () => {
          if (
            mode === 'voice' &&
            conversationActiveRef.current
          ) {
            startListening();
          }
        },
      });
    } catch (error) {
      console.error(error);

      setMessages(
        (current) => {
          const copy =
            [...current];

          copy[
            copy.length - 1
          ] = {
            role: 'ai',
            text:
              "I'm having trouble connecting right now — try again in a moment.",
          };

          return copy;
        }
      );
    } finally {
      setIsStreaming(false);
    }
  };

  /*
   * =========================================================
   * STOP LISTENING
   * =========================================================
   */

  const stopListening = () => {
    recognitionRef.current?.stop();

    setIsListening(false);

    stopMicAnalysis();
  };

  /*
   * =========================================================
   * START LISTENING
   * =========================================================
   */

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    const SpeechRecognition =
      (window as any)
        .SpeechRecognition ||
      (window as any)
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Voice input is not supported in this browser. Try Chrome or Edge.'
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      'en-US';

    recognition.interimResults =
      false;

    recognition.continuous =
      false;

    recognition.onresult = (
      event: any
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

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

    recognitionRef.current =
      recognition;

    recognition.start();

    setIsListening(true);

    startMicAnalysis();
  };

  /*
   * =========================================================
   * START VOICE CONVERSATION
   * =========================================================
   */

  const startConversation = () => {
    if (
      conversationActiveRef.current
    ) {
      endConversation();
      return;
    }

    setMode('voice');

    conversationActiveRef.current =
      true;

    const greeting =
      `Hey, I'm the assistant for ${profile.name}. What do you want to know?`;

    setMessages(
      (current) => [
        ...current,
        {
          role: 'ai',
          text: greeting,
        },
      ]
    );

    speak(greeting, {
      force: true,

      onEnd: () => {
        if (
          conversationActiveRef.current
        ) {
          startListening();
        }
      },
    });
  };

  /*
   * =========================================================
   * END VOICE
   * =========================================================
   */

  const endConversation = () => {
    conversationActiveRef.current =
      false;

    window.speechSynthesis?.cancel();

    setIsSpeaking(false);

    stopSpeakEnvelope();

    stopListening();
  };

  /*
   * =========================================================
   * SWITCH TO SELECTION
   * =========================================================
   */

  const switchToSelection = () => {
    endConversation();

    setMode('select');
  };

  /*
   * =========================================================
   * SELECT CHAT
   * =========================================================
   */

  const selectChat = () => {
    endConversation();

    setMode('chat');
  };

  /*
   * =========================================================
   * SUGGESTIONS
   * =========================================================
   */

  const suggestions =
    aiKnowledge
      .slice(0, 4)
      .map(
        (item) => item.q
      );

  const voiceActive =
    isListening ||
    isSpeaking;

  const orbScale =
    1 + level * 0.4;

  /*
   * =========================================================
   * MAIN UI
   * =========================================================
   */

  return (
    <ModuleShell
      title="AI Assistant"
      codename="CONVERSATIONAL CORE"
      accent="cyan"
      onClose={onClose}
    >
      <div className="relative flex flex-col w-full h-[min(60vh,680px)] min-h-[420px] max-h-[680px] overflow-hidden">

        {/* =================================================
            MODE SELECTION
        ================================================= */}

        {mode === 'select' && (
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-1 py-5 sm:py-7">

            <div className="w-full max-w-3xl mx-auto">

              {/* INTRO */}

              <div className="text-center mb-6 sm:mb-8">

                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 mb-3 sm:mb-4">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-cyan-50">
                  How would you like to interact?
                </h2>

                <p className="text-xs sm:text-sm text-cyan-100/40 mt-2">
                  Choose a conversation mode
                </p>

              </div>

              {/* MODE CARDS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                {/* =================================================
                    VOICE CARD
                ================================================= */}

                <button
                  type="button"
                  onClick={
                    startConversation
                  }
                  className="
                    group
                    relative
                    w-full
                    min-h-[190px]
                    sm:min-h-[210px]
                    text-left
                    rounded-2xl
                    border
                    border-cyan-400/15
                    bg-cyan-400/[0.025]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    hover:border-cyan-300/40
                    hover:bg-cyan-400/[0.06]
                    hover:-translate-y-1
                    active:translate-y-0
                    active:scale-[0.99]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-cyan-400/40
                  "
                >

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative h-full flex flex-col">

                    <div className="flex items-start justify-between mb-5">

                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center">

                        <Mic className="w-5 h-5 text-cyan-300" />

                      </div>

                      <Volume2 className="w-4 h-4 text-cyan-300/25 group-hover:text-cyan-300/60 transition-colors" />

                    </div>

                    <h3 className="text-sm sm:text-base text-cyan-50 font-medium">
                      Voice Assistance
                    </h3>

                    <p className="text-xs sm:text-sm text-cyan-100/40 mt-2 leading-relaxed">
                      Talk naturally with the assistant using your microphone and receive spoken replies.
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-5">

                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/60 shrink-0" />

                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-cyan-300/45">
                        Hands-free conversation
                      </span>

                    </div>

                  </div>

                </button>

                {/* =================================================
                    CHAT CARD
                ================================================= */}

                <button
                  type="button"
                  onClick={
                    selectChat
                  }
                  className="
                    group
                    relative
                    w-full
                    min-h-[190px]
                    sm:min-h-[210px]
                    text-left
                    rounded-2xl
                    border
                    border-cyan-400/15
                    bg-cyan-400/[0.025]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    hover:border-cyan-300/40
                    hover:bg-cyan-400/[0.06]
                    hover:-translate-y-1
                    active:translate-y-0
                    active:scale-[0.99]
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-cyan-400/40
                  "
                >

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative h-full flex flex-col">

                    <div className="flex items-start justify-between mb-5">

                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-cyan-400/20 bg-cyan-400/10 flex items-center justify-center">

                        <MessageCircle className="w-5 h-5 text-cyan-300" />

                      </div>

                      <Send className="w-4 h-4 text-cyan-300/25 group-hover:text-cyan-300/60 transition-colors" />

                    </div>

                    <h3 className="text-sm sm:text-base text-cyan-50 font-medium">
                      Chat Assistance
                    </h3>

                    <p className="text-xs sm:text-sm text-cyan-100/40 mt-2 leading-relaxed">
                      Ask questions through text and get detailed responses from the AI assistant.
                    </p>

                    <div className="flex items-center gap-2 mt-auto pt-5">

                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/60 shrink-0" />

                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.16em] text-cyan-300/45">
                        Text conversation
                      </span>

                    </div>

                  </div>

                </button>

              </div>

              {/* MOBILE FOOTER */}

              <div className="flex items-center justify-center gap-2 pt-6 pb-2 text-cyan-100/20">

                <Waves className="w-3.5 h-3.5" />

                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em]">
                  Conversational Core
                </span>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            CHAT MODE
        ================================================= */}

        {mode === 'chat' && (
          <div className="flex flex-col h-full min-h-0">

            {/* HEADER */}

            <div className="flex items-center justify-between shrink-0 pb-3 border-b border-cyan-500/10">

              <button
                type="button"
                onClick={
                  switchToSelection
                }
                className="flex items-center gap-2 min-h-[40px] px-1 text-cyan-100/50 hover:text-cyan-100 transition-colors"
              >

                <ArrowLeft className="w-4 h-4" />

                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                  Assistant
                </span>

              </button>

              <div className="flex items-center gap-2">

                <MessageCircle className="w-4 h-4 text-cyan-300/60" />

                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-cyan-100/40">
                  Chat Mode
                </span>

              </div>

            </div>

            {/* MESSAGES */}

            <div
              ref={scrollRef}
              className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-4 pr-1 pt-4"
            >

              {messages.map(
                (
                  message,
                  index
                ) => (
                  <div
                    key={index}
                    className={`flex gap-2.5 sm:gap-3 animate-fade-in-up ${
                      message.role ===
                      'user'
                        ? 'flex-row-reverse'
                        : ''
                    }`}
                  >

                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 ${
                        message.role ===
                        'ai'
                          ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                          : 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                      }`}
                    >
                      {message.role ===
                      'ai' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`glass rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 max-w-[85%] sm:max-w-[80%] ${
                        message.role ===
                        'user'
                          ? 'border-emerald-400/20'
                          : 'border-cyan-400/20'
                      }`}
                    >

                      <p className="text-cyan-100/85 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">

                        {message.text}

                        {isStreaming &&
                          message.role ===
                            'ai' &&
                          index ===
                            messages.length -
                              1 && (
                            <span className="inline-block w-1.5 h-4 bg-cyan-300 ml-0.5 animate-pulse align-middle" />
                          )}

                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* SUGGESTIONS */}

            <div className="shrink-0 flex flex-wrap gap-1.5 sm:gap-2 py-2.5 sm:py-3">

              {suggestions.map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      ask(
                        suggestion
                      )
                    }
                    disabled={
                      isStreaming
                    }
                    className="font-mono text-[9px] sm:text-[11px] px-2.5 sm:px-3 py-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/5 text-cyan-200/80 hover:bg-cyan-500/15 hover:border-cyan-400/50 transition-all disabled:opacity-40"
                  >
                    {suggestion}
                  </button>
                )
              )}

            </div>

            {/* INPUT */}

            <form
              onSubmit={(
                event
              ) => {
                event.preventDefault();

                if (
                  input.trim()
                ) {
                  ask(
                    input.trim()
                  );
                }
              }}
              className="shrink-0 flex items-center gap-2 pt-3 border-t border-cyan-500/15"
            >

              {/* VOICE */}

              <button
                type="button"
                onClick={
                  startConversation
                }
                title="Switch to voice assistance"
                className="w-10 h-10 sm:w-10 sm:h-10 rounded-lg border border-cyan-400/25 bg-cyan-400/5 hover:bg-cyan-400/10 flex items-center justify-center text-cyan-300 transition-colors shrink-0"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* INPUT */}

              <div className="flex-1 relative min-w-0">

                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50 pointer-events-none" />

                <input
                  value={
                    input
                  }
                  onChange={(
                    event
                  ) =>
                    setInput(
                      event.target
                        .value
                    )
                  }
                  placeholder="Ask the AI..."
                  className="w-full bg-cyan-500/5 border border-cyan-500/25 rounded-lg pl-10 pr-3 py-2.5 text-xs sm:text-sm text-cyan-100 placeholder:text-cyan-500/40 focus:outline-none focus:border-cyan-400/60"
                />

              </div>

              {/* SEND */}

              <button
                type="submit"
                disabled={
                  isStreaming
                }
                className="w-10 h-10 rounded-lg border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 flex items-center justify-center text-cyan-300 transition-colors disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>

            </form>

          </div>
        )}

        {/* =================================================
            VOICE MODE
        ================================================= */}

        {mode === 'voice' && (
          <div className="absolute inset-0 z-20 flex flex-col bg-black/95 backdrop-blur-xl rounded-2xl animate-fade-in-up">

            <style>
              {`
                @keyframes orb-drift {
                  0% {
                    background-position: 0% 50%;
                  }

                  50% {
                    background-position: 100% 50%;
                  }

                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}
            </style>

            {/* TOP BAR */}

            <div className="flex items-center justify-between p-3 sm:p-4 shrink-0">

              <button
                type="button"
                onClick={
                  switchToSelection
                }
                className="flex items-center gap-2 min-h-[40px] px-1 text-white/45 hover:text-white/80 transition-colors"
              >

                <ArrowLeft className="w-4 h-4" />

                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em]">
                  Assistant
                </span>

              </button>

              <button
                type="button"
                onClick={
                  endConversation
                }
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                title="End conversation"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* VOICE CONTENT */}

            <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-5">

              {/* ORB */}

              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full mb-8 sm:mb-10 shrink-0"
                style={{
                  transform: `scale(${orbScale})`,
                  transition:
                    'transform 60ms linear',

                  animation:
                    'orb-drift 6s ease-in-out infinite',

                  backgroundSize:
                    '200% 200%',

                  backgroundImage:
                    isListening
                      ? 'radial-gradient(circle at 30% 30%, #a7f3d0, #34d399 35%, #10b981 55%, #064e3b 100%)'
                      : 'radial-gradient(circle at 30% 30%, #e0e7ff, #818cf8 35%, #6366f1 55%, #1e1b4b 100%)',

                  filter: 'blur(1px)',

                  boxShadow:
                    isListening
                      ? `0 0 ${
                          45 +
                          level *
                            55
                        }px ${
                          7 +
                          level *
                            12
                        }px rgba(52,211,153,0.32)`
                      : `0 0 ${
                          45 +
                          level *
                            55
                        }px ${
                          7 +
                          level *
                            12
                        }px rgba(99,102,241,0.32)`,
                }}
              />

              {/* STATUS */}

              <div className="flex items-center gap-2">

                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isListening
                      ? 'bg-emerald-300'
                      : 'bg-indigo-300'
                  }`}
                />

                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40">
                  {isListening
                    ? 'Listening…'
                    : isSpeaking
                    ? 'Speaking…'
                    : 'Ready'}
                </p>

              </div>

              {/* LIVE TRANSCRIPT */}

              {isListening &&
                input && (
                  <p className="mt-4 text-xs sm:text-sm text-white/60 max-w-[90%] sm:max-w-[80%] text-center italic break-words">
                    “{input}”
                  </p>
                )}

              <p className="mt-3 text-[9px] sm:text-[11px] text-white/25 font-mono text-center">
                {isListening
                  ? 'Speak naturally'
                  : isSpeaking
                  ? 'Assistant is responding'
                  : 'Voice assistance'}
              </p>

            </div>

            {/* BOTTOM CONTROL */}

            <div className="pb-6 sm:pb-8 flex justify-center shrink-0">

              <button
                type="button"
                onClick={
                  endConversation
                }
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 transition-colors"
                title="End conversation"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

          </div>
        )}

      </div>
    </ModuleShell>
  );
}