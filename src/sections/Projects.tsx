import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Maximize2,
  ExternalLink,
  Sparkles,
  Camera,
  Video,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
  X,
  Zap,
  Activity,
  ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Project {
  id: string;
  category: 'cv' | 'webrtc' | 'rag';
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
  schematicType: 'vision' | 'webrtc';
}

const projectsData: Project[] = [
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
    schematicType: 'vision',
  },
  {
    id: 'vvid-chat',
    category: 'webrtc',
    categoryLabel: 'REAL-TIME WEBRTC PROTOCOL',
    title: 'VividChat',
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
    schematicType: 'webrtc',
  },
];

// 3D Tilt Project Card Component
function TiltCard({
  project,
  onOpenModal,
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -9;
    const rotY = ((x - centerX) / centerX) * 9;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isEmerald = project.accentColor === 'emerald';
  const accentColorClass = isEmerald ? 'text-emerald-400' : 'text-purple-400';
  const badgeBorder = isEmerald ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60' : 'border-purple-500/40 text-purple-300 bg-purple-950/60';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="SPEC"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="abyss-panel-interactive p-6 sm:p-9 rounded-3xl relative overflow-hidden group border border-white/10 hover:border-cyan-400/50 flex flex-col justify-between"
    >
      {/* Glare Reflection Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(34, 211, 238, 0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${badgeBorder}`}>
          {project.categoryLabel}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenModal(project);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Deep Dive Spec"
          >
            <Maximize2 size={15} />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playClick()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Access Repo"
          >
            <Github size={15} />
          </a>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="mb-6 relative z-10">
        <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-1">
          {project.title}
        </h3>
        <p className={`font-mono text-xs uppercase tracking-wider ${accentColorClass} mb-3 font-semibold`}>
          {project.subtitle}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Architecture Schematics Simulation */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6 relative z-10 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>PIPELINE SCHEMATIC</span>
          <span className="text-cyan-400 font-bold">VERIFIED</span>
        </div>
        {project.schematicType === 'vision' ? (
          <div className="flex items-center justify-between gap-2 text-center text-[10px] font-mono pt-1">
            <span className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex-1">
              Webcam Feed
            </span>
            <span className="text-slate-600">→</span>
            <span className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex-1">
              Haar Cascades
            </span>
            <span className="text-slate-600">→</span>
            <span className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex-1">
              PyTorch CNN (32 FPS)
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 text-center text-[10px] font-mono pt-1">
            <span className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 flex-1">
              Django Signaling
            </span>
            <span className="text-slate-600">→</span>
            <span className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 flex-1">
              Socket.io SDP
            </span>
            <span className="text-slate-600">→</span>
            <span className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 flex-1">
              P2P WebRTC (&lt;50ms)
            </span>
          </div>
        )}
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6 relative z-10 text-center">
        {project.metrics.map((m, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className={`font-display font-bold text-sm sm:text-base ${accentColorClass}`}>
              {m.value}
            </div>
            <div className="text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 relative z-10 pt-4 border-t border-white/10">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>MORE PROJECTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            FEATURED <span className="gradient-text-cyan">PROJECTS</span>
          </h2>
          <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Real-time computer vision edge classifier and low-latency P2P video streaming systems.
          </p>
        </div>
      </div>

      {/* 3D Tilt Project Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <TiltCard
            key={project.id}
            project={project}
            onOpenModal={(p) => setActiveModalProject(p)}
          />
        ))}
      </div>

      {/* Deep Dive Specification Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="abyss-panel-glow p-6 sm:p-9 rounded-3xl border border-cyan-500/50 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 relative shadow-[0_0_60px_rgba(0,0,0,0.9)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border border-cyan-500/40 text-cyan-300 bg-cyan-950/70">
                  {activeModalProject.categoryLabel}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  {activeModalProject.title} — {activeModalProject.subtitle}
                </h3>
              </div>

              {/* Problem / Solution */}
              <div className="space-y-4 text-xs sm:text-sm font-light">
                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                    // PROBLEM STATEMENT
                  </span>
                  <p className="text-slate-300 leading-relaxed">{activeModalProject.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block">
                    // ARCHITECTURAL SOLUTION
                  </span>
                  <p className="text-slate-300 leading-relaxed">{activeModalProject.solution}</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-purple-400 block">
                    // ENGINEERING CHALLENGES OVERCOME
                  </span>
                  <p className="text-slate-300 leading-relaxed">{activeModalProject.challenges}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block font-bold">
                  // KEY SYSTEM DELIVERABLES
                </span>
                {activeModalProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 uppercase">
                  SOURCE REPOSITORY VERIFIED
                </span>
                <a
                  href={activeModalProject.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-[#01040a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-cyan-400 transition-all cursor-pointer"
                >
                  <Github size={14} />
                  <span>VIEW ON GITHUB</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
