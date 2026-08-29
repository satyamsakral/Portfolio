import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Sparkles, Terminal, Code, Cpu, Database, ChevronRight, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Journey() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<'all' | 'ai' | 'backend' | 'infra'>('all');

  const experienceItems = [
    {
      period: '2026',
      role: 'LLM Trainer Intern',
      org: 'Ethara AI',
      badge: 'PROD AI TRAINING',
      desc: [
        'Spearheaded training and post-training optimization for large-scale language models, enhancing contextual reasoning and response precision.',
        'Curated and structured high-quality synthetic & domain datasets, reducing bias and eliminating hallucinations in production environments.',
      ],
      tags: ['LLM Training', 'Prompt Tuning', 'Data Curation', 'Hallucination Mitigation'],
      accent: 'cyan',
    },
    {
      period: '2023',
      role: 'Django Developer Intern',
      org: 'Doosra College',
      badge: 'BACKEND & DATABASE',
      desc: [
        'Engineered an enterprise Inventory Management System utilizing Django and relational SQL architecture.',
        'Optimized SQL queries and database indexing strategies, accelerating query retrieval times by 60%.',
      ],
      tags: ['Django', 'Python', 'SQL Optimization', 'REST APIs'],
      accent: 'purple',
    },
  ];

  const educationItems = [
    {
      period: '2024 — 2026',
      degree: 'Master of Computer Applications (MCA)',
      institution: 'GGSIPU (JIMS)',
      grade: 'CGPA: 8.2 / 10',
      focus: 'Advanced Machine Learning, Distributed Systems, Cloud Architecture, and Neural Networks.',
    },
    {
      period: '2021 — 2024',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'GGSIPU (SGTBIMIT)',
      grade: 'CGPA: 7.7 / 10',
      focus: 'Core Computer Science, Data Structures & Algorithms, Object-Oriented Design, and Full-Stack Engineering.',
    },
  ];

  const skillCategories = [
    { id: 'all', label: 'FULL MATRIX' },
    { id: 'ai', label: 'AI / RAG / ML' },
    { id: 'backend', label: 'BACKEND & APIS' },
    { id: 'infra', label: 'DATA & CLOUD' },
  ];

  const skillsData = [
    { name: 'LangChain & RAG', cat: 'ai' },
    { name: 'Gemini API', cat: 'ai' },
    { name: 'PyTorch & CNN', cat: 'ai' },
    { name: 'OpenCV Vision', cat: 'ai' },
    { name: 'Prompt Engineering', cat: 'ai' },
    { name: 'LLM Fine-Tuning', cat: 'ai' },
    { name: 'Python', cat: 'backend' },
    { name: 'Django / FastAPI', cat: 'backend' },
    { name: 'React & TypeScript', cat: 'backend' },
    { name: 'Java & C++', cat: 'backend' },
    { name: 'WebRTC & Socket.io', cat: 'backend' },
    { name: 'MySQL & PostgreSQL', cat: 'infra' },
    { name: 'ChromaDB Vector DB', cat: 'infra' },
    { name: 'AWS & Cloud Services', cat: 'infra' },
  ];

  const filteredSkills =
    activeSkillCategory === 'all'
      ? skillsData
      : skillsData.filter((s) => s.cat === activeSkillCategory);

  return (
    <section id="journey" className="py-24 px-4 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
          <Sparkles size={12} />
          <span>CHRONOLOGICAL TRACK RECORD</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight uppercase">
          CAREER & <span className="gradient-text-cyan">EDUCATION</span>
        </h2>
      </div>

      {/* Grid for Experience & Education */}
      <div className="grid lg:grid-cols-12 gap-12 mb-20">
        {/* Experience Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Briefcase size={18} />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Work Experience
            </h3>
          </div>

          <div className="space-y-6 relative border-l-2 border-white/10 pl-6 ml-4">
            {experienceItems.map((exp, i) => {
              const isCyan = exp.accent === 'cyan';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => soundFx.playHover()}
                  className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all relative group shadow-lg"
                >
                  {/* Timeline node dot */}
                  <span
                    className={`absolute -left-[31px] top-7 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
                      isCyan
                        ? 'bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                        : 'bg-purple-500 shadow-[0_0_12px_#a855f7]'
                    }`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                      {exp.period}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-slate-300 uppercase">
                      {exp.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-extrabold text-xl text-white uppercase mb-1">
                    {exp.role}
                  </h4>
                  <div className="text-xs font-mono text-cyan-300 mb-4">
                    @ {exp.org}
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {exp.desc.map((bullet, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-cyber-900/60 border border-white/10 font-mono text-[10px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <GraduationCap size={18} />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Academic Degree
            </h3>
          </div>

          <div className="space-y-6">
            {educationItems.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    {edu.period}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 font-mono text-[9px] text-purple-300 font-bold">
                    {edu.grade}
                  </span>
                </div>

                <h4 className="font-display font-extrabold text-lg text-white uppercase mb-1">
                  {edu.degree}
                </h4>
                <div className="text-xs font-mono text-slate-400 mb-3">
                  {edu.institution}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {edu.focus}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Matrix & Certifications */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Skills Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                // TECHNICAL MATRIX
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase">
                Skills & Proficiency
              </h3>
            </div>

            {/* Sub-Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-cyber-900/80 border border-white/10">
              {skillCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveSkillCategory(c.id as any);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3 py-1 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all ${
                    activeSkillCategory === c.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {filteredSkills.map((skill, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHover()}
                className="px-4 py-2 rounded-xl bg-cyber-900/60 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all flex items-center group"
              >
                <span className="font-mono text-xs text-white font-medium group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Award size={18} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                VERIFIED CREDENTIALS
              </span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase mb-6">
              Certifications
            </h3>

            <div className="space-y-4">
              <div
                onMouseEnter={() => soundFx.playHover()}
                className="p-4 rounded-2xl bg-cyber-900/60 border border-white/10 hover:border-emerald-400/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    TiHAN, IIT HYDERABAD
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">2024</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  AI & Machine Learning with Drone Technology
                </h4>
              </div>

              <div
                onMouseEnter={() => soundFx.playHover()}
                className="p-4 rounded-2xl bg-cyber-900/60 border border-white/10 hover:border-cyan-400/50 transition-all group"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                    UDEMY
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">2023</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  Java Programming Masterclass
                </h4>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase">
            <span>Verified Industry Certificates</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 size={12} /> Active Status
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
