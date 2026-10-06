import { motion } from 'framer-motion';
import { Cpu, Terminal, ArrowRight, Download, Sparkles, Database, Layers, Radio, Shield, Compass, ChevronDown } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-32 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10">
      {/* Background Radial Light Shafts */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[350px] bg-indigo-600/12 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Hero Brand & Statement */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-7"
        >
          {/* Subsea Facility Telemetry Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full abyss-panel border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-slate-400">FACILITY SECTOR 07</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-300 font-semibold">AI SYSTEMS ONLINE</span>
          </motion.div>

          {/* Main Name & Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[1.05]">
              SATYAM <span className="gradient-text-cyan">SAKRAL</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-mono text-cyan-300/90 font-medium tracking-tight flex items-center gap-2.5 pt-1">
              <Cpu size={24} className="text-cyan-400 animate-spin-slow shrink-0" />
              <span>AI Engineer · Full-Stack Developer</span>
            </p>
          </div>

          {/* Main Tagline */}
          <blockquote className="border-l-2 border-cyan-400/60 pl-4 py-1">
            <p className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">
              "Building intelligent systems that turn ideas into products."
            </p>
          </blockquote>

          {/* Core Elevator Pitch */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light">
            Deep-sea neural systems architect specializing in <span className="text-cyan-300 font-medium">Generative AI</span>, production <span className="text-cyan-300 font-medium">RAG Pipelines</span>, and distributed full-stack engineering. Transforming complex model research into deterministic, high-throughput applications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              href="#flagship"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600 text-[#01040a] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] transition-all cursor-pointer"
            >
              Study AI 2.0 Spec <ArrowRight size={16} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              href="#projects"
              className="px-6 py-3.5 rounded-full abyss-panel border border-cyan-500/30 hover:border-cyan-400/60 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              All Projects <Layers size={15} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              href="/satyam_sakral_resume.pdf"
              download="Satyam_Sakral_Resume.pdf"
              className="px-6 py-3.5 rounded-full abyss-panel border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-200 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              Resume <Download size={15} />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Hero Bento Lab HUD */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
        >
          {/* Card 1: Core Research Lab */}
          <div className="col-span-2 abyss-panel-glow p-6 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={90} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Terminal size={14} /> // Core Specialization
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mb-2">
              Neural RAG & Generative AI
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
              Designing contextual multi-source document ingestion, 768-dim vector embeddings, Gemini LLM orchestrations, and deterministic citation backings.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Gemini API', 'LangChain', 'ChromaDB', 'FastAPI', 'PyTorch', 'WebRTC'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Production Experience Metric */}
          <div className="abyss-panel p-5 rounded-3xl border border-purple-500/25 hover:border-purple-400/50 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-400">
              <Layers size={18} />
              <span className="text-[10px] font-mono uppercase text-purple-300/80">Track Record</span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-display font-black text-white">60%</div>
              <div className="text-[11px] text-slate-300 font-medium">Query Latency Cut</div>
            </div>
            <div className="text-[10px] font-mono text-purple-300/80">Doosra College SQL Opt</div>
          </div>

          {/* Card 3: Deep AI Twin Telemetry */}
          <div className="abyss-panel p-5 rounded-3xl border border-emerald-500/25 hover:border-emerald-400/50 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400">
              <Cpu size={18} />
              <span className="text-[10px] font-mono uppercase text-emerald-300/80">Interactive</span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-display font-black text-white">AI Twin</div>
              <div className="text-[11px] text-slate-300 font-medium">Chat Assistant</div>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gemini 1.5 Flash</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pt-16 pb-4 flex flex-col items-center justify-center text-slate-500 text-xs font-mono tracking-widest uppercase gap-2"
      >
        <span>DESCEND INTO RESEARCH SECTOR</span>
        <ChevronDown size={16} className="animate-bounce text-cyan-400" />
      </motion.div>
    </section>
  );
}
