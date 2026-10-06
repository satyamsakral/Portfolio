import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Radio, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  { label: 'INITIALIZING SYSTEM', sub: 'Calibrating deep-sea atmospheric telemetry', progress: 25 },
  { label: 'LOADING AI CORE', sub: 'Mounting Gemini & LangChain RAG pipelines', progress: 55 },
  { label: 'CONNECTING NEURAL NETWORK', sub: 'Synchronizing 768-dim vector embeddings', progress: 85 },
  { label: 'SYSTEM ONLINE', sub: 'Facility Sector 07 ready for exploration', progress: 100 },
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(10);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    soundFx.playBoot();

    const t1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgress(55);
      soundFx.playBeep(440, 0.05);
    }, 450);

    const t2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgress(85);
      soundFx.playBeep(660, 0.06);
    }, 1000);

    const t3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setProgress(100);
      soundFx.playSonar();
    }, 1500);

    const t4 = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const handleSkip = () => {
    soundFx.playClick();
    setIsExiting(true);
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#01040a] text-white select-none px-6"
        >
          {/* Deep Ocean Ambient Light Shafts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full" />
            <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          </div>

          <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-8">
            {/* Holographic Radar Scanner Reticle */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Sonar Pulse Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-sonar pointer-events-none" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/20 border-dashed animate-spin-slow pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-cyan-400/40 pointer-events-none" />
              
              {/* Central Core Icon */}
              <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center text-cyan-300">
                <Cpu size={26} className="animate-pulse" />
              </div>

              {/* Ping Dot */}
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping" />
            </div>

            {/* Subsea Facility Metadata */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
                <Radio size={11} className="animate-pulse text-cyan-300" />
                <span>ABYSS RESEARCH FACILITY // SECTOR 07</span>
              </div>
              <h2 className="font-display font-black text-2xl tracking-tight text-white uppercase pt-2">
                SATYAM <span className="gradient-text-cyan">SAKRAL</span>
              </h2>
              <p className="font-mono text-xs text-slate-400">
                AI ENGINEER · FULL-STACK DEVELOPER
              </p>
            </div>

            {/* Sequence Status Text */}
            <div className="w-full abyss-panel p-5 rounded-2xl border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.7)] text-left space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-cyan-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                  <span className="font-bold tracking-widest">{steps[currentStepIndex].label}</span>
                </div>
                <span className="text-slate-400 font-mono">{progress}%</span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                  initial={{ width: '10%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-400 flex items-center gap-1.5 truncate">
                  <Terminal size={11} className="text-cyan-400 shrink-0" />
                  {steps[currentStepIndex].sub}
                </span>
                <span className="text-[10px] text-cyan-300/70 shrink-0 ml-2">DEPTH: 2,840M</span>
              </div>
            </div>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-slate-500 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 transition-all uppercase flex items-center gap-1.5 group cursor-pointer"
            >
              <span>ENTER FACILITY</span>
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
