import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navigation() {
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [depthMeters, setDepthMeters] = useState(0);

  useEffect(() => {
    setIsAudioActive(soundFx.enabled);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);

      // Depth gauge simulation from 0m down to 3,480m
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollY / maxScroll));
      const simulatedDepth = Math.round(ratio * 3480);
      setDepthMeters(simulatedDepth);

      // Determine active section
      const sections = ['hero', 'about', 'flagship', 'projects', 'skills', 'experience', 'education', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setIsAudioActive(newState);
  };

  const navLinks = [
    { label: 'WORK', href: '#flagship', id: 'flagship' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none px-4 sm:px-8 md:px-12 ${
        scrolled ? 'py-3' : 'py-5 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Monogram Brand */}
        <a
          href="#"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group px-4 py-2 rounded-full abyss-panel border border-cyan-500/20 hover:border-cyan-400/60 transition-all shadow-[0_0_25px_rgba(0,0,0,0.6)]"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 text-[#01040a] flex items-center justify-center font-display font-black text-xs tracking-tight group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.5)] shrink-0">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xs tracking-widest text-white uppercase group-hover:text-cyan-300 transition-colors whitespace-nowrap">
              SATYAM
            </span>
            <span className="text-[9px] font-mono text-cyan-400/80 tracking-wider uppercase flex items-center gap-1">
              AI & FULL-STACK
            </span>
          </div>
        </a>

        {/* Center Live Status HUD (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full abyss-panel border border-white/10 font-mono text-[10px] tracking-widest uppercase text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <span className="text-slate-300">
            DELHI, INDIA
          </span>
          <span className="text-slate-600">|</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2 abyss-panel border border-cyan-500/20 rounded-full px-3 py-1.5 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'flagship' && activeSection === 'projects');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => soundFx.playHover()}
                  onClick={() => soundFx.playClick()}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-semibold tracking-widest uppercase transition-colors rounded-full ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full border border-cyan-400/50 -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Sound Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Sound Effects"
            onClick={handleToggleSound}
            onMouseEnter={() => soundFx.playHover()}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border cursor-pointer ${
              isAudioActive
                ? 'border-cyan-500/50 text-cyan-300 bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'border-white/10 text-slate-500 hover:text-slate-300 bg-white/5'
            }`}
            title={isAudioActive ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Disabled (Click to Enable)'}
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
            className={`w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-xl cursor-pointer ${
              isAudioActive
                ? 'border-cyan-500/40 text-cyan-300 bg-abyss-900/90'
                : 'border-white/10 text-slate-400 bg-abyss-900/90'
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
            className="w-9 h-9 rounded-full abyss-panel border border-white/10 text-slate-200 flex items-center justify-center hover:text-white hover:border-cyan-400/50 transition-all shadow-md cursor-pointer"
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
            className="md:hidden pointer-events-auto mt-3 max-w-7xl mx-auto p-5 rounded-3xl abyss-panel-glow border border-cyan-500/40 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-4"
          >
            {/* Status Telemetry */}
            <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-abyss-950/80 border border-white/5 font-mono text-[10px]">
              <span className="text-slate-300 uppercase">Delhi, India</span>
              <span className="text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AVAILABLE FOR OPPORTUNITIES
              </span>
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
                  className="px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 font-mono text-xs font-semibold tracking-widest text-slate-200 hover:text-cyan-300 uppercase transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="text-cyan-400 opacity-60" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
