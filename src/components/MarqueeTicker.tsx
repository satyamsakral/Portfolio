import { motion } from 'framer-motion';

interface MarqueeTickerProps {
  items?: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  theme?: 'cyan' | 'purple' | 'emerald';
}

const defaultItems = [
  'GENERATIVE AI & LLM SYSTEMS',
  'PRODUCTION RAG PIPELINES',
  'COMPUTER VISION & PYTORCH',
  'HIGH-PERFORMANCE BACKENDS',
  'REAL-TIME WEBRTC PROTOCOLS',
  'FULL STACK ARCHITECTURE',
  'AUTONOMOUS AGENTS',
];

export default function MarqueeTicker({
  items = defaultItems,
  speed = 25,
  reverse = false,
  className = '',
  theme = 'cyan',
}: MarqueeTickerProps) {
  const accentColor =
    theme === 'cyan'
      ? 'text-cyan-400'
      : theme === 'purple'
      ? 'text-purple-400'
      : 'text-emerald-400';

  const dotColor =
    theme === 'cyan'
      ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
      : theme === 'purple'
      ? 'bg-purple-400 shadow-[0_0_8px_#a855f7]'
      : 'bg-emerald-400 shadow-[0_0_8px_#10b981]';

  return (
    <div
      className={`relative w-full overflow-hidden py-3 border-y border-white/10 bg-cyber-950/80 backdrop-blur-xl select-none ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap gap-8 items-center"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-6">
            <span
              className={`font-display text-xs md:text-sm font-extrabold tracking-[0.25em] uppercase ${accentColor}`}
            >
              {text}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
