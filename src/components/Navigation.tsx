import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Terminal, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Navigation() {
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsAudioActive(soundFx.enabled);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none px-4 md:px-12 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand & Monogram */}
        <a
          href="#"
          onMouseEnter={() => soundFx.playHover()}
          onClick={() => soundFx.playClick()}
          className="flex items-center gap-3 group px-3.5 py-2 rounded-full bg-cyber-900/80 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-white flex items-center justify-center font-display font-black text-xs tracking-tight group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xs tracking-wider text-white uppercase group-hover:text-cyan-400 transition-colors">
              Satyam Sakral
            </span>
            <span className="text-[9px] font-mono text-cyan-400/80 tracking-widest uppercase flex items-center gap-1">
              <Cpu size={10} className="text-cyan-400 animate-pulse" /> AI Engineer
            </span>
          </div>
        </a>

        {/* Center Live Telemetry Pill */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyber-900/80 backdrop-blur-xl border border-white/10 font-mono text-[10px] tracking-widest uppercase text-slate-300 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
          <span className="text-slate-200">DELHI, INDIA</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">OPEN TO AI & SOFTWARE ROLES</span>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-2 md:gap-3 bg-cyber-900/80 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <nav className="flex items-center gap-1 md:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={() => soundFx.playHover()}
                onClick={() => soundFx.playClick()}
                className="relative px-3 py-1.5 text-[10px] md:text-xs font-mono font-semibold tracking-widest text-slate-300 hover:text-white uppercase transition-colors rounded-full hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

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
      </div>
    </motion.header>
  );
}
