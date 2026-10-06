import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, Terminal, Database, Code2, Layers, Zap, Info, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SkillNode {
  id: string;
  name: string;
  category: 'ai' | 'backend' | 'lang' | 'data';
  categoryLabel: string;
  x: number;
  y: number;
  connections: string[];
  projects: string[];
  level: string;
  accent: string;
}

const rawSkills: SkillNode[] = [
  // AI / ML Cluster
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 28,
    y: 28,
    connections: ['gemini', 'rag', 'chromadb', 'python', 'fastapi'],
    projects: ['Study AI 2.0', 'Document Q&A'],
    level: 'Advanced Orchestration',
    accent: '#38bdf8',
  },
  {
    id: 'gemini',
    name: 'Gemini API',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 44,
    y: 20,
    connections: ['langchain', 'rag', 'python', 'prompting'],
    projects: ['Study AI 2.0', 'AI Twin Assistant'],
    level: 'Multimodal Synthesis',
    accent: '#22d3ee',
  },
  {
    id: 'rag',
    name: 'RAG Architecture',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 36,
    y: 38,
    connections: ['langchain', 'gemini', 'chromadb', 'supabase', 'python'],
    projects: ['Study AI 2.0 Flagship'],
    level: 'Production Retrieval',
    accent: '#06b6d4',
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 20,
    y: 42,
    connections: ['langchain', 'rag', 'python'],
    projects: ['Study AI 2.0 Embeddings'],
    level: 'Vector Embeddings (768-dim)',
    accent: '#14b8a6',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 18,
    y: 18,
    connections: ['opencv', 'python', 'finetuning'],
    projects: ['FaceMask Detector CNN'],
    level: 'Deep Learning Models',
    accent: '#f97316',
  },
  {
    id: 'opencv',
    name: 'OpenCV Vision',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 10,
    y: 28,
    connections: ['pytorch', 'python'],
    projects: ['FaceMask Real-Time Stream (32 FPS)'],
    level: 'Computer Vision Pipelines',
    accent: '#10b981',
  },
  {
    id: 'prompting',
    name: 'Prompt Engineering',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 52,
    y: 32,
    connections: ['gemini', 'langchain', 'finetuning'],
    projects: ['Study AI 2.0', 'Ethara AI Intern'],
    level: 'Context Ingestion & Guardrails',
    accent: '#a855f7',
  },
  {
    id: 'finetuning',
    name: 'LLM Fine-Tuning',
    category: 'ai',
    categoryLabel: 'AI & RAG',
    x: 38,
    y: 12,
    connections: ['pytorch', 'prompting', 'python'],
    projects: ['Ethara AI (RLHF & Alignment)'],
    level: 'Post-Training Optimization',
    accent: '#c084fc',
  },

  // Backend & Systems Cluster
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 58,
    y: 45,
    connections: ['python', 'langchain', 'rest'],
    projects: ['Study AI 2.0 Gateway'],
    level: 'Async High-Throughput APIs',
    accent: '#14b8a6',
  },
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 65,
    y: 60,
    connections: ['python', 'sql', 'postgres', 'webrtc', 'rest'],
    projects: ['Doosra College Intern', 'VividChat'],
    level: 'ORM & Query Optimization (60%)',
    accent: '#10b981',
  },
  {
    id: 'webrtc',
    name: 'WebRTC Protocol',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 75,
    y: 42,
    connections: ['socketio', 'django', 'javascript'],
    projects: ['VividChat P2P (<50ms Latency)'],
    level: 'P2P Media Streaming',
    accent: '#a855f7',
  },
  {
    id: 'socketio',
    name: 'Socket.io',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 82,
    y: 54,
    connections: ['webrtc', 'django', 'javascript'],
    projects: ['VividChat Real-Time Signaling'],
    level: 'WebSocket Synchronization',
    accent: '#eab308',
  },
  {
    id: 'rest',
    name: 'RESTful APIs',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 52,
    y: 65,
    connections: ['django', 'fastapi', 'spring'],
    projects: ['Enterprise Inventory System'],
    level: 'Microservice Architectures',
    accent: '#38bdf8',
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    category: 'backend',
    categoryLabel: 'BACKEND SYSTEMS',
    x: 60,
    y: 78,
    connections: ['java', 'sql', 'rest'],
    projects: ['Distributed Enterprise Services'],
    level: 'Enterprise Backend',
    accent: '#22c55e',
  },

  // Languages Cluster
  {
    id: 'python',
    name: 'Python',
    category: 'lang',
    categoryLabel: 'LANGUAGES',
    x: 42,
    y: 50,
    connections: ['fastapi', 'django', 'pytorch', 'langchain', 'rag', 'opencv'],
    projects: ['Primary AI & Backend Language'],
    level: 'Primary Core Competency',
    accent: '#38bdf8',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'lang',
    categoryLabel: 'LANGUAGES',
    x: 48,
    y: 84,
    connections: ['spring', 'sql'],
    projects: ['OOP Software Engineering & Masterclass'],
    level: 'Enterprise Systems',
    accent: '#f59e0b',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'lang',
    categoryLabel: 'LANGUAGES',
    x: 34,
    y: 88,
    connections: ['python', 'java'],
    projects: ['Core DSA & Computer Science (MCA)'],
    level: 'High-Performance Algorithms',
    accent: '#6366f1',
  },
  {
    id: 'javascript',
    name: 'JavaScript / TS',
    category: 'lang',
    categoryLabel: 'LANGUAGES',
    x: 80,
    y: 30,
    connections: ['webrtc', 'socketio'],
    projects: ['Modern Web Interfaces & Protocols'],
    level: 'Full-Stack Integration',
    accent: '#facc15',
  },
  {
    id: 'sql',
    name: 'SQL Query Opt',
    category: 'lang',
    categoryLabel: 'LANGUAGES',
    x: 55,
    y: 72,
    connections: ['django', 'postgres', 'spring', 'java'],
    projects: ['60% Query Latency Reduction'],
    level: 'Index & Execution Optimization',
    accent: '#06b6d4',
  },

  // Data & Infrastructure Cluster
  {
    id: 'postgres',
    name: 'PostgreSQL / Supabase',
    category: 'data',
    categoryLabel: 'DATA & CLOUD',
    x: 40,
    y: 70,
    connections: ['django', 'rag', 'sql'],
    projects: ['Study AI 2.0 Vector Store', 'Doosra College'],
    level: 'Relational & pgvector Storage',
    accent: '#38bdf8',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'data',
    categoryLabel: 'DATA & CLOUD',
    x: 25,
    y: 65,
    connections: ['fastapi', 'django', 'postgres'],
    projects: ['Containerized Ingestion Pipelines'],
    level: 'Containerization & Environments',
    accent: '#0284c7',
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'data',
    categoryLabel: 'DATA & CLOUD',
    x: 18,
    y: 80,
    connections: ['docker', 'postgres'],
    projects: ['Cloud Infrastructure Deployment'],
    level: 'S3, EC2, Cloud Compute',
    accent: '#f59e0b',
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'backend' | 'lang' | 'data'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const hoveredNode = rawSkills.find((s) => s.id === hoveredNodeId) || null;

  const filteredSkills =
    selectedCategory === 'all'
      ? rawSkills
      : rawSkills.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: 'all' as const, label: 'FULL NEURAL MATRIX', count: '22' },
    { id: 'ai' as const, label: 'AI / RAG / CV', count: '08' },
    { id: 'backend' as const, label: 'BACKENDS & WEBRTC', count: '06' },
    { id: 'lang' as const, label: 'CORE LANGUAGES', count: '05' },
    { id: 'data' as const, label: 'DATA & CLOUD', count: '03' },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
            <Cpu size={12} />
            <span>SKILLS & EXPERTISE</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
            SKILLS & <span className="gradient-text-cyan">TECHNOLOGIES</span>
          </h2>
          <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Interactive network visualization of my core technologies. Hover over any skill to see connections and project usage.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl abyss-panel border border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-[#01040a] shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span className="opacity-60 text-[9px]">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Neural Network Graph Container */}
      <div className="abyss-panel-glow p-6 sm:p-10 rounded-3xl border border-cyan-500/30 relative overflow-hidden space-y-6">
        {/* Graph Canvas Visual Area */}
        <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl bg-[#020716] border border-cyan-500/20 overflow-hidden shadow-inner flex items-center justify-center">
          {/* Ambient Subsea Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* SVG Neural Synapse Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {rawSkills.map((node) => {
              return node.connections.map((targetId) => {
                const targetNode = rawSkills.find((s) => s.id === targetId);
                if (!targetNode) return null;

                const isConnectedToHovered =
                  hoveredNodeId === node.id || hoveredNodeId === targetId;

                const strokeColor = isConnectedToHovered
                  ? '#22d3ee'
                  : 'rgba(56, 189, 248, 0.12)';
                const strokeWidth = isConnectedToHovered ? 2.2 : 1;
                const strokeOpacity = isConnectedToHovered ? 1 : 0.4;

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={isConnectedToHovered ? '4 2' : 'none'}
                    className={isConnectedToHovered ? 'animate-pulse' : ''}
                  />
                );
              });
            })}
          </svg>

          {/* Render All Skill Nodes */}
          {filteredSkills.map((node) => {
            const isHovered = hoveredNodeId === node.id;
            const isConnected =
              hoveredNode &&
              (hoveredNode.connections.includes(node.id) ||
                node.connections.includes(hoveredNode.id));

            return (
              <motion.button
                key={node.id}
                onMouseEnter={() => {
                  soundFx.playHover();
                  setHoveredNodeId(node.id);
                }}
                onMouseLeave={() => setHoveredNodeId(null)}
                onClick={() => soundFx.playClick()}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  scale: isHovered ? 1.25 : isConnected ? 1.1 : 1,
                  opacity:
                    hoveredNodeId && !isHovered && !isConnected ? 0.35 : 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 350 }}
                className={`absolute px-3 py-1.5 rounded-full border text-[11px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg ${
                  isHovered
                    ? 'bg-cyan-400 text-[#01040a] border-white shadow-[0_0_25px_rgba(34,211,238,0.8)] z-30'
                    : isConnected
                    ? 'bg-cyan-950/90 text-cyan-200 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.4)] z-20'
                    : 'bg-[#03102c]/90 text-slate-300 border-white/10 hover:border-cyan-400/50 z-10'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: node.accent }}
                />
                <span className="truncate max-w-[120px]">{node.name}</span>
              </motion.button>
            );
          })}

          {/* Telemetry Inspector Card (Bottom Floating HUD) */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md pointer-events-none">
            <AnimatePresence mode="wait">
              {hoveredNode ? (
                <motion.div
                  key={hoveredNode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="abyss-panel p-4 rounded-2xl border border-cyan-500/50 shadow-2xl space-y-2 pointer-events-auto"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                      {hoveredNode.categoryLabel}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      {hoveredNode.connections.length} CONNECTIONS
                    </span>
                  </div>

                  <div className="font-display font-extrabold text-lg text-white uppercase flex items-center justify-between">
                    <span>{hoveredNode.name}</span>
                    <span className="text-xs font-mono text-cyan-300 font-semibold">
                      {hoveredNode.level}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-500 uppercase">APPLIED IN:</span>
                    <span className="text-cyan-200 truncate">
                      {hoveredNode.projects.join(' · ')}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400 backdrop-blur-md">
                  <Info size={14} className="text-cyan-400" />
                  <span>Hover any skill node to inspect connections and project applications</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
