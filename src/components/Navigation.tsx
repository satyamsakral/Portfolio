import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Cpu, Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navigation() {
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsAudioActive(soundFx.enabled);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setIsAudioActive(newState);
  };

  const navLinks = [
    { label: 'TIMELINE', href: '#journey' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONNECT', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none px-3 sm:px-6 md:px-12 ${
        scrolled ? 'py-2.5' : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand & Monogram */}
        <a
          href="#"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-2.5 group px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-cyber-900/90 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white flex items-center justify-center font-display font-black text-xs tracking-tight group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(6,182,212,0.4)] shrink-0">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              Satyam <span className="hidden xs:inline">Sakral</span>
            </span>
            <span className="text-[9px] font-mono text-cyan-400/90 tracking-widest uppercase flex items-center gap-1">
              <Cpu size={9} className="text-cyan-400 animate-pulse shrink-0" /> AI Engineer
            </span>
          </div>
        </a>

        {/* Center Live Telemetry Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyber-900/80 backdrop-blur-xl border border-white/10 font-mono text-[10px] tracking-widest uppercase text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-slate-200">DELHI, INDIA</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">OPEN TO ROLES</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-3 bg-cyber-900/90 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <nav className="flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="px-3 py-1.5 text-xs font-mono font-semibold tracking-widest text-slate-300 hover:text-white uppercase transition-colors rounded-full hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-white/10" />

          {/* Sound Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Sound Effects"
            onClick={handleToggleSound}
            onMouseEnter={() => soundFx.playHover()}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border ${
              isAudioActive
                ? 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'border-white/10 text-slate-500 hover:text-slate-300 bg-white/5'
            }`}
            title={isAudioActive ? 'Audio FX Enabled (Click to Mute)' : 'Audio FX Disabled (Click to Enable)'}
          >
            {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>
        </div>

        {/* Mobile Control Buttons (Hamburger + Sound) */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            aria-label="Toggle Sound Effects"
            onClick={handleToggleSound}
            className={`w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-xl ${
              isAudioActive
                ? 'border-cyan-500/40 text-cyan-400 bg-cyber-900/90'
                : 'border-white/10 text-slate-400 bg-cyber-900/90'
            }`}
          >
            {isAudioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-9 h-9 rounded-full bg-cyber-900/90 backdrop-blur-xl border border-white/10 text-slate-200 flex items-center justify-center hover:text-white hover:border-cyan-400/50 transition-all shadow-md"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-3 max-w-7xl mx-auto p-4 rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-4"
          >
            {/* Status Telemetry */}
            <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-cyber-900/80 border border-white/5 font-mono text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 uppercase">Delhi, India</span>
              </div>
              <span className="text-cyan-400 uppercase font-bold">Open to Roles</span>
            </div>

            {/* Mobile Nav Links */}
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    soundFx.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-2xl bg-cyber-900/60 border border-white/5 text-xs font-mono font-bold tracking-widest text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 uppercase transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="text-slate-500" />
                </a>
              ))}
            </nav>

            {/* Resume Action */}
            <a
              href="/satyam_sakral_resume.pdf"
              download="Satyam_Sakral_Resume.pdf"
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Download size={14} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
