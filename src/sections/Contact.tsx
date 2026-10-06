import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Sparkles,
  Terminal,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Phone,
  Radio
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('satyamsakral@gmail.com');
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    soundFx.playClick();

    try {
      const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nTransmission:\n${formData.message}`
      );
      window.location.href = `mailto:satyamsakral@gmail.com?subject=${subject}&body=${body}`;

      setStatus('success');
      soundFx.playSuccess();
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
    }
  };

  const socialChannels = [
    {
      label: 'LinkedIn',
      handle: 'satyam-sakral',
      url: 'https://linkedin.com/in/satyam-sakral-5553a4240/',
      icon: Linkedin,
      color: 'text-cyan-400',
    },
    {
      label: 'GitHub',
      handle: '@satyamsakral',
      url: 'https://github.com/satyamsakral',
      icon: Github,
      color: 'text-teal-400',
    },
    {
      label: 'Download Resume',
      handle: 'Satyam_Sakral_Resume.pdf',
      url: '/satyam_sakral_resume.pdf',
      icon: Download,
      color: 'text-purple-400',
      download: true,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 relative z-10 max-w-7xl mx-auto w-full flex flex-col">
      {/* Background Ascent Caustic Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      {/* Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-300 uppercase tracking-widest mb-3">
          <Radio size={12} className="animate-pulse" />
          <span>CONTACT & OPPORTUNITIES</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl text-white tracking-tight uppercase leading-[1.08]">
          LET'S BUILD <span className="gradient-text-cyan">SOMETHING INTELLIGENT.</span>
        </h2>
        <p className="text-slate-300 font-mono text-xs sm:text-base mt-3 max-w-2xl leading-relaxed font-light">
          I'm currently available for full-time AI Engineering, RAG Development, and Full-Stack Software roles. Reach out directly or send a message below.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Telemetry Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => soundFx.playHover()}
            className="abyss-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest">
                DIRECT EMAIL
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Open to full-time AI Engineer, GenAI/RAG Developer, and Full-Stack Engineering roles worldwide (Remote or Hybrid).
            </p>

            <div className="p-4 rounded-2xl bg-[#020b1f] border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail size={18} className="text-cyan-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-white truncate font-medium">
                  satyamsakral@gmail.com
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => soundFx.playHover()}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Social Channels */}
          <div className="space-y-3">
            {socialChannels.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.url}
                  download={social.download ? 'Satyam_Sakral_Resume.pdf' : undefined}
                  target={social.download ? undefined : '_blank'}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className="abyss-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${social.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase group-hover:text-cyan-300 transition-colors">
                        {social.label}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {social.handle}
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight size={15} className="text-slate-500 group-hover:text-cyan-300 transition-colors" />
                </motion.a>
              );
            })}
          </div>

          {/* Telemetry Status Pin */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 uppercase">LOCATION:</span>
              <span className="text-slate-200">Delhi, India (Open to Remote / Relocation)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 uppercase">RESPONSE TIME:</span>
              <span className="text-emerald-400">&lt; 12 Hours</span>
            </div>
          </div>
        </div>

        {/* Right Transmission Form Column */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="abyss-panel-glow p-6 sm:p-9 rounded-3xl border border-cyan-500/30 space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                <Terminal size={14} /> SEND A MESSAGE
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                DELHI, INDIA
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder-slate-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  YOUR MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your AI opportunity, project, or role..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400 focus:outline-none font-mono text-xs text-white placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                onMouseEnter={() => soundFx.playHover()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600 text-[#01040a] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send size={15} />
                <span>SEND MESSAGE</span>
              </button>

              {status === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs text-center">
                  Message initiated! Opening email client...
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>SATYAM SAKRAL · AI ENGINEER & FULL-STACK DEVELOPER</span>
        </div>
        <div>
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>
      </footer>
    </section>
  );
}
