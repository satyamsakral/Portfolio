import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  GraduationCap,
  Sparkles,
  Terminal,
  Database,
  Layers,
  Award,
  Zap,
  Activity,
  Code2,
  CheckCircle2,
  ShieldAlert,
  ChevronRight,
  Compass
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function About() {
  const [activeTab, setActiveTab] = useState<'rag' | 'backend' | 'vision' | 'academic'>('rag');

  const pillars = [
    {
      id: 'rag' as const,
      icon: Sparkles,
      title: 'Neural RAG & Generative AI',
      badge: 'FLAGSHIP EXPERTISE',
      summary:
        'Architecting contextual document ingestion pipelines, dense vector representations, and hallucination-free generation using Gemini API & LangChain.',
      details: [
        'Multi-format ingestion across PDFs, DOCX, and synchronized YouTube video transcripts.',
        'Sliding-window chunking algorithms preserving hierarchical document tables and semantic context.',
        'Deterministic citation mapping anchoring every AI synthesis back to exact source text.',
      ],
      metrics: { label: 'RAG Latency', value: '<450ms', stat: '94.2% Retrieval Precision' },
    },
    {
      id: 'backend' as const,
      icon: Terminal,
      title: 'High-Throughput Backends',
      badge: 'PRODUCTION SYSTEMS',
      summary:
        'Building scalable REST APIs, microservices, and real-time signaling architectures using FastAPI, Django, and WebRTC protocols.',
      details: [
        'Re-engineered SQL indexing and query execution plans at Doosra College for 60% latency reduction.',
        'Low-overhead WebRTC peer-to-peer data channels with zero media server load in VividChat.',
        'Secure API gateways with AES-GCM encryption for client LLM credentials.',
      ],
      metrics: { label: 'Query Latency Cut', value: '60%', stat: '<50ms P2P Video Ping' },
    },
    {
      id: 'vision' as const,
      icon: Cpu,
      title: 'Edge Computer Vision',
      badge: 'MODEL INFERENCE',
      summary:
        'Designing and deploying convolutional neural networks (CNNs) capable of high-frame-rate classification on resource-constrained hardware.',
      details: [
        'Trained custom PyTorch CNN with rigorous data augmentation (scaling, rotation, lighting).',
        'OpenCV Haar Cascade integration for instantaneous face localization prior to classification.',
        'Achieved 32 FPS edge inference speed with ~81% accuracy on real-time webcam streams.',
      ],
      metrics: { label: 'Inference Throughput', value: '32 FPS', stat: '~81% Model Accuracy' },
    },
    {
      id: 'academic' as const,
      icon: GraduationCap,
      title: 'Academic Excellence (MCA)',
      badge: 'GGSIPU CREDENTIAL',
      summary:
        'Master of Computer Applications (MCA) graduate from JIMS Rohini, Guru Gobind Singh Indraprastha University with 8.2 / 10 CGPA.',
      details: [
        'Deep theoretical foundation in Advanced Algorithms, Machine Learning, and Distributed Databases.',
        'BCA graduate from SGTBIMIT with 7.7 / 10 CGPA.',
        'Specialized Certification in AI & ML with Drone Tech from TiHAN, IIT Hyderabad.',
      ],
      metrics: { label: 'MCA CGPA', value: '8.2 / 10', stat: 'IIT Hyderabad Certified' },
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
          <Terminal size={12} />
          <span>ENGINEERING BACKGROUND</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          ABOUT <span className="gradient-text-cyan">ME</span>
        </h2>
        <p className="text-slate-400 font-mono text-xs sm:text-sm mt-2 max-w-2xl">
          AI Engineer and Full-Stack Developer bridging state-of-the-art machine learning models with production software engineering.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive AI Core Visual & Bio */}
        <div className="lg:col-span-5 space-y-6">
          {/* Holographic AI Core Chamber */}
          <div className="abyss-panel-glow p-7 rounded-3xl border border-cyan-500/30 relative overflow-hidden group">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Core Animated Orb Visualizer */}
            <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
              {/* Outer Pulsing Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/30 border-dashed animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-purple-500/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              <div className="absolute inset-7 rounded-full border border-teal-400/40 animate-sonar" />

              {/* Central Glowing Core */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-600 via-teal-500 to-indigo-600 p-0.5 shadow-[0_0_35px_rgba(34,211,238,0.5)]">
                <div className="w-full h-full rounded-full bg-[#02091b] flex flex-col items-center justify-center text-center p-2">
                  <Cpu size={26} className="text-cyan-300 animate-pulse" />
                  <span className="font-mono text-[9px] font-bold text-cyan-200 uppercase tracking-widest mt-1">
                    AI & ML
                  </span>
                  <span className="font-mono text-[8px] text-slate-400">ENGINEER</span>
                </div>
              </div>
            </div>

            {/* Bio Summary */}
            <div className="space-y-3 pt-2 text-center">
              <h3 className="font-display font-extrabold text-2xl text-white">
                Satyam Sakral
              </h3>
              <p className="text-cyan-300 font-mono text-xs font-semibold">
                AI / ML Engineer & Full-Stack Developer
              </p>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed text-left">
                Armed with an <span className="text-white font-medium">MCA degree (8.2 CGPA)</span> from GGSIPU, I specialize in engineering deterministic AI products. From optimizing LLM post-training workflows at <span className="text-cyan-300 font-normal">Ethara AI</span> to slashing database latency by <span className="text-cyan-300 font-normal">60%</span> at Doosra College, my work bridges model intelligence with scalable software engineering.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-2 pt-5 border-t border-white/10 mt-5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="font-display font-extrabold text-lg text-cyan-300">8.2 / 10</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">MCA Degree CGPA</div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                <div className="font-display font-extrabold text-lg text-teal-300">IIT Hyderabad</div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">AI Drone Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Core Pillars & Deep Dive */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pillar Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl abyss-panel border border-white/10">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveTab(pillar.id);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-3 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-[#01040a] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-[10px] text-center">{pillar.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Detailed Spec Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="abyss-panel p-7 sm:p-9 rounded-3xl border border-cyan-500/30 space-y-6 relative overflow-hidden"
            >
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
                    {currentPillar.badge}
                  </span>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase mt-2">
                    {currentPillar.title}
                  </h3>
                </div>

                {/* Telemetry Stat Pill */}
                <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-right">
                  <div className="font-display font-black text-xl text-cyan-300">
                    {currentPillar.metrics.value}
                  </div>
                  <div className="font-mono text-[9px] text-slate-400 uppercase">
                    {currentPillar.metrics.label}
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed">
                {currentPillar.summary}
              </p>

              {/* Technical Execution Points */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block font-bold">
                  // VERIFIED ARCHITECTURAL DETAILS
                </span>
                <div className="space-y-2.5">
                  {currentPillar.details.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-[#020b1f]/80 border border-white/5 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
                    >
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Stat Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2 text-cyan-300">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>{currentPillar.metrics.stat}</span>
                </span>
                <span className="text-[10px] uppercase text-slate-500">
                  VERIFIED REPO TELEMETRY
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
