import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Terminal, Sparkles, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

const experienceList = [
  {
    period: 'APR 2026 — JUN 2026',
    role: 'LLM Trainer Intern',
    org: 'Ethara AI',
    badge: 'PRODUCTION AI TRAINING',
    accent: 'cyan',
    desc: [
      'Assisted in post-training optimization, RLHF alignment, and evaluation workflows for large language models to maximize coherence.',
      'Constructed data pipelines to clean, filter, and deduplicate multimodal datasets, reducing dataset noise and model hallucination rates.',
      'Contributed to evaluation benchmarks and feedback loops within core Flux AI framework pipelines.',
    ],
    tags: ['LLM Training', 'RLHF Alignment', 'Dataset Engineering', 'Flux AI', 'Hallucination Mitigation'],
    stat: 'LLM Alignment & Eval',
  },
  {
    period: 'JUL 2023 — SEP 2023',
    role: 'Django Developer Intern',
    org: 'Doosra College',
    badge: 'BACKEND & DATABASE OPT',
    accent: 'purple',
    desc: [
      'Engineered a centralized departmental Inventory Management System utilizing Django REST framework and SQL architecture.',
      'Re-engineered complex SQL queries and database indexing strategies, achieving a verified 60% reduction in data retrieval latency.',
      'Collaborated with cross-functional teams to integrate interactive data visualization dashboards into the operational pipeline.',
    ],
    tags: ['Django', 'Python', 'SQL Optimization', 'Database Indexing', 'REST APIs'],
    stat: '60% Query Latency Cut',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
          <Briefcase size={12} />
          <span>PRODUCTION WORK RECORD</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          ENGINEERING <span className="gradient-text-cyan">EXPERIENCE</span>
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Chronological record of hands-on model training, dataset engineering, and backend database optimization.
        </p>
      </div>

      {/* Animated Deep-Sea Cable Timeline */}
      <div className="relative border-l-2 border-cyan-500/30 pl-6 sm:pl-10 ml-3 sm:ml-6 space-y-12">
        {experienceList.map((exp, idx) => {
          const isCyan = exp.accent === 'cyan';
          return (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={() => soundFx.playHover()}
              className="abyss-panel p-6 sm:p-9 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all relative group shadow-xl"
            >
              {/* Timeline Beacon Node Dot */}
              <span
                className={`absolute -left-[35px] sm:-left-[51px] top-8 w-4 h-4 rounded-full border-2 border-[#01040a] ${
                  isCyan
                    ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]'
                    : 'bg-purple-500 shadow-[0_0_15px_#a855f7]'
                }`}
              />

              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                  {exp.period}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300 uppercase">
                    {exp.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 font-mono text-[10px] text-cyan-300 font-bold uppercase">
                    {exp.stat}
                  </span>
                </div>
              </div>

              {/* Role & Org */}
              <div className="mb-4">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  {exp.role}
                </h3>
                <div className="text-sm font-mono text-cyan-400 font-semibold mt-0.5">
                  @ {exp.org}
                </div>
              </div>

              {/* Bullet Deliverables */}
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                {exp.desc.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5">
                    <ChevronRight size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 font-mono text-[10px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
