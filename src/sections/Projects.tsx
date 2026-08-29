import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  FileText,
  Search,
  MessageSquare,
  Github,
  Camera,
  Layers,
  Activity,
  Users,
  Video,
  Lock,
  Zap,
  ExternalLink,
  Sparkles,
  Maximize2,
  X,
  CheckCircle2,
  Terminal,
  Cpu,
  Code
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Project {
  id: string;
  category: 'rag' | 'cv' | 'webrtc';
  categoryLabel: string;
  title: string;
  subtitle: string;
  tagline: string;
  github: string;
  problem: string;
  solution: string;
  challenges: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  accentColor: 'cyan' | 'purple' | 'emerald';
}

const projectsData: Project[] = [
  {
    id: 'study-ai',
    category: 'rag',
    categoryLabel: 'GEN-AI & RAG PIPELINE',
    title: 'Study AI',
    subtitle: 'Deep RAG & Contextual Synthesis Engine',
    tagline: 'Autonomous multimodal learning assistant powered by Gemini API & LangChain vector search.',
    github: 'https://github.com/satyamsakral/Study_Ai_2',
    problem:
      'Students struggle to process dense unstructured research papers, PDFs, and hours of video lectures, leading to cognitive overload and fragmented recall.',
    solution:
      'Engineered an intelligent retrieval system combining Gemini API, LangChain semantic chunking, and ChromaDB vector embeddings to deliver real-time citation-backed Q&A and dynamic curriculum generation.',
    challenges:
      'Optimized token rate limits with sliding-window chunking, preserved PDF table structures, and synchronized YouTube timestamp transcripts with semantic embeddings.',
    metrics: [
      { label: 'Query Latency', value: '<450ms' },
      { label: 'Embedding Dim', value: '768-dim' },
      { label: 'Retrieval Accuracy', value: '94.2%' },
    ],
    techStack: ['Python', 'LangChain', 'Gemini API', 'ChromaDB', 'YouTube Transcript API', 'FastAPI'],
    features: [
      'Automated personalized curriculum & study plan generation',
      'Multi-source ingestion for complex PDFs & YouTube transcripts',
      'Context-aware conversational interface with verified source citations',
    ],
    accentColor: 'cyan',
  },
  {
    id: 'facemask-detector',
    category: 'cv',
    categoryLabel: 'COMPUTER VISION LAB',
    title: 'FaceMask Detector',
    subtitle: 'Edge-Capable CNN Classifier',
    tagline: 'Real-time computer vision inference achieving ~81% precision on edge video streams.',
    github: 'https://github.com/satyamsakral/FaceMaskDetector',
    problem:
      'Manual monitoring of safety compliance in dense high-throughput facilities is inefficient, prone to human fatigue, and slow to alert administrators.',
    solution:
      'Built a convolutional neural network (CNN) trained with extensive data augmentation in PyTorch, paired with OpenCV Haar cascades for real-time video stream detection.',
    challenges:
      'Mitigating false positives in extreme lighting, handling varying camera angles, and maintaining 30+ FPS throughput on resource-constrained hardware.',
    metrics: [
      { label: 'Model Precision', value: '~81%' },
      { label: 'Inference Speed', value: '32 FPS' },
      { label: 'F1-Score', value: '0.82' },
    ],
    techStack: ['Python', 'PyTorch', 'OpenCV', 'CNN', 'NumPy', 'Data Augmentation'],
    features: [
      'Real-time webcam inference with dynamic bounding-box overlay',
      'Optimized CNN architecture with dropout regularizers',
      'Comprehensive evaluation across precision, recall, and ROC-AUC',
    ],
    accentColor: 'emerald',
  },
  {
    id: 'vvid-chat',
    category: 'webrtc',
    categoryLabel: 'REAL-TIME WEBRTC PROTOCOL',
    title: 'Vvid Chat',
    subtitle: 'Ultra Low-Latency P2P Video Hub',
    tagline: 'Direct peer-to-peer audio/video streaming with Django signaling & WebSocket orchestration.',
    github: 'https://github.com/satyamsakral/Vvid-Chat',
    problem:
      'Traditional media servers introduce severe latency and prohibitive bandwidth costs for high-definition multi-user video communications.',
    solution:
      'Architected a direct WebRTC peer-to-peer framework utilizing Django and Socket.io solely for handshake signaling, eliminating server media bottlenecks.',
    challenges:
      'Handling symmetric NAT traversal via STUN/TURN fallbacks, maintaining dynamic room state synchronicity, and managing multi-peer renegotiation.',
    metrics: [
      { label: 'P2P Latency', value: '<50ms' },
      { label: 'Media Load', value: '0 MB/s' },
      { label: 'Signaling Overhead', value: '<2KB' },
    ],
    techStack: ['Django', 'WebRTC', 'Socket.io', 'Python', 'JavaScript', 'TailwindCSS'],
    features: [
      'Direct peer-to-peer encrypted audio and video streaming',
      'Lightweight Socket.io signaling server for instant SDP handshakes',
      'Synchronized real-time chat with room state persistence',
    ],
    accentColor: 'purple',
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rag' | 'cv' | 'webrtc'>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'ALL SYSTEMS', count: '03' },
    { id: 'rag', label: 'AI & RAG', count: '01' },
    { id: 'cv', label: 'COMPUTER VISION', count: '01' },
    { id: 'webrtc', label: 'WEBRTC P2P', count: '01' },
  ];

  return (
    <section id="projects" className="py-24 px-4 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>FEATURED AI & FULL-STACK SYSTEMS</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight uppercase">
            FLAGSHIP <span className="gradient-text-cyan">PROJECTS</span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-cyber-900/90 border border-white/10 backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id as any);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[9px] opacity-70">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-12">
        {filteredProjects.map((project, idx) => {
          const isCyan = project.accentColor === 'cyan';
          const isEmerald = project.accentColor === 'emerald';
          
          const borderHoverClass = isCyan
            ? 'hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
            : isEmerald
            ? 'hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
            : 'hover:border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.15)]';
            
          const badgeClass = isCyan
            ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40'
            : isEmerald
            ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
            : 'border-purple-500/40 text-purple-400 bg-purple-950/40';

          const textAccent = isCyan
            ? 'text-cyan-400'
            : isEmerald
            ? 'text-emerald-400'
            : 'text-purple-400';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-panel p-6 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden group border border-white/10 ${borderHoverClass} transition-all duration-500`}
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-slate-500">
                    [NODE 0{idx + 1}]
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${badgeClass}`}
                  >
                    {project.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setActiveModalProject(project);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono tracking-widest text-slate-300 hover:text-white uppercase transition-all flex items-center gap-2"
                  >
                    <Maximize2 size={13} />
                    <span>DEEP DIVE SPEC</span>
                  </button>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    onClick={() => soundFx.playClick()}
                    className={`px-4 py-2 rounded-xl border text-[10px] font-mono tracking-widest uppercase transition-all flex items-center gap-2 ${
                      isCyan
                        ? 'border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : isEmerald
                        ? 'border-emerald-500/50 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'border-purple-400/50 text-purple-300 hover:bg-purple-500 hover:text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    }`}
                  >
                    <Github size={14} />
                    <span>ACCESS REPO</span>
                  </a>
                </div>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                  {project.title} <span className={textAccent}>— {project.subtitle}</span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                  {project.tagline}
                </p>
              </div>

              {/* Problem vs Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500 block">
                      // PROBLEM STATEMENT
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5 space-y-1.5">
                    <span className={`text-[9px] font-mono uppercase font-bold tracking-widest ${textAccent} block`}>
                      // ARCHITECTURAL SOLUTION
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 flex flex-col justify-between">
                  {/* Telemetry Metrics */}
                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500 block mb-3">
                      // PERFORMANCE METRICS
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                          <div className={`font-display font-bold text-sm sm:text-base ${textAccent}`}>
                            {m.value}
                          </div>
                          <div className="text-[8px] font-mono text-slate-400 uppercase tracking-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-slate-500 block mb-2.5">
                      // TECH STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dataflow Pipeline */}
              <div className="border-t border-white/10 pt-6 mt-4">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={14} className={textAccent} />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
                    System Architecture Dataflow
                  </span>
                </div>

                {project.id === 'study-ai' && (
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-cyan-500/30 text-center">
                      <FileText size={18} className="text-cyan-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">01: Ingestion</div>
                      <div className="text-[8px] font-mono text-slate-400">PDF & YT Transcripts</div>
                    </div>
                    <div className="hidden md:block text-cyan-400 font-mono">→</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-cyan-500/30 text-center">
                      <Database size={18} className="text-cyan-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">02: Embeddings</div>
                      <div className="text-[8px] font-mono text-slate-400">ChromaDB Chunks</div>
                    </div>
                    <div className="hidden md:block text-cyan-400 font-mono">→</div>

                    <div className="p-3.5 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400 text-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <Sparkles size={20} className="text-cyan-400 mx-auto mb-1 animate-spin" />
                      <div className="font-display font-extrabold text-xs uppercase text-cyan-300">GEMINI ENGINE</div>
                      <div className="text-[8px] font-mono text-white">RAG Synthesis</div>
                    </div>
                    <div className="hidden md:block text-cyan-400 font-mono">→</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-cyan-500/30 text-center">
                      <Search size={18} className="text-cyan-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">03: Context Fetch</div>
                      <div className="text-[8px] font-mono text-slate-400">Top-k Similarity</div>
                    </div>
                    <div className="hidden md:block text-cyan-400 font-mono">→</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-cyan-500/30 text-center">
                      <MessageSquare size={18} className="text-cyan-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">04: Citation Q&A</div>
                      <div className="text-[8px] font-mono text-slate-400">Verified Answers</div>
                    </div>
                  </div>
                )}

                {project.id === 'facemask-detector' && (
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-emerald-500/30 text-center">
                      <Camera size={18} className="text-emerald-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">01: Video Frame</div>
                      <div className="text-[8px] font-mono text-slate-400">OpenCV Camera</div>
                    </div>
                    <div className="hidden md:block text-emerald-400 font-mono">→</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-emerald-500/30 text-center">
                      <Activity size={18} className="text-emerald-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">02: Face Detect</div>
                      <div className="text-[8px] font-mono text-slate-400">Haar Cascade ROI</div>
                    </div>
                    <div className="hidden md:block text-emerald-400 font-mono">→</div>

                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-400 text-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Layers size={20} className="text-emerald-400 mx-auto mb-1 animate-pulse" />
                      <div className="font-display font-extrabold text-xs uppercase text-emerald-300">PYTORCH CNN</div>
                      <div className="text-[8px] font-mono text-white">Softmax Classification</div>
                    </div>
                    <div className="hidden md:block text-emerald-400 font-mono">→</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-emerald-500/30 text-center">
                      <Lock size={18} className="text-emerald-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">03: Safety Alert</div>
                      <div className="text-[8px] font-mono text-slate-400">Real-Time Overlay</div>
                    </div>
                  </div>
                )}

                {project.id === 'vvid-chat' && (
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-purple-500/30 text-center">
                      <Users size={18} className="text-purple-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">Peer Client A</div>
                      <div className="text-[8px] font-mono text-slate-400">WebRTC MediaStream</div>
                    </div>
                    <div className="hidden md:block text-purple-400 font-mono">↔</div>

                    <div className="p-3.5 rounded-2xl bg-purple-500/10 border-2 border-purple-400 text-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      <Zap size={20} className="text-purple-400 mx-auto mb-1 animate-bounce" />
                      <div className="font-display font-extrabold text-xs uppercase text-purple-300">SOCKET.IO SIGNAL</div>
                      <div className="text-[8px] font-mono text-white">SDP Offer / Answer</div>
                    </div>
                    <div className="hidden md:block text-purple-400 font-mono">↔</div>

                    <div className="flex-1 min-w-[110px] p-3 rounded-xl bg-cyber-950/80 border border-purple-500/30 text-center">
                      <Video size={18} className="text-purple-400 mx-auto mb-1.5" />
                      <div className="font-mono text-[10px] uppercase font-bold text-white">P2P Stream</div>
                      <div className="text-[8px] font-mono text-slate-400">Zero Server Delay</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deep-Dive Project Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 md:p-10 border border-cyan-500/40 relative shadow-[0_0_60px_rgba(0,0,0,0.9)] rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveModalProject(null);
                }}
                onMouseEnter={() => soundFx.playHover()}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                    // DEEP ARCHITECTURE SPECIFICATION
                  </span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white uppercase">
                    {activeModalProject.title}
                  </h3>
                  <p className="text-slate-400 font-mono text-xs mt-1">
                    {activeModalProject.subtitle}
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  {activeModalProject.metrics.map((m, i) => (
                    <div key={i} className="p-4 rounded-xl bg-cyber-900/80 border border-white/10 text-center">
                      <div className="font-display font-bold text-xl text-cyan-400">{m.value}</div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5">
                    <h4 className="font-mono font-bold text-xs uppercase text-cyan-400 mb-2">
                      Key System Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {activeModalProject.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyber-900/60 border border-white/5">
                    <h4 className="font-mono font-bold text-xs uppercase text-purple-400 mb-2">
                      Engineering Challenges Overcome
                    </h4>
                    <p>{activeModalProject.challenges}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={activeModalProject.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundFx.playHover()}
                    onClick={() => soundFx.playClick()}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
                  >
                    <Github size={16} />
                    <span>VIEW GITHUB SOURCE</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
