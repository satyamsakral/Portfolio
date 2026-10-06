import { motion } from 'framer-motion';
import { GraduationCap, Award, CheckCircle2, Sparkles, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

const educationData = [
  {
    period: '2024 — 2026',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Guru Gobind Singh Indraprastha University (JIMS Rohini)',
    grade: 'CGPA: 8.2 / 10',
    status: 'Graduated: Jun 2026',
    focus: 'Advanced Machine Learning, Distributed Systems, Cloud Architecture, Algorithm Optimization, and Neural Networks.',
    badge: 'POST-GRADUATE DEGREE',
    accent: 'cyan',
  },
  {
    period: '2021 — 2024',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Guru Gobind Singh Indraprastha University (SGTBIMIT)',
    grade: 'CGPA: 7.7 / 10',
    status: 'Graduated: Jun 2024',
    focus: 'Data Structures & Algorithms, Object-Oriented Software Design, Relational Database Engineering, and Full-Stack Web Development.',
    badge: 'UNDERGRADUATE DEGREE',
    accent: 'purple',
  },
];

const certifications = [
  {
    title: 'AI & Machine Learning with Drone Technology',
    issuer: 'TiHAN, IIT Hyderabad',
    year: '2024',
    desc: 'Specialized applied engineering program in autonomous navigation, computer vision, and edge neural inference.',
  },
  {
    title: 'Java Programming Masterclass',
    issuer: 'Udemy Certified',
    year: '2023',
    desc: 'Comprehensive object-oriented software architecture, concurrency, multithreading, and enterprise design patterns.',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
          <GraduationCap size={12} />
          <span>VERIFIED ACADEMIC DOSSIER</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          EDUCATION & <span className="gradient-text-cyan">CREDENTIALS</span>
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
          Post-graduate foundation in Computer Applications paired with elite IIT certification in applied AI.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Degrees Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
            <BookOpen size={14} /> // University Degrees
          </div>

          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => soundFx.playHover()}
                className="abyss-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase font-bold">
                    {edu.badge}
                  </span>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs font-bold text-white">
                    {edu.grade}
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                    {edu.degree}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
                    {edu.institution}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                    {edu.period} · {edu.status}
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed pt-1">
                  <span className="text-slate-500 font-mono uppercase text-[10px] block font-bold mb-1">
                    // FOCUS CURRICULUM:
                  </span>
                  {edu.focus}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
            <Award size={14} /> // Verified Certifications
          </div>

          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onMouseEnter={() => soundFx.playHover()}
                className="abyss-panel p-6 rounded-3xl border border-purple-500/20 hover:border-purple-400/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 font-mono text-[9px] text-purple-300 uppercase font-bold">
                    VERIFIED CREDENTIAL
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    {cert.year}
                  </span>
                </div>

                <h4 className="font-display font-black text-lg text-white uppercase">
                  {cert.title}
                </h4>
                <div className="text-xs font-mono text-teal-300 font-semibold">
                  {cert.issuer}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {cert.desc}
                </p>
              </motion.div>
            ))}

            {/* Quick GGSIPU Summary Seal */}
            <div className="p-5 rounded-3xl bg-[#020b1f] border border-cyan-500/30 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white uppercase">
                  Academic Verification
                </div>
                <div className="font-mono text-[11px] text-slate-400">
                  Guru Gobind Singh Indraprastha University, Delhi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
