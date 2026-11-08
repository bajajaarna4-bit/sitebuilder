'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  LANGUAGES,
  MULTILINGUAL_GUIDES,
  SupportedLanguage,
  LocalizedInstruction,
} from '@/lib/i18n/languages';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Globe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  X,
  Video,
  Layers,
  Gamepad2,
  Car,
  MessageSquare,
  Code2,
} from 'lucide-react';

interface Props {
  onSelectPrompt?: (prompt: string) => void;
  defaultOpen?: boolean;
}

export function MultilingualVoiceGuide({ onSelectPrompt, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeTab, setActiveTab] = useState<'guide' | 'video' | 'shortcuts'>('guide');

  const currentGuide: LocalizedInstruction = MULTILINGUAL_GUIDES[selectedLang];
  const currentLangMeta = LANGUAGES[selectedLang];

  // Stop speech synthesis when closing or unmounting
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentGuide.audioScript);
    utterance.lang = currentLangMeta.speechCode;
    utterance.rate = speechRate;

    // Attempt to pick a matching language voice from system voices
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(
      (v) => v.lang === currentLangMeta.speechCode || v.lang.startsWith(currentLangMeta.code)
    );
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleSwitchLanguage = (lang: SupportedLanguage) => {
    handleStopVoice();
    setSelectedLang(lang);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-500/5 transition-all duration-200 active:scale-95 group"
        title="Multilingual Audio & Visual Guidance"
      >
        <span className="text-sm">{currentLangMeta.flag}</span>
        <Volume2 className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Voice & Visual Guide</span>
      </button>

      {/* Guidance Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b0e14] border border-white/[0.1] rounded-3xl max-w-3xl w-full shadow-2xl flex flex-col overflow-hidden my-auto max-h-[90vh]">
            {/* Header: Language Switcher & Controls */}
            <div className="p-6 border-b border-white/[0.08] bg-zinc-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEXUS AI MULTILINGUAL MASTER GUIDE</span>
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight mt-1">
                  {currentGuide.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">{currentGuide.subtitle}</p>
              </div>

              <button
                onClick={() => {
                  handleStopVoice();
                  setIsOpen(false);
                }}
                className="self-start sm:self-center p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector Bar */}
            <div className="px-6 py-3 bg-[#0d121c] border-b border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
                {(Object.keys(LANGUAGES) as SupportedLanguage[]).map((code) => {
                  const lang = LANGUAGES[code];
                  const isCurrent = selectedLang === code;
                  return (
                    <button
                      key={code}
                      onClick={() => handleSwitchLanguage(code)}
                      className={`px-3 py-1.5 rounded-xl font-medium transition-all duration-150 flex items-center space-x-1.5 ${
                        isCurrent
                          ? 'bg-cyan-500 text-black font-extrabold shadow-md shadow-cyan-500/20'
                          : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/[0.06]'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-1 bg-zinc-900 p-0.5 rounded-xl border border-white/[0.08] text-xs">
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'guide' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  Step Guide
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1 rounded-lg font-medium transition flex items-center space-x-1 ${
                    activeTab === 'video' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  <Video className="w-3 h-3 text-cyan-400" />
                  <span>Video Demo</span>
                </button>
                <button
                  onClick={() => setActiveTab('shortcuts')}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    activeTab === 'shortcuts' ? 'bg-zinc-800 text-cyan-300 font-bold' : 'text-zinc-400'
                  }`}
                >
                  Tips
                </button>
              </div>
            </div>

            {/* Voice Audio Controller Bar */}
            <div className="px-6 py-3 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-indigo-950/40 border-b border-cyan-800/30 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleVoice}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center space-x-2 shadow-md ${
                    isSpeaking && !isPaused
                      ? 'bg-emerald-500 text-black'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                  }`}
                >
                  {isSpeaking && !isPaused ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause Narration</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>{currentGuide.voiceGuideButton}</span>
                    </>
                  )}
                </button>

                {isSpeaking && (
                  <button
                    onClick={handleStopVoice}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-red-400 border border-zinc-700 transition"
                    title={currentGuide.stopVoiceButton}
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Animated Sound Wave Visualizer */}
                {isSpeaking && !isPaused && (
                  <div className="flex items-center space-x-1 px-2">
                    <span className="w-1 h-3 bg-cyan-400 animate-pulse" />
                    <span className="w-1 h-5 bg-cyan-300 animate-bounce" />
                    <span className="w-1 h-2 bg-cyan-500 animate-pulse" />
                    <span className="w-1 h-6 bg-blue-400 animate-bounce" />
                    <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono text-cyan-300 pl-2">
                      Speaking ({currentLangMeta.name})...
                    </span>
                  </div>
                )}
              </div>

              {/* Speech Rate Controller */}
              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                <span>Speed:</span>
                {[0.8, 1.0, 1.2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => {
                      setSpeechRate(rate);
                      if (isSpeaking) {
                        handleStopVoice();
                        setTimeout(() => handleToggleVoice(), 100);
                      }
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      speechRate === rate ? 'bg-zinc-800 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: Step Guide */}
              {activeTab === 'guide' && (
                <div className="space-y-4">
                  {currentGuide.steps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-2xl bg-zinc-950/60 border border-white/[0.06] hover:border-cyan-500/40 transition-colors flex items-start space-x-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-mono font-black text-black shrink-0 shadow-md">
                        {step.stepNumber}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-sm text-white">{step.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}

                  {/* Interactive Quick Try Prompts */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-2">
                    <span className="text-xs font-mono font-semibold text-zinc-400">
                      1-Click Interactive App Blueprints:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <button
                        onClick={() => {
                          if (onSelectPrompt) onSelectPrompt('Build a premium Subway Surfers 3D endless runner game with real-time controls');
                          setIsOpen(false);
                        }}
                        className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/30 text-left space-y-1 transition group"
                      >
                        <div className="flex items-center space-x-1.5 text-yellow-400 font-bold">
                          <Gamepad2 className="w-3.5 h-3.5" />
                          <span>Subway Surfers 3D</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2">Playable 3-lane runner with arrow keys, gold coins, and speed trains.</p>
                      </button>

                      <button
                        onClick={() => {
                          if (onSelectPrompt) onSelectPrompt('Build OmniRide unified ride-hailing with bike taxi, auto, and sedan fare compare');
                          setIsOpen(false);
                        }}
                        className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/30 text-left space-y-1 transition group"
                      >
                        <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                          <Car className="w-3.5 h-3.5" />
                          <span>OmniRide Mobility</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2">Rapido bikes, Ola autos, and Uber sedans with live fare calculation.</p>
                      </button>

                      <button
                        onClick={() => {
                          if (onSelectPrompt) onSelectPrompt('Build WhatsApp Web clone with real-time chats, audio notes, and video calls');
                          setIsOpen(false);
                        }}
                        className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/30 text-left space-y-1 transition group"
                      >
                        <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Web</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-2">Real-time chats, voice note visualizer, and video calling modal.</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Embedded Video Demo & Tutorial */}
              {activeTab === 'video' && (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-2xl relative">
                    {/* HTML5 Video Showcase */}
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full h-72 md:h-80 object-cover"
                      poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
                    >
                      <source
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support HTML5 video streaming.
                    </video>
                    <div className="p-4 bg-zinc-950/90 border-t border-white/[0.08] flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white">Full-Stack Synthesis Walkthrough</h4>
                        <p className="text-xs text-zinc-400 font-mono">1080p 60FPS Video Demonstration</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-mono font-bold">
                        PLAYING LIVE
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Developer Tips & Shortcuts */}
              {activeTab === 'shortcuts' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-white">{currentGuide.tipsTitle}</h4>
                  <div className="space-y-2">
                    {currentGuide.tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-zinc-950/60 border border-white/[0.06] flex items-center space-x-3 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-2">
                    <span className="font-bold text-cyan-300 uppercase tracking-wide">
                      Keyboard Accelerators
                    </span>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] text-zinc-400">
                      <div><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white">Ctrl / Cmd + Enter</kbd> Dispatch Prompt</div>
                      <div><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white">Arrow Keys</kbd> Play Subway Surfers</div>
                      <div><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white">Space / Up Arrow</kbd> Jump over trains</div>
                      <div><kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-white">Down Arrow</kbd> Duck under barriers</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Close */}
            <div className="p-4 border-t border-white/[0.08] bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono">NEXUS AI v2.0 • 5 Languages Synced</span>
              <button
                onClick={() => {
                  handleStopVoice();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl border border-white/[0.1] transition"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

