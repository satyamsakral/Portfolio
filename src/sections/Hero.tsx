import { motion } from 'framer-motion';
import { Cpu, Terminal, ArrowRight, Download, Sparkles, Database, Layers, Code } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 px-6 md:px-12 flex flex-col justify-center max-w-7xl mx-auto z-10">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Hero Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for AI & Software Roles
          </motion.div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-none">
              Satyam <span className="gradient-text-cyan">Sakral</span>
            </h1>
            <p className="text-xl sm:text-2xl font-mono text-cyan-400/90 font-medium tracking-tight pt-1 flex items-center gap-2">
              <Cpu size={24} className="text-cyan-400 animate-spin-slow" />
              AI Engineer & Full-Stack Developer
            </p>
          </div>

          {/* Bio Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
            Architecting intelligent applications powered by <span className="text-cyan-300 font-normal">Generative AI</span>, <span className="text-purple-300 font-normal">Retrieval-Augmented Generation (RAG)</span>, and scalable modern web stacks. Transforming complex neural research into seamless interactive experiences.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all"
            >
              Explore Projects <ArrowRight size={16} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => soundFx.playHover()}
              onClick={() => soundFx.playClick()}
              href="/satyam_sakral_resume.pdf"
              download="Satyam_Sakral_Resume.pdf"
              className="px-7 py-3.5 rounded-full bg-cyber-900/90 border border-slate-700/80 hover:border-cyan-400/60 text-slate-200 hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]"
            >
              Resume <Download size={15} />
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Hero Bento Card Widget */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="lg:col-span-5 grid grid-cols-2 gap-4"
        >
          {/* Card 1: RAG & GenAI Stack */}
          <div className="col-span-2 glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
              <Terminal size={14} /> Core Expertise
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Generative AI & RAG</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Designing contextual document ingestion, vector embeddings, Gemini LLM integrations, and LangChain orchestration.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['Gemini API', 'LangChain', 'Vector Search', 'Python', 'React', 'Three.js'].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Production Projects Stat */}
          <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-400">
              <Layers size={18} />
              <span className="text-[10px] font-mono uppercase text-purple-400/80">Built</span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-display font-extrabold text-white">03</div>
              <div className="text-[11px] text-slate-400 font-medium">Flagship Systems</div>
            </div>
            <div className="text-[10px] font-mono text-purple-300/70">RAG, Vision & WebRTC</div>
          </div>

          {/* Card 3: Interactive Twin Access */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400">
              <Cpu size={18} />
              <span className="text-[10px] font-mono uppercase text-emerald-400/80">Interactive</span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-display font-extrabold text-white">AI Twin</div>
              <div className="text-[11px] text-slate-400 font-medium">Chatbot Assistant</div>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Floating HUD
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
