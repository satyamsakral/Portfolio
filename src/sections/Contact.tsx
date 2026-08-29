import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Copy, Check, Send, Sparkles, Terminal, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
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
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
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

  const socialLinks = [
    {
      label: 'LinkedIn',
      handle: 'satyam-sakral',
      url: 'https://linkedin.com/in/satyam-sakral-5553a4240/',
      icon: Linkedin,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-400/50',
    },
    {
      label: 'GitHub',
      handle: '@satyamsakral',
      url: 'https://github.com/satyamsakral',
      icon: Github,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-400/50',
    },
    {
      label: 'LeetCode',
      handle: '@XKhzXGWgdV',
      url: 'https://leetcode.com/u/XKhzXGWgdV/',
      icon: Code2,
      color: 'text-purple-400',
      border: 'hover:border-purple-400/50',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 md:px-12 relative z-10 max-w-7xl mx-auto w-full flex flex-col">
      {/* Header */}
      <div className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 font-mono text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
          <Sparkles size={12} />
          <span>DIRECT TRANSMISSION CHANNEL</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight uppercase">
          GET IN <span className="gradient-text-cyan">TOUCH</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Telemetry Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Copy Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => soundFx.playHover()}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                DIRECT EMAIL INBOX
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            </div>

            <p className="text-xs text-slate-300 font-light mb-4 leading-relaxed">
              Reach out directly for AI engineering positions, RAG system builds, or collaborative full-stack projects.
            </p>

            <div className="p-3.5 rounded-2xl bg-cyber-900/80 border border-white/10 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail size={16} className="text-cyan-400 shrink-0" />
                <span className="font-mono text-xs text-white truncate">
                  satyamsakral@gmail.com
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={() => soundFx.playHover()}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase transition-colors shrink-0 flex items-center gap-1.5"
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

          {/* Social Links Cards */}
          <div className="grid gap-3">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className={`glass-panel p-4 rounded-2xl border border-white/10 ${social.border} transition-all flex items-center justify-between group`}
                >
                  <div className="flex items-center gap-3">
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

                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Right Interactive Form Column */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                // DISPATCH MESSAGE
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white uppercase">
                Send Direct Message
              </h3>
            </div>
            <Terminal size={20} className="text-slate-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Mercer"
                className="w-full px-4 py-3 rounded-xl bg-cyber-900/80 border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-slate-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl bg-cyber-900/80 border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-slate-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase text-slate-400 tracking-widest mb-1.5">
                Message Content
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Discuss project requirements, hiring details, or technology..."
                className="w-full px-4 py-3 rounded-xl bg-cyber-900/80 border border-white/10 focus:border-cyan-400 text-xs text-white placeholder-slate-600 outline-none transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => soundFx.playHover()}
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all disabled:opacity-50"
            >
              {status === 'sending' ? (
                <span>Dispatching...</span>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={16} className="text-slate-950" />
                  <span>Message Client Opened</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Transmit Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Footer copyright & credits */}
      <footer className="mt-16 sm:mt-20 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3 text-center sm:text-left">
        <div>
          © {new Date().getFullYear()} Satyam Sakral • Built with React 19, Three.js & Tailwind CSS
        </div>
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] tracking-wider uppercase text-slate-400">Satyam Sakral Portfolio</span>
        </div>
      </footer>
    </section>
  );
}
