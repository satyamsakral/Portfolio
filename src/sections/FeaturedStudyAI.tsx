import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Layers,
  Database,
  Search,
  Cpu,
  CheckCircle2,
  Github,
  Play,
  RotateCcw,
  Zap,
  Youtube,
  FileCode,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Bot
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const pipelineStages = [
  {
    step: '01',
    name: 'Document & Video Ingestion',
    tech: 'LangChain + PyPDF + YouTube Transcript API',
    desc: 'Extracts dense unstructured text from research PDFs, DOCX, PPTX presentations, and timestamped YouTube lecture transcripts.',
    icon: FileText,
    accent: '#38bdf8',
    payload: {
      type: 'Raw Input Stream',
      sources: ['neural_networks_deep_dive.pdf', 'youtube.com/watch?v=lecture_04'],
      charCount: '148,290 characters extracted',
    },
  },
  {
    step: '02',
    name: 'Sliding-Window Semantic Chunking',
    tech: 'LangChain RecursiveCharacterTextSplitter',
    desc: 'Segments parsed text into 500-token semantic chunks with 100-token sliding overlap to preserve boundary context and equation tables.',
    icon: Layers,
    accent: '#22d3ee',
    payload: {
      chunkSize: '500 tokens',
      overlap: '100 tokens',
      totalChunks: '342 semantic vectors generated',
    },
  },
  {
    step: '03',
    name: '768-Dim Vector Embeddings',
    tech: 'Dense Semantic Vector Generator',
    desc: 'Transforms text chunks into high-dimensional geometric coordinates capturing contextual nuance and cross-domain semantic meaning.',
    icon: Zap,
    accent: '#14b8a6',
    payload: {
      dimension: '768-dimensional float32',
      tensorSample: '[0.0421, -0.1983, 0.0074, 0.3129, ...]',
      norm: 'L2 Normalized Vectors',
    },
  },
  {
    step: '04',
    name: 'Vector Search & Cosine Similarity',
    tech: 'ChromaDB / Supabase pgvector',
    desc: 'Performs sub-millisecond nearest-neighbor search across indexed vector space to retrieve Top-K (K=5) relevant context nodes.',
    icon: Database,
    accent: '#8b5cf6',
    payload: {
      metric: 'Cosine Distance',
      topKMatches: 5,
      retrievalLatency: '18ms nearest-neighbor resolution',
    },
  },
  {
    step: '05',
    name: 'Gemini API Contextual Reasoning',
    tech: 'Google Gemini 1.5 Flash / Pro',
    desc: 'Injects retrieved document context into prompt instructions, evaluating queries with strict hallucination-mitigation guardrails.',
    icon: Cpu,
    accent: '#a855f7',
    payload: {
      model: 'gemini-1.5-flash',
      grounding: 'Strict Citation Enforcement',
      reasoningChain: 'Multi-turn COT with source anchors',
    },
  },
  {
    step: '06',
    name: 'Verified Output & Study Plan',
    tech: 'Autonomous Curriculum & Citation Engine',
    desc: 'Delivers synthesized answers with exact page citations and generates dynamic, difficulty-adjusted adaptive study schedules.',
    icon: CheckCircle2,
    accent: '#10b981',
    payload: {
      response: 'Citation verified: [Source: PDF pg. 42 & Lecture 12:45]',
      curriculum: 'Generated 4-Week Adaptive Learning Track',
      accuracy: '94.2% verified precision',
    },
  },
];

export default function FeaturedStudyAI() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectStage = (index: number) => {
    soundFx.playClick();
    setActiveStageIndex(index);
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    soundFx.playBoot();
    setActiveStageIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < pipelineStages.length) {
        setActiveStageIndex(current);
        soundFx.playBeep(440 + current * 110, 0.05);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        soundFx.playSuccess();
      }
    }, 1100);
  };

  const currentStage = pipelineStages[activeStageIndex];
  const StageIcon = currentStage.icon;

  return (
    <section id="flagship" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
          <Sparkles size={12} />
          <span>FLAGSHIP PROJECT</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          STUDY AI 2.0 <span className="gradient-text-cyan">— RAG PLATFORM</span>
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
          Autonomous multimodal learning assistant powered by Gemini API, LangChain semantic chunking, and ChromaDB vector search.
        </p>
      </div>

      {/* Main Flagship Showcase Container */}
      <div className="abyss-panel-glow p-6 sm:p-10 rounded-3xl border border-cyan-500/40 relative overflow-hidden space-y-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        {/* Top Product Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
            <div>
              <div className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase">
                Study AI 2.0 Architecture
              </div>
              <div className="font-mono text-xs text-cyan-300">
                Deep Multimodal RAG & Autonomous Study Engine
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              onMouseEnter={() => soundFx.playHover()}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <Zap size={14} className="animate-spin text-cyan-300" />
                  <span>EXECUTING RAG...</span>
                </>
              ) : (
                <>
                  <Play size={14} className="text-cyan-300" />
                  <span>SIMULATE DATAFLOW</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/satyamsakral/Study_Ai_2"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Github size={14} />
              <span>ACCESS REPO</span>
            </a>
          </div>
        </div>

        {/* Real Product Highlights Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-abyss-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase font-bold">
              <Cpu size={14} /> Multi-Provider AI Gateway
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Unified gateway supporting Gemini, Anthropic, OpenAI, Groq, and OpenRouter with AES-GCM encrypted client API key management.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-abyss-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-mono text-xs uppercase font-bold">
              <Youtube size={14} /> Multimodal Ingestion
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Parses dense research papers (PDFs), presentation slides, and synchronized YouTube lecture video transcripts with timestamp anchors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-abyss-900/80 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs uppercase font-bold">
              <Bot size={14} /> Adaptive Planner & Chat
            </div>
            <p className="text-xs text-slate-300 font-light leading-relaxed">
              Custom scheduling algorithms generate personalized study plans based on learner velocity and topic difficulty with verified citations.
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* INTERACTIVE RAG PIPELINE VISUALIZATION (THE SHOWSTOPPER) */}
        {/* -------------------------------------------------------- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
              <Layers size={14} className="text-cyan-400" />
              <span>Interactive RAG Pipeline Stages (Click or Simulate)</span>
            </div>
            <span className="font-mono text-xs text-cyan-400">
              STAGE {currentStage.step} OF 06
            </span>
          </div>

          {/* Stepper Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {pipelineStages.map((stage, idx) => {
              const Icon = stage.icon;
              const isCurrent = activeStageIndex === idx;
              const isPassed = activeStageIndex > idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => handleSelectStage(idx)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                      : isPassed
                      ? 'bg-white/5 border-cyan-500/30 text-slate-300'
                      : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold">
                      {stage.step}
                    </span>
                    <Icon
                      size={16}
                      className={isCurrent ? 'text-cyan-300 animate-pulse' : isPassed ? 'text-teal-400' : 'text-slate-500'}
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-xs text-white leading-tight line-clamp-2">
                      {stage.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Telemetry Inspector */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#020b1f] border border-cyan-500/30 grid md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Stage Overview */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
                  STAGE {currentStage.step} · {currentStage.tech}
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  {currentStage.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-light">
                  {currentStage.desc}
                </p>

                <div className="flex items-center gap-3 pt-2 font-mono text-xs text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Pipeline Stage Active</span>
                </div>
              </div>

              {/* Right Stage Payload HUD */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-black/60 border border-white/10 font-mono space-y-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-2">
                  <span>TELEMETRY PAYLOAD</span>
                  <span className="text-cyan-400">STATUS: OK</span>
                </div>

                <div className="space-y-2 text-xs">
                  {Object.entries(currentStage.payload).map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{k}:</span>
                      <span className="text-slate-200 bg-white/5 p-1.5 rounded-lg border border-white/5 break-all">
                        {Array.isArray(v) ? v.join(', ') : String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Verified Telemetry Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-cyan-300">
              &lt;450ms
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">
              End-to-End Query Latency
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-teal-300">
              94.2%
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">
              Retrieval Accuracy
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-purple-300">
              768-dim
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">
              Vector Embedding Space
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-300">
              100%
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">
              Verified Source Citations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
